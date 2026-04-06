function Header({ onReset, onSelectCalculator }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleCalculatorSelect = (calculator) => {
    onSelectCalculator(calculator)
    window.requestAnimationFrame(() => {
      scrollTo('calculator-switcher')
    })
  }

  const handleGpaSectionSelect = (sectionId) => {
    onSelectCalculator('gpa')
    window.requestAnimationFrame(() => {
      scrollTo(sectionId)
    })
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button
          type="button"
          className="header-brand"
          onClick={() => scrollTo('top')}
          aria-label="Scroll to top of page"
        >
          <span className="wordmark-mark">FHSU</span>
          <span className="wordmark-text">Fort Hays State GPA Calculator</span>
        </button>

        <nav className="header-nav" aria-label="Primary">
          <button
            type="button"
            className="header-link"
            onClick={() => handleCalculatorSelect('gpa')}
          >
            GPA Calculator
          </button>
          <button
            type="button"
            className="header-link"
            onClick={() => handleCalculatorSelect('grade')}
          >
            Grade Calculator
          </button>
          <button
            type="button"
            className="header-link"
            onClick={() => handleGpaSectionSelect('semester-calculator')}
          >
            Semester
          </button>
          <button
            type="button"
            className="header-link"
            onClick={() => handleGpaSectionSelect('cumulative-calculator')}
          >
            Cumulative
          </button>
          <button type="button" className="btn btn-secondary header-reset" onClick={onReset}>
            Start Over
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
