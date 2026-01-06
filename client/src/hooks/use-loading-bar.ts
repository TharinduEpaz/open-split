import { create } from 'zustand'
import type { LoadingBarRef } from 'react-top-loading-bar'

interface LoadingBarState {
  loadingBarRef: React.RefObject<LoadingBarRef | null> | null
  setLoadingBarRef: (ref: React.RefObject<LoadingBarRef | null>) => void
  start: () => void
  complete: () => void
  reset: () => void
  setProgress: (progress: number) => void
}

export const useLoadingBar = create<LoadingBarState>((set, get) => ({
  loadingBarRef: null,
  setLoadingBarRef: (ref) => set({ loadingBarRef: ref }),
  start: () => {
    const ref = get().loadingBarRef
    if (ref?.current) {
      ref.current.continuousStart()
    }
  },
  complete: () => {
    const ref = get().loadingBarRef
    if (ref?.current) {
      ref.current.complete()
    }
  },
  reset: () => {
    const ref = get().loadingBarRef
    if (ref?.current) {
      ref.current.complete()
    }
  },
  setProgress: (progress: number) => {
    const ref = get().loadingBarRef
    if (ref?.current) {
      ref.current.continuousStart(0, progress)
    }
  },
}))

