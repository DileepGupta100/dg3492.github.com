
const cacheName = "v3"
const assets = [
    "./index.html",
    "./static/view/About.js",
    "./static/view/Home.js",
    "./static/index.js"
]
// install event
self.addEventListener("install", (e) => {
    console.log('ServiceWorker installed');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('ServiceWorker caching files');
            cache.addAll(assets);
        }).then(() => self.skipWaiting())
    )
})

// activate
self.addEventListener("activate", (e) => {
    console.log('ServiceWorker activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cache => {
                if (cache != cacheName) {
                    console.log('Service Worker clearing old cache');
                    caches.delete(cache);
                }
            })
        }).then(() => self.skipWaiting())
    )
});

// fetch
self.addEventListener("fetch", (e) => {
    console.log('ServiceWorker fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
});
