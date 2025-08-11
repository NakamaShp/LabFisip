import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircleIcon, Upload } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Create a New Post', href: '/Post/Create' }];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        picture: null as File | null,
        description: '',
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('picture', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('Post.Store'), { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Post" />

            <div className="mx-auto w-full max-w-5xl p-6">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create a New Post</CardTitle>
                        <CardDescription className="text-base">Update the details below to add a new post.</CardDescription>
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

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {/* LEFT COLUMN */}
                            <div className="space-y-6">
                                {/* Post Name */}
                                <div>
                                    <Label htmlFor="name" className="mb-2 block">
                                        Post Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter post name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="h-11"
                                        required
                                    />
                                </div>

                                {/* Picture Upload */}
                                <div>
                                    <Label htmlFor="picture" className="mb-2 block">
                                        Picture
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="picture"
                                            name="picture"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            required
                                            className="h-10 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-primary/90"
                                        />
                                        <Upload className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" size={18} />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <Label htmlFor="description" className="mb-2 block">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter post description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="min-h-[150px]"
                                        required
                                    />
                                </div>

                                {/* Submit */}
                                <Button type="submit" disabled={processing} size="lg" className="w-full">
                                    {processing ? 'Saving...' : 'Add Post'}
                                </Button>
                            </div>

                            {/* RIGHT COLUMN - Preview */}
                            <div className="flex flex-col items-center justify-start">
                                <div className="w-full rounded-lg border bg-gray-50 p-4 dark:bg-gray-900">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="max-h-[350px] w-full rounded-md object-contain shadow-sm" />
                                    ) : (
                                        <div className="flex h-[350px] w-full items-center justify-center text-gray-400">No image selected</div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
