import type { FormSection } from "~/types/form";
import { validateField } from "~/utils/formHelpers";

export const useFormValidation = () => {
  const formStore = useFormStore();

  /**
   * Validate and update a field with error handling
   */
  const validateAndUpdateField = (
    section: FormSection,
    field: string,
    value: any
  ) => {
    const error = validateField(field as any, value);
    const errorKey = `${section}.${field}`;

    if (error) {
      formStore.addError(errorKey, error);
    } else {
      formStore.removeError(errorKey);
    }

    formStore.updateFormData(section, field, value);
  };

  /**
   * Validate and update an array item field
   */
  const validateArrayItem = (
    section: FormSection,
    index: number,
    field: string,
    value: any
  ) => {
    const error = validateField(field as any, value);
    const errorKey = `${section}.${index}.${field}`;

    if (error) {
      formStore.addError(errorKey, error);
    } else {
      formStore.removeError(errorKey);
    }

    // Update the array item
    const items = formStore.data[section] as any[];
    if (items[index]) {
      items[index][field] = value;
      formStore.debouncedAutoSave();
    }
  };

  /**
   * Get error message for a field
   */
  const getFieldError = (
    section: FormSection,
    field: string
  ): string | null => {
    const errorKey = `${section}.${field}`;
    return formStore.errors[errorKey] || null;
  };

  /**
   * Get error message for an array item field
   */
  const getArrayItemError = (
    section: FormSection,
    index: number,
    field: string
  ): string | null => {
    const errorKey = `${section}.${index}.${field}`;
    return formStore.errors[errorKey] || null;
  };

  /**
   * Check if a field has an error
   */
  const hasFieldError = (section: FormSection, field: string): boolean => {
    return getFieldError(section, field) !== null;
  };

  /**
   * Check if an array item field has an error
   */
  const hasArrayItemError = (
    section: FormSection,
    index: number,
    field: string
  ): boolean => {
    return getArrayItemError(section, index, field) !== null;
  };

  /**
   * Clear all errors
   */
  const clearAllErrors = () => {
    formStore.clearErrors();
  };

  /**
   * Clear errors for a specific section
   */
  const clearSectionErrors = (section: FormSection) => {
    const errorsToRemove = Object.keys(formStore.errors).filter((key) =>
      key.startsWith(`${section}.`)
    );
    errorsToRemove.forEach((key) => formStore.removeError(key));
  };

  return {
    validateAndUpdateField,
    validateArrayItem,
    getFieldError,
    getArrayItemError,
    hasFieldError,
    hasArrayItemError,
    clearAllErrors,
    clearSectionErrors,
  };
};
