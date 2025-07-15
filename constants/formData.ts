import type { FormData } from "~/types/form";

/**
 * Initial form data structure
 */
export const initialFormData: FormData = {
  pointOfContact: {
    fullName: "",
    email: "",
  },
  companyInfo: {
    companyName: "",
    alternativeCompanyName: "",
    designation: "",
  },
  countriesOfInterest: {
    jurisdictionOfOperation: "",
    targetJurisdictions: [],
  },
  sharesStructure: {
    numberOfShares: 1,
    allSharesIssued: true,
    valuePerShare: 1,
  },
  shareholders: [],
  beneficialOwners: [],
  directors: [],
};

/**
 * Form step configuration
 */
export const FORM_STEPS = {
  COMPANY_DETAILS: 1,
  SHAREHOLDERS: 2,
  BENEFICIAL_OWNER: 3,
  DIRECTOR: 4,
} as const;

/**
 * Validation error messages
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL_INVALID: "Please enter a valid email address",
  MIN_LENGTH: (field: string, min: number) =>
    `${field} must be at least ${min} characters`,
  SHARE_PERCENTAGE_RANGE: "Share percentage must be between 1 and 100",
  ADDRESS_MIN_LENGTH: "Address must be at least 10 characters",
  DATE_BEFORE_TODAY: "Date of birth must be a date before today",
  EXPERIENCE_MIN_LENGTH: "Experience must be at least 10 characters",
  TOTAL_SHARE_PERCENTAGE: "Total share percentage must equal 100%",
} as const;

/**
 * Auto-save configuration
 */
export const AUTO_SAVE_CONFIG = {
  DEBOUNCE_DELAY: 2000, // 2 seconds
  SUCCESS_DISPLAY_TIME: 3000, // 3 seconds
} as const;
