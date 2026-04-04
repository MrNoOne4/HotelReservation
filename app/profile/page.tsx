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
import  { SettingsProfile1 }  from "@/components/settings-profile1";

const Profile = async () => {
    const session = await getServerSession();
    
    if (!session) {
        redirect("/");
    }
    
  return  (
    <div>
        <Header/>
        <SettingsProfile1 className="mx-auto block my-30" defaultValues={{name: session.user?.name, email: session.user?.email, avatar: session.user?.image, username: session?.user?.name?.split(",")[0]}}/>
    
    </div>
  )
}

export default Profile;