import React from "react";

const Header = () => {
  return (
<section className="relative">
  {/* Sección roja */}
  <div className="bg-red-600 h-20 relative">
  <div className="absolute left-5 top-05 w-10">
    <img src="/images/logo.png" alt="Logo" />
  </div>
</div>

  {/* Sección negra */}
  <div className="bg-black h-12"></div>

  {/* Botón mockup */}
  <div className="absolute right-4 bottom-2">
    <div className="absolute"></div>
    <img src="/images/Ellipse 3.png" alt="Ellipse 3" />
    <img className="absolute" src="/images/Ellipse 4.png" alt="Ellipse 4" />

  </div>
</section>


  );
};

export default Header;