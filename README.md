# react-scroll-snap-slider
A React Slider / Carousel Component with Scroll Snapping and Intersection Observer. ***[Demo](https://lifarl.github.io/react-scroll-snap-slider/)***

![npm bundle size](https://img.shields.io/bundlephobia/min/@lifarl/react-scroll-snap-slider)
[![npm version](https://badge.fury.io/js/%40lifarl%2Freact-scroll-snap-slider.svg)](https://badge.fury.io/js/%40lifarl%2Freact-scroll-snap-slider)
![NPM](https://img.shields.io/npm/l/@lifarl/react-scroll-snap-slider)

![demo](https://user-images.githubusercontent.com/35375260/99197384-7d8c7e80-2792-11eb-8d05-c7ab66d3bd92.png)

## Installation

```
yarn add @lifarl/react-scroll-snap-slider
```

> Note: This is a react component which uses styled components as peer dependency. `yarn add styled-components` if you don't have it.

## Usage


```tsx

import { Slider } from '@lifarl/react-scroll-snap-slider';

<Slider>
  <div>Foo</div>
  <div>Bar</div>
  <div>Baz</div>
</Slider>
```

See also examples in `App.tsx`

## Intersection Observer

Firing tracking events on css based sliders can be done with the intersection observer. Pass `onSlideVisible` to the Carousel and it will fire when a slide enters the viewport without triggering a rerender.

## Props  

```typescript
onSlideVisible?: (index: number) => void // Callback that is triggered when a slide gets visible by a threshold of 0.5
renderCustomArrow?: ({
  direction,
  ref,
  onClick,
}: CustomArrowProps) => JSX.Element // In case you want to use your own arrow design and logic
slidesPerPageSettings?: SlidesPerPageSettings // optionally for setting fixed amounts of slides for different viewports (min-width: 512px / 753px / 1232px)
slideWidth?: number // optionally for setting a fixed slide width
onScrollStart?: () => void // callback that triggers at the beginning of the scroll event
onScrollEnd?: (index: number) => void // callback that triggers at the end of the scroll event
children: React.ReactNode // put your slides here :)
```

## Browser Support

This lib does not include scroll snap polyfills to support older browsers like ie11. You would need to add them yourself. For more information see [here](https://github.com/PureCarsLabs/css-scroll-snap-polyfill).
