# 🔍 Web Scraper Studio

A full-stack web scraping application built with Python (Flask, BeautifulSoup) and modern JavaScript.

## 📁 Project Structure

```text
web_scraper/
│
├── backend/
│   ├── data/
│   ├── app.py
│   ├── scraper.py
│   └── requirements.txt
│
└── frontend/
    ├── index.html
    ├── style.css
    └── app.js


    How to Run
1. Start the Flask Backend Server
Bash
cd backend
python -m venv venv
# Activate virtual environment:
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py
Backend runs on: http://127.0.0.1:5000

2. Start the Frontend HTTP Server
Open a new terminal window:

Bash
cd frontend
python -m http.server 8000
Frontend interface runs on: http://localhost:8000