import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Glow Effect */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 blur-[120px] rounded-full animate-pulse hidden dark:block"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 blur-[120px] rounded-full animate-pulse delay-1000 hidden dark:block"></div>

            <Card className="w-full max-w-md relative z-10">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-black">Welcome Back</CardTitle>
                    <CardDescription className="text-text-muted">Enter your credentials to access the dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <Button type="button" className="w-full" isLoading={isLoading} onClick={handleSubmit}>
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-white/5 p-6 mt-4">
                    <p className="text-sm text-text-muted">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary font-bold hover:underline">
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
