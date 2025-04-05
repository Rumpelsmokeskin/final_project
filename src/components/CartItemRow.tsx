import type { CartItem, Sauna } from "../types";
//delete fetch
export async function deleteCartItem(CartItem: CartItem) {
  const response = await fetch("http://localhost:3000/cart/" + CartItem.id, {
    method: "DELETE",
  });
  return response;
}
type Props = {
  item: CartItem;
  saunas: Sauna[];
  onDelete: (id: number) => void;
};


export default function CartItemRow({ item, saunas, onDelete }: Props) {
  const sauna = saunas.find((sauna) => sauna.id === item.saunaId);

  return (
    <tr>
      <td> {sauna?.name || "PRODUCT NOT FOUND"}</td>
      <td>${sauna?.price}</td>
      <td> {item.amount}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={async () => {
            await deleteCartItem(item);
            onDelete(item.id); // Notify parent to update state
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
}
