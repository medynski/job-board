import { Nullable } from './nullable';
import { Origin } from './origin';

export type Offer = {
  uniqId: string;
  title: string;
  createdAt: number;
  companyName: string;
  salaryRange: {
    from: number;
    to: number;
  };
  url: string;
  requiredSkills: string[];
  seniority: string[];
  origin: Origin;
  currency: string;
  companyLogoUrl: Nullable<string>;
  _id?: string;
};
