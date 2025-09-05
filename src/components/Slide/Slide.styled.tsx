import React from 'react'

const cx = (...s: Array<string | undefined>) => s.filter(Boolean).join(' ')

export const StyledSlide = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...rest }, ref) => {
  return <li ref={ref} className={cx('scs-slide', className)} {...rest} />
})

StyledSlide.displayName = 'StyledSlide'

