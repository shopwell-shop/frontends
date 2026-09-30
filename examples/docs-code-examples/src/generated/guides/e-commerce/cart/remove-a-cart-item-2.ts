import { toRefs, useCartItem } from "#imports";
import type { Schemas } from "#shopwell";

const props = defineProps<{
  cartItem: Schemas["LineItem"];
}>();
const { cartItem } = toRefs(props);
const { removeItem } = useCartItem(cartItem);

await removeItem();
