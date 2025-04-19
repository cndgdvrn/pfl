// This is the service worker with the Cache-first network

const CACHE = "pfl-precache";
const precacheFiles = [
  /* Add an array of files to precache for your app */
  "/",
  "/offline",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// The install handler takes care of precaching the resources we always need
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(precacheFiles))
  );
});

// The activate handler cleans up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// The fetch handler serves responses from a cache.
// If no response is found, it tries the network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request to make a network request and store the response
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response;
            }
            
            // Clone the response to store it in the cache
            const responseToCache = response.clone();
            
            caches.open(CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(error => {
            // Check if the user is offline and trying to navigate to a web page
            if (event.request.method === "GET" && event.request.headers.get("accept").includes("text/html")) {
              // Return the offline page
              return caches.match("/offline");
            }
            
            return caches.match("/offline");
          });
      })
  );
});

// This is an event that can be fired from your page to tell the SW to update the offline page
self.addEventListener("refreshOffline", function() {
  const offlinePageRequest = new Request("/offline");

  fetch(offlinePageRequest).then(response => {
    const cachePromise = caches.open(CACHE);
    cachePromise.then(cache => {
      cache.put(offlinePageRequest, response);
    });
  });
}); 