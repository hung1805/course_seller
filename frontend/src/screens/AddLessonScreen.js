import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../actions/providerAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ReactPlayer from "react-player";
import { ADD_COURSE_LESSONS, ADD_COURSE_TO_SERVER_REQUEST, CLEAR_COURSE_ADDED_INFO } from "../constants/userConstants";

const AddLessonScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const course = useSelector((state) => state.providerAddCourse);

  const [video, setVideo] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [lessonType, setLessonType] = useState("video");
  const [summary, setSummary] = useState([]);
  const [question, setQuestion] = useState("");
  const [ans, setAns] = useState("");

  const uploadVideoHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload/videos", formData, config);

      setVideoUrl(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lessonType === "video") {
      if (!name || !videoUrl || !purpose) {
        setErr("Please fill the input");
      } else {
        dispatch({
          type: ADD_COURSE_LESSONS,
          payload: { type: "video", name, videoUrl, purpose },
        });
        setName("");
        setPurpose("");
        setVideo();
        setVideoUrl("");
      }
    }
    if (lessonType === "summary") {
      if (summary.length === 0) {
        setErr("Please Add Questions and Answers");
      } else {
        dispatch({
          type: ADD_COURSE_LESSONS,
          payload: {
            type: "summary",
            name: "Summary",
            summary,
          },
        });
        setSummary([]);
      }
    }
  };

  const handleAddCourse = () => {
    dispatch({ type: ADD_COURSE_TO_SERVER_REQUEST });
    dispatch(addNewProduct({ data: course.data, lessons: course.lessons, providerId: userInfo._id }));
  };
  const handleAddNewCourse = () => {
    dispatch({ type: CLEAR_COURSE_ADDED_INFO });
    history.push("/provider/new_product");
  };
  const handleAddQues = (e) => {
    if (!question || !ans) {
      setErr("Please Fill Input");
    } else {
      setSummary([...summary, { ques: question, ans }]);
      setQuestion("");
      setAns("");
      setErr("");
    }
  };

  return (
    <Col>
      {course.error ? (
        <Message variant={"danger"}>{course.error}</Message>
      ) : course.message ? (
        <>
          <Message variant={"success"}>{course.message}</Message>
          <Button className="mr-3" onClick={handleAddNewCourse}>
            Add New Course
          </Button>
          <Button onClick={() => history.push("/")}>Back</Button>
        </>
      ) : (
        <>
          <h1>Add Lessons</h1>
          <Row className="my-2">
            <Col>
              <select name="lessonType" id="lessonType" onChange={(e) => setLessonType(e.target.value)}>
                <option value="video">Video Lesson</option>
                <option value="summary">Summary Lesson</option>
              </select>
            </Col>
          </Row>
          {lessonType === "video" && (
            <Form>
              {err && <Message variant={"danger"}>{err}</Message>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Lesson Purpose</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  placeholder="What Learner Can Learn From This Lesson"
                  value={purpose}
                  onChange={(e) => {
                    setPurpose(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="video">
                <Form.Label>Upload Your Video</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Enter Video URL"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                ></Form.Control>
                <Form.File id="image" label={"Choose File"} custom onChange={uploadVideoHandler}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              {videoUrl && (
                <Form.Group>
                  <ReactPlayer url={`http://localhost:3000/${videoUrl}`} width={640} height={360} controls />
                </Form.Group>
              )}
              <Button type="submit" onClick={handleSubmit}>
                Add Lesson
              </Button>
              <Button className="ml-2" disabled={course.lessons.length === 0} onClick={handleAddCourse}>
                Add Course
              </Button>
            </Form>
          )}
          {lessonType === "summary" && (
            <>
              <Form className="my-2">
                <Form.Group controlId="question">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="ans">
                  <Form.Label>Answer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Correct Answer"
                    value={ans}
                    onChange={(e) => setAns(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button onClick={handleAddQues}>Add Question</Button>
                <Button className="ml-2" type="submit" onClick={handleSubmit}>
                  Add Lesson
                </Button>
                <Button className="ml-2" disabled={course.lessons.length === 0} onClick={handleAddCourse}>
                  Add Course
                </Button>
              </Form>
              {summary.length > 0 && (
                <>
                  {summary.map((item, index) => (
                    <Col key={index}>
                      <p>
                        {index + 1}. {item.ques}
                      </p>
                      <p>{item.ans}</p>
                    </Col>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </Col>
  );
};

export default AddLessonScreen;
