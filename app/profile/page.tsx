import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header  from "@/components/Header";

import  { SettingsProfile1 }  from "@/components/settings-profile1";

const Profile = async () => {
    const session = await getServerSession();
    
    if (!session) {
        redirect("/");
    }

    console.log(session);
    
  return  (
    <div>
        <header>
            <Header />
            <SettingsProfile1 className="mx-auto block my-30" defaultValues={{name: session.user?.name ?? undefined,  email: session.user?.email ?? undefined}}/>
        </header>
    </div>
  )
}

export default Profile;