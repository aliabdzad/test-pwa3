import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface PlantInfoProps {
  plantName?: string;
  englishName?: string;
  plantType?: string;
  size?: string;
  price?: number;
  imageUrl?: string;
  description?: string;
  nameArabic?: string;
  nameEnglish?: string;
  type?: string;
  careLevel?: string;
  currency?: string;
}

const PlantInfo = ({
  plantName,
  englishName,
  plantType,
  size,
  price = 120,
  imageUrl = "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
  description = "نبات داخلي، شكله جميل، سهل العناية، يناسب الإضاءة المنخفضة",
  nameArabic = "كل زنجبوفيليا",
  nameEnglish = "Zanzibar Gem",
  type = "نباتي",
  careLevel = "سهل العناية",
  currency = "ر.س",
}: PlantInfoProps) => {
  const displayName = plantName || nameArabic;
  const displayEnglishName = englishName || nameEnglish;
  const displayType = plantType || type;
  const displaySize = size || "متوسط";
  return (
    <div className="bg-white p-4 md:p-6 flex flex-col w-full">
      {/* Plant Image */}
      <div className="w-full mb-6">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={plantName}
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
        </div>
      </div>
      {/* Plant Information */}
      <div className="flex flex-col space-y-4">
        {/* Plant Name - RTL Support */}
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold">{displayName}</h1>
          <h2 className="text-lg text-gray-600">{displayEnglishName}</h2>
        </div>

        {/* Plant Details */}
        <div className="flex flex-col space-y-2 text-right">
          <div className="flex justify-end items-center gap-2">
            <span className="text-gray-700">{displayType}</span>
            <span className="text-gray-500">:النوع</span>
          </div>
          <div className="flex justify-end items-center gap-2">
            <span className="text-gray-700">{displaySize}</span>
            <span className="text-gray-500">:الحجم</span>
          </div>
          {careLevel && (
            <div className="flex justify-end items-center gap-2">
              <span className="text-gray-700">{careLevel}</span>
              <span className="text-gray-500">:مستوى العناية</span>
            </div>
          )}
          <div className="flex justify-end items-center gap-2">
            <span className="text-gray-700">{description}</span>
            <span className="text-gray-500">:وصف</span>
          </div>
        </div>

        {/* Price and Purchase Button */}
        <div className="mt-6">
          <div className="flex justify-between items-center lg:relative md:absolute fixed">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-full flex items-center gap-2">
              <ShoppingCart size={18} />
              <span>شراء هذا النبات ارسال كل يوم</span>
            </Button>
            <div className="text-right">
              <span className="text-xl font-bold">
                {price} {currency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantInfo;
