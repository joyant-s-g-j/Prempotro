"use client"
import React, { useRef, useState } from 'react'

interface PhotoUploadProps {
  label: string;
  files: File[];
  previews: string[];
  maxFiles?: number;
  onFilesChange: (files: File[]) => void;
  onRemove: (index: number) => void;
  required?: boolean;
}

const PhotoUpload = ({ 
    label, 
    files, 
    previews, 
    maxFiles = 5, 
    onFilesChange,
    onRemove,
    required 
}: PhotoUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (!e.dataTransfer.files) return;
        const droppedFiles = Array.from(e.dataTransfer.files);
        onFilesChange(droppedFiles);
    };

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFilesChange(Array.from(e.target.files));
        }
    };
  return (
    <div className="group relative">
      <label className="block text-lg font-trio font-semibold text-rose-800/80 mb-1.5 transition-colors group-focus-within:text-rose-600">
        {label} 
        {required && <span className="ml-1 text-rose-500">*</span>}
        <span className="ml-2 text-xs text-rose-400 font-medium bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 font-trio">
          সর্বোচ্চ {maxFiles}টি ছবি (JPEG/PNG)
        </span>
      </label>

      <div 
        onClick={() => files.length < maxFiles && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center gap-4 p-8
          bg-white/70 backdrop-blur-sm 
          border-2 border-dashed
          rounded-3xl cursor-pointer
          transition-all duration-300
          hover:bg-white hover:border-rose-400 hover:scale-[1.01]
          group-hover:shadow-[0_10px_30px_-10px_rgba(255,45,117,0.1)]
          ${isDragging ? 'border-rose-500 bg-rose-50 scale-[1.02]' : 'border-rose-200'}
          ${files.length >= maxFiles ? 'opacity-60 cursor-not-allowed border-gray-200' : ''}
        `}
      >
        <input 
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handleSelect}
          disabled={files.length >= maxFiles}
        />
        
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-rose-100 to-pink-50 flex items-center justify-center text-4xl shadow-inner">
          📸
        </div>
        
        <div className="text-center space-y-1">
          <p className="font-semibold text-rose-900 text-lg font-trio">
            {files.length >= maxFiles ? "সীমা পূর্ণ হয়েছে!" : "এখানে ছবিগুলো রাখুন"}
          </p>
          <p className="text-sm text-rose-400 font-medium font-trio">
            অথবা ব্রাউজ করতে ক্লিক করুন
          </p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-4 animate-fade-in-up">
          {previews.map((src, idx) => (
            <div key={idx} className="group/preview relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white hover:shadow-xl hover:scale-105 transition-all duration-300">
              <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
                className="absolute top-2 right-2 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity hover:bg-rose-600 shadow-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PhotoUpload