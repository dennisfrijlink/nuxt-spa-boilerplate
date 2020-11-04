
<p align="center">
  <br>
  <img width="400" src="https://raw.githubusercontent.com/dennisfrijlink/development-utilities/main/images/Nuxt-Spa.svg" alt="logo of Nuxt Single Page Application Repository">
  <br>
  <br>
</p>

# Single Page Application Boilerplate - Nuxt.js
> A boilerplate for single page applications based on the Vue.js Framework, Nuxt.js

## Contents
- [Build Setup](#build-setup)
- [Mobile First](#breakpoints-mobile-first)
- [Multi Language](#nuxt-i18n)

## Build Setup
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
## Breakpoints mobile first
The scss folder locatied in  ``./assets/scss/``  contains two files to make it easier for web developers to prototype, build, scale, and maintain CSS for responsive websites:
### SCSS Files
```
assets
│
└─── scss
    │
    └─── _mixins.scss
    │
    └─── breakpoints.scss
```
Building responsive websites is a must-have skill for front-end developers today, so we've made the breakpoints mobile first. They are all defined with a ``@media (min-width:``  so that the main css you write is based on mobile screens.
````css
// breakpoints.scss


/* Small (sm) */
$screen-sm-min: 640px;

/* Medium (md) */
$screen-md-min: 768px;

/* Large (lg) */
$screen-lg-min: 1024px;

/* Extra Large (xl) */
$screen-xl-min: 1280px;
````

Now it’s time to create the most important element – mixins:
````css
// _mixins.scss


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
````

I always build my websites in a mobile-first approach, so I don’t need to define the smallest screen size (xs – extra small) and I write my SCSS code first for the smallest devices and next for the largest. Sometimes we also need to define some styles beyond the rigidly defined breakpoints. Let’s add one more mixin – I called it “rwd”:
````css
// _mixins.scss


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
    
	// 576px window width and more
    @include sm {
        padding: 0 20px;
    }
    
	// 992px window width and more
    @include lg {
        margin-left: auto;
        margin-right: auto;
        max-width: 1100px;
    }
    
	// 1400px window width and more
    @include rwd(1400) {
        margin-bottom: 20px;
        margin-top: 20px;
    }
}
````

## Nuxt-i18n
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
The locales are located in the ``~/locales`` folder:
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
```js
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
```js
<nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
<nuxt-link :to="switchLocalePath('fr')">Français</nuxt-link>
```
