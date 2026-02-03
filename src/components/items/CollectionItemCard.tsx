import { Link } from "react-router-dom";
import { ThumbsUp, Gem, Crown, Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionItemCardProps {
  id: string;
  itemName: string;
  imageUrl: string;
  vitrinoIndex?: number | null;
  likeCount?: number;
  onClick?: () => void;
}

// Get rank icon based on vitrino index
function getRankIcon(index: number) {
  if (index >= 90) return { icon: Gem, color: "text-cyan-400" };
  if (index >= 80) return { icon: Crown, color: "text-yellow-400" };
  if (index >= 70) return { icon: Star, color: "text-amber-400" };
  return { icon: Award, color: "text-gray-400" };
}

// Get index score color based on value
function getIndexColor(index: number) {
  if (index >= 90) return "text-cyan-400";
  if (index >= 80) return "text-yellow-400";
  if (index >= 70) return "text-amber-400";
  return "text-gray-400";
}

export function CollectionItemCard({
  id,
  itemName,
  imageUrl,
  vitrinoIndex,
  likeCount,
  onClick,
}: CollectionItemCardProps) {
  const hasIndex = vitrinoIndex !== null && vitrinoIndex !== undefined;
  const rankData = hasIndex ? getRankIcon(vitrinoIndex) : null;

  return (
    <Link
      to={`/item/${id}`}
      onClick={onClick}
      className="museum-card group relative overflow-hidden rounded-lg bg-card"
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={itemName}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Index Badge - Bottom Right */}
      {hasIndex && rankData && (
        <div className="absolute bottom-2 right-2 glass-pill flex items-center gap-1">
          <rankData.icon className={cn("w-3 h-3", rankData.color)} />
          <span className={cn("text-xs font-medium", getIndexColor(vitrinoIndex))}>
            {vitrinoIndex}
          </span>
        </div>
      )}

      {/* Like count badge - Top Right */}
      {likeCount !== undefined && likeCount > 0 && (
        <div className="absolute top-2 right-2 glass-pill flex items-center gap-1">
          <ThumbsUp className="w-3 h-3 text-primary" />
          <span className="text-xs text-primary font-medium">{likeCount}</span>
        </div>
      )}

      {/* Item name overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-xs text-foreground/90 line-clamp-1 font-medium">
          {itemName}
        </p>
      </div>
    </Link>
  );
}
