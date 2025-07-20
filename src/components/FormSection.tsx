import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border-2 border-slate-100 p-8 ${className}`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b-2 border-slate-100 pb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h2>
      {children}
    </div>
  );
};