import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/Products',
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface PageProps {
    flash: {
        message?: string;
        type?: 'success' | 'error';
    };
    Products: Product[];
}

export default function index() {
    const { Products, flash } = usePage().props as PageProps;
    const { delete: destroy, processing } = useForm();

    // Sonner toast saat ada flash.message
    useEffect(() => {
        if (flash.message) {
            if (flash.type === 'error') {
                toast.error(flash.message, { duration: 3000 });
            } else {
                toast.success(flash.message, { duration: 3000 });
            }
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4">
                {/* Tombol Create */}
                <Link href={route('Products.Create')}>
                    <Button>Create a Product</Button>
                </Link>

                {/* Table */}
                {Products.length > 0 ? (
                    <Table>
                        <TableCaption>A list of your recent Products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Link href={route('Products.edit', product.id)}>
                                            <Button className="" variant="secondary">
                                                Edit
                                            </Button>
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" disabled={processing}>
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will permanently delete the product <strong>{product.name}</strong>.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-red-500 hover:bg-red-600"
                                                        onClick={() => destroy(route('Products.destroy', product.id))}
                                                    >
                                                        Yes, Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-gray-500">No products available.</p>
                )}
            </div>
        </AppLayout>
    );
}
