'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PageHeader from '@/components/admin/pageHeader';
import Table from '@/components/admin/table';
import Modal from '@/components/admin/modal';
import { useBlogs, type Blog } from '@/lib/hooks/useblogs';
import BlogForm from './blogForm';
import DeleteBlogModal from './deleteBlogModal';
import { Timestamp } from "firebase/firestore";



export default function BlogsPage() {
  const { blogs, deleteBlog } = useBlogs()



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);



  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category' },
   
    { key: 'created', label: 'created', render:(value:Timestamp) => value.toDate().toLocaleString()  },
    { key: 'updated', label: 'updated', render: (value:Timestamp) => value?  value.toDate().toLocaleString() : ''  },
  ];
  console.log(selectedBlog?.updated)

  const handleEdit = (blog: Blog) => {
  setSelectedBlog(blog);
    setIsModalOpen(true);
  };


  const handleDelete = (blog: Blog) => {
    setBlogToDelete(blog);   // ← open confirm modal
  };

 

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blogs"
        description="Manage your blog posts and articles"
        actionLabel="Create Blog Post"
        onAction={() => {
          setSelectedBlog(null);
          setIsModalOpen(true);
        }}
      />

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
       
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={blogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBlog(null);
        }}
        title={selectedBlog ? 'Edit Blog Post' : 'Create Blog Post'}
        size="lg"
      >
        <BlogForm
          key={selectedBlog?.id ?? 'new'}
          initialData={selectedBlog}
          onSuccess={() => {
            setIsModalOpen(false);
            setSelectedBlog(null);
          }}
        />
      </Modal>

      <DeleteBlogModal
        blog={blogToDelete}
        isOpen={!!blogToDelete}
        onClose={() => setBlogToDelete(null)}
        onConfirm={deleteBlog}
      />

    </div>
  );
}
