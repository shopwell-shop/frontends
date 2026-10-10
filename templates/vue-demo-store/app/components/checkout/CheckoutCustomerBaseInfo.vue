<script setup lang="ts">
import { customValidators } from "@@/i18n/utils/i18n-validators";
import { getTranslatedProperty } from "@shopwell/helpers";
import { useVuelidate } from "@vuelidate/core";

type BaseInfo = {
  name?: string;
  salutationId?: string;
};

const props = defineProps<{
  customerData: BaseInfo;
}>();

const emit = defineEmits<{
  (e: "update", value: BaseInfo): void;
  (e: "cancel"): void;
}>();

const state = reactive({
  salutationId: props.customerData.salutationId || "",
  name: props.customerData.name || "",
}) as {
  salutationId: string;
  name: string;
};
const { required, minLength } = customValidators();
const rules = computed(() => ({
  name: {
    required,
    minLength: minLength(3),
  },
}));

const $v = useVuelidate(rules, state);
const { getSalutations } = useSalutations();

const handleUpdateData = async () => {
  $v.value.$touch();
  const valid = await $v.value.$validate();

  if (!valid) {
    return;
  }

  emit("update", state);
};
</script>
<template>
  <form @submit.prevent="handleUpdateData" class="space-y-6">
    <div class="grid grid-cols-6 gap-6">
      <div class="col-span-6">
        <label
          for="salutation"
          class="block text-sm font-medium text-secondary-700"
          >{{ $t("form.salutation") }}</label
        >
        <select
          id="salutation"
          v-model="state.salutationId"
          required
          name="salutation"
          autocomplete="on"
          class="mt-1 block w-full p-2.5 border border-secondary-300 text-secondary-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-light"
          data-testid="checkout-pi-salutation-select"
        >
          <option disabled selected value="">
            {{ $t("form.chooseSalutation") }}
          </option>
          <option
            v-for="salutation in getSalutations"
            :key="salutation.id"
            :value="salutation.id"
          >
            {{ getTranslatedProperty(salutation, "displayName") }}
          </option>
        </select>
      </div>
      <div class="col-span-6">
        <label
          for="name"
          class="block text-sm font-medium text-secondary-700"
          >{{ $t("form.name") }}</label
        >
        <input
          id="name"
          v-model="state.name"
          type="text"
          required
          name="name"
          autocomplete="name"
          :placeholder="$t('form.namePlaceholder')"
          class="mt-1 block w-full p-2.5 border border-secondary-300 text-secondary-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-light"
          data-testid="checkout-pi-name-input"
          @blur="$v.name.$touch()"
        />
        <span
          v-if="$v.name.$error && $v.name.$errors[0]?.$message"
          class="pt-1 text-sm text-red-600 focus:ring-primary border-secondary-300"
        >
          {{ $v.name.$errors[0].$message }}
        </span>
      </div>
    </div>
    <div class="flex gap-2">
      <button
        type="submit"
        class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-dark focus:outline-none focus:ring-2 focus:ring-primary"
        data-testid="checkout-pi-submit-button"
      >
        {{ $t("form.save") }}
      </button>
      <button
        type="button"
        class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary-300 hover:bg-secondary-400 focus:outline-none focus:ring-2 focus:ring-secondary-300"
        @click="$emit('cancel')"
        data-testid="checkout-pi-cancel-button"
      >
        {{ $t("form.cancel") }}
      </button>
    </div>
  </form>
</template>
