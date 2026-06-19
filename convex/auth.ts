import { convexAuth, createAccount, GenericActionCtxWithAuthConfig, retrieveAccount } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { Scrypt } from "lucia";
import { DataModel } from "./_generated/dataModel";
import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { ConvexError } from "convex/values";
import { Account } from "./users/types";

const crypto = {
  async hashSecret(password: string) {
    return await new Scrypt().hash(password);

  },
  async verifySecret(password: string, hash: string) {
    return await new Scrypt().verify(hash, password);
  },
}
const customPasswordProvider = ConvexCredentials<DataModel>({
  id: "password",
  crypto: crypto,
  authorize: async (credentials, ctx) => {
    const flow = credentials.flow as string | undefined;
    const username = credentials.email as string | undefined;
    const password = credentials.password as string | undefined;

    if (!username || !password) {
      throw new Error("Email and password are required");
    }

    const accountInfo: Account = { username, password }

    if (flow === "signIn") {
      return await signInFlow(ctx, accountInfo)
    }
    else if (flow === "signUp") {
      throw new ConvexError(`SignUp flow not authorized`);
    }
    else {
      throw new ConvexError(`Auth flow doesnt exist: ${flow}`);
    }
  }
})

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [customPasswordProvider],
});

async function signUpFlow(ctx: GenericActionCtxWithAuthConfig<DataModel>, accountInfo: Account) {
  const account = await createAccount(ctx, {
    provider: "password",
    account: {
      id: accountInfo.username,
      secret: accountInfo.password
    },
    profile: {
      username: accountInfo.username
    },
    shouldLinkViaEmail: false,
    shouldLinkViaPhone: false
  })
  return { userId: account.user._id };
}

async function signInFlow(ctx: GenericActionCtxWithAuthConfig<DataModel>, accountInfo: Account) {
  const account = await retrieveAccount(ctx, {
    provider: "password",
    account: {
      id: accountInfo.username,
      secret: accountInfo.password
    }
  });

  if (!account) {
    throw new ConvexError("Invalid email or password");
  }

  return { userId: account.user._id };
}
