import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const MyProduct = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async (providerId) => {
      const config = {
        Authorization: `Bearer ${userInfo.token}`,
      };
      setLoading(true);
      const { data } = await axios.get(`/api/provider/${providerId}/all_products`, config);
      if (data) {
        setProducts(data);
        setLoading(false);
      } else {
        setError("No Course");
        setLoading(false);
      }
    };
    fetchData(userInfo._id);
  }, [userInfo._id, userInfo.token]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : products && products.length === 0 ? (
        <Col>
          <Message> You have no course for sale</Message>
          <LinkContainer to={"/provider/new_product"}>
            <Button>Add New Course</Button>
          </LinkContainer>
        </Col>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MyProduct;
