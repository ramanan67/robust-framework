import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Eye, Lock, Scale, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Privacy = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="hover:border-secondary/30 transition-all duration-500 h-full">
                        <CardHeader className="flex flex-row items-center gap-6 border-b-0">
                            <div className="bg-secondary/10 p-4 rounded-2xl shadow-inner">
                                <Eye className="w-8 h-8 text-secondary" />
                            </div>
                            <div>
                                <CardTitle>Attribute Leakage</CardTitle>
                                <CardDescription>The Hidden Risk in Latent Space</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-text-muted leading-relaxed text-lg font-medium">
                                Standard ML models often learn correlations between utility tasks and sensitive attributes (e.g., gender, race). 
                                This leakage enables profiling and unauthorized inference from latent embeddings.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="hover:border-primary/30 transition-all duration-500 h-full">
                        <CardHeader className="flex flex-row items-center gap-6 border-b-0">
                            <div className="bg-primary/10 p-4 rounded-2xl shadow-inner">
                                <Scale className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Ethical Alignment</CardTitle>
                                <CardDescription>Fairness & Bias Mitigation</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-text-muted leading-relaxed text-lg font-medium">
                                By suppressing sensitive data, we reduce the model's reliance on biased correlations. 
                                This fosters fairer decision-making and aligns the AI with modern ethical standards.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="glass p-10 rounded-[3rem] border-secondary/20 relative overflow-hidden group shadow-[0_20px_50px_rgba(236,72,153,0.05)]"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                <h3 className="flex items-center text-3xl font-black text-text-main mb-6">
                    <Lock className="w-8 h-8 mr-4 text-secondary" />
                    Inverting Performance Metrics
                </h3>
                <p className="text-text-main/80 text-xl leading-relaxed max-w-4xl font-medium">
                    In privacy-preserving research, a <span className="text-secondary font-black">low prediction accuracy</span> for sensitive attributes is a quantitative <strong>success</strong>. 
                    It demonstrates that the representation has been successfully "blinded" to protected characteristics, ensuring absolute confidentiality.
                </p>
            </motion.div>
        </div>
    );
};

export default Privacy;
