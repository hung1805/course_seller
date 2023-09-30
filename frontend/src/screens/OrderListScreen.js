import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    if (userInfo && userInfo.role === "Admin") {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  // useEffect(() => {
  //   if (orders.length > 0) {
  //     const totalIncome = orders.reduce((acc, order) => {
  //       const orderPrice = order.orderItems.reduce((acc, item) => acc + item.price, 0);
  //       return acc + orderPrice;
  //     }, 0);
  //     setTotalIncome(totalIncome);
  //   }
  // }, [orders]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.orderItems.reduce((acc, item) => acc + item.price, 0)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfooter>
            <h4 className="mt-2">
              Total income $
              {orders.reduce((acc, order) => {
                const orderPrice = order.orderItems.reduce((acc, item) => acc + item.price, 0);
                return acc + orderPrice;
              }, 0)}
            </h4>
          </tfooter>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
