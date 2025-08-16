import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PlantCareInfo {
  title: string;
  content: string;
}

interface PlantAccordionProps {
  careInstructions?: PlantCareInfo[];
  plantInfo?: string;
}

const PlantAccordion = ({
  careInstructions = [
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
  plantInfo = "بوتس زانتي، هو من أعضاء عائلة البوتوسات، كما يعرف بنبات الدولار أو نبات الحظ. يتميز بنموه البطيء نسبيًا، لكنه يمكن أن يصل إلى ارتفاعات كبيرة مع الوقت. أوراقه خضراء لامعة وله القدرة على تنقية الهواء من السموم.",
}: PlantAccordionProps) => {
  return (
    <div className="w-full bg-white">
      <Accordion
        type="multiple"
        defaultValue={["plant-info"]}
        className="w-full"
      >
        <AccordionItem value="plant-info">
          <AccordionTrigger className="text-right py-4 font-medium text-lg">
            معلومات النبات
          </AccordionTrigger>
          <AccordionContent className="text-right">
            <p className="text-gray-700">{plantInfo}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="care-info">
          <AccordionTrigger className="text-right py-4 font-medium text-lg">
            تعليمات العناية
          </AccordionTrigger>
          <AccordionContent className="text-right">
            <div className="space-y-4">
              {careInstructions.map((instruction, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <h4 className="font-medium mb-2">{instruction.title}</h4>
                  <p className="text-gray-700 text-sm">{instruction.content}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PlantAccordion;
