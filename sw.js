let pathes = [
  '/index.html',
  '/restaurant.html',
  '/data/restaurants.json',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js'
];

for (var i = 1; i < 11; i++) {
  pathes.push(`/restaurant.html?id=${i}`);
}

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll(pathes);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});