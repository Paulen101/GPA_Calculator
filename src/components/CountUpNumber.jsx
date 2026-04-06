import { useEffect, useRef, useState } from 'react'
import { formatTruncated, truncateToTwoDecimals } from '../utils/gpaLogic'

function CountUpNumber({ value, duration = 550, suffix = '' }) {
  const frameRef = useRef(0)
  const startValueRef = useRef(0)
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    cancelAnimationFrame(frameRef.current)

    const startingValue = startValueRef.current
    const targetValue = truncateToTwoDecimals(value)
    const startTime = performance.now()

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      const nextValue =
        startingValue + (targetValue - startingValue) * easedProgress

      setDisplayValue(nextValue)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update)
        return
      }

      startValueRef.current = targetValue
      setDisplayValue(targetValue)
    }

    frameRef.current = requestAnimationFrame(update)

    return () => cancelAnimationFrame(frameRef.current)
  }, [duration, value])

  return (
    <>
      {formatTruncated(displayValue)}
      {suffix}
    </>
  )
}

export default CountUpNumber
