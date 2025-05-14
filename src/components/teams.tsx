import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type UserStatus = "Active" | "Deactivated" | "Pending";

type User = {
  name: string;
  id: string;
  role: string;
  permissions: string;
  lastActive: string;
  email: string;
  status: UserStatus;
};

const users: User[] = Array.from({ length: 12 }, (_, i) => ({
  name: "Omar Ryad",
  id: "#92839232",
  role: "Admin",
  permissions: "Read, Edit, Delete",
  lastActive: "3 Days ago",
  email: "Example@email.com",
  status: ["Active", "Deactivated", "Pending"][i % 3] as UserStatus,
}));

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
        <Button className="bg-black text-white">+ Add a new user</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input placeholder="Filter emails..." className="w-60" />
        <Button variant="outline">Role</Button>
        <Button variant="outline">Date range</Button>
        <Button variant="outline">Status</Button>
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
                <TableHead>Permissions</TableHead>
                <TableHead>Last active</TableHead>
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
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://via.placeholder.com/40" />
                        <AvatarFallback>OR</AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-gray-400">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.permissions}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        statusColors[user.status]
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
          <div className="flex justify-between items-center pt-4 text-sm text-gray-500">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPage;
