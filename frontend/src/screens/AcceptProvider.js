import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Image, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AcceptProvider = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`/api/provider/register`, config);
        if (data) {
          // setRegisters(data);
          const abc = async () => {
            let promise = data.map(async (register) => {
              const { data } = await axios.get(`/api/provider/${register.userId}`);
              return data;
            });
            return await Promise.all(promise);
          };
          const dat = await abc();
          const data1 = dat.map((item, index) => {
            return { ...item, ...data[index] };
          });
          setRegisters(data1);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setErr(error.message);
        setLoading(false);
      }
    };
    fetchProviderData();
  }, [userInfo.token]);

  useEffect(() => {
    if (userInfo.role !== "Admin") {
      history.push("/login");
    }
  }, [history, userInfo.role]);

  const handleAcceptProvider = async (providerId, userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const data1 = await axios.put(`/api/users/${userId}`, { role: "Provider" }, config);
      const data2 = await axios.put(`/api/provider/${providerId}`, { status: "active" }, config);

      const dat = { ...data1.data, ...data2.data };
      if (dat) {
        const temp = registers.filter((item) => item.userId !== dat.userId);
        setRegisters(temp);
        // history.push("/admin/accept-provider");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDontAcceptProvider = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.delete(`/api/provider/register/${id}`, config);
      if (res.status === 200) {
        const temp = registers.filter((item) => item._id !== id);
        // console.log(temp);
        setRegisters(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : err ? (
        <Message className="my-4" variant={"danger"}>
          {err}
        </Message>
      ) : registers.length === 0 ? (
        <Message className="my-4">No Provider Need To Be Accepted</Message>
      ) : (
        <Col>
          {registers && (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>PHONE</th>
                  <th>ADDRESS</th>
                  <th>DESCRIPTION</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {registers.map((register, index) => (
                  <tr key={register._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image width={50} height={50} src={register.image} />
                    </td>
                    <td>{register.name}</td>
                    <td>{register.phone}</td>
                    <td>{register.address}</td>
                    <td>{register.description}</td>
                    <td>{register.status.toUpperCase()}</td>
                    <td>
                      <Button
                        variant="light"
                        className="btn-sm"
                        onClick={() => handleAcceptProvider(register._id, register.userId)}
                      >
                        Accept
                      </Button>
                    </td>
                    <td>
                      <i
                        className="fas fa-times"
                        style={{ color: "red" }}
                        onClick={() => handleDontAcceptProvider(register._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      )}
    </>
  );
};

export default AcceptProvider;
