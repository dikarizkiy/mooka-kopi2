/* ==========================================================
   Kopi Mooka - logika bersama untuk semua halaman
   - Ikon memakai SVG bawaan supaya tidak perlu font emoji
     dan tidak pernah tampil sebagai kotak kosong.
   - Semua fitur menu (pencarian, filter, modal detail)
     hanya diaktifkan di halaman yang punya #grid.
   ========================================================== */

const ICONS = {
  cup:
    '<path d="M14 22h30v14a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12V22z"/>' +
    '<path d="M44 26h4a7 7 0 0 1 0 14h-4" fill="none" stroke="currentColor" stroke-width="4"/>' +
    '<rect x="8" y="50" width="42" height="5" rx="2.5"/>' +
    '<path d="M23 15c0-3 3-3 3-6M33 15c0-3 3-3 3-6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',

  mug:
    '<path d="M16 24h26v16a10 10 0 0 1-10 10h-6a10 10 0 0 1-10-10V24z"/>' +
    '<path d="M42 28h5a6 6 0 0 1 0 12h-5" fill="none" stroke="currentColor" stroke-width="4"/>' +
    '<rect x="12" y="50" width="34" height="5" rx="2.5"/>',

  shot:
    '<path d="M20 26h24v14a12 12 0 0 1-12 12 12 12 0 0 1-12-12V26z"/>' +
    '<rect x="14" y="20" width="36" height="6" rx="3"/>' +
    '<rect x="16" y="52" width="32" height="5" rx="2.5"/>',

  iced:
    '<path d="M18 16h28l-4 36a7 7 0 0 1-7 6h-6a7 7 0 0 1-7-6l-4-36z"/>' +
    '<rect x="36" y="6" width="5" height="20" rx="2.5" transform="rotate(14 38 16)"/>' +
    '<circle cx="27" cy="44" r="3.5" fill="#ffffff" opacity=".65"/>' +
    '<circle cx="37" cy="38" r="3" fill="#ffffff" opacity=".65"/>',

  dripper:
    '<path d="M12 18h40L32 42 12 18z"/>' +
    '<rect x="26" y="42" width="12" height="9" rx="2"/>' +
    '<rect x="20" y="51" width="24" height="6" rx="3"/>',

  chemex:
    '<path d="M14 16h36l-6 20c-2 6-8 10-13 10s-11-4-13-10L14 16z"/>' +
    '<rect x="18" y="45" width="28" height="6" rx="3" opacity=".75"/>',

  leaf:
    '<path d="M52 12C30 15 16 27 16 41c0 5 2 8 2 8s7-17 25-23c0 0-15 8-20 21 21 4 29-13 29-35z"/>' +
    '<path d="M14 54c8-16 20-26 34-32" fill="none" stroke="#ffffff" stroke-width="2.5" opacity=".5"/>',

  lemon:
    '<path d="M33 10c14 6 21 18 17 30-4 13-19 19-31 13C6 45 5 22 19 13c5-4 9-4 14-3z"/>' +
    '<path d="M19 15c9 12 15 22 19 35" fill="none" stroke="#ffffff" stroke-width="3" opacity=".55"/>',

  croissant:
    '<path d="M8 41c6-15 15-22 24-22s18 7 24 22c-9 6-17 8-24 8s-15-2-24-8z"/>' +
    '<path d="M25 27c0 8 2 14 4 18M39 27c0 8-2 14-4 18" fill="none" stroke="#ffffff" stroke-width="2.5" opacity=".5"/>',

  bread:
    '<path d="M8 40c0-12 11-20 24-20s24 8 24 20v7a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-7z"/>' +
    '<circle cx="24" cy="33" r="3" fill="#ffffff" opacity=".55"/>' +
    '<circle cx="38" cy="31" r="3" fill="#ffffff" opacity=".55"/>'
};

function svgIcon(name, className) {
  const path = ICONS[name] || ICONS.cup;
  return (
    '<svg class="' + className + '" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
    path +
    "</svg>"
  );
}

