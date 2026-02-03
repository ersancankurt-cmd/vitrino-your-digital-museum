export function HeroManifesto() {
  return (
    <section className="px-4 py-8 text-center">
      <div className="max-w-sm mx-auto space-y-4">
        <h2 className="text-2xl font-display font-bold text-gold-gradient">
          Dijital Müzeniz
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Koleksiyonlarınızı dünyayla paylaşın. Her eser bir hikaye taşır, 
          her koleksiyoner bir müze sahibidir.
        </p>
        <div className="flex justify-center gap-6 pt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">1000+</p>
            <p className="text-xs text-muted-foreground">Eser</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">500+</p>
            <p className="text-xs text-muted-foreground">Koleksiyoner</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">9</p>
            <p className="text-xs text-muted-foreground">Kategori</p>
          </div>
        </div>
      </div>
    </section>
  );
}
