"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, ArrowRight, BarChart3, Skull, Flame, Zap, Bomb, Laugh, ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"

// Define the questions and fake statistics
const questions = [
  {
    id: 1,
    question: "Would you rather know when you're going to die or how you're going to die?",
    options: [
      { text: "Know when", percentage: 58 },
      { text: "Know how", percentage: 42 },
    ],
  },
  {
    id: 2,
    question: "Would you rather be trapped in a small room with 10 tarantulas or 1 lion?",
    options: [
      { text: "10 tarantulas", percentage: 73 },
      { text: "1 lion", percentage: 27 },
    ],
  },
  {
    id: 3,
    question: "Would you rather lose all your memories or never be able to make new ones?",
    options: [
      { text: "Lose all memories", percentage: 61 },
      { text: "Never make new ones", percentage: 39 },
    ],
  },
  {
    id: 4,
    question:
      "Would you rather be the only survivor of a plane crash or die in a plane crash knowing everyone else survived?",
    options: [
      { text: "Be the only survivor", percentage: 68 },
      { text: "Die knowing others survived", percentage: 32 },
    ],
  },
  {
    id: 5,
    question: "Would you rather be buried alive or stranded alone in the middle of the ocean?",
    options: [
      { text: "Buried alive", percentage: 24 },
      { text: "Stranded in ocean", percentage: 76 },
    ],
  },
  {
    id: 6,
    question: "Would you rather be forced to kill an innocent person or watch 5 innocent people die?",
    options: [
      { text: "Kill one innocent person", percentage: 39 },
      { text: "Watch 5 innocent people die", percentage: 61 },
    ],
  },
  {
    id: 7,
    question: "Would you rather be blind or deaf for the rest of your life?",
    options: [
      { text: "Blind", percentage: 22 },
      { text: "Deaf", percentage: 78 },
    ],
  },
  {
    id: 8,
    question: "Would you rather be immortal but always alone, or live a normal lifespan surrounded by loved ones?",
    options: [
      { text: "Immortal but alone", percentage: 18 },
      { text: "Normal life with loved ones", percentage: 82 },
    ],
  },
  {
    id: 9,
    question: "Would you rather be able to read everyone's darkest thoughts or have everyone be able to read yours?",
    options: [
      { text: "Read everyone's thoughts", percentage: 74 },
      { text: "Everyone reads your thoughts", percentage: 26 },
    ],
  },
  {
    id: 10,
    question: "Would you rather be the villain in a horror movie or the first person to die?",
    options: [
      { text: "Be the villain", percentage: 79 },
      { text: "First to die", percentage: 21 },
    ],
  },
  {
    id: 11,
    question: "Would you rather experience the beginning of the universe or the end of the universe?",
    options: [
      { text: "Beginning of universe", percentage: 81 },
      { text: "End of universe", percentage: 19 },
    ],
  },
  {
    id: 12,
    question:
      "Would you rather be trapped in a nightmare you can't wake up from or be unable to sleep for the rest of your life?",
    options: [
      { text: "Trapped in nightmare", percentage: 34 },
      { text: "Never sleep again", percentage: 66 },
    ],
  },
  {
    id: 13,
    question: "Would you rather know the truth behind every conspiracy or be able to get away with any crime?",
    options: [
      { text: "Know all conspiracy truths", percentage: 57 },
      { text: "Get away with any crime", percentage: 43 },
    ],
  },
  {
    id: 14,
    question:
      "Would you rather be the only person with superpowers in a world that fears you or be powerless in a world full of superheroes?",
    options: [
      { text: "Only one with powers, but feared", percentage: 58 },
      { text: "Powerless among superheroes", percentage: 42 },
    ],
  },
  {
    id: 15,
    question:
      "Would you rather be forced to dance every time you hear music or be forced to sing along to any song you hear?",
    options: [
      { text: "Dance to music", percentage: 71 },
      { text: "Sing along to songs", percentage: 29 },
    ],
  },
  {
    id: 16,
    question: "Would you rather have all your Google searches made public or all your text messages made public?",
    options: [
      { text: "Google searches public", percentage: 34 },
      { text: "Text messages public", percentage: 66 },
    ],
  },
  {
    id: 17,
    question: "Would you rather be stuck in an elevator with your ex for 8 hours or with your boss for 24 hours?",
    options: [
      { text: "Ex for 8 hours", percentage: 67 },
      { text: "Boss for 24 hours", percentage: 33 },
    ],
  },
  {
    id: 18,
    question: "Would you rather have to say everything on your mind or never speak again?",
    options: [
      { text: "Say everything on your mind", percentage: 44 },
      { text: "Never speak again", percentage: 56 },
    ],
  },
  {
    id: 19,
    question: "Would you rather be the smartest person in a room of fools or the dumbest person in a room of geniuses?",
    options: [
      { text: "Smartest among fools", percentage: 28 },
      { text: "Dumbest among geniuses", percentage: 72 },
    ],
  },
  {
    id: 20,
    question: "Would you rather know how the world ends or when it ends?",
    options: [
      { text: "Know how it ends", percentage: 63 },
      { text: "Know when it ends", percentage: 37 },
    ],
  },
]

