import requests
from bs4 import BeautifulSoup


def scrape_website(url):
    """Fetches HTML from a given URL and extracts headings and links."""
    # Step 1: Send a request to the website using a Custom User-Agent header
    # Websites often block automated Python scripts, so we pretend to be a real web browser
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/115.0.0.0 Safari/537.36"
        )
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        # Check if the webpage loaded successfully (status code 200 means OK)
        response.raise_for_status()
    except Exception as e:
        return {"success": False, "error": str(e)}

    # Step 2: Parse raw HTML into a searchable BeautifulSoup object
    soup = BeautifulSoup(response.text, "html.parser")

    # Step 3: Extract structured data (headings h1, h2, h3 and links)
    items = []

    # Find all headings on the page
    headings = soup.find_all(["h1", "h2", "h3"])
    for tag in headings:
        text = tag.text.strip()
        if text:  # Ignore empty headings
            items.append(
                {"type": "Heading", "tag": tag.name.upper(), "content": text}
            )

    # Step 4: Return organized results
    return {"success": True, "url": url, "count": len(items), "data": items}


# Quick test run when executing scraper.py directly
if __name__ == "__main__":
    test_url = "https://example.com"
    print(f"Scraping {test_url}...")
    result = scrape_website(test_url)
    print("Results:", result)