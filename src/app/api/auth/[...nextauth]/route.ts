import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simula login hardcoded
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "admin"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
          };
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

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // 🔁 Insere dados extras no token (JWT)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    // 🔁 Insere dados do token na sessão
    async session({ session, token }) {
        if (token) {
          session.user = {
            id: token.id as string,
            name: token.name as string,
            email: token.email as string,
          };
        }
        return session;
      }
  },
};

// 👇 Extensões de tipo opcionais, mas boas pra TypeScript:
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };