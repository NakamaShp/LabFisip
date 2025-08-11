import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      <Head title="Create a New Product" />

      <div className="mx-auto w-full max-w-4xl p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Create a New Product</CardTitle>
            <CardDescription className="text-base">
              Fill in the details below to add a new product to your catalog.
            </CardDescription>
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                {processing ? 'Saving...' : 'Add Product'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
