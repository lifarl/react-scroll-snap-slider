export interface NavArrowProps {
  onClick: () => void
  direction: 'next' | 'prev'
  className?: string
  iconClassName?: string
  ariaControls?: string
  ariaLabel?: string
  disabled?: boolean
}
