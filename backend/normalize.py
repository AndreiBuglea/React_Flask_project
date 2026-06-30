import json
import time

JSON_FILE = "anunturi.json"
OUTPUT_FILE = "anunturi_normalized.json"

with open(JSON_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

normalized = []
used_timestamps = set()

for item in data:
    # Generăm id nou (ca în POST)
    while True:
        candidate = int(round(time.time() * 1000))
        if candidate not in used_timestamps:
            used_timestamps.add(candidate)
            break
        time.sleep(0.001)

    # Dacă are deja format nou → doar suprascriem id-ul
    if "titlu" in item and "id_proiect" in item:
        new_item = item.copy()
        new_item["id"] = candidate
    else:
        # Format vechi → creăm obiect curat, fără chei lungi
        posturi_key = next(
            (k for k in item if "posturi" in k.lower() and "vacante" in k.lower()),
            None
        )

        new_item = {
            "id": candidate,
            "id_proiect": item.get("ID PROIECT", ""),
            "titlu": item.get("Titlu proiect", ""),
            "program": item.get("Program finanțare", ""),
            "posturi": item.get(posturi_key, ""),
            "perioada": item.get("Perioada depunere dosar/INTERVAL ORAR", ""),
            "link_pdf": item.get("Anunț selecție echipă proiect", {}).get("link", ""),
            "anunt": item.get("Anunț selecție echipă proiect", {}).get("text", ""),
        }

        # Curățăm newline-urile
        for key in ["titlu", "program", "posturi", "perioada", "anunt"]:
            if new_item.get(key):
                new_item[key] = " ".join(str(new_item[key]).split())

    normalized.append(new_item)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(normalized, f, ensure_ascii=False, indent=2)

print(f"Am normalizat {len(normalized)} anunțuri.")
print("Toate au acum format plat + id nou.")
print("Exemple:")
for i in range(min(3, len(normalized))):
    print(json.dumps(normalized[i], indent=2, ensure_ascii=False))
    print("-" * 60)