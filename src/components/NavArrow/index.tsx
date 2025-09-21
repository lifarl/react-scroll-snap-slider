import * as React from 'react'
import { NavArrowProps } from './NavArrow.interface'
import { StyledArrow, StyledNavWrapper } from './NavArrow.styled'

const NavArrowBase = React.forwardRef(
  (
    {
      direction,
      onClick,
      className,
      iconClassName,
      ariaControls,
      ariaLabel,
      disabled,
    }: NavArrowProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const path = React.useMemo(
      () =>
        direction === 'prev'
          ? 'M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'
          : 'M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z',
      [direction]
    )

    const pathEl = React.useMemo(() => <path d={path} />, [path])

    return (
      <StyledNavWrapper
        direction={direction}
        onClick={onClick}
        ref={ref}
        className={className}
        aria-controls={ariaControls}
        aria-label={ariaLabel || (direction === 'prev' ? 'Previous slide' : 'Next slide')}
        disabled={disabled}
      >
        <StyledArrow viewBox="0 0 8 8" className={iconClassName}>
          {pathEl}
        </StyledArrow>
      </StyledNavWrapper>
    )
  }
)
NavArrowBase.displayName = 'NavArrow'

export default React.memo(NavArrowBase)
