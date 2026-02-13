"use client"
import { useEffect, useState } from "react";

interface FloatingHeart {
    id: number;
    left: number;
    animationDuration: number;
    animationDelay: number;
    size: number;
    emoji: string;
}

interface FloatingHeartsProps {
    count?: number;
    intense?: boolean
}

const HEART_EMOJIS = ["❤️","🩷","🧡","💛","💚","💙","💜","🤎","🖤","🤍","💖","💗","💓","💞","💕","💘","💝","💟","❣️","❤️‍🔥","❤️‍🩹","💔","🫀"];

const FloatingHearts = ({ count = 10, intense = false }: FloatingHeartsProps) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const generateHearts = () => {
        const newHearts: FloatingHeart[] = [];
        const actualCount = intense ? count * 3 : count;

        for (let i = 0; i < actualCount; i++) {
            newHearts.push({
                id: i,
                left: Math.random() * 100,
                animationDuration: intense ? 4 + Math.random() * 4 : 8 + Math.random() * 6,
                animationDelay: Math.random() * (intense ? 3 : 8),
                size: intense ? 1 + Math.random() * 2 : 1 + Math.random() * 1.5,
                emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
            })
        }
        setHearts(newHearts)
    }

    generateHearts()

    const interval = setInterval(() => {
        generateHearts()
    }, intense ? 5000 : 15000);

    return () => clearInterval(interval)
  }, [count, intense])
  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <span
          key={`${heart.id}-${heart.animationDelay}`}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.animationDelay}s`,
            fontSize: `${heart.size}rem`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}

export default FloatingHearts