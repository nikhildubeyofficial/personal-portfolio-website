// Dark Mode Toggle
const darkMode = document.getElementById("darkmode");
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("active");
}

darkMode.addEventListener("click", () => {
  body.classList.toggle("active");
  
  if (body.classList.contains("active")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", null);
  }
});

// Header Scroll Effect
let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

// Contact Form Handling
function handleSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitButton = form.querySelector('input[type="submit"]');
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Basic validation
  if (!name || !email || !message) {
    showStatus('Please fill in all fields', 'error');
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showStatus('Please enter a valid email address', 'error');
    return false;
  }
  
  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitButton.value = 'Sending...';
  
  // Prepare template parameters
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };
  
  // Send email using EmailJS
  emailjs.send('service_o03j9f8', 'template_9ujr9yh', templateParams)
    .then(function(response) {
      showStatus('Message sent successfully!', 'success');
      form.reset();
    }, function(error) {
      showStatus('Failed to send message. Please try again.', 'error');
    })
    .finally(function() {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.value = 'Send';
    });
  
  return false;
}

function showStatus(message, type) {
  const status = document.getElementById('form-status');
  status.textContent = message;
  status.className = 'form-status ' + type;
  
  // Hide status message after 5 seconds
  setTimeout(() => {
    status.className = 'form-status';
  }, 5000);
}
