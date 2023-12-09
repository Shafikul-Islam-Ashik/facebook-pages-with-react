import { Link } from "react-router-dom";
import Meta from "../../components/meta/Meta";
import "./Auth.scss";
import Modal from "../../components/modal/Modal";
import { useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { day, month } from "../../faker/dmy";
import {
  createToast,
  isValidEmail,
  isValidMobile,
} from "../../helpers/helpers";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";

// get facebook years
const years = Array.from(
  {
    length: new Date().getFullYear() - 1900,
  },
  (_, i) => 1901 + i
).reverse();

// console.log(years);

const Auth = () => {
  // state for show/hide modal (userReg)
  const [modal, setModal] = useState(false);

  /**
   * user registration form management
   */
  const [input, setInput] = useState({
    first_name: "",
    sur_name: "",
    moe: "",
    password: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });

  // state for handle input Blur
  const [border, setBorder] = useState({
    first_name: true,
    sur_name: true,
    moe: true,
    password: true,
    day: true,
    month: true,
    year: true,
    gender: true,
  });

  // handle InputChange of user registration form
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle input Blur
  const handleInputBlur = (e) => {
    if (e.target.value == "") {
      setBorder((prevState) => ({
        ...prevState,
        [e.target.name]: false,
      }));
    } else {
      setBorder((prevState) => ({
        ...prevState,
        [e.target.name]: true,
      }));
    }
  };

  // handle UserReg
  const handleUserReg = (e) => {
    e.preventDefault();

    if (
      !input.first_name ||
      !input.sur_name ||
      !input.moe ||
      !input.password ||
      !input.day ||
      !input.month ||
      !input.year ||
      !input.gender
    ) {
      createToast("All fields are required");
      // Swal.fire("error");
    } else if (!isValidEmail(input.moe) && !isValidMobile(input.moe)) {
      createToast("Invalid email or phone");
    } else {
      //clear input field
      setInput({
        first_name: "",
        sur_name: "",
        moe: "",
        password: "",
      });
      createToast("Data stable", "success");
    }
  };

  /**
   * user log in form management
   */
  const [loginInput, setloginInput] = useState({
    moe: "",
    password: "",
  });

  // handle InputChange of user lohin form
  const handleLoginInputChange = (e) => {
    setloginInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle userLogin
  const handleLoginForm = (e) => {
    e.preventDefault();

    if (!loginInput.moe || !loginInput.password) {
      createToast("All fields are required");
    } else if (
      !isValidEmail(loginInput.moe) &&
      !isValidMobile(loginInput.moe)
    ) {
      createToast("Invalid email address or mobile");
    } else {
      createToast("Data stable", "success");
    }
  };

  return (
    <>
      <Meta title="Facebook - log in or sign up" />

      {modal && (
        <Modal hide={setModal}>
          <form onSubmit={handleUserReg} className="sign-up-form">
            <div className="h-form">
              <input
                className={border.first_name ? "" : "red-border"}
                type="text"
                placeholder="First name"
                value={input.first_name}
                name="first_name"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <input
                className={border.sur_name ? "" : "red-border"}
                type="text"
                placeholder="Surname"
                value={input.sur_name}
                name="sur_name"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <input
              className={border.moe ? "" : "red-border"}
              type="text"
              placeholder="Mobile number or email address"
              value={input.moe}
              name="moe"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <input
              className={border.password ? "" : "red-border"}
              type="text"
              placeholder="New password"
              value={input.password}
              name="password"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />

            <div className="reg-extra">
              <span className="reg-extra-title">
                Date of birth <FaCircleQuestion />
              </span>
              <div className="reg-extra-opt">
                <select id="" name="day" onChange={handleInputChange}>
                  <option value="">Day</option>
                  {day?.map((item, index) => (
                    <option
                      value={item}
                      key={index}
                      selected={new Date().getDate() == item ? true : false}
                    >
                      {item}
                    </option>
                  ))}
                </select>
                <select id="" name="month" onChange={handleInputChange}>
                  <option value="">Month</option>

                  {month?.map((item, index) => (
                    <option
                      value={item}
                      key={index}
                      selected={new Date().getMonth() == index ? true : false}
                    >
                      {item}
                    </option>
                  ))}
                </select>
                <select id="" name="year" onChange={handleInputChange}>
                  <option value="">Year</option>

                  {years?.map((item, index) => (
                    <option
                      value={item}
                      key={index}
                      selected={new Date().getFullYear() == item ? true : false}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="reg-extra">
              <span className="reg-extra-title">
                Gender <FaCircleQuestion />
              </span>
              <div className="reg-extra-opt">
                <label>
                  <span>Female</span>
                  <input
                    type="radio"
                    name="gender"
                    id=""
                    value="Female"
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <span>Male</span>
                  <input
                    type="radio"
                    name="gender"
                    id=""
                    value="Male"
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <span>Custom</span>
                  <input
                    type="radio"
                    name="gender"
                    id=""
                    value="Custom"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            <p>
              People who use our service may have uploaded your contact
              information to Facebook. <Link>Learn more.</Link>
            </p>
            <p>
              By clicking Sign Up, you agree to our <Link>Terms</Link>,{" "}
              <Link>Privacy Policy</Link> and <Link>Cookies Policy</Link>. You
              may receive SMS notifications from us and can opt out at any time.
            </p>
            <button type="submit">Sign Up</button>
          </form>
        </Modal>
      )}

      <div className="fb-auth-area">
        <div className="fb-auth-container">
          <div className="fb-auth-left">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt=""
            />
            <h2>
              Facebook helps you connect and share with the people in your life.
            </h2>
          </div>
          <div className="fb-auth-right">
            <div className="fb-auth-box">
              <form onSubmit={handleLoginForm}>
                <input
                  type="text"
                  placeholder="Email address or phone number"
                  name="moe"
                  value={loginInput.moe}
                  onChange={handleLoginInputChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginInput.password}
                  onChange={handleLoginInputChange}
                />
                <button type="submit" className="login-btn">
                  Log in
                </button>
              </form>

              <Link to="/">Forgotten password?</Link>
              <div className="divider"></div>
              <button className="create-new-btn" onClick={() => setModal(true)}>
                Create new account
              </button>
            </div>
            <p className="fb-auth-desc">
              <Link>Create a Page</Link> for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
