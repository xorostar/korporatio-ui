<script setup lang="ts">
import { useFormStore } from "~/stores/useFormStore";

const formStore = useFormStore();
const primaryColor = "#8b5cf6";

const addDirector = () => {
  formStore.addArrayItem("directors", {
    fullName: "",
    nationality: "",
    address: "",
    dateOfBirth: "",
    passportNumber: "",
    occupation: "",
    experience: "",
    consentToAct: false,
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
            Director
          </h2>
          <p class="text-slate-300 leading-relaxed">
            Every BVI company must have at least one director. Directors are
            responsible for managing the company's affairs and making strategic
            decisions. Directors can be individuals or corporate entities, and
            there are no residency requirements for BVI company directors.
          </p>

          <div class="mt-4 p-4 bg-slate-800 rounded-lg">
            <p class="text-sm text-slate-300">
              <strong>Note:</strong> All directors must provide consent to act
              and meet the minimum age requirement of 18 years.
            </p>
          </div>
        </div>

        <div class="col-span-8 space-y-6">
          <div
            v-for="(director, index) in formStore.data.directors"
            :key="director.id"
            class="bg-slate-800 p-6 rounded-lg space-y-4"
          >
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-white">
                Director {{ index + 1 }}
              </h3>
              <button
                v-if="formStore.data.directors.length > 1"
                @click="formStore.removeArrayItem('directors', director.id)"
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
                  v-model="director.fullName"
                  @input="
                    formStore.updateArrayItem(
                      'directors',
                      director.id,
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
                  v-model="director.nationality"
                  @change="
                    formStore.updateArrayItem(
                      'directors',
                      director.id,
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
                  <option value="sg">Singapore</option>
                </select>
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Date of birth</label
                >
                <input
                  type="date"
                  v-model="director.dateOfBirth"
                  @input="
                    formStore.updateArrayItem(
                      'directors',
                      director.id,
                      'dateOfBirth',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                />
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Passport number</label
                >
                <input
                  v-model="director.passportNumber"
                  @input="
                    formStore.updateArrayItem(
                      'directors',
                      director.id,
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
                  >Occupation</label
                >
                <select
                  v-model="director.occupation"
                  @change="
                    formStore.updateArrayItem(
                      'directors',
                      director.id,
                      'occupation',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                >
                  <option value="">Select occupation</option>
                  <option value="business_owner">Business Owner</option>
                  <option value="executive">Executive/Manager</option>
                  <option value="professional">
                    Professional (Lawyer, Accountant, etc.)
                  </option>
                  <option value="consultant">Consultant</option>
                  <option value="investor">Investor</option>
                  <option value="retired">Retired</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label class="text-white text-sm font-medium mb-2 block"
                >Address</label
              >
              <input
                v-model="director.address"
                @input="
                  formStore.updateArrayItem(
                    'directors',
                    director.id,
                    'address',
                    ($event.target as HTMLInputElement).value
                  )
                "
                class="theme-input"
                placeholder="Enter full address"
              />
            </div>

            <div>
              <label class="text-white text-sm font-medium mb-2 block"
                >Relevant experience</label
              >
              <textarea
                v-model="director.experience"
                @input="
                  formStore.updateArrayItem(
                    'directors',
                    director.id,
                    'experience',
                    ($event.target as HTMLInputElement).value
                  )
                "
                class="theme-input min-h-[100px] resize-none"
                placeholder="Describe relevant business or management experience..."
              ></textarea>
            </div>

            <div>
              <label class="text-white text-sm font-medium mb-3 block"
                >Consent to act as director</label
              >
              <div class="space-y-2">
                <div
                  class="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg"
                >
                  <input
                    type="radio"
                    :id="`consent-yes-${director.id}`"
                    :name="`consent-${director.id}`"
                    :value="true"
                    v-model="director.consentToAct"
                    @change="
                      formStore.updateArrayItem(
                        'directors',
                        director.id,
                        'consentToAct',
                        true
                      )
                    "
                  />
                  <label
                    :for="`consent-yes-${director.id}`"
                    class="text-white text-sm"
                  >
                    Yes, I consent to act as a director of this company
                  </label>
                </div>
                <div
                  class="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg"
                >
                  <input
                    type="radio"
                    :id="`consent-no-${director.id}`"
                    :name="`consent-${director.id}`"
                    :value="false"
                    v-model="director.consentToAct"
                    @change="
                      formStore.updateArrayItem(
                        'directors',
                        director.id,
                        'consentToAct',
                        false
                      )
                    "
                  />
                  <label
                    :for="`consent-no-${director.id}`"
                    class="text-white text-sm"
                  >
                    No, I do not consent to act as a director
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            @click="addDirector"
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
            Add Director
          </button>

          <div
            v-if="formStore.data.directors.length > 0"
            class="p-4 bg-blue-900/20 border border-blue-600 rounded-lg"
          >
            <h4 class="text-blue-400 font-medium mb-2">Final Review</h4>
            <p class="text-blue-300 text-sm">
              Please review all information carefully before submitting. Once
              submitted, our team will process your BVI company formation within
              24-48 hours and contact you with the next steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
