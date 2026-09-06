// Wait until the HTML document is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements from index.html
    const scrapeBtn = document.getElementById("scrapeBtn");
    const urlInput = document.getElementById("urlInput");
    const statusMessage = document.getElementById("statusMessage");
    const resultsSection = document.getElementById("resultsSection");
    const resultsBody = document.getElementById("resultsBody");
    const itemCount = document.getElementById("itemCount");

    // Backend Flask API base URL
    const API_URL = "http://127.0.0.1:5000/api/scrape";

    // Attach click event listener to the "Scrape Website" button
    scrapeBtn.addEventListener("click", async () => {
        const url = urlInput.value.trim();

        // Step 1: Input Validation
        if (!url) {
            showStatus("Please enter a valid website URL (e.g., https://example.com)", "error");
            return;
        }

        // Step 2: Set Loading State
        showStatus("Fetching and analyzing website content...", "loading");
        scrapeBtn.disabled = true;
        resultsSection.classList.add("hidden");
        resultsBody.innerHTML = "";

        try {
            // Step 3: Send POST request to Flask Backend
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: url })
            });

            const data = await response.json();

            // Step 4: Handle Backend Response
            if (response.ok && data.success) {
                if (data.data.length === 0) {
                    showStatus("Scrape completed, but no headings were found on this page.", "success");
                } else {
                    showStatus("Scrape completed successfully!", "success");
                    displayResults(data.data);
                }
            } else {
                showStatus(`Error: ${data.error || "Failed to scrape target website"}`, "error");
            }
        } catch (error) {
            // Handle Network Errors (e.g., Flask server is not running)
            showStatus("Network Error: Could not connect to Flask server. Make sure app.py is running on port 5000.", "error");
            console.error("Fetch Error:", error);
        } finally {
            // Reset Button State
            scrapeBtn.disabled = false;
        }
    });

    // Helper Function: Displays Status Banner Messages
    function showStatus(text, type) {
        statusMessage.textContent = text;
        statusMessage.className = `status-message ${type}`;
        statusMessage.classList.remove("hidden");
    }

    // Helper Function: Renders Extracted Headings into HTML Table Rows
    function displayResults(items) {
        resultsBody.innerHTML = ""; // Clear old results

        items.forEach((item) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><strong>${item.type}</strong></td>
                <td><code>${item.tag}</code></td>
                <td>${escapeHtml(item.content)}</td>
            `;

            resultsBody.appendChild(row);
        });

        itemCount.textContent = `${items.length} items found`;
        resultsSection.classList.remove("hidden");
    }

    // Helper Function: Escape raw HTML text to prevent layout breaks
    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
});