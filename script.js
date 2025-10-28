const form = document.getElementById("purchaseForm");
const livePreview = document.getElementById("livePreview");
const successScreen = document.getElementById("successScreen");
const confettiCanvas = document.getElementById("confettiCanvas");
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwtMxTjHv8vDNfZeeoDl92i2lFeEivlvmZwIjkuxUBylhjIzInYN6gyXqS2qwAQ9aCLCQ/exec";

// Initialize confetti
const confettiSettings = { target: confettiCanvas, max: 200, size: 2, animate: true, props: ['circle','square','triangle'], colors:[[106,17,203],[37,117,252],[255,255,255]] };
const confetti = new ConfettiGenerator(confettiSettings);

// Update live preview dynamically
form.addEventListener("input", () => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  livePreview.textContent = JSON.stringify(data, null, 2);
});

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    form.style.display = "none";
    successScreen.classList.remove("hidden");
    confetti.render();
  } catch (error) {
    alert("Error submitting form. Please try again.");
    console.error(error);
  }
});

function closeSuccess() {
  successScreen.classList.add("hidden");
  form.reset();
  form.style.display = "block";
  confetti.clear();
}
