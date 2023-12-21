import NavBar from '@/components/dashboard/NavBar';
import { Title, Text } from '@tremor/react';

const TodoPage = () => {
    return (
        <>
            <NavBar />
            <div className='p-4 md:p-10 mx-auto max-w-7xl'>
                <Title>Todo</Title>
                <Text>Vous pouvez commencer à utiliser votre application.</Text>
            </div>
        </>
    );
};

export default TodoPage;