/* ---------- Format harga ---------- */
const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0
});

/* ---------- Tahun footer ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Menu navigasi untuk layar kecil ---------- */
const navToggle = document.querySelector(".navtoggle");
const topnav = document.getElementById("topnav");

if (navToggle && topnav) {
  navToggle.addEventListener("click", function () {
    const terbuka = topnav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(terbuka));
  });
}

/* ---------- Form kontak (hanya Appearance, tanpa backend) ---------- */
const formKontak = document.getElementById("form-kontak");

if (formKontak) {
  formKontak.addEventListener("submit", function (event) {
    event.preventDefault();
    const pesan = document.getElementById("form-ok");
    if (pesan) pesan.classList.add("is-on");
    formKontak.reset();
  });
}

/* ---------- Menu: hanya jalan di halaman menu ---------- */
const grid = document.getElementById("grid");

if (grid && typeof MENU !== "undefined") {
  const emptyState = document.getElementById("empty");
  const searchInput = document.getElementById("search");
  const modal = document.getElementById("modal");

  const state = { query: "" };
  let modalQty = 1;
  let modalUkuran = "";

  /* Render daftar menu */
  function renderMenu() {
    const q = state.query.trim().toLowerCase();

    const items = MENU.filter(function (item) {
      return (
        q === "" ||
        item.nama.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );
    });

    emptyState.hidden = items.length > 0;

    if (items.length === 0) {
      grid.innerHTML = "";
      return;
    }

    grid.innerHTML = items
      .map(function (item) {
        return (
          '<article class="card" role="button" tabindex="0" data-id="' +
          item.id +
          '" aria-label="Lihat detail ' +
          item.nama +
          '">' +
          '<div class="card__media" style="background:' +
          item.gradient +
          '">' +
          (item.tag ? '<span class="card__tag">' + item.tag + "</span>" : "") +
          '<img class="card__img" src="' +
          item.foto +
          '" alt="Gambar ' +
          item.nama +
          '" loading="lazy" width="200" height="200">' +
          "</div>" +
          '<div class="card__body">' +
          "<h3>" +
          item.nama +
          "</h3>" +
          "<p>" +
          item.desc +
          "</p>" +
          '<div class="card__foot">' +
          '<span class="price">' +
          rupiah.format(item.harga) +
          "<small>per cup</small></span>" +
          '<button class="addbtn" type="button" data-add="' +
          item.id +
          '" aria-label="Tambah ' +
          item.nama +
          ' ke pesanan">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
          '<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>' +
          "<span>Tambah</span></button>" +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    grid.querySelectorAll(".card").forEach(function (card) {
      const addBtn = card.querySelector(".addbtn");

      if (addBtn) {
        addBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          tambahKeKeranjang(card.dataset.id, 1);
        });
      }

      card.addEventListener("click", function () {
        bukaModal(card.dataset.id);
      });
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          bukaModal(card.dataset.id);
        }
      });
    });
  }

  /* Modal detail */
  function bukaModal(id) {
    const item = MENU.find(function (m) {
      return m.id === id;
    });
    if (!item) return;

    const modalMedia = document.getElementById("modalMedia");
    const modalCat = document.getElementById("modalCat");
    const modalName = document.getElementById("modalName");
    const modalDesc = document.getElementById("modalDesc");
    const modalNotes = document.getElementById("modalNotes");
    const modalPrice = document.getElementById("modalPrice");
    const modalUkuranWrap = document.getElementById("modalUkuran");

    modalMedia.style.background = item.gradient;
    const clsFoto = /\.jpe?g$/i.test(item.foto) ? " modal__img--photo" : "";
    modalMedia.innerHTML =
      '<img class="modal__img' + clsFoto + '" src="' + item.foto + '" alt="Gambar ' + item.nama + '" width="200" height="200">';
    modalName.textContent = item.nama;
    modalDesc.textContent = item.desc;
    modalNotes.innerHTML = item.notes
      .map(function (note) {
        return "<li>" + note + "</li>";
      })
      .join("");

    /* Ukuran (hanya untuk minuman) */
    const ukuranList = daftarUkuran(item.id);
    const adaUkuran = punyaUkuran(item.id) && ukuranList.length > 1;
    modalUkuran = ukuranList[0].key;

    if (modalUkuranWrap) {
      modalUkuranWrap.hidden = !adaUkuran;
      modalUkuranWrap.innerHTML = adaUkuran
        ? ukuranList
            .map(function (u) {
              return (
                '<button type="button" class="chip" data-ukuran="' +
                u.key +
                '" aria-selected="' +
                (u.key === modalUkuran) +
                '">' +
                u.label +
                (u.tambahan > 0 ? " +" + rupiah.format(u.tambahan) : "") +
                "</button>"
              );
            })
            .join("")
        : "";

      modalUkuranWrap.querySelectorAll("[data-ukuran]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          modalUkuran = btn.dataset.ukuran;
          modalUkuranWrap.querySelectorAll("[data-ukuran]").forEach(function (b) {
            b.setAttribute("aria-selected", String(b.dataset.ukuran === modalUkuran));
          });
          if (modalPrice) modalPrice.textContent = rupiah.format(hargaSatuan(item.id, modalUkuran));
        });
      });
    }

    modalPrice.textContent = rupiah.format(hargaSatuan(item.id, modalUkuran));

    modal.dataset.item = item.id;
    modalQty = 1;
    const modalQtyEl = document.getElementById("modalQty");
    if (modalQtyEl) modalQtyEl.textContent = "1";

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();
  }

  function tutupModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  modal.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", tutupModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) tutupModal();
  });

  /* Jumlah pada modal + tombol tambah ke pesanan */
  const modalMinus = document.getElementById("modalMinus");
  const modalPlus = document.getElementById("modalPlus");
  const modalQtyEl = document.getElementById("modalQty");
  const modalAdd = document.getElementById("modalAdd");

  function setModalQty(n) {
    modalQty = Math.max(1, Math.min(99, n));
    if (modalQtyEl) modalQtyEl.textContent = String(modalQty);
  }

  if (modalMinus) {
    modalMinus.addEventListener("click", function () {
      setModalQty(modalQty - 1);
    });
  }
  if (modalPlus) {
    modalPlus.addEventListener("click", function () {
      setModalQty(modalQty + 1);
    });
  }
  if (modalAdd) {
    modalAdd.addEventListener("click", function () {
      if (!modal.dataset.item) return;
      const ukuran = modalUkuran;
      tutupModal();
      tambahKeKeranjang(modal.dataset.item, modalQty, ukuran);
    });
  }

  /* Pencarian */
  searchInput.addEventListener("input", function (event) {
    state.query = event.target.value;
    renderMenu();
  });

  /* Init halaman menu */
  renderMenu();
}

