"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      monthly: 0,
      annual: 0,
      features: [
        "2 daily modules",
        "Parent dashboard",
        "Weekly progress summaries",
        "1 child profile"
      ],
      isPopular: false
    },
    {
      name: "Family",
      monthly: 799,
      annual: 639,
      features: [
        "Unlimited learning games",
        "Full SynaptiX analytics",
        "On-device emotion detection",
        "3 child profiles",
        "Direct therapist sharing"
      ],
      isPopular: true
    },
    {
      name: "Clinical",
      monthly: 1999,
      annual: 1599,
      features: [
        "All Family + Multi-therapist",
        "Verified ATEC/SRS reports",
        "Live webcam telemetry stream",
        "Clinical registry export"
      ],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="font-dm-sans text-[#4F46E5] font-semibold mb-3 block text-lg bg-indigo-50 px-4 py-1.5 rounded-full inline-block border border-indigo-100">
              Transparent Access
            </span>
            <h2 className="font-nunito font-bold text-3xl md:text-[38px] text-[#0F172A]">
              Start Free. Scale With Your Child.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl items-center relative z-10 mt-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className={`clay-card p-8 flex flex-col relative transition-all duration-300 border-2 ${plan.isPopular
                    ? "bg-gradient-to-br from-[#6366F1] to-[#06B6D4] border-white/40 md:scale-105 shadow-[0_20px_40px_rgba(99,102,241,0.25)] z-20"
                    : "bg-white/75 border-indigo-50 z-10"
                  }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#4F46E5] font-nunito font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md border border-indigo-100 flex items-center gap-1">
                    <Star size={12} fill="currentColor" className="text-[#F59E0B]" /> Most Popular
                  </div>
                )}

                <h3 className={`font-nunito font-bold text-xl mb-4 ${plan.isPopular ? "text-white" : "text-[#0F172A]"}`}>
                  {plan.name}
                </h3>

                <div className={`flex items-baseline gap-1 mb-8 ${plan.isPopular ? "text-white" : "text-[#0F172A]"}`}>
                  <div className="w-full font-sora font-bold text-2xl tracking-tight">
                    Launching soon
                  </div>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-center gap-3 font-dm-sans ${plan.isPopular ? "text-white/95" : "text-[#0F172A]"}`}>
                      <span className={plan.isPopular ? "text-white" : "text-[#6366F1] font-bold"}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link href="/dashboard" className="w-full">
                  <button className={`w-full py-3 rounded-2xl font-bold transition-all duration-150 ${plan.isPopular
                      ? "bg-white text-[#4F46E5] hover:bg-white/90 hover:scale-[1.02] active:scale-95 shadow-[0_4px_0_rgba(255,255,255,0.3)] font-nunito"
                      : "clay-btn-primary"
                    }`}>
                    {plan.name === "Starter" ? "Join Waitlist" : "Pre-Register"}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="mt-12 text-center text-[#64748B] font-dm-sans text-sm">
            No credit card required for Starter. Cancel anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
