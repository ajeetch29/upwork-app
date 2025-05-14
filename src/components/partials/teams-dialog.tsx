import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

interface TeamDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  editingUser: User | null;
  onSubmit: (data: User) => void;
}

const TeamsDialog: React.FC<TeamDialogProps> = ({
  isOpen,
  closeDialog,
  editingUser,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        role: "",
        email: "",
      });
    }
  }, [editingUser]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.role === "" || formData.role === "select") {
      toast.error("Please select a valid role.");
      return;
    }

    onSubmit(formData);
    toast.success(editingUser ? "User updated!" : "User added!");

    closeDialog();
    setFormData({
      firstName: "",
      lastName: "",
      role: "",
      email: "",
    });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {editingUser ? "Edit User" : "Add a new user"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {editingUser
              ? "Update the user details below."
              : "Fill in the user details below."}
          </AlertDialogDescription>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-4 bg-white rounded"
          >
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="w-full border rounded px-3 py-2"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="w-full border rounded px-3 py-2"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full border rounded px-3 py-2"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="select">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full border rounded px-3 py-2"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              {editingUser ? "Update User" : "Add User"}
            </button>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TeamsDialog;
