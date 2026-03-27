import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Article,
  Event,
  Campaign,
  Groups,
} from "@mui/icons-material";

export default function Home() {
  const [page, setPage] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch("/api/page/home")
      .then((res) => res.json())
      .then((data) => setPage(data))
      .catch((err) => console.error(err));
  }, []);

  const cardData = [
    {
      title: "Noutăți",
      description:
        "Ultimele noutăți din cadrul proiectelor și activităților DAIP.",
      icon: <Article style={{ fontSize: 40 }} />,
      link: "/noutati",
    },
    {
      title: "Evenimente",
      description:
        "Calendarul evenimentelor și workshop-urilor desfășurate de DAIP.",
      icon: <Event style={{ fontSize: 40 }} />,
      link: "/evenimente",
    },
    {
      title: "Comunicate de presă proiecte",
      description:
        "Toate comunicările oficiale privind proiectele implementate.",
      icon: <Campaign style={{ fontSize: 40 }} />,
      link: "/comunicate-de-presa-proiecte",
    },
    {
      title: "Anunțuri selecție echipe proiecte",
      description:
        "Anunțurile pentru selectarea echipelor implicate în proiecte.",
      icon: <Groups style={{ fontSize: 40 }} />,
      link: "/anunturi-selectie-echipe-proiecte-scrape",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
          {page.title}
        </h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-8"></div>
      </div>

      {/* CONTENT CARD */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-yellow-400">
          <div
            dangerouslySetInnerHTML={{ __html: page.content }}
            className="text-blue-900 leading-8 text-lg"
          />
        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="text-center mb-16">
        <Link to="/contact">
          <button className="bg-yellow-400 text-blue-900 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-blue-900 hover:text-yellow-400 transition-all duration-300 hover:scale-105">
            Contact
          </button>
        </Link>
      </div>

      {/* CARD GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {cardData.map((card, index) => (
    <Link key={index} to={card.link}>
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full flex flex-col justify-between">

        <div className="flex justify-center mb-4 text-yellow-400 group-hover:text-blue-900 transition-colors duration-300">
          {card.icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            {card.title}
          </h3>

          <p className="text-sm text-gray-600 leading-6">
            {card.description}
          </p>
        </div>

      </div>
    </Link>
  ))}
</div>
      </div>

    </div>
  );
}