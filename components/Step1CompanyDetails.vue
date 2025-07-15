<script setup lang="ts">
import { useFormStore } from "~/stores/useFormStore";

const formStore = useFormStore();
const primaryColor = "#8b5cf6";
</script>

<template>
  <div class="space-y-8 md:space-y-12">
    <!-- Point of Contact -->
    <section>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div class="lg:col-span-4">
          <h2
            class="text-xl md:text-2xl font-bold text-white mb-4 pb-2 border-b-2"
            :style="{ borderBottomColor: primaryColor }"
          >
            Point of contact
          </h2>
          <p class="text-slate-300 leading-relaxed text-sm md:text-base">
            This is the individual that we will communicate with. Communications
            related to this form but also to the company once incorporated will
            be sent to the same email address. You can change it later on if
            required.
          </p>
        </div>

        <div class="lg:col-span-8 space-y-4 md:space-y-6">
          <div>
            <label
              for="fullName"
              class="text-white text-base md:text-lg font-medium mb-3 block"
            >
              Full name *
            </label>
            <div class="relative">
              <input
                id="fullName"
                v-model="formStore.data.pointOfContact.fullName"
                @input="
                  formStore.validateAndUpdateField(
                    'pointOfContact',
                    'fullName',
                    ($event.target as HTMLInputElement).value
                  )
                "
                @blur="
                  formStore.validateAndUpdateField(
                    'pointOfContact',
                    'fullName',
                    ($event.target as HTMLInputElement).value
                  )
                "
                class="theme-input text-base md:text-lg py-3 pr-12"
                :class="{
                  'border-red-500': formStore.errors['pointOfContact.fullName'],
                }"
                placeholder="Enter your full name"
              />
              <svg
                v-if="
                  formStore.data.pointOfContact.fullName &&
                  !formStore.errors['pointOfContact.fullName']
                "
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <p
              v-if="formStore.errors['pointOfContact.fullName']"
              class="text-red-400 text-sm mt-2"
            >
              {{ formStore.errors["pointOfContact.fullName"] }}
            </p>
          </div>

          <div>
            <label
              for="email"
              class="text-white text-base md:text-lg font-medium mb-3 block"
            >
              Email *
            </label>
            <div class="relative">
              <input
                id="email"
                type="email"
                v-model="formStore.data.pointOfContact.email"
                @input="
                  formStore.validateAndUpdateField(
                    'pointOfContact',
                    'email',
                    ($event.target as HTMLInputElement).value
                  )
                "
                @blur="
                  formStore.validateAndUpdateField(
                    'pointOfContact',
                    'email',
                    ($event.target as HTMLInputElement).value
                  )
                "
                class="theme-input text-base md:text-lg py-3 pr-12"
                :class="{
                  'border-red-500': formStore.errors['pointOfContact.email'],
                }"
                placeholder="Enter your email address"
              />
              <svg
                v-if="
                  formStore.data.pointOfContact.email && formStore.isValidEmail
                "
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <svg
                v-else-if="
                  formStore.data.pointOfContact.email && !formStore.isValidEmail
                "
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <p
              v-if="formStore.errors['pointOfContact.email']"
              class="text-red-400 text-sm mt-2"
            >
              {{ formStore.errors["pointOfContact.email"] }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Information -->
    <section>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div class="lg:col-span-4">
          <h2
            class="text-xl md:text-2xl font-bold text-white mb-4 pb-2 border-b-2"
            :style="{ borderBottomColor: primaryColor }"
          >
            Company information
          </h2>
          <p class="text-slate-300 leading-relaxed text-sm md:text-base">
            Every company must have a name and a designation. For the company
            name you can use both letters and numbers, but not special symbols.
            For the designations, there is no actual difference between one or
            another.
          </p>
        </div>

        <div class="lg:col-span-8 space-y-4 md:space-y-6">
          <div>
            <label
              for="companyName"
              class="text-white text-base md:text-lg font-medium mb-3 block"
            >
              Company name *
            </label>
            <input
              id="companyName"
              placeholder="The name you want your company to have"
              v-model="formStore.data.companyInfo.companyName"
              @input="
                formStore.validateAndUpdateField(
                  'companyInfo',
                  'companyName',
                  ($event.target as HTMLInputElement).value
                )
              "
              @blur="
                formStore.validateAndUpdateField(
                  'companyInfo',
                  'companyName',
                  ($event.target as HTMLInputElement).value
                )
              "
              class="theme-input text-base md:text-lg py-3"
              :class="{
                'border-red-500': formStore.errors['companyInfo.companyName'],
              }"
            />
            <p
              v-if="formStore.errors['companyInfo.companyName']"
              class="text-red-400 text-sm mt-2"
            >
              {{ formStore.errors["companyInfo.companyName"] }}
            </p>
          </div>

          <div>
            <label
              for="alternativeCompanyName"
              class="text-white text-base md:text-lg font-medium mb-3 block"
            >
              Alternative company name
            </label>
            <input
              id="alternativeCompanyName"
              placeholder="The name to use if the first name is not available"
              v-model="formStore.data.companyInfo.alternativeCompanyName"
              @input="
                formStore.updateFormData(
                  'companyInfo',
                  'alternativeCompanyName',
                  ($event.target as HTMLInputElement).value
                )
              "
              class="theme-input text-base md:text-lg py-3"
            />
          </div>

          <div>
            <label
              for="designation"
              class="text-white text-base md:text-lg font-medium mb-3 block"
            >
              Company designation *
            </label>
            <select
              id="designation"
              v-model="formStore.data.companyInfo.designation"
              @change="
                formStore.updateFormData(
                  'companyInfo',
                  'designation',
                  ($event.target as HTMLSelectElement).value
                )
              "
              class="theme-input text-base md:text-lg py-3"
              :class="{
                'border-red-500': formStore.errors['companyInfo.designation'],
              }"
            >
              <option value="">Select the option that you prefer</option>
              <option value="ltd">Ltd</option>
              <option value="inc">Inc</option>
              <option value="corp">Corp</option>
              <option value="llc">LLC</option>
            </select>
            <p
              v-if="formStore.errors['companyInfo.designation']"
              class="text-red-400 text-sm mt-2"
            >
              Please select a company designation
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Countries of Interest -->
    <section>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div class="lg:col-span-4">
          <h2
            class="text-xl md:text-2xl font-bold text-white mb-4 pb-2 border-b-2"
            :style="{ borderBottomColor: primaryColor }"
          >
            Countries of interest
          </h2>
          <p class="text-slate-300 leading-relaxed text-sm md:text-base">
            We are required to check that the company will not be interacting
            with forbidden locations. For 'jurisdiction of operation' if you are
            alone, select your country of residency. If you have more
            shareholders, pick the most relevant.
          </p>
        </div>

        <div class="lg:col-span-8 space-y-4 md:space-y-6">
          <div>
            <label
              for="jurisdictionOfOperation"
              class="text-white text-base md:text-lg font-medium mb-3 block"
            >
              Jurisdiction of operation *
            </label>
            <select
              id="jurisdictionOfOperation"
              v-model="
                formStore.data.countriesOfInterest.jurisdictionOfOperation
              "
              @change="
                formStore.updateFormData(
                  'countriesOfInterest',
                  'jurisdictionOfOperation',
                  ($event.target as HTMLSelectElement).value
                )
              "
              class="theme-input text-base md:text-lg py-3"
              :class="{
                'border-red-500':
                  formStore.errors[
                    'countriesOfInterest.jurisdictionOfOperation'
                  ],
              }"
            >
              <option value="">Select the country where you are located</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
              <option value="sg">Singapore</option>
              <option value="fr">France</option>
              <option value="it">Italy</option>
              <option value="es">Spain</option>
              <option value="nl">Netherlands</option>
            </select>
            <p
              v-if="
                formStore.errors['countriesOfInterest.jurisdictionOfOperation']
              "
              class="text-red-400 text-sm mt-2"
            >
              Please select your jurisdiction of operation
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Shares Structure -->
    <section>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div class="lg:col-span-4">
          <h2
            class="text-xl md:text-2xl font-bold text-white mb-4 pb-2 border-b-2"
            :style="{ borderBottomColor: primaryColor }"
          >
            Shares structure
          </h2>
          <p class="text-slate-300 leading-relaxed text-sm md:text-base">
            All companies must have at least 1 share. Issued shares are shares
            that will be distributed from day 1. The value per share represents
            your personal liability, so if you wish to reduce risks, pick the
            smallest number.
          </p>
        </div>

        <div class="lg:col-span-8 space-y-4 md:space-y-6">
          <div>
            <label
              for="numberOfShares"
              class="text-white text-base md:text-lg font-medium mb-3 block"
            >
              Number of shares *
            </label>
            <select
              id="numberOfShares"
              v-model="formStore.data.sharesStructure.numberOfShares"
              @change="
                formStore.updateFormData(
                  'sharesStructure',
                  'numberOfShares',
                  parseInt(($event.target as HTMLSelectElement).value)
                )
              "
              class="theme-input text-base md:text-lg py-3"
            >
              <option value="">Select how many shares you wish to have</option>
              <option value="1">1 share</option>
              <option value="100">100 shares</option>
              <option value="1000">1,000 shares</option>
              <option value="10000">10,000 shares</option>
            </select>
          </div>

          <div>
            <label
              class="text-white text-base md:text-lg font-medium mb-4 block"
              >Are all shares issued? *</label
            >
            <div class="space-y-3">
              <div
                class="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg"
              >
                <input
                  type="radio"
                  id="yes"
                  name="allSharesIssued"
                  :value="true"
                  v-model="formStore.data.sharesStructure.allSharesIssued"
                  @change="
                    formStore.updateFormData(
                      'sharesStructure',
                      'allSharesIssued',
                      true
                    )
                  "
                  class="border-slate-500"
                />
                <label
                  for="yes"
                  class="text-white text-base md:text-lg"
                >
                  Yes
                </label>
              </div>
              <div
                class="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg"
              >
                <input
                  type="radio"
                  id="no"
                  name="allSharesIssued"
                  :value="false"
                  v-model="formStore.data.sharesStructure.allSharesIssued"
                  @change="
                    formStore.updateFormData(
                      'sharesStructure',
                      'allSharesIssued',
                      false
                    )
                  "
                  class="border-slate-500"
                />
                <label
                  for="no"
                  class="text-white text-base md:text-lg"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          <div v-if="!formStore.data.sharesStructure.allSharesIssued">
            <label
              for="numberOfIssuedShares"
              class="text-white text-base md:text-lg font-medium mb-3 block"
            >
              Number of issued shares *
            </label>
            <input
              id="numberOfIssuedShares"
              placeholder="Write how many shares you wish to issue on day 1"
              type="number"
              min="1"
              :max="formStore.data.sharesStructure.numberOfShares"
              v-model="formStore.data.sharesStructure.numberOfIssuedShares"
              @input="
                formStore.updateFormData(
                  'sharesStructure',
                  'numberOfIssuedShares',
                  parseInt(($event.target as HTMLInputElement).value) ||
                    undefined
                )
              "
              class="theme-input text-base md:text-lg py-3"
            />
          </div>

          <div>
            <label
              for="valuePerShare"
              class="text-white text-base md:text-lg font-medium mb-3 block"
            >
              Value per share *
            </label>
            <select
              id="valuePerShare"
              v-model="formStore.data.sharesStructure.valuePerShare"
              @change="
                formStore.updateFormData(
                  'sharesStructure',
                  'valuePerShare',
                  parseFloat(($event.target as HTMLSelectElement).value)
                )
              "
              class="theme-input text-base md:text-lg py-3"
            >
              <option value="">Select how much each share is worth</option>
              <option value="0.01">$0.01</option>
              <option value="0.1">$0.10</option>
              <option value="1">$1.00</option>
              <option value="10">$10.00</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