/* ==========================================================
   Animasi
   Dipanggil terakhir supaya kartu yang dibuat renderMenu()
   ikut mendapat efek muncul.
   ========================================================== */

const SELECTOR_REVEAL =
  ".card, .feature, .info, .section__head, .toolbar, .split__media, " +
  ".prose, .band__inner, .form, .foot__inner";

function initAnimations() {
  const kurangiGerak =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const items = document.querySelectorAll(SELECTOR_REVEAL);

  items.forEach(function (el) {
    el.setAttribute("data-reveal", "");

    if (kurangiGerak || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    // Jeda animasi mengikuti posisi di dalam induknya,
    // supaya kartu muncul berurutan dari kiri ke kanan.
    const posisi = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.transitionDelay = Math.min(posisi, 8) * 55 + "ms";
  });

  // Class ini hanya ditambahkan setelah JS berjalan,
  // jadi kalau JS gagal semua konten tetap terlihat.
  document.body.classList.add("reveal-ready");

  if (kurangiGerak || !("IntersectionObserver" in window)) return;

  const pemantau = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        pemantau.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
  );

  items.forEach(function (el) {
    pemantau.observe(el);
  });

  // Jaring pengaman: kalau ada elemen yang belum tampil setelah 3 detik,
  // paksa semua tampil. Isi halaman tidak boleh pernah tersembunyi.
  window.setTimeout(function () {
    document.body.classList.add("reveal-off");
  }, 3000);
}

