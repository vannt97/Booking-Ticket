import "./App.css";
import { createBrowserHistory } from "history";
import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  useHistory,
} from "react-router-dom";
import HomeTemplateRoute from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Detail from "./pages/Detail/Detail";
// css circle rating
import "./util/SystemCss/CssGlobal.css";
import CheckOut from "./pages/CheckOut/CheckOut";
// import { Suspense, lazy } from "react";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import Login from "./pages/Login/Login";
import SignIn from "./pages/SignIn/SignIn";
import CheckoutTemplate from "./templates/CheckOutTemplate/CheckOutTemplate";
import Loading from "./components/Loading/Loading";
import AdminTemplateRoute from "./templates/AdminTemplate/AdminTemplate";
import Flims from "./pages/Admin/Films/Flims";
import Addfilm from "./pages/Admin/Films/Addfilm";
import EditFlim from "./pages/Admin/Films/EditFlim";
import ShowTime from "./pages/Admin/Films/ShowTime";
import UserManagement from "./pages/UserManagement/UserManagement";
import AddUser from "./pages/UserManagement/AddUser";
import EditUser from "./pages/UserManagement/EditUser";
import Profile from "./pages/Profile/Profile";
// const CheckOutTemplateLazy = lazy(() =>
//   import("./templates/CheckOutTemplate/CheckOutTemplate")
// );
//react slick

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplateRoute path="/" exact Component={Home} />
        <HomeTemplateRoute path="/home" exact Component={Home} />
        <HomeTemplateRoute path="/detail/:id" exact Component={Detail} />
        <HomeTemplateRoute path="/contact" exact Component={Contact} />
        <HomeTemplateRoute path="/news" exact Component={News} />
        <HomeTemplateRoute path="/profile" exact Component={Profile} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/signup" exact Component={SignIn} />
        <CheckoutTemplate path="/checkout/:id" exact Component={CheckOut} />
        <AdminTemplateRoute path="/admin" exact Component={UserManagement} />
        <AdminTemplateRoute path="/admin/films" exact Component={Flims} />
        <AdminTemplateRoute path="/admin/addfilm" exact Component={Addfilm} />
        <AdminTemplateRoute
          path="/admin/films/editfilm/:id"
          exact
          Component={EditFlim}
        />
        <AdminTemplateRoute
          path="/admin/films/showtime/:id/:tenPhim"
          exact
          Component={ShowTime}
        />
        <AdminTemplateRoute
          path="/admin/usermanagement/adduser"
          exact
          Component={AddUser}
        />
        <AdminTemplateRoute
          path="/admin/usermanagement/edituser/:taiKhoan"
          exact
          Component={EditUser}
        />
        {/* <Suspense fallback={<h1>Loadding.....</h1>}>
          <CheckOutTemplateLazy path="/checkout" exact Component={CheckOut} />
        </Suspense> */}
      </Switch>
    </Router>
  );
}

export default App;
