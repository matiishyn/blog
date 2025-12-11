---
title: "Presentational and Container Components for React with Redux"
description: "Learn how to refactor React components into presentational and container components for better code organization and maintainability when using Redux"
image: "/images/blog/03.jpg"
date: "2016-02-29T13:03:48+01:00"
author: "Ivan Matiishyn"
categories: ["Programming"]
tags: ["React", "Redux", "JavaScript", "Architecture"]
---

In this post I'll briefly describe small refactoring of [React](https://facebook.github.io/react) component based on [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

I'm creating an [SPA](https://en.wikipedia.org/wiki/Single-page_application) using [React](https://facebook.github.io/react) and [Redux](https://github.com/reactjs/redux) library for [Flux](https://facebook.github.io/flux/) architecture.

## MyComponent - old way

![react-component-1](/images/blog/react-component-structure/react-component-1.PNG)

`MyComponent.js`

```javascript
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { myAction } from '../actions'   // actions
import styles from './styles.scss'      // CSS Modules

class MyComponent extends Component {
    render() {
        return (<div className={styles.myClass}>MyComponent...</div>)
    }
}

MyComponent.propTypes = {
    propFromUrlParam: PropTypes.string.isRequired,
    propFromState: PropTypes.string.isRequired,
    myAction: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
    let { propFromUrlParam } = props.params;    // props from URL params
    let { propFromState } = state;              // props from state
    return {propFromUrlParam, propFromState}
}

export default connect(mapStateToProps, {
    // mapping methods to component
    myAction
})(MyComponent)
```

This file is going to be really big and one of best practices is to divide it into two logical parts:

*Dumb* and *Smart* or *Container* and *Presentational* components. All the explanation you can find [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). 

I'll just show how it looks in my case after dividing. So,

## MyComponent - new way

![react-component-2](/images/blog/react-component-structure/react-component-2.PNG)

`MyComponent.js` the [presentational component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#8ce5):

```javascript
import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'  // CSS Modules

class MyComponent extends Component {
    render() {
        return (<div className={styles.myClass}>MyComponent...</div>)
    }
}

MyComponent.propTypes = {
    propFromUrlParam: PropTypes.string.isRequired,
    propFromState: PropTypes.string.isRequired,
    myAction: PropTypes.func.isRequired
}

export default MyComponent
```

`MyComponentContainer.js` the [container component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#c27f):

```javascript
import MyComponent from './MyComponent'     // presentational component
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { myAction } from '../actions'        // actions

function mapStateToProps(state, props) {
    let { propFromUrlParam } = props.params; // prop from URL params
    let { propFromState } = state;
    return {propFromUrlParam, propFromState}
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            // mapping methods to component
            myAction
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

And a small helper `index.js` which is used just for convenience while importing the component and looks like this:

```javascript
export default from './MyComponent' // container components
```

Now you may import the `MyComponent` wherever you need it

```javascript
import MyComponent from './components/MyComponent' // will import index.js
```