function initTopbar() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  const perbarui = function () {
    topbar.classList.toggle("is-stuck", window.scrollY > 8);
  };

  perbarui();
  window.addEventListener("scroll", perbarui, { passive: true });
}

/* ---------- Progress bar dan tombol kembali ke atas ---------- */
function initScrollWidgets() {
  const bar = document.getElementById("progress");
  const tombol = document.getElementById("totop");

  const perbarui = function () {
    const tinggi = document.documentElement.scrollHeight - window.innerHeight;
    const rasio = tinggi > 0 ? Math.min(window.scrollY / tinggi, 1) : 0;

    if (bar) bar.style.transform = "scaleX(" + rasio + ")";
    if (tombol) tombol.classList.toggle("is-on", window.scrollY > 320);
  };

  perbarui();
  window.addEventListener("scroll", perbarui, { passive: true });
  window.addEventListener("resize", perbarui);

  if (tombol) {
    tombol.addEventListener("click", function () {
      const keAtas = window.scrollY > 0;
      window.scrollTo({ top: keAtas ? 0 : document.documentElement.scrollHeight, behavior: "smooth" });
    });
  }
}

/* ==========================================================
   KERANJANG PESANAN + CHECKOUT WHATSAPP
   - Keranjang disimpan di localStorage, jadi tidak hilang
     walau halaman ditutup atau app ditutup.
   - Tombol mengambang dan panel keranjang dibuat oleh JS
     supaya otomatis tampil di semua halaman.
   - Nomor WhatsApp diatur di STORE pada assets/js/data.js
   ========================================================== */

const CART_KEY = "kopi-senja-keranjang";

function bacaKeranjang() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function simpanKeranjang(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (err) {
    /* localStorage bisa diblokir, abaikan saja */
  }
}

function cariMenu(id) {
  if (typeof MENU === "undefined") return null;
  return (
    MENU.find(function (m) {
      return m.id === id;
    }) || null
  );
}

/* ----- Ukuran dan harga satuan ----- */
function punyaUkuran(id) {
  const menu = cariMenu(id);
  return !!menu;
}

function daftarUkuran(id) {
  if (!punyaUkuran(id)) return [{ key: "", label: "", tambahan: 0 }];
  const list = (typeof STORE !== "undefined" && STORE.ukuran) || [];
  return list.length ? list : [{ key: "", label: "", tambahan: 0 }];
}

function cariUkuran(id, key) {
  const list = daftarUkuran(id);
  return (
    list.find(function (u) {
      return u.key === key;
    }) || list[0]
  );
}

function labelUkuran(id, key) {
  const u = cariUkuran(id, key);
  return u && u.label ? u.label : "";
}

function hargaSatuan(id, ukuranKey) {
  const menu = cariMenu(id);
  if (!menu) return 0;
  const u = cariUkuran(id, ukuranKey);
  return menu.harga + (u ? u.tambahan : 0);
}

/* ----- Data pemesan ----- */
const CUSTOMER_KEY = "kopi-senja-pelanggan";

function bacaPelanggan() {
  try {
    const data = JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "{}");
    return data && typeof data === "object" ? data : {};
  } catch (err) {
    return {};
  }
}

function simpanPelanggan(data) {
  try {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(data));
  } catch (err) {
    /* localStorage bisa diblokir, abaikan saja */
  }
}

