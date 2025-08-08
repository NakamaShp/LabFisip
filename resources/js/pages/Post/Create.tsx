import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Post',
        href: '/Post/Create',
    },
];

export default function Index() {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        picture: null,
        description: '',
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFiles = (file: File) => {
        setData('picture', file);
        setPreview(URL.createObjectURL(file));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new Post" />
            <div className="w-6/12 gap-1.5 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div className="gap-1.5">
                        <Label htmlFor="post-title">Title</Label>
                        <Input id="post-title" placeholder="Add a Title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    {/* Picture Drag & Drop */}
                    <div className="gap-1.5">
                        <Label htmlFor="post-picture">Picture</Label>
                        <div
                            className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('picture-input')?.click()}
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded-lg object-cover" />
                            ) : (
                                <p className="text-gray-500">
                                    Drag & drop an image here, or <span className="text-blue-500 underline">browse</span>
                                </p>
                            )}
                            <input id="picture-input" type="file" accept="image/*" className="hidden" onChange={handleChange} />
                        </div>
                        {errors.picture && <p className="text-sm text-red-500">{errors.picture}</p>}
                    </div>

                    {/* Progress Bar */}
                    {progress && (
                        <div className="h-2 w-full rounded-full bg-gray-200">
                            <div className="h-2 rounded-full bg-blue-500" style={{ width: `${progress.percentage}%` }} />
                        </div>
                    )}

                    {/* Description */}
                    <div className="gap-1.5">
                        <Label htmlFor="post-description">Description</Label>
                        <Textarea
                            id="post-description"
                            placeholder="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    {/* Submit */}
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Uploading...' : 'Add Post'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
