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
            role: string;
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
        token: string;
        avatar: string;
        role: string;
    }

    interface JWT {
        id: string;
        accessToken: string;
        avatar: string;
        role: string;
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
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${process.env.SERVER_API}/auth/login`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(credentials),
                    });

                    const user = await res.json();
                    if (!res.ok) throw new Error(user.message || "Login failed");

                    return {
                        id: user.data.user._id,
                        name: user.data.user.name,
                        email: user.data.user.email,
                        token: user.data.accessToken,
                        avatar: user.data.user.avatar,
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
        async signIn({ user, account }) {
            if (account?.provider === "google" || account?.provider === "github") {
                try {
                    const res = await fetch(`${process.env.SERVER_API}/auth/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email,
                            password: "password", // Default password for new users
                        }),
                    });

                    if (!res.ok) {
                        console.error("User registration failed");
                        return false;
                    }
                } catch (error) {
                    console.error("Error registering user:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.id = user.id;
                token.avatar = user.avatar;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (!session.user) {
                session.user = { id: "", name: "", email: "", accessToken: "", avatar: "", role: "" };
            }
            session.user.id = String(token.id ?? '');
            session.user.accessToken = String(token.accessToken ?? '');
            session.user.avatar = String(token.avatar ?? '');
            session.user.role = String(token.role ?? '');
            return session;
        }
    }
};
