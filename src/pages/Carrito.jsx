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
            <th>Total</th>
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
      </Table>
    </>
  );
}
