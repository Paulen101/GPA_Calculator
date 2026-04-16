function Header({ activeCalculator, activeGpaSection, onReset, onSelectCalculator }) {
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
            className={`header-link ${activeCalculator === 'gpa' ? 'is-active' : ''}`}
            onClick={() => handleCalculatorSelect('gpa')}
            aria-current={activeCalculator === 'gpa' ? 'page' : undefined}
          >
            GPA Calculator
          </button>
          <button
            type="button"
            className={`header-link ${activeCalculator === 'grade' ? 'is-active' : ''}`}
            onClick={() => handleCalculatorSelect('grade')}
            aria-current={activeCalculator === 'grade' ? 'page' : undefined}
          >
            Grade Calculator
          </button>
          {activeCalculator === 'gpa' ? (
            <>
              <button
                type="button"
                className={`header-link header-link-secondary ${activeGpaSection === 'semester' ? 'is-section-active' : ''}`}
                onClick={() => handleGpaSectionSelect('semester-calculator')}
                aria-current={activeGpaSection === 'semester' ? 'location' : undefined}
              >
                Semester
              </button>
              <button
                type="button"
                className={`header-link header-link-secondary ${activeGpaSection === 'cumulative' ? 'is-section-active' : ''}`}
                onClick={() => handleGpaSectionSelect('cumulative-calculator')}
                aria-current={activeGpaSection === 'cumulative' ? 'location' : undefined}
              >
                Cumulative
              </button>
            </>
          ) : null}
          <button type="button" className="btn btn-secondary header-reset" onClick={onReset}>
            Start Over
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
