import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Home as HomeIcon,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Plant {
  id: string;
  name: string;
  nameArabic: string;
  image: string;
  price: number;
  currency: string;
  category: string;
}

function Home() {
  const navigate = useNavigate();

  const featuredPlant = {
    id: "featured",
    name: "Monstera Deliciosa",
    nameArabic: "گیاه هایی سبز مخروط و زیبا",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
    description: "گیاه های خانگی که برای زیبایی خانه شما مناسب است",
    price: 120,
    currency: "ر.س",
  };

  const plants: Plant[] = [
    {
      id: "1",
      name: "Snake Plant",
      nameArabic: "نبات الثعبان",
      image:
        "https://images.unsplash.com/photo-1616500163176-f951aa91adee?w=400&q=80",
      price: 85,
      currency: "ر.س",
      category: "indoor",
    },
    {
      id: "2",
      name: "Peace Lily",
      nameArabic: "زنبق السلام",
      image:
        "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80",
      price: 95,
      currency: "ر.س",
      category: "indoor",
    },
    {
      id: "3",
      name: "Pothos",
      nameArabic: "بوثوس",
      image:
        "https://images.unsplash.com/photo-1622548231246-fal87f72a7c?w=400&q=80",
      price: 75,
      currency: "ر.س",
      category: "hanging",
    },
    {
      id: "4",
      name: "Fiddle Leaf Fig",
      nameArabic: "شجرة التين",
      image:
        "https://images.unsplash.com/photo-1606248895514-b5f35a5d4b1e?w=400&q=80",
      price: 180,
      currency: "ر.س",
      category: "tree",
    },
    {
      id: "5",
      name: "Lotus",
      nameArabic: "زهرة اللوتس",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
      price: 110,
      currency: "ر.س",
      category: "flower",
    },
    {
      id: "6",
      name: "Rubber Plant",
      nameArabic: "نبات المطاط",
      image:
        "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400&q=80",
      price: 130,
      currency: "ر.س",
      category: "tree",
    },
    {
      id: "7",
      name: "Spider Plant",
      nameArabic: "نبات العنكبوت",
      image:
        "https://images.unsplash.com/photo-1586093248292-4e6ef75b8c8a?w=400&q=80",
      price: 65,
      currency: "ر.س",
      category: "hanging",
    },
    {
      id: "8",
      name: "Aloe Vera",
      nameArabic: "الصبار",
      image:
        "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&q=80",
      price: 55,
      currency: "ر.س",
      category: "succulent",
    },
  ];

  const gardenPlants = [
    {
      id: "garden1",
      name: "Garden Monstera",
      nameArabic: "گیاهان باغچه ای",
      image:
        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
      description: "مناسب برای باغچه های خانگی",
    },
    {
      id: "garden2",
      name: "Garden Collection",
      nameArabic: "گیاهان باغچه ای",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      description: "مجموعه ای از گیاهان باغچه",
    },
    {
      id: "garden3",
      name: "Tropical Garden",
      nameArabic: "گیاهان باغچه ای",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      description: "گیاهان استوایی برای باغچه",
    },
    {
      id: "garden4",
      name: "Flowering Garden",
      nameArabic: "گیاهان باغچه ای",
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
      description: "گیاهان گلدار برای باغچه",
    },
    {
      id: "garden5",
      name: "Rose Garden",
      nameArabic: "گل های زیبای",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
      description: "مجموعه ای از گل های رز",
    },
    {
      id: "garden6",
      name: "Green Garden",
      nameArabic: "گیاهان باغچه ای",
      image:
        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
      description: "گیاهان سبز برای باغچه",
    },
  ];

  const handlePlantClick = (plantId: string) => {
    navigate(`/plant/${plantId}`);
  };

  const handleFeaturedClick = () => {
    navigate("/plant/featured");
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3"></div>
          <button
            onClick={() => navigate("/image-search")}
            className="flex items-center gap-2 hover:bg-red-50 p-2 rounded-lg transition-colors"
          >
            <Camera className="w-5 h-5 text-red-600" />
            <span className="text-red-600 font-medium">جستجو با تصویر</span>
          </button>
        </div>
      </header>

      <main className="pb-20">
        {/* Featured Plant Section */}
        <section className="bg-gradient-to-b from-gray-100 to-white p-6">
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
            onClick={handleFeaturedClick}
          >
            <img
              src={featuredPlant.image}
              alt={featuredPlant.nameArabic}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">
                {featuredPlant.nameArabic}
              </h1>
              <p className="text-sm opacity-90 mb-4">
                {featuredPlant.description}
              </p>
              <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-6">
                نمایش بیشتر
              </Button>
            </div>
          </div>
        </section>

        {/* Indoor Plants Grid */}
        <section className="p-6">
          <h2 className="text-xl font-bold mb-4 text-right">
            گیاهان گلخانه ای انتخاب شده
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {plants.map((plant) => (
              <Card
                key={plant.id}
                className="overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02] shadow-sm"
                onClick={() => handlePlantClick(plant.id)}
              >
                <div className="relative">
                  <img
                    src={plant.image}
                    alt={plant.nameArabic}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-gray-700">
                      {plant.currency}
                    </span>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm text-right mb-1">
                    {plant.nameArabic}
                  </h3>
                  <p className="text-xs text-gray-500 text-right mb-2">
                    {plant.name}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold">
                      {plant.price} {plant.currency}
                    </span>
                    <Heart className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* More Plants Button */}
        <section className="px-6 mb-6">
          <Button
            className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-full py-3"
            onClick={() => navigate("/categories")}
          >
            مشاهده همه دسته بندی ها
          </Button>
        </section>

        {/* Garden Plants Section */}
        <section className="p-6">
          <h2 className="text-xl font-bold mb-4 text-right">دسته بندی ها</h2>
          <div className="space-y-4">
            {gardenPlants.map((plant) => (
              <Card
                key={plant.id}
                className="overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.01] shadow-sm"
                onClick={() => handlePlantClick(plant.id)}
              >
                <div className="relative h-32">
                  <img
                    src={plant.image}
                    alt={plant.nameArabic}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center p-4 text-white">
                    <h3 className="text-lg font-bold mb-1">
                      {plant.nameArabic}
                    </h3>
                    <p className="text-sm opacity-90">{plant.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
