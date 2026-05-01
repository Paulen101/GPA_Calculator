import FadeContent from './FadeContent'
import CourseRow from './CourseRow'
import GPADisplay from './GPADisplay'
import GPADonutRing from './GPADonutRing'
import Icon from './Icon'
import { createCourse, formatTruncated } from '../utils/gpaLogic'

function SemesterCalculator({
  courses,
  setCourses,
  semesterMetrics,
  baseSemesterMetrics,
  whatIfMode,
  setWhatIfMode,
}) {
  const updateCourse = (id, field, value) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === id
          ? {
              ...course,
              [field]: field === 'credits' ? value : value,
            }
          : course,
      ),
    )
  }

  const addCourse = () => {
    setCourses((currentCourses) => [...currentCourses, createCourse()])
  }

  const removeCourse = (id) => {
    setCourses((currentCourses) =>
      currentCourses.length === 1
        ? currentCourses
        : currentCourses.filter((course) => course.id !== id),
    )
  }

  const clearScenarioGrades = () => {
    setCourses((currentCourses) =>
      currentCourses.map((course) => ({
        ...course,
        whatIfGrade: '',
      })),
    )
  }

  return (
    <FadeContent className="section-card" id="semester-calculator">
      <section className="section-inner calculator-layout">
        <div className="calculator-copy">
          <p className="eyebrow">
            <Icon name="graduationCap" />
            Semester GPA
          </p>
          <h2 className="section-heading">Build this term, course by course.</h2>
          <p className="section-copy">
            Add your classes, mark any older repeated attempts with <strong>RP</strong>,
            and the calculator excludes non-counted grades automatically.
          </p>
        </div>

        <div className="calculator-grid">
          <div className="course-list-panel">
            <div className="course-list-head">
              <p className="stat-label">Course List</p>
              <div className="course-actions">
                <button
                  type="button"
                  className={`btn ${whatIfMode ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setWhatIfMode((currentMode) => !currentMode)}
                  aria-pressed={whatIfMode}
                >
                  <Icon name={whatIfMode ? 'refresh' : 'target'} />
                  {whatIfMode ? 'Exit What-If Mode' : 'Enter What-If Mode'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={addCourse}>
                  <Icon name="plus" />
                  Add Course
                </button>
              </div>
            </div>

            {whatIfMode ? (
              <div className="what-if-banner" role="status" aria-live="polite">
                <p className="what-if-title">Scenario mode is active.</p>
                <p className="what-if-copy">
                  Change the temporary grade column to simulate outcomes without
                  overwriting your current grades. Highlighted rows are projected changes.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary what-if-clear"
                  onClick={clearScenarioGrades}
                >
                  <Icon name="refresh" />
                  Clear scenario grades
                </button>
              </div>
            ) : null}

            <div className="course-list" aria-live="polite">
              {courses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  onChange={updateCourse}
                  onRemove={removeCourse}
                  disableRemove={courses.length === 1}
                  whatIfMode={whatIfMode}
                />
              ))}
            </div>
          </div>

          <aside className="summary-panel">
            <GPADisplay
              label="Live Semester GPA"
              gpa={semesterMetrics.gpa}
              classification={semesterMetrics.classification}
              helperText={
                whatIfMode
                  ? `${semesterMetrics.creditHours} counted credit hours across ${semesterMetrics.countedCourses.length} GPA courses. Baseline GPA: ${formatTruncated(baseSemesterMetrics.gpa)}.`
                  : `${semesterMetrics.creditHours} counted credit hours across ${semesterMetrics.countedCourses.length} GPA courses.`
              }
            />

            <GPADonutRing
              gpa={semesterMetrics.gpa}
              classification={semesterMetrics.classification}
            />

            <div className="stat-grid">
              <div className="stat-card">
                <p className="stat-label">Quality Points</p>
                <p className="stat-value">{formatTruncated(semesterMetrics.qualityPoints)}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Counted Credits</p>
                <p className="stat-value">{semesterMetrics.creditHours}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Excluded Rows</p>
                <p className="stat-value">
                  {courses.length - semesterMetrics.countedCourses.length}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </FadeContent>
  )
}

export default SemesterCalculator
