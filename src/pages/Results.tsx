import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    AreaChart, Area, BarChart, Bar, Cell, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Activity, BrainCircuit } from 'lucide-react';
import { clsx } from 'clsx';

const accuracyData = [
    { epoch: 1, utility: 65, privacy: 95 },
    { epoch: 5, utility: 78, privacy: 88 },
    { epoch: 10, utility: 85, privacy: 75 },
    { epoch: 15, utility: 89, privacy: 65 },
    { epoch: 20, utility: 91, privacy: 55 },
    { epoch: 25, utility: 92.4, privacy: 50.2 },
];

const sensitiveData = [
    { name: 'Identity', suppressed: 98, leakage: 2 },
    { name: 'Gender', suppressed: 95, leakage: 5 },
    { name: 'Age', suppressed: 88, leakage: 12 },
    { name: 'Emotion', suppressed: 92, leakage: 8 },
];

const Results = () => {
    return (
        <div className="flex flex-col gap-10 pb-20">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Utility Accuracy" 
                    value="92.4%" 
                    icon={Activity} 
                    trend="+2.1% vs baseline" 
                    color="indigo" 
                    delay={0}
                />
                <StatCard 
                    title="Privacy Guard" 
                    value="99.8%" 
                    icon={ShieldCheck} 
                    trend="Maximum Suppression" 
                    color="emerald" 
                    delay={0.1}
                />
                <StatCard 
                    title="Model Robustness" 
                    value="95.1%" 
                    icon={BrainCircuit} 
                    trend="Adversarial Resistance" 
                    color="pink" 
                    delay={0.2}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Accuracy Evolution Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="glass-card overflow-hidden">
                        <CardHeader className="border-b border-border/50">
                            <CardTitle className="flex items-center gap-3">
                                <TrendingUp className="w-6 h-6 text-primary" />
                                Training Convergence
                            </CardTitle>
                            <CardDescription>Accuracy evolution over training epochs</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-10 h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={accuracyData}>
                                    <defs>
                                        <linearGradient id="colorUtility" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorPrivacy" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis 
                                        dataKey="epoch" 
                                        stroke="var(--text-muted)" 
                                        fontSize={12} 
                                        tickLine={false} 
                                        axisLine={false} 
                                        label={{ value: 'Epochs', position: 'insideBottom', offset: -10, fill: 'var(--text-muted)' }}
                                    />
                                    <YAxis 
                                        stroke="var(--text-muted)" 
                                        fontSize={12} 
                                        tickLine={false} 
                                        axisLine={false} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                                            borderRadius: '16px', 
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            backdropFilter: 'blur(10px)',
                                            color: '#fff'
                                        }}
                                    />
                                    <Legend verticalAlign="top" height={36}/>
                                    <Area 
                                        type="monotone" 
                                        dataKey="utility" 
                                        name="Utility Accuracy"
                                        stroke="#6366F1" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorUtility)" 
                                        animationDuration={2000}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="privacy" 
                                        name="Adversarial Leakage"
                                        stroke="#ec4899" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorPrivacy)" 
                                        animationDuration={2500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Attribute Suppression Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="glass-card overflow-hidden">
                        <CardHeader className="border-b border-border/50">
                            <CardTitle className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                Attribute Suppression
                            </CardTitle>
                            <CardDescription>Privacy protection level by sensitive category</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-10 h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sensitiveData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="name" 
                                        type="category" 
                                        stroke="var(--text-main)" 
                                        fontSize={14} 
                                        fontWeight="bold"
                                        width={100}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                                            borderRadius: '16px', 
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#fff'
                                        }}
                                    />
                                    <Bar dataKey="suppressed" name="Suppression %" radius={[0, 10, 10, 0]} barSize={32}>
                                        {sensitiveData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#34d399'} fillOpacity={0.8} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Inverting Metrics Insight */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
                    <CardContent className="p-8 flex items-center gap-6 text-emerald-400/90">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-emerald-400 mb-2">Evaluation Benchmark Result</h4>
                            <p className="text-text-muted leading-relaxed font-medium">
                                The model has passed the <span className="text-emerald-400">Robustness Safety Check</span>. 
                                Utility accuracy is within 2% of the uncompressed baseline, while sensitive attribute leakage remains at random-guessing levels (50% binary accuracy).
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, trend, color, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
    >
        <Card className="glass-card group hover:translate-y-[-4px] transition-all duration-300">
            <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <div className={clsx(
                        "p-3 rounded-xl",
                        color === 'indigo' ? "bg-primary/10 text-primary" : 
                        color === 'emerald' ? "bg-emerald-500/10 text-emerald-400" : 
                        "bg-pink-500/10 text-pink-400"
                    )}>
                        <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{trend}</span>
                </div>
                <h4 className="text-text-muted text-sm font-bold uppercase tracking-widest mb-1">{title}</h4>
                <div className="text-4xl font-black text-text-main tracking-tighter">{value}</div>
            </CardContent>
        </Card>
    </motion.div>
);

export default Results;
