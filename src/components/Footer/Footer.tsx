import React from "react";

const Footer = () => {
  return (
    <footer className="py-5 px-10 md:px-20 border-t bg-white">
      <p>{`© Nikolaos Kalfas ${new Date().getFullYear()}`}</p>
    </footer>
  );
};

export default Footer;
