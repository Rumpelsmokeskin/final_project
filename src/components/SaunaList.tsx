import { useEffect, useState } from "react";
import type { Sauna } from "../types";


export default function SaunaList() {
//state
  const [saunas, setSaunas] = useState<Sauna[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading(true);
    const asyncFunction = async () => {

        setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/saunas");

        if (!response.ok) {
          setError("Failed to load saunas " + response.statusText);
        } else {
          const data = await response.json();
          setSaunas(data);
          setError(null);
        }
      } catch (error: any) {
        setError("Failed to load saunas: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    asyncFunction();
  }, []);

  const addToCart = async (saunaId: number) => {
    const newCartItem = {
      saunaId: saunaId,
      amount: 1,
    }

    try{
    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      body: JSON.stringify(newCartItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if(!response.ok) {
        setError(response.statusText);
    } 
    } catch (error: any) {
        setError(error.message);
    }
    setIsPosting(false)
    
  };

  return (
    <>
    <h2 className="display-5 mb-4">Check Out Our Steamy Saunas!</h2>
    <div className="d-flex flex-wrap, gap-3">
      <div className="d-flex flex-wrap gap-3">
        {loading && <p className="text-body-tertiary">Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {saunas.map((sauna) => (
          <div className="card flex-grow-1" key={sauna.id}>
            <div className="card-body">
              <div className="card-title">
                <h3>{sauna.name}</h3>
              </div>
              <div className="card-text">
                <p>Type: {sauna.type}</p>
                <button
                  className="btn btn-secondary"
                  disabled={isPosting}
                  onClick={() => addToCart(sauna.id)}
                >
                 { isPosting ? "Adding.." : "$" + sauna.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        ))}
      
      </div>
      </div>
    </>
  );
}