function hitungKeranjang() {
  const items = bacaKeranjang();
  let jumlah = 0;
  let subtotal = 0;

  items.forEach(function (it) {
    if (!cariMenu(it.id)) return;
    jumlah += it.qty;
    subtotal += hargaSatuan(it.id, it.ukuran) * it.qty;
  });

  return { items: items, jumlah: jumlah, subtotal: subtotal, total: hitungTotal(subtotal) };
}

function persenPajak() {
  return (typeof STORE !== "undefined" && STORE.pajakPersen) || 0;
}

function hitungTotal(subtotal) {
  return subtotal + Math.round(subtotal * (persenPajak() / 100));
}

function tambahKeKeranjang(id, qty, ukuran) {
  const menu = cariMenu(id);
  if (!menu) return;

  const u = typeof ukuran === "string" ? ukuran : daftarUkuran(id)[0].key;

  const items = bacaKeranjang();
  const ada = items.find(function (it) {
    return it.id === id && (it.ukuran || "") === u;
  });

  if (ada) ada.qty = Math.min(99, ada.qty + qty);
  else items.push({ id: id, ukuran: u, qty: Math.max(1, Math.min(99, qty)) });

  simpanKeranjang(items);
  renderKeranjang();
  bukaKeranjang();
}

function ubahQty(id, ukuran, qty) {
  const u = ukuran || "";
  const items = bacaKeranjang();
  const it = items.find(function (x) {
    return x.id === id && (x.ukuran || "") === u;
  });
  if (!it) return;

  if (qty <= 0) {
    simpanKeranjang(
      items.filter(function (x) {
        return !(x.id === id && (x.ukuran || "") === u);
      })
    );
  } else {
    it.qty = Math.min(99, qty);
    simpanKeranjang(items);
  }
  renderKeranjang();
}

function hapusItem(id, ukuran) {
  const u = ukuran || "";
  simpanKeranjang(
    bacaKeranjang().filter(function (x) {
      return !(x.id === id && (x.ukuran || "") === u);
    })
  );
  renderKeranjang();
}

function kosongkanKeranjang() {
  simpanKeranjang([]);
  renderKeranjang();
}

function buatLinkWhatsApp(ringkasan) {
  const nomor = (typeof STORE !== "undefined" && STORE.whatsapp) || "";
  const pelanggan = bacaPelanggan();

  const daftar = ringkasan.items
    .map(function (it) {
      const menu = cariMenu(it.id);
      if (!menu) return null;
      const uk = labelUkuran(it.id, it.ukuran);
      const nama = menu.nama + (uk ? " (" + uk + ")" : "");
      return "- " + nama + " x" + it.qty + " = " + rupiah.format(hargaSatuan(it.id, it.ukuran) * it.qty);
    })
    .filter(Boolean)
    .join("\n");

  const baris = [
    (typeof STORE !== "undefined" && STORE.pesanDefault) || "Halo, saya mau pesan:",
    "",
    daftar,
    "",
    "Subtotal: " + rupiah.format(ringkasan.subtotal)
  ];

  if (persenPajak() > 0) {
    baris.push("Pajak " + persenPajak() + "%: " + rupiah.format(ringkasan.total - ringkasan.subtotal));
  }

  baris.push("Total: " + rupiah.format(ringkasan.total));

  if (pelanggan.nama) baris.push("", "Nama: " + pelanggan.nama);
  if (pelanggan.hp) baris.push("No. HP: " + pelanggan.hp);
  if (pelanggan.tipe) baris.push("Tipe pesanan: " + pelanggan.tipe);
  if (pelanggan.waktu) baris.push("Waktu: " + pelanggan.waktu);
  if (pelanggan.bayar) baris.push("Pembayaran: " + pelanggan.bayar);
  if (pelanggan.catatan) baris.push("Catatan: " + pelanggan.catatan);

  return "https://wa.me/" + nomor + "?text=" + encodeURIComponent(baris.join("\n"));
}

