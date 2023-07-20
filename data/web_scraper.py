import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()

def scrape_charity_info(charity_url):
    # Function to scrape information from the charity page
    driver.get(charity_url)
    # Add your scraping logic here using BeautifulSoup
    # Example:
    # soup = BeautifulSoup(driver.page_source, 'html.parser')
    # charity_name = soup.find('h1', class_='charity-name').text.strip()
    # charity_description = soup.find('div', class_='charity-description').text.strip()
    # ... and so on

def main():
    base_url = "https://www.charityintelligence.ca/charity-profiles/a-z-charity-listing"  # Replace with the base URL of your website
    driver.get(base_url)

    # Add code to navigate through pagination if applicable
    # Example:
    start = 0
    # while start <= 820:
    if start == 0:
        page_url = f"{base_url}?prefix="
    else:
        page_url = f"{base_url}?start={start}"
    
    driver.get(page_url)
    # get link to each charity from list of charities
    list = driver.find_element_by_xpath(" //ul[contains(@class, 'alpha_records charity_list')]")
    for charity in list.find_elements_by_xpath("//a[contains(@class, 'title lnk')]"):
        charity_url = charity.get_attribute('href')
        print(charity_url)
        scrape_charity_info(charity_url)

    #     # Add code to scrape information from the list page
    #     # Example:
    #     # charities = driver.find_elements_by_css_selector('.charity-list-item')
    #     # for charity in charities:
    #     #     charity_url = charity.get_attribute('href')
    #     #     scrape_charity_info(charity_url)

    #     # Add code to navigate to the next page if applicable
    #     # Example:
    #     # next_page_btn = driver.find_element_by_css_selector('.pagination-next')
    #     # if next_page_btn.is_enabled():
    #     #     next_page_btn.click()
    #     #     page += 20
    #     # else:
    #     #     break

    # Quit the driver when done
    driver.quit()

if __name__ == "__main__":
    main()
