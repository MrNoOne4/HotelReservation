// app/rooms/[hotelId]/page.tsx

import { EmptyInputGroup } from "@/components/EmptyInputGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RoomClient from "@/components/RoomClient";
import { signIn, useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header  from "@/components/Header";
import { ProfileMenu } from "@/components/ProfileMenu";
import { AvatarWithBadge } from "@/components/AvatarWithBadge";


const Profile = async () => {
    const session = await getServerSession();
    if (!session) {
        redirect("/practiceno1/userPage");
    }
    
  return  (
    <div>
        <Header/>

    </div>
  )
}

export default Profile;