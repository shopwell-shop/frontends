<script setup lang="ts">
import type { CmsBlockImageSlider } from "@shopwell/composables";
import { computed } from "vue";

import { useCmsBlock } from "#imports";

const props = defineProps<{
  content: CmsBlockImageSlider;
}>();

const { getSlotContent } = useCmsBlock(() => props.content);
const cmsContent = computed(() => getSlotContent("imageSlider"));
</script>

<template>
  <div class="cms-block-image-slider">
    <CmsGenericElement :content="cmsContent" />
  </div>
</template>
