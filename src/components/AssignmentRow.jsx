function AssignmentRow({ assignment, onChange, onRemove, disableRemove }) {
  const updateField = (field, value) => {
    onChange(assignment.id, field, value)
  }

  return (
    <article className="course-row">
      <div className="course-row-grid assignment-row-grid">
        <label className="field">
          <span className="field-label">Assignment</span>
          <input
            className="input"
            type="text"
            placeholder="Quiz 1"
            value={assignment.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">Grade (%)</span>
          <input
            className="input"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={assignment.grade}
            onChange={(event) => updateField('grade', event.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">Weight (%)</span>
          <input
            className="input"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={assignment.weight}
            onChange={(event) => updateField('weight', event.target.value)}
          />
        </label>
        <button
          type="button"
          className="icon-button assignment-remove"
          onClick={() => onRemove(assignment.id)}
          disabled={disableRemove}
          aria-label={`Remove ${assignment.name || 'assignment'}`}
        >
          ×
        </button>
      </div>
    </article>
  )
}

export default AssignmentRow
