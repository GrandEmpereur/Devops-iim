'use client'

import { fetchAuthSession } from 'aws-amplify/auth';
import React, { useEffect, useState } from 'react';
import { Title, Text } from '@tremor/react';

const DashboardBody = () => {
    const [user, setUser] = useState({ firstName: '', lastName: '' });

    async function fetchCurrentUser() {
        try {
            const { idToken } = (await fetchAuthSession()).tokens ?? {};
            const payload = idToken?.payload ?? {};
            const { name, family_name } = payload;
            setUser({ firstName: name as string, lastName: family_name as string });

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
