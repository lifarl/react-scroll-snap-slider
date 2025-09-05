import React, {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { CarouselProps } from './Carousel.interface'
import Slide from '../Slide/index'
import NavArrow from '../NavArrow/index'
import { getObserver } from '../../utils/intersectionObserver'
import { StyledCarousel, StyledSlider, StyledUl } from './Carousel.styled'

export interface CarouselRef {
  scrollToSlide: Function
  sliderRef: React.Ref<HTMLDivElement>
}

export const Carousel = forwardRef(
  (
    {
      renderCustomArrow,
      slidesPerPageSettings,
      slideWidth,
      onScrollStart,
      onScrollEnd,
      onSlidesVisibilityChange,
      onSlideVisible,
      className,
      classes,
      children,
    }: CarouselProps,
    ref: React.Ref<CarouselRef>
  ) => {
    const [isScrolling, setIsScrolling] = useState(false)
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const slideRefs = useRef<HTMLLIElement[]>([])
    const arrowPrevRef = useRef<HTMLDivElement>(null)
    const arrowNextRef = useRef<HTMLDivElement>(null)
    const observer = useRef<IntersectionObserver>(null)
    const lastVisibleSlideIndex = useRef(0)
    const medianVisibleSlideIndex = useRef(0)
    const visibleSlidesIndices = useRef<number[]>([])
    const intersectionThreshold = 0.5
    const hideArrowThreshold = 30

    const addNode = useCallback((node: HTMLLIElement, index: number) => {
      slideRefs.current[index] = node
    }, [])

    const getSlideWidth = useCallback(
      () =>
        (sliderRef.current?.firstChild?.firstChild as HTMLUListElement)
          ?.clientWidth || 0,
      []
    )

    const intersectionCallback = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const focusableSelector =
          'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),iframe,object,embed,[contenteditable="true"],[tabindex]'

        const disableFocusWithin = (el: HTMLElement) => {
          el.setAttribute('inert', '')
          const focusables = el.querySelectorAll<HTMLElement>(focusableSelector)
          focusables.forEach((node) => {
            if (!node.hasAttribute('data-scs-managed')) {
              const hadTabIndex = node.hasAttribute('tabindex')
              if (hadTabIndex) {
                node.setAttribute(
                  'data-scs-prev-tabindex',
                  String(node.getAttribute('tabindex'))
                )
              } else {
                node.setAttribute('data-scs-prev-tabindex', 'none')
              }
              node.setAttribute('tabindex', '-1')
              node.setAttribute('data-scs-managed', '1')
            }
          })
        }

        const enableFocusWithin = (el: HTMLElement) => {
          el.removeAttribute('inert')
          const managed = el.querySelectorAll<HTMLElement>('[data-scs-managed]')
          managed.forEach((node) => {
            const prev = node.getAttribute('data-scs-prev-tabindex')
            if (prev === 'none') {
              node.removeAttribute('tabindex')
            } else if (prev !== null) {
              node.setAttribute('tabindex', prev)
            }
            node.removeAttribute('data-scs-prev-tabindex')
            node.removeAttribute('data-scs-managed')
          })
        }

        entries.forEach((entry: IntersectionObserverEntry) => {
          const target = entry.target as HTMLLIElement
          const index = Number((target as any).dataset.indexNumber)

          if (entry.intersectionRatio >= intersectionThreshold) {
            lastVisibleSlideIndex.current = index
            visibleSlidesIndices.current.push(index)
            visibleSlidesIndices.current.sort()

            slideRefs.current[index]?.setAttribute('aria-hidden', 'false')
            if (slideRefs.current[index]) enableFocusWithin(slideRefs.current[index])

            onSlideVisible && onSlideVisible(index)

            return
          }

          visibleSlidesIndices.current = visibleSlidesIndices.current.filter(
            (item) => item !== index
          )
          slideRefs.current[index]?.setAttribute('aria-hidden', 'true')
          if (slideRefs.current[index]) disableFocusWithin(slideRefs.current[index])
        })

        medianVisibleSlideIndex.current =
          visibleSlidesIndices.current[
            Math.floor(visibleSlidesIndices.current.length / 2)
          ]

        onSlidesVisibilityChange &&
          onSlidesVisibilityChange(medianVisibleSlideIndex.current)
      },
      []
    )

    const isSliderScrollable = useCallback(() => {
      if (!sliderRef.current) return false

      const sliderWidth = sliderRef.current.clientWidth
      const slideWidth = getSlideWidth() - 1 // - 1 is to make sure that fractional widths don't count

      return slideRefs.current.length * slideWidth > sliderWidth
    }, [])

    const manualScroll = (direction: 'prev' | 'next') => {
      const dir = direction === 'prev' ? -1 : 1
      if (sliderRef.current) {
        const slideWidth = getSlideWidth()
        const slidesToScroll = Math.floor(
          sliderRef.current.clientWidth / slideWidth
        )
        sliderRef.current.scrollBy({
          top: 0,
          behavior: 'smooth',
          left: slidesToScroll * slideWidth * dir,
        })
      }
    }

    const onSliderScroll = () => {
      if (scrollTimeout.current !== null) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null
        setIsScrolling(false)
        onScrollEnd && onScrollEnd(medianVisibleSlideIndex.current)
      }, 250)

      if (!isScrolling) {
        setIsScrolling(true)
      }
    }

    const scrollTo = useCallback((left: number) => {
      if (!sliderRef.current) return

      sliderRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
        left,
      })
    }, [])

    const scrollToSlide = useCallback((index: number) => {
      if (!sliderRef.current) return

      const sliderScrollLeft = sliderRef.current.scrollLeft
      const sliderWidth = sliderRef.current.clientWidth
      const slideWidth = getSlideWidth()
      const slideLeft = slideWidth * index

      // only scroll to the left if target slide is outside of view to the left
      if (slideLeft < sliderScrollLeft) {
        scrollTo(slideLeft)
        return
      }

      // only scroll to the right if target slide is outside of view to the right
      if (slideLeft + slideWidth > sliderScrollLeft + sliderWidth) {
        scrollTo(slideLeft + slideWidth - sliderWidth)
      }
    }, [])

    useImperativeHandle(ref, () => ({
      scrollToSlide,
      sliderRef,
    }))

    useEffect(() => {
      if (observer.current) observer.current.disconnect()
      const newObserver = getObserver(
        sliderRef.current,
        observer,
        intersectionCallback,
        intersectionThreshold
      )
      for (const node of slideRefs.current) {
        if (node) {
          newObserver.observe(node)
        }
      }
      return () => newObserver.disconnect()
    }, [React.Children.count(children)])

    useEffect(() => {
      if (!isScrolling) return

      onScrollStart && onScrollStart(medianVisibleSlideIndex.current)
    }, [isScrolling])

    useEffect(() => {
      if (!isSliderScrollable()) return

      if (!sliderRef.current || !arrowNextRef.current || !arrowPrevRef.current)
        return

      if (isScrolling) {
        arrowNextRef.current.style.display = 'none'
        arrowPrevRef.current.style.display = 'none'

        return
      }

      if (sliderRef.current.scrollLeft <= hideArrowThreshold) {
        arrowNextRef.current.style.display = 'block'
        arrowPrevRef.current.style.display = 'none'
      } else if (
        sliderRef.current.clientWidth + sliderRef.current.scrollLeft >=
        sliderRef.current.scrollWidth - hideArrowThreshold
      ) {
        arrowPrevRef.current.style.display = 'block'
        arrowNextRef.current.style.display = 'none'
      } else {
        arrowNextRef.current.style.display = 'block'
        arrowPrevRef.current.style.display = 'block'
      }
    }, [React.Children.count(children), isScrolling])

    return (
      <StyledCarousel className={classes?.root ?? className}>
        {renderCustomArrow ? (
          <React.Fragment>
            {renderCustomArrow({
              direction: 'prev',
              ref: arrowPrevRef,
              onClick: manualScroll,
            })}
            {renderCustomArrow({
              direction: 'next',
              ref: arrowNextRef,
              onClick: manualScroll,
            })}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavArrow
              ref={arrowPrevRef}
              direction={'prev'}
              onClick={() => manualScroll('prev')}
              className={classes?.navPrev ?? classes?.nav}
              iconClassName={classes?.arrow}
            />
            <NavArrow
              ref={arrowNextRef}
              direction={'next'}
              onClick={() => manualScroll('next')}
              className={classes?.navNext ?? classes?.nav}
              iconClassName={classes?.arrow}
            />
          </React.Fragment>
        )}

        <StyledSlider
          onScroll={onSliderScroll}
          ref={sliderRef}
          tabIndex={0}
          className={classes?.slider}
        >
          <StyledUl className={classes?.list}>
            {Children.map(children, (child: JSX.Element, index: number) => (
              <Slide
                key={index}
                slideIndex={index}
                slidesPerPageSettings={slidesPerPageSettings}
                slideWidth={slideWidth}
                ref={(node: HTMLLIElement) => addNode(node, index)}
                className={classes?.slide}
              >
                {child}
              </Slide>
            ))}
          </StyledUl>
        </StyledSlider>
      </StyledCarousel>
    )
  }
)

Carousel.displayName = 'Carousel'
