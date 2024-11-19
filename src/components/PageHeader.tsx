import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  icon: LucideIcon;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, icon: Icon, actions }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <Icon className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {actions && <div className="flex space-x-3">{actions}</div>}
    </div>
  );
};

export default PageHeader;