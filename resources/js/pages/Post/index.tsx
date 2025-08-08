import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button'


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/Post',
    },
];

export default function Appointment() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
           <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('Post.Create')}>
                    <Button>Create a Post</Button>
                </Link>
            </div>
        </AppLayout>
    );
}
