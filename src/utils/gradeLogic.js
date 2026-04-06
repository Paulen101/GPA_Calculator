export function truncatePercentage(value) {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.floor(value * 100) / 100
}

export function formatPercentage(value) {
  return truncatePercentage(value).toFixed(2)
}

export function createAssignment(overrides = {}) {
  return {
    id:
      overrides.id ??
      `assignment-${Math.random().toString(36).slice(2, 11)}-${Date.now().toString(36)}`,
    name: overrides.name ?? '',
    grade: overrides.grade ?? '',
    weight: overrides.weight ?? '',
  }
}

export function normalizePercentage(value) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue) || numericValue < 0) {
    return 0
  }

  return numericValue
}

export function getCurrentWeightedGrade(assignments) {
  const totals = assignments.reduce(
    (accumulator, assignment) => {
      const grade = normalizePercentage(assignment.grade)
      const weight = normalizePercentage(assignment.weight)

      if (weight <= 0) {
        return accumulator
      }

      return {
        earned: accumulator.earned + (grade * weight) / 100,
        weight: accumulator.weight + weight,
      }
    },
    { earned: 0, weight: 0 },
  )

  const percentage = totals.weight > 0 ? (totals.earned / totals.weight) * 100 : 0

  return {
    percentage: truncatePercentage(percentage),
    completedWeight: truncatePercentage(totals.weight),
  }
}

export function getRequiredFinalExamGrade(
  currentGrade,
  targetGrade,
  finalExamWeight,
) {
  const safeCurrentGrade = normalizePercentage(currentGrade)
  const safeTargetGrade = normalizePercentage(targetGrade)
  const safeFinalExamWeight = normalizePercentage(finalExamWeight)

  if (safeFinalExamWeight <= 0 || safeFinalExamWeight > 100) {
    return {
      neededGrade: null,
      isPossible: false,
      message: 'Enter a final exam weight between 0 and 100.',
    }
  }

  const weightDecimal = safeFinalExamWeight / 100
  const requiredGrade =
    (safeTargetGrade - safeCurrentGrade * (1 - weightDecimal)) / weightDecimal

  if (!Number.isFinite(requiredGrade)) {
    return {
      neededGrade: null,
      isPossible: false,
      message: 'Enter valid numbers to calculate your final exam target.',
    }
  }

  const truncatedGrade = truncatePercentage(requiredGrade)

  if (truncatedGrade < 0) {
    return {
      neededGrade: 0,
      isPossible: true,
      message: `You already have enough points banked to finish with ${formatPercentage(safeTargetGrade)}%.`,
    }
  }

  if (truncatedGrade > 100) {
    return {
      neededGrade: truncatedGrade,
      isPossible: false,
      message: `You would need ${formatPercentage(truncatedGrade)}% on the final exam to reach ${formatPercentage(safeTargetGrade)}%.`,
    }
  }

  return {
    neededGrade: truncatedGrade,
    isPossible: true,
    message: `You need a ${formatPercentage(truncatedGrade)}% on the final exam to get a ${formatPercentage(safeTargetGrade)}% in the class.`,
  }
}
