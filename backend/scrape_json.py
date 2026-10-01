
from bs4 import BeautifulSoup
import json
import time


# ============================================================
# CITIRE HTML
# ============================================================

with open("anunturi_selectie.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")


data = []

table = soup.find("table")

if not table:
    print("Eroare: nu a fost găsit tabelul în HTML.")
    exit()


# ============================================================
# PARCURGEREA RÂNDURILOR
# ============================================================

tbody = table.find("tbody")

if not tbody:
    print("Eroare: tabelul nu conține <tbody>.")
    exit()


rows = tbody.find_all("tr", recursive=False)


for row in rows:

    cols = row.find_all("td", recursive=False)

    # Ignorăm rândurile care nu au cele 6 coloane
    if len(cols) < 6:
        continue


    # --------------------------------------------------------
    # 1. ID PROIECT
    # --------------------------------------------------------

    id_proiect = cols[0].get_text(" ", strip=True)


    # --------------------------------------------------------
    # 2. PROGRAM
    # --------------------------------------------------------

    program = cols[1].get_text(" ", strip=True)


    # --------------------------------------------------------
    # 3. TITLU
    # --------------------------------------------------------

    titlu = cols[2].get_text(" ", strip=True)


    # --------------------------------------------------------
    # 4. POSTURI
    # --------------------------------------------------------

    posturi = cols[3].get_text(" ", strip=True)


    # --------------------------------------------------------
    # 5. PERIOADA
    # --------------------------------------------------------

    perioada = cols[4].get_text(" ", strip=True)


    # --------------------------------------------------------
    # 6. TOATE PDF-URILE
    # --------------------------------------------------------

    links = cols[5].find_all("a", href=True)

    link_pdf = []

    for link in links:
        href = link.get("href", "").strip()

        if href:
            link_pdf.append(href)


    # --------------------------------------------------------
    # ID INTERN
    # --------------------------------------------------------

    internal_id = int(time.time() * 1000)


    # --------------------------------------------------------
    # OBIECTUL FINAL
    # --------------------------------------------------------

    anunt = {
        "id_proiect": id_proiect,
        "program": program,
        "titlu": titlu,
        "posturi": posturi,
        "perioada": perioada,
        "anunt": "",
        "link_pdf": link_pdf,
        "id": internal_id
    }

    data.append(anunt)

    # Evităm ID-uri identice dacă două rânduri sunt procesate
    # în aceeași milisecundă
    time.sleep(0.001)


# ============================================================
# SALVARE JSON
# ============================================================

with open("anunturi_final.json", "w", encoding="utf-8") as f:
    json.dump(
        data,
        f,
        ensure_ascii=False,
        indent=4
    )


print()
print("==============================================")
print("GATA!")
print(f"Au fost extrase {len(data)} anunțuri.")
print("Fișier: anunturi_final.json")
print("==============================================")
