export interface FormData {
  // Step 1: Company Details
  pointOfContact: {
    fullName: string;
    email: string;
  };
  companyInfo: {
    companyName: string;
    alternativeCompanyName: string;
    designation: string;
  };
  countriesOfInterest: {
    jurisdictionOfOperation: string;
    targetJurisdictions: string[];
  };
  sharesStructure: {
    numberOfShares: number;
    allSharesIssued: boolean;
    numberOfIssuedShares?: number;
    valuePerShare: number;
  };

  // Step 2: Shareholders
  shareholders: {
    id: string;
    type: "individual" | "corporate";
    fullName: string;
    nationality: string;
    address: string;
    sharePercentage: number;
    dateOfBirth?: string;
    passportNumber?: string;
    corporateName?: string;
    registrationNumber?: string;
  }[];

  // Step 3: Beneficial Owner
  beneficialOwners: {
    id: string;
    fullName: string;
    nationality: string;
    address: string;
    dateOfBirth: string;
    passportNumber: string;
    ownershipPercentage: number;
    sourceOfFunds: string;
    politicallyExposed: boolean;
  }[];

  // Step 4: Director
  directors: {
    id: string;
    fullName: string;
    nationality: string;
    address: string;
    dateOfBirth: string;
    passportNumber: string;
    occupation: string;
    experience: string;
    consentToAct: boolean;
  }[];
}

export interface FormState {
  currentStep: number;
  data: FormData;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  errors: Record<string, string>;
  isSubmitting: boolean;
  autoSaveTimeout?: NodeJS.Timeout;
  sessionId: string;
  submissionResult: {
    success: boolean;
    referenceNumber?: string;
    message?: string;
  } | null;
  apiError: string | null;
}

export interface ApiSubmissionData {
  point_of_contact: {
    full_name: string;
    email: string;
  };
  company_info: {
    company_name: string;
    alternative_company_name: string | null;
    designation: string;
  };
  countries_of_interest: {
    jurisdiction_of_operation: string;
    target_jurisdictions: string[];
  };
  shares_structure: {
    number_of_shares: number;
    all_shares_issued: boolean;
    number_of_issued_shares: number | null;
    value_per_share: number;
  };
  shareholders: {
    type: string;
    full_name: string;
    nationality: string;
    address: string;
    share_percentage: number;
    date_of_birth: string | null;
    passport_number: string | null;
    corporate_name: string | null;
    registration_number: string | null;
  }[];
  beneficial_owners: {
    full_name: string;
    nationality: string;
    address: string;
    date_of_birth: string;
    passport_number: string;
    ownership_percentage: number;
    source_of_funds: string;
    politically_exposed: boolean;
  }[];
  directors: {
    full_name: string;
    nationality: string;
    address: string;
    date_of_birth: string;
    passport_number: string;
    occupation: string;
    experience: string;
    consent_to_act: boolean;
  }[];
}

export type FormSection = keyof FormData;
export type ValidationField =
  | "email"
  | "fullName"
  | "companyName"
  | "sharePercentage"
  | "address"
  | "dateOfBirth"
  | "experience";
