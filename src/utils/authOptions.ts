import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    export interface Session {
        user?: {
            id: string;
            name: string;
            email: string;
            accessToken: string;
            avatar: string;
            role: string; // Added role to session
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
        token: string;
        avatar: string; // Added avatar field to User
        role: string; // Added role field to User
    }

    interface JWT {
        id: string;
        accessToken: string;
        avatar: string;
        name: string;
        email: string;
        role: string; // Added role field to JWT
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const payload = {
                        email: credentials?.email,
                        password: credentials?.password,
                    };
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload),
                    });

                    const user = await res.json();
                    if (!res.ok) throw new Error(user.message || "Login failed");

                    // Ensure the API returns avatar and role
                    return {
                        id: user.data.user._id,
                        name: user.data.user.name,
                        email: user.data.user.email,
                        avatar: user.data.user.avatar || "", // Make sure it's an empty string if undefined
                        token: user.data.accessToken,
                        role: user.data.user.role,
                    } as User;
                } catch (error) {
                    throw new Error((error as Error).message || "Login failed");
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.id = user.id;
                token.avatar = user.avatar;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (!session.user) {
                session.user = { id: "", name: "", email: "", accessToken: "", avatar: '', role: "" };
            }

            session.user.id = String(token.id ?? '');
            session.user.accessToken = String(token.accessToken ?? '');
            session.user.avatar = String(token.avatar ?? '');
            session.user.name = String(token.name ?? '');
            session.user.email = String(token.email ?? '');
            session.user.role = String(token.role ?? '');

            return session;
        }
    }
};
