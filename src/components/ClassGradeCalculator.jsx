import FadeContent from './FadeContent'
import AssignmentRow from './AssignmentRow'
import CountUpNumber from './CountUpNumber'
import GPADonutRing from './GPADonutRing'
import Icon from './Icon'
import {
  createAssignment,
  formatPercentage,
  getCurrentWeightedGrade,
  getRequiredFinalExamGrade,
} from '../utils/gradeLogic'

function ClassGradeCalculator({
  assignments,
  setAssignments,
  finalExamInputs,
  setFinalExamInputs,
}) {
  const currentGradeMetrics = getCurrentWeightedGrade(assignments)
  const finalExamResult = getRequiredFinalExamGrade(
    finalExamInputs.currentGrade,
    finalExamInputs.targetGrade,
    finalExamInputs.finalExamWeight,
  )

  const updateAssignment = (id, field, value) => {
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) =>
        assignment.id === id ? { ...assignment, [field]: value } : assignment,
      ),
    )
  }

  const addAssignment = () => {
    setAssignments((currentAssignments) => [...currentAssignments, createAssignment()])
  }

  const removeAssignment = (id) => {
    setAssignments((currentAssignments) =>
      currentAssignments.length === 1
        ? currentAssignments
        : currentAssignments.filter((assignment) => assignment.id !== id),
    )
  }

  const updateFinalExamField = (field, value) => {
    setFinalExamInputs((currentInputs) => ({
      ...currentInputs,
      [field]: value,
    }))
  }

  return (
    <FadeContent className="section-card" id="class-grade-calculator">
      <section className="section-inner calculator-layout">
        <div className="calculator-copy">
          <p className="eyebrow">
            <Icon name="target" />
            Class Grade
          </p>
          <h2 className="section-heading">Track your weighted average and final target.</h2>
          <p className="section-copy">
            Enter completed assignments to see your live class average, then estimate
            what you need on the final exam to land your target course grade.
          </p>
        </div>

        <div className="calculator-grid">
          <div className="course-list-panel">
            <div className="course-list-head">
              <div className="panel-heading-group">
                <p className="stat-label">Assignments</p>
                <p className="panel-copy">
                  Add each graded item with its score and weight to build your current
                  weighted average.
                </p>
              </div>
              <div className="course-actions">
                <button type="button" className="btn btn-secondary" onClick={addAssignment}>
                  <Icon name="plus" />
                  Add Assignment
                </button>
              </div>
            </div>

            <div className="course-list assignment-list" aria-live="polite">
              {assignments.map((assignment) => (
                <AssignmentRow
                  key={assignment.id}
                  assignment={assignment}
                  onChange={updateAssignment}
                  onRemove={removeAssignment}
                  disableRemove={assignments.length === 1}
                />
              ))}
            </div>

            <div className="final-exam-panel">
              <div className="calculator-copy final-exam-copy">
                <p className="stat-label">Final Exam Planner</p>
                <h3 className="final-exam-heading">Plan the finish.</h3>
                <p className="panel-copy">
                  Use your actual course grade before the final, then set your target
                  overall grade and final weight to see what you need.
                </p>
              </div>

              <div className="final-exam-grid">
                <label className="field">
                  <span className="field-label">Current class grade (%)</span>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={finalExamInputs.currentGrade}
                    onChange={(event) =>
                      updateFinalExamField('currentGrade', event.target.value)
                    }
                  />
                </label>
                <label className="field">
                  <span className="field-label">Target class grade (%)</span>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={finalExamInputs.targetGrade}
                    onChange={(event) =>
                      updateFinalExamField('targetGrade', event.target.value)
                    }
                  />
                </label>
                <label className="field">
                  <span className="field-label">Final exam weight (%)</span>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={finalExamInputs.finalExamWeight}
                    onChange={(event) =>
                      updateFinalExamField('finalExamWeight', event.target.value)
                    }
                  />
                </label>
              </div>

              <div className="stat-card final-exam-result" aria-live="polite">
                <p className="stat-label">Required Final Exam Grade</p>
                <p className="stat-value final-exam-value">
                  {finalExamResult.neededGrade === null
                    ? '--'
                    : `${formatPercentage(finalExamResult.neededGrade)}%`}
                </p>
                <p className="gpa-helper">
                  Enter your actual course grade before the final exam. The assignment
                  average on this page is a reference, not always the same value.
                </p>
                <p className="gpa-helper">{finalExamResult.message}</p>
              </div>
            </div>
          </div>

          <aside className="summary-panel">
            <div className="gpa-display summary-hero" aria-live="polite">
              <p className="stat-label">Current Weighted Grade</p>
              <div className="gpa-hero-line">
                <p
                  className="gpa-value gradient-number"
                  aria-label={`Live class grade ${formatPercentage(currentGradeMetrics.percentage)} percent`}
                >
                  <CountUpNumber value={currentGradeMetrics.percentage} suffix="%" />
                </p>
              </div>
              <p className="gpa-helper">
                Built from {assignments.length} assignment{assignments.length === 1 ? '' : 's'} and{' '}
                {formatPercentage(currentGradeMetrics.completedWeight)}% of your entered
                course weight.
              </p>
            </div>

            <GPADonutRing
              gpa={currentGradeMetrics.percentage}
              classification={{ label: 'Class Grade' }}
              maxValue={100}
              valueLabel={`${formatPercentage(currentGradeMetrics.percentage)}%`}
              secondaryLabel={`${formatPercentage(currentGradeMetrics.completedWeight)}% weight`}
              helperText={`Current weighted average across ${assignments.length} assignment${assignments.length === 1 ? '' : 's'}.`}
            />

            <div className="stat-grid stat-grid-stack">
              <div className="stat-card">
                <p className="stat-label">Assignments</p>
                <p className="stat-value">{assignments.length}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Completed Weight</p>
                <p className="stat-value">
                  {formatPercentage(currentGradeMetrics.completedWeight)}%
                </p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Needed on Final</p>
                <p className="stat-value">
                  {finalExamResult.neededGrade === null
                    ? '--'
                    : `${formatPercentage(finalExamResult.neededGrade)}%`}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </FadeContent>
  )
}

export default ClassGradeCalculator
