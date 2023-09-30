import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { payOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

const OrderScreen = ({ match, history }) => {
  // const orderDetails = useSelector((state) => state.orderDetails);
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading, success } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleAprove = (orderId, status) => {
    // history.push("/");
    dispatch({ type: CART_CLEAR_ITEMS });
    // dispatch({ type: USER_DETAILS_RESET });
    // dispatch({ type: ORDER_CREATE_RESET });
    if (status === "COMPLETED") {
      dispatch(payOrder(orderId, userInfo._id, orderCreate.order.orderItems));
    }
  };

  if (!orderCreate.orderItems) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    orderCreate.order.itemsPrice = addDecimals(orderCreate.order.orderItems.reduce((acc, item) => acc + item.price, 0));
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  // const successPaymentHandler = (paymentResult) => {
  //   console.log(paymentResult);
  //   dispatch(payOrder(orderId, paymentResult));
  // };

  // const deliverHandler = () => {
  //   dispatch(deliverOrder(order));
  // };

  return loading ? (
    <Loader />
  ) : success ? (
    <>
      <Message className="my-4">Order Is Paid</Message>
      <Link to={`/user/${userInfo._id}/my-courses`} className="btn btn-light">
        View My Courses
      </Link>
    </>
  ) : orderCreate.loading ? (
    <Loader />
  ) : (
    <>
      <h1>Order {orderCreate.order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Information: </h2>
              <p>
                <strong>Name: </strong> {orderCreate.order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${orderCreate.order.user.email}`}>{orderCreate.order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {orderCreate.order.shippingAddress.address}, {orderCreate.order.shippingAddress.city}{" "}
                {orderCreate.order.shippingAddress.postalCode}, {orderCreate.order.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {orderCreate.order.paymentMethod}
              </p>
              {orderCreate.order.isPaid ? (
                <Message variant="success">Paid on {orderCreate.order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderCreate.order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderCreate.order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>{item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${orderCreate.order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!orderCreate.order.isPaid && (
                <ListGroup.Item>
                  {loading && <Loader />}
                  <PayPalScriptProvider>
                    <PayPalButtons
                      onClick={(data, actions) => {
                        const hasAlreadyClicked = false;
                        if (hasAlreadyClicked) {
                          alert("Already Clicked");
                          return actions.reject();
                        } else return actions.resolve();
                      }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              description: orderCreate.order._id,
                              amount: {
                                value: orderCreate.order.itemsPrice,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const order = await actions.order.capture();

                        handleAprove(orderId, order.status);
                      }}
                      onCancel={() => {}}
                      onError={(error) => {
                        console.log(error);
                      }}
                    />
                  </PayPalScriptProvider>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
