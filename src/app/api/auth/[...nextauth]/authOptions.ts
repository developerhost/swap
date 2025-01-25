import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import default_profile_image from "@/images/profile-pic-placeholder.png";
import prisma from "@/lib/prisma";
import { env } from "@/utils/serverEnv";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

/**
 * 初めてログインしたときにユーザーを作成する処理
 */
const adapter: Adapter = {
  ...PrismaAdapter(prisma),
  createUser: ({ emailVerified, ...data }) =>
    prisma.user.create({
      data: {
        ...data,
        name: "",
        image: default_profile_image.src,
        // 渡ってくる値がnullなのでデフォルト値を設定する
        emailVerified: emailVerified ?? new Date(),
        // 初回ログイン時はGoogleがメールアドレスを認証していることがわかっているのでtrueを設定する
        isEmailVerified: true,
      },
    }),
  linkAccount: async () => {},
  unlinkAccount: async () => {},
};

export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: PAGE_LINK[PAGE_CONTENT.PROFILE],
  },
  callbacks: {
    session: ({ session, user: { id } }) => ({
      ...session,
      user: {
        ...session.user,
        id,
      },
    }),
  },
};
