import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import bcrypt from "bcrypt"
import { IUserService } from "../../application/interfaces/IServices/IUserService";
import { ExtendedUser } from "../../application/types/ExtendedUser";
import { SendEmail } from "../services/SendEmail";
import { JWTGenerator } from "../services/JWTGenerator";
import { RequestManager } from "../services/RequestManager";
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import { UserMapper } from "../mapping/UserMapper";
import APIError from "../errorHandlers/APIError";
import HttpStatusCode from '../enums/HTTPStatusCode';

@injectable()
export class AuthenticationController {
	constructor(@inject('IUserService') private userService: IUserService) {};

  private isRefreshTokenExpiredSoon = (refreshToken: string): boolean => {
    const {exp} = JWTGenerator.decode(refreshToken);
    if(exp) {
      const secondsRemaining = exp - Math.floor(Date.now() / 1000);
      const daysRemaining = Math.ceil(secondsRemaining / 86400); // 60 * 60 * 24 = 86400 sec per day
      if(daysRemaining < 3) {
        return true;
      }
    }
    return false;
  };

  private isCredentialsRight(user: ExtendedUser, request: Request): boolean {
    const {password, isSignWithSSO, platform} = request.body.input;
    return (isSignWithSSO && platform && user.isSignWithSSO === isSignWithSSO && user.platform === platform) || bcrypt.compareSync(password, user.password);
  }

