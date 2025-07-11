"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, CheckCircle, Sparkles } from "lucide-react"

interface LandingProps {
  onStartPracticing: () => void
}

export default function Landing({ onStartPracticing }: LandingProps) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <BookOpen className="h-12 w-12 text-indigo-600" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">AI Language Coach</h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Improve your writing with AI-powered grammar corrections and clearer phrasing suggestions
        </p>

        <Button
          onClick={onStartPracticing}
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Start Practicing
          <Sparkles className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Grammar Correction</h3>
            <p className="text-gray-600">
              Get instant feedback on grammar mistakes and learn from detailed explanations
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Clearer Phrasing</h3>
            <p className="text-gray-600">Transform complex sentences into clear, concise, and impactful writing</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardContent className="p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn & Improve</h3>
            <p className="text-gray-600">
              Understand the reasoning behind each correction to improve your writing skills
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
