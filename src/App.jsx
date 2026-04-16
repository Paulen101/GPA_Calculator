import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SemesterCalculator from './components/SemesterCalculator'
import CumulativeCalculator from './components/CumulativeCalculator'
import ClassGradeCalculator from './components/ClassGradeCalculator'
import Footer from './components/Footer'
import { createCourse, getSemesterMetrics } from './utils/gpaLogic'
import { createAssignment } from './utils/gradeLogic'
import './App.css'

const INITIAL_COURSES = [
  createCourse({
    name: 'ENG 101',
    grade: 'A',
    credits: 3,
    isRepeat: false,
  }),
  createCourse({
    name: 'MATH 122',
    grade: 'B',
    credits: 4,
    isRepeat: false,
  }),
  createCourse({
    name: 'HIST 111',
    grade: 'P',
    credits: 1,
    isRepeat: false,
  }),
]

const INITIAL_ASSIGNMENTS = [
  createAssignment({
    name: 'Homework',
    grade: '92',
    weight: '20',
  }),
  createAssignment({
    name: 'Midterm',
    grade: '88',
    weight: '30',
  }),
]

function App() {
  const [courses, setCourses] = useState(INITIAL_COURSES)
  const [activeCalculator, setActiveCalculator] = useState('gpa')
  const [activeGpaSection, setActiveGpaSection] = useState('semester')
  const [whatIfMode, setWhatIfMode] = useState(false)
  const [previousGpa, setPreviousGpa] = useState('3.25')
  const [previousCredits, setPreviousCredits] = useState('45')
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS)
  const [finalExamInputs, setFinalExamInputs] = useState({
    currentGrade: '89',
    targetGrade: '90',
    finalExamWeight: '25',
  })

  const effectiveCourses = whatIfMode
    ? courses.map((course) => ({
        ...course,
        grade: course.whatIfGrade || course.grade,
      }))
    : courses

  const semesterMetrics = getSemesterMetrics(effectiveCourses)
  const baseSemesterMetrics = getSemesterMetrics(courses)

  useEffect(() => {
    if (activeCalculator !== 'gpa') {
      return undefined
    }

    const sectionIds = ['semester-calculator', 'cumulative-calculator']
    const sectionMap = {
      'semester-calculator': 'semester',
      'cumulative-calculator': 'cumulative',
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveGpaSection(sectionMap[visibleEntry.target.id])
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.2, 0.4, 0.65],
      },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)

      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [activeCalculator])

  const resetAll = () => {
    setCourses(INITIAL_COURSES.map((course) => createCourse(course)))
    setAssignments(INITIAL_ASSIGNMENTS.map((assignment) => createAssignment(assignment)))
    setWhatIfMode(false)
    setActiveCalculator('gpa')
    setActiveGpaSection('semester')
    setPreviousGpa('3.25')
    setPreviousCredits('45')
    setFinalExamInputs({
      currentGrade: '89',
      targetGrade: '90',
      finalExamWeight: '25',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectCalculator = (calculator) => {
    setActiveCalculator(calculator)
  }

  return (
    <div className="app-shell" id="top">
      <Header
        activeCalculator={activeCalculator}
        activeGpaSection={activeGpaSection}
        onReset={resetAll}
        onSelectCalculator={selectCalculator}
      />
      <Hero />
      <section className="calculator-switcher-wrap" id="calculator-switcher">
        <div className="calculator-switcher">
          <button
            type="button"
            className={`calculator-tab ${activeCalculator === 'gpa' ? 'is-active' : ''}`}
            onClick={() => setActiveCalculator('gpa')}
            aria-pressed={activeCalculator === 'gpa'}
          >
            GPA Calculator
          </button>
          <button
            type="button"
            className={`calculator-tab ${activeCalculator === 'grade' ? 'is-active' : ''}`}
            onClick={() => setActiveCalculator('grade')}
            aria-pressed={activeCalculator === 'grade'}
          >
            Grade Calculator
          </button>
        </div>
      </section>
      <main className="page-content">
        {activeCalculator === 'gpa' ? (
          <>
            <SemesterCalculator
              courses={courses}
              setCourses={setCourses}
              semesterMetrics={semesterMetrics}
              baseSemesterMetrics={baseSemesterMetrics}
              whatIfMode={whatIfMode}
              setWhatIfMode={setWhatIfMode}
            />
            <CumulativeCalculator
              semesterMetrics={semesterMetrics}
              previousGpa={previousGpa}
              setPreviousGpa={setPreviousGpa}
              previousCredits={previousCredits}
              setPreviousCredits={setPreviousCredits}
            />
          </>
        ) : (
          <ClassGradeCalculator
            assignments={assignments}
            setAssignments={setAssignments}
            finalExamInputs={finalExamInputs}
            setFinalExamInputs={setFinalExamInputs}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
