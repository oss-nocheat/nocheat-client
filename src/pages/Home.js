import React from "react";
import { Link } from "react-router-dom";

import prof_button from "../assets/images/prof_button.png";
import stu_button from "../assets/images/stu_button.png";

export default function Exam() {
  return (
    <>
      <p id="app-title">NO CHEATING HELPER</p>
      <p id="choose-mode">choose the mode</p>
      <div id="grid">
        <div>
          <Link to="/dashboard">
            <img
              src={prof_button}
              alt="교수님으로 로그인"
              width="350"
              height="350"
            />
          </Link>
        </div>
        <div>
          <Link to="/exam">
            <img
              src={stu_button}
              alt="학생으로 로그인"
              width="350"
              height="350"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
