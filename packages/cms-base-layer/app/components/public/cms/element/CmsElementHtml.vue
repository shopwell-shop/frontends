<script setup lang="ts">
import type { CmsElementHtml } from "@shopwell/composables";
import { getCmsLayoutConfiguration } from "@shopwell/helpers";
import { h } from "vue";

const props = defineProps<{
  content: CmsElementHtml;
}>();

const { cssClasses, layoutStyles } = getCmsLayoutConfiguration(props.content);

const HtmlComponent = () => {
  return h("div", {
    class: ["cms-element-html", "cms-element-text", cssClasses],
    style: layoutStyles,
    innerHTML: props.content.data.content || "",
  });
};
</script>

<template>
  <HtmlComponent />
</template>
