"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { FcCancel } from "react-icons/fc";
import TeamsDialog from "./partials/teams-dialog";
import { Input } from "./ui/input";

type UserStatus = "Active" | "Deactivated" | "Pending";

type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  status?: UserStatus;
};

const initialUsers: User[] = [
  {
    firstName: "Omar",
    lastName: "Ryad",
    role: "Admin",
    email: "example@email.com",
    status: "Active",
  },
  {
    firstName: "Ali",
    lastName: "Morsy",
    role: "Manager",
    email: "ali@email.com",
    status: "Deactivated",
  },
  {
    firstName: "Nour",
    lastName: "Samir",
    role: "Viewer",
    email: "nour@email.com",
    status: "Pending",
  },
];

const statusColors: Record<UserStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Deactivated: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const TeamPage: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (data: User) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.email === editingUser.email ? { ...user, ...data } : user
        )
      );
    } else {
      setUsers((prev) => [...prev, { ...data, status: "Pending" }]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-sm text-gray-400">Dashboard / Settings</div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team</h1>
        <Button
          onClick={() => {
            setEditingUser(null);
            setDialogOpen(true);
          }}
        >
          + Add a new user
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline">
          Role
        </Button>
        <Button type="button" variant="outline">
          Date range
        </Button>
        <Button type="button" variant="outline">
          Status
        </Button>
      </div>

      <Card>
        <CardContent className="overflow-auto p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${user.email}`}
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback>
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        statusColors[user.status || "Pending"]
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <div
                          onClick={() => {
                            setEditingUser(user);
                            setDialogOpen(true);
                          }}
                          className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-100 rounded"
                        >
                          <Pencil className="w-4 h-4 text-gray-600" />
                          Edit
                        </div>
                        <div className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-100 rounded">
                          <FcCancel className="w-4 h-4 text-yellow-600" />
                          Suspend
                        </div>
                        <div className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-red-600" />
                          Deactivate
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TeamsDialog
        isOpen={isDialogOpen}
        closeDialog={handleCloseDialog}
        editingUser={editingUser}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TeamPage;
