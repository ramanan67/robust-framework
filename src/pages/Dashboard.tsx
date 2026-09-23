import React, { useState, useCallback } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Upload, 
    ShieldCheck, 
    Lock, 
    CheckCircle2, 
    AlertTriangle, 
    Image as ImageIcon, 
    Sparkles,
    Activity,
    Fingerprint
} from 'lucide-react';
import { clsx } from 'clsx';

interface PredictionResult {
    utility_prediction: string;
    privacy_prediction: string;
    privacy_note: string;
}

const Dashboard = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [privacyLevel, setPrivacyLevel] = useState<'Low' | 'Medium' | 'High'>('High');
    const [isDragging, setIsDragging] = useState(false);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setResult(null);
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResult(null);
        }
    };

    const handlePredict = async () => {
        if (!file) return;
        setIsUploading(true);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/predict`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error(`Backend Error: ${response.statusText}`);
            const data = await response.json();
            
            // Artificial delay to show premium loader
            await new Promise(r => setTimeout(r, 1500));
            setResult(data);
        } catch (error) {
            console.error("Inference Error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Privacy Level Toggle */}
            <div className="flex justify-center">
                <div className="glass p-1 rounded-2xl flex items-center gap-1 border-border/50">
                    {['Low', 'Medium', 'High'].map((level) => (
                        <button
                            key={level}
                            onClick={() => setPrivacyLevel(level as any)}
                            className={clsx(
                                "px-6 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest relative z-10",
                                privacyLevel === level ? "text-text-main" : "text-text-muted hover:text-text-main"
                            )}
                        >
                            {privacyLevel === level && (
                                <motion.div 
                                    layoutId="privacy-bg"
                                    className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-xl -z-10 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                />
                            )}
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Upload Hero Card */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Card 
                    className={clsx(
                        "relative overflow-hidden group transition-all duration-500",
                        isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-white/20 bg-surface"
                    )}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <CardContent className="flex flex-col items-center justify-center py-20 relative z-10">
                        <motion.div 
                            animate={isDragging ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
                            className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-[2.5rem] flex items-center justify-center mb-8 border border-primary/20 shadow-2xl relative"
                        >
                            <Upload className={clsx("w-10 h-10 transition-colors duration-300", isDragging ? "text-text-main" : "text-primary")} />
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 group-hover:blur-3xl transition-all"></div>
                        </motion.div>

                        <h3 className="text-3xl font-bold text-text-main mb-4 tracking-tight">Secure Inference Portal</h3>
                        <p className="text-text-muted text-center max-w-lg mb-10 leading-relaxed text-lg px-4">
                            Drag and drop or select a face image to extract high-utility features while <span className="text-primary font-semibold">suppressing sensitive attributes</span>.
                        </p>

                        <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
                            <label className="w-full group/btn relative cursor-pointer">
                                <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="hidden" />
                                <div className="flex items-center justify-center gap-3 w-full px-8 py-5 glass border-border rounded-3xl text-lg font-bold text-text-main group-hover/btn:bg-white/5 transition-all group-hover/btn:border-white/20 active:scale-[0.98]">
                                    <ImageIcon className="w-6 h-6 text-primary" />
                                    {file ? file.name : 'Select Image'}
                                </div>
                            </label>

                            <AnimatePresence>
                                {file && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="w-full"
                                    >
                                        <Button
                                            onClick={handlePredict}
                                            className="w-full text-xl py-6 rounded-3xl btn-gradient group relative overflow-hidden"
                                            isLoading={isUploading}
                                        >
                                            <span className="relative z-10 flex items-center gap-3">
                                                {isUploading ? 'Securing Identity...' : 'Execute Privacy-Preserving Inference'}
                                                {!isUploading && <Sparkles size={20} />}
                                            </span>
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, type: "spring" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-10"
                    >
                        {/* Utility Prediction Card */}
                        <Card className="glass-card group hover:translate-y-[-4px] transition-transform duration-500 overflow-hidden relative border-primary/20 shadow-[0_0_40px_rgba(99,102,241,0.05)]">
                            <div className="absolute top-0 right-0 p-6">
                                <Activity className="w-12 h-12 text-primary opacity-20" />
                            </div>
                            <CardContent className="p-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <CheckCircle2 className="text-primary w-5 h-5" />
                                    <h4 className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Utility Prediction</h4>
                                </div>
                                <div className="flex items-baseline gap-4 mb-8">
                                    <span className="text-6xl font-black text-text-main tracking-tighter">{result.utility_prediction}</span>
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                                        <ShieldCheck size={12} />
                                        92% CONFIDENCE
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-full bg-white/5 rounded-full h-2 border border-border/50 overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "92%" }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="bg-primary h-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                                        />
                                    </div>
                                    <p className="text-text-muted text-sm leading-relaxed font-medium">
                                        High-accuracy task performance maintained through robust latent feature preservation.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sensitive Protection Card */}
                        <Card className="glass-card group hover:translate-y-[-4px] transition-transform duration-500 overflow-hidden relative border-secondary/20 shadow-[0_0_40px_rgba(236,72,153,0.05)]">
                            <div className="absolute top-0 right-0 p-6">
                                <Lock className="w-12 h-12 text-secondary opacity-20" />
                            </div>
                            <CardContent className="p-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Fingerprint className="text-secondary w-5 h-5" />
                                    <h4 className="text-sm font-bold text-secondary uppercase tracking-[0.2em]">Sensitive Protection</h4>
                                </div>
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-4xl font-black text-text-main/40 blur-[2px] transition-all hover:blur-0 cursor-help" title="Sensitive data was suppressed">
                                        {result.privacy_prediction}
                                    </span>
                                    <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-black text-emerald-400 uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                        Fully Protected
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/10 border border-secondary/20">
                                    <AlertTriangle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                    <p className="text-sm text-text-main font-medium italic opacity-90 leading-relaxed">
                                        {result.privacy_note}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Animation Background */}
            <AnimatePresence>
                {result && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none z-0 hidden dark:block"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
