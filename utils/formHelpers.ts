import type { ValidationField } from "~/types/form";

/**
 * Generate a unique session ID for form tracking
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a specific field based on field type
 */
export const validateField = (
  field: ValidationField,
  value: any
): string | null => {
  switch (field) {
    case "email":
      if (!value) return "Email is required";
      if (!isValidEmail(value)) return "Please enter a valid email address";
      return null;
    case "fullName":
      if (!value || value.trim().length < 2)
        return "Full name must be at least 2 characters";
      return null;
    case "companyName":
      if (!value || value.trim().length < 2)
        return "Company name must be at least 2 characters";
      return null;
    case "sharePercentage":
      if (value <= 0 || value > 100)
        return "Share percentage must be between 1 and 100";
      return null;
    case "address":
      if (!value || value.trim().length < 10)
        return "Address must be at least 10 characters";
      return null;
    case "dateOfBirth":
      if (!value) return "Date of birth is required";
      const date = new Date(value);
      const today = new Date();
      if (isNaN(date.getTime())) return "Please enter a valid date";
      if (date >= today) return "Date of birth must be a date before today";
      return null;
    case "experience":
      if (!value || value.trim().length < 10)
        return "Experience must be at least 10 characters";
      return null;
    default:
      return null;
  }
};

/**
 * Calculate total share percentage
 */
export const calculateTotalSharePercentage = (shareholders: any[]): number => {
  return shareholders.reduce((sum, s) => sum + s.sharePercentage, 0);
};

/**
 * Calculate total beneficial ownership percentage
 */
export const calculateTotalBeneficialOwnership = (
  beneficialOwners: any[]
): number => {
  return beneficialOwners.reduce((sum, b) => sum + b.ownershipPercentage, 0);
};

/**
 * Calculate form completion percentage
 */
export const calculateCompletionPercentage = (data: any): number => {
  let completedSteps = 0;

  // Step 1 validation
  if (
    data.pointOfContact.fullName &&
    data.companyInfo.companyName &&
    data.countriesOfInterest.jurisdictionOfOperation
  ) {
    completedSteps++;
  }

  // Step 2 validation
  if (data.shareholders.length > 0) {
    completedSteps++;
  }

  // Step 3 validation
  if (data.beneficialOwners.length > 0) {
    completedSteps++;
  }

  // Step 4 validation
  if (data.directors.length > 0) {
    completedSteps++;
  }

  return Math.round((completedSteps / 4) * 100);
};

/**
 * Check if current step is valid
 */
export const isCurrentStepValid = (currentStep: number, data: any): boolean => {
  switch (currentStep) {
    case 1:
      return (
        data.pointOfContact.fullName.trim() !== "" &&
        data.pointOfContact.email.trim() !== "" &&
        isValidEmail(data.pointOfContact.email) &&
        data.companyInfo.companyName.trim() !== "" &&
        data.companyInfo.designation !== "" &&
        data.countriesOfInterest.jurisdictionOfOperation !== ""
      );
    case 2:
      return (
        data.shareholders.length > 0 &&
        data.shareholders.every(
          (s: any) =>
            s.fullName &&
            s.nationality &&
            s.address &&
            s.address.trim().length >= 10 && // Backend validation: at least 10 characters
            s.sharePercentage > 0
        ) &&
        calculateTotalSharePercentage(data.shareholders) === 100
      );
    case 3:
      return (
        data.beneficialOwners.length > 0 &&
        data.beneficialOwners.every(
          (b: any) =>
            b.fullName &&
            b.nationality &&
            b.address &&
            b.address.trim().length >= 10 && // Backend validation: at least 10 characters
            b.ownershipPercentage > 0 &&
            b.sourceOfFunds
        )
      );
    case 4:
      return (
        data.directors.length > 0 &&
        data.directors.every(
          (d: any) =>
            d.fullName &&
            d.nationality &&
            d.address &&
            d.address.trim().length >= 10 && // Backend validation: at least 10 characters
            d.consentToAct &&
            d.occupation &&
            d.experience &&
            d.experience.trim().length >= 10 // Backend validation: at least 10 characters
        )
      );
    default:
      return false;
  }
};
