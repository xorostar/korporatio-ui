import type { FormSection } from "~/types/form";

export const useFormData = () => {
  const formStore = useFormStore();

  /**
   * Update a form field
   */
  const updateField = (section: FormSection, field: string, value: any) => {
    formStore.updateFormData(section, field, value);
  };

  /**
   * Add an item to an array section
   */
  const addItem = (section: FormSection, item: any) => {
    formStore.addArrayItem(section, item);
  };

  /**
   * Update an array item field
   */
  const updateArrayItem = (
    section: FormSection,
    id: string,
    field: string,
    value: any
  ) => {
    formStore.updateArrayItem(section, id, field, value);
  };

  /**
   * Remove an item from an array section
   */
  const removeItem = (section: FormSection, id: string) => {
    formStore.removeArrayItem(section, id);
  };

  /**
   * Get form data
   */
  const getFormData = computed(() => formStore.data);

  /**
   * Get specific section data
   */
  const getSectionData = (section: FormSection) => {
    return formStore.data[section];
  };

  /**
   * Get point of contact data
   */
  const getPointOfContact = computed(() => formStore.data.pointOfContact);

  /**
   * Get company info data
   */
  const getCompanyInfo = computed(() => formStore.data.companyInfo);

  /**
   * Get countries of interest data
   */
  const getCountriesOfInterest = computed(
    () => formStore.data.countriesOfInterest
  );

  /**
   * Get shares structure data
   */
  const getSharesStructure = computed(() => formStore.data.sharesStructure);

  /**
   * Get shareholders data
   */
  const getShareholders = computed(() => formStore.data.shareholders);

  /**
   * Get beneficial owners data
   */
  const getBeneficialOwners = computed(() => formStore.data.beneficialOwners);

  /**
   * Get directors data
   */
  const getDirectors = computed(() => formStore.data.directors);

  /**
   * Get total share percentage
   */
  const getTotalSharePercentage = computed(
    () => formStore.totalSharePercentage
  );

  /**
   * Get total beneficial ownership percentage
   */
  const getTotalBeneficialOwnership = computed(
    () => formStore.totalBeneficialOwnership
  );

  /**
   * Check if shareholders total equals 100%
   */
  const isShareholdersTotalValid = computed(
    () => formStore.totalSharePercentage === 100
  );

  /**
   * Reset form data
   */
  const resetForm = () => {
    formStore.resetForm();
  };

  /**
   * Load saved form data
   */
  const loadSavedData = async () => {
    await formStore.loadSavedData();
  };

  /**
   * Save and exit
   */
  const saveAndExit = async () => {
    await formStore.saveAndExit();
  };

  /**
   * Submit form
   */
  const submitForm = async () => {
    await formStore.submitForm();
  };

  /**
   * Check API health
   */
  const checkApiHealth = async () => {
    return await formStore.checkApiHealth();
  };

  return {
    updateField,
    addItem,
    updateArrayItem,
    removeItem,
    getFormData,
    getSectionData,
    getPointOfContact,
    getCompanyInfo,
    getCountriesOfInterest,
    getSharesStructure,
    getShareholders,
    getBeneficialOwners,
    getDirectors,
    getTotalSharePercentage,
    getTotalBeneficialOwnership,
    isShareholdersTotalValid,
    resetForm,
    loadSavedData,
    saveAndExit,
    submitForm,
    checkApiHealth,
  };
};
