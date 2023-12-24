import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "./prismadb";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("لطفا وارد حساب کاربری خود بشوید")

  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  // console.log(currentUser)
  if (!currentUser) {
    throw new Error("لطفا وارد حساب کاربری خود بشوید")
  }
  return { currentUser };
};

export default serverAuth;
