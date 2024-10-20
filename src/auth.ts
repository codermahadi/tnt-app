import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const {
    GET, 
    POST,
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
      strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("credentials:", credentials); // Log email and password

                if (!credentials) return null; // Check if credentials are provided

                const { email, password } = credentials; // Destructure email and password
                console.log("Email:", email, "Password:", password); // Log email and password

                // Add your user authentication logic here
                // For example, return a user object or null based on authentication
                const user = { id: "unique_user_id", email }; // Include an id property
                return user; // Ensure to return a User object or null
            },
        })
    ],
});
