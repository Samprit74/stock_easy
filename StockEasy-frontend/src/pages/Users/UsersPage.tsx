import { useEffect, useState } from "react";
import { Shield, ShieldCheck, Trash2, User as UserIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  listUsers,
  updateUserRole,
  deleteUser,
} from "@/services";
import { getErrorMessage, isApiError } from "@/services";
import type { UserResponse, Role } from "@/types";

const UsersPage = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listUsers(page, 20);
      setUsers(res.items);
      setTotalPages(res.totalPages);
    } catch (e) {
      toast({
        title: "Failed to load users",
        description: getErrorMessage(e),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  const toggleRole = async (u: UserResponse) => {
    const newRole: Role = u.role === "ADMIN" ? "STAFF" : "ADMIN";
    setBusyId(u.id);
    try {
      await updateUserRole(u.id, { role: newRole });
      toast({
        title: "Role updated",
        description: `${u.username} is now ${newRole}`,
      });
      load();
    } catch (e) {
      toast({
        title: "Update failed",
        description: getErrorMessage(e),
        variant: "destructive",
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (u: UserResponse) => {
    if (!confirm(`Delete user ${u.username}? This cannot be undone.`)) return;
    setBusyId(u.id);
    try {
      await deleteUser(u.id);
      toast({ title: "User deleted" });
      load();
    } catch (e) {
      const msg = isApiError(e) && e.status === 403
        ? "You cannot delete yourself."
        : getErrorMessage(e);
      toast({ title: "Delete failed", description: msg, variant: "destructive" });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : users.length === 0 ? (
              <p className="text-sm text-muted-foreground">No users found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserIcon className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{u.username}</p>
                            <p className="text-xs text-muted-foreground">
                              {u.firstName} {u.lastName}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {u.role === "ADMIN" ? (
                          <Badge className="bg-purple-600 gap-1">
                            <ShieldCheck className="w-3 h-3" /> ADMIN
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <Shield className="w-3 h-3" /> STAFF
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{u.businessName || "—"}</TableCell>
                      <TableCell>{u.phone || "—"}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={busyId === u.id}
                          onClick={() => toggleRole(u)}
                        >
                          Make {u.role === "ADMIN" ? "STAFF" : "ADMIN"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={busyId === u.id}
                          onClick={() => handleDelete(u)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 0 || loading}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page + 1} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages - 1 || loading}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default UsersPage;