  signup = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    const {firstName, lastName, email, password, mobilePhone, whatsAppNumber, bio, picture, platform, isEmailVerified, specialization, teachingType, videoProAcademy, haveAudience} = request.body.input;
		const {select, include} = RequestManager.findOptionsWrapper(request);
    const slug = (specialization && teachingType && videoProAcademy && haveAudience) ? 'instructor' : 'student';
    const createdUser = await this.userService.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        mobilePhone,
        whatsAppNumber,
        bio,
        picture,
        platform,
        isEmailVerified,
        refreshToken: JWTGenerator.generateRefreshToken({firstName, lastName, email, picture} as ExtendedUser),
        role: {
          slug
        },
        instructor: slug === "instructor" ? {
          specialization,
          teachingType,
          videoProAcademy,
          haveAudience,
        } : undefined,
      },
      select,
      include,
		});
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'Signup successfully', [{
      user: UserMapper.map([createdUser])[0], 
      token: JWTGenerator.generateAccessToken(createdUser),
    }]));
  })

  login = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    const {email} = request.body.input;
		const {select, include} = RequestManager.findOptionsWrapper(request);
    const isExist = await this.userService.findFirst({
      where: {
        email: {equals: email, mode: 'insensitive'}
      },
      select: {
        id: true,
        firstName: true, 
        lastName: true, 
        email: true, 
        picture: true,
        password: true,
        isDeleted: true,
        isBlocked: true,
        isSignWithSSO: true,
        platform: true,
        refreshToken: true
      },
      include
    });
    if(!isExist || isExist.isDeleted || !this.isCredentialsRight(isExist, request)) {
      throw new APIError('Your email or password may be incorrect', HttpStatusCode.BadRequest);
    }
    
    if(isExist && isExist.isBlocked) {
      throw new APIError('Your are blocked, try to contact with our support team', HttpStatusCode.Forbidden);
    }

    let regeneratedRefreshToken;
    if(!isExist.refreshToken || (isExist.refreshToken && this.isRefreshTokenExpiredSoon(isExist.refreshToken))) {
      regeneratedRefreshToken = JWTGenerator.generateRefreshToken(isExist);
    }
    const updatedUser = await this.userService.update({
      data: {
        id: isExist.id,
        isActive: true,
        refreshToken: regeneratedRefreshToken ? regeneratedRefreshToken : undefined
      },
      select,
      include,
    });
    response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'Login successfully', [{
      user: UserMapper.map([updatedUser])[0], 
      token: JWTGenerator.generateAccessToken(isExist),
    }]));
  });

  forgetPassword = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    const {email} = request.body.input;
    const user = await this.userService.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    });
    if(user) {
      const resetCode = Math.floor(100000 + Math.random() * 900000);
      const message = `
        <h3 style="color: black">Hi ${user.firstName} ${user.lastName}</h3>
        <p style="color: black">We received a request to reset your password on your ${process.env.APP_Name} account.</p>
        <p style="color: black">This is your reset password code</p
        <strong style="font-size: 18px">${resetCode}</strong>
        <p style="color: black">Enter this code to complete the reset</p>
        <p style="color: black">Thanks for helping us keep your account secure.</p>
        <p style="color: black">${process.env.APP_Name} Team</p>
      `;
      await SendEmail.send({to: user.email, subject: "Reset Password Code", message: message});
      await this.userService.update({
        data: {
          id: user.id,
          resetPasswordCode: {
            code: `${resetCode}`,
            expirationTime: Date.now() + 5 * 60 * 1000, // 5 minutes from the time of reset code generation
            isVerified: false
          }
        },
        select: {
          id: true
        }
      });
    };
    response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'If your email exists, you will receive a verification code'));
  });

  verifyResetPasswordCode = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    const {email} = request.body.input;
    const user = await this.userService.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        resetPasswordCode: true,
      }
    })
    if(user) {
      const {code, expirationTime, isVerified} = user.resetPasswordCode as any;
      if(user.resetPasswordCode && code && bcrypt.compareSync(request.body.input.code.toString(), code) && expirationTime >= Date.now() && !isVerified) {
        await this.userService.update({
          data: {
            id: user.id,
            resetPasswordCode: {
              code,
              expirationTime,
              isVerified: true
            }
          },
          select: {
            id: true
          }
        });
        response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'Your code is verified'));
        return;
      }
    }
    throw new APIError("Not found user or Invalid code, try to ask another code and try again", HttpStatusCode.BadRequest);
  });

  resetPassword = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    const {email, newPassword} = request.body.input;
    const user = await this.userService.findFirst({
      where: {
        email: {equals: email, mode: 'insensitive'}
      },
      select: {
        id: true,
        resetPasswordCode: true
      }
    });
    if(user && user.resetPasswordCode) {
      const {expirationTime, isVerified} = user.resetPasswordCode as any;
      if(expirationTime >= Date.now() && isVerified) {
        await this.userService.update({
          data: {
            id: user.id,
            password: newPassword,
            resetPasswordCode: undefined,
            passwordUpdatedTime: new Date()
          },
          select: {
            id: true,
          }
        })
        response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'Your password is reset successfully'));
        return;
      }
    }
    throw new APIError("This code expired, try to ask another code", HttpStatusCode.BadRequest);
  });

  refreshToken = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    let {accessToken, refreshToken} = request.body.input;
    if(JWTGenerator.isTokenExpired(accessToken)) {
      JWTGenerator.verifyRefreshToken(refreshToken);
      const accessTokenPayload = JWTGenerator.decode(accessToken);
      const user = await this.userService.findFirst({
        where: {
          email: {equals: accessTokenPayload.email, mode: 'insensitive'}
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          picture: true,
          refreshToken: true
        }
      });
      if(!user || user.refreshToken !== refreshToken) {
        throw new APIError('Invalid tokens, try to login again', HttpStatusCode.BadRequest);
      }
      accessToken = JWTGenerator.generateAccessToken(user);
      if(this.isRefreshTokenExpiredSoon(refreshToken)) {
        refreshToken = JWTGenerator.generateRefreshToken(user);
        await this.userService.update({
          data: {
            id: user.id,
            refreshToken
          },
          select: {
            id: true
          }
        });
      };
    }
    response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'Your access token has been refreshed successfully.', [{
      accessToken,
      refreshToken
    }]));
  });
}