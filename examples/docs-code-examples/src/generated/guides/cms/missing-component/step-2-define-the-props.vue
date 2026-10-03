<!-- app/components/cms/{{ componentName }}.vue -->
<script setup lang="ts">
import type { Schemas } from "#shopwell";

const props = defineProps<{
  content: Schemas["CmsBlock"];
}>();
</script>
