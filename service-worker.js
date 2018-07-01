var data = ' '

    self.addEventListener( "install" , function (event) {
        console.log('Installing service worker.'); 
        event.waitUntil(
            cache.open('currency_convert_v1').then(cache =>{
            console.log('Caching app shell...');
                return cache.addAll(
                    [
                        "/index.html",
                	"/sw.js",
               	 	"/jquery.min.js",
                	"/bootstrap.css",
                	"/main.css",
                        '/js/converter.js',
                        '/image/images.png'
                    ]
                );
            }).catch( error => console.log('failed to cache: ' + error))
        );
    });


  self.addEventListener('activate', function(event) {
    console.log('service worker activated successfully');
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
             // console.log(cacheName);
            return cacheName.startsWith('Converter-') && currency_convert_v1 !== cacheName;
          }).map(function(cacheName) {
            if(currency_convert_v1 !== cacheName){
                return caches.delete(cacheName);
                //console.log(cacheName);
            }
          })
        );
      })
    );
  });
  

  self.addEventListener('fetch', function(event) {
    let requestUrl = new URL(event.request.url);
    
    // loading the index page from cache when wizard at on the browser.
    if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        caches.match(event.request).then(response => {
          if (response) {
            // respond with the index page skeleton in cache
             event.respondWith(caches.match('/index.html'));
             return;
          }
        });
      }
    }
   
    // responding to any other request on the page.
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      }).catch(error => {
        return error;
      })
    );

  });



