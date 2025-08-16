import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

interface Plant {
  id: string;
  name: string;
  nameArabic: string;
  image: string;
  price: number;
  currency: string;
}

interface RelatedPlantsProps {
  plants?: Plant[];
  title?: string;
}

const RelatedPlants = ({
  plants = [
    {
      id: "1",
      name: "Snake Plant",
      nameArabic: "نبات الثعبان",
      image:
        "https://images.unsplash.com/photo-1616500163176-f951aa91adee?w=400&q=80",
      price: 120,
      currency: "SAR",
    },
    {
      id: "2",
      name: "Monstera Deliciosa",
      nameArabic: "مونستيرا ديليسيوسا",
      image:
        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80",
      price: 150,
      currency: "SAR",
    },
    {
      id: "3",
      name: "Peace Lily",
      nameArabic: "زنبق السلام",
      image:
        "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80",
      price: 90,
      currency: "SAR",
    },
    {
      id: "4",
      name: "Fiddle Leaf Fig",
      nameArabic: "شجرة التين",
      image:
        "https://images.unsplash.com/photo-1606248895514-b5f35a5d4b1e?w=400&q=80",
      price: 200,
      currency: "SAR",
    },
    {
      id: "5",
      name: "Pothos",
      nameArabic: "بوثوس",
      image:
        "https://images.unsplash.com/photo-1622548231246-fal87f72a7c?w=400&q=80",
      price: 80,
      currency: "SAR",
    },
  ],
  title = "نباتات ذات صلة",
}: RelatedPlantsProps) => {
  return (
    <div className="w-full bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-right">{title}</h2>
          <button className="text-sm text-gray-500 flex items-center">
            عرض الكل
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <ScrollArea className="w-full">
          <div className="flex space-x-4 space-x-reverse rtl:space-x-reverse pb-4">
            {plants.map((plant) => (
              <Card
                key={plant.id}
                className="min-w-[200px] max-w-[200px] border rounded-lg overflow-hidden flex-shrink-0"
              >
                <div className="h-[150px] w-full overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3 text-right">
                  <h3 className="font-medium text-sm">{plant.nameArabic}</h3>
                  <p className="text-xs text-gray-500">{plant.name}</p>
                  <p className="mt-2 font-semibold text-sm">
                    {plant.price} {plant.currency}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RelatedPlants;
