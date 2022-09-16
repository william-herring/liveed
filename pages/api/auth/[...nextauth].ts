import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

// Authentication API protocols (OAuth)
// TODO: Add email/passwordless authentication

export default NextAuth({
    providers: [
        //OAuth
          GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
          }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login"
    },
})