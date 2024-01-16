export interface JustJoinItResponse {
  pageProps: PageProps
  __N_SSP: boolean
}

export interface PageProps {
  tenantConfig: TenantConfig
  _sentryTraceData: string
  _sentryBaggage: string
  config: Config
  isMobile: boolean
  layoutMode: any
  selectedFilters: SelectedFilters
  dehydratedState: DehydratedState
  showCurrencyDropdown: boolean
}

export interface TenantConfig {
  privacyPolicyUrl: PrivacyPolicyUrl
  termsOfServiceUrl: TermsOfServiceUrl
  logoUrl: LogoUrl
  addOfferUrl: AddOfferUrl
  metatags: Metatags
  mainMenuOptions: MainMenuOption[]
  sideMenuOptions: SideMenuOption[]
  socialMedia: SocialMedum[]
  footerGroupOptions: FooterGroupOption[]
  contact: Contact[]
  staticUrls: StaticUrl[]
  featureFlags: FeatureFlags
  bottomMenuOptions: BottomMenuOption[]
  candidateProfileNavigation: CandidateProfileNavigation[]
  id: string
  createdAt: string
  updatedAt: string
}

export interface PrivacyPolicyUrl {
  rjNew: RjNew[]
  testKey: string
  previous: Previou[]
  currentUrl: string
}

export interface RjNew {
  url: string
}

export interface Previou {
  url: string
  dueDate: string
}

export interface TermsOfServiceUrl {
  rjNew: RjNew2
  testKey: string
  previous: any[]
  currentUrl: string
}

export interface RjNew2 {
  users: User[]
  clients: Client[]
}

export interface User {
  url: string
}

export interface Client {
  url: string
  dueDate?: string
  fromDate?: string
}

export interface LogoUrl {
  url: string
  static: boolean
  target: string
}

export interface AddOfferUrl {
  url: string
  static: boolean
  target: string
}

export interface Metatags {
  ogUrl: string
  title: string
  ogTitle: string
  twitterSite: string
  twitterImage: string
  twitterTitle: string
  ogDescription: string
  twitterDescription: string
}

export interface MainMenuOption {
  url: string
  label: string
  static: boolean
  target: string
  testKey: string
}

export interface SideMenuOption {
  url: string
  icon: Icon
  label: string
  static: boolean
  testKey: string
  hideOnDesktop?: boolean
  target?: string
  id?: string
}

export interface Icon {
  d: string[]
  x1: any
  x2: any
  y1: any
  y2: any
  width: string
  height: string
  viewBox: string
  clipRule: string
  fillRule: string
}

export interface SocialMedum {
  url: string
  label: string
  static: boolean
  target: string
  testKey: string
}

export interface FooterGroupOption {
  label: string
  values: Value[]
}

export interface Value {
  url: string
  label: string
  static: boolean
  testKey: string
  target?: string
  id?: string
}

export interface Contact {
  email: string
  label: string
  phoneNumber: string
}

export interface StaticUrl {
  url: string
  label: string
}

export interface FeatureFlags {
  enableDarkMode: boolean
  enableJobAlert: boolean
  enableSearchBar: boolean
  enableOffersSort: boolean
  enableOfferListV2: boolean
  enableSurveyPopup: boolean
  enableSpecialOffer: boolean
  enableExpiredOffers: boolean
  enableImageInEditor: boolean
  enableCurrencyChange: boolean
  enableOfferPlanPromo: boolean
  enableBlackWeekBanner: boolean
  enableCopiedOfferModal: boolean
  enableExtendedJobAlerts: boolean
  enablePricingDisclaimer: boolean
  enableLookalikeExperiment: boolean
  enableSynchronizeHROffers: boolean
  enableRedirectsCountThrottling: boolean
}

export interface BottomMenuOption {
  id?: string
  url: string
  icon: Icon2
  label: string
  static: boolean
  target?: string
  testKey: string
}

export interface Icon2 {
  d: string[]
  x1: any
  x2: any
  y1: any
  y2: any
  width: string
  height: string
  viewBox: string
  clipRule?: string
  fillRule?: string
}

export interface CandidateProfileNavigation {
  id: string
  url: string
  icon: Icon3
  label: string
  static: boolean
  target: string
  testKey: string
}

