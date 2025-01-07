self.onmessage = function (e) {
  const intervalTime = e.data.interval || 1000;
  setInterval(() => {
    // Gửi dữ liệu lên main thread
    self.postMessage('Interval triggered');
  }, intervalTime);
};