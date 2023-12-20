'use client'
import React, { useState } from 'react';
import { signUp, confirmSignUp, autoSignIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
        confirmationCode: ''
    });
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await signUp({
                username: formData.email,
                password: formData.password,
                options: {
                    userAttributes: {
                        family_name: formData.lastName,
                        name: formData.firstName,
                        email: formData.email
                    },
                    autoSignIn: true
                },
            });
            console.log('Sign up successful with following data:', formData);

            setShowConfirmationModal(true);
        } catch (error) {
            console.error('Error signing up:', error);
            setError((error as Error).message || 'Error signing up');
        }
    };

    const handleSignUpConfirmation = async () => {
        try {
            await confirmSignUp({
                username: formData.email,
                confirmationCode: formData.confirmationCode
            });

            await handleAutoSignIn();
        } catch (error) {
            console.error('Error confirming sign up', error);
            setError((error as Error).message || 'Error confirming sign up');
        }
    };

    async function handleAutoSignIn() {
        try {
            const signInOutput = await autoSignIn();
            console.log('Auto sign-in successful:', signInOutput);
            setShowConfirmationModal(false);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error during auto sign-in:', error);
            setError((error as Error).message || 'Error during auto sign-in');
        }
    }

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

            {showConfirmationModal && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded">
                        <h3 className="text-lg font-bold">Confirm Sign Up</h3>
                        <input
                            name="confirmationCode"
                            type="text"
                            placeholder="Confirmation Code"
                            value={formData.confirmationCode}
                            onChange={handleInputChange}
                            className="border-2 rounded-lg px-3 py-2 border-gray-200 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={handleSignUpConfirmation}
                            className="mt-3 block bg-blue-500 text-white p-2 rounded-lg w-full"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