// Funny comments after selecting an answer
const funnyComments = [
  "Wow, really? That's your choice? Interesting...",
  "I'm judging you silently right now.",
  "Your therapist would have a field day with that choice!",
  "Are you sure about that? Like, really sure?",
  "That says more about you than you realize!",
  "Bold choice! Your FBI agent just raised an eyebrow.",
  "Your ancestors are either proud or rolling in their graves.",
  "That's what everyone says until it actually happens!",
  "Plot twist: both options lead to disaster!",
  "I'm taking notes for future reference...",
  "That's exactly what a serial killer would choose!",
  "Your choice has been recorded for posterity. And memes.",
  "Congratulations! You've unlocked the 'Questionable Decisions' badge!",
  "That's what she said! Wait, no, that doesn't work here.",
  "Your choice has been added to your permanent record.",
  "9 out of 10 psychologists would find that concerning.",
  "That's the kind of decision that keeps you up at 3 AM.",
  "Your pet would be disappointed in you.",
  "Your future self just felt a disturbance in the force.",
  "That's a spicy choice for a Tuesday!",
]

// Background animation component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black"></div>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

export default function WouldYouRatherGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [showFinalReport, setShowFinalReport] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [currentComment, setCurrentComment] = useState("")
  const { toast } = useToast()

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  // Trigger confetti on game completion
  useEffect(() => {
    if (gameComplete && showFinalReport) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const colors = ["#bb86fc", "#3700b3", "#03dac6", "#cf6679"]

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const frame = () => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) return

        const particleCount = 50 * (timeLeft / duration)

        confetti({
          particleCount,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.5) },
          colors: colors,
          shapes: ["circle", "square"],
          scalar: randomInRange(0.4, 1),
        })

        requestAnimationFrame(frame)
      }

      frame()
    }
  }, [gameComplete, showFinalReport])

  const handleSelectOption = (optionIndex: number) => {
    if (showResults) return

    // Show random funny comment
    const randomComment = funnyComments[Math.floor(Math.random() * funnyComments.length)]
    setCurrentComment(randomComment)
    setShowComment(true)

    // Show toast notification with funny comment
    toast({
      title: "Interesting choice...",
      description: randomComment,
      variant: "destructive",
    })

    // Hide comment after 2 seconds
    setTimeout(() => {
      setShowComment(false)
    }, 2000)

    setSelectedAnswers([...selectedAnswers, optionIndex])
    setShowResults(true)

    // Auto-advance to next question after a delay
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setShowResults(false)
      }, 3000)
    } else {
      setGameComplete(true)
    }
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setGameComplete(true)
      setShowFinalReport(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowResults(false)
    }
  }

  const handleViewReport = () => {
    setShowFinalReport(true)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setShowResults(false)
    setGameComplete(false)
    setShowFinalReport(false)
  }

  // Calculate how many of your answers match the majority
  const calculateMatchPercentage = () => {
    let matchCount = 0

    selectedAnswers.forEach((selectedOption, index) => {
      const question = questions[index]
      const majorityOption = question.options[0].percentage > question.options[1].percentage ? 0 : 1

      if (selectedOption === majorityOption) {
        matchCount++
      }
    })

    return Math.round((matchCount / questions.length) * 100)
  }

  // Get icon based on question index
  const getQuestionIcon = (index: number) => {
    const icons = [Skull, Flame, Zap, Bomb, Laugh]
    return icons[index % icons.length]
  }

  if (showFinalReport) {
    const matchPercentage = calculateMatchPercentage()
    const QuestionIcon = getQuestionIcon(currentQuestionIndex)

    return (
      <>
        <AnimatedBackground />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
          <Card className="border-2 border-purple-500 shadow-lg shadow-purple-500/30 bg-black/60 backdrop-blur-md text-white">
            <CardHeader className="text-center bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 rounded-t-lg">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6" />
                Your Results
                <Sparkles className="h-6 w-6" />
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">How twisted is your mind?</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <motion.h3
                  className="text-2xl font-bold"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    delay: 0.3,
                  }}
                >
                  You think like {matchPercentage}% of other people
                </motion.h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-lg py-1 px-4 border-2",
                    matchPercentage > 75
                      ? "border-green-500 text-green-400"
                      : matchPercentage > 50
                        ? "border-blue-500 text-blue-400"
                        : matchPercentage > 25
                          ? "border-orange-500 text-orange-400"
                          : "border-red-500 text-red-400",
                  )}
                >
                  {matchPercentage > 75
                    ? "Conformist"
                    : matchPercentage > 50
                      ? "Mainstream Thinker"
                      : matchPercentage > 25
                        ? "Free Spirit"
                        : "Complete Weirdo"}
                </Badge>
                <p className="text-gray-300 mt-2">
                  {matchPercentage > 75
                    ? "You're basically a sheep. Baaaaa!"
                    : matchPercentage > 50
                      ? "You mostly follow the crowd, but occasionally take the road less traveled."
                      : matchPercentage > 25
                        ? "You march to the beat of your own drum. People find you... interesting."
                        : "You're from another planet, aren't you? Even aliens would find your choices strange."}
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  Question Breakdown
                </h3>

                <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                  {questions.map((question, index) => {
                    const selectedOption = selectedAnswers[index]
                    const selectedPercentage = question.options[selectedOption].percentage
                    const isInMajority =
                      (selectedOption === 0 && question.options[0].percentage > question.options[1].percentage) ||
                      (selectedOption === 1 && question.options[1].percentage > question.options[0].percentage)
                    const QuestionIcon = getQuestionIcon(index)

                    return (
                      <motion.div
                        key={index}
                        className="space-y-1 bg-white/10 p-3 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-start gap-2">
                          <QuestionIcon className="h-5 w-5 text-purple-400 shrink-0 mt-1" />
                          <p className="text-sm font-medium">{question.question}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-7">
                          <div className="text-sm font-medium w-32 truncate text-gray-300">
                            {question.options[selectedOption].text}
                          </div>
                          <div className="relative flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "absolute top-0 left-0 h-full rounded-full",
                                isInMajority ? "bg-green-500" : "bg-red-500",
                              )}
                              style={{ width: `${selectedPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{selectedPercentage}%</span>
                          {isInMajority ? (
                            <ThumbsUp className="h-4 w-4 text-green-400" />
                          ) : (
                            <ThumbsDown className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center p-6 pt-2 gap-4">
              <Button
                onClick={handleRestart}
                className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 hover:from-purple-700 hover:via-fuchsia-600 hover:to-pink-700 w-full"
                size="lg"
              >
                Play Again
              </Button>

              <div className="text-center text-sm text-gray-400 italic mt-2">
                "Life is all about choices. Some are just more questionable than others."
                <div className="font-bold text-purple-400 mt-1">By - Jayraj</div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </>
    )
  }

  return (
    <>
      <AnimatedBackground />
      <div className="w-full max-w-2xl relative">
        <div className="mb-4 flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-white border-purple-500 px-3 py-1">
                  {currentQuestionIndex + 1} / {questions.length}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your twisted journey is {Math.round((currentQuestionIndex / questions.length) * 100)}% complete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Progress value={(currentQuestionIndex / questions.length) * 100} className="w-1/2 h-2 bg-gray-700" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-purple-500 shadow-lg shadow-purple-500/30 bg-black/60 backdrop-blur-md text-white">
              <CardHeader className="text-center bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  {React.createElement(getQuestionIcon(currentQuestionIndex), { className: "h-6 w-6" })}
                  Would You Rather
                </CardTitle>
                <CardDescription className="text-white/90">
                  Choose wisely... or don't. We're judging either way.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-xl font-medium text-center mb-6">{currentQuestion.question}</div>

                {currentQuestion.options.map((option, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full p-6 h-auto text-lg justify-between group relative overflow-hidden border-2",
                        selectedAnswers[currentQuestionIndex] === index && showResults
                          ? "border-purple-500 bg-purple-900/50 text-white"
                          : "border-purple-800 hover:border-purple-500 bg-purple-900/20 hover:bg-purple-900/40 text-white",
                      )}
                      onClick={() => handleSelectOption(index)}
                      disabled={showResults}
                    >
                      <span className="z-10">{option.text}</span>

                      {showResults && (
                        <motion.div
                          className="absolute right-4 flex items-center gap-2 z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Badge variant="outline" className="bg-purple-500/20 border-purple-400 text-white">
                            {option.percentage}%
                          </Badge>
                        </motion.div>
                      )}

                      {showResults && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-purple-600/40 to-fuchsia-600/40"
                          initial={{ width: 0 }}
                          animate={{ width: `${option.percentage}%` }}
                          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                        />
                      )}

                      {!showResults && <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />}
                    </Button>
                  </motion.div>
                ))}

                <AnimatePresence>
                  {showComment && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-20 bg-black/80 border border-red-500 text-white p-3 rounded-lg max-w-md text-center shadow-lg shadow-red-500/20"
                    >
                      {currentComment}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex justify-between p-6 pt-2">
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="ml-auto"
                  >
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 hover:from-purple-700 hover:via-fuchsia-600 hover:to-pink-700"
                      size="lg"
                    >
                      {isLastQuestion ? "View Results" : "Next Question"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {gameComplete && !showResults && (
                  <Button
                    onClick={handleViewReport}
                    className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 hover:from-purple-700 hover:via-fuchsia-600 hover:to-pink-700"
                    size="lg"
                  >
                    View Your Results
                    <BarChart3 className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="text-center text-sm text-gray-400 italic mt-4">
          "Making questionable choices since birth, now in digital form!"
          <div className="font-bold text-purple-400">By - Jayraj</div>
        </div>
      </div>
    </>
  )
}

