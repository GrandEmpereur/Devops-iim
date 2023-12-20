'use client'

import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import * as mutations from '@/graphql/mutations';
import * as queries from '@/graphql/queries';

import config from '@/amplifyconfiguration.json';

const cookiesClient = generateServerClientUsingCookies({
    config,
    cookies
});

async function createTodo(formData: FormData) {
    'use server';
    const { data } = await cookiesClient.graphql({
        query: mutations.createTodo,
        variables: {
            input: {
                name: formData.get('name')?.toString() ?? ''
            }
        }
    });

    console.log('Created Todo: ', data?.createTodo);

    revalidatePath('/');
}

async function markTodoAsDone(todoId: string) {
    'use server';
    const { data } = await cookiesClient.graphql({
        query: mutations.updateTodo,
        variables: {
            input: {
                id: todoId,
                done: true
            }
        }
    });

    console.log('Todo marked as done: ', data.updateTodo);

    revalidatePath('/dashboard');
}

async function deleteTodo(todoId: string) {
    'use server';
    const { data } = await cookiesClient.graphql({
        query: mutations.deleteTodo,
        variables: {
            input: {
                id: todoId
            }
        }
    });

    console.log('Todo deleted: ', data.deleteTodo);

    revalidatePath('/dashboard');
}

type TodoButtonProps = {
    onClick: () => void;
    children?: React.ReactNode;
};

const TodoButton = ({ onClick, children }: TodoButtonProps) => {
    'use client'
    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClick}>
            {children}
        </button>
    );
};

const Dashboard = async () => {
    const { data, errors } = await cookiesClient.graphql({
        query: queries.listTodos
    });

    const todos = data.listTodos.items;

    return (
        <div className="flex h-screen bg-gray-100 color">
            <div className="w-32 bg-white p-5">
                <div className="mb-10">
                    <div className="bg-gray-300 h-10 w-25 flex items-center justify-center">Logo</div>
                </div>

                <div className=' flex flex-col gap-5'>
                    <div>
                        <div className="flex flex-col gap-5">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded ">Settings</button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded ">Logout</button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-5">
                {/* Add Task */}
                <form action={createTodo} className="mb-5 flex justify-between items-center gap-10">
                    <input name="name" id='large-input' placeholder="Add a todo" className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    <button className="bg-blue-500 w-32 text-white px-4 py-2 rounded hover:bg-blue-600">Add Task</button>
                </form>

                {/* Task List */}
                <div className="bg-white p-5 rounded shadow">
                    {(!todos || todos.length === 0 || errors) && (
                        <div>
                            <p>No todos, please add one.</p>
                        </div>
                    )}
                    <ul>
                        {todos.map((todo) => {
                            return (
                                <li key={todo.id} className={`flex items-center justify-between ${todo.done ? 'line-through' : ''}`}>
                                    <p>{todo.name}</p>
                                    <div className='flex gap-3'>
                                        <TodoButton onClick={() => markTodoAsDone(todo.id)}>Done</TodoButton>
                                        <TodoButton onClick={() => deleteTodo}>Delete</TodoButton>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

