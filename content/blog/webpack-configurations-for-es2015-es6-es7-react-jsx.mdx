---
title: "Webpack configurations for ES2015/ES6, ES7, React JSX"
description: "A comprehensive guide to setting up Webpack configurations for ES6/ES2015, ES7, and React JSX projects using Babel"
image: "/images/blog/02.jpg"
date: "2016-02-17T13:03:48+01:00"
author: "Ivan Matiishyn"
categories: ["Programming"]
tags: ["JavaScript", "ES6", "Webpack", "React", "Babel"]
---

In this post I'll try to briefly describe [Webpack](https://webpack.github.io) configurations (`webpack.config.js`) for such projects that should be written with ES6/ES2015:

* ES6/ES2015 project
* ES6/ES2015 project with support of experimental ES7 features
* [React](https://facebook.github.io/react) project

It requires basic knowledge of [Node.js](https://nodejs.org), [npm](https://npmjs.com), [Webpack](https://webpack.github.io) and command line. Make sure that you have installed all of them.

I'll try to define the correct Webpack configuration (`webpack.config.js`) but will not explain how to work with Webpack.

## ES6/ES2015

ES6/ES2015 is a current version of JavaScript not yet supported by all modern browsers. That's why you need to use a compiler to make it work. I will use [Babel](https://babeljs.io) in combination with [Webpack](https://webpack.github.io)

## Webpack

[Webpack](https://webpack.github.io) is a module bundler. Make sure you have installed it globally, like this `npm install webpack -g`. Installation is described [here](http://webpack.github.io/docs/installation.html).

## ES6/ES2015 Webpack configuration

Let's install some NPM packages that we need

```bash
# webpack itself
npm i --save-dev webpack

# babel core and loader for webpack
npm i --save-dev babel-core babel-loader

# es2015 features
npm i --save-dev babel-preset-es2015
```

And your `webpack.config.js` should look like this:

```javascript
module.exports = {
    // simple config from http://webpack.github.io/docs/configuration.html
    entry: "./entry",
    output: { path: __dirname + "/dist", filename: "bundle.js" },
    
    // using webpack loader
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader", // or just "babel"
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
```

And that's it. You can write your ES6/ES2015 code in `entry.js` file and it will be compiled to ES5 code and bundled to `bundle.js` which should be included in your HTML file. Read more about Webpack [here](http://webpack.github.io/docs/).

## ES7 Webpack configuration

To turn on ES7 support you just need to add [Babel's "Stage 0" preset](https://babeljs.io/docs/plugins/preset-stage-0/).

Let's see how to do that.

First of all you need to install it

```bash
# make sure that dependencies from previous project are installed
npm i --save-dev webpack babel-core babel-loader babel-preset-es2015

# then install the Stage 0 preset
npm i --save-dev babel-preset-stage-0
```

And add the preset to babel-loader, like this:

`webpack.config.js`

```javascript
module.exports = {
    // simple config from http://webpack.github.io/docs/configuration.html
    entry: "./entry",
    output: { path: __dirname + "/dist", filename: "bundle.js" },
    
    // using webpack loader
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader", // or just "babel"
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};
```

Enjoy ES7 and remember that a lot of things are still experimental. Personally I needed this preset to make [ES7 Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841) work.

## React Webpack configuration

Finally let's review the config for [React](https://facebook.github.io/react) application.

You'll need to install one more Babel's preset called [React preset](https://babeljs.io/docs/plugins/preset-react/) which will let you use React's JSX syntax

```bash
# make sure that dependencies from previous project are installed
npm i --save-dev webpack babel-core babel-loader babel-preset-es2015

# then you may install the React preset
npm i --save-dev babel-preset-react
```

And add the preset to babel-loader, like this:

`webpack.config.js`

```javascript
module.exports = {
    // simple config from http://webpack.github.io/docs/configuration.html
    entry: "./entry",
    output: { path: __dirname + "/dist", filename: "bundle.js" },
    
    // using webpack loader
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader", // or just "babel"
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
```

Now you may start a new React project with all the ES6 features.
