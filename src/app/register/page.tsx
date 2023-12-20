'use client'
import { useContext, useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const user = await signUp({
                username: formData.email,
                password: formData.password,
                options: {
                    userAttributes: {
                        family_name: formData.lastName,
                        name: formData.firstName,
                        email: formData.email // Assurez-vous que l'email est bien inclus dans les attributs
                    }
                }
            });

            console.log('Sign up successful, User:', user);

            // Réinitialisez le formulaire
            setFormData({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                confirmPassword: ''
            });

            // Redirigez vers le tableau de bord
            router.push('/dashboard');


        } catch (error) {
            console.error('Error signing up:', error);
            setError((error as Error).message || 'Error signing up');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                <h2 className="text-3xl font-bold text-center">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className='flex gap-4'>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        onChange={handleInputChange}
                        className="border-2 rounded-lg px-3 py-2 border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        className="border-2 rounded-lg px-3 py-2 border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>
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
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    className="border-2 rounded-lg px-3 py-2 border-gray-200 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSignUp}
                    className="block bg-blue-500 text-white p-2 rounded-lg w-full"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;

