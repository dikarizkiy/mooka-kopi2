/* ==========================================================
   Service Worker - Kopi Mooka PWA
   - Halaman (navigasi) : network more dulu, fallback ke cache
   - Aset statis        : cache dulu, lalu perbarui di belakang
   - Tetap berfungsi saat koneksi putus.
   Naikkan CACHE_VERSION setiap kali mengubah file supaya
   pelanggan mendapat versi terbaru.
   ========================================================== */

const CACHE_VERSION = "kopi-senja-v24";
const CACHE_NAME = CACHE_VERSION;

const APP_SHELL = [
  "./",
  "./index.html",
  "./menu.html",
  "./tentang.html",
  "./kontak.html",
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/js/data.js",
  "./assets/js/app.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/favicon-32.png",
  "./assets/img/senja-latte.svg",
  "./assets/img/cappuccino-senja.svg",
  "./assets/img/mocha-senja.svg",
  "./assets/img/caramel-macchiato.svg",
  "./assets/img/americano.svg",
  "./assets/img/espresso-double.svg",
  "./assets/img/v60-gayo.svg",
  "./assets/img/chemex-toraja.svg",
  "./assets/img/matcha-latte.svg",
  "./assets/img/coklat-panas.svg",
  "./assets/img/lemon-tea.svg",
  "./assets/img/loading-kopi-mooka.jpeg",
  "./assets/img/splash-bg-mooka.jpeg",
  "./assets/img/logoo.png",
  "./assets/img/menu-kafe.jpg",
  "./assets/img/menu-hangat.jpg",
  "./assets/img/menu-minuman.jpg",
  "./assets/img/menu-latte.jpg",
  "./assets/img/menu-cappuccino.jpg",
  "./assets/img/menu-mocha.jpg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(APP_SHELL);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return key !== CACHE_NAME;
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  /* Halaman: coba jaringan dulu, kalau gagal pakai cache */
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
          return response;
        })
        .catch(function () {
          return caches.match(request).then(function (cached) {
            return cached || caches.match("./index.html");
          });
        })
    );
    return;
  }

  /* Aset: pakai cache dulu, perbarui di belakang layar */
  event.respondWith(
    caches.match(request).then(function (cached) {
      const network = fetch(request)
        .then(function (response) {
          if (response && response.status === 200 && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(request, copy);
            });
          }
          return response;
        })
        .catch(function () {
          return cached;
        });

      return cached || network;
    })
  );
});
