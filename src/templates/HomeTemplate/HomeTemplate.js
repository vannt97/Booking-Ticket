import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export default function HomeTemplateRoute(props) {
  let { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Header />
            <div style={{ height: 64, width: "100%" }}></div>
            <Component {...propsRoute} />
            <Footer />
          </Fragment>
        );
      }}
    />
  );
}
