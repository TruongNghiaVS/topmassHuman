import { Option } from "@/component/hook-form/interface/interface";
import { Dispatch, SetStateAction } from "react";
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
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
  confirm_password: string;
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
  DocumentType: string;
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
  iframeEmbeddedMap?: string;
}

export interface ISupportSetting {
  files?: FileList;
  title: string;
  description: string;
}

export interface ICampaignUpdate {
  name: string;
}

export interface IContact {
  name: string;
  email: string;
  phoneNumber: string;
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

export interface ICancleChangeCv {
  note: string;
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
  mutate?: KeyedMutator<string | undefined>;
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
    iframeEmbeddedMap: string;
  };
  businessLicenseInfo: {
    linkFile: string;
    statusText: string;
    statusCode: number;
    note: string;
    documnetType: string;
    reasonRejectText: string;
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

export interface ICampaign {
  createAt: string;
  from: string;
  id: number;
  lableText: string;
  name: string;
  status: number;
  statusText: string;
  to: string;
  totalRecord: number;
  updateAt: string;
}

export interface IModalEditCampaign {
  isOpen: boolean;
  onClose: () => void;
  nameUpdate: string;
  id: number;
  mutate: KeyedMutator<any>;
}

export interface IFormCreateNew {
  name: string;
  campagnId?: number;
  position: string;
  profession: number;
  expired_date: string;
  quantity: number;
  type_of_work: number;
  rank: number;
  experience: number;
  locations: {
    location: string;
    districts: {
      district?: string;
      detail_location?: string;
    }[];
  }[];
  // time_working: {
  //   day_from: string;
  //   day_to: string;
  //   time_from: string;
  //   time_to: string;
  // }[];
  aggrement?: boolean;
  salary_from?: number;
  salary_to?: number;
  type_money?: string;
  gender?: number;
  description: string;
  requirement: string;
  benefit: string;
  status?: number;
  ruleStatus?: number;
  skills?: { skill?: string }[];
  username: string;
  phone: string;
  emails: { email: string }[];
  time_WorkingText: string;
}

export interface IProvinces {
  code: string;
  name: string;
}

export interface IMultipleFieldForm {
  control: Control<any>;
  name: string;
  locationId?: string;
  options?: Option[];
}

export interface ILocationForm {
  control: Control<any>;
  name: string;
  locationId?: string;
  options?: Option[];
  getValues: UseFormGetValues<IFormCreateNew>;
  setValue: UseFormSetValue<IFormCreateNew>;
  watch: UseFormWatch<IFormCreateNew>;
}

export interface ICareer {
  text: string;
  typeData: string;
  code: string;
  status: number;
  deleted: boolean;
  id: number;
  createAt: string;
  createdBy: string;
  updateAt: string;
  updatedBy: string;
}

export interface IJob {
  id: number;
  authorName: string;
  campaignId: number;
  campaignName: string;
  createAt: string;
  name: string;
  packageName: string;
  reason: number;
  reasonText: string;
  displaySTatusText: string;
  relId: number;
  status: number;
  resultCode: number;
  resultText: string;
}

export interface IInfoJobUpdate {
  campagn: number;
  createAt: string;
  createdBy: number;
  deleted: boolean;
  id: number;
  name: string;
  package: number;
  relId: number;
  status: number;
  updateAt: string;
  updatedBy: number;
}

export interface IKeySearchJob {
  keyword: string;
  reasonCode: number;
  resultCode: number;
}

export interface IDetailCvProps {
  idJob: number;
  statusApply: Option[];
}

export interface ICvJob {
  campagnId: number;
  campagnText: string;
  createAt: string;
  cvId: number;
  email: string;
  fullName: string;
  jobId: number;
  jobName: string;
  linkFile: string;
  phone: string;
  statusCode: number;
  statusText: string;
  viewMode: number;
  viewModeText: string;
  id: number;
  isOpenedCV: boolean;
}

export interface IStatusApply {
  code: string;
  createAt: string;
  createdBy: number;
  deleted: false;
  id: number;
  status: number;
  text: string;
  typeData: number;
  updateAt: string;
  updatedBy: number;
}

export interface IModalChangeStatusProps {
  isOpenModal: boolean;
  onClose: () => void;
  listStatus: Option[];
  id: number;
  status: number;
  mutate: KeyedMutator<any>;
}

export interface IUpdateStatusCandidate {
  noteCode: number;
  noted?: string;
}

export interface ISearchCvCandidate {
  KeyWord?: string;
  ViewMode?: number;
  StatusCode?: number;
}

export interface IManagerCv {
  id: number;
  phone: string;
  fullName: string;
  email: string;
  statusCode: number;
  cvId: number;
  statusText: string;
  jobId: number;
  jobName: string;
  campagnText: string;
  campagnId: number;
  createAt: string;
  linkFile: string;
  viewMode: number;
  viewModeText: string;
}

export interface ISearchManagerCv {
  KeyWord?: string;
  CampaignId?: number;
  StatusCode?: number;
  Source?: number;
  ViewMode?: number;
}

export interface ICandidateViewJob {
  fullName: string;
  phoneNumber: string;
  email: string;
  createAt: string;
  dob: string;
  extraText: string;
  viewModeText: string;
  isOpenedCV: boolean;
  id: number;
  statusText: string;
  status: number;
}

export interface INotification {
  title: string;
  relId: number;
  userName: string;
  lableText: string;
  typeInfo: number;
  content: string;
  linkFile: string;
  createAt: string;
  status: number;
  id: number;
}

export interface IOverviewJob {
  jobId: number;
  jobName: string;
  rate: number;
  serviceName: string;
  statusCode: number;
  statusText: string;
  totalApply: number;
  totalViewer: string;
}

export interface IDatasets {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
}

export interface IChartOverview {
  labels: string[];
  datasets: IDatasets[];
}

export interface IHistory {
  timeBusiness: string;
  content: string;
  timeText: string;
  dateText: string;
}

export interface IHistoryGroup {
  groupDate: string;
  data: IHistory[];
}

export interface IFilterHistory {
  From: string;
  To: string;
}

export interface IHistoryProps {
  historys: IHistoryGroup[];
  filter: IFilterHistory;
  title: string;
  setFilter: Dispatch<SetStateAction<{ From: string; To: string }>>;
}

export interface ISearchCvView {
  candidateCv: ICandidateSearch[];
  mutate: KeyedMutator<any>;
  idJob: number;
  statusApply: Option[];
}

export interface ICandidateSearch {
  avatarLink: string;
  campagnId: number;
  campagnText: string;
  createAt: string;
  cvId: number;
  email: string;
  fullName: string;
  id: number;
  jobId: number;
  jobName: number;
  linkFile: string;
  phone: string;
  statusCode: number;
  statusText: string;
  viewMode: number;
  viewModeText: string;
  isOpenedCV: boolean;
  searchId: number;
  point: number;
  sourceType: number;
}

export interface IPartner {
  coverFullLink: string;
  logoFullLink: string;
  fullName: string;
  slug: string;
  id: number;
  followCount: number;
}

export interface IPartnerProps {
  partners: IPartner[];
}

export interface IModalChangeCv {
  isOpen: boolean;
  onClose: () => void;
  mutate: KeyedMutator<any>;
}

export interface IModalVerifyLevel {
  isOpen: boolean;
  onClose: () => void;
}

export interface IModalCancleChangeCv extends IModalChangeCv {
  id: number;
}

export interface ISearchCv {
  KeyWord?: string;
  Locations?: string[];
  CvKey?: string;
  Gender?: number;
  FromYear?: number;
  ToYear?: number;
  SchoolSearch?: string;
  cap_2?: boolean;
  cap_3?: boolean;
  college?: boolean;
  university?: boolean;
  after_university?: boolean;
}

export interface ISearchCvState {
  KeyWord: string | undefined;
  LocationCode: string | undefined;
  CvKey: string | undefined;
  Gender: number | undefined;
  FromYear: number | undefined;
  ToYear: number | undefined;
  SchoolSearch: string | undefined;
  EducationalLevelArray: string;
  Limit: number;
}

export interface IPaging {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  lengthData: number;
  currentPage: number;
}

export interface IDetailCampaign {
  id: number;
}
