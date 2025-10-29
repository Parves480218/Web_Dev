// index.js
// Author: Ville Heikkiniemi
// Date: 2025-10-06
// Handles registration form submission with validation

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addCourseForm");
  const tableBody = document.querySelector("#timetable tbody");
  const errorDiv = document.getElementById("errorMessages");
  const timestampInput = document.getElementById("timestamp");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    errorDiv.innerHTML = "";
    let errors = [];

    // Auto-fill timestamp
    const timestamp = new Date().toLocaleString();
    timestampInput.value = timestamp;

    // Get form values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birthDate = document.getElementById("birthDate").value;
    const terms = document.getElementById("terms").checked;

    // Validation rules
    if(fullName.length < 3) errors.push("Full Name must be at least 3 characters.");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please enter a valid email address.");
    if(!/^\+?\d{7,15}$/.test(phone)) errors.push("Phone number must contain 7-15 digits.");
    if(!birthDate) errors.push("Birth Date is required.");
    if(!terms) errors.push("You must accept the terms.");

    // Show errors if any
    if(errors.length > 0) {
      errorDiv.innerHTML = errors.map(err => `<p style="color:red;">${err}</p>`).join("");
      return;
    }

    // Append new row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${timestamp}</td>
      <td>${fullName}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${birthDate}</td>
      <td>${terms ? "Yes" : "No"}</td>
    `;
    tableBody.appendChild(newRow);

    // Reset form
    form.reset();
  });
});
