import { defineStore } from "pinia";

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

    nextStep() {
      if (this.canProceedToNext) {
        this.currentStep++;
        this.autoSave();
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

    // Auto-save functionality
    async autoSave() {
      this.isAutoSaving = true;

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.lastSaved = new Date();

        // Clear the saved indicator after 3 seconds
        setTimeout(() => {
          this.lastSaved = null;
        }, 3000);
      } catch (error) {
        console.error("Auto-save failed:", error);
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

    // Manual save and exit
    async saveAndExit() {
      await this.autoSave();
      alert("Form saved successfully! You can continue later.");
    },

    // Reset form
    resetForm() {
      this.$reset();
    },

    // Submit form
    async submitForm() {
      this.isSubmitting = true;
      this.clearErrors();

      try {
        // Validate all steps
        if (!this.isCurrentStepValid) {
          throw new Error("Please complete all required fields");
        }

        // Simulate API submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        alert(
          "BVI Company formation submitted successfully! We will contact you within 24 hours."
        );
        this.resetForm();
      } catch (error) {
        console.error("Form submission failed:", error);
        this.addError(
          "submit",
          error instanceof Error ? error.message : "Submission failed"
        );
      } finally {
        this.isSubmitting = false;
      }
    },
  },

  persist: {
    key: "bvi-form-storage",
    storage: process.client ? window.localStorage : undefined,
    paths: ["currentStep", "data", "lastSaved"],
  },
});
