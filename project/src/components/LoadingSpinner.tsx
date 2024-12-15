import React from 'react';
import { Brain } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin">
        <Brain className="w-8 h-8 text-blue-500" />
      </div>
    </div>
  );
};