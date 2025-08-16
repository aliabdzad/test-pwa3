import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchCategoryById, Category } from "@/api/categories";
import { fetchProductsByCategory, Product } from "@/api/products";

const CategoryItemPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryData = async () => {
      if (!categoryId) return;

      try {
        const [categoryData, productsData] = await Promise.all([
          fetchCategoryById(categoryId),
          fetchProductsByCategory(categoryId),
        ]);

        setCategory(categoryData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [categoryId]);

  const handleProductClick = (productId: string) => {
    navigate(`/plant/${productId}`);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری محصولات...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            دسته بندی یافت نشد
          </h2>
          <p className="text-gray-600 mb-4">دسته بندی مورد نظر وجود ندارد</p>
          <Button
            onClick={() => navigate("/categories")}
            className="bg-rose-600 hover:bg-rose-700"
          >
            بازگشت به دسته بندی ها
          </Button>
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
            onClick={() => navigate("/categories")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-medium text-gray-800">
              {category.nameArabic}
            </h1>
            <p className="text-sm text-gray-500">{products.length} محصول</p>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="pb-20">
        {/* Category Hero Section */}
        <section className="relative h-48 overflow-hidden">
          <img
            src={category.image}
            alt={category.nameArabic}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2 text-right">
              {category.nameArabic}
            </h2>
            <p className="text-sm opacity-90 text-right">
              {category.description}
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="p-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.nameArabic}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs font-medium text-gray-700">
                        {product.currency}
                      </span>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs font-medium bg-red-600 px-2 py-1 rounded">
                          ناموجود
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm text-right mb-1 line-clamp-1">
                      {product.nameArabic}
                    </h3>
                    <p className="text-xs text-gray-500 text-right mb-2 line-clamp-1">
                      {product.name}
                    </p>
                    {product.description && (
                      <p className="text-xs text-gray-600 text-right mb-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-rose-600">
                        {product.price} {product.currency}
                      </span>
                      <Heart className="w-4 h-4 text-gray-400 hover:text-rose-500 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                هیچ محصولی یافت نشد
              </h3>
              <p className="text-gray-500 mb-4">
                در این دسته بندی محصولی موجود نیست
              </p>
              <Button
                onClick={() => navigate("/categories")}
                className="bg-rose-600 hover:bg-rose-700"
              >
                مشاهده سایر دسته بندی ها
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CategoryItemPage;
