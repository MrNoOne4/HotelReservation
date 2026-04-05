"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TooltipDemo } from "@/components/TooltipDemo";
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"; // Optional: for toggle icons
interface SimpleProfileData {
  name?: string;
  email?: string;
}

interface SimpleProfileProps {
  defaultValues?: SimpleProfileData;
  onSaveProfile?: (data: SimpleProfileData) => void;
  onChangePassword?: (current: string, newPass: string) => void;
  className?: string;
}

interface setPassword {
  current: string;
  newPass: string;
}


const SettingsProfile1 = ({
  defaultValues = { name: "", email: "" },
  onSaveProfile,
  onChangePassword, className = "",
}: SimpleProfileProps) => {
  const [view, setView] = useState<"profile" | "password">("profile");
  const [formData, setFormData] = useState<SimpleProfileData>(defaultValues);

  const [password, setPass] = useState<setPassword>({ current: "", newPass: "" })
  const [editChange, setChangeEdit] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

useEffect(() => {
  const validateEmail = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/HotelReservation/ValidateEmail?email=${defaultValues.email}&action=changePassword`);

      const data = await res.json();
      setChangePassword(data.havePassword);
    } catch (err) {
      console.error(err);
    }
  };

  validateEmail();
}, []);
  // Keep formData in sync if defaultValues change
  useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  // Handle profile save


  // Handle password save
  const handleSavePassword = async () => {

    try {
      const res = await fetch("http://localhost:3000/api/HotelReservation/ValidateEmail", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            action: "changePassword",
            currentpassword: password.current,
            newPassword: password.newPass,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to change password", {position: "top-center"});
        return;
      }

      toast.success(result.message, {position: "top-center"});
      setPass({
        current: "",
        newPass: ""
      })
      setChangeEdit(false)
    } catch (e) {
      console.error(e);
    }
  };




  // Toggle edit/save for profile

  return (
    <Card className="w-full max-w-md mx-auto py-20 my-10">
      {/* View toggle buttons */}
      <div className="flex justify-center items-center gap-4 mt-4 mb-2 ">
        <Button variant={view === "profile" ? "default" : "outline"} onClick={() => setView("profile")}>
          View Profile
        </Button>
        <Separator orientation="vertical" />
        <Button variant={view === "password" ? "default" : "outline"} disabled={!changePassword} onClick={() => setView("password")}>
          Change  Password
        </Button>
        <TooltipDemo />
      </div>

      { view  === "profile" ? (
        <section className="my-4">
         <CardHeader>
            <CardTitle>Guest Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                disabled
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </CardContent>
        </section>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
              <CardContent className="space-y-4">
              <div className="space-y-1 relative">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  value={password.current}
                  disabled={!editChange}
                  onChange={(e) => setPass({ ...password, current: e.target.value })}
                />
                <button
                  type="button"
                  className={`absolute right-3 top-7 ${!editChange ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}`}
                  disabled={!editChange}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="space-y-1 relative">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password.newPass}
                  disabled={!editChange}
                  onChange={(e) => setPass({ ...password, newPass: e.target.value })}
                />
                <button
                  type="button"
                  className={`absolute right-3 top-7 ${!editChange ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}`}
                  disabled={!editChange}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </CardContent>
          <CardFooter className="flex justify-end gap-2">

            {editChange && 
            <Button
              variant="outline"
              onClick={() => {
                setChangeEdit(false);
                setShowCurrentPassword(false);
                setShowNewPassword(false);
                  setPass({
                    current: "",
                    newPass: ""
                  })
                }}
            >
              Cancel
            </Button>

            }

            <Button onClick={() => editChange ? handleSavePassword() : setChangeEdit(true) }>{ editChange ? "Save" : "Edit" }</Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export { SettingsProfile1 };