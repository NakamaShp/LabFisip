import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

import { Head, useForm } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('Products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a Product', href: `/Products/${product.id}/edit` }]}>
            <Head title="Update a Product" />

            <div className="mx-auto w-full max-w-4xl p-6">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Update a Product</CardTitle>
                        <CardDescription className="text-base">Update the details below to edit this product in your catalog.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        {/* Error Alert */}
                        {Object.keys(errors).length > 0 && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertCircleIcon className="h-5 w-5" />
                                <AlertTitle>There were some problems with your input:</AlertTitle>
                                <AlertDescription>
                                    <ul className="list-disc pl-5">
                                        {Object.entries(errors).map(([key, message]) => (
                                            <li key={key}>{message as string}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleUpdate} className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter product name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="h-11"
                                />
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="Enter product price"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="h-11"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter product description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="min-h-[120px]"
                                />
                            </div>

                            {/* Submit */}
                            <Button type="submit" disabled={processing} size="lg" className="w-full">
                                {processing ? 'Updating...' : 'Update Product'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
