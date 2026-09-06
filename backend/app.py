from flask import Flask, jsonify, request
from flask_cors import CORS
from scraper import scrape_website

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing)
# This permits frontend browsers to communicate with our backend API
CORS(app)


@app.route("/api/scrape", methods=["POST"])
def scrape_endpoint():
    """API endpoint to handle web scraping requests."""
    # Step 1: Extract JSON data sent from the request
    data = request.get_json()

    # Step 2: Validate that a URL was provided
    if not data or "url" not in data:
        return jsonify(
            {"success": False, "error": "URL parameter is required"}
        ), 400

    target_url = data["url"]

    # Step 3: Run our scraper function from scraper.py
    result = scrape_website(target_url)

    # Step 4: Return the result as a JSON response
    if result.get("success"):
        return jsonify(result), 200
    else:
        return jsonify(result), 500


if __name__ == "__main__":
    # Start the Flask development server on port 5000
    print("Starting Flask server on http://127.0.0.1:5000...")
    app.run(debug=True, port=5000)