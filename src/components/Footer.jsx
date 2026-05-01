import FadeContent from './FadeContent'
import Icon from './Icon'

function Footer() {
  return (
    <FadeContent className="site-footer-wrap">
      <footer className="site-footer" aria-label="Site footer">
        <div className="site-footer-grid">
          <div>
            <p className="eyebrow">
              <Icon name="fileText" />
              Important Disclaimer
            </p>
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
                  <Icon name="externalLink" />
                  FHSU Registrar
                </a>
              </li>
              <li>
                <a
                  href="https://catalog.fhsu.edu/academic-information/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="externalLink" />
                  University Catalog Grading Policy
                </a>
              </li>
              <li>
                <a href="https://www.fhsu.edu/directory/advisors" target="_blank" rel="noreferrer">
                  <Icon name="externalLink" />
                  Contact Advisor
                </a>
              </li>
              <li>
                <a href="https://www.fhsu.edu/workday/" target="_blank" rel="noreferrer">
                  <Icon name="externalLink" />
                  Workday
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-meta">
          <p>© 2026 </p>
          <a href="https://github.com/Paulen101/GPA_Calculator" target="_blank" rel="noreferrer">
            <Icon name="github" />
            Project source / developer
          </a>
        </div>
      </footer>
    </FadeContent>
  )
}

export default Footer
