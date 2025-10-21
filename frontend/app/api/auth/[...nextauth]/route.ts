import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${backendUrl}/api/auth/login/`,
            credentials,
            { withCredentials: true }
          );
          if (res.status === 200) {
            return { id: credentials.username, name: credentials.username };
          }
        } catch (err) {
          console.error("Auth error:", err);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
