from sqlalchemy import text  # adaugă asta sus, lângă importuri
from flask import request, jsonify, Response
from bs4 import BeautifulSoup
from config import app, db
from models import Contact, WPPage, WPPost, WPTermRelationship, db, Anunt
import json
from datetime import datetime
from models import WPPage, WPMeta
from slugify import slugify
import html
import re
import time
import os
from werkzeug.utils import secure_filename
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt
)
import os
from flask import request, jsonify
from werkzeug.utils import secure_filename
import time
import re

ALLOWED_ADMINS = ["andrei.buglea02@e-uvt.ro"]


def fix_links(text):
    if not text or not isinstance(text, str):
        return text
    
    # Acum link-ul va fi pur și simplu /uploads/...
    # Browserul îl va căuta pe același domeniu unde e site-ul
    pattern = r"https?://daip\.uvt\.ro/wp-content/uploads"
    return re.sub(pattern, "/uploads", text)

def force_https(content: str) -> str:
    """
    Transformă toate linkurile http://daip.uvt.ro în https://daip.uvt.ro
    """
    if not content:
        return content
    return content.replace("http://daip.uvt.ro", "https://daip.uvt.ro")

def force_https_recursive(obj):
    """
    Aplică HTTPS pe orice string care conține linkuri http://daip.uvt.ro
    Funcționează pe dict, list sau string
    """
    if isinstance(obj, str):
        return force_https(obj)
    elif isinstance(obj, list):
        return [force_https_recursive(x) for x in obj]
    elif isinstance(obj, dict):
        return {k: force_https_recursive(v) for k, v in obj.items()}
    return obj

@app.after_request
def apply_https_to_json(response: Response):
    # Verificăm dacă răspunsul este JSON
    if response.content_type == "application/json" and response.data:
        try:
            data = json.loads(response.data)
            data = force_https_recursive(data)
            response.data = json.dumps(data)
        except Exception as e:
            # Dacă ceva nu merge, lăsăm răspunsul original
            pass
    return response


def remove_links_home(html):
    WORDS_TO_REMOVE = [
   "Contact",
   "Noutăți",
   "Evenimente",
   "Comunicate de presă proiecte",
   "Anunțuri selecție echipe proiecte",
]
    soup = BeautifulSoup(html, "html.parser")

    # înlocuiește <a> cu textul din interior
    for a in soup.find_all("a"):
        a.replace_with(a.get_text())

    for text_node in soup.find_all(string=True):
        for word in WORDS_TO_REMOVE:
            if word in text_node:
                text_node.replace_with(text_node.replace(word, ""))

    return str(soup)

