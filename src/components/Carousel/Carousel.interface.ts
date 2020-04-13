import { NavArrowProps } from '../NavArrow/NavArrow.interface'

export interface CarouselProps {
  showMultiItem?: boolean
  onSlideVisible?: (index: number) => void
  CustomArrow?: React.ForwardRefExoticComponent<
    NavArrowProps & React.RefAttributes<HTMLDivElement>
  >
  slidesPerPageSettings?: slidesPerPageSettings
}

export interface slidesPerPageSettings {
  mobile: number
  tablet: number
  desktop: number
}
