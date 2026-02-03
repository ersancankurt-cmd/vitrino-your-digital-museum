import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success("Giriş başarılı!");
        navigate("/profile");
      } else {
        if (password !== confirmPassword) {
          toast.error("Şifreler eşleşmiyor");
          return;
        }
        await signUp(email, password);
        toast.success("Kayıt başarılı! Lütfen e-postanızı doğrulayın.");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-4 py-8">
        <div className="max-w-sm mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-4">
              <span className="text-primary-foreground font-bold text-3xl">G</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-gold-gradient">
              {isLogin ? t("login") : t("signup")}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                {t("email")}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                {t("password")}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  {t("confirmPassword")}
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              variant="gold"
              disabled={loading}
            >
              {loading ? t("loading") : isLogin ? t("login") : t("signup")}
            </Button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin 
                ? "Hesabınız yok mu? Kayıt olun" 
                : "Zaten hesabınız var mı? Giriş yapın"
              }
            </button>
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <Link 
                to="/forgot-password" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("forgotPassword")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
