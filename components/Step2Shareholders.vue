<script setup lang="ts">
import { useFormStore } from "~/stores/useFormStore";
import { useFormValidation } from "~/composables/useFormValidation";

const formStore = useFormStore();
const { validateArrayItem } = useFormValidation();
const primaryColor = "#8b5cf6";

const addShareholder = () => {
  formStore.addArrayItem("shareholders", {
    type: "individual",
    fullName: "",
    nationality: "",
    address: "",
    sharePercentage: 0,
    dateOfBirth: "",
    passportNumber: "",
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
            Shareholders
          </h2>
          <p class="text-slate-300 leading-relaxed">
            Every BVI company must have at least one shareholder. Shareholders
            can be individuals or corporate entities. The total share percentage
            must equal 100%. You can add multiple shareholders and specify their
            ownership percentages.
          </p>

          <div class="mt-4 p-4 bg-slate-800 rounded-lg">
            <p class="text-sm text-slate-300">
              Total ownership:
              <span
                :class="
                  formStore.totalSharePercentage === 100
                    ? 'text-green-400'
                    : 'text-yellow-400'
                "
                class="font-semibold"
              >
                {{ formStore.totalSharePercentage }}%
              </span>
            </p>
          </div>
        </div>

        <div class="col-span-8 space-y-6">
          <div
            v-for="(shareholder, index) in formStore.data.shareholders"
            :key="shareholder.id"
            class="bg-slate-800 p-6 rounded-lg space-y-4"
          >
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold text-white">
                Shareholder {{ index + 1 }}
              </h3>
              <button
                v-if="formStore.data.shareholders.length > 1"
                @click="
                  formStore.removeArrayItem('shareholders', shareholder.id)
                "
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
                  >Shareholder type</label
                >
                <div class="flex space-x-4">
                  <div class="flex items-center space-x-2">
                    <input
                      type="radio"
                      :id="`individual-${shareholder.id}`"
                      name="type"
                      value="individual"
                      v-model="shareholder.type"
                      @change="
                        formStore.updateArrayItem(
                          'shareholders',
                          shareholder.id,
                          'type',
                          ($event.target as HTMLInputElement).value
                        )
                      "
                    />
                    <label
                      :for="`individual-${shareholder.id}`"
                      class="text-white text-sm"
                    >
                      Individual
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      type="radio"
                      :id="`corporate-${shareholder.id}`"
                      name="type"
                      value="corporate"
                      v-model="shareholder.type"
                      @change="
                        formStore.updateArrayItem(
                          'shareholders',
                          shareholder.id,
                          'type',
                          ($event.target as HTMLInputElement).value
                        )
                      "
                    />
                    <label
                      :for="`corporate-${shareholder.id}`"
                      class="text-white text-sm"
                    >
                      Corporate
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Share percentage</label
                >
                <input
                  type="number"
                  min="0"
                  max="100"
                  v-model="shareholder.sharePercentage"
                  @input="
                    formStore.updateArrayItem(
                      'shareholders',
                      shareholder.id,
                      'sharePercentage',
                      parseFloat(($event.target as HTMLInputElement).value) || 0
                    )
                  "
                  class="theme-input"
                  placeholder="0"
                />
              </div>
            </div>

            <div
              v-if="shareholder.type === 'individual'"
              class="grid grid-cols-2 gap-4"
            >
              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Full name</label
                >
                <input
                  v-model="shareholder.fullName"
                  @input="
                    formStore.updateArrayItem(
                      'shareholders',
                      shareholder.id,
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
                  v-model="shareholder.nationality"
                  @change="
                    formStore.updateArrayItem(
                      'shareholders',
                      shareholder.id,
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
                  v-model="shareholder.dateOfBirth"
                  @input="
                    validateArrayItem(
                      'shareholders',
                      index,
                      'dateOfBirth',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                  :class="{
                    'border-red-500':
                      formStore.errors[`shareholders.${index}.dateOfBirth`],
                  }"
                />
                <p
                  v-if="formStore.errors[`shareholders.${index}.dateOfBirth`]"
                  class="text-red-400 text-sm mt-1"
                >
                  {{ formStore.errors[`shareholders.${index}.dateOfBirth`] }}
                </p>
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Passport number</label
                >
                <input
                  v-model="shareholder.passportNumber"
                  @input="
                    formStore.updateArrayItem(
                      'shareholders',
                      shareholder.id,
                      'passportNumber',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                  placeholder="Enter passport number"
                />
              </div>
            </div>

            <div
              v-else
              class="grid grid-cols-2 gap-4"
            >
              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Corporate name</label
                >
                <input
                  v-model="shareholder.corporateName"
                  @input="
                    formStore.updateArrayItem(
                      'shareholders',
                      shareholder.id,
                      'corporateName',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                  placeholder="Enter corporate name"
                />
              </div>

              <div>
                <label class="text-white text-sm font-medium mb-2 block"
                  >Registration number</label
                >
                <input
                  v-model="shareholder.registrationNumber"
                  @input="
                    formStore.updateArrayItem(
                      'shareholders',
                      shareholder.id,
                      'registrationNumber',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  class="theme-input"
                  placeholder="Enter registration number"
                />
              </div>
            </div>

            <div>
              <label class="text-white text-sm font-medium mb-2 block"
                >Address</label
              >
              <input
                v-model="shareholder.address"
                @input="
                  validateArrayItem(
                    'shareholders',
                    index,
                    'address',
                    ($event.target as HTMLInputElement).value
                  )
                "
                class="theme-input"
                placeholder="Enter full address"
                :class="{
                  'border-red-500':
                    formStore.errors[`shareholders.${index}.address`],
                }"
              />
              <p
                v-if="formStore.errors[`shareholders.${index}.address`]"
                class="text-red-400 text-sm mt-1"
              >
                {{ formStore.errors[`shareholders.${index}.address`] }}
              </p>
            </div>
          </div>

          <button
            @click="addShareholder"
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
            Add Shareholder
          </button>

          <div
            v-if="
              formStore.totalSharePercentage !== 100 &&
              formStore.data.shareholders.length > 0
            "
            class="p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg"
          >
            <p class="text-yellow-400 text-sm">
              ⚠️ Total share percentage must equal 100%. Currently:
              {{ formStore.totalSharePercentage }}%
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
