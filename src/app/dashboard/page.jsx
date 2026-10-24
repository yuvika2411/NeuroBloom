"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../lib/animations";
import { Sparkles, Users, User } from "lucide-react";

export default function DashboardSelector() {
  return (
    <main className="min-h-screen bg-[#F4F6FC] dot-grid flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#6366F1]/15 blob-bg blur-3xl z-0 pointer-events-none" />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#06B6D4]/15 blob-bg blur-3xl z-0 pointer-events-none"
        style={{ animationDirection: "reverse", animationDuration: "25s" }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp} className="mb-12">
          <span className="text-4xl mb-4 flex justify-center text-[#6366F1]">
            <Sparkles size={44} className="text-[#6366F1]" />
          </span>
          <h1 className="font-nunito font-extrabold text-4xl md:text-5xl text-[#0F172A] mb-4">
            Who is using SynaptiX today?
          </h1>
          <p className="font-dm-sans text-lg text-[#64748B]">
            Select your dashboard view to continue to SynaptiX.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
          {/* Parent Dashboard Card */}
          <motion.div variants={fadeUp}>
            <Link href="/dashboard/parent" className="block h-full group">
              <div className="clay-card bg-white/75 hover:bg-white p-8 h-full flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.22)] border-2 group-hover:border-[#6366F1]/40">
                <div className="w-20 h-20 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-2xl flex items-center justify-center text-4xl shadow-lg border-2 border-white/50 text-white">
                  <Users size={38} />
                </div>
                <div>
                  <h2 className="font-nunito font-bold text-2xl text-[#0F172A] mb-1">Parent View</h2>
                  <p className="font-dm-sans text-sm text-[#64748B]">Track progress, live telemetry, reports, and settings.</p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Child Dashboard Card */}
          <motion.div variants={fadeUp}>
            <Link href="/dashboard/child" className="block h-full group">
              <div className="clay-card bg-white/75 hover:bg-white p-8 h-full flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(6,182,212,0.22)] border-2 group-hover:border-[#06B6D4]/40">
                <div className="w-20 h-20 bg-gradient-to-br from-[#06B6D4] to-[#38BDF8] rounded-2xl flex items-center justify-center text-4xl shadow-lg border-2 border-white/50 text-white">
                  <User size={38} />
                </div>
                <div>
                  <h2 className="font-nunito font-bold text-2xl text-[#0F172A] mb-1">Child View</h2>
                  <p className="font-dm-sans text-sm text-[#64748B]">Play therapy games, earn stars, and complete modules.</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-12">
          <Link href="/" className="font-dm-sans font-bold text-[#64748B] hover:text-[#6366F1] transition-colors">
            ← Back to SynaptiX Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
