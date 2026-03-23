import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact/Contact";
import Header from "./Components/Header";
import Misiunea from "./Pages/Misiunea";
import Echipa from "./Pages/Echipa";
import Rapoarte from "./Pages/Rapoarte";
import Programeoperationale from "./Pages/Programeoperationale";
import Footer from "./Components/Footer";
import Programenationale from "./Pages/Programenationale";
import Programegestcomeur from "./Pages/Programegestcomeur";
import Altefinsiinstfin from "./Pages/Altefinsiinstfin";
import Proiecteinimpl from "./Pages/Proiecteinimpl";
import Proiectefinalizate from "./Pages/Proiectefinalizate";
import Raportariproiecte from "./Pages/Raportariproiecte";
import Accesfinnerbam from "./Pages/Accesfinneramb";
import Consultantaaip from "./Pages/Consultantaaip";
import Implementareproiecte from "./Pages/Implementareproiecte";
import Informaresipromovare from "./Pages/Informaresipromovare";
import Monitorizaresirecuperare from "./Pages/Monitorizaresirecuperare";
import Selectieechipaproiect from "./Pages/Selectieechipaproiect";
import Selectieparteneri from "./Pages/Selectieparteneri";
import Anuntselectieparteneri from "./Pages/Anuntselectieparteneri";
import Prezentareproiecte from "./Pages/Prezentareproiecte";
import Buletininformativ from "./Pages/Buletininformativ";
import Arhivaselectieecproj from "./Pages/Arhivaselectieecproj";
import Noutati from "./Pages/Noutati";
import Anunturiselectiescrape from "./Pages/Anunturiselectiescrape";
import Evenimente from "./Pages/Evenimente";
import Comunicate_de_presă_Proiecte from "./Pages/Comunicate_de_presă_Proiecte";

import Formarea_profesionistilor from "./Pages/SubPages/Formarea_profesionistilor";

import Formarea_profesionistilor2 from "./Pages/SubPages/Formarea_profesionistilor2";

import Oportunitati_ACCES from "./Pages/SubPages/Oportunitati_ACCES";

import Oportunitati_AFCN from "./Pages/SubPages/Oportunitati_AFCN";

import Oportunitati_Consiliu_Judetean from "./Pages/SubPages/Oportunitati_Consiliu_Judetean";

import Burse_sprijin_doctoranzi from "./Pages/SubPages/Burse_sprijin_doctoranzi";

import Acceleratoare_afaceri from "./Pages/SubPages/Acceleratoare_afaceri";

import Finalizare_SARS_cov2 from "./Pages/SubPages/Finalizare_SARS_cov2";



import Stimulating_innovative from "./Pages/SubPages/Stimulating_innovative";



import Gandire_antreprenoriala from "./Pages/SubPages/Gandire_antreprenoriala";

import Formator_antreprenoriat from "./Pages/SubPages/Formator_antreprenoriat";

import Admin from "./Pages/Admin";

import Istoric from "./Pages/Istoric";





import "./App.css";

function App() {
  

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/contact"
          element={<Contact />}
        />

        
        <Route path="/misiunea-daip" element={<Misiunea />} />
        <Route path="/echipa-daip" element={<Echipa />} />
        <Route path="/rapoarte-daip" element={<Rapoarte />} />
        <Route path="/programe-operationale" element={<Programeoperationale />} />
        <Route path="/programe-nationale" element={<Programenationale />} />
        <Route path="/programe-gestionate-de-comisia-europeana" element={<Programegestcomeur />} />
        <Route path="/alte-finantari-si-instrumente-financiare" element={<Altefinsiinstfin />} />
        <Route path="/proiecte-in-implementare" element={<Proiecteinimpl />} />
        <Route path="/proiecte-finalizate" element={<Proiectefinalizate />} />
        <Route path="/raportari-proiecte" element={<Raportariproiecte />} />
        <Route path="/accesare-finantari-nerambursabile" element={<Accesfinnerbam />} />
        <Route path="/consultanta-in-accesarea-si-implementarea-proiectelor" element={<Consultantaaip />} />
        <Route path="/implementare-proiecte" element={<Implementareproiecte />} />
        <Route path="/informare-si-promovare" element={<Informaresipromovare />} />
        <Route path="/monitorizare-si-recuperare-cheltuieli-neeligibile" element={<Monitorizaresirecuperare />} />
        <Route path="/selectie-echipa-proiect" element={<Selectieechipaproiect />} />
        <Route path="/selectie-parteneri" element={<Selectieparteneri />} />
        <Route path="/anunturi-selectie-parteneri-proiecte" element={<Anuntselectieparteneri />} />
        <Route path="/prezentare-proiecte" element={<Prezentareproiecte />} />
        <Route path="/buletin-informativ" element={<Buletininformativ />} />
        <Route path="/arhiva-selectie-echipe-proiecte" element={<Arhivaselectieecproj />} />
        <Route path="/noutati" element={<Noutati />} />
        <Route path="/anunturi-selectie-echipe-proiecte-scrape" element={<Anunturiselectiescrape />} />
        <Route path="/evenimente" element={<Evenimente />} />
        
        <Route path="/comunicate-de-presa-proiecte" element={<Comunicate_de_presă_Proiecte />} />

        <Route path="/formarea-profesionistilor" element={<Formarea_profesionistilor />} />
        <Route path="/formarea-profesionistilor2" element={<Formarea_profesionistilor2 />} />

        <Route path="/Oportunitati_ACCES" element={<Oportunitati_ACCES />} />

        <Route path="/Oportunitati_AFCN" element={<Oportunitati_AFCN />} />

        <Route path="/Oportunitati_Consiliu_Judetean" element={<Oportunitati_Consiliu_Judetean />} />
        
        <Route path="/Burse_sprijin_doctoranzi" element={<Burse_sprijin_doctoranzi />} />
        

        <Route path="/Acceleratoare_afaceri" element={<Acceleratoare_afaceri />} />
        <Route path="/Finalizare_SARS_cov2" element={<Finalizare_SARS_cov2 />} />

        <Route path="/Stimulating_innovative" element={<Stimulating_innovative />} />
        
        <Route path="/Gandire_antreprenoriala" element={<Gandire_antreprenoriala />} />
        <Route path="/Formator_antreprenoriat" element={<Formator_antreprenoriat />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/istoric" element={<Istoric />} />

        



       
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
