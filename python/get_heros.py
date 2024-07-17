import requests
from bs4 import BeautifulSoup
import json

url = "https://overwatch.blizzard.com/en-us/heroes/"

response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

hero_cards = soup.find_all("blz-hero-card", class_="heroCard")

list = []

for card in hero_cards:
    picture = card.find("blz-image")["src"]
    attributes = card.attrs
    title = attributes["data-hero-id"]
    role = attributes["data-role"]

    list.append(
        {
            "picture": picture,
            "title": title,
            "role": role
        }
    )
# Convert list to JSON
json_data = {}

for item in list:
    title = item["title"]
    json_data[title] = item

# Write JSON data to a file
with open("heroes.json", "w") as file:
    json.dump(json_data, file)