import { isAuthenticated } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const authenticated = await isAuthenticated();
  // console.log("checking",authenticated);

  if (authenticated) redirect("/");

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
