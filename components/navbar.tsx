import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div
      className="w-full p-5 text-white"
      style={{ backgroundColor: "rgb(0,84,118)" }}
    >
      <Image
        width="308.05"
        height="80"
        src="https://online.ntnu.no/img/online_logo.svg"
        alt="OnlineLogo"
      />

      <nav style={{ display: "flex", gap: 40, right: 0 }}>
        <a href="/form">For søkere</a>
        <a href="/committee">For komiteer</a>
        <a href="/applicantoverview">Oversikt</a>
      </nav>
    </div>
  );
};

export default Navbar;
