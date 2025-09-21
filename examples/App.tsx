import React, { useMemo, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles.css'
import './demo.css'
import { Slider } from '../src'
import NavArrow from '../src/components/NavArrow'
import { getRndHex } from './getRndHex'
import { renderDivSlide } from './withFixedDivs'
import { renderImgSlide } from './withImages'
import { SliderWithScrollToIndex } from './withScrollIndicator'

const App = () => {
  // Demo data
  const itemNumber = 11
  const items = useMemo(() => {
    const list: Array<{ src: string }> = []
    for (let i = 0; i <= itemNumber; i++) {
      const hex = getRndHex()
      list.push({ src: `https://picsum.photos/seed/${hex}/400/400` })
    }
    return list
  }, [])

  // Controls (Example 1)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [snapType, setSnapType] = useState<'proximity' | 'mandatory'>('mandatory')
  const [snapStop, setSnapStop] = useState<'normal' | 'always'>('normal')
  const [gap, setGap] = useState<'sm' | 'md' | 'lg'>('md')
  const [touch, setTouch] = useState<'panx' | 'auto'>('panx')
  const [overscroll, setOverscroll] = useState<'auto' | 'contain'>('auto')

  // Event log (Example 1)
  const [logs, setLogs] = useState<string[]>([])
  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString()
    setLogs((l) => [`[${time}] ${msg}`, ...l].slice(0, 50))
  }, [])

  const onSlideVisible = useCallback((index: number) => addLog(`slide visible → ${index}`), [addLog])
  const onSlidesVisibilityChange = useCallback((index: number) => addLog(`median visible → ${index}`), [addLog])
  const onScrollStart = useCallback((index: number) => addLog(`scroll start → ${index}`), [addLog])
  const onScrollEnd = useCallback((index: number) => addLog(`scroll end → ${index}`), [addLog])

  const slidesPerPageSettings = useMemo(
    () => ({
      mobileSmall: 1.5,
      mobileBig: 2.5,
      tablet: 3,
      desktop: 4,
    }),
    []
  )

  const renderCustomArrow = useCallback(({ direction, ref, onClick, ariaControls }) => (
    <NavArrow
      ref={ref}
      direction={direction}
      onClick={() => onClick(direction)}
      ariaControls={ariaControls}
    />
  ), [])

  const sliderClass = useMemo(
    () => `snap--${snapType} snapstop--${snapStop} gap--${gap} touch--${touch} overscroll--${overscroll}`,
    [snapType, snapStop, gap, touch, overscroll]
  )

  // Memoize slide children so the Slider doesn't see a new children reference on unrelated state updates (like logs)
  const imageSlides = useMemo(() => items.map((item, index) => renderImgSlide(item, index)), [items])
  const fixedDivSlides = useMemo(() => items.map((item, index) => renderDivSlide(item, index)), [items])

  // Stable classes object to avoid prop identity churn
  const sliderClasses = useMemo(
    () => ({ root: `demo-theme--${theme}`, slider: sliderClass }),
    [theme, sliderClass]
  )

  return (
    <div className="demo-wrap">
      <header className="demo-header">
        <div className="demo-header__inner">
          <h1 className="demo-title">React Scroll Snap Slider</h1>
          <p className="demo-sub">Responsive, accessible slider powered by native CSS Scroll Snap + IntersectionObserver.</p>
        </div>
      </header>

      <main className="demo-main">
        <div className="demo-container">
          <div className="demo-grid">
            {/* Example 1: Images + controls */}
            <section className="demo-card">
              <div className="demo-card__head">
                <div>
                  <h3 className="demo-card__title">Images + Custom Arrows</h3>
                  <p className="demo-card__desc">Responsive slides per breakpoint, custom arrows, and live event logging.</p>
                </div>
              </div>
              <div className="demo-card__body">
                <div className="demo-row" style={{ marginBottom: 12 }}>
                  <span className="demo-label">Theme</span>
                  <select className="demo-select" value={theme} onChange={(e) => setTheme(e.target.value as any)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>

                  <span className="demo-label">Snap</span>
                  <select className="demo-select" value={snapType} onChange={(e) => setSnapType(e.target.value as any)}>
                    <option value="proximity">proximity</option>
                    <option value="mandatory">mandatory</option>
                  </select>

                  <span className="demo-label">Stop</span>
                  <select className="demo-select" value={snapStop} onChange={(e) => setSnapStop(e.target.value as any)}>
                    <option value="normal">normal</option>
                    <option value="always">always</option>
                  </select>

                  <span className="demo-label">Gap</span>
                  <select className="demo-select" value={gap} onChange={(e) => setGap(e.target.value as any)}>
                    <option value="sm">8px</option>
                    <option value="md">16px</option>
                    <option value="lg">24px</option>
                  </select>

                  <span className="demo-label">Overscroll</span>
                  <select className="demo-select" value={overscroll} onChange={(e) => setOverscroll(e.target.value as any)}>
                    <option value="auto">auto</option>
                    <option value="contain">contain</option>
                  </select>

                  <span className="demo-label">Touch</span>
                  <select className="demo-select" value={touch} onChange={(e) => setTouch(e.target.value as any)}>
                    <option value="panx">pan-x</option>
                    <option value="auto">auto</option>
                  </select>
                </div>

                <div style={{ width: '100%'}}>
                  <Slider
                    ariaLabel="Images demo"
                    classes={sliderClasses}
                    onSlideVisible={onSlideVisible}
                    renderCustomArrow={renderCustomArrow}
                    slidesPerPageSettings={slidesPerPageSettings}
                    onScrollStart={onScrollStart}
                    onSlidesVisibilityChange={onSlidesVisibilityChange}
                    onScrollEnd={onScrollEnd}
                  >
                    {imageSlides}
                  </Slider>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div className="demo-row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                    <span className="demo-label">Events</span>
                    <button className="demo-btn demo-btn--ghost" onClick={() => setLogs([])}>Clear</button>
                  </div>
                  <div className="demo-log">
                    {logs.length === 0 ? (
                      <div className="demo-log__line">No events yet. Interact with the slider →</div>
                    ) : (
                      logs.map((l, i) => (
                        <div key={i} className="demo-log__line">{l}</div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Example 2: Fixed width slides */}
            <section className="demo-card">
              <div className="demo-card__head">
                <div>
                  <h3 className="demo-card__title">Fixed Width Slides</h3>
                  <p className="demo-card__desc">Use a fixed pixel width for each slide instead of responsive columns.</p>
                </div>
              </div>
              <div className="demo-card__body">
                <div style={{ width: '100%', height: 350 }}>
                  <Slider ariaLabel="Fixed width demo" slideWidth={200}>
                    {fixedDivSlides}
                  </Slider>
                </div>
              </div>
            </section>

            {/* Example 3: Programmatic scroll + pagination */}
            <section className="demo-card" style={{ gridColumn: '1 / -1' }}>
              <div className="demo-card__head">
                <div>
                  <h3 className="demo-card__title">Programmatic Scroll + Pagination</h3>
                  <p className="demo-card__desc">Scroll to index via ref and show a simple bullet pagination.</p>
                </div>
              </div>
              <div className="demo-card__body">
                <SliderWithScrollToIndex items={items.slice(0, 5)} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

const container = document.getElementById('app')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
