"use client"

import { useState } from "react"
import Landing from "./components/landing"
import InputForm from "./components/input-form"
import Results from "./components/results"

export type AppState = "landing" | "input" | "results"

export interface CorrectionResult {
  original: string
  corrected: string
  explanation: string
}

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>("landing")
  const [result, setResult] = useState<CorrectionResult | null>(null)

  const handleStartPracticing = () => {
    setCurrentState("input")
  }

  const handleTextSubmitted = (correctionResult: CorrectionResult) => {
    setResult(correctionResult)
    setCurrentState("results")
  }

  const handleTryAnother = () => {
    setResult(null)
    setCurrentState("input")
  }

  const handleBackToHome = () => {
    setResult(null)
    setCurrentState("landing")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentState === "landing" && <Landing onStartPracticing={handleStartPracticing} />}

      {currentState === "input" && <InputForm onTextSubmitted={handleTextSubmitted} onBackToHome={handleBackToHome} />}

      {currentState === "results" && result && (
        <Results result={result} onTryAnother={handleTryAnother} onBackToHome={handleBackToHome} />
      )}
    </main>
  )
}
