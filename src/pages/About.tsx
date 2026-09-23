import { Card, CardContent } from '../components/ui/Card';
import { Code2, Database, Layers, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const About = () => {
    return (
        <div className="flex flex-col gap-12">
            {/* Project Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-white/[0.01] border-border/50">
                    <CardContent className="p-10">
                        <p className="text-text-main/80 leading-relaxed text-2xl font-medium tracking-tight">
                            This project demonstrates a <span className="text-primary font-bold">multi-objective autoencoder</span> approach to privacy-preserving machine learning. 
                            By training an encoder to maximize utility while simultaneously minimizing adversarial inference, we create robust representations that protect user identity at the source.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Tech Stack */}
            <div className="space-y-8">
                <h2 className="text-3xl font-black text-text-main px-2 tracking-tight">Technology Stack</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StackCard icon={Code2} title="Frontend" desc="React + TS (Vite)" color="indigo" index={0} />
                    <StackCard icon={Layers} title="Backend" desc="FastAPI (Python)" color="pink" index={1} />
                    <StackCard icon={Database} title="Dataset" desc="CelebA Faces" color="indigo" index={2} />
                    <StackCard icon={ShieldCheck} title="ML Model" desc="PyTorch Adversarial" color="pink" index={3} />
                </div>
            </div>

            {/* Future Scope */}
            <div className="space-y-8 pb-10">
                <h2 className="text-3xl font-black text-text-main px-2 tracking-tight">Future Scope</h2>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass p-10 rounded-[3rem] border-border/50 shadow-2xl"
                >
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FutureItem title="Multi-Attribute Protection" desc="Extending suppression to race, age, and identity markers simultaneously." />
                        <FutureItem title="Federated Learning" desc="Training encoders on-device to ensure zero data centralization." />
                        <FutureItem title="Healthcare Integration" desc="Anonymizing patient identity in medical imaging diagnosis workflows." />
                        <FutureItem title="Surveillance Privacy" desc="Privacy-preserving behavioral analysis for public camera feeds." />
                    </ul>
                </motion.div>
            </div>

            <footer className="text-center text-text-muted text-sm pb-10 border-t border-border/50 pt-10">
                © 2026 Robust PrivacyAI Project. Engineered for Confidentiality.
            </footer>
        </div>
    );
};

const StackCard = ({ icon: Icon, title, desc, color, index }: { icon: any, title: string, desc: string, color: 'indigo' | 'pink', index: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
    >
        <div className="glass p-8 rounded-3xl border-border/50 flex flex-col items-center text-center hover:scale-105 hover:bg-white/[0.04] transition-all duration-500 group shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <div className={clsx(
                "p-4 rounded-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500",
                color === 'indigo' ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
            )}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight">{title}</h3>
            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">{desc}</p>
        </div>
    </motion.div>
);

const FutureItem = ({ title, desc }: { title: string, desc: string }) => (
    <li className="flex gap-5 group">
        <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:scale-150 transition-transform duration-300"></div>
        <div className="space-y-2">
            <h4 className="text-xl font-bold text-text-main tracking-tight">{title}</h4>
            <p className="text-base text-text-muted leading-relaxed font-medium">{desc}</p>
        </div>
    </li>
);

export default About;
