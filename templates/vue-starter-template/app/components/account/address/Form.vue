<script setup lang="ts">
import { useRegle } from "@regle/core";

import type { Schemas } from "#shopwell";

import { addressFormRules } from "../../../utils/validation/rules/addressFormRules";

const { t } = useI18n();
const localePath = useLocalePath();
const { formatLink } = useInternationalization(localePath);

const props = defineProps<{
  address: Schemas["CustomerAddress"];
}>();

const emit = defineEmits<{
  handleSubmit: [Omit<Schemas["CustomerAddress"], "id" | "customerId">];
}>();
const router = useRouter();

const state = ref({
  name: "",
  salutationId: "",
  company: "",
  street: "",
  zipcode: "",
  city: "",
  countryId: "",
  countryStateId: "",
});
const countryHasStates = ref(false);

function populateStateFromAddress(address: Schemas["CustomerAddress"]) {
  Object.assign(state.value, address);
}

function handleCountryStatesChange(states: Schemas["CountryState"][]) {
  countryHasStates.value = states.length > 0;
}

watch(
  () => props.address,
  (newAddress) => {
    if (newAddress) {
      populateStateFromAddress(newAddress);
    }
  },
  { immediate: true },
);

const { r$ } = useRegle(state, addressFormRules(countryHasStates));

async function handleSubmit() {
  const { valid } = await r$.$validate();
  if (!valid) {
    return;
  }

  emit("handleSubmit", state.value);
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <FormSalutationSelect
      v-model="state.salutationId"
      id="salutation"
      :errorMessage="r$.salutationId.$errors[0]"
    />

    <FormInputField
      v-model="state.name"
      id="name"
      :label="$t('form.name')"
      :placeholder="$t('form.namePlaceholder')"
      :errorMessage="r$.name.$errors[0]"
    />

    <FormInputField
      v-model="state.street"
      id="street"
      :label="$t('form.streetAddress')"
      :placeholder="$t('form.streetPlaceholder')"
      :errorMessage="r$.street.$errors[0]"
    />

    <div class="flex gap-4">
      <FormInputField
        class="basis-1/2"
        v-model="state.zipcode"
        id="zipcode"
        :label="$t('form.postalCode')"
        :placeholder="$t('form.postalCodePlaceholder')"
        :errorMessage="r$.zipcode.$errors[0]"
      />
      <FormInputField
        class="basis-1/2"
        v-model="state.city"
        id="city"
        :label="$t('form.city')"
        :placeholder="$t('form.cityPlaceholder')"
        :errorMessage="r$.city.$errors[0]"
      />
    </div>

    <SharedCountryStateInput
      v-model:country-id="state.countryId"
      v-model:state-id="state.countryStateId"
      :country-id-validation="r$.countryId"
      :state-id-validation="r$.countryStateId"
      @states-change="handleCountryStatesChange"
    />

    <p class="text-sm text-surface-on-surface-variant">
      {{ $t("form.requiredFieldsNote") }}
    </p>

    <div class="flex gap-4 mt-6">
      <FormBaseButton type="submit" variant="primary">
        {{ $t("account.address.saveButton") }}
      </FormBaseButton>
      <FormBaseButton
        type="button"
        variant="secondary"
        @click="router.push(formatLink('/account/address'))"
      >
        {{ $t("form.cancel") }}
      </FormBaseButton>
    </div>
  </form>
</template>
