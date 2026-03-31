import { ArrowRightIcon } from 'lucide-react';
import { PrimaryButton } from './Buttons';
import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section className="py-20 2xl:pb-32 px-4 relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent blur-[100px] -z-10 pointer-events-none" />
            
            <div className="container mx-auto max-w-4xl">
                <div className="glass-panel rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border-t border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.15)] bg-gradient-to-b from-white/5 to-transparent">
                    {/* Inner glowing orb */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/30 rounded-full blur-[80px] -z-10 mix-blend-screen" />
                    
                    <div className="relative z-10">
                        <motion.h2 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                        >
                            Ready to Transform Your Content?
                        </motion.h2>
                        <motion.p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
                        >
                            Join thousands of progressive brands generating viral UGC with AI. No credit card required. Start creating now.
                        </motion.p>
                        <motion.div
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                        >
                            <PrimaryButton className="px-10 py-4 text-lg">
                                Start Generating <ArrowRightIcon size={20} className="ml-2" />
                            </PrimaryButton>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};