
  
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
- [Mobile First](#user-content--breakpoints-mobile-first)
- [Multi Language](#user-content--nuxt-i18n)

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

In a SPA, all necessary HTML, JavaScript, and CSS code is either retrieved by the browser with a single page load,[1] or the appropriate resources are dynamically loaded and added to the page as necessary, usually in response to user actions. The page does not reload at any point in the process, nor does it transfer control to another page, although the location hash or the HTML5 History API can be used to provide the perception and navigability of separate logical pages in the application.

<p align="center">
  <img width="100%" src="https://raw.githubusercontent.com/dennisfrijlink/development-utilities/main/images/SPA%20lifecycle.png" alt="Lifecycle of Single Page Application">
</p>

## 📱 Breakpoints mobile first
The scss folder located in  ``./assets/scss/``  contains two files to make it easier for web developers to prototype, build, scale, and maintain CSS for responsive websites:
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
````

Now it’s time to create the most important element – mixins:
````scss
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
````scss
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
``` vue
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
``` vue
<nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
<nuxt-link :to="switchLocalePath('fr')">Français</nuxt-link>
```
