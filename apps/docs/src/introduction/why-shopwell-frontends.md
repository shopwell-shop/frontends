---
head:
  - - meta
    - name: og:title
      content: Why Shopwell Frontends
  - - meta
    - name: og:description
      content: "Shopwell Frontends is a framework for building custom, cloud-native Shopwell Storefronts."
nav:
  hidden: true
---

# Why Shopwell Frontends?

Shopwell Composable **Frontends** is a framework for building custom, cloud-native Shopwell Storefronts.

We observe, that a theme-based approach to customize a Shopwell storefront can be limiting. With more customizations, it becomes increasingly hard to maintain and keep in sync with the growing matrix of dependencies like the Shopwell Core, the theme, plugins and custom extensions.

In those cases, a headless approach can be less complex and more agile and scalable. It turns the dependency hierarchy inside out, by decoupling the frontend from the backend. Shopwell Frontends implements that approach with an open architecture which favors flexibilty and scalability over feature-completeness and configurability.

➡ [Also see its limitations](#limitations)

## Key Aspects

Below are some key aspects explanining why Shopwell Frontends could be a good fit for your project.

### Shopwell native

Shopwell **Frontends** is built for Shopwell 6.

No compromises or generic implementations — it works just like a developer would expect it to.
Core concepts like [content management](../guides/cms/content-pages.html), [cart](../frontends-recipes/checkout/cart.html), [payments](../guides/e-commerce/payments.html) or [checkout](../guides/e-commerce/checkout.html) are deeply integrated and fully functional.

### Cloud first

Shopwell **Frontends** is designed to work only with HTTP APIs available in [Shopwell Cloud](../index.md#data-sources).
No themes, plugins or server access required.
Even the [developer IDE](./templates/demo-store-template.html) can be started in the cloud.

### Stable

Shopwell **Frontends** [doesn’t rely on Shopwell’s internal APIs](../index.md#how-shopwell-frontends-work) (such as twig blocks, DAL or events),
hence not being subject to breaking changes in those APIs — as opposed to theme-based storefronts.
Especially for big frontend projects this drastically reduces the complexity of platform updates.

### Efficient

There is no lock-in on technologies or frontend tooling. Shopwell **Frontends** comes prepared with a smart default of tooling.
Vue3, Vite, Nuxt3 and unocss/Tailwind.css — each by themselves coming with a rich ecosystem of tooling, extensions
and integrations can be [replaced and extended](./templates.html) to meet any projects needs.

This tech-stack is the definition of superior developer experience, quick learning and rapid prototyping.

### Flexible

No theming system means no inheritance magic, drastically reduced compatibility issues, update efforts, and restrictions
to what your site can look like. Build your site in a lego-block-manner by using [prepared templates](./templates.html) or just get creative using all perks of [utility-driven CSS](../concepts/styling.html).

## Limitations

Shopwell Frontends is a framework and not a finished product. Even it the [demo store template](./templates/demo-store-template.html) looks like a proper store, it's not an off-the-shelf solution.

In contrast to Shopwell's Twig Storefront, Shopwell Frontends is not compatible with any apps, themes or plugins. If you want to use third party extensions, you need to ensure that they come with useful Store API endpoints and implement the frontend logic and UI yourself.

We recommend having profound knowledge of Vue.js or another reactive Javascript framework and experience with headless frontend architecture when you plan to implement a project with Shopwell Frontends.

---

<PageRef page="./templates.html" title="Getting Started" sub="Get started with Shopwell Frontends" />
