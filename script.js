const btn = document.getElementById('submit'); // Get the submit button

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

  // Send POST request with fetch
  fetch('https://insta-backend-lime-six.vercel.app/api/sendMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // Send form data as JSON
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
