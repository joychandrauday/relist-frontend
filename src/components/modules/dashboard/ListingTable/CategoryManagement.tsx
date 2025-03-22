'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import Image from "next/image";
import Swal from "sweetalert2";

export interface ICategory {
    _id: string;
    name: string;
    description: string;
    icon: string;
}

const CategoryManagement = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [action, setAction] = useState<'add' | 'edit' | 'delete'>('add');
    const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryIcon, setCategoryIcon] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://relist-backend.vercel.app/api/v1/category');
                const { data } = await response.json();
                setCategories(data);
            } catch (err) {
                if (err instanceof Error) {
                    toast.error('Failed to load categories');
                }

            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const uploadImages = async (files: FileList): Promise<string> => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append('upload_preset', 'product_images');
        formData.append('cloud_name', 'dklikxmpm');

        const res = await fetch("https://api.cloudinary.com/v1_1/dklikxmpm/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if (res.ok) return data.secure_url;
        throw new Error('Failed to upload image to Cloudinary');
    };

    const handleCategoryAction = async () => {
        setLoading(true);
        try {
            let imageUrl = categoryToEdit?.icon || '';
            if (categoryIcon) {
                imageUrl = await uploadImages(categoryIcon);
            }

            let response;
            if (action === 'add') {
                const payload = { name: categoryName, description: categoryDescription, icon: imageUrl };
                response = await fetch('https://relist-backend.vercel.app/api/v1/category', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else if (action === 'edit' && categoryToEdit) {
                response = await fetch(`https://relist-backend.vercel.app/api/v1/category/${categoryToEdit._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: categoryName, description: categoryDescription, icon: imageUrl }),
                });
            }

            if (response?.ok) {
                toast.success(`${action === 'add' ? 'Added' : 'Updated'} successfully`);
                setIsDialogOpen(false);
            } else {
                toast.error('Failed to perform action');
            }
        } catch {
            toast.error('Error performing action');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async (category: ICategory) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        setLoading(true);
        try {
            const response = await fetch(`https://relist-backend.vercel.app/api/v1/category/${category._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Deleted successfully');
                setCategories(categories.filter(cat => cat._id !== category._id));
            } else {
                toast.error('Failed to delete category');
            }
        } catch {
            toast.error('Error deleting category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 w-5/6 p-12">
            <h3 className="text-xl font-semibold">Category Management</h3>
            {loading && <p className="text-blue-500">Loading...</p>}
            <table className="w-full border">
                <thead className="bg-transparent">
                    <tr className="bg-gray-200">
                        <th className="p-2">Icon</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => (
                        <tr key={cat._id} className="border-t">
                            <td className="p-2"><Image src={cat.icon} alt={cat.name} className="w-10 h-10" width={40} height={40} /></td>
                            <td className="p-2">{cat.name}</td>
                            <td className="p-2">{cat.description}</td>
                            <td className="p-2">
                                <Button disabled={loading} onClick={() => { setAction('edit'); setCategoryToEdit(cat); setCategoryName(cat.name); setCategoryDescription(cat.description); setIsDialogOpen(true); }}>Edit</Button>
                                <Button disabled={loading} variant="destructive" onClick={() => handleDeleteCategory(cat)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button disabled={loading} onClick={() => { setAction('add'); setCategoryToEdit(null); setCategoryName(''); setCategoryDescription(''); setIsDialogOpen(true); }}>Add Category</Button>

            {isDialogOpen && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">{action === 'add' ? 'Add' : 'Edit'} Category</h3>

                        <Input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Category name"
                            disabled={loading}
                        />
                        <Input
                            type="text"
                            value={categoryDescription}
                            onChange={(e) => setCategoryDescription(e.target.value)}
                            placeholder="Category description"
                            disabled={loading}
                        />
                        <Input
                            type="file"
                            onChange={(e) => setCategoryIcon(e.target.files)}
                            accept="image/*"
                            disabled={loading}
                        />

                        <div className="flex space-x-2 mt-4">
                            <Button onClick={() => setIsDialogOpen(false)} variant="outline" disabled={loading}>Cancel</Button>
                            <Button onClick={handleCategoryAction} disabled={loading}>
                                {loading ? "Processing..." : action === 'add' ? 'Add' : 'Update'}
                            </Button>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default CategoryManagement;
