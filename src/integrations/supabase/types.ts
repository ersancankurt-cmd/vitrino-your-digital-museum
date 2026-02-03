export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json | null
          id: string
          target_id: string | null
          target_type: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          category: string
          content: string | null
          cover_image_url: string | null
          created_at: string
          created_by: string
          id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by: string
          id?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          display_name: string
          icon: string | null
          id: string
          is_active: boolean | null
          main_category: string
          sort_order: number | null
          sub_category: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          main_category: string
          sort_order?: number | null
          sub_category: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          main_category?: string
          sort_order?: number | null
          sub_category?: string
          updated_at?: string
        }
        Relationships: []
      }
      category_suggestions: {
        Row: {
          created_at: string
          id: string
          item_id: string
          suggested_main_category: string
          suggested_sub_category: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          suggested_main_category: string
          suggested_sub_category: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          suggested_main_category?: string
          suggested_sub_category?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_suggestions_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "collection_items"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_items: {
        Row: {
          basim_yili: string | null
          brand: string | null
          category: string | null
          created_at: string
          darphane: string | null
          description: string | null
          estimated_value: string | null
          id: string
          image_url: string
          item_name: string
          kesim_tipi: string | null
          kondisyon: string | null
          main_category: string | null
          model: string | null
          open_to_offers: boolean
          perforasyon: string | null
          rarity_level: string | null
          sertifika: string | null
          status: string
          sub_category: string | null
          tane_olcusu: string | null
          updated_at: string
          user_id: string
          usta_bilgisi: string | null
          vitrino_index: number | null
          zamk_durumu: string | null
        }
        Insert: {
          basim_yili?: string | null
          brand?: string | null
          category?: string | null
          created_at?: string
          darphane?: string | null
          description?: string | null
          estimated_value?: string | null
          id?: string
          image_url: string
          item_name: string
          kesim_tipi?: string | null
          kondisyon?: string | null
          main_category?: string | null
          model?: string | null
          open_to_offers?: boolean
          perforasyon?: string | null
          rarity_level?: string | null
          sertifika?: string | null
          status?: string
          sub_category?: string | null
          tane_olcusu?: string | null
          updated_at?: string
          user_id: string
          usta_bilgisi?: string | null
          vitrino_index?: number | null
          zamk_durumu?: string | null
        }
        Update: {
          basim_yili?: string | null
          brand?: string | null
          category?: string | null
          created_at?: string
          darphane?: string | null
          description?: string | null
          estimated_value?: string | null
          id?: string
          image_url?: string
          item_name?: string
          kesim_tipi?: string | null
          kondisyon?: string | null
          main_category?: string | null
          model?: string | null
          open_to_offers?: boolean
          perforasyon?: string | null
          rarity_level?: string | null
          sertifika?: string | null
          status?: string
          sub_category?: string | null
          tane_olcusu?: string | null
          updated_at?: string
          user_id?: string
          usta_bilgisi?: string | null
          vitrino_index?: number | null
          zamk_durumu?: string | null
        }
        Relationships: []
      }
      flagged_items: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          item_id: string
          reason: string
          reporter_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          item_id: string
          reason: string
          reporter_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          item_id?: string
          reason?: string
          reporter_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "flagged_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "collection_items"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      global_announcements: {
        Row: {
          id: string
          message: string
          recipient_count: number | null
          sent_at: string
          sent_by: string
          title: string
        }
        Insert: {
          id?: string
          message: string
          recipient_count?: number | null
          sent_at?: string
          sent_by: string
          title: string
        }
        Update: {
          id?: string
          message?: string
          recipient_count?: number | null
          sent_at?: string
          sent_by?: string
          title?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          item_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "collection_items"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          item_id: string | null
          message_type: string
          offer_amount: string | null
          offer_status: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          item_id?: string | null
          message_type?: string
          offer_amount?: string | null
          offer_status?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          item_id?: string | null
          message_type?: string
          offer_amount?: string | null
          offer_status?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "collection_items"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          actor_id: string
          created_at: string
          id: string
          is_read: boolean
          message: string
          related_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          actor_id: string
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          related_id?: string | null
          type?: string
          user_id: string
        }
        Update: {
          actor_id?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          related_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active_offer_limit: number
          avatar_url: string | null
          ban_reason: string | null
          banned_at: string | null
          birth_year: number | null
          created_at: string
          first_name: string | null
          id: string
          interested_categories: string[] | null
          is_banned: boolean
          is_phone_verified: boolean
          is_pro: boolean
          is_public: boolean
          is_tc_verified: boolean
          item_limit: number
          last_name: string | null
          monthly_ai_credits: number
          phone_number: string | null
          privacy_accepted_at: string | null
          pseudonym: string | null
          purchased_ai_credits: number
          push_notifications_enabled: boolean
          push_token: string | null
          share_slug: string | null
          showcase_title: string | null
          subscription_renewed_at: string | null
          subscription_tier: string
          tc_full_name: string | null
          terms_accepted_at: string | null
          updated_at: string
          upload_count: number
          upload_limit: number
          user_id: string
          visibility_boost: number
        }
        Insert: {
          active_offer_limit?: number
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          birth_year?: number | null
          created_at?: string
          first_name?: string | null
          id?: string
          interested_categories?: string[] | null
          is_banned?: boolean
          is_phone_verified?: boolean
          is_pro?: boolean
          is_public?: boolean
          is_tc_verified?: boolean
          item_limit?: number
          last_name?: string | null
          monthly_ai_credits?: number
          phone_number?: string | null
          privacy_accepted_at?: string | null
          pseudonym?: string | null
          purchased_ai_credits?: number
          push_notifications_enabled?: boolean
          push_token?: string | null
          share_slug?: string | null
          showcase_title?: string | null
          subscription_renewed_at?: string | null
          subscription_tier?: string
          tc_full_name?: string | null
          terms_accepted_at?: string | null
          updated_at?: string
          upload_count?: number
          upload_limit?: number
          user_id: string
          visibility_boost?: number
        }
        Update: {
          active_offer_limit?: number
          avatar_url?: string | null
          ban_reason?: string | null
          banned_at?: string | null
          birth_year?: number | null
          created_at?: string
          first_name?: string | null
          id?: string
          interested_categories?: string[] | null
          is_banned?: boolean
          is_phone_verified?: boolean
          is_pro?: boolean
          is_public?: boolean
          is_tc_verified?: boolean
          item_limit?: number
          last_name?: string | null
          monthly_ai_credits?: number
          phone_number?: string | null
          privacy_accepted_at?: string | null
          pseudonym?: string | null
          purchased_ai_credits?: number
          push_notifications_enabled?: boolean
          push_token?: string | null
          share_slug?: string | null
          showcase_title?: string | null
          subscription_renewed_at?: string | null
          subscription_tier?: string
          tc_full_name?: string | null
          terms_accepted_at?: string | null
          updated_at?: string
          upload_count?: number
          upload_limit?: number
          user_id?: string
          visibility_boost?: number
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_response: string | null
          created_at: string
          id: string
          message: string
          priority: string
          responded_at: string | null
          responded_by: string | null
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          created_at?: string
          id?: string
          message: string
          priority?: string
          responded_at?: string | null
          responded_by?: string | null
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          created_at?: string
          id?: string
          message?: string
          priority?: string
          responded_at?: string | null
          responded_by?: string | null
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vitrine_items: {
        Row: {
          created_at: string
          id: string
          item_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_ban_user: {
        Args: { _ban: boolean; _reason?: string; _user_id: string }
        Returns: boolean
      }
      admin_respond_ticket: {
        Args: { _new_status: string; _response: string; _ticket_id: string }
        Returns: boolean
      }
      admin_set_role: {
        Args: {
          _add: boolean
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      admin_set_verification: {
        Args: {
          _phone_verified: boolean
          _tc_verified: boolean
          _user_id: string
        }
        Returns: boolean
      }
      ensure_admin_privileges: { Args: { _user_id: string }; Returns: boolean }
      generate_share_slug: { Args: never; Returns: string }
      get_admin_stats: { Args: never; Returns: Json }
      get_admin_support_tickets: {
        Args: {
          _limit?: number
          _offset?: number
          _priority?: string
          _status?: string
        }
        Returns: {
          admin_response: string
          created_at: string
          id: string
          message: string
          priority: string
          responded_at: string
          responded_by: string
          status: string
          subject: string
          user_avatar: string
          user_email: string
          user_id: string
          user_pseudonym: string
        }[]
      }
      get_admin_users: {
        Args: { _limit?: number; _offset?: number; _search?: string }
        Returns: {
          avatar_url: string
          ban_reason: string
          created_at: string
          email: string
          is_banned: boolean
          is_phone_verified: boolean
          is_pro: boolean
          is_tc_verified: boolean
          item_count: number
          pseudonym: string
          subscription_tier: string
          user_id: string
        }[]
      }
      get_personalized_feed: {
        Args: { _category?: string; _limit?: number; _user_id?: string }
        Returns: {
          brand: string
          category: string
          created_at: string
          description: string
          estimated_value: string
          id: string
          image_url: string
          is_founder: boolean
          is_verified: boolean
          item_name: string
          like_count: number
          main_category: string
          open_to_offers: boolean
          owner_avatar: string
          owner_pseudonym: string
          owner_share_slug: string
          owner_tier: string
          relevance_score: number
          sub_category: string
          user_id: string
          visibility_boost: number
          vitrino_index: number
        }[]
      }
      get_support_stats: { Args: never; Returns: Json }
      get_tier_limits: { Args: { tier_name: string }; Returns: Json }
      get_trending_items: {
        Args: { _limit?: number }
        Returns: {
          category: string
          id: string
          image_url: string
          item_name: string
          like_count: number
          offer_count: number
          owner_avatar: string
          owner_pseudonym: string
          owner_share_slug: string
          trend_score: number
          user_id: string
          vitrino_index: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_upload_count: { Args: { _user_id: string }; Returns: number }
      is_admin_or_tester: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "tester" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "tester", "user"],
    },
  },
} as const
