<script setup lang="ts">
const AccountType = {
  private: "private",
  business: "business",
};

type AccountTypeValue = (typeof AccountType)[keyof typeof AccountType];

const state = defineModel<{
  name: string;
  salutationId: string;
  title: string;
  accountType: AccountTypeValue;
  company: string;
  vatIds: string;
}>({
  required: true,
});

const emit = defineEmits<{
  submit: [];
}>();

const { validation: $v = undefined } = defineProps<{
  // TODO: Replace this with the concrete Vuelidate validation type.
  validation?: any;
}>();

const handleSubmit = () => {
  emit("submit");
};
</script>
<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
    <div class="w-[240px]">
      <FormSalutationSelect
        v-model="state.salutationId"
        :errorMessage="$v?.salutationId?.$errors[0]"
      />
    </div>
    <div class="w-[240px]">
      <FormAccountTypeSelect
        v-model="state.accountType"
        :errorMessage="$v?.accountType?.$errors[0]"
      />
    </div>
    <FormInputField
      class="w-full"
      id="name"
      data-testid="account-personal-data-name-input"
      v-model="state.name"
      :label="$t('account.profile.form.name')"
      :errorMessage="$v?.name?.$errors[0]"
    />

    <div
      class="flex-col md:flex-row flex gap-2"
      v-if="state.accountType === AccountType.business"
    >
      <FormInputField
        class="w-full"
        v-model="state.company"
        :label="$t('account.profile.form.company')"
        :errorMessage="$v?.company?.$errors[0]"
      />
      <FormInputField
        class="w-full"
        v-model="state.vatIds"
        :label="$t('account.profile.form.vatIds')"
        :errorMessage="$v?.vatIds?.$errors[0]"
      />
    </div>
    <FormBaseButton
      type="submit"
      data-testid="account-personal-data-submit-button"
    >
      {{ $t("account.profile.form.buttonSubmit") }}
    </FormBaseButton>
  </form>
</template>
