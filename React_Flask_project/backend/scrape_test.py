import requests
from bs4 import BeautifulSoup
import json


URL = "https://daip.uvt.ro/anunt-afisare-rezultate-selectie-grup-tinta-pentru-program-de-formare-a-formatorilor-in-domeniul-curricular-pentru-personalul-didctic-si-nedidactic-din-serviciile-de-educatie-timpurie-pnrr-2024-c15-me/"  # pagina cu carduri

headers = {
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(URL, headers=headers)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

# toate cardurile
cards = soup.find_all("article", class_="elementor-post")

print(f"Gasite {len(cards)} carduri")

evenimente = []

for card in cards:
    # TITLU + LINK
    title_tag = card.select_one("h3.elementor-post__title a")
    title = title_tag.get_text(strip=True)
    link = title_tag["href"]

    # DATA
    date_tag = card.select_one("span.elementor-post-date")
    date = date_tag.get_text(strip=True) if date_tag else None

    # IMAGINE
    img_tag = card.select_one(".elementor-post__thumbnail img")
    image = img_tag["src"] if img_tag else None

    evenimente.append({
        "title": title,
        "link": link,
        "date": date,
        "image": image,
    })

# test
for n in evenimente[:2]:
    print(n)


def get_post_content(url):
    html = requests.get(url, headers=headers).text
    soup = BeautifulSoup(html, "html.parser")

    content_div = soup.select_one(
        ".elementor-widget-theme-post-content, .entry-content"
    )

    return str(content_div) if content_div else ""


for item in evenimente:
    print(f"Scraping: {item['title']}")
    item["content"] = get_post_content(item["link"])

with open("formarea-profesionistilor.json", "w", encoding="utf-8") as f:
    json.dump(evenimente, f, ensure_ascii=False, indent=2)

print("✔ formarea-profesionistilor.json creat")

