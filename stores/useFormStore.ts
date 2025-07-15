import { defineStore } from "pinia";
import type { FormData, FormState, FormSection } from "~/types/form";
import {
  generateSessionId,
  isValidEmail,
  calculateTotalSharePercentage,
  calculateTotalBeneficialOwnership,
  calculateCompletionPercentage,
  isCurrentStepValid,
} from "~/utils/formHelpers";
import {
  autoSave,
  submitForm,
  loadSavedData,
  checkApiHealth,
} from "~/stores/formActions";
import { initialFormData, AUTO_SAVE_CONFIG } from "~/constants/formData";

export const useFormStore = defineStore("form", {
  state: (): FormState => ({
    currentStep: 1,
    data: initialFormData,
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
      return isValidEmail(this.data.pointOfContact.email);
    },

    isCurrentStepValid(): boolean {
      return isCurrentStepValid(this.currentStep, this.data);
    },

    completionPercentage(): number {
      return calculateCompletionPercentage(this.data);
    },

    canProceedToNext(): boolean {
      return this.currentStep < 4;
    },

    canGoBack(): boolean {
      return this.currentStep > 1;
    },

    totalSharePercentage(): number {
      return calculateTotalSharePercentage(this.data.shareholders);
    },

    totalBeneficialOwnership(): number {
      return calculateTotalBeneficialOwnership(this.data.beneficialOwners);
    },
  },

  actions: {
    // Navigation actions
    setCurrentStep(step: number) {
      if (step >= 1 && step <= 4) {
        this.currentStep = step;
        this.performAutoSave();
      }
    },

    async nextStep() {
      if (this.canProceedToNext) {
        this.currentStep++;
        await this.performAutoSave();
      }
    },

    previousStep() {
      if (this.canGoBack) {
        this.currentStep--;
        this.performAutoSave();
      }
    },

    // Data update actions
    updateFormData(section: FormSection, field: string, value: any) {
      // @ts-ignore
      this.data[section][field] = value;
      this.debouncedAutoSave();
    },

    // Array management actions
    addArrayItem(section: FormSection, item: any) {
      const newItem = { ...item, id: Date.now().toString() };
      // @ts-ignore
      this.data[section].push(newItem);
      this.performAutoSave();
    },

    updateArrayItem(
      section: FormSection,
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

    removeArrayItem(section: FormSection, id: string) {
      // @ts-ignore
      this.data[section] = this.data[section].filter(
        (item: any) => item.id !== id
      );
      this.performAutoSave();
    },

    // Error management actions
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

    // Auto-save functionality
    async performAutoSave() {
      await autoSave(
        this.sessionId,
        this.currentStep,
        this.data,
        (value) => (this.isAutoSaving = value),
        (date) => (this.lastSaved = date),
        (error) => (this.apiError = error),
        (key, message) => this.addError(key, message)
      );
    },

    // Debounced auto-save
    debouncedAutoSave() {
      if (this.autoSaveTimeout) {
        clearTimeout(this.autoSaveTimeout);
      }
      this.autoSaveTimeout = setTimeout(() => {
        this.performAutoSave();
      }, AUTO_SAVE_CONFIG.DEBOUNCE_DELAY);
    },

    // Load saved form data
    async loadSavedData() {
      await loadSavedData(
        this.sessionId,
        (step) => (this.currentStep = step),
        (data) => (this.data = { ...this.data, ...data })
      );
    },

    // Manual save and exit
    async saveAndExit() {
      await this.performAutoSave();
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
      await submitForm(
        this.data,
        this.isCurrentStepValid,
        (value) => (this.isSubmitting = value),
        (error) => (this.apiError = error),
        (result) => (this.submissionResult = result),
        () => this.clearErrors(),
        (key, message) => this.addError(key, message),
        () => this.resetForm()
      );
    },

    // Check API health
    async checkApiHealth() {
      return await checkApiHealth();
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
