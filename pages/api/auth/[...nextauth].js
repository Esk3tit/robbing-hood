import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                username: { label: "Email", type: "email", placeholder: "test@domain.tld" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

            }
        })
    ]
})