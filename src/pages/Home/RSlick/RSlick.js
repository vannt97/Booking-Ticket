import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Film from "../Film/Film";
import styleRSlick from "./RSlick.module.css";
import { withTranslation } from "react-i18next";
import {
  getListMoiveDCAction,
  getListMoiveSCAction,
} from "../../../redux/actions/MovieManagementAction";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleRSlick["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleRSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
const settings = {
  className: "center ",
  centerMode: true,
  infinite: true,
  centerPadding: "20px",
  slidesToShow: 2,
  speed: 500,
  rows: 2,
  slidesPerRow: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
class RSlick extends React.PureComponent {
  renderListMovie = () => {
    return this.props.listMovie?.map((movie, index) => {
      return (
        <div key={index}>
          <Film movie={movie} />
        </div>
      );
      // className={`${styleRSlick[`width-item`]} `}
    });
  };
  render() {
    const { buttonDC, buttonSC } = this.props;
    return (
      <div className="my-10">
        <div className="mb-3 text-center">
          <button
            type="button"
            className={`text-2xl px-8 py-3 font-semibold ${
              buttonDC ? "text-red-700" : ""
            } `}
            onClick={() => {
              this.props.getListMoiveDC();
            }}
          >
            {this.props.t("Phim Đang Chiếu")}
          </button>
          <button
            type="button"
            className={`text-2xl px-8 py-3 font-semibold ${
              buttonSC ? "text-red-700" : ""
            } `}
            onClick={() => {
              this.props.getListMovieComingSoon();
            }}
          >
            {this.props.t("Phim Sắp Chiếu")}
          </button>
        </div>

        <Slider {...settings}>{this.renderListMovie()}</Slider>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListMovieComingSoon: () => {
      dispatch(getListMoiveSCAction());
    },
    getListMoiveDC: () => {
      dispatch(getListMoiveDCAction());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    buttonDC: state.MovieManagementReducer.buttonDC,
    buttonSC: state.MovieManagementReducer.buttonSC,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(RSlick));
