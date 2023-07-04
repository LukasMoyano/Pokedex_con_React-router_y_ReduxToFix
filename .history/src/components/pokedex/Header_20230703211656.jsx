import FooterHome from "../components/home/FooterHome";

const Home = () => {
  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen">
      {/* Sección superior */}
      <section className="flex flex-col items-center justify-center">
        <div className="text-center">
          <img className="w-full mx-auto" src="/images/logo.png" alt="" />
        </div>
        <h3 className="text-red-500 font-bold text-center transform-gpu text-3xl ">Hello Trainer!</h3>
        <p>To start, please introduce your name...</p>
        <form>
          <input required id="nameTrainer" type="text" />
          <button className="" type="submit">Let's play!</button>
        </form>
      </section>

      {/* Sección inferior */}
      <FooterHome />
    </main>
  );
};
export default Home;
