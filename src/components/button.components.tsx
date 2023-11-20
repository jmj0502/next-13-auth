'use client';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export function LoginButton() {
    return  (
        <button style={{ marginRight: 10 }} onClick={() => signIn()}>
            Sign In
        </button>
    );
}

export function RegisterButton() {
    return (
        <Link href='/auth/register' style={{ marginRight: 10 }}>
            Register
        </Link>
    )
}

export function LogoutButton() {
    return (
        <button style={{ marginRight: 10 }} onClick={() => signOut()}>
            Logout
        </button>
    )
}

export function ProfileButton() {
    return (
        <Link style={{ marginRight: 10 }} href='/profile'>Profile</Link>
    )
}

export function ServerProfileButton() {
    return (
        <Link href='/profile/server'>Server Profile</Link>
    )
}