/* ----- Formulir detail pesanan ----- */
function escapeAttr(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function opsiSelect(list, value) {
  return list
    .map(function (o) {
      return '<option value="' + escapeAttr(o) + '"' + (o === value ? " selected" : "") + ">" + escapeAttr(o) + "</option>";
    })
    .join("");
}

function buatFormPelanggan() {
  const p = bacaPelanggan();
  const tipe = (typeof STORE !== "undefined" && STORE.tipePesanan) || ["Ambil di tempat"];
  const bayar = (typeof STORE !== "undefined" && STORE.metodeBayar) || ["Tunai di kasir"];

  return (
    '<h3 class="cart__formtitle">Detail pesanan</h3>' +
    '<label class="field"><span>Nama pemesan</span>' +
    '<input id="pf-nama" type="text" placeholder="Nama lengkap" value="' + escapeAttr(p.nama) + '"></label>' +
    '<label class="field"><span>Nomor HP</span>' +
    '<input id="pf-hp" type="tel" placeholder="08xx-xxxx-xxxx" value="' + escapeAttr(p.hp) + '"></label>' +
    '<label class="field"><span>Tipe pesanan</span>' +
    '<select id="pf-tipe">' + opsiSelect(tipe, p.tipe) + "</select></label>" +
    '<label class="field"><span>Waktu</span>' +
    '<input id="pf-waktu" type="text" placeholder="Contoh: secepatnya atau 09.00" value="' + escapeAttr(p.waktu) + '"></label>' +
    '<label class="field"><span>Metode bayar</span>' +
    '<select id="pf-bayar">' + opsiSelect(bayar, p.bayar) + "</select></label>" +
    '<label class="field"><span>Catatan (opsional)</span>' +
    '<textarea id="pf-catatan" placeholder="Contoh: tanpa gula, kurang es">' + escapeAttr(p.catatan) + "</textarea></label>"
  );
}

function simpanFormPelanggan() {
  const ambil = function (id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };

  simpanPelanggan({
    nama: ambil("pf-nama"),
    hp: ambil("pf-hp"),
    tipe: ambil("pf-tipe"),
    waktu: ambil("pf-waktu"),
    bayar: ambil("pf-bayar"),
    catatan: ambil("pf-catatan")
  });
}

function buatUIKeranjang() {
  const fab = document.createElement("button");
  fab.type = "button";
  fab.className = "cartfab";
  fab.id = "cartfab";
  fab.setAttribute("aria-label", "Buka pesanan");
  fab.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M4 5h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<circle cx="10" cy="20.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="20.5" r="1.5" fill="currentColor"/>' +
    "</svg>" +
    '<span class="cartfab__badge" id="cartBadge" hidden>0</span>';

  const overlay = document.createElement("div");
  overlay.className = "cart";
  overlay.id = "cart";
  overlay.hidden = true;
  overlay.innerHTML =
    '<div class="cart__backdrop" data-cart-close></div>' +
    '<aside class="cart__panel" role="dialog" aria-modal="true" aria-labelledby="cartTitle">' +
    '<header class="cart__head">' +
    '<h2 id="cartTitle">Pesanan Anda</h2>' +
    '<button class="cart__close" type="button" data-cart-close aria-label="Tutup">&times;</button>' +
    "</header>" +
    '<div class="cart__scroll">' +
    '<div class="cart__items" id="cartBody"></div>' +
    '<form class="cart__form" id="cartForm" novalidate>' +
    buatFormPelanggan() +
    "</form>" +
    "</div>" +
    '<footer class="cart__foot" id="cartFoot"></footer>' +
    "</aside>";

  document.body.appendChild(fab);
  document.body.appendChild(overlay);

  fab.addEventListener("click", bukaKeranjang);
  overlay.querySelectorAll("[data-cart-close]").forEach(function (el) {
    el.addEventListener("click", tutupKeranjang);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !overlay.hidden) tutupKeranjang();
  });

  ["pf-nama", "pf-hp", "pf-tipe", "pf-waktu", "pf-bayar", "pf-catatan"].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", simpanFormPelanggan);
    el.addEventListener("change", simpanFormPelanggan);
  });
}

