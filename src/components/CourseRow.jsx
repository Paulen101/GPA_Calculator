import { GRADE_OPTIONS } from '../constants/grading'

function CourseRow({ course, onChange, onRemove, disableRemove, whatIfMode }) {
  const updateField = (field, value) => {
    onChange(course.id, field, value)
  }

  const isScenarioChanged = whatIfMode && course.whatIfGrade && course.whatIfGrade !== course.grade

  return (
    <article
      className={`course-row ${course.isRepeat ? 'is-repeat' : ''} ${isScenarioChanged ? 'is-scenario-changed' : ''}`}
    >
      <div
        className={`course-row-grid ${whatIfMode ? 'course-row-grid-what-if' : 'course-row-grid-standard'}`}
      >
        <label className="field">
          <span className="field-label">Course</span>
          <input
            className="input"
            type="text"
            placeholder="BIO 100"
            value={course.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">Grade</span>
          <select
            className="select"
            value={course.grade}
            onChange={(event) => updateField('grade', event.target.value)}
          >
            {GRADE_OPTIONS.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </label>
        {whatIfMode ? (
          <label className="field">
            <span className="field-label">What-If Grade</span>
            <select
              className="select"
              value={course.whatIfGrade}
              onChange={(event) => updateField('whatIfGrade', event.target.value)}
            >
              <option value="">Keep current</option>
              {GRADE_OPTIONS.map((grade) => (
                <option key={`what-if-${grade}`} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="field">
          <span className="field-label">Credits</span>
          <input
            className="input"
            type="number"
            min="1"
            max="5"
            step="1"
            value={course.credits}
            onChange={(event) => updateField('credits', event.target.value)}
          />
        </label>
        <label className="repeat-toggle" aria-label="Repeated course indicator">
          <input
            type="checkbox"
            checked={course.isRepeat}
            onChange={(event) => updateField('isRepeat', event.target.checked)}
          />
          <span className="repeat-pill">RP</span>
          <span className="repeat-copy">Exclude old grade</span>
        </label>
        <button
          type="button"
          className="icon-button"
          onClick={() => onRemove(course.id)}
          disabled={disableRemove}
          aria-label={`Remove ${course.name || 'course'}`}
        >
          ×
        </button>
      </div>
    </article>
  )
}

export default CourseRow
