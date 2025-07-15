import { defineStore } from "pinia";
import { useApi, type ApiError } from "~/composables/useApi";

const { companyFormation, health } = useApi();

// Generate unique session ID
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

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

const initialData: FormData = {
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

export const useFormStore = defineStore("form", {
  state: (): FormState => ({
    currentStep: 1,
    data: initialData,
    isAutoSaving: false,
    lastSaved: null,
    errors: {},
    isSubmitting: false,
    sessionId: generateSessionId(),
    submissionResult: null,
    apiError: null,
  }),

  getters: {
    isValidEmail(): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.data.pointOfContact.email);
    },

    isCurrentStepValid(): boolean {
      switch (this.currentStep) {
        case 1:
          return (
            this.data.pointOfContact.fullName.trim() !== "" &&
            this.data.pointOfContact.email.trim() !== "" &&
            this.isValidEmail &&
            this.data.companyInfo.companyName.trim() !== "" &&
            this.data.companyInfo.designation !== "" &&
            this.data.countriesOfInterest.jurisdictionOfOperation !== ""
          );
        case 2:
          return (
            this.data.shareholders.length > 0 &&
            this.data.shareholders.every(
              (s) =>
                s.fullName &&
                s.nationality &&
                s.address &&
                s.sharePercentage > 0
            ) &&
            this.totalSharePercentage === 100
          );
        case 3:
          return (
            this.data.beneficialOwners.length > 0 &&
            this.data.beneficialOwners.every(
              (b) =>
                b.fullName &&
                b.nationality &&
                b.address &&
                b.ownershipPercentage > 0 &&
                b.sourceOfFunds
            )
          );
        case 4:
          return (
            this.data.directors.length > 0 &&
            this.data.directors.every(
              (d) =>
                d.fullName &&
                d.nationality &&
                d.address &&
                d.consentToAct &&
                d.occupation
            )
          );
        default:
          return false;
      }
    },

    completionPercentage(): number {
      let completedSteps = 0;

      // Step 1 validation
      if (
        this.data.pointOfContact.fullName &&
        this.data.companyInfo.companyName &&
        this.data.countriesOfInterest.jurisdictionOfOperation
      ) {
        completedSteps++;
      }

      // Step 2 validation
      if (this.data.shareholders.length > 0) {
        completedSteps++;
      }

      // Step 3 validation
      if (this.data.beneficialOwners.length > 0) {
        completedSteps++;
      }

      // Step 4 validation
      if (this.data.directors.length > 0) {
        completedSteps++;
      }

      return Math.round((completedSteps / 4) * 100);
    },

    canProceedToNext(): boolean {
      return this.currentStep < 4;
    },

    canGoBack(): boolean {
      return this.currentStep > 1;
    },

    totalSharePercentage(): number {
      return this.data.shareholders.reduce(
        (sum, s) => sum + s.sharePercentage,
        0
      );
    },

    totalBeneficialOwnership(): number {
      return this.data.beneficialOwners.reduce(
        (sum, b) => sum + b.ownershipPercentage,
        0
      );
    },
  },

  actions: {
    // Navigation actions
    setCurrentStep(step: number) {
      if (step >= 1 && step <= 4) {
        this.currentStep = step;
        this.autoSave();
      }
    },

    async nextStep() {
      if (this.canProceedToNext) {
        this.currentStep++;
        await this.autoSave();
      }
    },

    previousStep() {
      if (this.canGoBack) {
        this.currentStep--;
        this.autoSave();
      }
    },

    // Data update actions
    updateFormData(section: keyof FormData, field: string, value: any) {
      // @ts-ignore
      this.data[section][field] = value;
      this.debouncedAutoSave();
    },

    // Array management actions
    addArrayItem(section: keyof FormData, item: any) {
      const newItem = { ...item, id: Date.now().toString() };
      // @ts-ignore
      this.data[section].push(newItem);
      this.autoSave();
    },

    updateArrayItem(
      section: keyof FormData,
      id: string,
      field: string,
      value: any
    ) {
      // @ts-ignore
      const items = this.data[section] as any[];
      const item = items.find((item) => item.id === id);
      if (item) {
        item[field] = value;
        this.debouncedAutoSave();
      }
    },

    removeArrayItem(section: keyof FormData, id: string) {
      // @ts-ignore
      this.data[section] = this.data[section].filter(
        (item: any) => item.id !== id
      );
      this.autoSave();
    },

    // Validation actions
    setErrors(errors: Record<string, string>) {
      this.errors = errors;
    },

    clearErrors() {
      this.errors = {};
    },

    addError(field: string, message: string) {
      this.errors[field] = message;
    },

    removeError(field: string) {
      delete this.errors[field];
    },

    // Field validation actions
    validateField(field: string, value: any): string | null {
      switch (field) {
        case "email":
          if (!value) return "Email is required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Please enter a valid email address";
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
    },

    validateAndUpdateField(section: keyof FormData, field: string, value: any) {
      const error = this.validateField(field, value);
      const errorKey = `${section}.${field}`;

      if (error) {
        this.addError(errorKey, error);
      } else {
        this.removeError(errorKey);
      }

      // @ts-ignore
      this.data[section][field] = value;
      this.debouncedAutoSave();
    },

    validateArrayItem(
      section: keyof FormData,
      index: number,
      field: string,
      value: any
    ) {
      const error = this.validateField(field, value);
      const errorKey = `${section}.${index}.${field}`;

      if (error) {
        this.addError(errorKey, error);
      } else {
        this.removeError(errorKey);
      }

      // @ts-ignore
      this.data[section][index][field] = value;
      this.debouncedAutoSave();
    },

    // Transform data for API submission
    transformDataForApi() {
      return {
        point_of_contact: {
          full_name: this.data.pointOfContact.fullName,
          email: this.data.pointOfContact.email,
        },
        company_info: {
          company_name: this.data.companyInfo.companyName,
          alternative_company_name:
            this.data.companyInfo.alternativeCompanyName || null,
          designation: this.data.companyInfo.designation,
        },
        countries_of_interest: {
          jurisdiction_of_operation:
            this.data.countriesOfInterest.jurisdictionOfOperation,
          target_jurisdictions:
            this.data.countriesOfInterest.targetJurisdictions,
        },
        shares_structure: {
          number_of_shares: this.data.sharesStructure.numberOfShares,
          all_shares_issued: this.data.sharesStructure.allSharesIssued,
          number_of_issued_shares:
            this.data.sharesStructure.numberOfIssuedShares || null,
          value_per_share: this.data.sharesStructure.valuePerShare,
        },
        shareholders: this.data.shareholders.map((s) => ({
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
        beneficial_owners: this.data.beneficialOwners.map((b) => ({
          full_name: b.fullName,
          nationality: b.nationality,
          address: b.address,
          date_of_birth: b.dateOfBirth,
          passport_number: b.passportNumber,
          ownership_percentage: b.ownershipPercentage,
          source_of_funds: b.sourceOfFunds,
          politically_exposed: b.politicallyExposed,
        })),
        directors: this.data.directors.map((d) => ({
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
    },

    // Auto-save functionality
    async autoSave() {
      if (this.isAutoSaving) return;
      this.isAutoSaving = true;
      this.apiError = null;

      try {
        // Simulate API call
        await companyFormation.autoSave(
          this.sessionId,
          this.currentStep,
          this.data
        );
        this.lastSaved = new Date();

        // Clear the saved indicator after 3 seconds
        setTimeout(() => {
          this.lastSaved = null;
        }, 3000);
      } catch (error) {
        console.error("Auto-save failed:", error);
        this.apiError =
          error instanceof Error ? error.message : "Auto-save failed";
        this.addError("autosave", "Failed to save form data");
      } finally {
        this.isAutoSaving = false;
      }
    },

    // Debounced auto-save
    debouncedAutoSave() {
      if (this.autoSaveTimeout) {
        clearTimeout(this.autoSaveTimeout);
      }
      this.autoSaveTimeout = setTimeout(() => {
        this.autoSave();
      }, 2000);
    },

    // Load saved form data
    async loadSavedData() {
      try {
        const response = await companyFormation.getFormData(this.sessionId);

        if (response.success && response.data) {
          this.currentStep = response.data.current_step || 1;
          if (response.data.form_data) {
            this.data = { ...this.data, ...response.data.form_data };
          }
        }
      } catch (error) {
        console.error("Failed to load saved data:", error);
      }
    },

    // Manual save and exit
    async saveAndExit() {
      await this.autoSave();
      if (!this.apiError) {
        alert("Form saved successfully! You can continue later.");
      } else {
        alert("Save failed. Please try again.");
      }
    },

    // Reset form
    resetForm() {
      this.$reset();
      this.sessionId = generateSessionId();
    },

    // Submit form
    async submitForm() {
      this.isSubmitting = true;
      this.apiError = null;
      this.submissionResult = null;
      this.clearErrors();

      try {
        // Validate all steps
        if (!this.isCurrentStepValid) {
          throw new Error("Please complete all required fields");
        }

        const apiData = this.transformDataForApi();

        const response = await companyFormation.submit(apiData);

        if (response.success) {
          this.submissionResult = {
            success: true,
            referenceNumber: response.data?.reference_number,
            message: response.message || "Application submitted successfully!",
          };

          // Show success message
          alert(
            `BVI Company formation submitted successfully!\n\nReference Number: ${response.data?.reference_number}\n\nWe will contact you within 24 hours.`
          );

          // Reset form after successful submission
          this.resetForm();
        } else {
          throw new Error(response.message || "Submission failed");
        }
        this.resetForm();
      } catch (error) {
        console.error("Form submission failed:", error);
        const apiError = error as ApiError;
        this.apiError = apiError.message || "Submission failed";

        // Show validation error messages
        if (apiError.errors) {
          const errorMessages = Object.values(apiError.errors)
            .map((messages) =>
              Array.isArray(messages) ? messages[0] : messages
            )
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
        this.addError(
          "submit",
          error.res?.data?.errors?.[0] ||
            (error instanceof Error ? error.message : "Submission failed")
        );
      } finally {
        this.isSubmitting = false;
      }
    },

    // Check API health
    async checkApiHealth() {
      try {
        const response = await health();
        console.log("API Health:", response);
        return response.success;
      } catch (error) {
        console.error("API Health check failed:", error);
        return false;
      }
    },
  },

  persist: {
    key: "bvi-form-storage",
    storage: process.client ? window.localStorage : undefined,
    paths: ["currentStep", "data", "lastSaved", "sessionId"],
    serializer: {
      serialize: (value) => {
        const serialized = { ...value };
        if (serialized.lastSaved instanceof Date) {
          serialized.lastSaved = serialized.lastSaved.toISOString();
        }
        return JSON.stringify(serialized);
      },
      deserialize: (value) => {
        const parsed = JSON.parse(value);

        // Handle date restoration
        if (parsed.lastSaved && typeof parsed.lastSaved === "string") {
          try {
            parsed.lastSaved = new Date(parsed.lastSaved);
            if (isNaN(parsed.lastSaved.getTime())) {
              parsed.lastSaved = null;
            }
          } catch (error) {
            parsed.lastSaved = null;
          }
        }

        // Ensure currentStep is valid
        if (parsed.currentStep && typeof parsed.currentStep === "number") {
          parsed.currentStep = Math.max(1, Math.min(4, parsed.currentStep));
        }

        return parsed;
      },
    },
  },
});
