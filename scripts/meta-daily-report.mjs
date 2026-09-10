#!/usr/bin/env node
// DeckBe — Meta Ads günlük rapor + hızlı düzenleme (Marketing API, bağımlılıksız)
//
// Gerekli ortam değişkenleri:
//   META_ACCESS_TOKEN   System User token (ads_read; düzenleme için ads_management)
//   META_AD_ACCOUNT_ID  act_XXXXXXXXXXXX
//
// Kullanım:
//   node scripts/meta-daily-report.mjs                    # dün, reklam seti düzeyinde
//   node scripts/meta-daily-report.mjs --days 7           # son 7 gün
//   node scripts/meta-daily-report.mjs --level ad         # reklam düzeyinde
//   node scripts/meta-daily-report.mjs --json             # ham JSON çıktı
//   node scripts/meta-daily-report.mjs --pause <adset_id> --confirm
//   node scripts/meta-daily-report.mjs --budget <adset_id> <günlük_TL> --confirm
//
// Kural: --confirm olmadan hiçbir yazma işlemi yapılmaz (meta-ads-manager skill'i).

const API = "https://graph.facebook.com/v23.0";
const TOKEN = process.env.META_ACCESS_TOKEN;
const ACCOUNT = process.env.META_AD_ACCOUNT_ID;

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };

if (!TOKEN || !ACCOUNT) {
  console.error("META_ACCESS_TOKEN ve META_AD_ACCOUNT_ID ortam değişkenleri gerekli.");
  process.exit(2);
}

async function call(path, params = {}, method = "GET") {
  const url = new URL(`${API}/${path}`);
  const body = new URLSearchParams({ access_token: TOKEN, ...params });
  const res = method === "GET"
    ? await fetch(`${url}?${body}`)
    : await fetch(url, { method, body });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { throw new Error(`HTTP ${res.status} — ${text.slice(0, 120)} (ağ politikası graph.facebook.com'u engelliyor olabilir)`); }
  if (json.error) throw new Error(`${json.error.code} ${json.error.message}`);
  return json;
}

const num = (v) => Number(v ?? 0);
const act = (row, type, key = "actions") =>
  num((row[key] || []).find((a) => a.action_type === type)?.value);
const tl = (v) => `${num(v).toFixed(2)} TL`;
const pct = (v) => `${(num(v) * 100).toFixed(1)}%`;

async function report() {
  const days = Number(opt("--days", 1));
  const level = opt("--level", "adset");
  const end = new Date(); end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end); start.setUTCDate(end.getUTCDate() - (days - 1));
  const iso = (d) => d.toISOString().slice(0, 10);

  const fields = [
    "campaign_name", "adset_name", "ad_name", "adset_id", "ad_id",
    "spend", "impressions", "reach", "frequency", "cpm", "ctr", "cpc",
    "actions", "cost_per_action_type", "video_thruplay_watched_actions",
    "objective", "optimization_goal",
  ].join(",");

  const data = [];
  let next = await call(`${ACCOUNT}/insights`, {
    level, fields, limit: 200,
    time_range: JSON.stringify({ since: iso(start), until: iso(end) }),
  });
  for (;;) {
    data.push(...(next.data || []));
    if (!next.paging?.next) break;
    next = await (await fetch(next.paging.next)).json();
  }

  if (flag("--json")) { console.log(JSON.stringify(data, null, 2)); return; }

  console.log(`\nDeckBe Meta raporu — ${iso(start)} → ${iso(end)} (${level})\n`);
  let total = 0;
  for (const r of data) {
    const imp = num(r.impressions);
    const v3 = act(r, "video_view");
    const thru = act(r, "video_view", "video_thruplay_watched_actions");
    const lpv = act(r, "landing_page_view");
    const clicks = act(r, "link_click");
    const goal = r.optimization_goal;
    const cpr = (r.cost_per_action_type || [])
      .filter((a) => ["landing_page_view", "link_click", "video_view", "onsite_conversion.ig_profile_visit"].includes(a.action_type))
      .map((a) => `${a.action_type}=${tl(a.value)}`).join("  ");
    total += num(r.spend);

    console.log(`■ ${r.campaign_name} › ${r.adset_name}${r.ad_name ? " › " + r.ad_name : ""}`);
    console.log(`  hedef: ${r.objective} / ${goal}   id: ${r.ad_id || r.adset_id}`);
    console.log(`  harcama ${tl(r.spend)}  gösterim ${imp}  erişim ${r.reach}  frekans ${num(r.frequency).toFixed(2)}`);
    console.log(`  CPM ${tl(r.cpm)}  CTR ${num(r.ctr).toFixed(2)}%  CPC ${tl(r.cpc)}`);
    console.log(`  kanca (3sn/gösterim) ${imp ? pct(v3 / imp) : "—"}  ThruPlay ${imp ? pct(thru / imp) : "—"}  link tık ${clicks}  LPV ${lpv}`);
    if (cpr) console.log(`  sonuç başı maliyet: ${cpr}`);
    const other = (r.actions || []).map((a) => `${a.action_type}:${a.value}`).join(" ");
    if (other) console.log(`  tüm aksiyonlar: ${other}`);
    console.log();
  }
  console.log(`Toplam harcama: ${tl(total)}  (+%5 TR konum ücreti ≈ ${tl(total * 1.05)}, işletmeye yük ≈ ${tl(total * 1.2)})`);
  console.log("Not: 72 saatten genç setlerde rakam yorumlama; frekans ↑ ve kanca ↓ ise kreatif tazele.");
}

async function pause(id) {
  if (!flag("--confirm")) { console.log(`Dry-run: ${id} durdurulacaktı. --confirm ekle.`); return; }
  await call(id, { status: "PAUSED" }, "POST");
  console.log(`${id} durduruldu.`);
}

async function budget(id, tlPerDay) {
  const minor = Math.round(Number(tlPerDay) * 100);
  if (!flag("--confirm")) { console.log(`Dry-run: ${id} günlük bütçe ${tlPerDay} TL olacaktı. --confirm ekle.`); return; }
  await call(id, { daily_budget: String(minor) }, "POST");
  console.log(`${id} günlük bütçe ${tlPerDay} TL yapıldı (öğrenme sıfırlanabilir; 3-4 günde bir %20-30).`);
}

(async () => {
  try {
    if (flag("--pause")) return await pause(opt("--pause"));
    if (flag("--budget")) return await budget(opt("--budget"), args[args.indexOf("--budget") + 2]);
    await report();
  } catch (e) { console.error("Hata:", e.message); process.exit(1); }
})();
