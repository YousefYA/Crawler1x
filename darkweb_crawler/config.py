# config.py

# Tor Configuration
TOR_HOST = '127.0.0.1'
TOR_PORT = 9050
CONTROL_PORT = 9051
TOR_PASSWORD = None  # Set this if your Tor control port requires authentication

# Crawler Settings
MAX_DEPTH = 2
DELAY = 2  # Seconds between requests

# Data Storage
SAVE_DIR = 'scraped_data'
LOG_FILE = 'crawler.log'

# Seed URLs (Replace with actual .onion URLs you wish to crawl)
SEED_URLS = [
    'http://check.torproject.org',  # Replace with actual onion URLs
    'http://darknewqhjrjdoru2pos7nw7qvskhfk343l434bjtj5z6nqy4sck3bid.onion'
]
