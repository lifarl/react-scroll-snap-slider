# react-scroll-snap-slider
A performant React Slider / Carousel Component with CSS Scroll Snapping, Intersection Observer and Accessibility.

![npm bundle size](https://img.shields.io/bundlephobia/min/@lifarl/react-scroll-snap-slider)
[![npm version](https://badge.fury.io/js/%40lifarl%2Freact-scroll-snap-slider.svg)](https://badge.fury.io/js/%40lifarl%2Freact-scroll-snap-slider)
![NPM](https://img.shields.io/npm/l/@lifarl/react-scroll-snap-slider)


Have a look at the ***[Demo](https://lifarl.github.io/react-scroll-snap-slider/)*** for the different variations.
![demo](https://user-images.githubusercontent.com/35375260/99197384-7d8c7e80-2792-11eb-8d05-c7ab66d3bd92.png)

## Installation

```
yarn add @lifarl/react-scroll-snap-slider
```

> Note: From v3.0.0, this library ships plain CSS (no styled-components). There are no styling peer dependencies.

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

## Styling / CSS

- Import once at app entry: `import '@lifarl/react-scroll-snap-slider/styles.css'`.
- All classes are prefixed with `.scs-` to avoid global leaks.
- Theming uses CSS variables set on any parent (or the component root):
  - `--scs-gap` (default `8px`)
  - `--scs-arrow-bg` (default `#fff`)
  - `--scs-arrow-padding` (default `0.5em`)
  - `--scs-arrow-radius` (default `4px`)
  - `--scs-arrow-color` (default `#676767`)
  - `--scs-arrow-size` (default `22px`)
  - `--scs-scroll-behavior` (default `smooth`)
  - `--scs-snap-type` (default `x mandatory`) — set to `x proximity` to reduce snap sensitivity on Chrome/Android
  - `--scs-snap-stop` (default `normal`) — set to `always` to prevent skipping multiple slides per gesture
  - `--scs-touch-action` (default `pan-x`) — adjust to `auto` if you need vertical gestures over the slider
  - `--scs-overscroll-behavior` (default `auto`) — set to `contain` to prevent scroll chaining to parent

Slots and class overrides are supported via `classes` on the `Slider` component:

```tsx
<Slider
  classes={{
    root: 'my-carousel',
    slider: 'my-slider',
    list: 'my-list',
    slide: 'my-slide',
    nav: 'my-nav',
    navPrev: 'my-nav-prev',
    navNext: 'my-nav-next',
    arrow: 'my-arrow',
  }}
>
  {...}
</Slider>
```

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
className?: string // root class override
classes?: Partial<{
  root: string
  slider: string
  list: string
  slide: string
  nav: string
  navPrev: string
  navNext: string
  arrow: string
}>
```

## Browser Support

This lib does not include scroll snap polyfills to support older browsers like ie11. You would need to add them yourself. For more information see [here](https://github.com/PureCarsLabs/css-scroll-snap-polyfill).

## Tuning Snap Feel (Android/Chrome)

Mobile browsers implement different scroll-snap heuristics. If the slider feels “too sensitive” on Android/Chrome (small flicks advance a slide, or gestures skip multiple slides), you can tune behavior via CSS variables:

```css
/* Apply to your slider root */
.my-slider {
  /* Reduce sensitivity */
  --scs-snap-type: x proximity;  /* default */

  /* Avoid skipping multiple slides */
  --scs-snap-stop: always;

  /* Optional axis + scroll chaining controls */
  --scs-touch-action: pan-x;           /* default */
  --scs-overscroll-behavior: contain;  /* keep scroll inside slider */
}
```

Usage:

```tsx
<Slider classes={{ root: 'my-slider' }}>
  {...}
</Slider>
```

Notes:
- `x proximity` only snaps when near a snap point, which typically reduces accidental snaps on Android compared to `mandatory`.
- `scroll-snap-stop: always` ensures the browser does not skip over intermediate slides during a fast flick.
- If you need vertical page scrolling to take priority when swiping over the slider, set `--scs-touch-action: auto` on the slider root.
