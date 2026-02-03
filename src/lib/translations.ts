export const translations = {
  tr: {
    // Navigation
    home: "Ana Sayfa",
    explore: "Keşfet",
    profile: "Profil",
    search: "Ara",
    
    // Auth
    login: "Giriş Yap",
    signup: "Kayıt Ol",
    logout: "Çıkış Yap",
    email: "E-posta",
    password: "Şifre",
    confirmPassword: "Şifreyi Onayla",
    forgotPassword: "Şifremi Unuttum",
    
    // Home sections
    newAdditions: "Yeni Eklenenler",
    trending: "Trendler",
    newsAndDiscovery: "Haber ve Keşif",
    categories: "Kategoriler",
    
    // Item details
    itemDetails: "Eser Detayları",
    story: "Eserin Hikayesi",
    makeOffer: "Teklif Ver",
    like: "Beğen",
    share: "Paylaş",
    edit: "Düzenle",
    delete: "Sil",
    
    // Profile
    myCollection: "Koleksiyonum",
    myShowcase: "Vitrinim",
    settings: "Ayarlar",
    followers: "Takipçiler",
    following: "Takip Edilenler",
    uploadNew: "Yeni Ekle",
    notifications: "Bildirimler",
    offers: "Teklifler",
    indexScore: "Index Puanı",
    hidden: "Gizli",
    card: "Kart",
    
    // Categories
    luxuryWatches: "Lüks Saatler",
    coins: "Madeni Para & Banknot",
    stamps: "Pul & Posta Tarihi",
    art: "Sanat",
    antiques: "Antika",
    jewelry: "Mücevher",
    fashion: "Moda & Stil",
    hats: "Şapka",
    books: "Kitap & El Yazması",
    other: "Diğer",
    
    // Actions
    save: "Kaydet",
    cancel: "İptal",
    confirm: "Onayla",
    accept: "Kabul Et",
    reject: "Reddet",
    
    // Status
    pending: "Beklemede",
    verified: "Onaylandı",
    rejected: "Reddedildi",
    
    // Errors
    error: "Hata",
    notFound: "Bulunamadı",
    unauthorized: "Yetkisiz Erişim",
    
    // Footer
    faq: "SSS",
    copyright: "© 2026 Galerivo. Tüm hakları saklıdır.",
    
    // Misc
    seeAll: "Tümünü Gör",
    loading: "Yükleniyor...",
    noItems: "Henüz eser yok",
    museumOwner: "Müze Sahibi",
    priceless: "Paha Biçilemez",
  },
  en: {
    // Navigation
    home: "Home",
    explore: "Explore",
    profile: "Profile",
    search: "Search",
    
    // Auth
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password",
    
    // Home sections
    newAdditions: "New Additions",
    trending: "Trending",
    newsAndDiscovery: "News & Discovery",
    categories: "Categories",
    
    // Item details
    itemDetails: "Item Details",
    story: "Story",
    makeOffer: "Make Offer",
    like: "Like",
    share: "Share",
    edit: "Edit",
    delete: "Delete",
    
    // Profile
    myCollection: "My Collection",
    myShowcase: "My Showcase",
    settings: "Settings",
    followers: "Followers",
    following: "Following",
    uploadNew: "Add New",
    notifications: "Notifications",
    offers: "Offers",
    indexScore: "Index Score",
    hidden: "Hidden",
    card: "Card",
    
    // Categories
    luxuryWatches: "Luxury Watches",
    coins: "Coins & Banknotes",
    stamps: "Stamps & Postal History",
    art: "Art",
    antiques: "Antiques",
    jewelry: "Jewelry",
    fashion: "Fashion & Style",
    hats: "Hats",
    books: "Books & Manuscripts",
    other: "Other",
    
    // Actions
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    accept: "Accept",
    reject: "Reject",
    
    // Status
    pending: "Pending",
    verified: "Verified",
    rejected: "Rejected",
    
    // Errors
    error: "Error",
    notFound: "Not Found",
    unauthorized: "Unauthorized",
    
    // Footer
    faq: "FAQ",
    copyright: "© 2026 Galerivo. All rights reserved.",
    
    // Misc
    seeAll: "See All",
    loading: "Loading...",
    noItems: "No items yet",
    museumOwner: "Museum Owner",
    priceless: "Priceless",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.tr;
