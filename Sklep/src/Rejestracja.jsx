import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Rejestracja({ dodajUsera }) {
  const [user, setUser] = useState("");
  const [haslo, setHaslo] = useState("");
  const [haslo2, setHaslo2] = useState("");

  function handleUserChange(event) {
    setUser(event.target.value);
  }

  function handleHasloChange(event) {
    setHaslo(event.target.value);
  }

  function handleHasloChange2(event) {
    setHaslo2(event.target.value);
  }

  const navigate = useNavigate();

  function ogarnijRejestracje() {
    if (user === "" || haslo === "") {
      alert("Wypełnij pola!");
      return;
    }
    if (haslo !== haslo2) {
      alert("Hasła muszą być takie same!");
      return;
    }

    const nowyWariat = {
      name: user,
      haslo: haslo,
    };

    dodajUsera(nowyWariat);
    alert("Konto założone! Teraz się zaloguj.");
    navigate("/logowanie");
  }
  return (
    <>
      <div className="form-container">
        <label> Nazwa uzytkowanika: </label>
        <input type="text" value={user} onChange={handleUserChange} />
        <br />
        <label> Haslo: </label>
        <input type="text" value={haslo} onChange={handleHasloChange} />
        <br />
        <label> Powtorz haslo: </label>
        <input type="text" value={haslo2} onChange={handleHasloChange2} />{" "}
        <br />
        <button onClick={ogarnijRejestracje}> Zarejestruj sie </button>
      </div>
    </>
  );
}

export default Rejestracja;
