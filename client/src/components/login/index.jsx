import { useState, useEffect, useRef } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";
import backgroundImagefile from "./316.jpg"

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const bgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const bgX = (offsetX / window.innerWidth) * 25;
    const bgY = (offsetY / window.innerHeight) * 25;
    bgRef.current.style.transform = `translate(-${bgX}px, -${bgY}px)`;
  };

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]); // eslint-disable-line

  return (
    <div className="login-page">
      <div
        className="login-bg"
        ref={bgRef}
        style={{
          backgroundImage: backgroundImagefile,
        }}
      />
      <div className="login-container" onMouseMove={handleMouseMove}>
        <h2 className="title">Centura</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          {isRegister ? (
            <button type="button" className="themed-button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button type="button" className="themed-button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
