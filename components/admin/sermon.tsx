'use client';

import React, { useState } from 'react';

import { Search, Filter, Play } from 'lucide-react';
import PageHeader from './pageHeader';
import Table from './table';
import Modal from './modal';
import Input from './input';
import Select from './select';
import FileUpload from './fileUpload';
import Textarea from './textarea';

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  series: string;
  date: string;
  duration: string;
  views: number;
  status: 'Published' | 'Draft';
}

const SermonsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);

  // Sample data
  const sermons: Sermon[] = [
    {
      id: '1',
      title: 'Walking in Faith: A Life of Purpose',
      speaker: 'Rev Dr. Paul Jinadu',
      series: 'Living by Faith',
      date: 'Oct 12, 2025',
      duration: '45:23',
      views: 2543,
      status: 'Published',
    },
    {
      id: '2',
      title: 'The Power of Prayer',
      speaker: 'Pastor Emmanuel',
      series: 'Prayer Series',
      date: 'Oct 5, 2025',
      duration: '38:15',
      views: 1892,
      status: 'Published',
    },
    {
      id: '3',
      title: 'God\'s Grace and Mercy',
      speaker: 'Rev Dr. Paul Jinadu',
      series: 'Understanding Grace',
      date: 'Sep 28, 2025',
      duration: '52:10',
      views: 3120,
      status: 'Published',
    },
  ];

  const sermonSeries = [
    { value: 'living-by-faith', label: 'Living by Faith' },
    { value: 'prayer-series', label: 'Prayer Series' },
    { value: 'understanding-grace', label: 'Understanding Grace' },
    { value: 'worship', label: 'Heart of Worship' },
    { value: 'family', label: 'Biblical Family' },
  ];

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
            <Play className="h-4 w-4 text-purple-600" />
          </div>
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    { key: 'speaker', label: 'Speaker' },
    { key: 'series', label: 'Series' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    {
      key: 'views',
      label: 'Views',
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            value === 'Published'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleEdit = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    setIsModalOpen(true);
  };

  const handleDelete = (sermon: Sermon) => {
    if (confirm(`Are you sure you want to delete "${sermon.title}"?`)) {
      console.log('Delete sermon:', sermon.id);
    }
  };

  const handleView = (sermon: Sermon) => {
    console.log('View sermon:', sermon);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setSelectedSermon(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sermons"
        description="Manage video sermons and messages"
        actionLabel="Upload Sermon"
        onAction={() => {
          setSelectedSermon(null);
          setIsModalOpen(true);
        }}
      />

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search sermons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={sermons}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSermon(null);
        }}
        title={selectedSermon ? 'Edit Sermon' : 'Upload Sermon'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Sermon Title"
            placeholder="Enter sermon title"
            defaultValue={selectedSermon?.title}
            required
          />

          <Input
            label="Speaker"
            placeholder="Enter speaker name"
            defaultValue={selectedSermon?.speaker}
            required
          />

          <Select
            label="Sermon Series"
            options={sermonSeries}
            required
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Date Preached"
              type="date"
              defaultValue={selectedSermon?.date}
              required
            />
            <Input
              label="Duration"
              placeholder="e.g., 45:23"
              defaultValue={selectedSermon?.duration}
            />
          </div>

          <FileUpload
            label="Video Thumbnail"
            onChange={(file) => console.log('File selected:', file)}
            helperText="Upload a thumbnail image for the sermon"
          />

          <Input
            label="Video URL"
            type="url"
            placeholder="https://youtube.com/..."
            helperText="YouTube, Vimeo, or direct video link"
            required
          />

          <Input
            label="Download Link (Optional)"
            type="url"
            placeholder="https://..."
            helperText="Direct download link for the sermon video"
          />

          <Textarea
            label="Description"
            placeholder="Write sermon description..."
            helperText="Brief description of the sermon message"
            rows={4}
          />

          <Textarea
            label="Scripture References"
            placeholder="e.g., Matthew 5:1-12, John 3:16"
            helperText="Bible verses referenced in this sermon"
            rows={2}
          />

          <Input
            label="Tags"
            placeholder="faith, prayer, worship"
            helperText="Comma-separated tags for better searchability"
          />

          <Select
            label="Status"
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
            ]}
            defaultValue={selectedSermon?.status.toLowerCase()}
            required
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedSermon(null);
              }}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
            >
              {selectedSermon ? 'Update Sermon' : 'Upload Sermon'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SermonsPage;