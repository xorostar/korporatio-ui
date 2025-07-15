# Form Architecture Documentation

## Overview

This document describes the refactored architecture of the BVI Company Formation form, which has been organized into a clean, maintainable structure with separated concerns.

## File Structure

```
├── types/
│   └── form.ts                    # Type definitions and interfaces
├── utils/
│   └── formHelpers.ts             # Helper functions and utilities
├── stores/
│   ├── useFormStore.ts            # Main Pinia store
│   └── formActions.ts             # Form actions and API calls
├── composables/
│   ├── useFormValidation.ts       # Form validation logic
│   ├── useFormNavigation.ts       # Form navigation logic
│   ├── useFormData.ts             # Form data management
│   └── useFormState.ts            # Form state management
├── constants/
│   └── formData.ts                # Constants and initial data
└── docs/
    └── ARCHITECTURE.md            # This file
```

## Architecture Principles

### 1. Separation of Concerns

- **Types**: All TypeScript interfaces and types are centralized in `types/form.ts`
- **Helpers**: Pure utility functions in `utils/formHelpers.ts`
- **Actions**: API calls and complex business logic in `stores/formActions.ts`
- **Composables**: Reusable logic for components in `composables/`
- **Constants**: Configuration and initial data in `constants/formData.ts`

### 2. Single Responsibility

Each file has a single, well-defined purpose:

- Store: State management and basic CRUD operations
- Actions: Complex operations and API integration
- Composables: Specific functionality for components
- Helpers: Pure utility functions
- Types: Type safety and contracts

### 3. Reusability

Composables provide reusable logic that can be used across multiple components:

- `useFormValidation`: Field validation and error handling
- `useFormNavigation`: Step navigation and progress tracking
- `useFormData`: Data access and manipulation
- `useFormState`: State monitoring and status checks

## Key Components

### Types (`types/form.ts`)

```typescript
export interface FormData {
  pointOfContact: { /* ... */ };
  companyInfo: { /* ... */ };
  // ... other form sections
}

export interface FormState {
  currentStep: number;
  data: FormData;
  // ... other state properties
}

export type FormSection = keyof FormData;
export type ValidationField = 'email' | 'fullName' | /* ... */;
```

### Helpers (`utils/formHelpers.ts`)

```typescript
export const generateSessionId = (): string => {
  /* ... */
};
export const validateField = (
  field: ValidationField,
  value: any
): string | null => {
  /* ... */
};
export const calculateTotalSharePercentage = (shareholders: any[]): number => {
  /* ... */
};
export const isCurrentStepValid = (currentStep: number, data: any): boolean => {
  /* ... */
};
```

### Actions (`stores/formActions.ts`)

```typescript
export const autoSave = async (/* ... */) => {
  /* ... */
};
export const submitForm = async (/* ... */) => {
  /* ... */
};
export const transformDataForApi = (data: FormData): ApiSubmissionData => {
  /* ... */
};
```

### Composables

#### `useFormValidation`

Provides field validation and error management:

```typescript
const { validateAndUpdateField, getFieldError, hasFieldError } =
  useFormValidation();
```

#### `useFormNavigation`

Handles step navigation and progress tracking:

```typescript
const { nextStep, previousStep, currentStep, isStepCompleted } =
  useFormNavigation();
```

#### `useFormData`

Manages form data access and manipulation:

```typescript
const { updateField, addItem, getShareholders, submitForm } = useFormData();
```

#### `useFormState`

Monitors form state and status:

```typescript
const { isAutoSaving, isSubmitting, canSubmit, formStatus } = useFormState();
```

## Store Structure

The main store (`useFormStore.ts`) is now much cleaner and focused on:

- State definition
- Basic getters
- Simple CRUD operations
- Integration with external actions

Complex operations are delegated to:

- `formActions.ts` for API calls and business logic
- `formHelpers.ts` for calculations and validations
- Composables for component-specific logic

## Benefits of This Architecture

### 1. Maintainability

- Clear separation of concerns
- Easy to locate and modify specific functionality
- Reduced coupling between components

### 2. Testability

- Pure functions in helpers are easy to test
- Actions can be tested independently
- Composables can be mocked for component testing

### 3. Reusability

- Composables can be used across multiple components
- Helpers can be imported anywhere
- Types provide consistent contracts

### 4. Type Safety

- Centralized type definitions
- Consistent interfaces across the application
- Better IDE support and error catching

### 5. Performance

- Computed properties in composables for reactive data
- Debounced auto-save operations
- Efficient state updates

## Usage Examples

### In a Component

```vue
<script setup>
const { validateAndUpdateField, getFieldError } = useFormValidation();
const { nextStep, currentStep } = useFormNavigation();
const { updateField, getPointOfContact } = useFormData();
const { isAutoSaving, canSubmit } = useFormState();

const handleFieldUpdate = (field, value) => {
  validateAndUpdateField("pointOfContact", field, value);
};
</script>
```

### Validation

```typescript
// In a component
const { validateAndUpdateField } = useFormValidation();
validateAndUpdateField("pointOfContact", "email", "user@example.com");
```

### Navigation

```typescript
// In a component
const { nextStep, isStepCompleted } = useFormNavigation();
if (isStepCompleted(1)) {
  await nextStep();
}
```

## Migration Guide

When updating components to use the new architecture:

1. **Replace direct store access** with composables
2. **Use validation composable** for field validation
3. **Use navigation composable** for step management
4. **Use data composable** for form operations
5. **Use state composable** for status monitoring

This architecture provides a clean, maintainable, and scalable foundation for the form application.
