# Debugging Analysis – City of Winnipeg Lane Closures
Author: Sania Parvej
Date: November 1, 2025

## Breakpoint 1
line 45: const encodedURL = encodeURI(apiUrl);

Why here?
This is where the URL for the API request is built. Stopping here lets me verify that the query string and street name were constructed correctly before sending the request.

Observations:
- The apiUrl variable contains the expected base URL and query parameters.

After stepping over this line:
- The encodedURL variable correctly encodes special characters in the URL.

## Breakpoint 2
line 52: const data = await response.json();

Why here?
This is where the raw API response is converted into a JavaScript object. Stopping here ensures the response is valid and contains expected data.

Observations:
- response.ok = true

After stepping over this line:
- data is now an Array.

## Breakpoint 3

line 82: tbody.appendChild(tr);

Why here?
This is where each row is added to the results table. It confirms that the DOM is being updated with live data from the API.

Observations:
- item.primary_street and item.cross_street contain valid street names.

After stepping over this line:
- The row appears in the table (<tbody> section updates).

## Critical Analysis (BREAKPOINT 2)

Reason for choosing:
This point confirms that API communication and JSON parsing work correctly — the core logic of the app.
