import { HaveAudience, Platform, TeachingType, VideoProAcademy } from "@prisma/client";

export type CreateUser = {
  firstName: string; 
  lastName: string;
  email: string;
  password: string;
  mobilePhone: string;
  whatsAppNumber: string;
  bio: string;
  picture: string;
  role: {
    id?: number;
    slug?: string;
  };
  refreshToken?: string;
  instructor?: {
    specialization: string;
    teachingType: TeachingType,
    videoProAcademy: VideoProAcademy,
    haveAudience: HaveAudience,
  }
};

export type UpdateUser = {
  id: number;
  firstName?: string; 
  lastName?: string;
  email?: string;
  isEmailVerified?: boolean;
  password?: string;
  resetPasswordCode?: {code: string; expirationTime: number; isVerified: boolean}
  passwordUpdatedTime?: Date;
  mobilePhone?: string;
  whatsAppNumber?: string;
  bio?: string;
  picture?: string;
  refreshToken?: string;
  isActive?: boolean;
  isBlocked?: boolean;
  isDeleted?: boolean;
  roleId?: number;
  personalLinks?: {platform: Platform, link: string}[];
};