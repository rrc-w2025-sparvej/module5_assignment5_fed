/*
  Sania Parvej
  Assignment 5 - City of Winnipeg Lane Closures
  Demonstrates: async/await, fetch(), SoQL, JSON parsing, DOM updates
*/

const APP_TOKEN = "2ll31e9kyqhsy7zuoxxlqh1oyn22li9c2te2wwn8oosm0my5qa";

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

    // Fetch data asynchronously from the City of Winnipeg Open Data API
    const data = await fetchLaneClosures(streetName);
    
    // Display the results in the HTML table
    displayResults(data, tableBody, statusText);
  });

  async function fetchLaneClosures(streetName) {
    try {
      const apiUrl =
        `https://data.winnipeg.ca/resource/h367-iifg.json` +
        `?$$app_token=${APP_TOKEN}` +
        `&$where=lower(street_name) like lower('%${streetName}%')` +
        `&$order=start_date DESC` +
        `&$limit=50`;

      const encodedURL = encodeURI(apiUrl);
      const response = await fetch(encodedURL);

      // Check for response errors
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      // Parse JSON response into an array of objects
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function displayResults(data, tbody, statusEl) {
    tbody.innerHTML = "";

    if (!data.length) {
      statusEl.textContent = "No lane closures found.";
      return;
    }

    statusEl.textContent = "";

    data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.street_name || "N/A"}</td>
        <td>${item.closure_type || "N/A"}</td>
        <td>${item.reason || "N/A"}</td>
        <td>${item.start_date || "N/A"}</td>
        <td>${item.end_date || "N/A"}</td>
      `;
      tbody.appendChild(tr);
    });
  }
});
