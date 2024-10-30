# scraper.py

import requests
from bs4 import BeautifulSoup
from colorama import Fore
import json
import os
import time
from urllib.robotparser import RobotFileParser
from tenacity import retry, stop_after_attempt, wait_fixed

class Scraper:
    def __init__(self, proxies, save_dir='scraped_data', use_selenium=False, selenium_scraper=None):
        # Get the absolute path of the current script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        self.save_dir = os.path.join(script_dir, save_dir)
        
        # Ensure the save directory exists
        if not os.path.exists(self.save_dir):
            try:
                os.makedirs(self.save_dir)
                print(Fore.GREEN + f"[+] Created directory: {self.save_dir}")
            except Exception as e:
                print(Fore.RED + f"[-] Failed to create directory {self.save_dir}: {e}")
        
        self.proxies = proxies
        self.use_selenium = use_selenium
        self.selenium_scraper = selenium_scraper

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    def fetch_content(self, url):
        try:
            response = requests.get(url, proxies=self.proxies, timeout=10)
            response.raise_for_status()
            print(Fore.GREEN + f"[+] Successfully fetched content from {url}")
            return response.text
        except Exception as e:
            print(Fore.RED + f"[-] Error fetching {url}: {e}")
            raise e

    def fetch_robots_txt(self, url):
        robots_url = f"{url.rstrip('/')}/robots.txt"
        try:
            response = requests.get(robots_url, proxies=self.proxies, timeout=10)
            if response.status_code == 200:
                print(Fore.GREEN + f"[+] robots.txt found at {robots_url}")
                return response.text
            else:
                print(Fore.YELLOW + f"[-] robots.txt not found at {robots_url} (Status Code: {response.status_code})")
                return None
        except Exception as e:
            print(Fore.RED + f"[-] Error fetching robots.txt from {url}: {e}")
            return None

    def extract_metadata(self, html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        title = soup.title.string.strip() if soup.title else 'No Title'
        meta_tags = {}
        for meta in soup.find_all('meta'):
            if meta.get('name') and meta.get('content'):
                meta_tags[meta.get('name').lower()] = meta.get('content')
        return title, meta_tags

    def save_data(self, url, robots_txt, html_content, title, meta_tags):
        # Create a safe filename by replacing problematic characters
        safe_url = url.replace('http://', '').replace('https://', '').replace('/', '_').replace(':', '')
        filename = f"{safe_url}.json"
        file_path = os.path.join(self.save_dir, filename)
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump({
                    'url': url,
                    'robots_txt': robots_txt,
                    'title': title,
                    'meta_tags': meta_tags,
                    'content': html_content
                }, f, indent=4)
            print(Fore.GREEN + f"[+] Data saved to {file_path}")
        except Exception as e:
            print(Fore.RED + f"[-] Failed to save data for {url}: {e}")

    def is_allowed(self, url, user_agent='*'):
        rp = RobotFileParser()
        robots_url = f"{url.rstrip('/')}/robots.txt"
        rp.set_url(robots_url)
        try:
            rp.read()
            return rp.can_fetch(user_agent, url)
        except:
            # If robots.txt cannot be fetched, decide on policy (allow or disallow)
            return True

    def scrape(self, url):
        if not self.is_allowed(url):
            print(Fore.YELLOW + f"[-] Crawling disallowed by robots.txt for {url}")
            return None

        robots_txt = self.fetch_robots_txt(url)
        html_content = self.fetch_content(url)

        if not html_content and self.use_selenium and self.selenium_scraper:
            print(Fore.YELLOW + f"[*] Falling back to Selenium for {url}")
            html_content = self.selenium_scraper.scrape(url)

        if html_content:
            title, meta_tags = self.extract_metadata(html_content)
            self.save_data(url, robots_txt, html_content, title, meta_tags)
            return html_content
        return None
