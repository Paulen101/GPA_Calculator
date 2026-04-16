import {
  formatTruncated,
  getRingStroke,
  getThresholdMessage,
} from '../utils/gpaLogic'

function GPADonutRing({
  gpa,
  classification,
  maxValue = 4,
  valueLabel,
  secondaryLabel,
  helperText,
}) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const safeMaxValue = maxValue > 0 ? maxValue : 4
  const clampedValue = Math.max(0, Math.min(gpa, safeMaxValue))
  const progress = (clampedValue / safeMaxValue) * circumference

  return (
    <div className="donut-card">
      <div className="donut-visual">
        <svg viewBox="0 0 120 120" width="190" height="190" aria-hidden="true">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={getRingStroke(gpa, safeMaxValue)}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{
              transition: 'stroke-dashoffset 0.6s ease, stroke 0.6s ease',
            }}
          />
          <text
            x="60"
            y="56"
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill="#111111"
          >
            {valueLabel ?? formatTruncated(gpa)}
          </text>
          <text
            x="60"
            y="74"
            textAnchor="middle"
            fontSize="9"
            fill="#6B7280"
          >
            {secondaryLabel ?? classification.label}
          </text>
        </svg>
      </div>
      <p className="donut-progress">{helperText ?? getThresholdMessage(gpa)}</p>
    </div>
  )
}

export default GPADonutRing
