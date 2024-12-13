export const REGISTER = "/api/recruiter/Register/RegisterUser";
export const CONFIRMACCOUNT = "/api/recruiter/Authen/ConfirmAccount";
export const LOGIN = "/api/recruiter/Authen/LoginUser";
export const FORGOT_PASSWORD = "/api/recruiter/Forget/RequestChangePassword";
export const CONFIRM_FORGOT_PASSWORD =
  "/api/recruiter/Forget/ConfirmToPageChangePassword";
export const FORGOT_CHANGE_PASSWORD = "/api/recruiter/Forget/ChangePassword";
export const CHANGE_PASSWORD = "/api/recruiter/Authen/ChangePassword";

export const UPLOAD_IMG = "/Media/UploadAvatar";
export const GET_CURRENT_USER = "/api/recruiter/Authen/GetInfo";
export const UPDATE_INFOMATION = "/api/recruiter/Profile/UpdateBasicInfo";
export const ADD_BUSINESSLICENSE = "/api/recruiter/Profile/AddBusinesslicense";
export const REALS = "/api/recruiter/MasterData/InfoRealms";
export const UPDATE_COMPANY = "/api/recruiter/Profile/UpdateCompanyInfo";
export const REVALIDATE_ACCOUNT =
  "/api/recruiter/Email/RequestMailValidAccount";
export const REQUEST_RESENDMAIL_CHANGPASSWORD =
  "/api/recruiter/Email/RequestSendMailChangePassword";

//------- Campaign ---------//
export const GET_ALL_CAMPAIGN = "/api/recruiter/Campagn/GetAll";
export const ADD_CAMPAIGN = "/api/recruiter/Campagn/Add";
export const UPDATE_CAMPAIGN = "/api/recruiter/Campagn/Update";
export const ChANGE_STATUS = "/api/recruiter/Campagn/ChangeStatus";

//------- Job ---------//
export const GET_ALL_JOB = "/api/recruiter/Job/GetAll";
export const ADD_JOB = "/api/recruiter/Job/Add";
export const CHANGE_STATUS_JOB = "/api/recruiter/Job/ChangeStatus";
export const GET_DETAIL_JOB = "/api/recruiter/Job/GetInfo";
export const UPDATE_JOB = "/api/recruiter/Job/UpdateJob";
export const GET_OVERVIEW_JOB = "/api/recruiter/Job/GetOverViewInfoMation";
export const GET_CHART_OVERVIEW =
  "/api/recruiter/Job/GetDataChartCountViewByJob";
export const GET_INFO_TO_EDIT = "/api/recruiter/Job/GetInfoForEdit";

//------- Master data -------//
export const GET_PROVINCE = "/api/recruiter/Location/GetAllProvinces";
export const GET_DISTRICT = "/api/recruiter/Location/GetAllDistrict";
export const GET_CAREER = "/api/recruiter/MasterData/GetAllCareer";
export const GET_JOB_TYPE = "/api/recruiter/MasterData/GetAllJobType";
export const GET_RANK_CANDIDATE =
  "/api/recruiter/MasterData/GetAllRankCandidate";
export const GET_EXPERIENCE = "/api/recruiter/MasterData/GetAllExperience";
export const GET_STATUS_APPLY_CV =
  "/api/recruiter/MasterData/GetAllStatusApply";

//---------- CV------------//
export const GET_ALL_CV_JOB = "/api/recruiter/CV/GetAllCVOfJob";
export const UPDATE_VIEW_MODE = "/api/recruiter/CV/UpdateViewModel";
export const UPDATE_STATUS_CV_CANDIDATE = "/api/recruiter/CV/AddLogStatus";
export const GET_MANAGER_CV_APPLY = "/api/recruiter/CV/ManagenmentGetAllCV";
export const GET_CANDIDATE_VIEW_JOB = "/api/recruiter/Job/GetAllViewerOfJob";
export const SEARCH_CV = "/api/recruiter/SearchCV/Search";
export const GET_PROFILE_SEARCH_CV =
  "/api/recruiter/SearchCV/GetProfileGenerate";
export const GET_INFOMATIONDETAIL_SEARCH_CV =
  "/api/recruiter/SearchCV/GetDetailInfo";
export const GET_ALL_CV_SAVE_SEARCH = "/api/recruiter/CV/GetAllSearchCVOfJob";

//------------ Notification -----------//
export const GET_ALL_NOTIFICATION = "/api/recruiter/Notification/GetAll";
export const GET_DETAIL_NOTIFICATION = "/api/recruiter/Notification/GetDetail";
export const UPDATE_NOTIFICATION =
  "api/recruiter/Notification/UpdateNotificaton";
//-------- Support ----------//
export const CREATE_TOCKET = "/api/recruiter/Support/CreateTicket";

//-------- Web -------//
export const ADD_REQUEST_CONTACT = "/api/recruiter/Web/AddCustomerContact";

//--------- History ------------//
export const HISTORY_LOGIN = "/api/recruiter/History/GetHistoryLogin";
export const HISTORY_UPDATE = "/api/recruiter/History/GetLogUpdateAccount";

//------------ SEARCH CV ------------//
export const OPEN_CV = "/api/recruiter/Reward/OpenCV";
export const SAVE_JOB_SEARCH = "/api/recruiter/SearchCV/SaveCV";
export const OPEN_CV_NOT_FILE_UPLOAD = "/api/recruiter/Reward/OpenCVNoSearchCV";

//------------ PARTNER -------------//
export const GET_ALL_PARTNER = "/api/recruiter/Company/GetAllPartner";

//---------- CHANGE CV -----------//
export const GET_HISTORY_CHANGE_CV = "/api/recruiter/ExchangeCV/GetHistory";
export const GET_DETAIL_HISTORY_CHANGE_CV =
  "/api/recruiter/ExchangeCV/GetDetail";
export const ADD_EXCHANGE_CV = "/api/recruiter/ExchangeCV/ExchangeCV";
export const CANCLE_EXCHANGE_CV = "/api/recruiter/ExchangeCV/CancleItem";

//----------------- METADATA ---------------//
export const GET_METADATA = "/api/recruiter/Web/GetInfoMetadata";
