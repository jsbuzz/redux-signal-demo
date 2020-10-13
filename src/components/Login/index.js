import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../redux/actions";
import { submitLogin } from "../redux/thunks/login";
import { useTransitions } from "../redux-signal";

const credentialsSelector = (store) => store.login.credentials;

const loginStates = {
  pending: submitLogin,
  success: LOGIN_SUCCESS,
  failure: LOGIN_FAILURE,
};

const loginReducer = (state, { error }) => ({
  isPending: state === "pending",
  loginError: state === "failure" && error,
});

export const LoginBox = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector(credentialsSelector);
  const { isPending, loginError } = useTransitions(loginStates, loginReducer);

  return (
    <div className="login-box">
      <input
        type="text"
        name="email"
        value={email}
        onKeyUp={(...p) => console.log(p)}
      />
      <input type="password" name="password" value={password} />
      {loginError && <div className="login-error">{loginError}</div>}
      <button
        disabled={isPending}
        onClick={() => dispatch(submitLogin(email, password))}
      >
        Log in
      </button>
    </div>
  );
};
