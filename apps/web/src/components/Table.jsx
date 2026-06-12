
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/Button.jsx';

const Table = ({ 
  headers, 
  children, 
  page = 1, 
  totalPages = 1, 
  onPageChange,
  isEmpty = false,
  emptyMessage = "No data available."
}) => {
  return (
    <div className={`flex flex-col gap-4 w-full`}>
      <div className="table-wrapper hidden md:block">
        <table className="data-table w-full border-collapse">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th className="bg-muted text-start py-2 px-4" key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan={headers.length} className="text-center py-8 text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Card View Fallback */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {isEmpty ? (
          <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-xl">
            {emptyMessage}
          </div>
        ) : (
          children
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground hidden sm:block">
            Showing page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2 sm:ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            <span className="text-sm font-medium px-4 sm:hidden">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
