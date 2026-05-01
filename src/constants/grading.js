export const GRADE_POINTS = {
  'A+': 4,
  A: 4,
  'A-': 3.7,
  'B+': 3.3,
  B: 3,
  'B-': 2.7,
  'C+': 2.3,
  C: 2,
  'C-': 1.7,
  'D+': 1.3,
  D: 1,
  'D-': 0.7,
  F: 0,
  P: null,
  NC: null,
  W: null,
  WF: null,
}

export const GRADE_OPTIONS = Object.keys(GRADE_POINTS)

export const GPA_CLASSIFICATIONS = [
  { min: 3.9, max: 4, label: 'Summa Cum Laude', tone: 'excellent' },
  { min: 3.8, max: 3.89, label: 'Magna Cum Laude', tone: 'excellent' },
  { min: 3.6, max: 3.79, label: 'Cum Laude', tone: 'strong' },
  { min: 3.5, max: 3.59, label: "Dean's List", tone: 'strong' },
  { min: 2, max: 3.49, label: 'Good Standing', tone: 'good' },
  { min: 0, max: 1.99, label: 'Academic Probation', tone: 'warning' },
]

export const CLASSIFICATION_THRESHOLDS = [
  { min: 2, label: 'Good Standing' },
  { min: 3.5, label: "Dean's List" },
  { min: 3.6, label: 'Cum Laude' },
  { min: 3.8, label: 'Magna Cum Laude' },
  { min: 3.9, label: 'Summa Cum Laude' },
]
