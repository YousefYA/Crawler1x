# selenium_scraper.py

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from colorama import Fore
import time
import os

class SeleniumScraper:
    def __init__(self, proxies, headless=True, driver_path='chromedriver'):
        chrome_options = Options()
        if headless:
            chrome_options.add_argument('--headless')
        chrome_options.add_argument(f'--proxy-server={proxies["http"]}')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')  # Overcome limited resource problems
        # Optional: specify the path to Chrome binary if not in default location
        # chrome_options.binary_location = '/path/to/chrome'
        self.driver = webdriver.Chrome(executable_path=driver_path, options=chrome_options)

    def scrape(self, url):
        try:
            print(Fore.CYAN + f"[*] Selenium scraping {url}")
            self.driver.get(url)
            time.sleep(5)  # Wait for JavaScript to load
            html_content = self.driver.page_source
            print(Fore.GREEN + f"[+] Selenium successfully scraped {url}")
            return html_content
        except Exception as e:
            print(Fore.RED + f"[-] Selenium error scraping {url}: {e}")
            return None

    def close(self):
        self.driver.quit()
