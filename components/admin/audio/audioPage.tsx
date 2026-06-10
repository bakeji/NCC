'use client';

import React, { useState } from 'react';
import { Search, Filter, Headphones } from 'lucide-react';
import PageHeader from '../pageHeader';
import Table from '../table';
import Modal from '../modal';
import Input from '../input';
import Select from '../select';
import FileUpload from '../fileUpload';
import Textarea from '../textarea';

interface Audio {
  id: string;
  title: string;
  speaker: string;
  category: string;
  date: string;
  duration: string;
  downloads: number;
  status: 'Published' | 'Draft';
}

const AudioPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudio, setSelectedAudio] = useState<Audio | null>(null);

  // Sample data
  const audioMessages: Audio[] = [
    {
      id: '1',
      title: 'Sunday Service Message',
      speaker: 'Rev Dr. Paul Jinadu',
      category: 'Sunday Service',
      date: 'Oct 15, 2025',
      duration: '42:30',
      downloads: 456,
      status: 'Published',
    },
    {
      id: '2',
      title: 'Wednesday Bible Study',
      speaker: 'Pastor Emmanuel',
      category: 'Bible Study',
      date: 'Oct 13, 2025',
      duration: '35:20',
      downloads: 234,
      status: 'Published',
    },
    {
      id: '3',
      title: 'Prayer Meeting Recording',
      speaker: 'Rev Dr. Paul Jinadu',
      category: 'Prayer',
      date: 'Oct 10, 2025',
      duration: '28:45',
      downloads: 189,
      status: 'Draft',
    },
  ];

  const categories = [
    { value: 'sunday-service', label: 'Sunday Service' },
    { value: 'bible-study', label: 'Bible Study' },
    { value: 'prayer', label: 'Prayer Meeting' },
    { value: 'devotional', label: 'Devotional' },
    { value: 'special', label: 'Special Message' },
  ];

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
            <Headphones className="h-4 w-4 text-orange-600" />
          </div>
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    { key: 'speaker', label: 'Speaker' },
    { key: 'category', label: 'Category' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    {
      key: 'downloads',
      label: 'Downloads',
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${value === 'Published'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
            }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleEdit = (audio: Audio) => {
    setSelectedAudio(audio);
    setIsModalOpen(true);
  };

  const handleDelete = (audio: Audio) => {
    if (confirm(`Are you sure you want to delete "${audio.title}"?`)) {
      console.log('Delete audio:', audio.id);
    }
  };

  const handleView = (audio: Audio) => {
    console.log('View audio:', audio);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setSelectedAudio(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audio Messages"
        description="Manage audio sermons and teachings"
        actionLabel="Upload Audio"
        onAction={() => {
          setSelectedAudio(null);
          setIsModalOpen(true);
        }}
      />

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search audio messages..."
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
        data={audioMessages}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAudio(null);
        }}
        title={selectedAudio ? 'Edit Audio Message' : 'Upload Audio Message'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Audio Title"
            placeholder="Enter audio title"
            defaultValue={selectedAudio?.title}
            required
          />

          <Input
            label="Speaker"
            placeholder="Enter speaker name"
            defaultValue={selectedAudio?.speaker}
            required
          />

          <Select
            label="Category"
            options={categories}
            required
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Date Recorded"
              type="date"
              defaultValue={selectedAudio?.date}
              required
            />
            <Input
              label="Duration"
              placeholder="e.g., 42:30"
              defaultValue={selectedAudio?.duration}
            />
          </div>

          <FileUpload
            label="Cover Image"
            onChange={(file) => console.log('File selected:', file)}
            helperText="Upload a cover image for the audio message"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Audio File <span className="text-red-500">*</span>
            </label>
            <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 hover:bg-gray-100 transition-colors">
              <Headphones className="h-10 w-10 text-gray-400 mb-3" />
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-semibold text-purple-600">Click to upload</span> audio file
              </p>
              <p className="text-xs text-gray-500">MP3, WAV, or AAC up to 100MB</p>
            </div>
          </div>

          <Textarea
            label="Description"
            placeholder="Write audio description..."
            helperText="Brief description of the message"
            rows={4}
          />

          <Textarea
            label="Scripture References"
            placeholder="e.g., Psalms 23, Romans 8:28"
            helperText="Bible verses referenced in this message"
            rows={2}
          />

          <Input
            label="Tags"
            placeholder="worship, prayer, faith"
            helperText="Comma-separated tags for better searchability"
          />

          <Select
            label="Status"
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
            ]}
            defaultValue={selectedAudio?.status.toLowerCase()}
            required
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedAudio(null);
              }}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
            >
              {selectedAudio ? 'Update Audio' : 'Upload Audio'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AudioPage;
