# BVI Company Formation Form

A modern, multi-step form application for BVI (British Virgin Islands) company formation built with Nuxt 3, Vue 3, TypeScript, and Pinia.

## 🚀 Features

### Multi-Step Form

- **Step 1**: Company Details & Point of Contact
- **Step 2**: Shareholders Information
- **Step 3**: Beneficial Owners
- **Step 4**: Directors Information

### Real-time Validation

- Frontend validation synced with backend API rules
- Address fields: minimum 10 characters
- Experience field: minimum 10 characters
- Date of birth: must be before today
- Share percentages: 1-100 range
- Real-time error feedback with visual indicators

### Auto-Save & Persistence

- Automatic form saving every 2 seconds
- Local storage persistence
- Session-based data recovery
- Save & exit functionality

### Modern UI/UX

- Dark theme with purple accent
- Responsive design
- Progress indicators
- Step navigation
- Form completion tracking

## 🛠 Tech Stack

- **Framework**: Nuxt 3 + Vue 3
- **Language**: TypeScript
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Validation**: Custom validation system
- **Persistence**: Local Storage with custom serialization

## 📁 Project Structure

```
├── components/          # Vue components for each form step
├── composables/         # Reusable logic (validation, navigation, data)
├── stores/             # Pinia store and actions
├── types/              # TypeScript interfaces and types
├── utils/              # Helper functions
├── constants/          # Form constants and initial data
└── docs/               # Documentation
```

## 🏗 Architecture

### Clean Code Organization

- **Separation of Concerns**: Types, helpers, actions, and composables
- **Single Responsibility**: Each file has a specific purpose
- **Reusability**: Composables for common functionality
- **Type Safety**: Centralized TypeScript definitions

### Key Components

- `useFormValidation`: Field validation and error handling
- `useFormNavigation`: Step navigation and progress tracking
- `useFormData`: Form data access and manipulation
- `useFormState`: Form state monitoring and status

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📋 Form Sections

### Company Details

- Point of contact information
- Company name and designation
- Countries of interest
- Share structure configuration

### Shareholders

- Individual or corporate shareholders
- Share percentage allocation
- Personal information (for individuals)
- Corporate details (for entities)

### Beneficial Owners

- Ownership percentage tracking
- Source of funds information
- Politically exposed person (PEP) status
- Regulatory compliance data

### Directors

- Director consent and qualifications
- Experience and occupation details
- Personal information and addresses

## ✅ Validation Rules

- **Addresses**: Minimum 10 characters
- **Experience**: Minimum 10 characters
- **Dates**: Must be valid dates before today
- **Percentages**: Must be between 1-100
- **Email**: Valid email format
- **Required Fields**: All mandatory fields must be completed

## 🔄 Auto-Save Features

- Debounced auto-save (2-second delay)
- Session-based data persistence
- Form state recovery on page reload
- Visual save indicators
- Error handling for save failures

## 🎨 UI Components

- **StepIndicator**: Visual progress tracking
- **FormNavigation**: Next/Previous buttons
- **AutoSaveIndicator**: Save status display
- **SaveAndExitButton**: Manual save functionality

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly form controls
- Adaptive layout for all screen sizes

## 🔧 Development

The project follows modern Vue 3 and Nuxt 3 best practices with:

- Composition API
- TypeScript for type safety
- Pinia for state management
- Tailwind CSS for styling
- Custom composables for reusability

## 📄 License

This project is built for BVI company formation services.
