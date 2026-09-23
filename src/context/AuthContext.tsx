import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, username: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
                const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);

                if (foundUser) {
                    const authUser = { id: foundUser.id, username: foundUser.username, email: foundUser.email };
                    setUser(authUser);
                    localStorage.setItem('user', JSON.stringify(authUser));
                    resolve();
                } else if (password === 'password') {
                    // Fallback for demo purposes
                    const mockUser = { id: '1', username: email.split('@')[0], email };
                    setUser(mockUser);
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    resolve();
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 500);
        });
    };

    const register = async (email: string, password: string, username: string) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
                const newUser = { id: Date.now().toString(), email, password, username };
                storedUsers.push(newUser);
                localStorage.setItem('registered_users', JSON.stringify(storedUsers));
                console.log('Registered successfully:', email);
                resolve();
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
