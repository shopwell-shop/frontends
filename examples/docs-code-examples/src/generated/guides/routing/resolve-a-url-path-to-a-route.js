import {
  useNavigationContext,
  useNavigationSearch,
} from "@shopwell/composables";

const { resolvePath } = useNavigationSearch();

const seoResult = await resolvePath("/Winter-Season/My-Product");

const { routeName, foreignKey } = useNavigationContext(ref(seoResult));
