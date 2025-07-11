"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2 } from "lucide-react"
import type { CorrectionResult } from "../page"

interface InputFormProps {
  onTextSubmitted: (result: CorrectionResult) => void
  onBackToHome: () => void
}

export default function InputForm({ onTextSubmitted, onBackToHome }: InputFormProps) {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const maxLength = 300

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Input validation
    if (!text.trim()) {
      setError("Please enter some text to check")
      return
    }

    if (text.length > maxLength) {
      setError(`Text must be ${maxLength} characters or less`)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/check-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to check text")
      }

      const result: CorrectionResult = await response.json()
      onTextSubmitted(result)
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error("Error checking text:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (error) setError("") // Clear error when user starts typing
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBackToHome} className="mr-4 p-2 hover:bg-white/50">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Enter Your Text</h1>
      </div>

      {/* Input Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">What would you like me to check?</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Type or paste your text here. I'll help you improve grammar and clarity..."
                className="min-h-[200px] text-lg leading-relaxed resize-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                maxLength={maxLength}
              />
              <div className="flex justify-between items-center text-sm">
                <span className={`${text.length > maxLength * 0.9 ? "text-orange-600" : "text-gray-500"}`}>
                  {text.length}/{maxLength} characters
                </span>
                {text.length > maxLength * 0.9 && (
                  <span className="text-orange-600 font-medium">Approaching limit</span>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Checking Your Text...
                </>
              ) : (
                "Check My Text"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="font-semibold text-gray-800 mb-3">💡 Tips for better results:</h3>
        <ul className="text-gray-600 space-y-1 text-sm">
          <li>• Write complete sentences for more accurate corrections</li>
          <li>• Include context when possible</li>
          <li>• Don't worry about perfection - that's what I'm here for!</li>
        </ul>
      </div>
    </div>
  )
}
