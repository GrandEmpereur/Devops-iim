import NavBar from '@/components/dashboard/NavBar';
import { Title, Text } from '@tremor/react';

const UserSettingsPage = () => {
    return (
        <>
            <NavBar />
            <div className='p-4 md:p-10 mx-auto max-w-7xl'>

                <Title>Paramètres utilisateur</Title>
                <Text>Vous pouvez modifier vos paramètres utilisateur ici.</Text>
            </div>
        </>
    );
};

export default UserSettingsPage;