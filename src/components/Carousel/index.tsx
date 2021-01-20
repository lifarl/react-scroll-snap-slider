import React, { Children, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { CarouselProps } from './Carousel.interface'
import Slide from '../Slide/index'
import NavArrow from '../NavArrow/index'
import { getObserver } from '../../utils/intersectionObserver'
import { StyledCarousel, StyledSlider, StyledUl } from './Carousel.styled'

export interface CarouselRef {
  scrollToSlide: Function
}

export const Carousel = forwardRef(({
  renderCustomArrow,
  slidesPerPageSettings,
  slideWidth,
  onScrollStart,
  onScrollEnd,
  onSlidesVisibilityChange,
  onSlideVisible,
  children,
}: CarouselProps, ref: React.Ref<CarouselRef>) => {
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeout = useRef<number | null>(null)
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

  const getSlideWidth = useCallback(() => (sliderRef.current?.firstChild?.firstChild as HTMLUListElement)
  ?.clientWidth || 0, [])

  const intersectionCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const target = entry.target as HTMLUListElement
      const index = Number(target.dataset.indexNumber)

      if (entry.intersectionRatio >= intersectionThreshold) {
        lastVisibleSlideIndex.current = index
        visibleSlidesIndices.current.push(index)
        visibleSlidesIndices.current.sort()

        slideRefs.current[index].setAttribute('aria-hidden', 'false')

        onSlideVisible && onSlideVisible(index)
        
        return
      }

      visibleSlidesIndices.current = visibleSlidesIndices.current.filter(item => item !== index)
      slideRefs.current[index].setAttribute('aria-hidden', 'true')
    })

    medianVisibleSlideIndex.current = visibleSlidesIndices.current[Math.floor(visibleSlidesIndices.current.length / 2)]

    onSlidesVisibilityChange && onSlidesVisibilityChange(medianVisibleSlideIndex.current)
  }, [])

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
    scrollTimeout.current && clearTimeout(scrollTimeout.current)
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

    if (!sliderRef.current || !arrowNextRef.current || !arrowPrevRef.current) return

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
    <StyledCarousel>
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
          />
          <NavArrow
            ref={arrowNextRef}
            direction={'next'}
            onClick={() => manualScroll('next')}
          />
        </React.Fragment>
      )}

      <StyledSlider
        onScroll={onSliderScroll}
        ref={sliderRef}
      >
        <StyledUl>
          {Children.map(children, (child: JSX.Element, index: number) => (
            <Slide
              key={index}
              slideIndex={index}
              slidesPerPageSettings={slidesPerPageSettings}
              slideWidth={slideWidth}
              ref={(node: HTMLLIElement) => addNode(node, index)}
            >
              {child}
            </Slide>
          ))}
        </StyledUl>
      </StyledSlider>
    </StyledCarousel>
  )
})

Carousel.displayName = 'Carousel'
