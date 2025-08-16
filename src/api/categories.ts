// Mock API for categories - replace with actual API calls
export interface Category {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  image: string;
  itemCount: number;
}

// Mock data - replace with actual API call
const mockCategories: Category[] = [
  {
    id: "indoor",
    name: "Indoor Plants",
    nameArabic: "گیاهان داخلی",
    description: "گیاهان مناسب برای داخل خانه",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
    itemCount: 24,
  },
  {
    id: "outdoor",
    name: "Outdoor Plants",
    nameArabic: "گیاهان خارجی",
    description: "گیاهان مناسب برای باغچه و فضای باز",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    itemCount: 18,
  },
  {
    id: "succulents",
    name: "Succulents",
    nameArabic: "گیاهان آبدار",
    description: "کاکتوس ها و گیاهان آبدار",
    image:
      "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=800&q=80",
    itemCount: 15,
  },
  {
    id: "flowering",
    name: "Flowering Plants",
    nameArabic: "گیاهان گلدار",
    description: "گیاهان با گل های زیبا",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
    itemCount: 32,
  },
  {
    id: "herbs",
    name: "Herbs",
    nameArabic: "گیاهان دارویی",
    description: "گیاهان دارویی و معطر",
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80",
    itemCount: 12,
  },
  {
    id: "trees",
    name: "Trees",
    nameArabic: "درختان",
    description: "درختان کوچک و متوسط",
    image:
      "https://images.unsplash.com/photo-1602923668104-8f8e63d13ec6?w=800&q=80",
    itemCount: 8,
  },
];

export const fetchCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Replace this with actual API call:
  // const response = await fetch('/api/categories');
  // return response.json();

  return mockCategories;
};

export const fetchCategoryById = async (
  id: string,
): Promise<Category | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Replace this with actual API call:
  // const response = await fetch(`/api/categories/${id}`);
  // return response.json();

  return mockCategories.find((category) => category.id === id) || null;
};
