import React from "react";
import Trainer from "./components/Trainer/Trainer";
import Header from "./components/Header/Header";
import s from "./App.module.scss";

const App = () => {
  return (
    <div className={s.wrapper}>
      <Header />

      <Trainer />
    </div>
  );
};

export default App;
