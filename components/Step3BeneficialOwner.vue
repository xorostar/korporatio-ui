<script setup lang="ts">
import { useFormStore } from "~/stores/useFormStore";

const formStore = useFormStore();
const primaryColor = "#8b5cf6";

const addBeneficialOwner = () => {
  formStore.addArrayItem("beneficialOwners", {
    fullName: "",
    nationality: "",
    address: "",
    dateOfBirth: "",
    passportNumber: "",
    ownershipPercentage: 0,
    sourceOfFunds: "",
    politicallyExposed: false,
  });
};
</script>

<template>
  <div class="space-y-12">
    <section>
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-4">
          <h2
            class="text-2xl font-bold text-white mb-4 pb-2 border-b-2"
            :style="{ borderBottomColor: primaryColor }"
          >
            Beneficial Owner
          </h2>
          <p class="text-slate-300 leading-relaxed">
            A beneficial owner is any individual who ultimately owns or controls
            more than 25% of the company's shares or voting rights, or otherwise
            exercises control over the company. This information is required for
            compliance with anti-money laundering regulations.
          </p>

          <div class="mt-4 p-4 bg-slate-800 rounded-lg">
            <p class="text-sm text-slate-300">
              Total beneficial ownership:
              <span class="font-semibold text-blue-400"
                >{{ formStore.totalBeneficialOwnership }}%</span
              >
            </p>
          </div>
        </div>

        <div class="col-span-8 space-y-6">
          <div
            v-for="(owner, index) in formStore.data.beneficialOwners"
            :key="owner.id"
            class="bg-slate-800 p-6 rounded-lg space-y-4"
          >
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-white">
                Beneficial Owner {{ index + 1 }}
              </h3>
              <button
                v-if="formStore.data.beneficialOwners.length > 1"
                @click="formStore.removeArrayItem('beneficialOwners', owner.id)"
                class="text-red-400 border border-red-400 hover:bg-red-400 hover:text-white px-3 py-1 rounded text-sm"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Full name</label
                >
                <input
                  v-model="owner.fullName"
                  @input="
                    formStore.updateArrayItem(
                      'beneficialOwners',
                      owner.id,
                      'fullName',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Nationality</label
                >
                <select
                  v-model="owner.nationality"
                  @change="
                    formStore.updateArrayItem(
                      'beneficialOwners',
                      owner.id,
                      'nationality',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                >
                  <option value="">Select nationality</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                  <option value="de">Germany</option>
                </select>
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Date of birth</label
                >
                <input
                  type="date"
                  v-model="owner.dateOfBirth"
                  @input="
                    formStore.validateArrayItem(
                      'beneficialOwners',
                      index,
                      'dateOfBirth',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                  :class="{
                    'border-red-500':
                      formStore.errors[`beneficialOwners.${index}.dateOfBirth`],
                  }"
                />
                <p
                  v-if="
                    formStore.errors[`beneficialOwners.${index}.dateOfBirth`]
                  "
                  class="text-red-400 text-sm mt-1"
                >
                  {{
                    formStore.errors[`beneficialOwners.${index}.dateOfBirth`]
                  }}
                </p>
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Passport number</label
                >
                <input
                  v-model="owner.passportNumber"
                  @input="
                    formStore.updateArrayItem(
                      'beneficialOwners',
                      owner.id,
                      'passportNumber',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                  placeholder="Enter passport number"
                />
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Ownership percentage</label
                >
                <input
                  type="number"
                  min="0"
                  max="100"
                  v-model="owner.ownershipPercentage"
                  @input="
                    formStore.updateArrayItem(
                      'beneficialOwners',
                      owner.id,
                      'ownershipPercentage',
                      parseFloat(($event.target as HTMLInputElement).value) || 0
                    )
                  "
                  class="theme-input"
                  placeholder="0"
                />
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Source of funds</label
                >
                <select
                  v-model="owner.sourceOfFunds"
                  @change="
                    formStore.updateArrayItem(
                      'beneficialOwners',
                      owner.id,
                      'sourceOfFunds',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                >
                  <option value="">Select source of funds</option>
                  <option value="salary">Salary/Employment</option>
                  <option value="business">Business Income</option>
                  <option value="investment">Investment Returns</option>
                  <option value="inheritance">Inheritance</option>
                  <option value="savings">Personal Savings</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label class="text-white text-sm font-medium mb-2 block"
                >Address</label
              >
              <input
                v-model="owner.address"
                @input="
                  formStore.validateArrayItem(
                    'beneficialOwners',
                    index,
                    'address',
                    ($event.target as HTMLInputElement).value
                  )
                "
                class="theme-input"
                placeholder="Enter full address"
                :class="{
                  'border-red-500':
                    formStore.errors[`beneficialOwners.${index}.address`],
                }"
              />
              <p
                v-if="formStore.errors[`beneficialOwners.${index}.address`]"
                class="text-red-400 text-sm mt-1"
              >
                {{ formStore.errors[`beneficialOwners.${index}.address`] }}
              </p>
            </div>

            <div>
              <label class="text-white text-sm font-medium mb-3 block"
                >Politically Exposed Person (PEP)</label
              >
              <div class="space-y-2">
                <div
                  class="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg"
                >
                  <input
                    type="radio"
                    :id="`pep-no-${owner.id}`"
                    :name="`pep-${owner.id}`"
                    :value="false"
                    v-model="owner.politicallyExposed"
                    @change="
                      formStore.updateArrayItem(
                        'beneficialOwners',
                        owner.id,
                        'politicallyExposed',
                        false
                      )
                    "
                  />
                  <label
                    :for="`pep-no-${owner.id}`"
                    class="text-white text-sm"
                  >
                    No, I am not a politically exposed person
                  </label>
                </div>
                <div
                  class="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg"
                >
                  <input
                    type="radio"
                    :id="`pep-yes-${owner.id}`"
                    :name="`pep-${owner.id}`"
                    :value="true"
                    v-model="owner.politicallyExposed"
                    @change="
                      formStore.updateArrayItem(
                        'beneficialOwners',
                        owner.id,
                        'politicallyExposed',
                        true
                      )
                    "
                  />
                  <label
                    :for="`pep-yes-${owner.id}`"
                    class="text-white text-sm"
                  >
                    Yes, I am or have been a politically exposed person
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            @click="addBeneficialOwner"
            class="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 px-4 py-3 rounded-lg"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add Beneficial Owner
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
