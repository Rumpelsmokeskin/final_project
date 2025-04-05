import { useEffect, useState } from "react";
import type { CartItem, Sauna } from "../types";
import CartItemRow from "./CartItemRow";


export default function CartList() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [saunas, setSaunas] = useState<Sauna[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/cart");
        if (!response.ok) {
          setError("Failed to load cart items " + response.statusText);
        } else {
          const data = await response.json();
          setCartItems(data);
        }
      } catch (error: any) {
        setError("Failed to load cart items: " + error.message);
      }
      setLoading(false);
    };
    fetchCart();

    const fetchSauna = async () => {

        setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/saunas");

        if (!response.ok) {
          setError("Failed to load saunas " + response.statusText);
        } else {
          const data = await response.json();
          setSaunas(data);
          setError("");
        }
      } catch (error: any) {
        setError("Failed to load saunas: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSauna();
  }, []);

  return (
    <>
    <h2 className="display-5 mb-4">Your Cart</h2>
      {loading ? <p className="text-body-tertiary">Loading...</p> : 
      error ? <p className="text-danger">{ error }</p> :
        <table className="table table-striped">
          <tbody>
            {cartItems.map((item) => (
              <CartItemRow 
              key={item.id} 
              item={item} 
              saunas={saunas}
              onDelete={(deletedItemId) =>
                setCartItems(cartItems.filter((i) => i.id !== deletedItemId))
              } />
            ))}
          </tbody>
        </table>
      }
    </>
  );
}
