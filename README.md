
<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/dennisfrijlink/development-utilities/main/images/Nuxt-Spa.svg" alt="logo of Nuxt Single Page Application Repository">
</p>
<h1 align="center">
  Single Page Application Boilerplate - Nuxt.js
</h1>
<p align="center">
  A boilerplate for single page applications based on the Vue.js Framework, Nuxt.js
  </a>
</p>

## 🧐 What's inside
- [Quick start](#user-content--quick-start)
- [What is a SPA](#user-content-️-what-is-a-single-page-application) 
- [Nuxt Router](#user-content-️-nuxt-router)
- [Data Fetching](#user-content--data-fetching)
- [Mobile First](#user-content--breakpoints-mobile-first)
- [Multi Language](#user-content--nuxt-i18n)
- [Font Declaration](#user-content--fonts)
- [Dark & Light theme](#user-content--dark--light-theme)

## ✨ Quick start

1.  **Clone this repository.**

    ```sh
    git clone https://github.com/dennisfrijlink/nuxt-spa-boilerplate.git
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd nuxt-spa-boilerplate/
    npm install
    npm run dev
    ```

3.  **Running!**

    Your site is now running at `http://localhost:3000`!

4.  **Generate for deploy**
    
    Generate a static project that will be located in the ``dist`` folder:
    ```bash
    $ npm run generate
    ```
## ⚙️ What is a Single Page Application
A single-page application (SPA) is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of the browser loading entire new pages.

In a SPA, all necessary HTML, JavaScript, and CSS code is either retrieved by the browser with a single page load, or the appropriate resources are dynamically loaded and added to the page as necessary, usually in response to user actions. The page does not reload at any point in the process, nor does it transfer control to another page, although the location hash or the HTML5 History API can be used to provide the perception and navigability of separate logical pages in the application.

<p align="center">
  <img width="100%" src="https://raw.githubusercontent.com/dennisfrijlink/development-utilities/main/images/SPA%20lifecycle.png" alt="Lifecycle of Single Page Application">
</p>

##  🗺️ Nuxt Router
Nuxt.js automatically generates the `vue-router` configuration for you, based on your provided Vue files inside the `pages` directory. That means you never have to write a router config again! Nuxt.js also gives you automatic code-splitting for all your routes.

To navigate between pages of your app, you should use the `NuxtLink` component.
For all links to pages within your site, use `<NuxtLink>`. If you have links to other websites you should use the `<a>` tag. See below for an example:
```html
<template>
  <main>
    <h1>Home page</h1>
    <NuxtLink to="/about">
      About (internal link that belongs to the Nuxt App)
    </NuxtLink>
    <a href="https://nuxtjs.org">External Link to another page</a>
  </main>
</template>
```
There a three router modes `"hash" | "history" | "abstract"`:
 -   `hash`: uses the URL hash for routing. Works in all Vue-supported browsers, including those that do not support HTML5 History API.
    
-   `history`: requires HTML5 History API and server config. See  [HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html).
    
-   `abstract`: works in all JavaScript environments, e.g. server-side with Node.js.  **The router will automatically be forced into this mode if no browser API is present.**

For example:
```js
// nuxt.config.js

export default {
  router: {
    mode: 'hash'
  }
}
```
## 🔍 Data Fetching
Nuxt.js supports traditional Vue patterns for loading data in your client-side app, such as fetching data in a component's `mounted()` hook.
Nuxt has two hooks for asynchronous data loading:

-   The  `fetch`  hook (Nuxt 2.12+). This hook can be placed on any component, and provides shortcuts for rendering loading states (during client-side rendering) and errors.
-   The  `asyncData`  hook. This hook can only be placed on  _page_  components. Unlike  `fetch`, this hook does not display a loading placeholder during client-side rendering: instead, this hook blocks route navigation until it is resolved, displaying a page error if it fails.

For example:
```html
<template>
  <p v-if="$fetchState.pending">Fetching mountains...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
    <h1>Nuxt Mountains</h1>
    <ul>
      <li v-for="mountain of mountains">{{ mountain.title }}</li>
    </ul>
    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    async fetch() {
      this.mountains = await this.$axios.$get(
        'https://api.nuxtjs.dev/mountains'
      )
    }
  }
</script>
```
When using the `nuxt/axios` library you can define the baseURL in the `nuxt.config.js`:

```js
// nuxt.config.js

export default {
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    browserBaseURL: 'https://api.nuxtjs.dev/'
  },
}
```
Now you can use the url of the API in all your pages and components without repeating the base URL:
```html
<!-- pages/index.vue -->

<template>
  <div>
    <h1>{{ mountain.slug }}</h1>
    <img :src="mountain.image" :alt="mountain.slug">
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        mountain: null
      }
    }, 
    async fetch() {
      const mountain = await this.$axios.$get('/mountains/aconcagua') // https://api.nuxtjs.dev/mountains/aconcagua
      this.mountain = mountain;
    }
  }
</script>
```
You can use ``keep-alive`` directive in ``<nuxt/>`` and ``<nuxt-child/>`` component to save ``fetch`` calls on pages you already visited:
```html
<!-- layouts/default.vue -->

<template>
  <nuxt keep-alive />
</template>
```

## 📱 Breakpoints mobile first
The scss folder located in  ``./assets/scss/``  contains two files to make it easier for web developers to prototype, build, scale, and maintain CSS for responsive websites:
### SCSS Files
```
assets
│
└─── scss
    │
    └─── main.scss
    │
    └─── mixins.scss
    │
    └─── breakpoints.scss
```
Building responsive websites is a must-have skill for front-end developers today, so we've made the breakpoints mobile first. They are all defined with a ``@media (min-width:``  so that the main css you write is based on mobile screens.
````scss
// breakpoints.scss


/* Small (sm) */
$screen-sm-min: 640px;

/* Medium (md) */
$screen-md-min: 768px;

/* Large (lg) */
$screen-lg-min: 1024px;

/* Extra Large (xl) */
$screen-xl-min: 1280px;

/* 2 Extra Large (xxl) */
$screen-xxl-min: 1536px;
````

Now it’s time to create the most important element – mixins:
````scss
// mixins.scss


// Small devices
@mixin  sm {
  @media (min-width: #{$screen-sm-min}) {
    @content;
  }	
}

// Medium devices
@mixin  md {
  @media (min-width: #{$screen-md-min}) {
    @content;
  }	
}

// Large devices
@mixin  lg {
  @media (min-width: #{$screen-lg-min}) {
    @content;
  }	
}

// Extra large devices
@mixin  xl {
  @media (min-width: #{$screen-xl-min}) {
    @content;
  }	
}

// XXL devices
@mixin  xxl{
  @media (min-width: #{$screen-xxl-min}) {
    @content;
  }	
}
````

I always build my websites in a mobile-first approach, so I don’t need to define the smallest screen size (xs – extra small) and I write my SCSS code first for the smallest devices and next for the largest. Sometimes we also need to define some styles beyond the rigidly defined breakpoints. Let’s add one more mixin – I called it “rwd”:
````scss
// mixins.scss


// Custom devices
@mixin rwd($screen) {
  @media (min-width: $screen+'px') {
    @content;
  }
}
````
As a parameter `$screen` we can put any screen size.

### For Example
````css
.container {
    padding: 0 15px;
    
	/* 576px window width and more */
    @include sm {
        padding: 0 20px;
    }
    
	/* 992px window width and more */
    @include lg {
        margin-left: auto;
        margin-right: auto;
        max-width: 1100px;
    }
    
	/* 1400px window width and more */
    @include rwd(1400) {
        margin-bottom: 20px;
        margin-top: 20px;
    }
}
````

## 💬 Nuxt-i18n
Nuxt-I18n is the Vue.js internationalization plugin optimized for using in Nuxt.js. The configuration of the languages is defined in the ``nuxt.config.js`` file:
```js
// nuxt.config.js

{
  modules: [
    'nuxt-i18n'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'nl',
        iso: 'nl-NL',
        name: 'Dutch',
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locales/en.json'),
        nl: require('./locales/nl.json')
      }
    }
  }
}
```
The locales are located in the ``~/locales`` folder, for example:
````
locales
│
└─── en.json
│
└─── nl.json
````
````json
// nl.json

{
  "welcome": "Een boilerplate voor single page application gebasserd op Nuxt.js"
}
````
````json
// en.json

{
  "welcome": "A boilerplate for single page applications based on Nuxt.js"
}
````

When rendering internal links in your app using `<nuxt-link>`, you need to get proper URLs for the current locale. To do this, **nuxt-i18n** registers a global mixin that provides some helper functions:
-   `localePath`  – Returns the localized URL for a given page. The first parameter can be either the path or name of the route or an object for more complex routes. A locale code can be passed as the second parameter to generate a link for a specific language:
``` html
<nuxt-link :to="localePath('/')">{{ $t('home') }}</nuxt-link>
<nuxt-link :to="localePath('index', 'en')">Homepage in English</nuxt-link>
<nuxt-link :to="localePath('/app/profile')">Route by path to: {{ $t('Profile') }}</nuxt-link>
<nuxt-link :to="localePath('app-profile')">Route by name to: {{ $t('Profile') }}</nuxt-link>
<nuxt-link
  :to="localePath({ name: 'category-slug', params: { slug: category.slug } })">
  {{ category.title }}
</nuxt-link>
<!-- It's also allowed to omit 'name' and 'path'. -->
<nuxt-link :to="localePath({ params: { slug: 'ball' } })">{{ category.title }}</nuxt-link>
```
-   `switchLocalePath`  – Returns a link to the current page in another language:
``` html
<nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
<nuxt-link :to="switchLocalePath('fr')">Français</nuxt-link>
```
Template:
```html 
<p>{{ $t('welcome') }}</p>
``` 
Output:
```html 
<p>A boilerplate for single page applications based on Nuxt.js</p>
``` 
## 🗛 Fonts
There are two standard declarations for the font types:
````css
/* standard declrations */
h1,h2,h3,h4,h5,h6 {
  font-family: 'DM sans';
}
body {
  font-family: 'Arial';
}
````

These font-families are defined in the same file `font.css`:
````css
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('~assets/fonts/DM-Sans/DMSans-Regular.ttf') format('truetype');
}
````
If you wanna use a different font family in a specified component you can use another specified font in from the `font.css` inside the `<style lang="scss" scoped></style>` of the `.vue` component

## 🌗 Dark & Light theme
🌑 Dark and 🌕 Light mode with auto detection made easy with the plugin `nuxt/color-mode`. 

### Note
If you don't need a dark/sepia/light mode you can always disable it by commenting this line in `nuxt.config.js`:
````js
modules: [
  '@nuxtjs/color-mode'
],
````

### Theme file
The main theme file, located in `css/theme.css` contains all css rules specific for `nuxtjs/color-mode`. In the `theme.css` you declare all color variables per theme. So for example:

````css
:root {
  --bg-color: #ffffff;
}

.dark-mode {
  --bg-color: #21252b;
}

body {
  background-color: var(--bg-color);
  transition: background-color .3s;
}
````

Now you can add the option to select a theme:
````html
<template>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="dark">Dark</option>
    </select>
</template>
````

### Important
We use [PurgeCSS](https://github.com/FullHuman/purgecss) for removing unused CSS selectors to optimize the performance of the web application. But PurgeCSS will delete all css rules of the theme(s) that are not selected.
To resolve this issue you'll have to add the theme classes in to the white list of PurgeCSS. So for example:
````js
//nuxt.config.js

purgeCSS: {
  whiteList: () =>['dark-mode']
},
````
Now PurgeCSS will ignore those classes by removing the unused CSS selectors
