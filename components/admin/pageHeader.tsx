import React from 'react';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="mb-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          )}
        </div>
        {actionLabel && onAction && (
          <div className="mt-4 sm:mt-0">
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;