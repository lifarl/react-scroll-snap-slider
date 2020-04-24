import React, { useRef, useEffect, Children, useState } from 'react'
import { CarouselProps } from './Carousel.interface'
import Slide from '../Slide'
import NavArrow from '../NavArrow'
import { getObserver } from '../../utils/intersectionObserver'
import { StyledCarousel, StyledSlider, StyledUl } from './Carousel.styled'

const Carousel: React.FC<CarouselProps> = ({
  onSlideVisible,
  slidesPerPageSettings,
  renderCustomArrow,
  onScroll,
  afterScroll,
  children,
}) => {
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeout = useRef<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<HTMLLIElement[]>([])
  const arrowPrevRef = useRef<HTMLDivElement>(null)
  const arrowNextRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver>(null)
  const intersectionThreshold = 0.66
  const hideArrowThreshold = 30
  const addNode = (node: HTMLLIElement) => slideRefs.current.push(node)
  useEffect(() => {
    if (onSlideVisible) {
      const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.intersectionRatio >= intersectionThreshold) {
            const target = entry.target as HTMLDivElement
            onSlideVisible && onSlideVisible(Number(target.dataset.indexNumber))
          }
        })
      }

      if (observer.current) observer.current.disconnect()
      const newObserver = getObserver(
        observer,
        intersectionCallback,
        intersectionThreshold
      )
      for (const node of slideRefs.current) {
        newObserver.observe(node)
      }
      return () => newObserver.disconnect()
    }
  }, [slideRefs, arrowNextRef, arrowPrevRef, observer, onSlideVisible])

  useEffect(() => {
    if (sliderRef.current && arrowNextRef.current && arrowPrevRef.current) {
      if (isScrolling) {
        if (onScroll) {
          onScroll()
        }
        arrowNextRef.current.style.display = 'none'
        arrowPrevRef.current.style.display = 'none'
      } else {
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
      }
    }
  }, [isScrolling])

  const onSliderScroll = () => {
    scrollTimeout.current && clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null
      setIsScrolling(false)
      if (afterScroll) {
        afterScroll()
      }
    }, 250)
    if (!isScrolling) {
      setIsScrolling(true)
    }
  }

  const manualScroll = (direction: 'prev' | 'next') => {
    const dir = direction === 'prev' ? -1 : 1
    if (sliderRef.current) {
      const slideWidth = (sliderRef.current.firstChild as HTMLDivElement)
        .clientWidth
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
        id={'scrollSnapDiv'}
      >
        <StyledUl>
          {Children.map(children, (child: JSX.Element, index: number) => (
            <Slide
              key={index}
              slideIndex={index}
              slidesPerPageSettings={slidesPerPageSettings}
              ref={addNode}
            >
              {child}
            </Slide>
          ))}
        </StyledUl>
      </StyledSlider>
    </StyledCarousel>
  )
}

export default Carousel
