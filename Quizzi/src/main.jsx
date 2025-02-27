import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter ,Route,Routes} from "react-router";
import MCQ from "./QuestionPage/mcq";
import App from "./app";
import Dashboard from "./dashboard/dashboard";
import Stats from "./statistics/stats";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/mcq/:test" element={<MCQ />} />
      <Route path="/stats/:test" element={<Stats />} />


    </Routes>

    {/* <Routes>
  <Route index element={<Home />} />

  <Route element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>

  <Route path="concerts">
    <Route index element={<ConcertsHome />} />
    <Route path=":city" element={<City />} />
    <Route path="trending" element={<Trending />} />
  </Route>
</Routes> */}
  </BrowserRouter>
);
