'use client'

import NavBar from '@/components/dashboard/NavBar';
import { useEffect, useState } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Title, Text, Card, Divider, TextInput, Button } from '@tremor/react';
import { ToastContainer, toast } from 'react-toastify';

import {
    updateUserAttributes,
    type UpdateUserAttributesOutput
} from 'aws-amplify/auth';

// Définir une interface pour les attributs utilisateur
interface UserAttributes {
    firstName: string;
    lastName: string;
    email: string;
}

const UserSettingsPage = () => {
    const [user, setUser] = useState<UserAttributes>({ firstName: '', lastName: '', email: '' });

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

    async function handleUpdateEmailAndNameAttributes(
        updatedName: string,
        updateFamilyName: string
    ) {
        try {
            const attributes = await updateUserAttributes({
                userAttributes: {
                    name: updatedName,
                    family_name: updateFamilyName
                }
            });
            toast.success("Profil mis à jour avec succès !");
        } catch (error) {
            toast.error("Erreur lors de la mise à jour du profil.");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <>
            <NavBar />
            <ToastContainer position="top-right" />
            <div className='p-4 md:p-10 mx-auto max-w-7xl'>

                <Title>Paramètres utilisateur</Title>
                <Text>Vous pouvez modifier vos paramètres utilisateur ici.</Text>

                <Card className="mt-6 flex flex-col gap-7 items-end">
                    <Divider>User information </Divider>
                    <div className='w-full flex flex-col gap-6 items-end'>
                        <div className='w-full flex flex-col gap-6'>
                            <div>
                                <Text>Nom</Text>
                                <TextInput
                                    value={user.firstName}
                                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                />
                            </div>
                            <div>
                                <Text>Prénom</Text>
                                <TextInput
                                    value={user.lastName}
                                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                />
                            </div>
                            <div>
                                <Text>Email</Text>
                                <TextInput
                                    placeholder={user.email}
                                    type='email'
                                    disabled
                                />
                            </div>
                            <div>
                                <Text>Photo de profils</Text>
                                <TextInput
                                    placeholder='https://avatar.vercel.sh/leerob'
                                    type='url'
                                    disabled
                                />
                            </div>
                        </div>
                        <div>
                            <Button size='md' onClick={() => handleUpdateEmailAndNameAttributes(user.firstName, user.lastName)}>Sauvegarder les Modification</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default UserSettingsPage;