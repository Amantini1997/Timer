if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(registration => {
      // Success
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      // Failure
      console.error('ServiceWorker registration failed: ', err);
  });
}