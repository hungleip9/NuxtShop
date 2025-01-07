importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
function fetchAndParseJson(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching JSON:', error);
      throw error;
    });
}
fetchAndParseJson("/config-firebse.json").then(firebaseConfig => {
  // firebase
  firebase.initializeApp(firebaseConfig);
  firebase.messaging()
})