export interface Icon3 {
  d: string[]
  x1: any
  x2: any
  y1: any
  y2: any
  width: string
  height: string
  viewBox: string
  clipRule: string
  fillRule: string
}

export interface Config {
  categories: Category[]
  cities: City[]
  currencies: Currency[]
  employmentTypes: EmploymentType[]
  experienceLevels: ExperienceLevel[]
  params: Params
  skills: Skill[]
  workingTimes: WorkingTime[]
  skillsLevels: SkillsLevel[]
}

export interface Category {
  icon: Icon4
  label: string
  value: number
  slug: string
  categories: any[]
  static: boolean
  redirectTo: any
}

export interface Icon4 {
  d: string
  x1: string
  x2: string
  y1: string
  y2: string
  width: any
  height: any
  colorTo: string
  viewBox: any
  clipRule: string
  fillRule: string
  colorFrom: string
  darkColorTo: string
  darkColorFrom: string
  gradientUnits: string
}

export interface City {
  slug: string
  label: string
  value: any
  group: string
  map: Map
}

export interface Map {
  zoom: number
  coordinates: Coordinates
}

export interface Coordinates {
  center: any[]
}

export interface Currency {
  label: string
  slug: string
  value: string
}

export interface EmploymentType {
  label: string
  slug: string
  value: string
}

export interface ExperienceLevel {
  label: string
  slug: string
  value: string
}

export interface Params {
  employmentTypes: EmploymentTypes
  experienceLevels: ExperienceLevels
  workingTimes: WorkingTimes
  salary: Salary
  remote: Remote
  withSalary: WithSalary
  showMap: ShowMap
  ukraineFriendly: UkraineFriendly
}

export interface EmploymentTypes {
  frontendKey: string
  backendKey: string
  type: string
}

export interface ExperienceLevels {
  frontendKey: string
  backendKey: string
  type: string
}

export interface WorkingTimes {
  frontendKey: string
  backendKey: string
  type: string
}

export interface Salary {
  frontendKey: string
  backendKey: string
  type: string
  validation: Validation
}

export interface Validation {
  min: number
  max: number
}

export interface Remote {
  frontendKey: string
  backendKey: string
  type: string
}

export interface WithSalary {
  frontendKey: string
  backendKey: string
  type: string
}

export interface ShowMap {
  frontendKey: string
  backendKey: string
  type: string
}

export interface UkraineFriendly {
  frontendKey: string
  backendKey: string
  type: string
}

export interface Skill {
  label: string
  slug: string
  value: number
}

export interface WorkingTime {
  label: string
  slug: string
  value: string
}

export interface SkillsLevel {
  label: string
  slug: string
  value: number
}

export interface SelectedFilters {
  categories: number[]
}

export interface DehydratedState {
  mutations: any[]
  queries: Query[]
}

export interface Query {
  state: State
  queryKey: any[]
  queryHash: string
}

export interface State {
  data: any
  dataUpdateCount: number
  dataUpdatedAt: number
  error: any
  errorUpdateCount: number
  errorUpdatedAt: number
  fetchFailureCount: number
  fetchFailureReason: any
  fetchMeta: any
  isInvalidated: boolean
  status: string
  fetchStatus: string
}

export interface JjitOffer {
  slug: string
  title: string
  requiredSkills: string[]
  niceToHaveSkills: any
  workplaceType: string
  workingTime: string
  experienceLevel: string
  employmentTypes: EmploymentType[]
  categoryId: number
  multilocation: Multilocation[]
  city: string
  street: string
  latitude: number
  longitude: number
  remoteInterview: boolean
  companyName: string
  companyLogoThumbUrl: string
  publishedAt: string
  openToHireUkrainians: boolean
}

export interface EmploymentType {
  to?: number
  from?: number
  type: string
  to_chf?: number
  to_eur: any
  to_gbp: any
  to_pln: any
  to_usd: any
  currency: string
  from_chf?: number
  from_eur: any
  from_gbp: any
  from_pln: any
  from_usd: any
  fromChf?: number
  fromEur: any
  fromGbp: any
  fromPln: any
  fromUsd: any
  toChf?: number
  toEur: any
  toGbp: any
  toPln: any
  toUsd: any
  gross?: boolean
}

export interface Multilocation {
  city: string
  slug: string
  street: string
  latitude: number
  longitude: number
}