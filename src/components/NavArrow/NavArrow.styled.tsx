import React from 'react'

const cx = (...s: Array<string | undefined>) => s.filter(Boolean).join(' ')

export interface StyledNavWrapperProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'prev' | 'next'
}

export const StyledNavWrapper = React.forwardRef<
  HTMLButtonElement,
  StyledNavWrapperProps
>(({ direction, className, type = 'button', ...rest }, ref) => {
  const dirClass = direction === 'prev' ? 'scs-nav--prev' : 'scs-nav--next'
  console.log(rest)
  return (
    <button
      ref={ref}
      type={type}
      className={cx('scs-nav', dirClass, className)}
      {...rest}
    />
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
