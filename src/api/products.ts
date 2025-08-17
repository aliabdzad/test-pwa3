// Mock API for products - replace with actual API calls
export interface Product {
  id: string;
  name: string;
  nameArabic: string;
  image: string;
  price: number;
  currency: string;
  category: string;
  description?: string;
  inStock: boolean;
}

// Mock data - replace with actual API call
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Snake Plant",
    nameArabic: "نبات الثعبان",
    image:
      "https://images.unsplash.com/photo-1616500163176-f951aa91adee?w=400&q=80",
    price: 85,
    currency: "ر.س",
    category: "indoor",
    description: "گیاه مقاوم و آسان نگهداری",
    inStock: true,
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
    description: "گیاه تصفیه کننده هوا",
    inStock: true,
  },
  {
    id: "3",
    name: "Pothos",
    nameArabic: "بوثوس",
    image:
      "https://images.unsplash.com/photo-1622548231246-fal87f72a7c?w=400&q=80",
    price: 75,
    currency: "ر.س",
    category: "indoor",
    description: "گیاه آویز زیبا",
    inStock: true,
  },
  {
    id: "4",
    name: "Fiddle Leaf Fig",
    nameArabic: "شجرة التين",
    image:
      "https://images.unsplash.com/photo-1606248895514-b5f35a5d4b1e?w=400&q=80",
    price: 180,
    currency: "ر.س",
    category: "trees",
    description: "درخت زیبای داخلی",
    inStock: true,
  },
  {
    id: "5",
    name: "Rose Bush",
    nameArabic: "گل رز",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&q=80",
    price: 110,
    currency: "ر.س",
    category: "flowering",
    description: "گل رز معطر",
    inStock: true,
  },
  {
    id: "6",
    name: "Rubber Plant",
    nameArabic: "نبات المطاط",
    image:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400&q=80",
    price: 130,
    currency: "ر.س",
    category: "indoor",
    description: "گیاه برگ بزرگ",
    inStock: true,
  },
  {
    id: "7",
    name: "Aloe Vera",
    nameArabic: "الصبار",
    image:
      "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&q=80",
    price: 55,
    currency: "ر.س",
    category: "succulents",
    description: "گیاه دارویی",
    inStock: true,
  },
  {
    id: "8",
    name: "Lavender",
    nameArabic: "اسطوخودوس",
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&q=80",
    price: 65,
    currency: "ر.س",
    category: "herbs",
    description: "گیاه معطر و آرامش بخش",
    inStock: true,
  },
  {
    id: "9",
    name: "Garden Rose",
    nameArabic: "گل رز باغی",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80",
    price: 95,
    currency: "ر.س",
    category: "outdoor",
    description: "گل رز مناسب باغچه",
    inStock: true,
  },
  {
    id: "10",
    name: "Cactus Collection",
    nameArabic: "مجموعه کاکتوس",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    price: 45,
    currency: "ر.س",
    category: "succulents",
    description: "مجموعه کاکتوس های کوچک",
    inStock: true,
  },
];

export const fetchAllProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Replace this with actual API call:
  // const response = await fetch('/api/products');
  // return response.json();

  return mockProducts;
};

export const fetchProductsByCategory = async (
  categoryId: string,
): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Replace this with actual API call:
  // const response = await fetch(`/api/products?category=${categoryId}`);
  // return response.json();

  return mockProducts.filter((product) => product.category === categoryId);
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Replace this with actual API call:
  // const response = await fetch(`/api/products/${id}`);
  // return response.json();

  return mockProducts.find((product) => product.id === id) || null;
};

export const fetchSimilarProducts = async (
  productId: string,
): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Replace this with actual API call:
  // const response = await fetch(`/api/products/${productId}/similar`);
  // return response.json();

  // Mock similar products - exclude the current product
  const similarProducts = mockProducts
    .filter((product) => product.id !== productId)
    .slice(0, 6); // Return up to 6 similar products

  return similarProducts;
};
