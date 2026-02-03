import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CollectionItemCard } from "@/components/items/CollectionItemCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function NewAdditionsSection() {
  const { t } = useLanguage();

  const { data: items, isLoading } = useQuery({
    queryKey: ["new-additions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collection_items")
        .select("id, item_name, image_url, vitrino_index, category, user_id, created_at")
        .eq("status", "verified")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-header mb-0">{t("newAdditions")}</h2>
        </div>
        <div className="museum-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="museum-card shimmer" />
          ))}
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <section className="px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-header mb-0">{t("newAdditions")}</h2>
        <Link to="/explore" className="flex items-center text-sm text-primary hover:underline">
          {t("seeAll")}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="museum-grid">
        {items.slice(0, 4).map((item) => (
          <CollectionItemCard
            key={item.id}
            id={item.id}
            itemName={item.item_name}
            imageUrl={item.image_url}
            vitrinoIndex={item.vitrino_index}
          />
        ))}
      </div>
    </section>
  );
}
