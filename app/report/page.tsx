import { TabsDemo } from "@/components/report/TabsDemo";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session === null) {
    redirect("/auth/login");
  }


  if (session.role != "ADMIN") {
    return (
      <div className="w-ful h-screen grid items-center justify-center">
        <div className="p-4">
          <h3 className="text-center">
            your not authorised to open this page{" "}
          </h3>
          <Link className="text-center w-full text-blue-500" href="/sales">
            go to sales
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TabsDemo />
    </div>
  );
}
