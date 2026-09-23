import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { BrainCircuit, EyeOff, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Methodology = () => {
    const cards = [
        {
            title: "Robust Encoder",
            desc: "Feature Extraction Engine",
            icon: BrainCircuit,
            color: "indigo",
            content: "The raw input image is processed through a deep convolutional network to extract high-level semantic features. The encoder is trained with a dual objective: preserve utility while maximizing privacy entropy."
        },
        {
            title: "Latent Representation",
            desc: "The Privacy Bottleneck",
            icon: Zap,
            color: "pink",
            content: "The image is compressed into a latent vector representation. This vector is explicitly optimized to exclude sensitive information using adversarial learning techniques."
        },
        {
            title: "Utility Classifier",
            desc: "Target Task Performance",
            icon: ShieldCheck,
            color: "indigo",
            content: "This module takes the latent code and predicts the target attribute. We minimize the loss for this task to ensure the model remains highly useful for its intended purpose."
        },
        {
            title: "Privacy Adversary",
            desc: "Adversarial Suppression",
            icon: EyeOff,
            color: "pink",
            content: "An adversary attempts to predict sensitive attributes from the latent code. We use Gradient Reversal to punish the encoder if the adversary succeeds."
        }
    ];

    return (
        <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cards.map((card, idx) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="hover:border-white/20 transition-all duration-500 h-full">
                            <CardHeader className="flex flex-row items-center gap-6 border-b-0">
                                <div className={clsx(
                                    "p-4 rounded-2xl shadow-inner",
                                    card.color === 'indigo' ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                                )}>
                                    <card.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <CardTitle>{card.title}</CardTitle>
                                    <CardDescription>{card.desc}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text-muted leading-relaxed text-lg">
                                    {card.content}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-border/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    <CardContent className="p-12 text-center space-y-8 relative z-10">
                        <h3 className="text-4xl font-black text-text-main tracking-tight">Adversarial Minimax Game</h3>
                        <div className="inline-block p-6 rounded-3xl glass border-border/50 font-mono text-2xl text-primary shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                            Loss<sub>total</sub> = Loss<sub>utility</sub> - λ * Loss<sub>privacy</sub>
                        </div>
                        <p className="max-w-3xl mx-auto text-text-muted leading-relaxed text-lg font-medium">
                            The encoder minimizes the total loss by simultaneously improving utility accuracy 
                            and making it mathematically impossible for the privacy adversary to recover sensitive attributes.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

import { clsx } from 'clsx';
export default Methodology;
