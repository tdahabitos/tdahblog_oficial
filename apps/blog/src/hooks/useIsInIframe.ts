import { useEffect, useState } from 'react'

function useIsInIframe() {
  const [isInIframe, setIsInIframe] = useState(false)

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top)
    } catch (e) {
      setIsInIframe(true)
    }
  }, [])

  return isInIframe
}

export default useIsInIframe
