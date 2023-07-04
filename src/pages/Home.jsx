import React from "react";
import { useDispatch } from "react-redux";
import FooterHome from "../components/Home/FooterHome";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameTrainer = e.target.nameTrainer.value;
    dispatch(setNameTrainer(nameTrainer));
    navigate("/pokedex");
  };

  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen">
      {/* Sección superior */}
      <section className="flex flex-col items-center justify-center">
        <div className="text-center">
          <img className="w-full mx-auto" src="/images/logo.png" alt="" />
        </div>
        <h3 className="text-red-500 font-bold text-center">Hello Trainer!</h3>
        <p>To start, please introduce your name...</p>
        <form onSubmit={handleSubmit}>
          <input required id="nameTrainer" type="text" />
          <button type="submit">Let's play!</button>
        </form>
      </section>

      {/* Sección inferior */}
      <FooterHome />
    </main>
  );
};

export default Home;