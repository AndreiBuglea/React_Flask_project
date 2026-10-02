
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

# Păstrăm doar rândurile valide cu 6 coloane
valid_rows = []

for row in rows:
    cols = row.find_all("td", recursive=False)

    if len(cols) >= 6:
        valid_rows.append(cols)


# ============================================================
# GENERARE ID-URI
#
# Primul anunț din HTML primește ID-ul cel mai mare.
# Fiecare anunț următor primește un ID mai mic.
# ============================================================

base_id = int(time.time() * 1000) + len(valid_rows)


# ============================================================
# EXTRAGERE ANUNȚURI
# ============================================================

for index, cols in enumerate(valid_rows):

    # --------------------------------------------------------
    # 1. ID PROIECT
    # --------------------------------------------------------

    id_proiect = cols[0].get_text("\n", strip=True)


    # --------------------------------------------------------
    # 2. PROGRAM
    # --------------------------------------------------------

    program = cols[1].get_text("\n", strip=True)


    # --------------------------------------------------------
    # 3. TITLU
    # --------------------------------------------------------

    titlu = cols[2].get_text("\n", strip=True)


    # --------------------------------------------------------
    # 4. POSTURI
    # --------------------------------------------------------

    posturi = cols[3].get_text("\n", strip=True)


    # --------------------------------------------------------
    # 5. PERIOADA
    # --------------------------------------------------------

    perioada = cols[4].get_text("\n", strip=True)


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
    #
    # Primul rând = ID cel mai mare
    # Ultimul rând = ID cel mai mic
    # --------------------------------------------------------

    internal_id = base_id - index


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


# ============================================================
# VERIFICARE
# ============================================================

print()
print("==============================================")
print("GATA!")
print(f"Au fost extrase {len(data)} anunțuri.")
print("Fișier: anunturi_final.json")
print()
print("Primul anunț:")
print(f"  ID: {data[0]['id']}")
print(f"  Titlu: {data[0]['titlu']}")
print()
print("Ultimul anunț:")
print(f"  ID: {data[-1]['id']}")
print(f"  Titlu: {data[-1]['titlu']}")
print("==============================================")