function renderKeranjang() {
  const ringkasan = hitungKeranjang();

  const badge = document.getElementById("cartBadge");
  if (badge) {
    badge.textContent = String(ringkasan.jumlah);
    badge.hidden = ringkasan.jumlah === 0;
  }

  const body = document.getElementById("cartBody");
  const foot = document.getElementById("cartFoot");
  const form = document.getElementById("cartForm");
  if (!body || !foot) return;

  const kosong = ringkasan.items.length === 0;
  if (form) form.hidden = kosong;

  if (kosong) {
    body.innerHTML =
      '<div class="cart__empty">' +
      '<p>Keranjang masih kosong.</p>' +
      '<a class="btn btn--ghost" href="menu.html">Lihat Menu</a>' +
      "</div>";
    foot.innerHTML = "";
    return;
  }

  body.innerHTML = ringkasan.items
    .map(function (it) {
      const menu = cariMenu(it.id);
      if (!menu) return "";

      const uk = it.ukuran || "";
      const satuan = hargaSatuan(it.id, uk);
      const label = labelUkuran(it.id, uk);

      return (
        '<article class="cartitem">' +
        '<div class="cartitem__media" style="background:' + menu.gradient + '">' +
        '<img src="' + menu.foto + '" alt="" width="80" height="80" loading="lazy">' +
        "</div>" +
        '<div class="cartitem__info">' +
        "<h3>" + menu.nama + "</h3>" +
        '<span class="cartitem__price">' + rupiah.format(satuan) + (label ? " &middot; " + label : "") + "</span>" +
        '<div class="qty qty--sm" role="group" aria-label="Jumlah ' + menu.nama + '">' +
        '<button type="button" data-cart-dec="' + it.id + '" data-ukuran="' + uk + '" aria-label="Kurangi jumlah">&minus;</button>' +
        '<span aria-live="polite">' + it.qty + "</span>" +
        '<button type="button" data-cart-inc="' + it.id + '" data-ukuran="' + uk + '" aria-label="Tambah jumlah">+</button>' +
        "</div>" +
        "</div>" +
        '<div class="cartitem__end">' +
        '<span class="cartitem__total">' + rupiah.format(satuan * it.qty) + "</span>" +
        '<button class="cartitem__remove" type="button" data-cart-del="' + it.id + '" data-ukuran="' + uk + '" aria-label="Hapus ' + menu.nama + '">Hapus</button>' +
        "</div>" +
        "</article>"
      );
    })
    .join("");

  const cariIt = function (id, ukuran) {
    return bacaKeranjang().find(function (x) {
      return x.id === id && (x.ukuran || "") === (ukuran || "");
    });
  };

  body.querySelectorAll("[data-cart-inc]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const it = cariIt(btn.dataset.cartInc, btn.dataset.ukuran);
      ubahQty(btn.dataset.cartInc, btn.dataset.ukuran, (it ? it.qty : 0) + 1);
    });
  });

  body.querySelectorAll("[data-cart-dec]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const it = cariIt(btn.dataset.cartDec, btn.dataset.ukuran);
      ubahQty(btn.dataset.cartDec, btn.dataset.ukuran, (it ? it.qty : 0) - 1);
    });
  });

  body.querySelectorAll("[data-cart-del]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      hapusItem(btn.dataset.cartDel, btn.dataset.ukuran);
    });
  });

  const barisPajak =
    persenPajak() > 0
      ? '<div class="cart__row"><span>Pajak ' + persenPajak() + "%</span><span>" +
        rupiah.format(ringkasan.total - ringkasan.subtotal) + "</span></div>"
      : "";

  foot.innerHTML =
    '<div class="cart__row"><span>Subtotal</span><span>' + rupiah.format(ringkasan.subtotal) + "</span></div>" +
    barisPajak +
    '<div class="cart__row cart__row--total"><span>Total</span><span>' + rupiah.format(ringkasan.total) + "</span></div>" +
    '<a class="btn btn--primary cart__checkout" id="cartCheckout" href="#">Pesan via WhatsApp</a>' +
    '<button class="cart__clear" type="button" id="cartClear">Kosongkan keranjang</button>';

  const checkout = document.getElementById("cartCheckout");
  if (checkout) {
    checkout.addEventListener("click", function (event) {
      event.preventDefault();
      const pelanggan = bacaPelanggan();
      if (!pelanggan.nama) {
        const el = document.getElementById("pf-nama");
        if (el) {
          el.focus();
          el.scrollIntoView({ block: "center", behavior: "smooth" });
        }
        window.alert("Mohon isi nama pemesan dulu sebelum memesan.");
        return;
      }
      window.open(buatLinkWhatsApp(hitungKeranjang()), "_blank", "noopener");
    });
  }

  const clear = document.getElementById("cartClear");
  if (clear) {
    clear.addEventListener("click", function () {
      if (window.confirm("Kosongkan semua pesanan?")) kosongkanKeranjang();
    });
  }
}

