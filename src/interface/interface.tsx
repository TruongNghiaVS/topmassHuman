import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

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
  currentPassword: string;
  password: string;
  confirm_password: string;
}

export interface IUpdateInfomation {
  avatar: File;
  fullName?: string;
  gender?: number;
  phone?: string;
  avatarLink?: string;
}

export interface ICompanyBusiness {
  company_business?: File;
}

export interface IUpdateCompany {
  logo?: File;
  banner?: File;
  taxCode?: string;
  fullName?: string;
  website?: string;
  relId?: string;
  capacity?: string;
  addressInfo?: string;
  phone?: string;
  shortDes?: string;
  logoLink?: string;
  coverLink?: string;
  email?: string;
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

export interface ICurrentUser {
  phone: string;
  name: string;
  gender: number;
  isBlock: false;
  email: string;
  level: 1;
  status: string;
  statusText: string;
  avatarLink: string;
  authenticationLevelText: string;
  companyInfo: {
    taxCode: string;
    website: string;
    capacity: string;
    relId: string;
    fullName: string;
    addressInfo: string;
    phone: string;
    shortDes: string;
    logoLink: string;
    coverLink: string;
    email: string;
  };
  businessLicenseInfo: {
    linkFile: string;
    statusText: string;
    statusCode: 0;
    note: string;
  };
}

export interface IUpdateInformationProps {
  currentUser: ICurrentUser;
  mutate: KeyedMutator<any>;
}

export interface IReal {
  text: string;
  typeData: string;
  code: string;
  status: string;
  deleted: string;
  id: string;
  createAt: string;
  createdBy: string;
  updateAt: string;
  updatedBy: string;
}
