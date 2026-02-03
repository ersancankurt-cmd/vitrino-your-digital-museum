import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="bg-background border-t border-border py-6 px-4 mt-8">
      <div className="flex flex-col items-center gap-4">
        {/* Language Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage("tr")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              language === "tr" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            TR
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              language === "en" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            EN
          </button>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/faq" className="hover:text-primary transition-colors">
            {t("faq")}
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground text-center">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
