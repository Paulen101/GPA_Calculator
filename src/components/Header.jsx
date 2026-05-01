import fhsuLogo from '../assets/fhsu-primary-left-logo-black-text.png'
import Icon from './Icon'

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
          <img
            className="wordmark-logo"
            src={fhsuLogo}
            alt="Fort Hays State University"
          />
        </button>

        <nav className="header-nav" aria-label="Primary">
          <button
            type="button"
            className={`header-link ${activeCalculator === 'gpa' ? 'is-active' : ''}`}
            onClick={() => handleCalculatorSelect('gpa')}
            aria-current={activeCalculator === 'gpa' ? 'page' : undefined}
          >
            <Icon name="calculator" />
            GPA Calculator
          </button>
          <button
            type="button"
            className={`header-link ${activeCalculator === 'grade' ? 'is-active' : ''}`}
            onClick={() => handleCalculatorSelect('grade')}
            aria-current={activeCalculator === 'grade' ? 'page' : undefined}
          >
            <Icon name="target" />
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
                <Icon name="graduationCap" />
                Semester
              </button>
              <button
                type="button"
                className={`header-link header-link-secondary ${activeGpaSection === 'cumulative' ? 'is-section-active' : ''}`}
                onClick={() => handleGpaSectionSelect('cumulative-calculator')}
                aria-current={activeGpaSection === 'cumulative' ? 'location' : undefined}
              >
                <Icon name="chart" />
                Cumulative
              </button>
            </>
          ) : null}
          <button type="button" className="btn btn-secondary header-reset" onClick={onReset}>
            <Icon name="refresh" />
            Start Over
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
