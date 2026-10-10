<script setup lang="ts">
import type { Schemas } from "#shopwell";

defineProps<{
  address: Schemas["CustomerAddress"];
}>();
</script>
<template>
  <div class="flex flex-col gap-2">
    <SharedDataTextRow>
      {{ address.name }}
    </SharedDataTextRow>

    <SharedDataTextRow>
      {{ address.street }}
    </SharedDataTextRow>

    <SharedDataTextRow>
      {{ address.zipcode }} {{ address.city }}
    </SharedDataTextRow>

    <SharedDataTextRow>
      {{ address.country?.translated.name }}
    </SharedDataTextRow>
  </div>
</template>
