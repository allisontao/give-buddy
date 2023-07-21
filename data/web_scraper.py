import time
from bs4 import BeautifulSoup, Comment
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import csv

driver = webdriver.Chrome()
res = []

def remove_scripts(soup):
    for script in soup.find_all("script"):
        script.extract()

    for element in soup(text=lambda text: isinstance(text, Comment)):
        element.extract()

    for tag in soup.recursiveChildGenerator():
        if isinstance(tag, Comment):
            tag.extract()

    return soup

def scrape_charity_info(charity_pages):
    charity_id = 0
    # for each charity page
    for charity in charity_pages:
        charity_info = {}
        
        driver.get(charity)
        
        soup = BeautifulSoup(driver.page_source, "html.parser")
        soup = remove_scripts(soup)

        try:
            rating = soup.find("span", class_="rating_stars").text.strip()
            slash_index = rating.rfind("/")
            star = int(rating[slash_index - 1])
            
            # only get charities with a 4 star rating or higher
            if star < 4:
                continue
            
            # create dictionary of charity info
            charity_id += 1
            charity_info["id"] = charity_id
            charity_info["charity_name"] = soup.find("h1", class_="sppb-addon-title").text.strip()
            charity_info["logo"] = soup.find("div", id="logo").find("img").get("src")
            charity_info["rating"] = star
            charity_info["address"] = soup.find("div", id="sppb-addon-1548963496069").find("br").next_sibling.strip()
            charity_info["category"] = soup.find("div", id="sppb-addon-1551725103589").find("a").text.strip()
            charity_info["financial_transparency"]= soup.find("h3", text="FINANCIAL TRANSPARENCY").find_previous_sibling("div").text.strip()
            charity_info["results_reporting"] = soup.find("h3", text="RESULTS REPORTING").find_previous_sibling("div").text.strip()
            charity_info["cents_to_cause"] = soup.find("h3", text="CENTS TO THE CAUSE").find_previous_sibling("div").text.strip()
            charity_info["overview"] = soup.find("div", id="sppb-addon-1549915418046").text.strip()
            charity_info["results_and_impact"] = soup.find("div", id="sppb-addon-1549916615776").text.strip()
            charity_info["contact"] = soup.find("h3", text="Charity Contact").find_next_sibling("div").text.strip()
        except:
            continue
        
        # add charity info dictionary to list
        res.append(charity_info)

def main():
    base_url = "https://www.charityintelligence.ca/charity-profiles/a-z-charity-listing"
    driver.get(base_url)

    start = 0
    charity_pages = []
    
    # keep scraping until 820 charities which is the max
    while start <= 820:
        if start == 0:
            page_url = f"{base_url}?prefix="
        else:
            page_url = f"{base_url}?start={start}"
        
        driver.get(page_url)
        
        # get links to each charity page
        charity_list = driver.find_element_by_xpath(" //ul[contains(@class, 'alpha_records charity_list')]")
        for charity in charity_list.find_elements_by_xpath("//a[contains(@class, 'title lnk')]"):
            charity_url = charity.get_attribute('href')
            charity_pages.append(charity_url)
        start += 20
        
    scrape_charity_info(charity_pages)
    
    driver.quit()
    
    keys = res[0].keys()

    with open('raw_data.csv', 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(res)

if __name__ == "__main__":
    main()
