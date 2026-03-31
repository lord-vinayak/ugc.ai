import { useRef } from 'react';
import { featuresData } from '../assets/dummy-data';
import Title from './Title';
import { motion } from 'framer-motion';

export default function Features() {
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    return (
        <section id="features" className="py-20 2xl:py-32">
            <div className="max-w-6xl mx-auto px-4">

                <Title
                    title="Features"
                    heading="Engineered for Impact"
                    description="Our AI instantly produces professional lifestyle imagery and short-form videos optimized for high conversion rates."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6">
                    {featuresData.map((feature, i) => (
                        <motion.div
                            ref={(el) => {
                                refs.current[i] = el;
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 + i * 0.1 }}
                            key={i}
                            className={`rounded-3xl p-8 glass-panel relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)] hover:border-white/20 flex flex-col justify-between ${
                                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                            } ${i === 1 ? 'bg-gradient-to-br from-white/5 to-primary/10' : ''} ${i === 2 ? 'bg-gradient-to-tr from-white/5 to-secondary/10' : ''}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {i === 0 && (
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-500" />
                            )}
                            
                            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-inner backdrop-blur-md">
                                {feature.icon}
                            </div>
                            
                            <div className="relative z-10 mt-auto">
                                <h3 className={`font-semibold mb-3 tracking-wide ${i === 0 ? 'text-3xl' : 'text-xl'}`}>{feature.title}</h3>
                                <p className={`text-gray-400 leading-relaxed ${i === 0 ? 'text-lg max-w-md' : 'text-sm'}`}>
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};