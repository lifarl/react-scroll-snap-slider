# react-scroll-snap-slider
A React Slider / Carousel Component with Scroll Snapping and Intersection Observer.

![npm bundle size](https://img.shields.io/bundlephobia/min/@lifarl/react-scroll-snap-slider)
[![npm version](https://badge.fury.io/js/%40lifarl%2Freact-scroll-snap-slider.svg)](https://badge.fury.io/js/%40lifarl%2Freact-scroll-snap-slider)
![NPM](https://img.shields.io/npm/l/@lifarl/react-scroll-snap-slider)

## Installation

```
yarn add @lifarl/react-scroll-snap-slider
```

Note: This is a react component which uses styled components as peer dependency.

## Usage

See example in `App.tsx`

[Demo](https://lifarl.github.io/react-scroll-snap-slider/)

## Intersection Observer

Firing tracking events on css based sliders can be done with the intersection observer. Pass `onSlideVisible` to the Carousel and it will fire when a slide enters the viewport without triggering a rerender.

## Props

```typescript
onSlideVisible?: (index: number) => void
renderCustomArrow?: ({
  direction,
  ref,
  onClick,
}: CustomArrowProps) => JSX.Element
slidesPerPageSettings?: SlidesPerPageSettings
slideWidth?: number
onScroll?: () => void
afterScroll?: (index: number) => void
children: React.ReactNode
```
