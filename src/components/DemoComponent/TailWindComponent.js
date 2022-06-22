import React from "react";
import "./TailWindComponent.css";
import _ from "lodash";
export default function TailWindComponent() {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl ">Welcome come to you</h1>
      <div className="flex  flex-wrap">
        <div className=" w-1/3  p-2  ">
          <div className="text-center bg-slate-300  rounded-xl overflow-hidden">
            <div className="p-5 pb-20 ">
              <p className="text-category">catagory</p>
              <h3 className="text-heading-cyber">
                cybersoft frontend developer
              </h3>
              <p className="text-content w-auto h-auto break-words">
                loremsandksalkldasjkldjsakljdlkasjdlksajdlkjsalkdjsklajdklsajdklasjkljcxzlkcxlzkclkxnlklkklknlknlknlkk
              </p>
            </div>
            <div className="box-text-bottom">
              <span>1BTC</span>
              <button className="custom-button">Resgister</button>
            </div>
          </div>
        </div>
        <div className=" w-1/3  p-2  ">
          <div className="text-center bg-slate-300  rounded-xl overflow-hidden">
            <div className="p-5 pb-20 ">
              <p className="text-category">catagory</p>
              <h3 className="text-heading-cyber">
                cybersoft frontend developer
              </h3>
              <p className="text-content w-auto h-auto break-words">
                loremsandksalkldasjkldjsakljdlkasjdlksajdlkjsalkdjsklajdklsajdklasjkljcxzlkcxlzkclkxnlklkklknlknlknlkk
              </p>
            </div>
            <div className="box-text-bottom">
              <span>1BTC</span>
              <button className="custom-button">Resgister</button>
            </div>
          </div>
        </div>
        <div className=" w-1/3  p-2  ">
          <div className="text-center bg-slate-300  rounded-xl overflow-hidden">
            <div className="p-5 pb-20 ">
              <p className="text-category">catagory</p>
              <h3 className="text-heading-cyber">
                cybersoft frontend developer
              </h3>
              <p className="text-content w-auto h-auto break-words">
                loremsandksalkldasjkldjsakljdlkasjdlksajdlkjsalkdjsklajdklsajdklasjkljcxzlkcxlzkclkxnlklkklknlknlknlkk
              </p>
            </div>
            <div className="box-text-bottom">
              <span>1BTC</span>
              <button className="custom-button">Resgister</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
