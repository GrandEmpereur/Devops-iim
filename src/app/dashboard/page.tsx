'use client'

import NavBar from '@/components/dashboard/NavBar';
import DashboardBody from '@/components/dashboard/DashboardBody';
import { useEffect, useState } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';

interface UserAttributes {
    firstName: string;
    lastName: string;
    email: string;
}

const Dashboard = async () => {
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
        <div className="">
            <NavBar user={user} />
            <DashboardBody />
        </div>
    );
};

export default Dashboard;

