'use client'

import { fetchAuthSession } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';
import React, { useEffect, useState } from 'react';
import { Title, Text } from '@tremor/react';

// Définir une interface pour les attributs utilisateur
interface UserAttributes {
    firstName: string;
    lastName: string;
}

const DashboardBody = () => {
    const [user, setUser] = useState<UserAttributes>({ firstName: '', lastName: '' });

    async function fetchCurrentUser() {
        try {
            const userAttributes = await fetchUserAttributes();
            console.log('User attributes:', userAttributes);
            if (!userAttributes) {
                return;
            }
            const firstName = userAttributes?.name ?? '';
            const lastName = userAttributes?.family_name ?? '';
            setUser({ firstName, lastName });
        } catch (err) {
            console.error('Error fetching current user:', err);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <div className='p-4 md:p-10 mx-auto max-w-7xl'>
            <Title>Bienvenu {user.firstName} {user.lastName} sur votre Dashboard</Title>
            <Text>Vous pouvez commencer à utiliser votre application.</Text>
        </div>
    );
};

export default DashboardBody;
