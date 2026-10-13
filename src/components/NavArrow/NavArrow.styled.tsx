import React from 'react'

const cx = (...s: Array<string | undefined>) => s.filter(Boolean).join(' ')

export interface StyledNavWrapperProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'prev' | 'next'
}

const StyledNavWrapperBase = React.forwardRef<
  HTMLButtonElement,
  StyledNavWrapperProps
>(({ direction, className, type = 'button', ...rest }, ref) => {
  const dirClass = direction === 'prev' ? 'scs-nav--prev' : 'scs-nav--next'
  return (
    <button
      ref={ref}
      type={type}
      className={cx('scs-nav', dirClass, className)}
      {...rest}
    />
  )
})

export const StyledNavWrapper = React.memo(StyledNavWrapperBase)

const StyledArrowBase = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className, ...rest }, ref) => {
  return <svg ref={ref} className={cx('scs-arrow', className)} {...rest} />
})

export const StyledArrow = React.memo(StyledArrowBase)

StyledNavWrapperBase.displayName = 'StyledNavWrapper'
StyledArrowBase.displayName = 'StyledArrow'
