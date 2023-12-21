'use client'
import { useState, useContext } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignIn = async () => {
        try {
            const user = await signIn({
                username: formData.email,
                password: formData.password,
            });

            console.log('Sign in successful, User:', user);
            if (user) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError((error as Error).message || 'Error signing in');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                <h2 className="text-3xl font-bold text-center">Sign In</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    className="border-2 rounded-lg px-3 py-2 border-gray-200 focus:outline-none focus:border-blue-500"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    className="border-2 rounded-lg px-3 py-2 border-gray-200 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSignIn}
                    className="block bg-blue-500 text-white p-2 rounded-lg w-full"
                >
                    Sign In
                </button>

                <div className=''>
                    <p className="text-center">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
