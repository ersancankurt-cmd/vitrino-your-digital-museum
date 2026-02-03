import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  Share2, 
  Gavel, 
  ChevronDown, 
  ChevronUp,
  Gem,
  Crown,
  Star,
  Award
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Get rank icon based on vitrino index
function getRankIcon(index: number) {
  if (index >= 90) return { icon: Gem, color: "text-cyan-400" };
  if (index >= 80) return { icon: Crown, color: "text-yellow-400" };
  if (index >= 70) return { icon: Star, color: "text-amber-400" };
  return { icon: Award, color: "text-gray-400" };
}

export default function ItemDetail() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [storyOpen, setStoryOpen] = useState(false);

  // Fetch item
  const { data: item, isLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: async () => {
      if (!itemId) throw new Error("No item ID");
      const { data, error } = await supabase
        .from("collection_items")
        .select("*")
        .eq("id", itemId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!itemId,
  });

  // Fetch owner profile
  const { data: owner } = useQuery({
    queryKey: ["owner-profile", item?.user_id],
    queryFn: async () => {
      if (!item?.user_id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("pseudonym, avatar_url, share_slug")
        .eq("user_id", item.user_id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!item?.user_id,
  });

  // Check if user has liked
  const { data: hasLiked } = useQuery({
    queryKey: ["has-liked", itemId, user?.id],
    queryFn: async () => {
      if (!itemId || !user) return false;
      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("item_id", itemId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
    enabled: !!itemId && !!user,
  });

  // Get like count
  const { data: likeCount } = useQuery({
    queryKey: ["like-count", itemId],
    queryFn: async () => {
      if (!itemId) return 0;
      const { count, error } = await supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("item_id", itemId);

      if (error) throw error;
      return count || 0;
    },
    enabled: !!itemId,
  });

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user || !itemId) throw new Error("Not authenticated");

      if (hasLiked) {
        await supabase
          .from("likes")
          .delete()
          .eq("item_id", itemId)
          .eq("user_id", user.id);
      } else {
        await supabase
          .from("likes")
          .insert({ item_id: itemId, user_id: user.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["has-liked", itemId] });
      queryClient.invalidateQueries({ queryKey: ["like-count", itemId] });
    },
  });

  const handleShare = async () => {
    try {
      await navigator.share({
        title: item?.item_name,
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link kopyalandı!");
    }
  };

  const handleMakeOffer = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    toast.info("Teklif sistemi yakında aktif olacak");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="aspect-[4/5] bg-muted shimmer" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("notFound")}</p>
          <Button variant="link" onClick={() => navigate(-1)}>
            Geri Dön
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === item.user_id;
  const hasIndex = item.vitrino_index !== null && item.vitrino_index !== undefined;
  const rankData = hasIndex ? getRankIcon(item.vitrino_index!) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Image - 4:5 aspect ratio */}
      <div className="relative aspect-[4/5] w-full bg-black">
        <img
          src={item.image_url}
          alt={item.item_name}
          className="w-full h-full object-contain"
        />

        {/* Index Badge */}
        {hasIndex && rankData && (
          <div className="absolute bottom-4 right-4 glass-pill flex items-center gap-2 px-3 py-2">
            <rankData.icon className={cn("w-5 h-5", rankData.color)} />
            <span className={cn("text-lg font-bold", rankData.color)}>
              {item.vitrino_index}
            </span>
          </div>
        )}

        {/* Offer indicator */}
        {item.open_to_offers && !isOwner && (
          <button
            onClick={handleMakeOffer}
            className="absolute top-4 right-4 glass-pill p-2"
          >
            <Gavel className="w-5 h-5 text-primary" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Title & Owner */}
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            {item.item_name}
          </h1>
          
          {owner && (
            <Link 
              to={`/showcase/${owner.share_slug}`}
              className="flex items-center gap-2 mt-2"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={owner.avatar_url || undefined} />
                <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                  {owner.pseudonym?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {owner.pseudonym || "Koleksiyoner"}
              </span>
            </Link>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant={hasLiked ? "default" : "outline"}
            size="sm"
            onClick={() => likeMutation.mutate()}
            disabled={!user || likeMutation.isPending}
          >
            <Heart className={cn("w-4 h-4", hasLiked && "fill-current")} />
            <span className="ml-1">{likeCount || 0}</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>

          {item.open_to_offers && !isOwner && (
            <Button variant="gold" size="sm" onClick={handleMakeOffer}>
              <Gavel className="w-4 h-4 mr-1" />
              {t("makeOffer")}
            </Button>
          )}
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          {item.main_category && (
            <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
              {item.main_category}
            </span>
          )}
          {item.sub_category && (
            <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
              {item.sub_category}
            </span>
          )}
        </div>

        {/* Story Accordion */}
        {item.description && (
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setStoryOpen(!storyOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-card"
            >
              <span className="text-sm font-medium">Eserin Hikayesi</span>
              {storyOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {storyOpen && (
              <div className="px-4 py-3 bg-card/50 border-t border-border">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Estimated Value */}
        {item.estimated_value && (
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Tahmini Değer</p>
            <p className="text-lg font-bold text-primary">
              {item.estimated_value === "priceless" ? t("priceless") : item.estimated_value}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
