import type { ProductShape } from "@/components/ProductArt";

export type StockState = "available" | "low" | "out";

export type Product = {
  slug: string;
  category: string;
  name: string;
  subtitle: string;
  price: number;
  stock: number;
  stockState: StockState;
  shape: ProductShape;
  article: string;
  specs: Record<string, string>;
};

export const categories = [
  { slug: "plates", title: "Пластины", description: "Для фиксации переломов длинных и плоских костей", count: "127 товаров", art: "plate" },
  { slug: "screws", title: "Винты", description: "Для остеосинтеза и фиксации пластин", count: "82 товара", art: "screw" },
  { slug: "tools", title: "Инструменты", description: "Специализированные инструменты для операций", count: "31 товар", art: "tool" },
  { slug: "sutures", title: "Шовный материал", description: "Для мягкотканых и кожных швов", count: "58 товаров", art: "suture" },
  { slug: "sets", title: "Наборы", description: "Готовые наборы для остеосинтеза", count: "16 наборов", art: "set" },
] as const;

const baseSpecs = { Материал: "Медицинская сталь", Совместимость: "Ветеринарный остеосинтез" };

export const products: Product[] = [
  { slug: "plate-t-58-6", category: "plates", name: "Пластина Т-образная", subtitle: "Для фиксации переломов у собак мелких пород", price: 1143, stock: 12, stockState: "available", shape: "tplate", article: "KV-TP-058-06", specs: { Тип: "Т-образная", Длина: "58 мм", Ширина: "6 мм", Толщина: "2,0 мм", "Количество отверстий": "6", ...baseSpecs } },
  { slug: "plate-straight-58-6", category: "plates", name: "Пластина прямая", subtitle: "Для фиксации переломов длинных костей", price: 1143, stock: 12, stockState: "available", shape: "plate", article: "KV-PL-058-06", specs: { Тип: "Прямая", Длина: "58 мм", Ширина: "6 мм", Толщина: "2,0 мм", "Количество отверстий": "6", ...baseSpecs } },
  { slug: "plate-t-70-6", category: "plates", name: "Пластина Т-образная", subtitle: "Для карликовых пород собак и мелких животных", price: 1286, stock: 8, stockState: "available", shape: "tplate", article: "KV-TP-070-06", specs: { Тип: "Т-образная", Длина: "70 мм", Ширина: "6 мм", "Количество отверстий": "6", ...baseSpecs } },
  { slug: "plate-l-60-6", category: "plates", name: "Пластина L-образная", subtitle: "Для фиксации переломов под углом", price: 1301, stock: 5, stockState: "low", shape: "lplate", article: "KV-LP-060-06", specs: { Тип: "L-образная", Длина: "60 мм", Ширина: "6 мм", "Количество отверстий": "6", ...baseSpecs } },
  { slug: "plate-reconstructive-85", category: "plates", name: "Пластина реконструктивная", subtitle: "Для сложных и оскольчатых переломов", price: 1540, stock: 3, stockState: "low", shape: "plate", article: "KV-RP-085-06", specs: { Тип: "Реконструктивная", Длина: "85 мм", Ширина: "6 мм", "Количество отверстий": "6", ...baseSpecs } },
  { slug: "plate-straight-33-4", category: "plates", name: "Пластина прямая", subtitle: "Узкая, для малых пород", price: 972, stock: 15, stockState: "available", shape: "plate", article: "KV-PL-033-04", specs: { Тип: "Прямая", Длина: "33 мм", Ширина: "4,5 мм", "Количество отверстий": "4", ...baseSpecs } },
  { slug: "plate-t-47-6", category: "plates", name: "Пластина Т-образная", subtitle: "Для фиксации плечевой кости", price: 1128, stock: 7, stockState: "low", shape: "tplate", article: "KV-TP-047-06", specs: { Тип: "Т-образная", Длина: "47 мм", Ширина: "6 мм", "Количество отверстий": "6", ...baseSpecs } },
  { slug: "plate-l-70-6", category: "plates", name: "Пластина L-образная", subtitle: "Широкая, для крупных животных", price: 1412, stock: 4, stockState: "low", shape: "lplate", article: "KV-LP-070-06", specs: { Тип: "L-образная", Длина: "70 мм", Ширина: "6 мм", "Количество отверстий": "6", ...baseSpecs } },
  { slug: "screw-cortical-2-0", category: "screws", name: "Винт кортикальный 2,0 мм", subtitle: "Самонарезающий, шестигранный шлиц", price: 408, stock: 48, stockState: "available", shape: "screw", article: "KV-SC-020", specs: { Диаметр: "2,0 мм", Длина: "6–22 мм", Материал: "Медицинская сталь" } },
  { slug: "driver-hex-2-0", category: "tools", name: "Отвёртка шестигранная 2,0 мм", subtitle: "Хирургическая рукоятка с насадкой", price: 850, stock: 7, stockState: "low", shape: "tool", article: "KV-DR-020", specs: { Размер: "2,0 мм", Длина: "110 мм", Стерилизация: "Автоклав" } },
  { slug: "suture-monofilament-3-0", category: "sutures", name: "Монофиламент 3/0", subtitle: "Атравматический шовный материал", price: 850, stock: 20, stockState: "available", shape: "suture", article: "KV-SU-030", specs: { Размер: "3/0", Игла: "26 мм", Материал: "Полипропилен" } },
  { slug: "osteosynthesis-set-small", category: "sets", name: "Набор для малого остеосинтеза", subtitle: "Пластины, винты и инструменты", price: 12430, stock: 12, stockState: "available", shape: "set", article: "KV-SET-018", specs: { Комплектация: "18 предметов", Кейс: "Автоклавируемый", Гарантия: "12 месяцев" } },
];

export const categoryBySlug = (slug: string) => categories.find((category) => category.slug === slug);
export const productBySlug = (slug: string) => products.find((product) => product.slug === slug);
export const formatPrice = (price: number) => new Intl.NumberFormat("ru-RU").format(price) + " ₽";
