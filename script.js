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

    // Fetch data asynchronously from the City of Winnipeg Open Data API
    const data = await fetchLaneClosures(streetName);
    
    // Display the results in the HTML table
    displayResults(data, tableBody, statusText);
  });

  const APP_TOKEN = "2ll31e9kyqhsy7zuoxxlqh1oyn22li9c2te2wwn8oosm0my5qa";

  async function fetchLaneClosures(streetName) {
    try {
      const apiUrl =
        `https://data.winnipeg.ca/resource/h367-iifg.json` +
        `?$where=lower(primary_street) like lower('%${streetName}%')` +
        `&$order=date_closed_from DESC` +
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

    statusEl.textContent = `Found ${data.length} closure(s).`;

    // Loop through and display each record
    data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.primary_street || "N/A"}</td>
        <td>${item.cross_street || "N/A"}</td>
        <td>${item.traffic_effect || "N/A"}</td>
        <td>${item.date_closed_from || "N/A"}</td>
        <td>${item.date_closed_to || "N/A"}</td>
      `;
      tbody.appendChild(tr);
    });
  }
});