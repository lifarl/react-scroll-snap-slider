class IntersectionObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

globalThis.IntersectionObserver =
  IntersectionObserverMock as unknown as typeof IntersectionObserver
