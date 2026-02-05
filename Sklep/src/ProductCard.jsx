import { useState } from "react";

function ProductCard({
  product,
  dodaj,
  aktualnyUser,
  bazaOpinii,
  dodajDoBazy,
  usunZBazy,
}) {
  const [widoczny, setWidoczny] = useState(false);
  const [ilosc, setIlosc] = useState(1);
  const [form, setForm] = useState({ text: "", email: "", stars: 5 });
  const [error, setError] = useState("");

  const opinieTegoProduktu = bazaOpinii.filter(
    (op) => op.productId === product.id,
  );

  function showSzczegoly() {
    setWidoczny(!widoczny);
  }

  function dodajOpinie() {
    setError("");

    if (!aktualnyUser) {
      alert("Musisz być zalogowany, żeby dodać opinię!");
      return;
    }

    if (!form.text || !form.email) {
      setError("Wypełnij treść i email!");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Podaj poprawny email!");
      return;
    }

    const juzDodal = opinieTegoProduktu.find((o) => o.user === aktualnyUser);
    if (juzDodal) {
      alert("Już dodałeś opinię do tego produktu! Nie oszukuj ;)");
      return;
    }

    const nowaOpinia = {
      id: Date.now(),
      productId: product.id, 
      user: aktualnyUser,
      email: form.email,
      text: form.text,
      stars: Number(form.stars),
    };

    dodajDoBazy(nowaOpinia);
    setForm({ text: "", email: "", stars: 5 });
    alert("Opinia dodana!");
  }

  function usunKomentarz(idOpinii) {
    if (window.confirm("Na pewno usunąć?")) {
      usunZBazy(idOpinii);
    }
  }

  const dostepnaIlosc = product.rating ? product.rating.count : 50;

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />

      <h4>{product.title}</h4>
      <p className="price">{product.price} $</p>
      <p className="category">{product.category}</p>

      <p
        style={{
          color: "#00b894",
          fontSize: "0.85rem",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        Dostępnych sztuk: {dostepnaIlosc}
      </p>

      <div className="card-actions">
        <button
          onClick={showSzczegoly}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          {widoczny ? "Ukryj" : "Szczegóły i Opinie"}
        </button>

        {widoczny && (
          <div
            style={{
              marginBottom: "15px",
              textAlign: "left",
              fontSize: "0.9rem",
            }}
          >
            <p style={{ marginBottom: "10px", fontStyle: "italic" }}>
              {" "}
              {product.description}{" "}
            </p>

            <div
              style={{
                backgroundColor: "#f5f6fa",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <h5 style={{ marginBottom: "10px" }}>
                Opinie ({opinieTegoProduktu.length}):
              </h5>

              <ul
                style={{ listStyle: "none", padding: 0, marginBottom: "15px" }}
              >
                {opinieTegoProduktu.map((op) => {
                  const czyToAdmin = aktualnyUser === "prowadzacy";
                  const czyToMoje = aktualnyUser === op.user;
                  const mogeUsunac = czyToAdmin || czyToMoje;

                  return (
                    <li
                      key={op.id}
                      style={{
                        fontSize: "12px",
                        borderBottom: "1px solid #eee",
                        padding: "8px 0",
                        position: "relative",
                      }}
                    >
                      <strong>{op.user}</strong>{" "}
                      <span style={{ color: "gold" }}>
                        {"★".repeat(op.stars)}
                      </span>
                      <br />
                      <span style={{ color: "#888", fontSize: "10px" }}>
                        {op.email}
                      </span>
                      <p style={{ marginTop: "2px" }}>{op.text}</p>
                      {mogeUsunac && (
                        <button
                          onClick={() => usunKomentarz(op.id)}
                          style={{
                            position: "absolute",
                            right: 0,
                            top: "10px",
                            backgroundColor: "red",
                            padding: "2px 6px",
                            fontSize: "10px",
                          }}
                        >
                          USUŃ
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>

              {aktualnyUser ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                    Dodaj swoją opinię:
                  </p>

                  <input
                    type="email"
                    placeholder="Twój e-mail"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    style={{
                      padding: "5px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                  />

                  <textarea
                    placeholder="Treść opinii..."
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    style={{
                      padding: "5px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      resize: "vertical",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <label style={{ fontSize: "12px" }}>Ocena:</label>
                    <select
                      value={form.stars}
                      onChange={(e) =>
                        setForm({ ...form, stars: e.target.value })
                      }
                      style={{ padding: "5px" }}
                    >
                      <option value="5">★★★★★ (5)</option>
                      <option value="4">★★★★ (4)</option>
                      <option value="3">★★★ (3)</option>
                      <option value="2">★★ (2)</option>
                      <option value="1">★ (1)</option>
                    </select>
                  </div>

                  {error && (
                    <p style={{ color: "red", fontSize: "11px" }}>{error}</p>
                  )}

                  <button
                    onClick={dodajOpinie}
                    style={{ marginTop: "5px", fontSize: "11px" }}
                  >
                    Wyślij opinię
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: "11px", color: "red" }}>
                  Zaloguj się, aby dodać opinię.
                </p>
              )}
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <input
            value={ilosc}
            type="number"
            min="1"
            max={dostepnaIlosc}
            onChange={(e) => setIlosc(e.target.value)}
          />
          <button
            onClick={() => dodaj(product, ilosc)}
            style={{ flexGrow: 1, marginLeft: "10px" }}
          >
            + Do koszyka
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;