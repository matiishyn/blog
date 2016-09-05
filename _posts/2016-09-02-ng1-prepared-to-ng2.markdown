---
layout: post
title:  "Write AngularJS 1.x application prepared for Angular2"
date:   2016-09-02 11:03:48 +0100
categories: programming es6 webpack javascript angular
---

Hi there. Today is September 2016 and here's the current state of
JavaScript frameworks and techs we are gonna be talking about:

* [**AngularJS 1.x**][ng1] is getting outdated and it's version is `1.5.x`
* [**Angular2**][ng2] is still in `RC6` and cannot be used in production yet
* [**React**][react] is already `15.3.x` and it's nicely used with [**Redux**][redux]

Last month I gave a [talk](https://youtu.be/IdkfhxbzMNI?t=5m7s) about **Angular2** and people asked which 
framework to use for starting new project. I cannot recommend you 
**Angular2** yet but I can give you some practical advices how to write 
your **AngularJS 1.5.x** application "correctly"

## Components

### Problem

The Reality of Most **AngularJS 1.x** Apps is that they are written in 'Scope 
Soup' architecture 
([more](https://toddmotto.com/no-scope-soup-bind-to-controller-angularjs/) 
and [more](http://www.technofattie.com/2014/03/21/five-guidelines-for-avoiding-scope-soup-in-angular.html)). 
This is an anti-pattern, which makes your 
application difficult to work with, non-extendable and hardly maintainable. 

{% include image.html 
    url="http://teropa.info/images/scope_soup.png" 
    caption="Image credit: Teropa.info" 
%}

Here are some points that should be **avoided** while creating and designing 
an AngularJS application:

* Using of `ng-include` instead of directives/components
* Some controllers manage several nested templates, and some templates 
introduce several controllers
* Primary way to share data between different components is 
`scope`/`rootScope`, not isolated scope
* MVC directory structure (separate folder for controllers, templates, 
directives) ([more](https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make#1-mvc-directory-structure))
* Using controllers for all business logic
* Too many watchers ([more](https://www.aaron-gray.com/delaying-the-digest-cycle-in-angularjs/))
* Using jQuery ([more](https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make#10-using-jquery))


### Solution

But how to refactor that? Or what is the correct way to build applications? 
And the answer is – **Component architecture**.
All of the major JavaScript frameworks are converging towards a concept 
of Components as the building blocks of UI. A component is basically 
just a custom HTML element that matches a component name and usually 
has certain inputs and outputs, which we supply as properties on the 
element. ([more](http://teropa.info/blog/2015/10/18/refactoring-angular-apps-to-components.html#components))

{% include image.html 
    url="http://teropa.info/images/component_refac.gif" 
    caption="Image credit: Teropa.info" 
%}

**AngularJS 1.5.x** showed us a new special kind of directive which is a 
`.component()` ([docs](https://docs.angularjs.org/guide/component) and 
[more](https://toddmotto.com/angular-1-5-lifecycle-hooks)). 
As already mentioned, the component helper makes 
it easier to structure your application with a component-based architecture.

<iframe class="youtube-video-embedded" src="https://www.youtube.com/embed/AMwjDibFxno" frameborder="0" allowfullscreen></iframe>


And that *component approach* will help you to migrate to **Angular2** 
([components in Angular2](https://angular.io/docs/ts/latest/guide/architecture.html#!#components))

## AngularJS 1.5 + ES6/TS as a transition to Angular2

Writing application using **AngularJS 1.5.x** in combination with **ES2015** and 
**Component architecture** makes migration to **Angular2** easier. 

Let's take a look at some ways of using new version of JavaScript 
to create an AngularJS application. 


### ES2015 (ES6)

**ES2015** is the newest version of the ECMAScript standard for the moment. 
This standard was ratified in June 2015.

Here is a short review of **ES6** features: [Learn ES2015](https://babeljs.io/docs/learn-es2015/)

Modern browser support most of those 
([compatibility table](https://kangax.github.io/compat-table/es6/)) 
but if you want to support some older browsers or just to be sure that 
all features work fine then you’ll have to use a JavaScript transpiler 
([review them](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them)) 
and [Babel](https://babeljs.io/) is the most popular one nowadays.


### Module bundler

In order to use new module system JS transpiler is not enough, you 
need to have a Module Bundler 
([modules in JS](https://medium.freecodecamp.com/javascript-modules-part-2-module-bundling-5020383cf306))

1. [WebPack](webpack.github.io) is the most popular nowadays, easy to use
2. [jspm](http://jspm.io/) is most popular among Angular2 applications

### Writing AngularJS 1 using ES6

#### Modules

This is an example of how the main module may look like. 
This is the entry point of your application that defines your main 
module, require dependencies, configs:

`index.js:`
<pre class='line-numbers'><code class="language-javascript">
// importing external dependencies
import angular from 'angular';
import uiRouter from 'angular-ui-router';//v1-import into a variable
import 'angular-animate';                //v2–inline import

// importing custom modules
import {myModule} from './my-module';

// configs, router, services
import routesConfig from './routes';
import {MyService} from './pathTo/my-service';

// styles
import './index.css';

angular
    .module('myApp', [
        // dependencies
        uiRouter,           // v1 - using a variable
        'ngAnimate',        // v2 - addressing to module name
        // modules
        myModule
    ])
    .config(routesConfig)
    .service('MyService', MyService);
</code></pre>

And an example of a new custom module:

`my-module.js:`
<pre class='line-numbers'><code class="language-javascript">
import angular from 'angular';

import component from './pathTo/my-component'

export const myModule = 'myApp.myModule';

angular
    .module(myModule, [])
    .component('myComponent', component);
</code></pre>


#### Components

A nice approach would be to distinguish 'smart' and 'dumb' components.
([more](https://youtu.be/AMwjDibFxno?t=4m4s) and 
[more](https://youtu.be/eel3mV0alEc?t=11m41s))

An example of a “smart” component would look like this:

`my-component.js:`
<pre class='line-numbers'><code class="language-javascript">
import template from './tmpl.html'

class MyController {
    // this is how DI works:
    /** @ngInject */         // https://github.com/olov/ng-annotate
    constructor(myService) {
        // inject and make available by assigning to 'this'
        this.myService = myService;
    }

    getElements() {
        this.els = this.myService.getElements();
    }
}

export default {
    template,
    controller: MyController
};
</code></pre>

#### Services
A service is just a plain ES6 class, like in 
[**Angular2**](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html)

`my-service.js:`
<pre class='line-numbers'><code class="language-javascript">
export class MyService {
  getElements() {
    return [...];
  }
}
</code></pre>
This service was injected in the component above. You can also inject 
other services into this one using same approach (in `constructor`)

---

And a general overview by Scott:

<iframe class="youtube-video-embedded" src="https://www.youtube.com/embed/wlNEKHDbK5E" frameborder="0" allowfullscreen></iframe>

[ng1]: https://angularjs.org/
[ng2]: https://angular.io/
[react]: https://facebook.github.io/react/
[redux]: https://github.com/reactjs/redux