import React from 'react'

const cx = (...s: Array<string | undefined>) => s.filter(Boolean).join(' ')

export interface StyledNavWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'prev' | 'next'
}

export const StyledNavWrapper = React.forwardRef<
  HTMLDivElement,
  StyledNavWrapperProps
>(({ direction, className, ...rest }, ref) => {
  const dirClass = direction === 'prev' ? 'scs-nav--prev' : 'scs-nav--next'
  return (
    <div ref={ref} className={cx('scs-nav', dirClass, className)} {...rest} />
  )
})

export const StyledArrow = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className, ...rest }, ref) => {
  return <svg ref={ref} className={cx('scs-arrow', className)} {...rest} />
})

StyledNavWrapper.displayName = 'StyledNavWrapper'
StyledArrow.displayName = 'StyledArrow'

