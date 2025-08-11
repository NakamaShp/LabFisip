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
        title: 'Post',
        href: '/Post',
    },
];

interface Post {
    id: number;
    name: string;
    picture: string;
    description: string;
}

interface PageProps {
    flash: {
        message?: string;
        type?: 'success' | 'error';
    };
    Post: Post[];
}

export default function Index() {
    const props = usePage().props as Partial<PageProps>;

    const Post = props.Post ?? [];
    const { delete: destroy, processing } = useForm();

    useEffect(() => {
        const flash = props.flash ?? {};
        if (flash.message) {
            if (flash.type === 'error') {
                toast.error(flash.message, { duration: 3000 });
            } else {
                toast.success(flash.message, { duration: 3000 });
            }
        }
    }, [props.flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4">
                {/* Tombol Create */}
                <Link href={route('Post.Create')}>
                    <Button>Create a Post</Button>
                </Link>

                {/* Table */}
                {Post.length > 0 ? (
                    <Table>
                        <TableCaption>A list of your recent Post.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Picture</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Post.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">{post.id}</TableCell>
                                    <TableCell>{post.name}</TableCell>
                                    <TableCell>{post.picture}</TableCell>
                                    <TableCell>{post.description}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Link href={route('Post.edit', post.id)}>
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
                                                        This will permanently delete the post <strong>{post.name}</strong>.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-red-500 hover:bg-red-600"
                                                        onClick={() => destroy(route('Post.destroy', post.id))}
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
                    <p className="text-gray-500">No post available.</p>
                )}
            </div>
        </AppLayout>
    );
}
