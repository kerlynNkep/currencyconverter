self.addEventListener( "install" , function (event) { 
    console.log('Installing service worker.'); 
    event.waitUntil(
        caches.open('currency_convert_v1').then(cache => {
                console.log('Caching app shell...');
                return cache.addAll(
                    [
                        "/",
                        "/index.html",
                        "/css/bootstrap.min.css",
                        "/css/bootstrap.min.css.map",
                        "/css/main.css",
                        "/js/jquery.min.js",
                        "/js/bootstrap.js",
                        "/js/bootstrap.min.js",
                        "/js/bootstrap.js.map",
                        "/js/bootstrap.min.js.map",
                        "/js/main.js",
                        "/js/converter.js",
                        "/js/idb.js",
                        "/images/images.png"
                    ]
                );
            }).catch( error => console.log('failed to cache: ' + error))
        );
    });

self.addEventListener('fetch', function(event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request.url).then(function(response) {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request.url) 
      }).catch(function(error) {
  
        // Respond with custom offline page
  
      })
    );
  });