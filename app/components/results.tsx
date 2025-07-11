"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, RefreshCw, CheckCircle, FileText } from "lucide-react"
import type { CorrectionResult } from "../page"

interface ResultsProps {
  result: CorrectionResult
  onTryAnother: () => void
  onBackToHome: () => void
}

export default function Results({ result, onTryAnother, onBackToHome }: ResultsProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBackToHome} className="mr-4 p-2 hover:bg-white/50">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Results</h1>
        </div>

        <Button
          onClick={onTryAnother}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Another
        </Button>
      </div>

      {/* Results Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Original Text */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg text-gray-700">
              <FileText className="mr-2 h-5 w-5" />
              Original Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{result.original}</p>
            </div>
          </CardContent>
        </Card>

        {/* Corrected Text */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg text-green-700">
              <CheckCircle className="mr-2 h-5 w-5" />
              Improved Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{result.corrected}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Explanation */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">📝 What I Changed and Why</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{result.explanation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <Button
          onClick={onTryAnother}
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Check Another Text
        </Button>

        <Button
          onClick={onBackToHome}
          variant="outline"
          size="lg"
          className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}
