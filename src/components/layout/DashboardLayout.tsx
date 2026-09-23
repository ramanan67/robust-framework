import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { Button } from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    BrainCircuit,
    BarChart3,
    ShieldAlert,
    Info,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Methodology', path: '/methodology', icon: BrainCircuit },
        { label: 'Evaluation', path: '/results', icon: BarChart3 },
        { label: 'Privacy & Ethics', path: '/privacy', icon: ShieldAlert },
        { label: 'About', path: '/about', icon: Info },
    ];

    return (
        <div className="flex h-screen bg-background relative overflow-hidden">
            {/* Background Mesh Gradients */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full hidden dark:block"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full hidden dark:block"></div>
            </motion.div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarCollapsed ? 88 : 288 }}
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 glass border-r transform transition-all duration-300 md:relative md:translate-x-0 m-4 rounded-3xl",
                    isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-[calc(100%+2rem)] md:translate-x-0"
                )}
            >
                <div className="h-full flex flex-col p-4">
                    {/* Sidebar Header */}
                    <div className="h-16 flex items-center px-4 mb-8 justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <motion.div 
                                whileHover={{ rotate: 180 }}
                                className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg shrink-0" 
                            />
                            {!isSidebarCollapsed && (
                                <motion.span 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-bold text-2xl tracking-tight text-text-main whitespace-nowrap"
                                >
                                    PrivacyAI
                                </motion.span>
                            )}
                        </div>
                        <button 
                            className="hidden md:flex p-1.5 glass rounded-lg text-text-muted hover:text-text-main transition-colors"
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        >
                            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </button>
                        <button className="md:hidden text-text-muted" onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar px-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        "flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all group relative",
                                        isActive
                                            ? "bg-white/10 text-text-main shadow-lg border border-white/10"
                                            : "text-text-muted hover:bg-white/5 hover:text-text-main"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Icon className={clsx("h-5 w-5 shrink-0 transition-colors", isActive ? "text-primary" : "text-text-muted group-hover:text-text-main")} />
                                    {!isSidebarCollapsed && (
                                        <motion.span 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="ml-3 whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                    {isActive && (
                                        <motion.div 
                                            layoutId="active-pill"
                                            className="absolute left-[-4px] w-1 h-6 bg-primary rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="pt-6 border-t border-white/5">
                        <div className={clsx("flex items-center mb-6 px-2", isSidebarCollapsed ? "justify-center" : "justify-start")}>
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-indigo-700 flex items-center justify-center text-text-main font-bold shrink-0 shadow-lg">
                                {user?.username.charAt(0).toUpperCase()}
                            </div>
                            {!isSidebarCollapsed && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="ml-4 flex-1 min-w-0"
                                >
                                    <p className="text-sm font-semibold text-text-main truncate">{user?.username}</p>
                                    <p className="text-xs text-text-muted truncate">{user?.email}</p>
                                </motion.div>
                            )}
                        </div>
                        <Button 
                            variant="ghost" 
                            className={clsx("w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl px-3", isSidebarCollapsed && "justify-center")} 
                            onClick={logout}
                        >
                            <LogOut className={clsx("h-4 w-4", !isSidebarCollapsed && "mr-3")} />
                            {!isSidebarCollapsed && <span>Sign Out</span>}
                        </Button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
                {/* Header */}
                <header className="h-20 flex items-center justify-between px-8 glass-card m-4 mb-0 border bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 text-text-muted hover:text-text-main glass rounded-lg"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-text-main tracking-tight">
                                {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                            </h1>
                            <p className="text-xs text-text-muted font-medium">Robust Representation Learning</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <motion.div 
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                        >
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Privacy Guard Active</span>
                        </motion.div>
                    </div>
                </header>

                {/* Content Scroller */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    <motion.div 
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="max-w-5xl mx-auto"
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
