export const useFormState = () => {
  const formStore = useFormStore();

  /**
   * Get auto-saving state
   */
  const isAutoSaving = computed(() => formStore.isAutoSaving);

  /**
   * Get last saved timestamp
   */
  const lastSaved = computed(() => formStore.lastSaved);

  /**
   * Get submission state
   */
  const isSubmitting = computed(() => formStore.isSubmitting);

  /**
   * Get API error
   */
  const apiError = computed(() => formStore.apiError);

  /**
   * Get submission result
   */
  const submissionResult = computed(() => formStore.submissionResult);

  /**
   * Get session ID
   */
  const sessionId = computed(() => formStore.sessionId);

  /**
   * Get all errors
   */
  const errors = computed(() => formStore.errors);

  /**
   * Check if form has any errors
   */
  const hasErrors = computed(() => Object.keys(formStore.errors).length > 0);

  /**
   * Get error count
   */
  const errorCount = computed(() => Object.keys(formStore.errors).length);

  /**
   * Check if form is valid
   */
  const isFormValid = computed(() => formStore.isCurrentStepValid);

  /**
   * Check if form is complete
   */
  const isFormComplete = computed(() => formStore.completionPercentage === 100);

  /**
   * Get form progress
   */
  const formProgress = computed(() => formStore.completionPercentage);

  /**
   * Check if auto-save is successful
   */
  const isAutoSaveSuccessful = computed(() => {
    return !formStore.isAutoSaving && formStore.lastSaved !== null;
  });

  /**
   * Check if submission is successful
   */
  const isSubmissionSuccessful = computed(() => {
    return formStore.submissionResult?.success === true;
  });

  /**
   * Get submission reference number
   */
  const submissionReferenceNumber = computed(() => {
    return formStore.submissionResult?.referenceNumber;
  });

  /**
   * Get submission message
   */
  const submissionMessage = computed(() => {
    return formStore.submissionResult?.message;
  });

  /**
   * Check if form is dirty (has unsaved changes)
   */
  const isFormDirty = computed(() => {
    // This is a simplified check - in a real app you might want more sophisticated tracking
    return (
      formStore.lastSaved === null &&
      (formStore.data.pointOfContact.fullName ||
        formStore.data.companyInfo.companyName ||
        formStore.data.shareholders.length > 0 ||
        formStore.data.beneficialOwners.length > 0 ||
        formStore.data.directors.length > 0)
    );
  });

  /**
   * Check if form can be submitted
   */
  const canSubmit = computed(() => {
    return (
      formStore.isCurrentStepValid &&
      !formStore.isSubmitting &&
      !formStore.isAutoSaving &&
      formStore.completionPercentage === 100
    );
  });

  /**
   * Check if form can be saved
   */
  const canSave = computed(() => {
    return !formStore.isSubmitting && !formStore.isAutoSaving;
  });

  /**
   * Get form status summary
   */
  const formStatus = computed(() => {
    if (formStore.isSubmitting) return "submitting";
    if (formStore.isAutoSaving) return "saving";
    if (formStore.apiError) return "error";
    if (formStore.submissionResult?.success) return "submitted";
    if (formStore.lastSaved) return "saved";
    return "draft";
  });

  return {
    isAutoSaving,
    lastSaved,
    isSubmitting,
    apiError,
    submissionResult,
    sessionId,
    errors,
    hasErrors,
    errorCount,
    isFormValid,
    isFormComplete,
    formProgress,
    isAutoSaveSuccessful,
    isSubmissionSuccessful,
    submissionReferenceNumber,
    submissionMessage,
    isFormDirty,
    canSubmit,
    canSave,
    formStatus,
  };
};
