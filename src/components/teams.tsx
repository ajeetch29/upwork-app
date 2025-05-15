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
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowUpDown, Ban, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
type UserStatus = "Active" | "Deactivated" | "Pending";

type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  permissions: string;
  role: string;
  email: string;
  status?: UserStatus;
};

const initialUsers: User[] = [
  {
    firstName: "Omar",
    lastName: "Ryad",
    role: "Admin",
    permissions: "Read, Write, Delete",
    email: "example@email.com",
    status: "Active",
  },
  {
    firstName: "Ali",
    lastName: "Morsy",
    role: "Manager",
    permissions: "Read, Write, Delete",
    email: "ali@email.com",
    status: "Deactivated",
  },
  {
    firstName: "Nour",
    lastName: "Samir",
    permissions: "Read, Write, Delete",
    role: "Viewer",
    email: "nour@email.com",
    status: "Pending",
  },
];

// colors for user status
// Active: green, Deactivated: red, Pending: yellow
const statusColors: Record<UserStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Deactivated: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const TeamPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-sm text-gray-400">Dashboard / Settings</div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>+ Add a new user</Button>
          </DialogTrigger>
          <DialogContent>
            <form
              className="space-y-4 mt-4 bg-white rounded"
              // onSubmit={handleSubmit}
            >
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new user to your team.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-1"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <Label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-1"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="role"
                  className="block text-sm font-medium mb-1"
                >
                  Role
                </Label>
                <Select name="role">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
                <TableHead>
                  <span className="flex items-center gap-2">
                    User <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-2">
                    Role <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-2">
                    Permissions{" "}
                    <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-2">
                    Email <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-2">
                    Status <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  </span>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialUsers.map((user, index) => (
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
                  <TableCell>{user.permissions}</TableCell>
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
                        <div className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-100 rounded">
                          <Pencil className="w-4 h-4 text-gray-600" />
                          Edit
                        </div>
                        <div className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-100 rounded">
                          <Ban className="w-4 h-4" />
                          Suspend
                        </div>
                        <div className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-gray-600" />
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
    </div>
  );
};

export default TeamPage;
