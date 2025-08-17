import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Upload,
  ArrowRight,
  Loader2,
  X,
  Search,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchingText, setIsSearchingText] = useState(false);

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
        throw new Error("جستجوی تصویر ناموفق بود");
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
      setError(
        err instanceof Error ? err.message : "خطایی در حین جستجو رخ داد",
      );
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

  const handleTextSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearchingText(true);
    setError(null);

    try {
      // Send to backend (replace with your actual endpoint)
      const searchResponse = await fetch(
        `/api/text-search?q=${encodeURIComponent(searchQuery)}`,
        {
          method: "GET",
        },
      );

      if (!searchResponse.ok) {
        throw new Error("جستجوی متنی ناموفق بود");
      }

      const results = await searchResponse.json();

      // Mock results for demo (remove when backend is ready)
      const mockResults: SearchResult[] = [
        {
          id: "text1",
          name: "Monstera Deliciosa",
          nameArabic: "گیاه هایی سبز مخروط و زیبا",
          image:
            "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80",
          similarity: 0.92,
          price: 120,
          currency: "ر.س",
        },
        {
          id: "text2",
          name: "Fiddle Leaf Fig",
          nameArabic: "شجرة التين",
          image:
            "https://images.unsplash.com/photo-1606248895514-b5f35a5d4b1e?w=400&q=80",
          similarity: 0.88,
          price: 180,
          currency: "ر.س",
        },
      ];

      setSearchResults(mockResults);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "خطایی در حین جستجوی متنی رخ داد",
      );
    } finally {
      setIsSearchingText(false);
    }
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
            <span>بازگشت</span>
          </Button>
          <h1 className="text-lg font-semibold">جستجو با تصویر</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Upload Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-center flex-1">
                تصویری برای جستجوی گیاه انتخاب کنید
              </h2>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <HelpCircle className="w-5 h-5 text-gray-500" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle className="text-right">
                      راهنمای انتخاب تصویر مناسب
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="relative mb-3">
                          <img
                            src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80"
                            alt="تصویر نامناسب - خیلی نزدیک یا تاری"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-red-500/30 rounded-lg flex items-center justify-center">
                            <X className="w-8 h-8 text-red-500" />
                          </div>
                        </div>
                        <p className="text-sm text-red-600 font-medium">
                          تصویر نامناسب
                        </p>
                        <p className="text-xs text-gray-500">
                          خیلی نزدیک، تاری یا نامشخص
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="relative mb-3">
                          <img
                            src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80"
                            alt="تصویر مناسب - واضح و با فاصله مناسب"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-green-600 font-medium">
                          تصویر مناسب
                        </p>
                        <p className="text-xs text-gray-500">
                          واضح، با فاصله مناسب و کیفیت خوب
                        </p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {!selectedImage ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={handleCameraCapture}
                    className="flex flex-col items-center gap-2 h-24 bg-rose-600 hover:bg-rose-700"
                  >
                    <Camera className="w-6 h-6" />
                    <span>گرفتن عکس</span>
                  </Button>

                  <Button
                    onClick={handleGalleryUpload}
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-24"
                  >
                    <Upload className="w-6 h-6" />
                    <span>از گالری</span>
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
                      در حال جستجو...
                    </>
                  ) : (
                    "جستجوی گیاه"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Text Search Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">جستجو با متن</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="نام گیاه یا توضیحات آن را بنویسید..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-right"
                  dir="rtl"
                />
                <Button
                  onClick={handleTextSearch}
                  disabled={isSearchingText || !searchQuery.trim()}
                  className="bg-rose-600 hover:bg-rose-700 px-4"
                >
                  {isSearchingText ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
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
            <h3 className="text-lg font-bold">نتایج جستجو</h3>

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
                              {Math.round(result.similarity * 100)}% تطبیق
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
