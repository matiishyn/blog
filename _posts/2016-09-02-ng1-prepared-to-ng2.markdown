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

Last month I gave a talk about **Angular2** and people asked which 
framework to use for starting new project. I cannot recommend you 
**Angular2** yet but I can give you some practical advices how to write 
your **AngularJS 1.5.x** application "correctly"

## Components

### Problem

The Reality of Most Angular 1.x Apps is that they are written in 'Scope 
Soup' architecture 
([more](https://toddmotto.com/no-scope-soup-bind-to-controller-angularjs/) 
and [more](http://www.technofattie.com/2014/03/21/five-guidelines-for-avoiding-scope-soup-in-angular.html)). 
This is an anti-pattern, which makes your 
application difficult to work with, non-extendable and hardly maintainable. 

![Image](http://teropa.info/images/scope_soup.png)

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

![Image](http://teropa.info/images/component_refac.gif)

**Angular 1.5.x** showed us a new special kind of directive which is a 
`.component()` ([docs](https://docs.angularjs.org/guide/component) and 
[more](https://toddmotto.com/angular-1-5-lifecycle-hooks)). 
As already mentioned, the component helper makes 
it easier to structure your application with a component-based architecture.

<iframe width="560" height="315" src="https://www.youtube.com/embed/AMwjDibFxno" frameborder="0" allowfullscreen></iframe>


And that *component approach* will help you to migrate to **Angular2** 
([components in Angular2](https://angular.io/docs/ts/latest/guide/architecture.html#!#components))

[ng1]: https://angularjs.org/
[ng2]: https://angular.io/
[react]: https://facebook.github.io/react/
[redux]: https://github.com/reactjs/redux