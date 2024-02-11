import {Vimeo} from 'vimeo';
import asyncHandler from'express-async-handler';
import APIError from '../errorHandlers/APIError';
import HttpStatusCode from '../enums/HTTPStatusCode';

export class VideoUploader {
  private client = new Vimeo(process.env.Vimeo_Client_Id as string, process.env.Vimeo_Client_Secret as string, process.env.Vimeo_Access_Token as string);

  upload = asyncHandler(async (request, response, next) => {
    const {size} = request.body.input;
    const res = await fetch('https://api.vimeo.com/me/videos', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
        Authorization: `bearer ${process.env.Vimeo_Access_Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        upload: {
          approach: 'tus',
          size,
        }
      })
    });
    const data = await res.json(); 
    response.json({success: true, data});
  })
}
