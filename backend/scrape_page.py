import requests
from bs4 import BeautifulSoup
import json

def scrape_full_elementor_content(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print("Eroare la request:", e)
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    # Găsim div-ul principal Elementor
    main_container = soup.find(
        "div",
        attrs={"data-elementor-type": "wp-page"}
    )

    if not main_container:
        print("Nu s-a găsit containerul Elementor.")
        return None

    # Extragem titlul real al paginii
    title_tag = soup.find("h1")
    title = title_tag.get_text(strip=True) if title_tag else ""

    # Luăm HTML-ul exact, cu tot cu imagini, clase, stiluri
    full_html_content = str(main_container)

    data = {
        "url": url,
        "title": title,
        "content_html": full_html_content
    }

    return data


if __name__ == "__main__":
    target_url = "https://daip.uvt.ro/arhiva-selectie-echipe-proiecte/"

    result = scrape_full_elementor_content(target_url)

    if result:
        with open("arhiva-selectie-echipe-proiecte.json", "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)

        print("✔ Conținut complet salvat cu structură intactă.")
