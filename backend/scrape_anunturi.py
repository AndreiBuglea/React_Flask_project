import requests
from bs4 import BeautifulSoup

# URL-ul paginii pe care vrei să o scrapezi
URL = "https://daip.uvt.ro/anunturi-selectie-echipe-proiecte/"

# Numele fișierului HTML în care salvăm conținutul
OUTPUT_FILE = "anunturi_selectie.html"

def scrape_page(url):
    # Cerere HTTP
    res = requests.get(url)
    if res.status_code != 200:
        raise Exception(f"Eroare la încărcarea paginii: {res.status_code}")
    
    # Parsăm HTML-ul
    soup = BeautifulSoup(res.text, "html.parser")

    # Eliminăm header și footer dacă există
    if soup.header:
        soup.header.decompose()
    if soup.footer:
        soup.footer.decompose()

    # Extragem doar conținutul principal
    # Ajustează selectorul după structura site-ului
    main_content = soup.find("main")  # sau div cu clasa principală
    if not main_content:
        main_content = soup.body  # fallback la tot body-ul

    # Salvăm într-un fișier HTML
    html_template = f"""
    <!DOCTYPE html>
    <html lang="ro">
    <head>
        <meta charset="UTF-8">
        <title>Anunțuri</title>
    </head>
    <body>
        {str(main_content)}
    </body>
    </html>
    """

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(html_template)

    print(f"Conținutul paginii a fost salvat în {OUTPUT_FILE}")

if __name__ == "__main__":
    scrape_page(URL)
