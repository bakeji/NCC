'use client';

import { useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { type Event } from '@/lib/hooks/useEvents';

interface DeleteEventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (eventId: string) => void;
}

export default function DeleteEventModal({ event, isOpen, onClose, onConfirm }: DeleteEventModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !event) return null;

  const handleConfirm = async () => {
    setLoading(true);
    onConfirm(event.id);
    setLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Delete Event</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-600 mb-1">
          Are you sure you want to delete:
        </p>
        <p className="text-sm font-semibold text-gray-900 mb-4 truncate">
          "{event.title}"
        </p>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}