@app.route("/api/page/home")
def get_home():
    page = WPPage.query.filter_by(
        post_name="home",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        clean_content = remove_links_home(page.post_content)
        return jsonify({
            "title": page.post_title,
            "content": fix_links(clean_content)
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/contacts")
def get_contacts():
    page = WPPage.query.filter_by(
        post_name="contact",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": fix_links(page.post_content)
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/misiunea-daip")
def get_misiunea():
    page = WPPage.query.filter_by(
        post_name="misiunea-daip",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": fix_links(page.post_content)
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/echipa-daip")
def get_echipa():
    members = [
        {"name": "Ec. Dr. Sorina Crina MOCANU", "role": "Director", "phone": "+40 - 0256 592 338", "email": "sorina.mocanu@e-uvt.ro"},
        {"name": "Ec. Drd. Dorina Elena BUICĂ", "role": "Șef Serviciu Implementare proiecte", "phone": "+40 - 0256 592 113", "email": "dorina.buica@e-uvt.ro"},
        {"name": "Ec. Drd. Andrei Alexandru TĂRĂBÎC", "phone": "+40 - 0256 592 338", "email": "andrei.tarabic@e-uvt.ro"},
        {"name": "Ing. Simona Adela CIUFERESCU", "phone": "+40 - 0256 592 113", "email": "simona.ciuferescu@e-uvt.ro"},
        {"name": "Drd. Alina BÂZNĂ", "phone": "+40 - 0256 592 338", "email": "alina.bazna@e-uvt.ro"},
        {"name": "Alina Georgiana BIRĂU", "phone": "+40 - 0256 592 338", "email": "alina.birau@e-uvt.ro"},
        {"name": "Cristina CEBOTARI", "phone": "+40 - 0256 592 338", "email": "cristina.cebotari@e-uvt.ro"},
        
    ]
    return jsonify(members)
    return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/rapoarte-daip")
def get_rapoarte():
    page = WPPage.query.filter_by(
        post_name="rapoarte-daip",
        post_type="page",
        post_status="publish"
    ).first()

    if not page:
        return jsonify({"error": "Page not found"}), 404

    soup = BeautifulSoup(page.post_content, "html.parser")
    # extrage toate <h3> care au <a> in ele
    rapoarte = []
    for h3 in soup.find_all("h3"):
        a = h3.find("a")
        if a and a.get("href"):
            # REZOLVARE: Aplicăm fix_links direct pe URL-ul extras (care e string)
            raw_url = a["href"]
            clean_url = fix_links(raw_url) 

            print(f"DEBUG: Original: {raw_url}") # Vezi aici dacă e http sau https
            print(f"DEBUG: Curățat: {clean_url}")
            
            rapoarte.append({
                "title": a.get_text(strip=True),
                "url": clean_url
            })

    return jsonify({
        "title": page.post_title,
        "rapoarte": rapoarte
    })

@app.route("/api/page/programe-operationale")
def get_programe_operationale():
    page = WPPage.query.filter_by(
        post_name="programe-operationale",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/programe-nationale")
def get_programe_nationale():
    page = WPPage.query.filter_by(
        post_name="programe-nationale",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/programe-gestionate-de-comisia-europeana")
def get_programe_gestionate_de_comisia_europeanae():
    page = WPPage.query.filter_by(
        post_name="programe-gestionate-de-comisia-europeana",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/alte-finantari-si-instrumente-financiare")
def get_programe_alte_finantari_si_instrumente_financiare():
    page = WPPage.query.filter_by(
        post_name="alte-finantari-si-instrumente-financiare",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/proiecte-in-implementare")
def get_proiecte_in_implementare():
    page = WPPage.query.filter_by(
        post_name="proiecte-in-implementare",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/proiecte-finalizate")
def get_proiecte_finalizate():
    page = WPPage.query.filter_by(
        post_name="proiecte-finalizate",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/raportari-proiecte")
def get_raportari_proiecte():
    page = WPPage.query.filter_by(
        post_name="raportari-proiecte",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/accesare-finantari-nerambursabile")
def get_accesare_finantari_nerambursabile():
    page = WPPage.query.filter_by(
        post_name="accesare-finantari-nerambursabile",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/consultanta-in-accesarea-si-implementarea-proiectelor")
def get_consultanta_in_accesarea_si_implementarea_proiectelor():
    page = WPPage.query.filter_by(
        post_name="consultanta-in-accesarea-si-implementarea-proiectelor",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/implementare-proiecte")
def get_implementare_proiecte():
    page = WPPage.query.filter_by(
        post_name="implementare-proiecte",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/informare-si-promovare")
def get_informare_si_promovare():
    page = WPPage.query.filter_by(
        post_name="informare-si-promovare",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/monitorizare-si-recuperare-cheltuieli-neeligibile")
def get_monitorizare_si_recuperare_cheltuieli_neeligibile():
    page = WPPage.query.filter_by(
        post_name="monitorizare-si-recuperare-cheltuieli-neeligibile",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/selectie-echipa-proiect")
def get_selectie_echipa_proiect():
    page = WPPage.query.filter_by(
        post_name="selectie-echipa-proiect",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/selectie-parteneri")
def get_selectie_parteneri():
    page = WPPage.query.filter_by(
        post_name="selectie-parteneri",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/anunturi-selectie-parteneri-proiecte")
def get_anunturi_selectie_parteneri_proiecte():
    page = WPPage.query.filter_by(
        post_name="anunturi-selectie-parteneri-proiecte",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/prezentare-proiecte")
def get_prezentare_proiecte():
    page = WPPage.query.filter_by(
        post_name="prezentare-proiecte",
        post_type="page",
        post_status="publish"
    ).first()

    rows = db.session.execute(text("""
        SELECT 
            p.ID,
            p.post_title,
            l.url
        FROM wp_testingposts p
        JOIN wp_testingterm_relationships tr ON p.ID = tr.object_id
        JOIN wp_testingterm_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
        LEFT JOIN prezentare_proiecte_carduri l 
            ON l.titlu = p.post_title
        WHERE tt.term_id = 19
          AND p.post_status = 'publish'
    """)).mappings().all()

    cards = [
        {
            "id": row["ID"],
            "title": row["post_title"],
            "url": row["url"]
        }
        for row in rows
    ]

    return jsonify({
        "title": page.post_title,
        "content": page.post_content,
        "cards": cards
    })

@app.route("/api/page/buletin-informativ")
def get_buletin_informativ():
    page = WPPage.query.filter_by(
        post_name="buletin-informativ",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404

@app.route("/api/page/arhiva-selectie-echipe-proiecte")
def get_arhiva_selectie_echipe_proiecte():
    page = WPPage.query.filter_by(
        post_name="arhiva-selectie-echipe-proiecte",
        post_type="page",
        post_status="publish"
    ).first()

    template = db.session.execute(
    text("SELECT post_content FROM wp_testingposts WHERE ID = :id"),
    {"id": 5347}
).scalar()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content,
            "tabel": template  # aici e tabelul complet HTML

        })
    else:
        return jsonify({"error": "Home page not found"}), 404





"""@app.route("/api/page/anunturi-selectie-echipe-proiecte")
def get_anunturi_selectie_echipe_proiecte():
    page = WPPage.query.filter_by(
        post_name="anunturi-selectie-echipe-proiecte",
        post_type="page",
        post_status="publish"
    ).first()

    if page:
        
        return jsonify({
            "title": page.post_title,
            "content": page.post_content
        })
    else:
        return jsonify({"error": "Home page not found"}), 404"""
"""
@app.route("/api/page/anunturi-selectie-echipe-proiecte")
def get_anunturi_selectie_echipe_proiecte():
    page = WPPage.query.filter_by(
        post_name="anunturi-selectie-echipe-proiecte",
        post_type="page",
        post_status="publish"
    ).first()

    if not page:
        return jsonify({"error": "Home page not found"}), 404

    # Folosim parser HTML pentru a adăuga data-id fără să schimbăm vizualul
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(page.post_content, "html.parser")

    # Adăugăm data-id pe fiecare tr care reprezintă un anunț
    # Presupunem că fiecare tr corespunde unui anunț și că primul <td> poate fi identificatorul proiectului
    for tr in soup.find_all("tr"):
        # Ia titlul anunțului din prima coloană sau altă logică dacă e nevoie
        # În cazul tău trebuie să ai cumva legătura tr → ID real din DB
        tds = tr.find_all("td")
        if not tds:
            continue

        # Exemplu: căutăm anunț în baza de date după titlu ca să luăm ID-ul real
        titlu = tds[2].get_text(strip=True) if len(tds) > 2 else None
        if not titlu:
            continue

        anunt = WPPage.query.filter_by(post_type="anunt", post_title=titlu).first()
        if anunt:
            tr["data-id"] = str(anunt.ID)

    return jsonify({
        "title": page.post_title,
        "content": str(soup)
    })
"""
        
"""
@app.route("/api/anunturi/add", methods=["POST"])
def add_anunt():
    try:
        data = request.get_json()

        titlu = data.get("titlu", "anunt")

        # 🔥 generăm slug corect (obligatoriu pentru WP)
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', titlu.lower()).strip('-')

        new_anunt = WPPage()
        new_anunt.post_title = titlu
        new_anunt.post_content = data.get("anunt", "")
        new_anunt.post_status = "publish"
        new_anunt.post_type = "anunt"
        new_anunt.post_name = slug

        db.session.add(new_anunt)
        db.session.flush()  
        # 🔥 flush = obținem ID-ul fără commit final

        # 2️⃣ Salvăm meta fields
        meta_fields = {
            "id_proiect": data.get("id_proiect", ""),
            "program": data.get("program", ""),
            "posturi": data.get("posturi", ""),
            "perioada": data.get("perioada", "")
        }

        for key, value in meta_fields.items():
            meta = WPMeta(
                post_id=new_anunt.ID,
                meta_key=key,
                meta_value=value
            )
            db.session.add(meta)

        db.session.commit()

        # 3️⃣ Returnăm ID-ul real
        return jsonify({
            "success": True,
            "id": new_anunt.ID
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

"""



"""
@app.route("/api/anunturi", methods=["GET"])
def get_anunturi():
    try:
        anunturi_db = WPPage.query.filter_by(
            post_type="anunt",
            post_status="publish"
        ).order_by(WPPage.ID.desc()).all()

        result = []

        for a in anunturi_db:
            metas = {m.meta_key: m.meta_value 
                     for m in WPMeta.query.filter_by(post_id=a.ID).all()}

            result.append({
                "id": a.ID,  # 🔥 ID REAL
                "id_proiect": metas.get("id_proiect",""),
                "program": metas.get("program",""),
                "titlu": a.post_title,
                "posturi": metas.get("posturi",""),
                "perioada": metas.get("perioada",""),
                "anunt": a.post_content
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

"""


"""@app.route("/api/anunturi/delete/<int:anunt_id>", methods=["DELETE"])
def delete_anunt(anunt_id):
    try:
        anunt = WPPage.query.get(anunt_id)
        if not anunt:
            return jsonify({"error": "Anunțul nu a fost găsit"}), 404

        # Ștergem și meta fields
        WPMeta.query.filter_by(post_id=anunt.ID).delete()
        db.session.delete(anunt)
        db.session.commit()
        return jsonify({"success": True, "message": "Anunț șters cu succes!"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Eroare la ștergerea anunțului", "detalii": str(e)}), 500

"""

@app.route("/api/page/noutati")
def scraped_noutati():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(BASE_DIR, "JSON", "noutati.json")

    if not os.path.exists(json_path):
        return jsonify({"error": "Fisierul noutati.json nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        posts = json.load(f)

    return jsonify({
        "title": "Noutăți",
        "content": "<p>Ultimele noutăți și anunțuri DAIP</p>",
        "posts": posts
    })

@app.route("/api/page/evenimente")
def scraped_evenimente():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(BASE_DIR, "JSON", "evenimente.json")

    if not os.path.exists(json_path):
        return jsonify({"error": "Fisierul noutati.json nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        posts = json.load(f)

    return jsonify({
        "title": "Evenimente",
        "posts": posts
    })

@app.route("/api/page/comunicate-de-presa-proiecte")
def scraped_comunicate_de_presa_proiecte():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(BASE_DIR, "JSON", "comunicate-de-presa-proiecte.json")

    if not os.path.exists(json_path):
        return jsonify({"error": "Fisierul noutati.json nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        posts = json.load(f)

    return jsonify({
        "title": "Comunicate de presă - Proiecte",
        "posts": posts
    })



@app.route("/api/page/formarea-profesionistilor")
def scraped_formarea_profesionistilor():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # directorul unde e main.py
    json_path = os.path.join(BASE_DIR, "JSON", "formarea-profesionistilor.json")

    if not os.path.exists(json_path):
        return jsonify({"error": f"Fisierul {json_path} nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    return jsonify({
        "title": "Servicii integrate și profesioniști în educația timpurie",   
        "posts": data  # data trebuie să fie listă de postări
    })


@app.route("/api/page/Stimulating_innovative")
def scraped_Stimulating_innovative():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # directorul unde e main.py
    json_path = os.path.join(BASE_DIR, "JSON", "Stimulating_innovative.json")

    if not os.path.exists(json_path):
        return jsonify({"error": f"Fisierul {json_path} nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    return jsonify({
        "title": "Workshopuri privind un antreprenoriat creativ, realizate prin inițiativa bilaterala “Stimulating innovative and entrepreneurial attitudes for performing arts in higher education TM 2023 1st edition” finanțată din Fondul pentru relații bilaterale 2014-2021",   
        "posts": data  # data trebuie să fie listă de postări
    })



@app.route("/api/page/anunturi-selectie-echipe-proiecte-scrape")
def get_anunturi_selectie_echipe_proiecte_scrape():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # directorul unde e main.py
    json_path = os.path.join(BASE_DIR, "JSON", "anunturi_normalized.json")

    if not os.path.exists(json_path):
        return jsonify({"error": f"Fisierul {json_path} nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)
        
    return jsonify({
        "title": "Servicii integrate și profesioniști în educația timpurie",   
        "posts": data  # data trebuie să fie listă de postări
        })
    

"""
# GET toate anunțurile
@app.route("/api/anunturi", methods=["GET"])
def get_anunturi():
    return jsonify([{
        "id": a.id,
        "id_proiect": a.id_proiect,
        "program": a.program,
        "titlu": a.titlu,
        "posturi": a.posturi,
        "perioada": a.perioada,
        "anunt": a.anunt,
        "link_pdf": a.link_pdf
    } for a in Anunt.query.order_by(Anunt.id.desc()).all()])

@app.route("/api/anunturi/add", methods=["POST"])
def add_anunt():
    data = request.get_json()
    
    required = ['id_proiect', 'titlu', 'anunt']
    if not all(k in data for k in required):
        return jsonify({"error": "Lipsesc câmpuri obligatorii"}), 400

    try:
        new_anunt = Anunt(
            id_proiect=data['id_proiect'],
            program=data.get('program'),
            titlu=data['titlu'],
            posturi=data.get('posturi'),
            perioada=data.get('perioada'),
            anunt=data['anunt'],
          #  link_pdf=data.get('link_pdf')
        )
        db.session.add(new_anunt)
        db.session.commit()
        return jsonify({"success": True, "id": new_anunt.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Eroare la salvare", "details": str(e)}), 400
"""
"""
# DELETE - mai bun
@app.route("/api/anunturi/delete/<int:id>", methods=["DELETE"])
def delete_anunt(id):
    anunt = Anunt.query.get_or_404(id)   # Flask-SQLAlchemy are asta
    db.session.delete(anunt)
    db.session.commit()
    return jsonify({"success": True}), 200

import os

@app.route('/anunturi_selectie.html')
def anunturi_html():

    # Path corect către frontend/public/anunturi_selectie.html
    file_path = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),  # backend/
            "..",                       # urcă la project/
            "frontend",
            "public",
            "anunturi_selectie.html"
        )
    )

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            scraped_html = f.read()
    except FileNotFoundError:
        return "Nu găsesc fișierul anunturi_selectie.html", 500

    # Luăm anunțurile din DB
    anunturi = Anunt.query.order_by(Anunt.id.desc()).all()

    html_db = ""
    for a in anunturi:
        html_db += f"""
    #    <div data-anunt-id="{a.id}" style="border:2px solid #15803d; margin:15px; padding:15px; border-radius:6px; background:#f0fdf4;">
    #        <h3>{a.titlu}</h3>
    #        <p><strong>ID proiect:</strong> {a.id_proiect}</p>
    #        {f"<p><strong>Program:</strong> {a.program}</p>" if a.program else ""}
    #        {f"<p><strong>Posturi:</strong> {a.posturi}</p>" if a.posturi else ""}
    #      {f"<p><strong>Perioada:</strong> {a.perioada}</p>" if a.perioada else ""}
    #        <div>{a.anunt}</div>
    #     </div>
    

#    combined_html = scraped_html.replace(
#        "<body>",
 #       f"<body><h2 style='color:#15803d'>Anunțuri noi adăugate:</h2>{html_db}"
#    )

  #  return combined_html


# ================== CONFIG UPLOAD ==================






UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

JSON_FILE = "JSON/anunturi_normalized.json"

def read_json():
    if not os.path.exists(JSON_FILE):
        return []
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def write_json(data):
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route("/api/anunturi", methods=["GET"])
def get_anunturi():
    data = read_json()
    return jsonify(data)


@app.route("/api/anunturi", methods=["POST"])
@jwt_required()
def add_anunt():
    claims = get_jwt()
    if claims.get("email") not in ALLOWED_ADMINS:
        return jsonify({"error": "Acces interzis"}), 403

    # --- AM ELIMINAT VERIFICAREA DE ROL 'admin' DE AICI ---

    # 2. Preluăm datele (FormData pentru fișiere)
    data_received = request.form.to_dict() if request.form else request.json

    # 3. Verificăm fișierul PDF
    if 'pdf' not in request.files:
        return jsonify({"error": "Niciun fișier PDF trimis"}), 400

    file = request.files['pdf']
    if file.filename == '':
        return jsonify({"error": "Niciun fișier selectat"}), 400

    if file and file.filename.lower().endswith('.pdf'):
        # Generăm un nume unic pentru fișier
        filename = secure_filename(file.filename)
        base, ext = os.path.splitext(filename)
        filename = f"{base}_{int(time.time())}{ext}"

        # Asigură-te că UPLOAD_FOLDER este definit în config.py
        file_path = os.path.join(app.config.get('UPLOAD_FOLDER', 'uploads'), filename)
        file.save(file_path)

        # URL-ul la care va fi accesibil fișierul
        pdf_url = f"/uploads/{filename}"

        # 4. Construim obiectul pentru JSON
        new_anunt = {
            "id_proiect": request.form.get("id_proiect", ""),
            "program": request.form.get("program", ""),
            "titlu": request.form.get("titlu", ""),
            "posturi": request.form.get("posturi", ""),
            "perioada": request.form.get("perioada", ""),
            "anunt": request.form.get("anunt", ""),
            "link_pdf": [pdf_url],
            "id": int(round(time.time() * 1000))
        }

        # Validare câmpuri obligatorii
        if not new_anunt["id_proiect"] or not new_anunt["titlu"] or not new_anunt["anunt"]:
            return jsonify({"error": "Lipsesc câmpuri obligatorii"}), 400

        # 5. Salvăm în fișierul JSON
        try:
            data = read_json()
            data.insert(0, new_anunt)
            write_json(data)
            
            # Logăm acțiunea
            log_action(claims, "Adăugare Anunț", f"Titlu: {new_anunt['titlu']}", payload=data_received)
            
            return jsonify(new_anunt), 201
        except Exception as e:
            return jsonify({"error": f"Eroare la salvarea datelor: {str(e)}"}), 500

    return jsonify({"error": "Doar fișiere PDF sunt acceptate"}), 400




@app.route("/api/anunturi/<int:anunt_id>", methods=["DELETE"])
@jwt_required()
def delete_anunt(anunt_id):
    claims = get_jwt()
    if claims.get("email") not in ALLOWED_ADMINS:
        return jsonify({"error": "Acces interzis"}), 403

    # --- AM ELIMINAT VERIFICAREA DE ROL 'admin' ---

    # 2. Citim datele actuale
    data = read_json()
    
    # 3. Căutăm anunțul pentru a-l identifica înainte de ștergere
    anunt_de_sters = next((a for a in data if int(a.get("id", 0)) == anunt_id), None)
    
    if not anunt_de_sters:
        return jsonify({"error": "Anunțul nu a fost găsit"}), 404

    # 4. Creăm noua listă excluzând anunțul (filtrare)
    new_data = [a for a in data if int(a.get("id", 0)) != anunt_id]
    
    # 5. Salvăm modificările în fișierul JSON
    try:
        write_json(new_data)
        
        # LOGARE: Folosim obiectul 'claims' pentru consistență cu add_anunt
        log_action(
            claims, 
            "Ștergere Anunț", 
            f"A eliminat anunțul: {anunt_de_sters.get('titlu', 'Fără titlu')} (ID: {anunt_id})", 
            payload=anunt_de_sters
        )
        
        return jsonify({"success": True, "deleted_id": anunt_id}), 200
    except Exception as e:
        return jsonify({"error": f"Eroare la ștergere: {str(e)}"}), 500


@app.route("/api/anunturi/<int:anunt_id>", methods=["PUT"])
@jwt_required()
def update_anunt(anunt_id):
    claims = get_jwt()
    if claims.get("email") not in ALLOWED_ADMINS:
        return jsonify({"error": "Acces interzis"}), 403

    # --- AM ELIMINAT VERIFICAREA DE ROL 'admin' ---

    data = read_json()
    # Căutăm indexul anunțului în listă
    anunt_index = next((i for i, a in enumerate(data) if int(a.get("id", 0)) == anunt_id), None)

    if anunt_index is None:
        return jsonify({"error": "Anunțul nu a fost găsit"}), 404

    anunt = data[anunt_index]

    # 2. Actualizare câmpuri text
    # Folosim .get(key, default) pentru a păstra valorile vechi dacă nu se trimit altele noi
    anunt["id_proiect"] = request.form.get("id_proiect", anunt.get("id_proiect", ""))
    anunt["program"] = request.form.get("program", anunt.get("program", ""))
    anunt["titlu"] = request.form.get("titlu", anunt.get("titlu", ""))
    anunt["posturi"] = request.form.get("posturi", anunt.get("posturi", ""))
    anunt["perioada"] = request.form.get("perioada", anunt.get("perioada", ""))
    anunt["anunt"] = request.form.get("anunt", anunt.get("anunt", ""))

    # 3. Gestionare PDF-uri existente (cele pe care utilizatorul a ales să le păstreze)
    keep_pdfs = request.form.getlist("keep_pdfs")
    
    # Dacă în formular există 'keep_pdfs', actualizăm lista (poate fi și goală dacă s-au șters toate)
    if 'keep_pdfs' in request.form or keep_pdfs:
        anunt["link_pdf"] = keep_pdfs
    
    # 4. Adăugare PDF-uri noi
    noi_incarcate = []
    if 'pdf' in request.files:
        files = request.files.getlist("pdf")
        for file in files:
            if file and file.filename.lower().endswith(".pdf"):
                filename = secure_filename(file.filename)
                base, ext = os.path.splitext(filename)
                # Adăugăm timestamp pentru a evita suprascrierea fișierelor cu același nume
                filename = f"{base}_{int(time.time())}{ext}"
                
                # Salvăm fișierul fizic pe server
                file_path = os.path.join(app.config.get('UPLOAD_FOLDER', 'uploads'), filename)
                file.save(file_path)
                
                # Generăm URL-ul relativ (consistent cu restul rutei /uploads/)
                pdf_url = f"/uploads/{filename}"
                
                if "link_pdf" not in anunt:
                    anunt["link_pdf"] = []
                
                anunt["link_pdf"].append(pdf_url)
                noi_incarcate.append(pdf_url)

    # 5. Salvare în fișierul JSON
    try:
        data[anunt_index] = anunt
        write_json(data)

        # --- LOGARE COMPLETĂ ---
        log_payload = {
            "campuri_text": {
                "titlu": anunt["titlu"],
                "id_proiect": anunt["id_proiect"]
            },
            "pdf_uri_pastrate": keep_pdfs,
            "pdf_uri_noi_incarcate": noi_incarcate,
            "stare_finala_pdf": anunt["link_pdf"]
        }

        # Folosim 'claims' pentru a loga toate detaliile utilizatorului
        log_action(
            claims, 
            "Editare Anunț", 
            f"Modificat anunț ID: {anunt_id} ({anunt['titlu']})", 
            payload=log_payload
        )
        
        return jsonify(anunt), 200
    except Exception as e:
        return jsonify({"error": f"Eroare la actualizarea datelor: {str(e)}"}), 500

#aici adaug sistem de loguri
LOG_FILE = "logs.json"



def log_action(claims, action, details="", payload=None):
    """
    Extrage datele din claims (Keycloak) și salvează acțiunea în logs.json
    """
    # Extragem informații utile din claims
    # Dacă claims este un string (cazul în care logăm ceva fără user logat), îl folosim ca atare
    if isinstance(claims, dict):
        user_display = claims.get("name", "Unknown User")
        user_email = claims.get("email", "No Email")
        identifier = f"{user_display} ({user_email})"
    else:
        identifier = claims

    log_entry = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user": identifier,
        "action": action,
        "details": details,
        "payload": payload,
        "ip": request.remote_addr
    }

    logs = []
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            try:
                logs = json.load(f)
            except:
                logs = []

    logs.insert(0, log_entry)

    with open(LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(logs, f, indent=4)








@app.route("/api/logs", methods=["GET"])
@jwt_required()
def get_logs():
    claims = get_jwt()
    if claims.get("email") not in ALLOWED_ADMINS:
        return jsonify({"error": "Acces interzis"}), 403

    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                return jsonify(data)
            except:
                return jsonify([])
    return jsonify([])

@app.route("/api/page/Raportari-proiecte")
def scraped_Raportari_proiecte():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(BASE_DIR, "JSON", "Raportari_proiecte.json")

    if not os.path.exists(json_path):
        return jsonify({"error": "Fisierul Raportari_proiecte.json nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        posts = json.load(f)

    return jsonify({
        "title": "Raportari proiecte",
        "content": "<p>Raportari proiecte!</p>",
        "posts": posts
    })

@app.route("/api/page/Prezentare-Proiecte")
def scraped_Prezentare_Proiecte():
    import os, json
    from flask import jsonify

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(BASE_DIR, "JSON", "PProiecte.json")

    if not os.path.exists(json_path):
        return jsonify({"error": "Fisierul Prezentare_proiecte2.json nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    # asigurăm că există câmpurile necesare
    projects = data.get("projects", [])
    accordions = data.get("accordions", [])

    return jsonify({
        "title": data.get("title", "Prezentare proiecte"),
        "projects": projects,
        "accordions": accordions
    })


@app.route("/api/page/Proiecte-In-Imp")
def scraped_Proiecte_in_imp():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(BASE_DIR, "JSON", "Proiecte_in_implementare.json")

    if not os.path.exists(json_path):
        return jsonify({"error": "Fisierul Raportari_proiecte.json nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        posts = json.load(f)

    return jsonify({
        "title": "Priecte in implementare",
        "content": "<p>Priecte in implementare</p>",
        "posts": posts
    })



@app.route("/api/page/Anunturi-Selectie-Parteneri-Proiecte")
def scraped_Anunturi_Selectie_Parteneri_Proiecte():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(BASE_DIR, "JSON", "selectie-parteneri-proiecte.json")

    if not os.path.exists(json_path):
        return jsonify({"error": "Fisierul nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    # Deoarece JSON-ul tău are "content_html" direct în obiectul principal:
    return jsonify({
        "title": data.get("title") or "Anunțuri selecție parteneri proiecte",
        "content": data.get("content_html", ""),
        "posts": [] # Îl lăsăm gol dacă tot conținutul e deja în content_html
    })
###################

@app.route("/api/page/Arhiva-selectie-echipe-proiecte")
def scraped_Arhiva_selectie_echipe_proiecte():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(BASE_DIR, "JSON", "arhiva-selectie-echipe-proiecte.json")

    if not os.path.exists(json_path):
        return jsonify({"error": "Fisierul nu exista"}), 500

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    return jsonify({
        # Titlul paginii ar trebui să fie "ARHIVĂ - Anunțuri...", nu doar "2024"
        "title": "ARHIVĂ - Anunțuri selecție echipe proiecte", 
        "tabel": data.get("content_html", "") # Trimitem HTML-ul către cheia 'tabel'
    })

if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)