"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TooltipDemo } from "@/components/TooltipDemo";

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

const SettingsProfile1 = ({
  defaultValues = { name: "", email: "" },
  onSaveProfile,
  onChangePassword, className = "",
}: SimpleProfileProps) => {
  const [view, setView] = useState<"profile" | "password">("profile");
  const [formData, setFormData] = useState<SimpleProfileData>(defaultValues);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [edit, setEdit] = useState<boolean>(true);
  const [editChange, setChangeEdit] = useState<boolean>(false);

  // Keep formData in sync if defaultValues change
  useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  // Handle profile save
  const handleSaveProfile = () => {
    if (onSaveProfile) onSaveProfile(formData);
    alert("Profile saved!");
    setEdit(true); // Exit edit mode after save
  };

  // Handle password save
  const handleSavePassword = () => {
    if (onChangePassword) onChangePassword(currentPassword, newPassword);
    alert("Password changed!");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleCancelProfile = () => {
    setFormData({
      name: defaultValues.name,
      email: defaultValues.email,
    }); 
    setEdit(true); 
  };

  // Toggle edit/save for profile
  const handleEditToggle = () => {
    if (!edit) {
      handleSaveProfile();
    } else {
      setEdit(false); 
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto py-30">
      {/* View toggle buttons */}
      <div className="flex justify-center items-center gap-4 mt-4 mb-2 ">
        <Button variant={view === "profile" ? "default" : "outline"} onClick={() => setView("profile")}>
          View Profile
        </Button>
        <Separator orientation="vertical" />
        <Button variant={view === "password" ? "default" : "outline"} onClick={() => setView("password")}>
          Change Password
        </Button>
        <TooltipDemo />
      </div>

      {view === "profile" ? (
        <>
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
                disabled={edit}
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
          <CardFooter className="flex justify-end gap-2">
            {!edit && (
              <Button variant="outline" onClick={handleCancelProfile}>
                Cancel
              </Button>
            )}
            <Button onClick={handleEditToggle}>{edit ? "Edit" : "Save"}</Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">

            {editChange && 
            <Button
              variant="outline"
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setChangeEdit(false);
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