import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [LoggIn, setLoggIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter LoggIn={LoggIn}></AppRouter>
      <footer>&copy; {new Date().getFullYear()} twitter</footer>
    </>
  );
}

export default App;
