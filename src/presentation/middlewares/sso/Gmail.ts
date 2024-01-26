import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { SSOPlatform } from '@prisma/client';
import asyncHandler from'express-async-handler';
import { OAuth } from '../../services/OAuth';
import { PlatformInfo } from '../../types/Platform';
import { GmailUserData } from '../../types/GmailUserData';

export class Gmail extends OAuth<GmailUserData>{
  protected platformInfo: PlatformInfo;

  constructor() {
    super('GMAIL');
    this.platformInfo = {
      clientId: process.env.Google_Client_Id as string,
      clientSecret: process.env.Google_Client_Secret as string,
      tokenURL: process.env.Google_Token_URL as string,
      scopeURL: process.env.Google_Scope_URL as string
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
      platform: SSOPlatform.GMAIL,
      isEmailVerified: userData.verified_email
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
      platform: SSOPlatform.GMAIL
    };
    next();
  });
}