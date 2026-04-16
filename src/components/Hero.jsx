function Hero() {
  const headlineWords = ['Fort Hays State', 'GPA', 'Calculator']

  const scrollToCalculator = () => {
    document.getElementById('calculator-switcher')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <header className="hero-shell">
      <div className="hero-aurora" aria-hidden="true">
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
        <span className="hero-orb hero-orb-three" />
      </div>
      <section className="hero-content">
        <div className="hero-topline">
          <div className="hero-wordmark" aria-label="Fort Hays State University">
            <span className="wordmark-mark">FHSU</span>
            <span className="wordmark-text">Fort Hays State GPA Calculator</span>
          </div>
        </div>
        <div className="hero-body">
          <p className="eyebrow">GPA Calculator</p>
          <h1 className="hero-title" aria-label="Calculate your FHSU GPA instantly">
            {headlineWords.map((word, index) => (
              <span
                key={word}
                className="split-word"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="hero-copy">Calculate your FHSU GPA instantly.</p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={scrollToCalculator}>
              Start Calculating
            </button>
            <p className="hero-subcopy">
              Semester GPA, cumulative GPA, and class grade planning in one place.
            </p>
          </div>
        </div>
      </section>
    </header>
  )
}

export default Hero
