---
head:
  - - meta
    - name: og:title
      content: Shopwell Frontends Internal Structure
  - - meta
    - name: og:description
      content: "Details about the internal structure of Shopwell Frontends"
  - - meta
    - name: og:image
      content: "https://frontends-og-image.vercel.app/Internal%20Structure?fontSize=150px"
---

<script setup>
import githubIcon from '../.assets/framework-icons/github.png';
</script>

# Internal Structure

The internal structure of Shopwell Frontends is designed to provide flexibility, reusability and abstraction. Shopwell Frontends is a framework that is build with JavaScript and TypeScript.

Some of its components are based on Vue.js and Nuxt.js. The framework is designed to be used mostly with Vue.js and Nuxt.js, but it is not limited to these technologies. You can use it with any other JavaScript framework or library.

This section deals with the different packages and their abstractions. It is sorted by reusability / abstraction level from high to low and shows the main dependencies of each component respectively.

<PageRef title="shopwell/frontends packages" sub="Explore all Shopwell Frontends packages on GitHub" :icon="githubIcon" page="https://github.com/shopwell-shop/frontends/tree/main/packages" target="_blank" />

## api-client

<div class="flex mt--4 mb-4 gap-2">
    <img src="../.assets/framework-icons/typescript.png" alt="This package depends on Typescript" title="This package depends on Typescript" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" /> | <a href="https://www.npmjs.com/package/@shopwell/api-client" target="_blank">@shopwell/api-client</a>
</div>

The API client provides a common interface to access the Shopwell API. It can be used standalone in any JavaScript project.

<PageRef page="../packages/api-client.html" title="API Client Reference" sub="Package reference with all services" />

## helpers

<div class="flex mt--4 mb-4 gap-2">
    <img src="../.assets/framework-icons/typescript.png" alt="This package depends on Typescript" title="This package depends on Typescript" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" /> | <a href="https://www.npmjs.com/package/@shopwell/helpers" target="_blank">@shopwell/helpers</a>
</div>

Helpers are functions that can be used for formatting, data manipulation and other stateless tasks within any JavaScript project. They are not tied to any other components.

<PageRef page="../packages/helpers.html" title="Helpers Reference" sub="Package reference with all helper methods" />

## composables

<div class="flex mt--4 mb-4 gap-2">
    <img src="../.assets/framework-icons/typescript.png" alt="This package depends on Typescript" title="This package depends on Typescript" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" />
    <img src="../.assets/framework-icons/vue.png" alt="This package depends on Vue.js 3" title="This package depends on Vue.js 3" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" /> | <a href="https://www.npmjs.com/package/@shopwell/composables" target="_blank">@shopwell/composables</a>
</div>

The composables are a set of Vue.js composition functions that can be used in any Vue.js project. They provide state management, UI logic and data fetching and are the base for all guides in our [building section](../guides/).

<PageRef page="../packages/composables/" title="Composables Reference" sub="Package API reference with all composables" />

## nuxt-module

<div class="flex mt--4 mb-4 gap-2">
    <img src="../.assets/framework-icons/typescript.png" alt="This package depends on Typescript" title="This package depends on Typescript" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" />
    <img src="../.assets/framework-icons/vue.png" alt="This package depends on Vue.js 3" title="This package depends on Vue.js 3" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" />
    <img src="../.assets/framework-icons/nuxt.png" alt="This package depends on Nuxt 3" title="This package depends on Nuxt 3" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" /> | <a href="https://www.npmjs.com/package/@shopwell/nuxt-module" target="_blank">@shopwell/nuxt-module</a>
</div>

The Nuxt 3 module allows you to set up a Nuxt 3 project with Shopwell Frontends. It provides the [composables](#composables) and [api-client](#api-client) packages.

If you want to use these packages with a different Vue.js framework, see the guide for using Shopwell Frontends in a [custom project](../introduction/templates/custom-vue-project).

<PageRef page="../packages/nuxt-module.html" title="Nuxt3 Module Reference" sub="Documentation about setup and basic usage" />

## cms-base

<div class="flex mt--4 mb-4 gap-2">
    <img src="../.assets/framework-icons/typescript.png" alt="This package depends on Typescript" title="This package depends on Typescript" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" />
    <img src="../.assets/framework-icons/vue.png" alt="This package depends on Vue.js 3" title="This package depends on Vue.js 3" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" />
    <img src="../.assets/framework-icons/nuxt.png" alt="This package depends on Nuxt 3" title="This package depends on Nuxt 3" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" />
    <img src="../.assets/framework-icons/tailwind.png" alt="This package depends on UnoCSS / Tailwind.css" title="This package depends on UnoCSS / Tailwind.css" class="w-6 aspect-square hover:scale-125 transition hover:drop-shadow-md" /> | <a href="https://www.npmjs.com/package/@shopwell/cms-base-layer" target="_blank">@shopwell/cms-base-layer</a>
</div>

The CMS base is a Nuxt module that provides an implementation of all CMS components in Shopwell [based on utility-classes](./styling.html) using unocss/Tailwind.css syntax. It is useful for projects that want to use the CMS components but design their own layout.

Head to our [Content Pages](../guides/cms/content-pages#use-the-cms-base-package) guide to learn more.

<PageRef page="../packages/cms-base-layer.html" title="CMS Base Reference" sub="Package API reference for the CMS composables" />

## Templates & Examples

Our GitHub repository also contains reference implementations for different frameworks and use cases. You can find them in the [templates](https://github.com/shopwell-shop/frontends/tree/main/templates) and [examples](https://github.com/shopwell-shop/frontends/tree/main/examples) folders. These examples are not directly part of the framework, but can be useful for learning how to use Shopwell Frontends.
