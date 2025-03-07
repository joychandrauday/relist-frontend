'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from "sweetalert2"; // SweetAlert2 import
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar";
import { IUser } from "@/types/user";
import { deleteUser, updateUser } from "@/services/Profile";
import LoadingPage from "@/components/utils/Loading";
import TablePagination from "@/components/modules/dashboard/ListingTable/TablePagination";

const Userble = ({ users, totalPages }: { users: IUser[], totalPages: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Partial<IUser> | null>(null);
    const [originalUser, setOriginalUser] = useState<Partial<IUser> | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden"; // Disable page scroll
        } else {
            document.body.style.overflow = "auto"; // Enable page scroll
        }
    }, [isModalOpen]);

    const openEditModal = (user: IUser) => {
        setSelectedUser({ ...user });
        setOriginalUser({ ...user });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setOriginalUser(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedUser) return;
        setSelectedUser({
            ...selectedUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleStatusChange = (status: string) => {
        if (!selectedUser) return;
        setSelectedUser({
            ...selectedUser,
            status: status,
        });
    };

    const handleSave = async () => {
        if (!selectedUser || !selectedUser._id) return;

        const updatedFields: Partial<IUser> = {};

        (Object.keys(selectedUser) as (keyof IUser)[]).forEach((key) => {
            const newValue = selectedUser[key];
            const oldValue = originalUser?.[key];

            if (newValue !== oldValue) {
                updatedFields[key] = newValue as never;
            }
        });

        if (Object.keys(updatedFields).length === 0) {
            toast.info("No changes made.");
            return;
        }

        setIsLoading(true);

        try {
            await updateUser(updatedFields, selectedUser?._id);
            await Swal.fire({
                title: 'Success!',
                text: 'User updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            toast.success("User updated successfully!");
            closeModal();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Failed to verify order. ${error.message}`);
            } else {
                toast.error("Failed to verify order. An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await deleteUser(id);
                Swal.fire("Deleted!", "The user has been deleted.", "success");
            } catch (err) {
                if (err instanceof Error) {
                    toast.error("Failed to delete user.");
                } else {
                    toast.error("Failed to delete user.");
                }
            }
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <Table className="w-full table-auto overflow-x-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="px-4 py-2 text-left">Name</TableHead>
                            <TableHead className="px-4 py-2 text-left">Email</TableHead>
                            <TableHead className="px-4 py-2 text-left">Role</TableHead>
                            <TableHead className="px-4 py-2 text-left">Status</TableHead>
                            <TableHead className="px-4 py-2 text-left">Avatar</TableHead>
                            <TableHead className="px-4 py-2 text-left">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.length > 0 ? (
                            users?.map((user) => (
                                <TableRow key={user._id} className="border-b">
                                    <TableCell className="px-4 py-2">{user.name}</TableCell>
                                    <TableCell className="px-4 py-2">{user.email}</TableCell>
                                    <TableCell className="px-4 py-2">{user.role}</TableCell>
                                    <TableCell className="px-4 py-2">{user.status}</TableCell>
                                    <TableCell className="px-4 py-2">
                                        <Avatar>
                                            <AvatarImage src={user.avatar || ""} alt={user.name} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="px-4 py-2">
                                        <Button variant="outline" className="mr-2" onClick={() => openEditModal(user)}>Edit</Button>
                                        <Button variant="destructive" onClick={() => handleDelete(user._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-4">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <TablePagination totalPage={totalPages} />
            </div>

            {/* Edit User Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className=" p-6 rounded-md w-full sm:max-w-md max-w-xs">
                        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input name="name" value={selectedUser.name || ""} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input name="email" value={selectedUser.email || ""} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={selectedUser.role || ""}
                                    onValueChange={(newRole) => setSelectedUser({ ...selectedUser, role: newRole })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={selectedUser.status || ""}
                                    onValueChange={handleStatusChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="banned">Banned</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4 space-x-2">
                            <Button variant="outline" onClick={closeModal} className="w-full sm:w-auto">
                                Cancel
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleSave}
                                disabled={isLoading} // Disable button while loading
                                className="w-full sm:w-auto"
                            >
                                {isLoading ? <LoadingPage /> : "Save"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Userble;
