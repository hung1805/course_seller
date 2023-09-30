import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { ADD_COURSE_DATA } from "../constants/userConstants";

const AddProduct = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !image || !price || !category || !description) {
      setError("Please fill all the input");
    } else {
      setError("");
      dispatch({ type: ADD_COURSE_DATA, payload: { name, price, category, description, image } });
      history.push("/provider/add-lesson");
    }

    // const { data } = await axios.post("/api/provider/add_new_product", {
    //   name,
    //   price,
    //   description,
    //   image,
    //   category,
    //   providerId: userInfo._id,
    // });
    // if (data) {
    //   setMessage("Add Course Successfully!");
    //   setName("");
    //   setCategory("");
    //   setDescription("");
    //   setImage("");
    //   setPrice(0);
    // } else setError("Fail to add new course");
  };

  return (
    <Col>
      {error && <Message variant={"danger"}>{error}</Message>}
      <>
        <h1>Add New Course</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}></Form.File>
            {uploading && <Loader />}
          </Form.Group>
          {image && (
            <Form.Group>
              <Image src={image} width={600} height={360} />
            </Form.Group>
          )}
          <Button type="submit" variant="primary">
            Next
          </Button>
        </Form>
      </>
    </Col>
  );
};

export default AddProduct;
