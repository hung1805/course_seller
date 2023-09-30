import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "User",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Provider",
  },
  {
    name: "provider1",
    email: "provider1@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Provider",
  },
];

export default users;
