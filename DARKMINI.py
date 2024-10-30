import requests
import sys
import time
from colorama import init, Fore, Style

# Initialize colorama
init(autoreset=True)

# Define proxies to route through Tor
proxies = {
    'http': 'socks5h://127.0.0.1:9050',
    'https': 'socks5h://127.0.0.1:9050'
}

def type_out(text, delay=0.002):
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()  # For a new line

def print_banner():
    banner = """
 ··················································
:                                                :
:                                                :
:                                                :
:                                                :
:                                                :
:████████▄     ▄████████    ▄████████    ▄█   ▄█▄:
:███   ▀███   ███    ███   ███    ███   ███ ▄███▀:
:███    ███   ███    ███   ███    ███   ███▐██▀  :
:███    ███   ███    ███  ▄███▄▄▄▄██▀  ▄█████▀   :
:███    ███ ▀███████████ ▀▀███▀▀▀▀▀   ▀▀█████▄   :
:███    ███   ███    ███ ▀███████████   ███▐██▄  :
:███   ▄███   ███    ███   ███    ███   ███ ▀███▄:
:████████▀    ███    █▀    ███    ███   ███   ▀█▀:
:                          ███    ███   ▀        :
:   ▄▄▄▄███▄▄▄▄    ▄█  ███▄▄▄▄    ▄█             :
: ▄██▀▀▀███▀▀▀██▄ ███  ███▀▀▀██▄ ███             :
: ███   ███   ███ ███▌ ███   ███ ███▌            :
: ███   ███   ███ ███▌ ███   ███ ███▌            :
: ███   ███   ███ ███▌ ███   ███ ███▌            :
: ███   ███   ███ ███  ███   ███ ███             :
: ███   ███   ███ ███  ███   ███ ███             :
:  ▀█   ███   █▀  █▀    ▀█   █▀  █▀              :
:                                                :                                           :
:                                                :
··················································
"""
    type_out(Fore.GREEN + Style.BRIGHT + banner)

def check_tor_connection():
    try:
        print(Fore.CYAN + "[*] Checking Tor connection...")
        # Use an external service to get the current IP address
        ip_response = requests.get('https://api.ipify.org', proxies=proxies, timeout=10)
        tor_ip = ip_response.text.strip()
        print(Fore.GREEN + f'[+] Your current IP address through Tor is: {tor_ip}')

        # Access check.torproject.org to verify Tor connection
        response = requests.get('https://check.torproject.org/', proxies=proxies, timeout=10)
        if 'Congratulations. This browser is configured to use Tor' in response.text:
            print(Fore.GREEN + '[+] Successfully connected to the Tor network.')
        else:
            print(Fore.RED + '[-] Failed to connect to the Tor network.')
    except requests.exceptions.Timeout:
        print(Fore.RED + '[-] The request timed out. Please check your Tor connection.')
    except Exception as e:
        print(Fore.RED + f'[-] An error occurred: {e}')

if __name__ == "__main__":
    print_banner()
    time.sleep(1)  # Pause for dramatic effect
    check_tor_connection()
    try:
        while True:
            print(Fore.CYAN + "\n[*] Press any number to exit or Ctrl + C to terminate.")
            user_input = input()
            if user_input.isdigit():
                print(Fore.CYAN + "[*] Exiting TorConnect...")
                time.sleep(1)
                break
    except KeyboardInterrupt:
        print(Fore.CYAN + "\n[*] Exiting TorConnect...")
        time.sleep(1)
