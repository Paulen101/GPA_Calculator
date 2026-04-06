import FadeContent from './FadeContent'

function Footer() {
  return (
    <FadeContent className="site-footer-wrap">
      <footer className="site-footer" aria-label="Site footer">
        <div className="site-footer-grid">
          <div>
            <p className="eyebrow">Important Disclaimer</p>
            <p className="footer-copy">
              This is an unofficial calculation. Please refer to your Workday account
              or the FHSU Registrar for your official transcript and standing.
            </p>
          </div>

          <div>
            <p className="footer-heading">Institutional Links</p>
            <ul className="footer-links">
              <li>
                <a href="https://www.fhsu.edu/registrar/" target="_blank" rel="noreferrer">
                  FHSU Registrar
                </a>
              </li>
              <li>
                <a
                  href="https://catalog.fhsu.edu/academic-information/"
                  target="_blank"
                  rel="noreferrer"
                >
                  University Catalog Grading Policy
                </a>
              </li>
              <li>
                <a href="https://www.fhsu.edu/directory/advisors" target="_blank" rel="noreferrer">
                  Contact Advisor
                </a>
              </li>
              <li>
                <a href="https://www.fhsu.edu/workday/" target="_blank" rel="noreferrer">
                  Workday
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-meta">
          <p>© 2026 Fort Hays State University</p>
          <a href="https://github.com/Paulen101/GPA_Calculator" target="_blank" rel="noreferrer">
            Project source / developer
          </a>
        </div>
      </footer>
    </FadeContent>
  )
}

export default Footer
