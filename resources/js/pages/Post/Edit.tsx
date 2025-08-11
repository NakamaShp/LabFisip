import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

import { Head, useForm } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';

interface Post {
    id: number;
    name: string;
    description: string;
    picture: string;
}

interface Props {
    post: Post;
}

export default function Edit({ post }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: post.name,
        picture: null as File | null,
        description: post.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('Post.update', post.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a Post', href: `/Post/${post.id}/edit` }]}>
            <Head title="Update a Post" />

            <div className="mx-auto w-full max-w-4xl p-6">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Update a Post</CardTitle>
                        <CardDescription className="text-base">Update the details below to edit this post in your catalog.</CardDescription>
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
                                <Label htmlFor="name">Post Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter Post name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="h-11"
                                />
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <Label htmlFor="picture">Picture</Label>
                                <Input
                                    id="picture"
                                    type="file"
                                    placeholder="Enter post picture"
                                    accept="image/*"
                                    onChange={(e) => setData('picture', e.target.files ? e.target.files[0] : null)}
                                    className="h-11"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter post description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="min-h-[120px]"
                                />
                            </div>

                            {/* Submit */}
                            <Button type="submit" disabled={processing} size="lg" className="w-full">
                                {processing ? 'Updating...' : 'Update Post'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
