import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CollectionItemCard } from "@/components/items/CollectionItemCard";
import { QuickCategoryNav } from "@/components/home/QuickCategoryNav";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Explore() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const { data: items, isLoading } = useQuery({
    queryKey: ["explore-items", categoryParam],
    queryFn: async () => {
      let query = supabase
        .from("collection_items")
        .select("id, item_name, image_url, vitrino_index, category, main_category, user_id")
        .eq("status", "verified")
        .order("vitrino_index", { ascending: false, nullsFirst: false })
        .limit(50);

      if (categoryParam && categoryParam !== "all") {
        query = query.eq("main_category", categoryParam);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.item_name.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={`${t("search")}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Nav */}
      <QuickCategoryNav />

      {/* Results */}
      <div className="px-4 py-4">
        <h2 className="section-header">
          {categoryParam ? categoryParam.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : t("explore")}
        </h2>

        {isLoading ? (
          <div className="museum-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="museum-card shimmer" />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="museum-grid">
            {filteredItems.map((item) => (
              <CollectionItemCard
                key={item.id}
                id={item.id}
                itemName={item.item_name}
                imageUrl={item.image_url}
                vitrinoIndex={item.vitrino_index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("noItems")}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
