"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/lib/api-client";
import {
  ActionResponse,
  JwtAuthResponse,
  LoginDto,
  RegisterDto,
  User,
} from "@/types";

export async function loginAction(
  data: LoginDto
): Promise<ActionResponse<{ user: User; token: string }>> {
  // 1. Call API
  const result = await api.post<JwtAuthResponse>(
    "/api/auth/login",
    data,
    false
  );

  if (!result.success || !result.data) {
    return {
      success: false,
      error: result.error || "Invalid email or password",
    };
  }

  const authResponse = result.data;

  try {
    // 2. Decode Token
    const tokenPayload = JSON.parse(
      Buffer.from(authResponse.accessToken.split(".")[1], "base64").toString()
    );

    const user: User = {
      id: tokenPayload.sub || tokenPayload.userId,
      email: tokenPayload.email || data.email,
      fullName: tokenPayload.fullName || tokenPayload.name || "",
      roles: tokenPayload.roles || tokenPayload.authorities || [],
    };

    // 3. Set Cookies
    const cookieStore = await cookies();
    cookieStore.set("auth-token", authResponse.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    cookieStore.set("user-info", JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      success: true,
      data: { user, token: authResponse.accessToken },
    };
  } catch (error) {
    console.error("Login processing error:", error);
    return {
      success: false,
      error: "An error occurred during login processing",
    };
  }
}

export async function registerAction(
  data: RegisterDto
): Promise<ActionResponse<{ user: User; token: string }>> {
  // 1. Register API Call
  // Note: Registration endpoint usually returns String or User, but typically we want to auto-login.
  // The API guide says "Register -> Get JWT token" logic implies we might want to just login after.
  // But strictly following the previous implementation:
  const result = await api.post("/api/auth/register", data, false);

  if (!result.success) {
    return {
      success: false,
      error: result.error || "Registration failed",
    };
  }

  // 2. Auto-login
  return await loginAction({ email: data.email, password: data.password });
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  cookieStore.delete("user-info");
  redirect("/login");
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userInfo = cookieStore.get("user-info");

  if (!userInfo) {
    return null;
  }

  try {
    return JSON.parse(userInfo.value);
  } catch {
    return null;
  }
}
