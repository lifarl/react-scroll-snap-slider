import React from 'react'
import { SlideProps } from './Slide.interface'
import { StyledSlide } from './Slide.styled'
import type { CSSProperties } from 'react'

const Slide = React.forwardRef(
  (
    { slideIndex, slidesPerPageSettings, slideWidth, className, children }: SlideProps,
    ref: React.Ref<HTMLLIElement>
  ) => {
    const baseMinWidth = slidesPerPageSettings
      ? `${100 / slidesPerPageSettings.mobileSmall}%`
      : slideWidth
      ? `${slideWidth}px`
      : '100%'

    const cssVars: CSSProperties = {
      ['--scs-min-w' as any]: baseMinWidth,
      ['--scs-min-w-512' as any]: slidesPerPageSettings
        ? `${100 / slidesPerPageSettings.mobileBig}%`
        : undefined,
      ['--scs-min-w-753' as any]: slidesPerPageSettings
        ? `${100 / slidesPerPageSettings.tablet}%`
        : undefined,
      ['--scs-min-w-1232' as any]: slidesPerPageSettings
        ? `${100 / slidesPerPageSettings.desktop}%`
        : undefined,
    }

    return (
      <StyledSlide
        style={cssVars}
        data-index-number={slideIndex}
        key={slideIndex}
        className={className}
        ref={ref}
      >
        {children}
      </StyledSlide>
    )
  }
)

Slide.displayName = 'Slide'

export default Slide
