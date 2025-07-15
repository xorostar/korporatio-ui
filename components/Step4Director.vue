<script setup lang="ts">
import { useFormStore } from "~/stores/useFormStore";
import { useFormValidation } from "~/composables/useFormValidation";

const formStore = useFormStore();
const { validateArrayItem } = useFormValidation();
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
            responsible for managing the company's affairs and making business
            decisions. You can add multiple directors if needed.
          </p>
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
                    validateArrayItem(
                      'directors',
                      index,
                      'dateOfBirth',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                  :class="{
                    'border-red-500':
                      formStore.errors[`directors.${index}.dateOfBirth`],
                  }"
                />
                <p
                  v-if="formStore.errors[`directors.${index}.dateOfBirth`]"
                  class="text-red-400 text-sm mt-1"
                >
                  {{ formStore.errors[`directors.${index}.dateOfBirth`] }}
                </p>
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
                <input
                  v-model="director.occupation"
                  @input="
                    formStore.updateArrayItem(
                      'directors',
                      director.id,
                      'occupation',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                  placeholder="Enter occupation"
                />
              </div>
            </div>

            <div>
              <label class="text-white text-sm font-medium mb-2 block"
                >Address</label
              >
              <input
                v-model="director.address"
                @input="
                  validateArrayItem(
                    'directors',
                    index,
                    'address',
                    ($event.target as HTMLInputElement).value
                  )
                "
                class="theme-input"
                placeholder="Enter full address"
                :class="{
                  'border-red-500':
                    formStore.errors[`directors.${index}.address`],
                }"
              />
              <p
                v-if="formStore.errors[`directors.${index}.address`]"
                class="text-red-400 text-sm mt-1"
              >
                {{ formStore.errors[`directors.${index}.address`] }}
              </p>
            </div>

            <div>
              <label class="text-white text-sm font-medium mb-2 block"
                >Experience</label
              >
              <textarea
                v-model="director.experience"
                @input="
                  validateArrayItem(
                    'directors',
                    index,
                    'experience',
                    ($event.target as HTMLTextAreaElement).value
                  )
                "
                class="theme-input"
                rows="3"
                placeholder="Describe relevant experience and qualifications"
                :class="{
                  'border-red-500':
                    formStore.errors[`directors.${index}.experience`],
                }"
              ></textarea>
              <p
                v-if="formStore.errors[`directors.${index}.experience`]"
                class="text-red-400 text-sm mt-1"
              >
                {{ formStore.errors[`directors.${index}.experience`] }}
              </p>
            </div>

            <div>
              <label class="text-white text-sm font-medium mb-2 block"
                >Consent to act</label
              >
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :id="`consent-${director.id}`"
                  v-model="director.consentToAct"
                  @change="
                    formStore.updateArrayItem(
                      'directors',
                      director.id,
                      'consentToAct',
                      ($event.target as HTMLInputElement).checked
                    )
                  "
                />
                <label
                  :for="`consent-${director.id}`"
                  class="text-white text-sm"
                >
                  I consent to act as a director of this company
                </label>
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
        </div>
      </div>
    </section>
  </div>
</template>
