import fhsuLogo from '../assets/fhsu-primary-left-logo-black-text.png'
import Icon from './Icon'

function Hero() {
  const scrollToCalculator = () => {
    document.getElementById('calculator-switcher')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <header className="hero-shell">
      <section className="hero-content">
        <div className="hero-body">
          <div className="hero-kicker">
            <img
              className="hero-logo"
              src={fhsuLogo}
              alt="Fort Hays State University"
            />
            <span className="eyebrow">
              <Icon name="graduationCap" />
              GPA Toolkit
            </span>
          </div>
          <h1 className="hero-title">
            Plan your semester with the same calculator you use below.
          </h1>
          <p className="hero-copy">
            Calculate semester GPA, project cumulative standing, and estimate class
            grade targets without leaving the page.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={scrollToCalculator}>
              <Icon name="arrowDown" />
              Start Calculating
            </button>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Calculator overview">
          <div className="hero-panel-head">
            <Icon name="calculator" size={22} />
            <div>
              <p className="stat-label">Current Tools</p>
              <p className="hero-panel-title">GPA and Grade Planning</p>
            </div>
          </div>
          <div className="hero-tool-list">
            <div className="hero-tool-item">
              <Icon name="graduationCap" />
              <span>Semester GPA</span>
            </div>
            <div className="hero-tool-item">
              <Icon name="chart" />
              <span>Cumulative GPA</span>
            </div>
            <div className="hero-tool-item">
              <Icon name="target" />
              <span>Final Grade Target</span>
            </div>
          </div>
        </aside>
      </section>
    </header>
  )
}

export default Hero
