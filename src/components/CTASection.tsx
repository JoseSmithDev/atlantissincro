'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-atlantis-red to-atlantis-red-dark rounded-[2.5rem] p-12 md:p-20 text-center text-white shadow-2xl overflow-hidden relative"
        >
          {/* Wave decoration */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
              <path d="M0 200C240 100 480 300 720 200C960 100 1200 300 1440 200V400H0V200Z" fill="white" />
            </svg>
          </div>

          {/* Floating circles */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-white/10" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border border-white/5" />
          <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-white/5" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-14 h-14 mx-auto mb-6 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12c2-3 4-5 6-5s4 2 6 5 4 5 6 5 4-2 6-5" />
                <path d="M2 17c2-3 4-5 6-5s4 2 6 5 4 5 6 5 4-2 6-5" />
              </svg>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
            >
              ¿Lista/o para sumergirte?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-red-100 text-xl mb-10 leading-relaxed"
            >
              Ven a probar una clase gratis. Sin compromiso. Solo trae tu gorro, tus ganas y tu mejor sonrisa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/reservas"
                className="group inline-flex items-center gap-3 bg-white text-atlantis-red px-10 py-5 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Reserva tu prueba hoy
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
