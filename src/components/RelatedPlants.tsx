import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchSimilarProducts, Product } from "@/api/products";

interface RelatedPlantsProps {
  plants?: Product[];
  title?: string;
  currentProductId?: string;
  onPlantClick?: (plantId: string) => void;
}

const RelatedPlants = ({
  plants,
  title = "نباتات ذات صلة",
  currentProductId,
  onPlantClick,
}: RelatedPlantsProps) => {
  const [similarPlants, setSimilarPlants] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadSimilarPlants = async () => {
      if (currentProductId) {
        setLoading(true);
        try {
          const similar = await fetchSimilarProducts(currentProductId);
          setSimilarPlants(similar);
        } catch (error) {
          console.error("Error loading similar products:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadSimilarPlants();
  }, [currentProductId]);

  const displayPlants = plants || similarPlants;
  const itemsPerView = 2;
  const maxIndex = Math.max(0, displayPlants.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handlePlantClick = (plantId: string) => {
    if (onPlantClick) {
      onPlantClick(plantId);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-right mb-4">{title}</h2>
          <div className="flex space-x-4 space-x-reverse rtl:space-x-reverse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[200px] max-w-[200px] animate-pulse"
              >
                <div className="h-[150px] bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
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

        <div className="relative">
          {/* Navigation Buttons */}
          {displayPlants.length > itemsPerView && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-50 rounded-full w-8 h-8 p-0"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-50 rounded-full w-8 h-8 p-0"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Plants Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{
                transform: `translateX(${currentIndex * -220}px)`,
              }}
            >
              {displayPlants.map((plant) => (
                <Card
                  key={plant.id}
                  className="min-w-[200px] max-w-[200px] border rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handlePlantClick(plant.id)}
                >
                  <div className="h-[150px] w-full overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
          </div>

          {/* Dots Indicator */}
          {displayPlants.length > itemsPerView && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-rose-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedPlants;
