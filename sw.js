/* ===== خدمة العامل (Service Worker) للمتchابهات =====
   استراتيجيات:
   - الصفحات (HTML): الشبكة أولاً (network-first)
   - الملفات الثابتة (CSS, JS, خطوط, صور): التخزين أولاً (cache-first)
   - التسجيل مشروط: لا في بيئة التطوير، لا داخل iframe، يستثني مسارات تسجيل الدخول و OAuth
*/

const CACHE_NAME = "mutashabihat-v1";
const ASSETS_CACHE = "mutashabihat-assets-v1";

/* الملفات الأساسية للتخزين المسبق (pré-cache) */
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./lafziya.html",
  "./lafziya.js",
  "./tafsir.html",
  "./tafsir.js"
];

/* أنماط المسارات المستثناة من التخزين (تسجيل الدخول و OAuth) */
const EXCLUDED_PATHS = [
  /\/login/,
  /\/auth/,
  /\/oauth/,
  /\/callback/,
  /\?code=/,
  /\?state=/
];

function isExcludedPath(url) {
  return EXCLUDED_PATHS.some(pattern => pattern.test(url.pathname + url.search));
}

/* التثبيت المسبق للملفات الأساسية */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

/* التفعيل وحذف التخزينات القديمة */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME && key !== ASSETS_CACHE)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* intercept الطلبات */
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  /* استثناء مسارات تسجيل الدخول و OAuth */
  if (isExcludedPath(url)) {
    return; // laisse le navigateur gérer normalement
  }

  /* طلبات الصفحات (HTML): الشبكة أولاً */
  if (event.request.mode === "navigate" || event.request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || caches.match("./index.html");
          });
        })
    );
    return;
  }

  /* الملفات الثابتة: التخزين أولاً */
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }
        const responseClone = networkResponse.clone();
        caches.open(ASSETS_CACHE).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      });
    })
  );
});
