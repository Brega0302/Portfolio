"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface BallPosition {
  x: number;
  y: number;
}

export function FootballGame() {
  const [ballPosition, setBallPosition] = useState<BallPosition>({ x: 50, y: 80 });
  const [isShooting, setIsShooting] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [score, setScore] = useState(0);
  const [goalMessage, setGoalMessage] = useState("");

  const goalArea = {
    x: 40, // Goal center X percentage
    y: 10, // Goal Y percentage
    width: 20, // Goal width percentage
    height: 15, // Goal height percentage
  };

  const shootBall = () => {
    if (isShooting) return;

    setIsShooting(true);
    setShowGoal(false);
    setGoalMessage("");

    // Random target position
    const targetX = Math.random() * 80 + 10; // 10% to 90%
    const targetY = Math.random() * 40 + 5; // 5% to 45%

    // Animate ball to target
    setBallPosition({ x: targetX, y: targetY });

    // Check if goal scored
    setTimeout(() => {
      const isInGoal = 
        targetX >= goalArea.x - goalArea.width/2 && 
        targetX <= goalArea.x + goalArea.width/2 &&
        targetY >= goalArea.y - goalArea.height/2 && 
        targetY <= goalArea.y + goalArea.height/2;

      if (isInGoal) {
        setShowGoal(true);
        setScore(score + 1);
        setGoalMessage("GOAL! ⚽");
        
        // Hide goal message after 2 seconds
        setTimeout(() => {
          setShowGoal(false);
          setGoalMessage("");
        }, 2000);
      } else {
        setGoalMessage("Miss! Try again");
        setTimeout(() => {
          setGoalMessage("");
        }, 1000);
      }

      // Reset ball position after animation
      setTimeout(() => {
        setBallPosition({ x: 50, y: 80 });
        setIsShooting(false);
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none">
      <div className="relative h-full pointer-events-auto">
        {/* Goal */}
        <div 
          className="absolute border-4 border-white rounded-lg flex items-center justify-center"
          style={{
            left: `${goalArea.x - goalArea.width/2}%`,
            top: `${goalArea.y - goalArea.height/2}%`,
            width: `${goalArea.width}%`,
            height: `${goalArea.height}%`,
          }}
        >
          <div className="text-white text-xs font-bold opacity-50">GOAL</div>
        </div>

        {/* Goal celebration */}
        {showGoal && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="text-4xl font-bold text-yellow-400 drop-shadow-lg">
              ⚽ GOAL! ⚽
            </div>
          </motion.div>
        )}

        {/* Ball */}
        <motion.div
          className="absolute w-8 h-8 cursor-pointer pointer-events-auto"
          style={{
            left: `${ballPosition.x}%`,
            top: `${ballPosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={!isShooting ? {
            rotate: [0, 360],
          } : {}}
          transition={!isShooting ? {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          } : {}}
          onClick={shootBall}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-full h-full bg-white rounded-full border-2 border-black relative overflow-hidden">
            {/* Football pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-black rounded-full"></div>
            </div>
            <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-black transform rotate-45"></div>
            <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-black transform -rotate-45"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-black transform -rotate-45"></div>
            <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-black transform rotate-45"></div>
          </div>
        </motion.div>

        {/* Score */}
        <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/50 rounded-lg px-3 py-1">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-sm font-bold">Score: {score}</span>
        </div>

        {/* Feedback message */}
        {goalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
              goalMessage.includes("GOAL") 
                ? "bg-green-500 text-white" 
                : "bg-red-500 text-white"
            }`}>
              {goalMessage}
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-2 left-2 text-white/60 text-xs">
          Click the football to shoot! 🎯
        </div>
      </div>
    </div>
  );
}
