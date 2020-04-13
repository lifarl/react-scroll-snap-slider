export const getObserver = (
  ref: React.MutableRefObject<IntersectionObserver | null>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  threshold: number
) => {
  const observer = ref.current
  if (observer !== null) {
    return observer
  }
  const newObserver = new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px',
    threshold: threshold,
  })
  ref.current = newObserver
  return newObserver
}
