import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import PlantInfo from "../components/PlantInfo";
import PlantAccordion from "../components/PlantAccordion";
import RelatedPlants from "../components/RelatedPlants";

interface PlantDetailProps {
  plantId?: string;
}

const PlantDetail: React.FC<PlantDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const plantId = id || "1";
  // Mock data - in a real app, this would come from an API call using the plantId
  const plantData = {
    id: plantId,
    nameArabic: "كل زنجبارية",
    nameEnglish: "Zanzibar Gem",
    type: "زينتي",
    size: "متوسط الحجم",
    careLevel: "سهل العناية",
    description:
      "نبات داخلي قوي، شديد التحمل، قليل الاحتياج للماء، يناسب المبتدئين",
    price: 120,
    currency: "ر.س",
    imageUrl:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
    careInstructions: [
      {
        title: "الري",
        content: "يروى كل 2-3 أسابيع، يفضل جفاف التربة بين الريات",
      },
      {
        title: "الإضاءة",
        content: "يتحمل الإضاءة المنخفضة، ويفضل الضوء الغير مباشر",
      },
      {
        title: "درجة الحرارة",
        content: "يفضل درجات الحرارة بين 18-26 درجة مئوية",
      },
    ],
    plantInfo:
      "بوتس زانتي، هو من أعضاء عائلة البوتوسات، كما يعرف بنبات الدولار أو نبات الحظ. يتميز بنموه البطيء نسبيًا، لكنه يمكن أن يصل إلى ارتفاعات كبيرة مع الوقت. أوراقه خضراء لامعة وله القدرة على تنقية الهواء من السموم.",
    relatedPlants: [
      {
        id: "2",
        name: "سانسيفيريا",
        imageUrl:
          "https://images.unsplash.com/photo-1593482892290-f54927ae2bb2?w=400&q=80",
      },
      {
        id: "3",
        name: "بوتس",
        imageUrl:
          "https://images.unsplash.com/photo-1637967886160-fd0dc8d0d7a3?w=400&q=80",
      },
      {
        id: "4",
        name: "فيكس ليراتا",
        imageUrl:
          "https://images.unsplash.com/photo-1602923668104-8f8e63d13ec6?w=400&q=80",
      },
      {
        id: "5",
        name: "سبثيفيلوم",
        imageUrl:
          "https://images.unsplash.com/photo-1637967886612-9b35fcf35448?w=400&q=80",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background p-4 flex justify-between items-center border-b">
        <button
          className="p-2 rounded-full hover:bg-muted"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-4">
          <button className="p-2 rounded-full hover:bg-muted">
            <Share2 size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-muted">
            <Bookmark size={20} />
          </button>
        </div>
      </header>

      <main className="container mx-auto pb-20">
        {/* Plant Info Component */}
        <PlantInfo
          nameArabic={plantData.nameArabic}
          nameEnglish={plantData.nameEnglish}
          type={plantData.type}
          size={plantData.size}
          careLevel={plantData.careLevel}
          description={plantData.description}
          price={plantData.price}
          currency={plantData.currency}
          imageUrl={plantData.imageUrl}
        />

        {/* Plant Accordion Component */}
        <div className="mt-8">
          <PlantAccordion
            careInstructions={plantData.careInstructions}
            plantInfo={plantData.plantInfo}
          />
        </div>

        {/* Related Plants Component */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">نباتات ذات صلة</h2>
          <RelatedPlants plants={plantData.relatedPlants} />
        </div>
      </main>

      {/* Fixed Purchase Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <button className="w-full bg-primary text-primary-foreground rounded-full py-3 flex items-center justify-center gap-2">
          <span className="rounded-full bg-white/20 p-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12L12 16L16 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8L12 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          خرید این گیاه زیبای کل زنجباریا
        </button>
      </div>
    </div>
  );
};

export default PlantDetail;
