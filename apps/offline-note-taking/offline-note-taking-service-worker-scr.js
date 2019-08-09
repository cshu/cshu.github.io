self.addEventListener('install',function(e){
	e.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll(['/','index.htm','offline-note-taking.png']);
		})
	);
});
self.addEventListener('fetch',function(e) {
	event.responseWith(
		caches.match(e.request).then(function(resp){
			return resp || fetch(e.request);
		});
	);
});
