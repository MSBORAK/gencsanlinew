export const MOCK_STOPS = [
  {
    id: "abide",
    name: "Abide Aktarma Merkezi",
    lat: 37.165461472652325,
    lng: 38.79683639017905,
    region: "Merkez",
    buses: [
      { line: "21", route: "Bağlarbaşı", baseTime: 2, color: "#f59e0b" },
      { line: "21A", route: "Açıksu", baseTime: 9, color: "#f59e0b" },
      { line: "22", route: "Süleymaniye", baseTime: 4, color: "#ef4444" },
      { line: "22A", route: "Devteyşti", baseTime: 7, color: "#ef4444" },
      { line: "23", route: "SSK", baseTime: 6, color: "#10b981" },
      { line: "26", route: "Salih Özcan Bulvarı", baseTime: 12, color: "#8b5cf6" },
      { line: "33", route: "Akabe Toki", baseTime: 5, color: "#3b82f6" },
      { line: "36", route: "Otogar - Esentepe", baseTime: 10, color: "#8b5cf6" },
      { line: "57", route: "Fevzi Çakmak", baseTime: 8, color: "#ec4899" },
      { line: "63", route: "Balıklıgöl", baseTime: 3, color: "#6366f1" },
      { line: "73", route: "Karaköprü", baseTime: 7, color: "#14b8a6" },
      { line: "81", route: "Akabe Toki - Sırrın", baseTime: 15, color: "#f43f5e" },
      { line: "90", route: "Osmanbey Kampüs", baseTime: 5, color: "#f43f5e" },
      { line: "95", route: "Organize Sanayi", baseTime: 12, color: "#64748b" },
      { line: "96", route: "2. Organize Sanayi", baseTime: 18, color: "#475569" },
      { line: "97", route: "Yeni Mezarlık", baseTime: 22, color: "#0f172a" },
      { line: "103", route: "Konuklu", baseTime: 25, color: "#84cc16" },
      { line: "104", route: "Konuklu - Hastane", baseTime: 28, color: "#84cc16" },
      { line: "105", route: "Kısas", baseTime: 30, color: "#eab308" },
      { line: "170", route: "Tülmen", baseTime: 15, color: "#84cc16" },
      { line: "180", route: "Akziyaret", baseTime: 20, color: "#eab308" }
    ]
  },
  {
    id: "piazza",
    name: "Piazza AVM Durağı",
    lat: 37.15757073712229,
    lng: 38.78088814044136,
    region: "Merkez",
    buses: [
      { line: "33", route: "Bağlarbaşı", baseTime: 6, color: "#f59e0b" },
      { line: "36", route: "Toki", baseTime: 12, color: "#3b82f6" },
      { line: "34", route: "Evren Sanayi", baseTime: 10, color: "#14b8a6" },
      { line: "R2", route: "Ring", baseTime: 15, color: "#8b5cf6" }
    ]
  },
  {
    id: "balikligol",
    name: "Balıklıgöl",
    lat: 37.14751474175766,
    lng: 38.78385959626061,
    region: "Balıklıgöl",
    buses: [
      { line: "24", route: "Haleplibahçe - Eyyübiye", baseTime: 3, color: "#10b981" },
      { line: "48", route: "Şıh Maksut - Şutim", baseTime: 8, color: "#f59e0b" },
      { line: "63", route: "Abide - Karaköprü", baseTime: 5, color: "#6366f1" },
      { line: "R2", route: "Büyükyol", baseTime: 6, color: "#8b5cf6" },
      { line: "R3", route: "Oto Galericiler", baseTime: 10, color: "#ef4444" },
      { line: "R4", route: "Akşemsettin", baseTime: 12, color: "#14b8a6" }
    ]
  },
  {
    id: "otogar",
    name: "Şehirlerarası Otogar",
    lat: 37.18654239843747,
    lng: 38.80445313859036,
    region: "Karaköprü",
    buses: [
      { line: "36", route: "Esentepe - Akabe", baseTime: 2, color: "#3b82f6" },
      { line: "38", route: "Mance", baseTime: 15, color: "#6366f1" },
      { line: "41A", route: "Yenice", baseTime: 12, color: "#f43f5e" },
      { line: "61", route: "Esentepe - İmamkeskin", baseTime: 8, color: "#ef4444" },
      { line: "62", route: "Esentepe - Eyyüpkent", baseTime: 5, color: "#10b981" },
      { line: "64", route: "Esentepe - Eyyübiye", baseTime: 6, color: "#f59e0b" },
      { line: "71", route: "Güzelşehir", baseTime: 10, color: "#8b5cf6" },
      { line: "71A", route: "Doğukent", baseTime: 12, color: "#ec4899" },
      { line: "72", route: "Mehmet Hafız Bulvarı", baseTime: 7, color: "#6366f1" },
      { line: "74", route: "Şutim - Karaköprü", baseTime: 9, color: "#14b8a6" },
      { line: "76B", route: "Beyazıt Bulvarı", baseTime: 11, color: "#f43f5e" },
      { line: "0", route: "Göbeklitepe", baseTime: 45, color: "#a855f7" }
    ]
  },
  {
    id: "osmanbey",
    name: "Osmanbey Kampüsü (HRÜ)",
    lat: 37.172249355938945,
    lng: 38.99837596927815,
    region: "Osmanbey",
    buses: [
      { line: "52", route: "Karşıyaka - Zeytindalı", baseTime: 8, color: "#ec4899" },
      { line: "55", route: "Zeytindalı Kampüs", baseTime: 5, color: "#3b82f6" },
      { line: "90", route: "Abide - Merkez", baseTime: 2, color: "#f43f5e" },
      { line: "90E", route: "Eyyübiye", baseTime: 15, color: "#6366f1" },
      { line: "90K", route: "Karaköprü", baseTime: 12, color: "#14b8a6" },
      { line: "90S", route: "Seyrantepe", baseTime: 14, color: "#f59e0b" }
    ]
  },
  {
    id: "karakopru_dis",
    name: "Karaköprü Diş Hastanesi",
    lat: 37.220590573048675,
    lng: 38.80614530790362,
    region: "Karaköprü",
    buses: [
      { line: "57", route: "Fevzi Çakmak", baseTime: 6, color: "#ec4899" },
      { line: "70", route: "Buluntu Hoca", baseTime: 8, color: "#f59e0b" },
      { line: "73", route: "Merkez", baseTime: 3, color: "#14b8a6" },
      { line: "73A", route: "Güllübağ", baseTime: 7, color: "#10b981" },
      { line: "74", route: "Şutim - Otogar", baseTime: 9, color: "#ef4444" },
      { line: "75", route: "Balıkayağı", baseTime: 5, color: "#3b82f6" },
      { line: "76", route: "Seyrantepe", baseTime: 6, color: "#8b5cf6" },
      { line: "77", route: "Mehmetçik", baseTime: 10, color: "#84cc16" },
      { line: "78", route: "Zirve Konutları", baseTime: 12, color: "#6366f1" },
      { line: "79", route: "Seyrantepe - Atakent", baseTime: 14, color: "#f43f5e" },
      { line: "90K", route: "Osmanbey Kampüs", baseTime: 10, color: "#f43f5e" }
    ]
  },
  {
    id: "eyyubiye_hastane",
    name: "Eyyübiye Eğt. Arş. Hastanesi",
    lat: 37.11574622432816,
    lng: 38.82367099811131,
    region: "Eyyübiye",
    buses: [
      { line: "11", route: "Mehmet Akif Ersoy", baseTime: 9, color: "#6366f1" },
      { line: "12", route: "Çağdaş Çankaya", baseTime: 11, color: "#3b82f6" },
      { line: "20", route: "Ahmet Yesevi", baseTime: 7, color: "#ec4899" },
      { line: "24", route: "Balıklıgöl", baseTime: 4, color: "#10b981" },
      { line: "42", route: "Hayati Harrani", baseTime: 5, color: "#f59e0b" },
      { line: "43", route: "Abdurrahman Dede", baseTime: 7, color: "#3b82f6" },
      { line: "43A", route: "Hastane Ring", baseTime: 2, color: "#ef4444" },
      { line: "44", route: "Onikiler Kampüsü", baseTime: 8, color: "#8b5cf6" },
      { line: "64", route: "Otogar", baseTime: 10, color: "#ec4899" },
      { line: "90E", route: "Osmanbey Kampüs", baseTime: 15, color: "#6366f1" }
    ]
  },
  {
    id: "haleplibahce",
    name: "Haleplibahçe (Müze)",
    lat: 37.15112918864037,
    lng: 38.78291002509674,
    region: "Balıklıgöl",
    buses: [
      { line: "24", route: "Balıklıgöl - Eyyübiye", baseTime: 4, color: "#10b981" },
      { line: "63", route: "Karaköprü", baseTime: 6, color: "#6366f1" },
      { line: "R2", route: "Büyükyol", baseTime: 8, color: "#8b5cf6" }
    ]
  },
  {
    id: "sirrin",
    name: "Sırrın (Kavşak)",
    lat: 37.138707,
    lng: 38.822014,
    region: "Merkez",
    buses: [
      { line: "52", route: "Zeytindalı Kampüs", baseTime: 10, color: "#ec4899" },
      { line: "81", route: "Akabe Toki", baseTime: 15, color: "#f43f5e" },
      { line: "90", route: "Osmanbey", baseTime: 5, color: "#f43f5e" }
    ]
  },
  {
    id: "akabe",
    name: "Akabe TOKİ",
    lat: 37.14042586414705,
    lng: 38.747486472121466,
    region: "Eyyübiye",
    buses: [
      { line: "33", route: "Abide", baseTime: 10, color: "#3b82f6" },
      { line: "36", route: "Otogar", baseTime: 8, color: "#8b5cf6" },
      { line: "81", route: "Sırrın", baseTime: 20, color: "#f43f5e" }
    ]
  },
  {
    id: "masuk",
    name: "Maşuk TOKİ",
    lat: 37.200337179982434,
    lng: 38.77780559626313,
    region: "Karaköprü",
    buses: [
      { line: "76", route: "Karaköprü", baseTime: 5, color: "#8b5cf6" },
      { line: "76B", route: "Otogar", baseTime: 12, color: "#f43f5e" },
      { line: "79", route: "Atakent", baseTime: 8, color: "#f59e0b" },
      { line: "90S", route: "Osmanbey", baseTime: 15, color: "#eab308" }
    ]
  },
  {
    id: "topcu_meydani",
    name: "Topçu Meydanı (Rabia)",
    lat: 37.1606953762529,
    lng: 38.79074412324491,
    region: "Merkez",
    buses: [
      { line: "63", route: "Balıklıgöl", baseTime: 3, color: "#10b981" },
      { line: "22", route: "Süleymaniye", baseTime: 6, color: "#f59e0b" }
    ]
  },
  {
    id: "bahcelievler",
    name: "Bahçelievler",
    lat: 37.163411,
    lng: 38.793593,
    region: "Merkez",
    buses: [
      { line: "33", route: "Bağlarbaşı", baseTime: 4, color: "#f59e0b" },
      { line: "36", route: "Toki", baseTime: 10, color: "#3b82f6" }
    ]
  },
  {
    id: "novada",
    name: "Novada Park AVM",
    lat: 37.16367938554256,
    lng: 38.794911528474444,
    region: "Merkez",
    buses: [
      { line: "21", route: "Bağlarbaşı", baseTime: 5, color: "#f59e0b" },
      { line: "73", route: "Karaköprü", baseTime: 8, color: "#14b8a6" }
    ]
  },
  {
    id: "urfacity",
    name: "Urfa City AVM",
    lat: 37.182287655757285,
    lng: 38.80703688091813,
    region: "Merkez",
    buses: [
      { line: "63", route: "Balıklıgöl", baseTime: 5, color: "#10b981" },
      { line: "R2", route: "Ring", baseTime: 12, color: "#8b5cf6" }
    ]
  },
  {
    id: "gap_arena",
    name: "11 Nisan Stadyumu (GAP Arena)",
    lat: 37.14810077565314,
    lng: 38.80691955208026,
    region: "Karaköprü",
    buses: [
      { line: "74", route: "Otogar", baseTime: 10, color: "#ef4444" },
      { line: "73", route: "Merkez", baseTime: 15, color: "#14b8a6" }
    ]
  },
  {
    id: "hasimiye",
    name: "Haşimiye Meydanı",
    lat: 37.14953200332456,
    lng: 38.79063104599802,
    region: "Balıklıgöl",
    buses: [
      { line: "63", route: "Merkez", baseTime: 4, color: "#10b981" },
      { line: "48", route: "Şutim", baseTime: 8, color: "#f59e0b" }
    ]
  },
  {
    id: "karakopru_fuar",
    name: "Karaköprü Fuar Merkezi",
    lat: 37.22477607603475,
    lng: 38.792004594411864,
    region: "Karaköprü",
    buses: [
      { line: "72", route: "Merkez", baseTime: 12, color: "#ef4444" },
      { line: "74", route: "Eyyübiye", baseTime: 20, color: "#f59e0b" }
    ]
  },
  {
    id: "bilim_merkezi",
    name: "Şanlıurfa Bilim Merkezi",
    lat: 37.1714660174962,
    lng: 38.84338159626168,
    region: "Karaköprü",
    buses: [
      { line: "76", route: "Merkez", baseTime: 15, color: "#8b5cf6" },
      { line: "90", route: "Osmanbey", baseTime: 10, color: "#3b82f6" }
    ]
  }
];
