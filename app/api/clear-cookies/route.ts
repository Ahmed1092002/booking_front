import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  // Delete auth cookies
  cookieStore.delete("auth-token");
  cookieStore.delete("user-info");

  return NextResponse.json({
    success: true,
    message: "Cookies cleared. You can now access login/register pages.",
  });
}
