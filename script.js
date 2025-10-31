/*
  Sania Parvej
  Assignment 5 - City of Winnipeg Lane Closures
  Demonstrates: async/await, fetch(), SoQL, JSON parsing, DOM updates
*/



document.addEventListener("DOMContentLoaded", () => {

  // Cache key DOM elements
  const form = document.getElementById("searchForm");
  const input = document.getElementById("streetInput");
  const tableBody = document.querySelector("#resultsTable tbody");
  const statusText = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const streetName = input.value.trim();

    if (!streetName) {
      statusText.textContent = "Please enter a street name.";
      return;
    }

    statusText.textContent = "Loading...";


});


