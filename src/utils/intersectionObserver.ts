export const getObserver = (
  root: HTMLDivElement | null = null,
  ref: React.MutableRefObject<IntersectionObserver | null>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  threshold: number
) => {
  const observer = ref.current
  if (observer !== null) {
    return observer
  }
  const newObserver = new IntersectionObserver(callback, {
    root,
    rootMargin: '0px',
    threshold: threshold,
  })
  ref.current = newObserver
  return newObserver
}
