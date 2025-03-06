import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// ✅ TypeScript টাইপ এক্সটেন্ড করা হচ্ছে
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
                        avatar: user.data.user.avatar, // ✅ Avatar যোগ করা হলো
                        role: user.data.user.role, // ✅ Role যোগ করা হলো
                    } as User; // ✅ Type Assertion
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
                token.avatar = user.avatar; // ✅ Avatar সংযুক্ত করা হলো
                token.role = user.role; // ✅ Role সংযুক্ত করা হলো
            }

            return token;
        },
        async session({ session, token }) {
            if (!session.user) {
                session.user = { id: "", name: "", email: "", accessToken: "", avatar: "", role: "" };
            }

            session.user.id = String(token.id ?? '');
            session.user.accessToken = String(token.accessToken ?? '');
            session.user.avatar = String(token.avatar ?? ''); // ✅ Avatar সংযুক্ত করা হলো
            session.user.role = String(token.role ?? ''); // ✅ Role সংযুক্ত করা হলো
            return session;
        }
    }
};
