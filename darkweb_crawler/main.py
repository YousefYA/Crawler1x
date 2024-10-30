# main.py

from tor_manager import TorManager
from scraper import Scraper
from crawler import Crawler
from selenium_scraper import SeleniumScraper
from utils import setup_logging, log_info, log_error
from config import (
    TOR_HOST, TOR_PORT, CONTROL_PORT, TOR_PASSWORD,
    MAX_DEPTH, DELAY, SAVE_DIR, LOG_FILE,
    SEED_URLS
)
import time

def main():
    # Setup logging
    setup_logging(LOG_FILE)
    log_info("Crawler started.")

    # Initialize Tor Manager
    tor = TorManager(tor_host=TOR_HOST, tor_port=TOR_PORT,
                    control_port=CONTROL_PORT, password=TOR_PASSWORD)
    if not tor.check_connection():
        log_error("Tor connection failed. Exiting.")
        return
    proxies = tor.get_proxies()

    # Initialize Selenium Scraper (optional)
    # Ensure ChromeDriver is installed and path is correct
    driver_path = 'chromedriver'  # Update path if necessary
    use_selenium = False  # Set to True to enable Selenium
    selenium_scraper = None
    if use_selenium:
        selenium_scraper = SeleniumScraper(proxies=proxies, driver_path=driver_path)

    # Initialize Scraper
    scraper = Scraper(proxies=proxies, save_dir=SAVE_DIR, use_selenium=use_selenium, selenium_scraper=selenium_scraper)

    # Initialize Crawler
    crawler = Crawler(scraper=scraper, max_depth=MAX_DEPTH, delay=DELAY)
    crawler.add_seed(SEED_URLS)

    try:
        crawler.crawl()
    except Exception as e:
        log_error(f"An unexpected error occurred: {e}")
    finally:
        if selenium_scraper:
            selenium_scraper.close()
        log_info("Crawler finished.")

if __name__ == "__main__":
    main()
