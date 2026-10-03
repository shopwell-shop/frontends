<!-- app/components/cms/CmsElementImage.vue -->

<script setup lang="ts">
import { useCmsElementImage } from "@shopwell/composables";
import type { CmsElementImage } from "@shopwell/composables";

const props = defineProps<{
  content: CmsElementImage;
}>();

const {
  containerStyle,
  displayMode, // cover, contain, stretch etc.
  imageAttrs, // automatically resolves src, alt and srcset attributes
} = useCmsElementImage(props.content);
</script>

<template>
  <div :style="containerStyle">
    <img v-bind="imageAttrs" />
  </div>
</template>
