var wakeLock = null;
  
async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Screen Locked');
  } catch (err) {
    console.log(`${err.name}, ${err.message}`);
  }
}

function releaseWakeLock() {
    wakeLock.release();
    wakeLock = null;
    console.log('Screen Unlocked');
}

requestWakeLock();