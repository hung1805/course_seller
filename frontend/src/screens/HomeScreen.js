import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts, listTopProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading: loading1, error: error1, products: topProducts } = productTopRated;
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <>
      {!keyword ? (
        <>
          <Image fluid className="w-100" src="/images/hero_image.jpg" />
          <h1>Latest Products</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              {/* <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} /> */}
            </>
          )}
          <h1>Top Rating Products</h1>
          {loading1 ? (
            <Loader />
          ) : error1 ? (
            <Message variant="danger">{error1}</Message>
          ) : (
            <>
              <Row>
                {topProducts.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              {/* <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} /> */}
            </>
          )}
        </>
      ) : (
        <Col>
          <Row>
            <Link to="/" className="btn btn-light">
              Go Back
            </Link>
          </Row>
          <Row>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant={"danger"}>{error}</Message>
            ) : (
              <>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
              </>
            )}
          </Row>
        </Col>
      )}
    </>
  );
};

export default HomeScreen;
