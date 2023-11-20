'use client';
import { useState } from 'react';
import SubmitButton from './components/SubmitButton';
import { create } from './lib/register.action';
import Toast from './components/Toast';

interface RegisterErrors {
    name: string[],
    email: string[],
    password: string[],
}

export default function Page() {
    const [messages, setMessages] = useState<RegisterErrors>({ 
        name: [], 
        email: [],
        password: [] 
    });

    async function onCreate(formData: FormData) {
        setMessages({
            name: [], 
            email: [],
            password: [] 
        })
        const errors = await create(formData);
        console.log(messages)
        setMessages(errors.fieldErrors);
    }
    return (
        <form action={onCreate} className='bg-white w-50 flex flex-col'>
            <h3 className='text-black center'>Register</h3>
            <label htmlFor='name'>Full Name</label>
            <input id='name' name='name' type='text' />
            { messages.name.map((content, index) => (
                <Toast content={content} key={index} className='pd-2'/>
            )) }
            <label htmlFor="email">Email</label>
            <input id='email' name='email' type='email' className='pd-2'/>
            { messages.email.map((content, index) => (
                <Toast content={content} key={index} />
            )) }
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='password' className='pd-2'/>
            { messages.password.map((content, index) => (
                <Toast content={content} key={index} />
            )) }
            <SubmitButton />
        </form>
    )

}