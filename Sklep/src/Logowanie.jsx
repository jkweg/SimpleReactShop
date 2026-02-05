import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Logowanie({ bazaUserow, ustawZalogowany }) {
  const [user, setUser] = useState("");
  const [haslo, setHaslo] = useState("");
  const [zalogowany, setZalogowany] = useState("");

  function handleUserChange(event) {
    setUser(event.target.value);
  }

  function handleHasloChange(event) {
    setHaslo(event.target.value);
  }

  const navigate = useNavigate();

  function przeniesNaGlowna() {
    navigate("/");
  }

  function checkUser() {
    let czyZnaleziono = false;
    let znalezionyUzytkownik = null;
    for (let i = 0; i < bazaUserow.length; i++) {
      const uzytkownik = bazaUserow[i];

      if (uzytkownik.name === user && uzytkownik.haslo === haslo) {
        czyZnaleziono = true;
        setZalogowany(uzytkownik.name);
        znalezionyUzytkownik = uzytkownik.name;
        break;
      }
    }

    if (czyZnaleziono) {
      ustawZalogowany(znalezionyUzytkownik);
      przeniesNaGlowna();
    } else {
      window.alert("ZLEEEE");
      setZalogowany("");
    }
  }

  return (
    <>
      <div className="form-container">
        <label> Nazwa uzytkowanika: </label>
        <input type="text" value={user} onChange={handleUserChange} />

        <br />

        <label> Haslo </label>
        <input type="text" value={haslo} onChange={handleHasloChange} />

        <br />

        <button onClick={checkUser}> Zaloguj sie wariacie </button>

        <p> NIE MA KONTA WARIACIE?</p>

        <Link to="/rejestracja">
          <button>Zarejestruj sie Kocie 🐈!</button>
        </Link>
      </div>
    </>
  );
}

export default Logowanie;
