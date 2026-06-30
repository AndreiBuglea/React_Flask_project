from bs4 import BeautifulSoup
import json

with open("anunturi_scrape.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

data = []

table = soup.find("table")

if table:
    rows = table.find_all("tr")

    headers = [th.text.strip() for th in rows[0].find_all(["th", "td"])]

    for row in rows[1:]:
        cols = row.find_all("td")
        if not cols:
            continue

        row_data = {}
        for i in range(len(cols)):
            text = cols[i].text.strip()

            link = cols[i].find("a")
            if link and link.get("href"):
                row_data[headers[i]] = {
                    "text": text,
                    "link": link["href"]
                }
            else:
                row_data[headers[i]] = text

        data.append(row_data)

with open("anunturi.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("Gata. Datele sunt salvate în anunturi.json")
