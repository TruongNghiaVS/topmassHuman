import { Dispatch, SetStateAction } from "react";

export interface ILogin {
  userName: string;
  password: string;
}

export interface IResetPassword {
  confirm_password: string;
  password: string;
}

export interface IRegister {
  name: string;
  phone: string;
  email: string;
  password: string;
  taxCode: string;
}

export interface IResetpassword {
  email: string;
}

export interface IChangePassword {
  old_password: string;
  password: string;
  confirm_password: string;
}

export interface IUpdateInfomation {
  avatar?: File;
  username?: string;
  gender?: string;
  phone?: string;
}

export interface ICompanyBusiness {
  company_business?: File;
}

export interface IUpdateCompany {
  logo?: File;
  banner?: File;
  code?: string;
  name?: string;
  website?: string;
  activity?: string;
  scale?: string;
  location?: string;
  email?: string;
  phone_number?: string;
  content?: string;
}

export interface ISupportSetting {
  files?: FileList;
  title: string;
  description: string;
}

export interface ICampaign {
  name: string;
}

export interface IContact {
  name: string;
  email: string;
  phone: string;
  title: string;
  content: string;
}

export interface IChangeCv {
  name: string;
  candidate_position: string;
  position: string;
  year_experience: string;
  is_approve: boolean;
  files?: FileList;
}

export interface ILoginForm {
  onClose?: () => void;
}

export type IDropdownMenu = {
  subMenu?: {
    title: string;
    slug: string;
    icon: any;
    border?: boolean;
    after?: any;
  }[];
  pathCheck: string;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export interface IConfirmResetPassword {
  password: string;
}
