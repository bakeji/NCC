"use client"
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase.config';
import { toast } from 'sonner';
import { uploadImage } from '@/lib/uploadImage';
import {type Blog} from "@/lib/hooks/useblogs"


// Initial data
interface BlogFormProps {
  initialData?: Blog | null;  // ← use Blog directly
  onSuccess?: () => void;
}



// Zod Schema
const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  image: z.instanceof(File).optional(),
  excerpt: z.string().max(200, 'Excerpt must be less than 200 characters').optional(),
  content: z.string().min(1, 'Content is required'),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function BlogForm({ initialData, onSuccess }: BlogFormProps) {
 const categories = [
    { value: 'spiritual-growth', label: 'Spiritual Growth' },
    { value: 'prayer', label: 'Prayer' },
    { value: 'theology', label: 'Theology' },
    { value: 'worship', label: 'Worship' },
    { value: 'family', label: 'Family' },
  ];
  const {
     register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          author: initialData.author,
          category: initialData.category,
          excerpt: initialData.excerpt ?? '',
          content: initialData.content,
          // image is a File — can't pre-populate, handled separately
        }
      : undefined,
  });

  useEffect(() => {
  if (initialData) {
    reset({
      title: initialData.title,
      author: initialData.author,
      category: initialData.category,
      excerpt: initialData.excerpt ?? '',
      content: initialData.content,
      // image intentionally omitted
    });
  } else {
    reset(); // clear form when switching to create mode
  }
}, [initialData, reset]);
  const [loading, setLoading] = useState(false)


  async function addBlog(data: BlogFormData) {
  setLoading(true);
  try {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const user = auth.currentUser;

    if (!user) {
      toast.error('You must be logged in to publish a blog');
      return;
    }

    // Only upload a new image if one was selected
    let imageUrl = initialData?.image ?? '';
    if (data.image instanceof File) {
      imageUrl = await uploadImage(data.image);
    }



    if (initialData?.id) {
      // Edit mode — update existing doc
      await updateDoc(doc(db, 'blogs', initialData.id), {
        title: data.title,
        author: data.author,
        category: data.category,
        image: imageUrl,
        excerpt: data.excerpt,
        content: data.content,
        updated: serverTimestamp(),
      });
      toast.success('Blog updated successfully!');
    } else {
      // Create mode
      await addDoc(collection(db, 'blogs'), {
        title: data.title,
        author: data.author,
        category: data.category,
        image: imageUrl,
        excerpt: data.excerpt,
        content: data.content,
        created: serverTimestamp(),
      });
      toast.success('Blog published successfully!');
    }

    onSuccess?.();
  } catch (error) {
    toast.error(`Error: ${(error as Error).message}`);
  } finally {
    setLoading(false);
  }
}



  const handleCancel = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(addBlog)} className="space-y-6">
      {/* Title */}
      <div className="w-full">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter blog title"
          className={`block w-full rounded-lg border ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
          {...register('title')}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Author */}
      <div className="w-full">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="author"
          type="text"
          placeholder="Enter author name"
          className={`block w-full rounded-lg border ${
            errors.author ? 'border-red-300' : 'border-gray-300'
          } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
          {...register('author')}
        />
        {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>}
      </div>

      {/* Category */}
      <div className="w-full">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="category"
          className={`block w-full rounded-lg border ${
            errors.category ? 'border-red-300' : 'border-gray-300'
          } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
          {...register('category')}
        >
          <option value="">Select a category</option>
          {categories.map((category, id)=>(
          <option key={id} value={category.value}>{category.label}</option>
          ))}
        
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
      </div>

      {/* Featured Image */}
      <div className="w-full">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Featured Image
        </label>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <input
              id="image"
              type="file"
              accept="image/*"
              className={`block w-full rounded-lg border ${
                errors.image ? 'border-red-300' : 'border-gray-300'
              } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
              }}
              {...field}
            />
          )}
        />
        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
        {!errors.image && (
          <p className="mt-1 text-sm text-gray-500">Upload a featured image for this blog post</p>
        )}
      </div>

      {/* Excerpt */}
      <div className="w-full">
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          placeholder="Write a brief excerpt..."
          rows={3}
          maxLength={200}
          className={`block w-full rounded-lg border ${
            errors.excerpt ? 'border-red-300' : 'border-gray-300'
          } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors resize-none`}
          {...register('excerpt')}
        />
        {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>}
        {!errors.excerpt && (
          <p className="mt-1 text-sm text-gray-500">A short summary of the blog post (max 200 characters)</p>
        )}
      </div>

      {/* Content */}
      <div className="w-full">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="content"
          placeholder="Write your blog content here..."
          rows={6}
          className={`block w-full rounded-lg border ${
            errors.content ? 'border-red-300' : 'border-gray-300'
          } px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors resize-none`}
          {...register('content')}
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
        {!errors.content && (
          <p className="mt-1 text-sm text-gray-500">Full blog post content</p>
        )}
      </div>

     

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
        >
        {loading
    ? initialData ? 'Saving...' : 'Publishing...'
    : initialData ? 'Save Changes' : 'Publish Blog'}
        </button>
      </div>
    </form>
  );
}