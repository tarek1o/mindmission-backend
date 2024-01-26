import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { SSOPlatform } from '@prisma/client';
import asyncHandler from'express-async-handler';
import { OAuth } from '../../services/OAuth';
import { PlatformInfo } from '../../types/Platform';
import { LinkedinUserData } from '../../types/LinkedinUserData';

export class Linkedin extends OAuth<LinkedinUserData> {
  protected platformInfo: PlatformInfo;

  constructor() {
    super('LINKEDIN')
    this.platformInfo = {
      clientId: process.env.Linkedin_Client_Id as string,
      clientSecret: process.env.Linkedin_Client_Secret as string,
      tokenURL: process.env.Linkedin_Token_Url as string,
      scopeURL: process.env.Linkedin_Scope_URL as string
    };
  };

  signup = asyncHandler(async(request: Request, response: Response, next: NextFunction) => {
    const {code, redirectURL} = request.body.input;
    const userData = await this.getData(code, redirectURL);
    delete request.body.input.code;
    delete request.body.input.redirectURL;
    request.body.input = {
      ...request.body.input,
      firstName: userData.given_name,
      lastName: userData.family_name,
      email: userData.email,
      password: crypto.randomUUID(),
      picture: userData.picture,
      isSignWithSSO: true,
      platform: SSOPlatform.LINKEDIN,
      isEmailVerified: userData.email_verified
    };
    next();
  });

  login = asyncHandler(async(request: Request, response: Response, next: NextFunction) => {
    const {code, redirectURL} = request.body.input;
    const userData = await this.getData(code, redirectURL);
    delete request.body.input.code;
    delete request.body.input.redirectURL;
    request.body.input = {
      ...request.body.input,
      email: userData.email,
      password: crypto.randomUUID(),
      isSignWithSSO: true,
      platform: SSOPlatform.LINKEDIN
    };
    next();
  });
}