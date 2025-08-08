import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appointment',
        href: '/Appointment',
    },
];

export default function Appointment() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appointment" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
        </AppLayout>
    );
}
