"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Skull } from "lucide-react"

interface HomeScreenProps {
  onStart: () => void
}

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <Card className="border-2 border-orange-500 shadow-lg shadow-orange-500/30 bg-black/60 backdrop-blur-md text-white">
        <CardHeader className="text-center bg-gradient-to-r from-orange-600 via-purple-500 to-orange-600 rounded-t-lg">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <Skull className="h-6 w-6" />
            Would You Rather
            <Skull className="h-6 w-6" />
          </CardTitle>
          <CardDescription className="text-white/90 text-lg">The game of impossible choices</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-xl">
              Welcome to the spookiest version of <span className="font-bold text-orange-400">Would You Rather</span>!
            </p>
            <p className="text-gray-300">
              Face impossible choices, reveal your darkest preferences, and see how your answers compare to others.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 p-4 rounded-lg border border-orange-800">
              <h3 className="font-semibold text-lg mb-2 text-orange-400">How to Play</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-orange-400 mt-1 shrink-0" />
                  <span>Choose between two impossible options</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-orange-400 mt-1 shrink-0" />
                  <span>See how your answers compare to others</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-orange-400 mt-1 shrink-0" />
                  <span>Discover what your choices reveal about you</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/40 p-4 rounded-lg border border-orange-800">
              <h3 className="font-semibold text-lg mb-2 text-orange-400">Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-orange-400 mt-1 shrink-0" />
                  <span>20 mind-bending questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-orange-400 mt-1 shrink-0" />
                  <span>Detailed results breakdown</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-orange-400 mt-1 shrink-0" />
                  <span>Compare your answers with others</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center p-6 pt-2 gap-4">
          <Button
            onClick={onStart}
            className="bg-gradient-to-r from-orange-600 via-purple-500 to-orange-600 hover:from-orange-700 hover:via-purple-600 hover:to-orange-700 w-full"
            size="lg"
          >
            Start Game
          </Button>

          <div className="text-center text-sm text-gray-400 italic mt-2">
            "Your choices define you... choose wisely!"
            <div className="font-bold text-orange-400 mt-1">By - Jayraj</div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
