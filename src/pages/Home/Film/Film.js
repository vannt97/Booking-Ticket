import React from "react";
import { history } from "../../../App";
export default function Film(props) {
  const { movie } = props;
  return (
    <div
      className="h-auto  overflow-hidden text-center relative mx-auto cursor-pointer"
      style={{ height: 400, width: 202 }}
      onClick={() => {
        history.push(`/detail/${movie.maPhim}`);
      }}
    >
      <div className="overflow-hidden">
        <div
          className="hover:scale-100 scale-95"
          style={{
            backgroundImage: `url(${movie.hinhAnh})`,
            height: 302,
            width: 202,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            transition: "0.5s all",
          }}
        ></div>
      </div>
      <p className="font-bold text-left mt-4">{movie.tenPhim}</p>
    </div>
  );
}
