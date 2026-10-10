/* ==========================================================
   DATA MENU Kopi Mooka
   Ubah nama / harga / deskripsi / catatan hanya di file ini.

   Kolom:
   id       : kode unik menu
   nama     : nama menu yang tampil
   harga    : angka polos, tanpa titik (28000)
   icon     : nama ikon dari daftar ICONS di app.js
   gradient : warna latar kartu (CSS linear-gradient)
   tag      : label kecil di pojok kartu, kosongkan kalau tidak ada
   desc     : deskripsi singkat
   notes    : daftar catatan bahan
   ========================================================== */

/* ==========================================================
   DATA TOKO
   Nomor WhatsApp dikosongkan (fitur pesan via WhatsApp aktif
   hanya bila diisi). Format internasional tanpa tanda plus,
   contoh: 6281234567890
   ========================================================== */

const STORE = {
  nama: "Kopi Mooka",
  whatsapp: "",
  alamat: "Jl. Goria Mooka",
  pajakPersen: 0,
  pesanDefault: "Halo Kopi Mooka, saya mau pesan:",
  ukuran: [
    { key: "regular", label: "Regular", tambahan: 0 },
    { key: "large", label: "Large", tambahan: 6000 }
  ],
  tipePesanan: ["Ambil di tempat", "Dine-in di kafe", "Antar (delivery)"],
  metodeBayar: ["Tunai di kasir", "Transfer bank", "QRIS"]
};

const MENU = [
  {
    id: "senja-latte",
    nama: "Kopi Mooka Latte",
    harga: 28000,
    icon: "cup",
    foto: "assets/img/menu-latte.jpg",
    gradient: "linear-gradient(135deg,#d8b48a,#a9714b)",
    tag: "Best Seller",
    desc: "Espresso ganda, susu whole milk, dan sirup BUSI yang mild.",
    notes: ["Biji Gayo", "Fresh milk", "Sirup BUSI 17 ml"]
  },
  {
    id: "cappuccino-senja",
    nama: "Kopi Mooka Cappuccino",
    harga: 26000,
    icon: "cup",
    foto: "assets/img/menu-cappuccino.jpg",
    gradient: "linear-gradient(135deg,#e8cfae,#b07a4f)",
    tag: "",
    desc: "Klasik Italia dengan rasio 1:1:1 antara espresso, susu, dan busa.",
    notes: ["Double shot", "Microfoam susu", "Tanpa gula"]
  },
  {
    id: "mocha-senja",
    nama: "Dark Mocha Mooka",
    harga: 32000,
    icon: "mug",
    foto: "assets/img/menu-mocha.jpg",
    gradient: "linear-gradient(135deg,#c79a7a,#6b4a3a)",
    tag: "Barista Pick",
    desc: "Espresso, cokelat Belgia 70 persen, dan susu yang lembut.",
    notes: ["Cokelat Belgia", "Extra shot", "Fresh milk"]
  },
  {
    id: "caramel-macchiato",
    nama: "Caramel Macchiato",
    harga: 30000,
    icon: "iced",
    foto: "assets/img/caramel-macchiato.svg",
    gradient: "linear-gradient(135deg,#f0d9b5,#c08b4f)",
    tag: "",
    desc: "Sirup vanila, susu, dan espresso dengan garis karmel di atas.",
    notes: ["Sirup karamel", "2 shot", "Hanya dingin"]
  },
  {
    id: "americano",
    nama: "Americano",
    harga: 22000,
    icon: "cup",
    foto: "assets/img/americano.svg",
    gradient: "linear-gradient(135deg,#d9c3a5,#8a6a4f)",
    tag: "",
    desc: "Espresso original dengan air, rasio 1 banding 3.",
    notes: ["Double shot", "Bisa tambah shot", "Panas atau dingin"]
  },
  {
    id: "espresso-double",
    nama: "Espresso Double",
    harga: 20000,
    icon: "shot",
    foto: "assets/img/espresso-double.svg",
    gradient: "linear-gradient(135deg,#c39a6b,#5b3a21)",
    tag: "",
    desc: "Dua shot espresso pekat tanpa campuran apa pun.",
    notes: ["Body tebal", "Aftertaste cokelat", "60 ml"]
  },
  {
    id: "v60-gayo",
    nama: "V60 Gayo",
    harga: 34000,
    icon: "dripper",
    foto: "assets/img/v60-gayo.svg",
    gradient: "linear-gradient(135deg,#e3cdb4,#9c7a52)",
    tag: "",
    desc: "Single origin Gayo, diseduh V60 dengan perkiraan 2 menit 30 detik.",
    notes: ["200 ml", "Grinding kasar sedang", "Rasa floral"]
  },
  {
    id: "chemex-toraja",
    nama: "Chemex Toraja",
    harga: 36000,
    icon: "chemex",
    foto: "assets/img/chemex-toraja.svg",
    gradient: "linear-gradient(135deg,#ddc9b8,#8f6a5a)",
    tag: "",
    desc: "Toraja dengan body bersih dan acidity yang rendah.",
    notes: ["300 ml", "Seduh lambat", "Fruity ringan"]
  },
  {
    id: "matcha-latte",
    nama: "Matcha Latte",
    harga: 29000,
    icon: "leaf",
    foto: "assets/img/matcha-latte.svg",
    gradient: "linear-gradient(135deg,#cfe0b4,#6f8f4e)",
    tag: "",
    desc: "Matcha premium dari Uji, dicampur susu hingga creamy.",
    notes: ["Ceremonial grade", "Oat milk", "Gula tebu pilihan"]
  },
  {
    id: "coklat-panas",
    nama: "Coklat Panas",
    harga: 25000,
    icon: "mug",
    foto: "assets/img/coklat-panas.svg",
    gradient: "linear-gradient(135deg,#b98a6b,#5f3d2a)",
    tag: "",
    desc: "Cokelat pekat dengan susu fresh dan sedikit gula aren.",
    notes: ["Dark chocolate", "Fresh milk", "Hanya panas"]
  },
  {
    id: "lemon-tea",
    nama: "Lemon Tea",
    harga: 18000,
    icon: "lemon",
    foto: "assets/img/lemon-tea.svg",
    gradient: "linear-gradient(135deg,#f6e6a8,#cba63f)",
    tag: "",
    desc: "Teh hitam dengan potongan lemon segar dan sedikit gula aren.",
    notes: ["Served dingin", "Aduk sebelum diminum", "Aroma citrus"]
  }
];