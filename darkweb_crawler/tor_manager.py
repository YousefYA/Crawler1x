# tor_manager.py

import requests
from stem import Signal
from stem.control import Controller
from colorama import Fore

class TorManager:
    def __init__(self, tor_host='127.0.0.1', tor_port=9050, control_port=9051, password=None):
        self.proxies = {
            'http': f'socks5h://{tor_host}:{tor_port}',
            'https': f'socks5h://{tor_host}:{tor_port}'
        }
        self.control_port = control_port
        self.password = password

    def renew_identity(self):
        """Renew Tor identity to get a new IP."""
        try:
            with Controller.from_port(port=self.control_port) as controller:
                controller.authenticate(password=self.password)
                controller.signal(Signal.NEWNYM)
            print(Fore.YELLOW + "[*] Tor identity renewed.")
        except Exception as e:
            print(Fore.RED + f"[-] Failed to renew Tor identity: {e}")

    def get_proxies(self):
        """Return proxies for requests."""
        return self.proxies

    def check_connection(self):
        """Check if Tor is connected properly."""
        try:
            print(Fore.CYAN + "[*] Checking Tor connection...")
            ip_response = requests.get('https://api.ipify.org', proxies=self.proxies, timeout=10)
            tor_ip = ip_response.text.strip()
            print(Fore.GREEN + f'[+] Your current IP address through Tor is: {tor_ip}')

            response = requests.get('https://check.torproject.org/', proxies=self.proxies, timeout=10)
            if 'Congratulations. This browser is configured to use Tor' in response.text:
                print(Fore.GREEN + '[+] Successfully connected to the Tor network.')
                return True
            else:
                print(Fore.RED + '[-] Failed to connect to the Tor network.')
                return False
        except requests.exceptions.Timeout:
            print(Fore.RED + '[-] The request timed out. Please check your Tor connection.')
            return False
        except Exception as e:
            print(Fore.RED + f'[-] An error occurred: {e}')
            return False
