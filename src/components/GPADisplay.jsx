import CountUpNumber from './CountUpNumber'

function GPADisplay({ label, gpa, classification, helperText }) {
  return (
    <div className="gpa-display" aria-live="polite">
      <p className="stat-label">{label}</p>
      <div className="gpa-hero-line">
        <p className="gpa-value gradient-number" aria-label={`${label} ${gpa.toFixed(2)}`}>
          <CountUpNumber value={gpa} />
        </p>
        <span
          className={`badge ${classification.tone}`}
          aria-label={`Academic standing: ${classification.label}`}
        >
          {classification.label}
        </span>
      </div>
      <p className="gpa-helper">{helperText}</p>
    </div>
  )
}

export default GPADisplay
