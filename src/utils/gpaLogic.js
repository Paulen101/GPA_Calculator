import {
  CLASSIFICATION_THRESHOLDS,
  GPA_CLASSIFICATIONS,
  GRADE_POINTS,
} from '../constants/grading'

export function truncateToTwoDecimals(value) {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.floor(value * 100) / 100
}

export function formatTruncated(value) {
  return truncateToTwoDecimals(value).toFixed(2)
}

export function createCourse(overrides = {}) {
  return {
    id:
      overrides.id ??
      `course-${Math.random().toString(36).slice(2, 11)}-${Date.now().toString(36)}`,
    name: overrides.name ?? '',
    grade: overrides.grade ?? 'A',
    whatIfGrade: overrides.whatIfGrade ?? '',
    credits: overrides.credits ?? 3,
    isRepeat: overrides.isRepeat ?? false,
  }
}

export function getGradePoints(grade) {
  return GRADE_POINTS[grade] ?? null
}

export function isCountedGrade(grade) {
  return getGradePoints(grade) !== null
}

export function normalizeCredits(credits) {
  const value = Number(credits)

  if (!Number.isFinite(value) || value <= 0) {
    return 0
  }

  return value
}

export function getCountedCourses(courses) {
  return courses.filter((course) => {
    if (course.isRepeat) {
      return false
    }

    return isCountedGrade(course.grade) && normalizeCredits(course.credits) > 0
  })
}

export function getSemesterMetrics(courses) {
  const countedCourses = getCountedCourses(courses)

  const totals = countedCourses.reduce(
    (accumulator, course) => {
      const credits = normalizeCredits(course.credits)
      const points = getGradePoints(course.grade)
      const qualityPoints = points * credits

      return {
        qualityPoints: accumulator.qualityPoints + qualityPoints,
        creditHours: accumulator.creditHours + credits,
      }
    },
    { qualityPoints: 0, creditHours: 0 },
  )

  const rawGpa =
    totals.creditHours > 0 ? totals.qualityPoints / totals.creditHours : 0
  const gpa = truncateToTwoDecimals(rawGpa)

  return {
    countedCourses,
    qualityPoints: totals.qualityPoints,
    creditHours: totals.creditHours,
    gpa,
    classification: getGpaClassification(gpa),
  }
}

export function getCumulativeGpa(previousGpa, previousCredits, semesterMetrics) {
  const safePreviousGpa = clampGpa(previousGpa)
  const safePreviousCredits = Math.max(0, Number(previousCredits) || 0)
  const previousQualityPoints = safePreviousGpa * safePreviousCredits
  const currentQualityPoints = semesterMetrics.qualityPoints
  const currentCredits = semesterMetrics.creditHours
  const totalCredits = safePreviousCredits + currentCredits

  if (totalCredits === 0) {
    return {
      gpa: 0,
      classification: getGpaClassification(0),
      totalCredits: 0,
    }
  }

  const gpa = truncateToTwoDecimals(
    (previousQualityPoints + currentQualityPoints) / totalCredits,
  )

  return {
    gpa,
    classification: getGpaClassification(gpa),
    totalCredits,
  }
}

export function getGpaClassification(gpa) {
  return (
    GPA_CLASSIFICATIONS.find(
      (classification) => gpa >= classification.min && gpa <= classification.max,
    ) ?? GPA_CLASSIFICATIONS[GPA_CLASSIFICATIONS.length - 1]
  )
}

export function clampGpa(value) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return 0
  }

  return Math.min(4, Math.max(0, numericValue))
}

export function getDonutHue(gpa) {
  return clampGpa(gpa) * 40
}

export function getRingStroke(gpa) {
  const hue = getDonutHue(gpa)
  return `hsl(${hue}, 100%, 45%)`
}

export function getNextThreshold(gpa) {
  return (
    CLASSIFICATION_THRESHOLDS.find((threshold) => threshold.min > gpa) ?? null
  )
}

export function getThresholdMessage(gpa) {
  const nextThreshold = getNextThreshold(gpa)

  if (!nextThreshold) {
    return 'You are at the top classification threshold.'
  }

  const delta = truncateToTwoDecimals(nextThreshold.min - gpa)

  return `${delta.toFixed(2)} away from ${nextThreshold.label}`
}
