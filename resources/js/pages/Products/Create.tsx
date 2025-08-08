import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Product',
        href: '/Products/Create',
    },
];

export default function Index() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('Products.Store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new Product" />
            <div className="w-6/12 gap-1.5 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Handle Error */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul className="">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="gap-1.5">
                        <Label htmlFor="product name">Name</Label>
                        <Input placeholder="Product Name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="product price">Price</Label>
                        <Input placeholder="Price" value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="product description">description</Label>
                        <Textarea placeholder="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </div>
                    <Button type="submit">Add Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
