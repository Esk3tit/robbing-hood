import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({

    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "../../users/signin"
    },
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@domain.tld" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                // Database lookup for user to compare
                const client = await connectToDatabase();

                // Get all users and then find user with email
                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({
                    email: credentials.username
                });

                // User not found - send error res
                if (!user) {
                    client.close();
                    throw new Error('No user found with the specified email!');
                }

                // Check password if we find a matching email
                const isValidPassword = await verifyPassword(credentials.password, user.password);

                // Incorrect password
                if (!isValidPassword) {
                    client.close();
                    throw new Error('Incorrect password!');
                }

                // Success, return user object
                client.close();
                return { email: user.email, name: user.firstName };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encryption: "true"
    }
})