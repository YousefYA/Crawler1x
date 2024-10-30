# utils.py

import logging
import os

def setup_logging(log_file='crawler.log'):
    # Get the absolute path of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    log_path = os.path.join(script_dir, log_file)
    
    # Ensure the log directory exists
    log_dir = os.path.dirname(log_path)
    if not os.path.exists(log_dir):
        try:
            os.makedirs(log_dir)
            print(f"[+] Created log directory: {log_dir}")
        except Exception as e:
            print(f"[-] Failed to create log directory {log_dir}: {e}")
    
    logging.basicConfig(
        filename=log_path,
        filemode='a',
        format='%(asctime)s - %(levelname)s - %(message)s',
        level=logging.INFO
    )
    
    # Also log to console
    console = logging.StreamHandler()
    console.setLevel(logging.INFO)
    formatter = logging.Formatter('%(levelname)s - %(message)s')
    console.setFormatter(formatter)
    logging.getLogger('').addHandler(console)

def log_info(message):
    logging.info(message)

def log_error(message):
    logging.error(message)
