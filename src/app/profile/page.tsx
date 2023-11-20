'use client'

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { use, cache } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
}

const getUsers = cache(() => 
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
);

export default function Profile() {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin');
        },
    });

    if (status === 'loading') {
        return <p>Loading... </p>
    }

    let users = use<User[]>(getUsers())

    return (
        <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
        <Link href='/'><p>Home</p></Link>
        <div
            style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 20,
            }}
        >
            {users.map((user) => (
            <div
                key={user.id}
                style={{ border: "1px solid #ccc", textAlign: "center" }}
            >
                <Image
                    src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                    alt={user.name}
                    width={180}
                    height={180}
                />
                <h3>{user.name}</h3>
            </div>
            ))}
        </div>
        </main>
    )
}