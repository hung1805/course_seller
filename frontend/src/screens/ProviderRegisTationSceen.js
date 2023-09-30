import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { registProvider } from "../actions/providerAction";
import { USER_REGISTER_INFO_CLEAR } from "../constants/userConstants";

const ProviderRegisTationSceen = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const [error, setError] = useState("");
  const [providerInfo, setProviderInfo] = useState({
    userId: userInfo._id,
    phone: "",
    address: "",
    description: "",
    image: "",
  });

  const provider = useSelector((state) => state.provider);
  console.log(provider);
  const [image, setImage] = useState("");
  // const [video, setVideo] = useState("");

  const [uploading, setUploading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(registProvider(providerInfo));
  };

  const clearRegisterInfo = () => {
    dispatch({
      type: USER_REGISTER_INFO_CLEAR,
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload/images", formData, config);

      setImage(data);
      setProviderInfo({ ...providerInfo, image: data });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      {provider.loading ? (
        <Loader />
      ) : provider.error ? (
        <Message variant={"danger"}>{provider.error}</Message>
      ) : provider.data.userId ? (
        <Col>
          <Link to="/" onClick={clearRegisterInfo} className="btn btn-light my-3">
            Go Back
          </Link>
          <Message variant={"success"}>Your registation has been submitted.</Message>
        </Col>
      ) : (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Row>
            <Col>
              <FormContainer>
                <h1>Provider Your Information</h1>
                {error && <Message variant={"danger"}>{error}</Message>}
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" readOnly value={userInfo.name}></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" readOnly value={userInfo.email}></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="phone">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="phone"
                      placeholder="Your Contact Number"
                      value={providerInfo.phone}
                      onChange={(e) => {
                        setProviderInfo({ ...providerInfo, phone: e.target.value });
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="address"
                      placeholder="Your Current Address"
                      value={providerInfo.address}
                      onChange={(e) => {
                        setProviderInfo({ ...providerInfo, address: e.target.value });
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>About Your Copany</Form.Label>
                    <Form.Control
                      type="description"
                      as="textarea"
                      rows={3}
                      placeholder="Something About Your Company"
                      value={providerInfo.description}
                      onChange={(e) => {
                        setProviderInfo({ ...providerInfo, description: e.target.value });
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="image">
                    <Form.Label>Your Avatar</Form.Label>
                    <Form.Control
                      type="image"
                      placeholder="Enter Image Url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.File id="image" label={"Choose File"} custom onChange={uploadFileHandler}></Form.File>
                    {uploading && <Loader />}
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              </FormContainer>
            </Col>
            <Col xs={12} md={6}>
              {image && (
                <Image width="350px" height="350px" className=" mx-5 my-4 overflow-hidden rounded-circle" src={image} />
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProviderRegisTationSceen;
