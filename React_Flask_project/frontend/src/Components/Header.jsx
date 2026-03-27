import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import { Menu, X, ChevronDown } from "lucide-react"; // npm install lucide-react

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItemStyles = 
    "h-full flex items-center text-sm font-medium text-blue-900 hover:text-yellow-500 transition-colors whitespace-nowrap px-1";

  // Stiluri extra pentru meniul de mobil ca să nu alterăm navItemStyles
  const mobileLinkStyles = "block py-3 px-4 text-base font-medium text-blue-900 border-b border-gray-100";

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 h-20">
      
      {/* LOGO - Păstrat exact ca în codul tău */}
      <div className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-14 w-auto" />
        </Link>
      </div>

      {/* BUTON MOBIL - Apare doar pe ecrane sub XL (unde meniul tău mare nu mai are loc) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 xl:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-900">
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Container MENIU DESKTOP - Am adăugat doar 'hidden xl:flex' */}
      <div className="h-full hidden xl:flex items-center justify-center px-6 ml-40 lg:ml-64">
        <nav className="flex items-center gap-6 h-full">

          <Link to="/" className={navItemStyles}>
            Home
          </Link>

          <Dropdown title="Despre DAIP">
            <Link to="/misiunea-daip">Misiunea DAIP</Link>
            <Link to="/echipa-daip">Echipa DAIP</Link>
            <Link to="/rapoarte-daip">Rapoarte DAIP</Link>
          </Dropdown>

          <Dropdown title="Programe de finantare">
            <Link to="/programe-operationale">Programe Operationale</Link>
            <Link to="/programe-nationale">Programe Nationale</Link>
            <Link to="/programe-gestionate-de-comisia-europeana">
              Programe gestionate de Comisia Europeana
            </Link>
            <Link to="/alte-finantari-si-instrumente-financiare">
              Alte finantari
            </Link>
          </Dropdown>

          <Dropdown title="Portofoliu proiecte">
            <Link to="/proiecte-in-implementare">Proiecte in implementare</Link>
            <Link to="/proiecte-finalizate">Proiecte finalizate</Link>
            <Link to="/raportari-proiecte">Raportari proiecte</Link>
          </Dropdown>

          <Dropdown title="Proceduri">
            <Link to="/accesare-finantari-nerambursabile">
              Accesare finantari nerambursabile
            </Link>
            <Link to="/consultanta-in-accesarea-si-implementarea-proiectelor">
              Consultanta în accesarea și implementarea proiectelor
            </Link>
            <Link to="/implementare-proiecte">Implementare proiecte</Link>
            <Link to="/informare-si-promovare">
              Informare și promovare
            </Link>
            <Link to="/monitorizare-si-recuperare-cheltuieli-neeligibile">
              Monitorizare și recuperare cheltuieli neeligibile
            </Link>
            <Link to="/selectie-echipa-proiect">Selectie echipa proiect</Link>
            <Link to="/selectie-parteneri">Selectie parteneri</Link>
          </Dropdown>

          <Link to="/anunturi-selectie-parteneri-proiecte" className={navItemStyles}>
            Anunturi selectie parteneri
          </Link>

          <Link to="/prezentare-proiecte" className={navItemStyles}>
            Prezentare proiecte
          </Link>

          <Link to="/buletin-informativ" className={navItemStyles}>
            Buletin informativ
          </Link>

          <Link to="/arhiva-selectie-echipe-proiecte" className={navItemStyles}>
            Arhiva selectie
          </Link>

        </nav>
      </div>

      {/* MENIU MOBIL - Randat doar când e deschis și doar pe ecrane mici */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t border-gray-100 z-[100] max-h-[80vh] overflow-y-auto">
          <Link to="/" className={mobileLinkStyles} onClick={() => setIsMenuOpen(false)}>Home</Link>
          
          {/* Versiuni simple pentru mobil la Dropdown-uri */}
          <MobileSection title="Despre DAIP" setIsMenuOpen={setIsMenuOpen}>
            <Link to="/misiunea-daip">Misiunea DAIP</Link>
            <Link to="/echipa-daip">Echipa DAIP</Link>
            <Link to="/rapoarte-daip">Rapoarte DAIP</Link>
          </MobileSection>

          <MobileSection title="Programe de finantare" setIsMenuOpen={setIsMenuOpen}>
            <Link to="/programe-operationale">Programe Operationale</Link>
            <Link to="/programe-nationale">Programe Nationale</Link>
            <Link to="/programe-gestionate-de-comisia-europeana">
              Programe gestionate de Comisia Europeana
            </Link>
            <Link to="/alte-finantari-si-instrumente-financiare">
              Alte finantari
            </Link>
          </MobileSection>

          <MobileSection title="Portofoliu proiecte" setIsMenuOpen={setIsMenuOpen}>
            <Link to="/proiecte-in-implementare">Proiecte in implementare</Link>
            <Link to="/proiecte-finalizate">Proiecte finalizate</Link>
            <Link to="/raportari-proiecte">Raportari proiecte</Link>
          </MobileSection>

          <MobileSection title="Proceduri" setIsMenuOpen={setIsMenuOpen}>
            <Link to="/accesare-finantari-nerambursabile">
              Accesare finantari nerambursabile
            </Link>
            <Link to="/consultanta-in-accesarea-si-implementarea-proiectelor">
              Consultanta în accesarea și implementarea proiectelor
            </Link>
            <Link to="/implementare-proiecte">Implementare proiecte</Link>
            <Link to="/informare-si-promovare">
              Informare și promovare
            </Link>
            <Link to="/monitorizare-si-recuperare-cheltuieli-neeligibile">
              Monitorizare și recuperare cheltuieli neeligibile
            </Link>
            <Link to="/selectie-echipa-proiect">Selectie echipa proiect</Link>
            <Link to="/selectie-parteneri">Selectie parteneri</Link>
          </MobileSection>

          <Link to="/anunturi-selectie-parteneri-proiecte" className={mobileLinkStyles} onClick={() => setIsMenuOpen(false)}>Anunturi selectie parteneri</Link>
          <Link to="/prezentare-proiecte" className={mobileLinkStyles} onClick={() => setIsMenuOpen(false)}>Prezentare proiecte</Link>



          <Link to="/buletin-informativ" className={mobileLinkStyles} onClick={() => setIsMenuOpen(false)}>Buletin informativ</Link>
          <Link to="/arhiva-selectie-echipe-proiecte" className={mobileLinkStyles} onClick={() => setIsMenuOpen(false)}>Arhiva selectie</Link>

        </div>
      )}
    </header>
  );
}

// DROPDOWN DESKTOP - Nemodificat (doar curățat whitespace)
function Dropdown({ title, children }) {
  return (
    <div className="relative group h-full">
      <Link
        to="#"
        className="h-full flex items-center text-sm font-medium text-blue-900 hover:text-yellow-500 transition-colors whitespace-nowrap"
        onClick={(e) => e.preventDefault()}
      >
        {title} ▾
      </Link>

      <div className="absolute left-0 top-full w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 z-50 pointer-events-none group-hover:pointer-events-auto">
        <div className="bg-white rounded-xl shadow-xl p-4 space-y-3 border border-gray-100">
          {React.Children.map(children, (child, index) => (
            <div key={index} className="text-sm text-blue-900 hover:text-yellow-500 transition-colors">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper pentru Mobil - ca să nu stricăm Dropdown-ul de desktop
function MobileSection({ title, children, setIsMenuOpen }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between py-3 px-4 text-base font-medium text-blue-900 bg-gray-50 border-b border-gray-100">
        {title} <ChevronDown size={18} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <div className="bg-white pl-8 flex flex-col">
          {React.Children.map(children, child => (
            <div onClick={() => setIsMenuOpen(false)} className="py-2 text-sm border-b border-gray-50 last:border-0">
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}