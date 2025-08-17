import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, ArrowRight, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SearchResult {
  id: string;
  name: string;
  nameArabic: string;
  image: string;
  similarity: number;
  price: number;
  currency: string;
}

function ImageSearchPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("capture", "environment");
      fileInputRef.current.click();
    }
  };

  const handleGalleryUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
  };

  const handleSearch = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      // Convert base64 to blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Create FormData
      const formData = new FormData();
      formData.append("image", blob, "search-image.jpg");

      // Send to backend (replace with your actual endpoint)
      const searchResponse = await fetch("/api/image-search", {
        method: "POST",
        body: formData,
      });

      if (!searchResponse.ok) {
        throw new Error("فشل في البحث عن الصورة");
      }

      const results = await searchResponse.json();

      // Mock results for demo (remove when backend is ready)
      const mockResults: SearchResult[] = [
        {
          id: "1",
          name: "Monstera Deliciosa",
          nameArabic: "گیاه هایی سبز مخروط و زیبا",
          image:
            "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80",
          similarity: 0.95,
          price: 120,
          currency: "ر.س",
        },
        {
          id: "2",
          name: "Snake Plant",
          nameArabic: "نبات الثعبان",
          image:
            "https://images.unsplash.com/photo-1616500163176-f951aa91adee?w=400&q=80",
          similarity: 0.87,
          price: 85,
          currency: "ر.س",
        },
        {
          id: "3",
          name: "Peace Lily",
          nameArabic: "زنبق السلام",
          image:
            "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80",
          similarity: 0.82,
          price: 95,
          currency: "ر.س",
        },
      ];

      setSearchResults(mockResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء البحث");
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setSearchResults([]);
    setError(null);
  };

  const handleResultClick = (plantId: string) => {
    navigate(`/plant/${plantId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>رجوع</span>
          </Button>
          <h1 className="text-lg font-semibold">البحث بالصورة</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Upload Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              اختر صورة للبحث عن النبات
            </h2>

            {!selectedImage ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={handleCameraCapture}
                    className="flex flex-col items-center gap-2 h-24 bg-rose-600 hover:bg-rose-700"
                  >
                    <Camera className="w-6 h-6" />
                    <span>التقاط صورة</span>
                  </Button>

                  <Button
                    onClick={handleGalleryUpload}
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-24"
                  >
                    <Upload className="w-6 h-6" />
                    <span>من المعرض</span>
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected plant"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    onClick={clearImage}
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 left-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full bg-rose-600 hover:bg-rose-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      جاري البحث...
                    </>
                  ) : (
                    "البحث عن النبات"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-600 text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">نتائج البحث</h3>

            <div className="space-y-3">
              {searchResults.map((result) => (
                <Card
                  key={result.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleResultClick(result.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={result.image}
                        alt={result.nameArabic}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">
                              {result.nameArabic}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {result.name}
                            </p>
                          </div>
                          <div className="text-left">
                            <p className="font-bold">
                              {result.price} {result.currency}
                            </p>
                            <p className="text-xs text-green-600">
                              {Math.round(result.similarity * 100)}% تطابق
                            </p>
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${result.similarity * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ImageSearchPage;
