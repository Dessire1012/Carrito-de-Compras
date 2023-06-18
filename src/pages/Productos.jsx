import React from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../features/manager/managerSlice";
import data from "../util/data.json";

export default function Productos() {
  const products = data.products;
  const history = useHistory();
  const cart = useSelector((state) => state.manager.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (productId, quantity) => {
    if (quantity > 0) {
      const selectedProduct = products.find(
        (product) => product.id === productId
      );
      const existingCartItem = cart.find(
        (item) => item.productId === productId
      );

      if (existingCartItem) {
        dispatch(updateQuantity({ productId, quantity }));
      } else {
        dispatch(addToCart({ productId, quantity }));
      }
    }
  };

  const handleQuantityChange = (productId, value) => {
    dispatch(updateQuantity({ productId, quantity: value }));
  };

  const handleClick = () => {
    history.push("/carrito");
  };

  return (
    <>
      <h1>Productos</h1>
      <Button
        variant="warning"
        style={{ marginBottom: "10px" }}
        onClick={handleClick}
      >
        Ver Carrito
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>$ {product.price}</td>
              <td style={{ width: "350px" }}>
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  {cart.find((item) => item.productId === product.id) ? (
                    <Button variant="info">Agregado al carrito</Button>
                  ) : (
                    <>
                      <input
                        type="number"
                        style={{ width: "150px" }}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <Button
                        variant="primary"
                        onClick={(e) =>
                          handleAddToCart(
                            product.id,
                            parseInt(e.target.previousElementSibling.value, 10)
                          )
                        }
                      >
                        Agregar al carrito
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
