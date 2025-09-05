import React from 'react'

const cx = (...s: Array<string | undefined>) => s.filter(Boolean).join(' ')

export const StyledCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...rest } = props
  return <div ref={ref} className={cx('scs-carousel', className)} {...rest} />
})

export const StyledSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...rest } = props
  return <div ref={ref} className={cx('scs-slider', className)} {...rest} />
})

export const StyledUl = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>((props, ref) => {
  const { className, ...rest } = props
  return <ul ref={ref} className={cx('scs-list', className)} {...rest} />
})

StyledCarousel.displayName = 'StyledCarousel'
StyledSlider.displayName = 'StyledSlider'
StyledUl.displayName = 'StyledUl'

