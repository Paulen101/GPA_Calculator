import { useEffect, useRef, useState } from 'react'

function FadeContent({ children, className = '', ...props }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      {...props}
      className={`fade-section ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

export default FadeContent
