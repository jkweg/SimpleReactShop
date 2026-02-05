import { useState } from "react";
import ProductCard from "./ProductCard";
import KoszykCard from "./KoszykCard";
import { Link, useNavigate } from "react-router-dom";

function Koszyk({ zawartosc, zmiana }) {
  let navigate = useNavigate();

  function naglowna() {
    navigate("/");
  }

  function kupione() {}

  return (
    <>
      {zawartosc.map((produkt) => (
        <KoszykCard product={produkt} zmianaKoszyka={zmiana} />
      ))}
      {zawartosc.length > 0 ? (
        <>
          {" "}
          <button onClick={naglowna}> Kup sobie cos jeszcze </button> <br />
          <Link to="/podsumowanie">
            <button onClick={kupione}>PODSUMOWANIE</button>
          </Link>{" "}
        </>
      ) : (
        <p> KOSZYK JEST PUSTY</p>
      )}
    </>
  );
}

export default Koszyk;
