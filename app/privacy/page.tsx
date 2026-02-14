import Link from 'next/link'
import { FloatingHearts } from '@/components/ui'

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh relative flex flex-col items-center justify-center vintage-paper overflow-x-hidden p-6">
      <div className="fixed inset-0 vintage-vignette -z-10" />
      <FloatingHearts count={8} />

      <div className="max-w-2xl w-full bg-white/70 backdrop-blur-md p-8 md:p-12 border border-[#e2d5c3] shadow-xl animate-fade-in-up font-trio">
        <h1 className="text-3xl font-trio font-bold text-[#2c1810] mb-8 text-center border-b border-[#e2d5c3] pb-4">
          গোপনীয়তা নীতিমালা
        </h1>

        <div className="space-y-6 text-[#5c4d3c] leading-relaxed">
          <section>
            <p className="text-lg">
              <span className="font-bold text-[#2c1810]">প্রেমপত্র (Prempotro)</span> একটি ডিজিটাল মাধ্যম যা শুধুমাত্র ভালোবাসা ও শুভেচ্ছা বিনিময়ের জন্য তৈরি করা হয়েছে। আমাদের প্ল্যাটফর্ম ব্যবহার করার মাধ্যমে আপনি নিম্নলিখিত বিষয়গুলোতে সম্মত হচ্ছেন:
            </p>
          </section>

          <section className="bg-[#fdfaf0] p-6 border-l-4 border-[#8b0000]">
            <p className="font-medium italic">
              "আপনি যে টেক্সট বা ছবি দিয়ে চিঠি জেনারেট করবেন, সেগুলো আমাদের ডাটাবেসে সংরক্ষিত হবে। তাই অনুগ্রহ করে এমন কোনো সংবেদনশীল (Sensitive), ব্যক্তিগত (Personal) বা অনুপযুক্ত তথ্য ও ছবি এখানে ব্যবহার করবেন না।"
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-trio text-[#20100a] mb-3">আমরা কি তথ্য সংগ্রহ করি?</h2>
            <p>
              আপনি যখন একটি প্রেমপত্র তৈরি করেন, তখন আমরা আপনার নাম, আপনার প্রিয়জনের নাম, আপনার পাঠানো বার্তা এবং আপনার আপলোড করা ছবিগুলো সংগ্রহ করি। এই তথ্যগুলো শুধুমাত্র একটি ইউনিক লিঙ্ক তৈরি করার জন্য ব্যবহার করা হয়।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-trio text-[#20100a] mb-3">তথ্যের ব্যবহার</h2>
            <p>
              আমরা স্পষ্টভাবে জানাচ্ছি যে, আপনার দেওয়া কোনো তথ্য বা ছবি আমরা অন্য কোনো ক্ষেত্রে বা বাণিজ্যিক উদ্দেশ্যে ব্যবহার করব না। আপনার ব্যক্তিগত গোপনীয়তা রক্ষা করা আমাদের দায়িত্ব।
            </p>
          </section>

          <section className="bg-[#fff5f5] p-6 border border-red-100 italic">
            <p>
              আপনার যদি মনে হয় আপনার তথ্য ডাটাবেসে সংরক্ষিত হওয়ার ফলে আপনার গোপনীয়তা নষ্ট হতে পারে, তবে অনুগ্রহ করে প্রেমপত্র ব্যবহার করা থেকে বিরত থাকুন।
            </p>
          </section>

          <div className="pt-8 text-center">
            <Link 
              href="/" 
              className="inline-block px-8 py-3 bg-[#2c1810] text-[#f8f5f0] hover:bg-[#4a2e23] transition-colors tracking-widest text-sm font-bold uppercase"
            >
              ফিরে যান
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-[#5c4d3c]/60 text-xs font-inter tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Prempotro. All Rights Reserved.
      </footer>
    </main>
  )
}
