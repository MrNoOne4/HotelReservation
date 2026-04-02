// app/rooms/[hotelId]/page.tsx

import { EmptyInputGroup } from "@/components/EmptyInputGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RoomClient from "@/components/RoomClient";
import { signIn, useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



const Profile = async () => {
      const session = await getServerSession();
      if (!session) {
          redirect("/practiceno1/userPage");
      }




  return  (
    <div>
        hello world;
    </div>
  )
}

export default Profile;