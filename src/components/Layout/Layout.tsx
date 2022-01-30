import React from "react";
import Helmet from "react-helmet";

interface LayoutInterface {
  title: string;
  description: string;
}

export const Layout: React.FC<LayoutInterface> = ({
  title,
  description,
  children,
}) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </div>
  );
};
