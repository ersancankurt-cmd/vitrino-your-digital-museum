import { useNavigate } from "react-router-dom";
import { 
  Watch, 
  Coins, 
  Stamp, 
  Palette, 
  Landmark, 
  Gem, 
  Shirt, 
  BookOpen,
  MoreHorizontal 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  { key: "luks-saatler", icon: Watch, labelKey: "luxuryWatches" as const },
  { key: "madeni-para-banknot", icon: Coins, labelKey: "coins" as const },
  { key: "pul-posta-tarihi", icon: Stamp, labelKey: "stamps" as const },
  { key: "sanat", icon: Palette, labelKey: "art" as const },
  { key: "antika", icon: Landmark, labelKey: "antiques" as const },
  { key: "mucevher", icon: Gem, labelKey: "jewelry" as const },
  { key: "moda-stil", icon: Shirt, labelKey: "fashion" as const },
  { key: "kitap-el-yazmasi", icon: BookOpen, labelKey: "books" as const },
  { key: "diger", icon: MoreHorizontal, labelKey: "other" as const },
];

export function QuickCategoryNav() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleCategoryClick = (categoryKey: string) => {
    navigate(`/explore?category=${categoryKey}`);
  };

  return (
    <div className="overflow-x-auto scrollbar-hide py-3 px-4">
      <div className="flex gap-2 flex-nowrap">
        {categories.map(({ key, icon: Icon, labelKey }) => (
          <button
            key={key}
            onClick={() => handleCategoryClick(key)}
            className="category-pill flex items-center gap-2 shrink-0"
          >
            <Icon className="w-4 h-4" />
            <span className="whitespace-nowrap">{t(labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
