"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const One_Week = 60 * 60 * 24 * 7 * 1000;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const user = await db.collection("user").doc(uid).get();

    if (user.exists) {
      return {
        success: false,
        message: "User already exists.",
      };
    }

    await db.collection("user").doc(uid).set({ name, email });

    return {
      success: true,
      message: "Account created successfully, please sign in.",
    };
  } catch (error: any) {
    console.error(error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use.",
      };
    }

    return {
      success: false,
      message: "Failed to create account",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const user = await auth.getUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "User doesn't exists.",
      };
    }

    await setSessionCookie(idToken);
  } catch (error: any) {
    console.error(error);

    return {
      success: false,
      message: "Failed to login",
    };
  }
}

export async function logout() {
  // Clear the session cookie
  await removeSetSession();

  return {
    sucess: true,
    message: "User logged out",
  };
}

export async function removeSetSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: One_Week,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: One_Week,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db.collection("user").doc(decodedClaims.uid).get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
