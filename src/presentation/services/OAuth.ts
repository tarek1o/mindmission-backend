import { SSOPlatform } from "@prisma/client";
import { PlatformInfo } from "../types/Platform";
import APIError from "../errorHandlers/APIError";
import HttpStatusCode from "../enums/HTTPStatusCode";

export abstract class OAuth<T> {
  protected abstract platformInfo: PlatformInfo;
  constructor (private platform: SSOPlatform) {} 

  private async getAccessToken(code: string, redirectURL: string): Promise<string> {
    const {clientId, clientSecret, tokenURL} = this.platformInfo;
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectURL,
      grant_type: "authorization_code"
    } 
    const response = await fetch(tokenURL, {
      headers: {
        'Content-Type': this.platform === 'LINKEDIN' ? 'application/x-www-form-urlencoded' : 'application/json',
      },
      method: 'POST',
      body: this.platform === 'LINKEDIN' ? new URLSearchParams(body) : JSON.stringify(body),
    });
    if(response.status !== 200) {
      const error = await response.json();
      throw new APIError(`${error.error}, ${error.error_description}`, HttpStatusCode.InternalServerError);
    }
    const {access_token} = await response.json();
    return access_token;
  };
  
  protected async getData(code: string, redirectURL: string): Promise<T> {
    const access_token = await this.getAccessToken(code, redirectURL);
    const response = await fetch(this.platformInfo.scopeURL, {
      method: 'GET',  
      headers: { 
        Authorization: `Bearer ${access_token}`,
      }
    });
    if(response.status !== 200) {
      const error = await response.json();
      throw new APIError(`${error.error}, ${error.error_description}`, HttpStatusCode.InternalServerError);
    }
    return await response.json();
  };
};