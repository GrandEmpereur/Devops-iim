'use client'

// import { Auth } from 'aws-amplify';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/app/register/page';
import { App } from '@/components/withAuthenticator';

export default function Home() {

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <LoginForm />
        </div>
    );
}
