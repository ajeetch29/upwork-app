"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const permissionsList = ["Create", "Read", "Update", "Delete"];

interface RolesDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
}

export function RolesDialog({ isOpen, closeDialog }: RolesDialogProps) {
  const [activeTab, setActiveTab] = useState("Schedules");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (perm: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <h2 className="text-lg font-semibold">Create a new role</h2>
          <p className="text-sm text-muted-foreground">
            Configure permissions for the new role.
          </p>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input placeholder="Permission Name" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Describe the permission" />
          </div>

          <div>
            <Label className="mb-2 block">Permissions</Label>
            <Tabs defaultValue="Schedules" onValueChange={setActiveTab}>
              <TabsList className="mb-3">
                {["Routes", "Schedules", "Trips", "Bookings", "Settings"].map(
                  (tab) => (
                    <TabsTrigger key={tab} value={tab}>
                      {tab}
                    </TabsTrigger>
                  )
                )}
              </TabsList>

              <div className="grid grid-cols-2 gap-4 mt-2">
                {permissionsList.map((perm) => (
                  <div key={perm} className="flex items-center space-x-2">
                    <Checkbox
                      id={perm}
                      checked={selectedPermissions.includes(perm)}
                      onCheckedChange={() => togglePermission(perm)}
                    />
                    <Label htmlFor={perm}>
                      {perm} {activeTab.slice(0, -1)}
                    </Label>
                  </div>
                ))}
              </div>
            </Tabs>
          </div>
        </div>

        <AlertDialogFooter className="mt-6">
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button>Next</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
