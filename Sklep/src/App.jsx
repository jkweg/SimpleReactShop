import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Koszyk from "./Koszyk";
import { Route, Routes, useNavigate } from "react-router-dom";
import Logowanie from "./Logowanie";
import Rejestracja from "./Rejestracja";
import Podsumowanie from "./Podsumowanie";
import Profil from "./Profil";
import WymaganeLogowanie from "./WymaganeLogowanie";

function App() {
  const [filtr, setFiltr] = useState("");
  const navigate = useNavigate();

  const [zalogowany, setZalogowany] = useState(() => {
    return localStorage.getItem("zalogowanyUser") || null;
  });

  const [rzeczy, setRzeczy] = useState(() => {
    if (zalogowany) {
      const saved = localStorage.getItem(`koszyk_${zalogowany}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [historia, setHistoria] = useState(() => {
    if (zalogowany) {
      const saved = localStorage.getItem(`historia_${zalogowany}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [bazaOpinii, setBazaOpinii] = useState(() => {
    const saved = localStorage.getItem("wszystkie_opinie_db");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wszystkie_opinie_db", JSON.stringify(bazaOpinii));
  }, [bazaOpinii]);

  function dodajOpinieGlobalnie(nowaOpinia) {
    setBazaOpinii([...bazaOpinii, nowaOpinia]);
  }

  function usunOpinieGlobalnie(idOpinii) {
    setBazaOpinii(bazaOpinii.filter((opinia) => opinia.id !== idOpinii));
  }

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users_db");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    } else {
      return [
        { name: "gruby", haslo: "123" },
        { name: "krisa", haslo: "123" },
        { name: "lysy", haslo: "labodega" },
        { name: "prowadzacy", haslo: "arbuz" }, 
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem("users_db", JSON.stringify(users));
  }, [users]);

  function rejestruj(nowyUserObiekt) {
    const istnieje = users.find((u) => u.name === nowyUserObiekt.name);
    if (istnieje) {
      alert("Taki użytkownik już istnieje!");
      return;
    }
    setUsers([...users, nowyUserObiekt]);
  }

  function zalogujMnie(name) {
    setZalogowany(name);
    localStorage.setItem("zalogowanyUser", name);

    const userCart = JSON.parse(localStorage.getItem(`koszyk_${name}`)) || [];
    const userHistory =
      JSON.parse(localStorage.getItem(`historia_${name}`)) || [];

    setRzeczy(userCart);
    setHistoria(userHistory);
  }

  function wylogujMnie() {
    setZalogowany(null);
    localStorage.removeItem("zalogowanyUser");
    setRzeczy([]);
    setHistoria([]);
    navigate("/");
  }

  useEffect(() => {
    if (zalogowany) {
      localStorage.setItem(`koszyk_${zalogowany}`, JSON.stringify(rzeczy));
    }
  }, [rzeczy, zalogowany]);

  useEffect(() => {
    if (zalogowany) {
      localStorage.setItem(`historia_${zalogowany}`, JSON.stringify(historia));
    }
  }, [historia, zalogowany]);

  function dodawanieDoKoszyka(produkt, ilosc) {
    const istnieje = rzeczy.find((r) => r.id === produkt.id);
    if (istnieje) {
      setRzeczy(
        rzeczy.map((r) =>
          r.id === produkt.id
            ? { ...r, quantity: Number(r.quantity) + Number(ilosc) }
            : r,
        ),
      );
    } else {
      setRzeczy([...rzeczy, { ...produkt, quantity: ilosc }]);
    }
  }

  function zmianiaKoszyk(id, nowaIle) {
    if (nowaIle < 1) {
      setRzeczy((aktualneRzeczy) =>
        aktualneRzeczy.filter((item) => item.id !== id),
      );
    } else {
      setRzeczy((aktualneRzeczy) =>
        aktualneRzeczy.map((item) =>
          item.id === id ? { ...item, quantity: Number(nowaIle) } : item,
        ),
      );
    }
  }

  function cenaKoszyka() {
    return rzeczy.reduce(
      (suma, rzecz) => suma + rzecz.quantity * rzecz.price,
      0,
    );
  }

  function zlozZamowienie() {
    if (rzeczy.length === 0) {
      alert("Twój koszyk jest pusty!");
      return;
    }
    const noweZamowienie = {
      id: Date.now(),
      data: new Date().toLocaleString(),
      uzytkownik: zalogowany,
      produkty: [...rzeczy],
      lacznaCena: cenaKoszyka(),
    };

    setHistoria([...historia, noweZamowienie]);
    setRzeczy([]);

    alert("Dziękujemy za zakupy!");
    navigate("/profil");
  }

  return (
    <>
      <Navbar filtruj={setFiltr} kto={zalogowany} wyloguj={wylogujMnie} />

      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              Filtr={filtr}
              dodajDoKoszyka={dodawanieDoKoszyka}
              kto={zalogowany}
              wszystkieOpinie={bazaOpinii}
              dodajOpinieApp={dodajOpinieGlobalnie}
              usunOpinieApp={usunOpinieGlobalnie}
            />
          }
        />

        <Route
          path="/logowanie"
          element={
            <Logowanie bazaUserow={users} ustawZalogowany={zalogujMnie} />
          }
        />

        <Route
          path="/rejestracja"
          element={<Rejestracja dodajUsera={rejestruj} />}
        />

        <Route
          path="/koszyk"
          element={
            <WymaganeLogowanie kto={zalogowany}>
              <Koszyk zawartosc={rzeczy} zmiana={zmianiaKoszyk} />
            </WymaganeLogowanie>
          }
        />

        <Route
          path="/podsumowanie"
          element={
            <WymaganeLogowanie kto={zalogowany}>
              <Podsumowanie
                obliczCene={cenaKoszyka}
                zlozZamowienie={zlozZamowienie}
              />
            </WymaganeLogowanie>
          }
        />

        <Route
          path="/profil"
          element={
            <WymaganeLogowanie kto={zalogowany}>
              <Profil kto={zalogowany} historia={historia} />
            </WymaganeLogowanie>
          }
        />
      </Routes>
    </>
  );
}

export default App;