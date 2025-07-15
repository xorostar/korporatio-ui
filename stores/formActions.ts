import type { FormData, FormSection, ApiSubmissionData } from "~/types/form";
import { validateField } from "~/utils/formHelpers";
import { useApi, type ApiError } from "~/composables/useApi";

const { companyFormation, health } = useApi();

/**
 * Transform form data for API submission
 */
export const transformDataForApi = (data: FormData): ApiSubmissionData => {
  return {
    point_of_contact: {
      full_name: data.pointOfContact.fullName,
      email: data.pointOfContact.email,
    },
    company_info: {
      company_name: data.companyInfo.companyName,
      alternative_company_name: data.companyInfo.alternativeCompanyName || null,
      designation: data.companyInfo.designation,
    },
    countries_of_interest: {
      jurisdiction_of_operation:
        data.countriesOfInterest.jurisdictionOfOperation,
      target_jurisdictions: data.countriesOfInterest.targetJurisdictions,
    },
    shares_structure: {
      number_of_shares: data.sharesStructure.numberOfShares,
      all_shares_issued: data.sharesStructure.allSharesIssued,
      number_of_issued_shares:
        data.sharesStructure.numberOfIssuedShares || null,
      value_per_share: data.sharesStructure.valuePerShare,
    },
    shareholders: data.shareholders.map((s) => ({
      type: s.type,
      full_name: s.fullName,
      nationality: s.nationality,
      address: s.address,
      share_percentage: s.sharePercentage,
      date_of_birth: s.dateOfBirth || null,
      passport_number: s.passportNumber || null,
      corporate_name: s.corporateName || null,
      registration_number: s.registrationNumber || null,
    })),
    beneficial_owners: data.beneficialOwners.map((b) => ({
      full_name: b.fullName,
      nationality: b.nationality,
      address: b.address,
      date_of_birth: b.dateOfBirth,
      passport_number: b.passportNumber,
      ownership_percentage: b.ownershipPercentage,
      source_of_funds: b.sourceOfFunds,
      politically_exposed: b.politicallyExposed,
    })),
    directors: data.directors.map((d) => ({
      full_name: d.fullName,
      nationality: d.nationality,
      address: d.address,
      date_of_birth: d.dateOfBirth,
      passport_number: d.passportNumber,
      occupation: d.occupation,
      experience: d.experience,
      consent_to_act: d.consentToAct,
    })),
  };
};

/**
 * Validate and update a field with error handling
 */
export const validateAndUpdateField = (
  data: FormData,
  section: FormSection,
  field: string,
  value: any,
  setError: (key: string, message: string) => void,
  removeError: (key: string) => void,
  updateData: (section: FormSection, field: string, value: any) => void
) => {
  const error = validateField(field as any, value);
  const errorKey = `${section}.${field}`;

  if (error) {
    setError(errorKey, error);
  } else {
    removeError(errorKey);
  }

  updateData(section, field, value);
};

/**
 * Validate and update an array item field
 */
export const validateArrayItem = (
  data: FormData,
  section: FormSection,
  index: number,
  field: string,
  value: any,
  setError: (key: string, message: string) => void,
  removeError: (key: string) => void,
  updateArrayItem: (
    section: FormSection,
    index: number,
    field: string,
    value: any
  ) => void
) => {
  const error = validateField(field as any, value);
  const errorKey = `${section}.${index}.${field}`;

  if (error) {
    setError(errorKey, error);
  } else {
    removeError(errorKey);
  }

  updateArrayItem(section, index, field, value);
};

/**
 * Auto-save form data
 */
export const autoSave = async (
  sessionId: string,
  currentStep: number,
  data: FormData,
  setIsAutoSaving: (value: boolean) => void,
  setLastSaved: (date: Date | null) => void,
  setApiError: (error: string | null) => void,
  setError: (key: string, message: string) => void
) => {
  setIsAutoSaving(true);
  setApiError(null);

  try {
    await companyFormation.autoSave(sessionId, currentStep, data);
    setLastSaved(new Date());

    // Clear the saved indicator after 3 seconds
    setTimeout(() => {
      setLastSaved(null);
    }, 3000);
  } catch (error) {
    console.error("Auto-save failed:", error);
    setApiError(error instanceof Error ? error.message : "Auto-save failed");
    setError("autosave", "Failed to save form data");
  } finally {
    setIsAutoSaving(false);
  }
};

/**
 * Submit form data
 */
export const submitForm = async (
  data: FormData,
  isCurrentStepValid: boolean,
  setIsSubmitting: (value: boolean) => void,
  setApiError: (error: string | null) => void,
  setSubmissionResult: (result: any) => void,
  clearErrors: () => void,
  setError: (key: string, message: string) => void,
  resetForm: () => void
) => {
  setIsSubmitting(true);
  setApiError(null);
  setSubmissionResult(null);
  clearErrors();

  try {
    if (!isCurrentStepValid) {
      throw new Error("Please complete all required fields");
    }

    const apiData = transformDataForApi(data);
    const response = await companyFormation.submit(apiData);

    if (response.success) {
      setSubmissionResult({
        success: true,
        referenceNumber: response.data?.reference_number,
        message: response.message || "Application submitted successfully!",
      });

      alert(
        `BVI Company formation submitted successfully!\n\nReference Number: ${response.data?.reference_number}\n\nWe will contact you within 24 hours.`
      );

      resetForm();
    } else {
      throw new Error(response.message || "Submission failed");
    }
  } catch (error) {
    console.error("Form submission failed:", error);
    const apiError = error as ApiError;
    setApiError(apiError.message || "Submission failed");

    // Show validation error messages
    if (apiError.errors) {
      const errorMessages = Object.values(apiError.errors)
        .map((messages) => (Array.isArray(messages) ? messages[0] : messages))
        .join("\n\n");

      alert(`Please fix the following errors:\n\n${errorMessages}`);
    } else {
      alert(
        `Submission failed: ${
          error.res?.data?.errors?.[0] ||
          (error instanceof Error ? error.message : "Submission failed")
        }`
      );
    }

    setError(
      "submit",
      error.res?.data?.errors?.[0] ||
        (error instanceof Error ? error.message : "Submission failed")
    );
  } finally {
    setIsSubmitting(false);
  }
};

/**
 * Load saved form data
 */
export const loadSavedData = async (
  sessionId: string,
  setCurrentStep: (step: number) => void,
  updateData: (data: Partial<FormData>) => void
) => {
  try {
    const response = await companyFormation.getFormData(sessionId);

    if (response.success && response.data) {
      setCurrentStep(response.data.current_step || 1);
      if (response.data.form_data) {
        updateData(response.data.form_data);
      }
    }
  } catch (error) {
    console.error("Failed to load saved data:", error);
  }
};

/**
 * Check API health
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await health();
    console.log("API Health:", response);
    return response.success;
  } catch (error) {
    console.error("API Health check failed:", error);
    return false;
  }
};
