import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "@/components/chat";
import Login from "@/components/login";

function App() {
  const [user, setUser] = useState(null);
  const [secret, setSecret] = useState(null);
  const isAuth = Boolean(user) && Boolean(secret);
  const [isLoading, setIsLoading] = useState(true);
  const LoadingAnimation = () => {
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
  
      return () => {
        clearTimeout(timer);
      };
    }, []);

    return (
      <div
        className={`loading-container ${
          isVisible ? "" : "hidden"
        }`}
      >
        <img
          src="https://usagif.com/wp-content/uploads/loading-7.gif"
          alt="Loading animation"
          className="block mx-auto"
        />
      </div>
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (isLoading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Navigate to="/chat" />
              ) : (
                <Login setUser={setUser} setSecret={setSecret} />
              )
            }
          />
          <Route
            path="/chat"
            element={
              isAuth ? (
                <Chat user={user} secret={secret} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
