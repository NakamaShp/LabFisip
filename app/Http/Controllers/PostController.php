<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->get();
        return Inertia::render('Post/index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        return Inertia::render('Post/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'picture' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('picture')) {
            $validated['picture'] = $request->file('picture')->store('posts', 'public');
        }

        Post::create($validated);

        return redirect()
            ->route('Post.index')
            ->with('message', 'Post berhasil dibuat!');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Post/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('picture')) {
            if ($post->picture && Storage::disk('public')->exists($post->picture)) {
                Storage::disk('public')->delete($post->picture);
            }
            $validated['picture'] = $request->file('picture')->store('posts', 'public');
        } else {
            $validated['picture'] = $post->picture;
        }

        $post->update($validated);

        return redirect()
            ->route('Post.index')
            ->with('message', 'Post berhasil diperbarui!');
    }

    public function destroy(Post $post)
    {
        if ($post->picture && Storage::disk('public')->exists($post->picture)) {
            Storage::disk('public')->delete($post->picture);
        }

        $post->delete();

        return redirect()
            ->route('Post.index')
            ->with('message', 'Post berhasil dihapus!');
    }
}
