import React from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import ProviderRegisTationSceen from "./screens/ProviderRegisTationSceen";
import AddProduct from "./screens/AddProduct";
import MyProduct from "./screens/MyProduct";
import ProviderInfoScreen from "./screens/ProviderInfoScreen";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AcceptProvider from "./screens/AcceptProvider";
import AddLessonScreen from "./screens/AddLessonScreen";
import UserCourses from "./screens/UserCourses";

const App = () => {
  return (
    <Router>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
          // currency: "USD",
        }}
      >
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/admin/productlist" component={ProductListScreen} exact />
            <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
            <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
            <Route path="/provider-registation" component={ProviderRegisTationSceen} exact />
            <Route path="/" component={HomeScreen} exact />
            <Route path="/provider/new_product" component={AddProduct} exact />
            <Route path="/provider/my_products" component={MyProduct} exact />
            <Route path="provider/:id" component={ProviderInfoScreen} exact />
            <Route path="/admin/accept-provider" component={AcceptProvider} exact />
            <Route path="/provider/add-lesson" component={AddLessonScreen} exact />
            <Route path="/user/:id/my-courses" component={UserCourses} exact />
          </Container>
        </main>
        <Footer />
      </PayPalScriptProvider>
    </Router>
  );
};

export default App;
