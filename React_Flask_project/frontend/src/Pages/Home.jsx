// frontend/src/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Article, Event, Campaign, Groups } from "@mui/icons-material";

// MUTĂM DATELE AICI (Hardcoded pentru stabilitate)
const HOME_CONTENT = {
  title: "Departamentul de Accesare și Implementare Proiecte",
  bannerImage: "/uploads/2021/12/Poza-Meniu-1536x248.png",
  description: `Misiunea DAIP este de a sprijini dezvoltarea instituțională a Universității de Vest din Timișoara prin intermediul identificării, accesării și implementării instrumentelor de finanțare nerambursabilă care să permită finanțarea obiectivelor strategice ale universității asumate în planul managerial și în strategia de dezvoltare instituțională.`,
};

const cardData = [
  {
    title: "Noutăți",
    description: "Ultimele noutăți din cadrul proiectelor și activităților DAIP.",
    icon: <Article style={{ fontSize: 40 }} />,
    link: "/noutati",
  },
  {
    title: "Evenimente",
    description: "Calendarul evenimentelor și workshop-urilor desfășurate de DAIP.",
    icon: <Event style={{ fontSize: 40 }} />,
    link: "/evenimente",
  },
  {
    title: "Comunicate de presă",
    description: "Toate comunicările oficiale privind proiectele implementate.",
    icon: <Campaign style={{ fontSize: 40 }} />,
    link: "/comunicate-de-presa-proiecte",
  },
  {
    title: "Selecție Echipe",
    description: "Anunțurile pentru selectarea echipelor implicate în proiecte.",
    icon: <Groups style={{ fontSize: 40 }} />,
    link: "/anunturi-selectie-echipe-proiecte-scrape",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      
      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
          {HOME_CONTENT.title}
        </h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-8"></div>
      </div>

      {/* MAIN CONTENT CARD */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-b-4 border-yellow-400">
          {/* Banner Image */}
          <div className="w-full">
            <img 
              src={HOME_CONTENT.bannerImage} 
              alt="UVT DAIP Banner" 
              className="w-full h-auto object-cover"
              onError={(e) => e.target.style.display='none'} // Ascunde dacă imaginea nu se încarcă
            />
          </div>
          
          <div className="p-8 md:p-12 text-center md:text-left">
            <p className="text-blue-900 leading-relaxed text-xl font-light italic">
              {HOME_CONTENT.description}
            </p>
          </div>
        </div>
      </div>

      {/* CTA CONTACT */}
      <div className="text-center mb-16">
        <Link to="/contact">
          <button className="bg-yellow-400 text-blue-900 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-blue-900 hover:text-yellow-400 transition-all duration-300 hover:scale-105 uppercase tracking-widest">
            Contactează-ne
          </button>
        </Link>
      </div>

      {/* NAVIGATION GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card, index) => (
            <Link key={index} to={card.link} className="h-full">
              <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full flex flex-col items-center border border-gray-100">
                <div className="flex justify-center mb-5 text-yellow-500 group-hover:text-blue-900 transition-colors duration-300 bg-blue-50 p-4 rounded-2xl">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}