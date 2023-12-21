'use client'

import NavBar from '@/components/dashboard/NavBar';
import { Title, Text } from '@tremor/react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

interface UserAttributes {
    firstName: string;
    lastName: string;
    email: string;
}

const TodoPage = () => {
    const [user, setUser] = useState<UserAttributes>({
        firstName: '',
        lastName: '',
        email: '',
    });

    async function fetchCurrentUser() {
        try {
            const userAttributes = await fetchUserAttributes();
            console.log('User attributes:', userAttributes);
            if (!userAttributes) {
                return;
            }
            const firstName = userAttributes?.name ?? '';
            const lastName = userAttributes?.family_name ?? '';
            const email = userAttributes?.email ?? '';
            setUser({ firstName, lastName, email });
        } catch (err) {
            console.error('Error fetching current user:', err);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);
    return (
        <>
            <NavBar user={user} />
            <div className='p-4 md:p-10 mx-auto max-w-7xl'>
                <Title>Nasa API</Title>
                <Text>Vous trouverez les informations de la Nasa</Text>
            </div>
        </>
    );
};

export default TodoPage;