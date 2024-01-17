export interface NoFluffJobsResponse {
  criteriaSearch: CriteriaSearch;
  postings: Posting[];
  totalCount: number;
  totalPages: number;
  exactMatchesPages: number;
  rawSearch: string;
  locationCriteria: boolean;
  divs: number;
  additionalSearch: unknown[];
}

export interface CriteriaSearch {
  country: unknown[];
  city: string[];
  more: unknown[];
  employment: unknown[];
  requirement: unknown[];
  salary: unknown[];
  jobPosition: unknown[];
  province: unknown[];
  company: unknown[];
  id: unknown[];
  category: string[];
  keyword: unknown[];
  jobLanguage: unknown[];
  seniority: unknown[];
}

export interface Posting {
  id: string;
  name: string;
  location: Location;
  posted: number;
  renewed: number;
  title: string;
  technology?: string;
  logo: Logo;
  category: string;
  seniority: string[];
  url: string;
  regions: string[];
  fullyRemote: boolean;
  salary: SalaryRange;
  flavors: string[];
  topInSearch: boolean;
  highlighted: boolean;
  help4Ua: boolean;
  reference: string;
  searchBoost: boolean;
  onlineInterviewAvailable: boolean;
  tiles: Tiles;
}

export interface Location {
  places: Place[];
  fullyRemote: boolean;
  covidTimeRemotely: boolean;
}

export interface Place {
  city?: string;
  url: string;
  country?: Country;
  street?: string;
  postalCode?: string;
  geoLocation?: GeoLocation;
  province?: string;
  provinceOnly?: boolean;
}

export interface Country {
  code: string;
  name: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface Logo {
  original: string;
  jobs_details: string;
  jobs_listing: string;
  jobs_details_2x: string;
  jobs_listing_2x: string;
  companies_details: string;
  companies_listing: string;
  jobs_details_webp?: string;
  jobs_listing_webp?: string;
  companies_details_2x: string;
  companies_listing_2x: string;
  jobs_details_2x_webp?: string;
  jobs_listing_2x_webp?: string;
  original_pixel_image?: string;
  companies_details_webp?: string;
  companies_listing_webp?: string;
  companies_details_2x_webp?: string;
  companies_listing_2x_webp?: string;
}

export interface SalaryRange {
  from: number;
  to: number;
  type: string;
  currency: string;
}

export interface Tiles {
  values: TileValue[];
}

export interface TileValue {
  value: string;
  type: string;
}
