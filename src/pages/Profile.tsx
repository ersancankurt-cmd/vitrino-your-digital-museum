import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CollectionItemCard } from "@/components/items/CollectionItemCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  BarChart3, 
  EyeOff, 
  CreditCard, 
  MessageSquare, 
  Bell,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
  ThumbsUp
} from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [actionScrollRef, setActionScrollRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Fetch profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch user's items
  const { data: items, isLoading: itemsLoading } = useQuery({
    queryKey: ["user-items", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("collection_items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch total likes for user's items
  const { data: totalLikes } = useQuery({
    queryKey: ["user-total-likes", user?.id],
    queryFn: async () => {
      if (!user || !items) return 0;
      const itemIds = items.map(item => item.id);
      if (itemIds.length === 0) return 0;

      const { count, error } = await supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .in("item_id", itemIds);

      if (error) throw error;
      return count || 0;
    },
    enabled: !!user && !!items && items.length > 0,
  });

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      toast.success("Çıkış yapıldı");
    } catch {
      toast.error("Çıkış yapılamadı");
    }
  };

  const scrollActions = (direction: "left" | "right") => {
    if (actionScrollRef) {
      const scrollAmount = direction === "left" ? -150 : 150;
      actionScrollRef.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const quickActions = [
    { icon: PlusCircle, label: "Yeni", onClick: () => navigate("/upload") },
    { icon: BarChart3, label: "Index", onClick: () => toast.info("Index raporu yakında") },
    { icon: EyeOff, label: "Gizli", onClick: () => toast.info("Gizli eserler yakında") },
    { icon: CreditCard, label: "Kart", onClick: () => toast.info("Koleksiyoner kartı yakında") },
    { icon: MessageSquare, label: "Teklifler", onClick: () => toast.info("Teklifler yakında") },
    { icon: Bell, label: "Bildirimler", onClick: () => toast.info("Bildirimler yakında") },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Profile Header */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-2 border-primary">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {profile?.pseudonym?.[0]?.toUpperCase() || "G"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold text-foreground">
              {profile?.pseudonym || "Koleksiyoner"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {profile?.showcase_title || t("myCollection")}
            </p>
            
            {/* Stats */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-foreground">{items?.length || 0}</span>
                <span className="text-xs text-muted-foreground">eser</span>
              </div>
              {totalLikes !== undefined && totalLikes > 0 && (
                <div className="glass-pill flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-primary" />
                  <span className="text-xs text-primary font-medium">{totalLikes}</span>
                </div>
              )}
            </div>
          </div>

          {/* Settings & Logout */}
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="relative px-4 py-2">
        {/* Left Arrow */}
        <button
          onClick={() => scrollActions("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 rounded-full hidden md:flex"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Actions */}
        <div
          ref={setActionScrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide flex-nowrap"
        >
          {quickActions.map(({ icon: Icon, label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="flex flex-col items-center gap-1 px-4 py-2 bg-card rounded-lg border border-border hover:border-primary transition-colors shrink-0"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-xs text-foreground">{label}</span>
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollActions("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 rounded-full hidden md:flex"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Collection Grid */}
      <div className="px-4 py-4">
        <h2 className="section-header">{t("myCollection")}</h2>
        
        {itemsLoading || profileLoading ? (
          <div className="museum-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="museum-card shimmer" />
            ))}
          </div>
        ) : items && items.length > 0 ? (
          <div className="museum-grid">
            {items.map((item) => (
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
            <p className="text-muted-foreground mb-4">{t("noItems")}</p>
            <Button variant="gold" onClick={() => navigate("/upload")}>
              <PlusCircle className="w-4 h-4 mr-2" />
              {t("uploadNew")}
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
