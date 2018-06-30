
self.addEventListener('install', event => {
    console.log('service worker installing ...');
    event.waitUntil(
        cache.open('currency_convert_v1').then(cache =>{
            console.log('Caching app shell...');
            return cache.allAll([
                "/currency_converter/",
                "/index.html",
                "/"
            ])
        })
    )
})