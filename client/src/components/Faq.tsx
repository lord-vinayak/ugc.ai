import { ChevronDownIcon } from 'lucide-react';
import Title from './Title';
import { faqData } from '../assets/dummy-data';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function Faq() {
    const refs = useRef<(HTMLDetailsElement | null)[]>([]);
    return (
        <section id="faq" className="py-20 2xl:py-32">
            <div className="max-w-3xl mx-auto px-4">

                <Title
                    title="FAQ"
                    heading="Clear Answers"
                    description="Everything you need to know about using the platform. If you have any questions, feel free to contact us."
                />

                <div className="space-y-3">
                    {faqData.map((faq, i) => (
                        <motion.details
                            ref={(el) => {
                                refs.current[i] = el;
                            }}
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 + i * 0.1 }}
                            key={i}
                            onAnimationComplete={() => {
                                const card = refs.current[i];
                                if (card) {
                                    card.classList.add("transition", "duration-300");
                                }
                            }}
                            className="group glass-panel rounded-2xl select-none mb-4 overflow-hidden border border-white/10 transition-all hover:bg-white/10 hover:border-white/20"
                        >
                            <summary className="flex items-center justify-between p-6 cursor-pointer outline-none">
                                <h4 className="font-semibold text-lg tracking-wide">{faq.question}</h4>
                                <ChevronDownIcon className="w-5 h-5 text-primary group-open:rotate-180 transition-transform duration-300" />
                            </summary>
                            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                                <p className="pt-4">{faq.answer}</p>
                            </div>
                        </motion.details>
                    ))}
                </div>
            </div>
        </section>
    );
};