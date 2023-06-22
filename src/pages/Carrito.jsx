import React from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/manager/managerSlice";
import data from "../util/data.json";

export default function Carrito() {
  const products = data.products;
  const history = useHistory();
  const cart = useSelector((state) => state.manager.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleClick = () => {
    history.push("/");
  };

  const subtotal = cart.reduce((total, item) => {
    const { productId, quantity } = item;
    const product = products.find((p) => p.id === productId);
    if (product) {
      return total + product.price * quantity;
    }
    return total;
  }, 0);

  let descuento = 0;
  let total = 0;

  if (subtotal) {
    descuento = 10;
    total = subtotal - descuento;
  }

  return (
    <>
      <h1>Carrito</h1>
      <Button
        variant="dark"
        style={{ marginBottom: "10px" }}
        onClick={handleClick}
      >
        Productos
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Importe</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            const { productId, quantity } = item;
            const product = products.find((p) => p.id === productId);

            if (!product) {
              return null;
            }

            const totalPrice = product.price * quantity;

            return (
              <tr key={productId}>
                <td>{quantity}</td>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>$ {totalPrice}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFromCart(productId)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2"></td>
            <td>
              <strong>Subtotal:</strong>
            </td>
            <td>$ {subtotal}</td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td>
              <strong>Descuento:</strong>
            </td>
            <td>$ {descuento.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td>
              <strong>Total:</strong>
            </td>
            <td>$ {total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
