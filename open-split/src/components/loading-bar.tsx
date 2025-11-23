import { useEffect, useRef } from 'react'
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar'
import { useLoadingBar } from '../hooks/use-loading-bar'

export default function TopLoadingBar() {
  const ref = useRef<LoadingBarRef>(null)
  const { setLoadingBarRef } = useLoadingBar()

  useEffect(() => {
    setLoadingBarRef(ref)
  }, [setLoadingBarRef])

  return (
    <LoadingBar
      ref={ref}
      color="#ed6b5a"
      height={3}
      shadow={true}
      waitingTime={400}
      transitionTime={200}
    />
  )
}

