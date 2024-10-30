# crawler.py

from collections import deque
from bs4 import BeautifulSoup
from colorama import Fore
import time

class Crawler:
    def __init__(self, scraper, max_depth=2, delay=2):
        self.scraper = scraper
        self.max_depth = max_depth
        self.delay = delay
        self.crawl_queue = deque()
        self.visited = set()

    def add_seed(self, urls):
        for url in urls:
            self.crawl_queue.append((url, 1))

    def extract_links(self, html_content, base_url):
        soup = BeautifulSoup(html_content, 'html.parser')
        links = set()
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            if href.startswith('/'):
                href = f"{base_url.rstrip('/')}{href}"
            elif href.startswith('http') or href.startswith('https'):
                pass  # Absolute URL
            else:
                href = f"{base_url.rstrip('/')}/{href}"
            if '.onion' in href:
                # Remove fragment identifiers and query parameters for consistency
                href = href.split('#')[0].split('?')[0]
                links.add(href)
        return links

    def crawl(self):
        while self.crawl_queue:
            current_url, depth = self.crawl_queue.popleft()
            if current_url in self.visited:
                continue
            if depth > self.max_depth:
                continue
            self.visited.add(current_url)
            print(Fore.BLUE + f"[*] Crawling: {current_url} at depth {depth}")
            html_content = self.scraper.scrape(current_url)
            if html_content:
                links = self.extract_links(html_content, current_url)
                for link in links:
                    if link not in self.visited:
                        self.crawl_queue.append((link, depth + 1))
            time.sleep(self.delay)
