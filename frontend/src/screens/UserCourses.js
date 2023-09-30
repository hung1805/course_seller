import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { Link } from "react-router-dom";

const UserCourses = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUserCourses = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`/api/users/${userInfo._id}/my-courses`, config);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.mesage);
        setLoading(false);
      }
    };
    getUserCourses();
  }, [userInfo._id, userInfo.token]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : data.length === 0 ? (
        <Col>
          <Link to="/" className="btn btn-light my-3">
            Find Course
          </Link>
          <Message>You Have No Course</Message>
        </Col>
      ) : (
        <Row>
          {data.length > 0 &&
            data.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default UserCourses;
