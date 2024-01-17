export interface JustJoinItResponse {
  pageProps: PageProps;
  __N_SSP: boolean;
}

export interface PageProps {
  tenantConfig: TenantConfig;
  _sentryTraceData: string;
  _sentryBaggage: string;
  config: Config;
  isMobile: boolean;
  layoutMode: unknown;
  selectedFilters: SelectedFilters;
  dehydratedState: DehydratedState;
  showCurrencyDropdown: boolean;
}

export interface TenantConfig {
  privacyPolicyUrl: PrivacyPolicyUrl;
  termsOfServiceUrl: TermsOfServiceUrl;
  logoUrl: LogoUrl;
  addOfferUrl: AddOfferUrl;
  metatags: Metatags;
  mainMenuOptions: MainMenuOption[];
  sideMenuOptions: SideMenuOption[];
  socialMedia: SocialMedum[];
  footerGroupOptions: FooterGroupOption[];
  contact: Contact[];
  staticUrls: StaticUrl[];
  featureFlags: FeatureFlags;
  bottomMenuOptions: BottomMenuOption[];
  candidateProfileNavigation: CandidateProfileNavigation[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrivacyPolicyUrl {
  rjNew: RjNew[];
  testKey: string;
  previous: Previou[];
  currentUrl: string;
}

export interface RjNew {
  url: string;
}

export interface Previou {
  url: string;
  dueDate: string;
}

export interface TermsOfServiceUrl {
  rjNew: RjNew2;
  testKey: string;
  previous: unknown[];
  currentUrl: string;
}

export interface RjNew2 {
  users: User[];
  clients: Client[];
}

export interface User {
  url: string;
}

export interface Client {
  url: string;
  dueDate?: string;
  fromDate?: string;
}

export interface LogoUrl {
  url: string;
  static: boolean;
  target: string;
}

export interface AddOfferUrl {
  url: string;
  static: boolean;
  target: string;
}

export interface Metatags {
  ogUrl: string;
  title: string;
  ogTitle: string;
  twitterSite: string;
  twitterImage: string;
  twitterTitle: string;
  ogDescription: string;
  twitterDescription: string;
}

export interface MainMenuOption {
  url: string;
  label: string;
  static: boolean;
  target: string;
  testKey: string;
}

export interface SideMenuOption {
  url: string;
  icon: Icon;
  label: string;
  static: boolean;
  testKey: string;
  hideOnDesktop?: boolean;
  target?: string;
  id?: string;
}

export interface Icon {
  d: string[];
  x1: unknown;
  x2: unknown;
  y1: unknown;
  y2: unknown;
  width: string;
  height: string;
  viewBox: string;
  clipRule: string;
  fillRule: string;
}

export interface SocialMedum {
  url: string;
  label: string;
  static: boolean;
  target: string;
  testKey: string;
}

export interface FooterGroupOption {
  label: string;
  values: Value[];
}

export interface Value {
  url: string;
  label: string;
  static: boolean;
  testKey: string;
  target?: string;
  id?: string;
}

export interface Contact {
  email: string;
  label: string;
  phoneNumber: string;
}

export interface StaticUrl {
  url: string;
  label: string;
}

export interface FeatureFlags {
  enableDarkMode: boolean;
  enableJobAlert: boolean;
  enableSearchBar: boolean;
  enableOffersSort: boolean;
  enableOfferListV2: boolean;
  enableSurveyPopup: boolean;
  enableSpecialOffer: boolean;
  enableExpiredOffers: boolean;
  enableImageInEditor: boolean;
  enableCurrencyChange: boolean;
  enableOfferPlanPromo: boolean;
  enableBlackWeekBanner: boolean;
  enableCopiedOfferModal: boolean;
  enableExtendedJobAlerts: boolean;
  enablePricingDisclaimer: boolean;
  enableLookalikeExperiment: boolean;
  enableSynchronizeHROffers: boolean;
  enableRedirectsCountThrottling: boolean;
}

export interface BottomMenuOption {
  id?: string;
  url: string;
  icon: Icon2;
  label: string;
  static: boolean;
  target?: string;
  testKey: string;
}

export interface Icon2 {
  d: string[];
  x1: unknown;
  x2: unknown;
  y1: unknown;
  y2: unknown;
  width: string;
  height: string;
  viewBox: string;
  clipRule?: string;
  fillRule?: string;
}

export interface CandidateProfileNavigation {
  id: string;
  url: string;
  icon: Icon3;
  label: string;
  static: boolean;
  target: string;
  testKey: string;
}

export interface Icon3 {
  d: string[];
  x1: unknown;
  x2: unknown;
  y1: unknown;
  y2: unknown;
  width: string;
  height: string;
  viewBox: string;
  clipRule: string;
  fillRule: string;
}

export interface Config {
  categories: Category[];
  cities: City[];
  currencies: Currency[];
  employmentTypes: EmploymentType[];
  experienceLevels: ExperienceLevel[];
  params: Params;
  skills: Skill[];
  workingTimes: WorkingTime[];
  skillsLevels: SkillsLevel[];
}

export interface Category {
  icon: Icon4;
  label: string;
  value: number;
  slug: string;
  categories: unknown[];
  static: boolean;
  redirectTo: unknown;
}

export interface Icon4 {
  d: string;
  x1: string;
  x2: string;
  y1: string;
  y2: string;
  width: unknown;
  height: unknown;
  colorTo: string;
  viewBox: unknown;
  clipRule: string;
  fillRule: string;
  colorFrom: string;
  darkColorTo: string;
  darkColorFrom: string;
  gradientUnits: string;
}

export interface City {
  slug: string;
  label: string;
  value: unknown;
  group: string;
  map: Map;
}

export interface Map {
  zoom: number;
  coordinates: Coordinates;
}

export interface Coordinates {
  center: unknown[];
}

export interface Currency {
  label: string;
  slug: string;
  value: string;
}

export interface EmploymentType {
  label: string;
  slug: string;
  value: string;
}

export interface ExperienceLevel {
  label: string;
  slug: string;
  value: string;
}

export interface Params {
  employmentTypes: EmploymentTypes;
  experienceLevels: ExperienceLevels;
  workingTimes: WorkingTimes;
  salary: Salary;
  remote: Remote;
  withSalary: WithSalary;
  showMap: ShowMap;
  ukraineFriendly: UkraineFriendly;
}

export interface EmploymentTypes {
  frontendKey: string;
  backendKey: string;
  type: string;
}

export interface ExperienceLevels {
  frontendKey: string;
  backendKey: string;
  type: string;
}

export interface WorkingTimes {
  frontendKey: string;
  backendKey: string;
  type: string;
}

export interface Salary {
  frontendKey: string;
  backendKey: string;
  type: string;
  validation: Validation;
}

export interface Validation {
  min: number;
  max: number;
}

export interface Remote {
  frontendKey: string;
  backendKey: string;
  type: string;
}

export interface WithSalary {
  frontendKey: string;
  backendKey: string;
  type: string;
}

export interface ShowMap {
  frontendKey: string;
  backendKey: string;
  type: string;
}

export interface UkraineFriendly {
  frontendKey: string;
  backendKey: string;
  type: string;
}

export interface Skill {
  label: string;
  slug: string;
  value: number;
}

export interface WorkingTime {
  label: string;
  slug: string;
  value: string;
}

export interface SkillsLevel {
  label: string;
  slug: string;
  value: number;
}

export interface SelectedFilters {
  categories: number[];
}

export interface DehydratedState {
  mutations: unknown[];
  queries: Query[];
}

export interface Query {
  state: State;
  queryKey: unknown[];
  queryHash: string;
}

export interface State {
  data: unknown;
  dataUpdateCount: number;
  dataUpdatedAt: number;
  error: unknown;
  errorUpdateCount: number;
  errorUpdatedAt: number;
  fetchFailureCount: number;
  fetchFailureReason: unknown;
  fetchMeta: unknown;
  isInvalidated: boolean;
  status: string;
  fetchStatus: string;
}

export interface JjitOffer {
  slug: string;
  title: string;
  requiredSkills: string[];
  niceToHaveSkills: unknown;
  workplaceType: string;
  workingTime: string;
  experienceLevel: string;
  employmentTypes: EmploymentType[];
  categoryId: number;
  multilocation: Multilocation[];
  city: string;
  street: string;
  latitude: number;
  longitude: number;
  remoteInterview: boolean;
  companyName: string;
  companyLogoThumbUrl: string;
  publishedAt: string;
  openToHireUkrainians: boolean;
}

export interface EmploymentType {
  to?: number;
  from?: number;
  type: string;
  to_chf?: number;
  to_eur: unknown;
  to_gbp: unknown;
  to_pln: unknown;
  to_usd: unknown;
  currency: string;
  from_chf?: number;
  from_eur: unknown;
  from_gbp: unknown;
  from_pln: unknown;
  from_usd: unknown;
  fromChf?: number;
  fromEur: unknown;
  fromGbp: unknown;
  fromPln: unknown;
  fromUsd: unknown;
  toChf?: number;
  toEur: unknown;
  toGbp: unknown;
  toPln: unknown;
  toUsd: unknown;
  gross?: boolean;
}

export interface Multilocation {
  city: string;
  slug: string;
  street: string;
  latitude: number;
  longitude: number;
}
