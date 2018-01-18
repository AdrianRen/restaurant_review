let urls = [
  '/index.html',
  '/restaurant.html',
  '/data/restaurants.json',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js'
];

for (var i = 1; i < 11; i++) {
  urls.push(`/restaurant.html?id=${i}`);
}

/*
 * After service worker install, store app content in cache 'v1'
 * except for google maps.
 */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v2').then(function (cache) {
      return cache.addAll(urls);
    })
  );
});


// Responds to requests, first by looking in then via network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});