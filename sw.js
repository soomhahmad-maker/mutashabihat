/* ===== خدمة العامل (Service Worker) للمتchابهات — عمل كامل دون اتصال =====
   استراتيجيات:
   - الصفحات (HTML): الشبكة أولاً، ثم التخزين، ثم صفحة احتياطية دون اتصال
   - الملفات الثابتة (CSS, JS, خطوط, أيقونات): التخزين أولاً
   - استجابات API (نص القرآن، التفسير، الصوتيات): التخزين أولاً بعد الزيارة الأولى
   - الملفات الصوتية (MP3): التخزين أولاً
   - التسجيل مشروط: لا في بيئة التطوير، لا داخل iframe، يستثني مسارات تسجيل الدخول و OAuth
*/

const CACHE_NAME = "mutashabihat-v1";
const ASSETS_CACHE = "mutashabihat-assets-v1";
const API_CACHE = "mutashabihat-api-v1";
const AUDIO_CACHE = "mutashabihat-audio-v1";

/* الملفات الأساسية للتخزين المسبق */
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./tafsir.html",
  "./tafsir.js",
  "./sw.js"
];

/* المجالات المسموح بتخزين استجاباتها */
const ALLOWED_ORIGINS = [
  "https://api.alquran.cloud",
  "https://cdn.islamic.network"
];

/* أنماط المسارات المستثناة (تسجيل الدخول و OAuth) */
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

function isAllowedOrigin(url) {
  return ALLOWED_ORIGINS.includes(url.origin) || url.origin === self.location.origin;
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
        keys.filter((key) => key !== CACHE_NAME && key !== ASSETS_CACHE && key !== API_CACHE && key !== AUDIO_CACHE)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* intercept جميع الطلبات */
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  /* استثناء مسارات تسجيل الدخول و OAuth */
  if (isExcludedPath(url)) {
    return;
  }

  /* طلبات التنقل (صفحات HTML): الشبكة أولاً → التخزين → صفحة احتياطية */
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

  /* الملفات الثابتة من نفس المصدر: التخزين أولاً */
  if (url.origin === self.location.origin) {
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
    return;
  }

  /* الطلبات عبر المجالات المسموح بها (API وصوتيات): التخزين أولاً */
  if (isAllowedOrigin(url)) {
    const cacheName = url.hostname.includes("islamic.network") ? AUDIO_CACHE : API_CACHE;
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request, { mode: "cors" }).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(cacheName).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        }).catch(() => {
          /* إذا تعطلت الشبكة ولا يوجد في التخزين، إرجاع استجابة فارغة أو خطأ */
          return new Response("غير متاح دون اتصال", { status: 503, statusText: "Offline" });
        });
      })
    );
    return;
  }

  /* أي طلب آخر: حاول الشبكة ثم التخزين */
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
