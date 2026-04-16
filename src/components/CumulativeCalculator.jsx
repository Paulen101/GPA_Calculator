import FadeContent from './FadeContent'
import GPADisplay from './GPADisplay'
import GPADonutRing from './GPADonutRing'
import { getCumulativeGpa } from '../utils/gpaLogic'

function CumulativeCalculator({
  semesterMetrics,
  previousGpa,
  setPreviousGpa,
  previousCredits,
  setPreviousCredits,
}) {
  const cumulativeMetrics = getCumulativeGpa(
    previousGpa,
    previousCredits,
    semesterMetrics,
  )

  return (
    <FadeContent className="section-card" id="cumulative-calculator">
      <section className="section-inner cumulative-layout">
        <div className="calculator-copy">
          <p className="eyebrow">Cumulative GPA</p>
          <h2 className="section-heading">Project your full FHSU standing.</h2>
          <p className="section-copy">
            Previous quality points are derived from your prior cumulative GPA and
            GPA-counted credit hours, then combined with the GPA-counted courses from
            the current semester.
          </p>
        </div>

        <div className="cumulative-grid">
          <div className="cumulative-panel">
            <label className="field">
              <span className="field-label">Previous cumulative GPA</span>
              <input
                className="input"
                type="number"
                min="0"
                max="4"
                step="0.01"
                value={previousGpa}
                onChange={(event) => setPreviousGpa(event.target.value)}
              />
            </label>
            <label className="field">
              <span className="field-label">Previous GPA credit hours</span>
              <input
                className="input"
                type="number"
                min="0"
                step="1"
                value={previousCredits}
                onChange={(event) => setPreviousCredits(event.target.value)}
              />
            </label>

            <GPADisplay
              label="Projected Cumulative GPA"
              gpa={cumulativeMetrics.gpa}
              classification={cumulativeMetrics.classification}
              helperText={`${cumulativeMetrics.totalCredits} total GPA-counted credit hours after this term.`}
            />
          </div>

          <GPADonutRing
            gpa={cumulativeMetrics.gpa}
            classification={cumulativeMetrics.classification}
          />
        </div>
      </section>
    </FadeContent>
  )
}

export default CumulativeCalculator
