import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { Scrypt } from "lucia";
import { DataModel } from "./_generated/dataModel";
import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
});
const crypto = {
  async hashSecret(password: string) {
    return await new Scrypt().hash(password);

  },
  async verifySecret(password: string, hash: string) {
    return await new Scrypt().verify(hash, password);
  },
}

 

/*const customPasswordProvider = ConvexCredentials<DataModel>({
  id: "password",
  crypto: crypto,
  authorize: async (credentials, ctx) => {
    const flow = credentials.flow as string | undefined;
    const email = credentials.email as string | undefined;
    const password = credentials.password as string | undefined;
    const name = credentials.password as string | undefined;

    if (!email || !password || !name) {
      throw new Error("Name, Email and password are required");
    }
  }
})*/