function bukaKeranjang() {
  const cart = document.getElementById("cart");
  if (!cart) return;
  renderKeranjang();
  cart.hidden = false;
  document.body.style.overflow = "hidden";
  const tombol = cart.querySelector(".cart__close");
  if (tombol) tombol.focus();
}

function tutupKeranjang() {
  const cart = document.getElementById("cart");
  if (!cart) return;
  cart.hidden = true;
  document.body.style.overflow = "";
}

function initKeranjang() {
  if (typeof MENU === "undefined") return;
  if (!document.getElementById("grid")) return;
  buatUIKeranjang();
  renderKeranjang();
}

/* ==========================================================
   PWA
   - Daftarkan service worker supaya app bisa dipasang
     (install) dan tetap jalan saat koneksi putus.
   - Tombol "Pasang App" muncul otomatis saat browser
     mengizinkan pemasangan.
   ========================================================== */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {
      /* Diamkan bila pendaftaran gagal (mis. file://) */
    });
  });
}

function initInstallPrompt() {
  const nav = document.getElementById("topnav");
  if (!nav) return;

  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = "installbtn";
  tombol.hidden = true;
  tombol.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M12 3v11M8 10l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M5 19h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    "</svg><span>Pasang App</span>";

  nav.appendChild(tombol);

  let promptTertunda = null;

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    promptTertunda = event;
    tombol.hidden = false;
  });

  tombol.addEventListener("click", function () {
    if (!promptTertunda) return;
    promptTertunda.prompt();
    promptTertunda.userChoice.then(function () {
      promptTertunda = null;
      tombol.hidden = true;
    });
  });

  window.addEventListener("appinstalled", function () {
    promptTertunda = null;
    tombol.hidden = true;
  });
}

function initSplash() {
  const splash = document.getElementById("splash");
  if (!splash) return;

  const tutup = function () {
    splash.classList.add("is-hidden");
    window.setTimeout(function () {
      if (splash.parentNode) splash.parentNode.removeChild(splash);
    }, 520);
  };

  const kurangiGerak =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var durasi = kurangiGerak ? 400 : 2000;
  var persen = document.querySelector(".splash__percent");

  var mulai = function () {
    var mulaiKapan = Date.now();
    var judul = window.setInterval(function () {
      var p = Math.min(100, Math.round(((Date.now() - mulaiKapan) / durasi) * 100));
      if (persen) persen.textContent = "Memuat " + p + "%";
      if (p >= 100) window.clearInterval(judul);
    }, 16);
    window.setTimeout(tutup, durasi);
  };

  if (document.readyState === "complete") mulai();
  else window.addEventListener("load", mulai);
}

initAnimations();
initTopbar();
initScrollWidgets();
initInstallPrompt();
initKeranjang();
initSplash();