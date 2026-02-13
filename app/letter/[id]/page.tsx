"use client"

import { ValentineData } from '@/types/valentine';
import { getValentine } from '@/types/valentine-service';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'

type Scene = "loading" | "sealed" | "reading" | "end";

const LetterPage = () => {
  const params = useParams()
  const id = params.id as string;
  const [valentine, setValentine] = useState<ValentineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentScene, setCurrentScene] = useState<Scene>("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getValentine(id);
        if (data) {
          setValentine(data);
          setCurrentScene("sealed");
        } else {
          setError("This letter doesn't exist or has been lost to time.");
        }
      } catch (err) {
        console.error("Error fetching valentine:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleOpenLetter = useCallback(() => {
    // Transition from sealed to reading
    setCurrentScene("reading");
  }, []);

  const handleReadingComplete = useCallback(() => {
    // Maybe show a final "Replay" or "Create Yours" button gently
    // We can just set a flag to show the footer
    setCurrentScene("end");
  }, []);

   if (loading) {
    return (
      <div className="fixed inset-0 bg-[#f8f5f0] flex flex-col items-center justify-center gap-4">
        <div className="text-4xl animate-pulse text-[#2c1810]">💌</div>
        <p className="text-[#5c4d3c] font-inter text-lg tracking-wider">Retrieving letter...</p>
      </div>
    );
  }

  if (error || !valentine) {
    return (
      <div className="fixed inset-0 bg-[#f8f5f0] flex items-center justify-center p-4">
        <div className="text-center max-w-md p-8 border border-[#e2d5c3] shadow-lg bg-white">
          <div className="text-4xl mb-6">🥀</div>
          <h1 className="text-2xl font-inter text-[#2c1810] mb-4">Letter Not Found</h1>
          <p className="text-[#5c4d3c] mb-6 font-inter">{error || "This letter has been lost to the winds of time."}</p>
          <Link href="/" className="inline-block px-6 py-2 border border-[#2c1810] text-[#2c1810] hover:bg-[#2c1810] hover:text-[#f8f5f0] transition-colors font-inter uppercase tracking-widest text-sm">
            Write a New Letter
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>LetterPage</div>
  )
}

export default LetterPage