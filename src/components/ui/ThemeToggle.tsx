import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { clsx } from 'clsx';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="group relative flex h-10 w-20 items-center rounded-full glass border-border p-1 transition-all duration-500 hover:border-primary/50"
            title="Switch Theme"
        >
            {/* Sliding Knob */}
            <motion.div
                className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg"
                animate={{
                    x: theme === 'dark' ? 40 : 0,
                    rotate: theme === 'dark' ? 360 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 0.3
                }}
            >
                {theme === 'dark' ? (
                    <Moon size={16} fill="white" />
                ) : (
                    <Sun size={16} fill="white" />
                )}
            </motion.div>

            {/* Icons Background */}
            <div className="flex w-full items-center justify-around text-text-muted transition-colors">
                <Sun size={14} className={clsx(theme === 'light' ? 'opacity-0' : 'opacity-100')} />
                <Moon size={14} className={clsx(theme === 'dark' ? 'opacity-0' : 'opacity-100')} />
            </div>

            {/* Subtle Glow */}
            <div className={clsx(
                "absolute inset-0 rounded-full blur-md transition-opacity duration-500 -z-10",
                theme === 'dark' ? 'bg-primary/20 opacity-100' : 'bg-primary/5 opacity-0'
            )}></div>
        </button>
    );
};

export default ThemeToggle;
