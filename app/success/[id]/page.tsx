"use client"
import { Button, FloatingHearts, GlassCard } from '@/components/ui';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SuccessPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/surprise/${id}`);
    }
  }, [id]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };
  return (
    <main className="min-h-dvh relative flex items-center justify-center p-4 vintage-paper">
      {/* Background */}
      <div className="fixed inset-0 vintage-vignette -z-10" />
      
      {/* Floating Hearts */}
      <FloatingHearts count={25} />

      {/* Decorative orbs */}
      <div className="fixed -top-37.5 -right-12.5 w-100 h-100 rounded-full bg-linear-to-br from-orange-200/20 to-rose-200/10 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-37.5 -left-12.5 w-100 h-100 rounded-full bg-linear-to-tr from-rose-200/20 to-orange-200/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg animate-scale-in">
        <GlassCard className="p-8 md:p-12 text-center vintage-card">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-pink-500/10 to-purple-500/10 flex items-center justify-center border border-pink-100">
            <span className="text-5xl animate-pulse">💌</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-rose-500 to-purple-600 font-bangla">
            আপনার প্রেমপত্র তৈরি হয়েছে!
          </h1>

          <p className="text-gray-600 text-lg mb-8 font-medium">
            Share this digital love letter with your special someone 💕
          </p>

          {/* Link Display */}
          <div className="mb-8 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-left shadow-inner overflow-hidden group relative">
            <p className="text-xs text-slate-400 font-mono mb-1 uppercase tracking-wider">Share this link:</p>
            <div className="flex items-center justify-between gap-3">
              <a 
                href={shareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-rose-400 font-mono text-sm truncate hover:text-rose-300 transition-colors"
              >
                {shareUrl}
              </a>
            </div>
          </div>

          {/* Copy Button */}
          <Button
            onClick={copyToClipboard}
            fullWidth
            className={`mb-8 ${copied ? "bg-green-500! shadow-green-500/30!" : ""}`}
          >
            {copied ? "✓ Copied to clipboard!" : "📋 Copy Link"}
          </Button>

          {/* Share Buttons */}
          <div className="mb-8">
            <p className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wide">Or share directly</p>
            <button 
                onClick={shareOnFacebook} 
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] text-white rounded-full font-medium hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
              >
              📘 Facebook
            </button>
          </div>

          {/* Preview Link */}
          <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
            <Link
              href={`/surprise/${id}`}
              className="inline-flex items-center justify-center gap-2 text-rose-500 hover:text-rose-600 font-bold transition-colors group"
            >
              👀 Preview your letter
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
            >
              ← Create another letter
            </Link>
          </div>
        </GlassCard>
      </div>
    </main>
  )
}

export default SuccessPage