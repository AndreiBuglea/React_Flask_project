import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";

export default function Header() {
  const navItemStyles = 
    "h-full flex items-center text-sm font-medium text-blue-900 hover:text-yellow-500 transition-colors whitespace-nowrap px-1";

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 h-20">
      
      {/* LOGO */}
      <div className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-14 w-auto" />
        </Link>
      </div>

      {/* Container MENIU */}
      <div className="h-full flex items-center justify-center px-6 ml-40 lg:ml-64">
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
    </header>
  );
}

function Dropdown({ title, children }) {
  return (
    <div className="relative group h-full">
      <Link
        to="#"
        className="h-full flex items-center text-sm font-medium text-blue-900 hover:text-yellow-500 transition-colors whitespace-nowrap"
        onClick={(e) => e.preventDefault()} // împiedică scroll la # 
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