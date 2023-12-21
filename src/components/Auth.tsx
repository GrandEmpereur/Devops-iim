'use client';

import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';

import { ReactNode } from 'react';

function Auth({ children }: { children: ReactNode }) {
    useEffect(() => {
        Amplify.configure(config);
    }, []);

    return <>{children}</>;
}

export default Auth;
