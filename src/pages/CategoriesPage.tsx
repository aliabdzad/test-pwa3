import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Grid3X3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchCategories, Category } from "@/api/categories";

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری دسته بندی ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800 font-medium text-lg">
              دسته بندی ها
            </span>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container mx-auto p-6 pb-20">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-right mb-2">
            همه دسته بندی ها
          </h1>
          <p className="text-gray-600 text-right">
            انتخاب کنید و گیاهان مورد علاقه خود را پیدا کنید
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="relative h-40">
                <img
                  src={category.image}
                  alt={category.nameArabic}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold mb-1 text-right">
                    {category.nameArabic}
                  </h3>
                  <p className="text-sm opacity-90 text-right mb-2">
                    {category.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      {category.itemCount} محصول
                    </span>
                    <span className="text-xs opacity-75">{category.name}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && !loading && (
          <div className="text-center py-12">
            <Grid3X3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              هیچ دسته بندی یافت نشد
            </h3>
            <p className="text-gray-500">لطفاً بعداً دوباره تلاش کنید</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoriesPage;
