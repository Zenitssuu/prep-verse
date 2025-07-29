import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div>Interview Page</div>
      <Agent userName={user?.name || ""} userId={user?.id} type="generate" />
    </>
  );
};

export default Page;
