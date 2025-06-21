---
title: "React Native Animation using Hooks: Loading Screen"
date: 2020-08-22
slug: react-native-animation-using-hooks-loading-screen
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1598075879704/AeI3isdrB.png
tags: react-native, animation, reactjs, beginners, 2articles1week
canonical: https://iamshadmirza.com/react-native-animation-using-hooks-loading-screen
---

Hey there, I guess you decided to read this blog to learn a few things about React Native Animation and Hooks. You're in the right place.

We are going to make a basic rotation animation using the React Native Animated library. This will contain a "Twitter" logo at the center which will rotate to create a loading effect. We will incorporate the whole logic inside a hook. Let's start.

## Step 1: Create a Loading Screen

We first need a loading screen to animate.

- Add a View with `flex: 1`, it will cover the whole screen.
- Add **Twitter logo** (or any image you like) with a **Loading...** text.
- Place them at the center of the screen.

```js
// App.js

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Logo from './twitter.png'

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={[styles.image]}
        source={Logo}
        resizeMode="contain"
      />
      <Text style={styles.textMargin}>Loading tweets...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  textMargin: {
    marginTop: 30,
    fontSize: 18,
  },
})
```

You may have noticed that Image style is an array. This is because we are going to add styles to rotate the image in a while.

## Step 2: Create `useRotation` Hook

Create a file `useRotation.js` and follow along. This will contain 4 steps:

### 1) Create Animated value

What's an Animated value 🤔?

This will be the initial value created via the `Animated` library. We will update this value with `Animated` API and hook up the changes with styles of the Image to create a fluid animation.

```js
import { useRef } from 'react'
import { Animated } from 'react-native'

export default function useRotation() {
  const animation = useRef(new Animated.Value(0)).current
  return null
}
```

> We are using `useRef` hook as this ref object's current property is initialized as the given argument (Animated value) and persists throughout the component lifecycle. Using `useState` is not recommended here.

### 2) Animate the value using `Animated` API.

Animated API gives us a bunch of methods to mutate the animated value without much trouble. Some of the methods are `timing`, `spring`, `decay`, etc. You can read more on the [Official Documentation](https://reactnative.dev/docs/animated).

We will use `Animated.timing()` to change the value in a particular duration and then `Animated.delay()` to give a pause before starting to rotate again. Then we will use `Animated.sequence()` to add these two animations in aa array to create a sequence.

```js
import { useRef } from 'react'
import { Animated } from 'react-native'

export default function useRotation() {
  const animation = useRef(new Animated.Value(0)).current

  function startAnimation() {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.delay(300),
    ], { useNativeDriver: true })
      .start(() => {
        animation.setValue(0)
        startAnimation()
      })
  }
  return null
}
```

`Animated.sequence` takes an array of animated to execute one after another.

`Animated.timing` takes the animated value (initialized 0 in this example) as the first argument and animate to `toValue` provided (will change to 1 in this example) inside an object in the second argument with a specified `duration`.

`Animated.delay` takes a number of milliseconds which will delay the next animation.

After adding all these, we will start the animation by calling `.start()`