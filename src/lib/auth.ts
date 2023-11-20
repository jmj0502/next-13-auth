import type { NextAuthOptions } from 'next-auth';
import { PasswordHandler } from './password.handler'
import { prisma } from './prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createECDH } from 'crypto';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: 'example@example.com'
                },
                password: {
                    label: 'Password',
                    type: "password"
                },
            },
            async authorize(credentials: { email: string, password: string }) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                const passwordHandler = new PasswordHandler()
                if (!user) {
                    return null;
                }
                const hasValidPassword = await passwordHandler.comparePasswords(
                    credentials.password, 
                    user.password
                );
                if (!hasValidPassword) {
                    return null;
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    randomKey: 'Test Key'
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            console.log("Session callback", { session, token })
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                }
            }
        },
        jwt: ({ token, user }) => {
            console.log("JWT callback", { token, user })
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        }
    }
};