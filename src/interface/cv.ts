export interface ICvSearch {
  educationText: string;
  experienceText: string;
  jobObjectiveText: string;
  lastUpdate: string;
  location: string;
  locationCode: string;
  position: string;
  salaryFrom: number;
  salaryText: string;
  salaryTo: number;
  searchId: string;
  statusProfile: string;
  totalContact: number;
  totalView: number;
  fullName: string;
  avatarlink: string;
  experienceContent: string;
}

export interface ISearchCvDetailProps {
  item: ICvSearch;
  idCampaign: number;
}

export interface ISaveCvSearch {
  campaign: number;
  jobId: number;
}
