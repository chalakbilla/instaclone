// Your code goes here
const btn = document.getElementById('submit'); // Get the submit button

document.getElementById('form') // Assuming the form has the id 'form'
  .addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    btn.value = 'Sending...'; // Change the button text to indicate sending

    const serviceID = 'default_service'; // Your EmailJS service ID
    const templateID = 'template_arm57ry'; // Your EmailJS template ID

    // Use emailjs.sendForm() to send the form data
    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email'; // Reset button text after successful submission
        alert('Sent!'); // Show success alert
      }, (err) => {
        btn.value = 'Send Email'; // Reset button text in case of an error
        alert(JSON.stringify(err)); // Show error alert
      });
});
