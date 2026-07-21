import React, { useState, useEffect } from 'react';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import CategoryTree from '@/components/admin/CategoryTree.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';

const CategoriesManagementPage = () => {
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!currentUser?.clinic_id) return;
      try {
        const records = await apiServerClient.fetch('/categories');
        setCategories(records);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [currentUser]);

  return (
    <>
      <Helmet><title>Categories | Admin</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Manage Categories</h1>
                <Button>Add Category</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="admin-card md:col-span-1 h-[600px] overflow-y-auto">
                  <h2 className="font-semibold mb-4">Category Tree</h2>
                  {isLoading ? <div className="animate-pulse h-32 bg-muted rounded-lg" /> : (
                    <CategoryTree categories={categories} onSelect={setSelectedCat} selectedId={selectedCat?.id} />
                  )}
                </div>
                
                <div className="admin-card md:col-span-2">
                  {selectedCat ? (
                    <div className="space-y-4">
                      <h2 className="font-semibold border-b border-border pb-2">Edit Category</h2>
                      <Input label="Name" value={selectedCat.name} onChange={() => {}} />
                      <Input label="Slug" value={selectedCat.slug} onChange={() => {}} />
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Select a category to edit or create a new one.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CategoriesManagementPage;