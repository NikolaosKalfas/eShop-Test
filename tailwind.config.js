module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: false, // or 'media' or 'class'
  plugins: [
    // ...
  ],
  corePlugins: {
    // ...
    outline: false,
  },
  theme: {
    minWidth: {
      "1/4": "25vw",
    },
    extend: {
      colors: {
        primary_color: "#20123a",
        secondary_color: "#E5E5E5",
      },
      fontSize: {
        h1_desktop: ["70px", "78px"],
        h1_mobile: ["40px", "48px"],
        h2_desktop: ["60px", "58px"],
        h2_mobile: ["30px", "38px"],
        h3_desktop: ["40px", "48px"],
        h3_mobile: ["24px", "29px"],
        h4_desktop: ["32px", "40px"],
        h4_mobile: ["20px", "28px"],
        h5_desktop: ["26px", "34px"],
        h5_mobile: ["18px", "26px"],
        h6_desktop: ["20px", "28px"],
        h6_mobile: ["14px", "22px"],
      },
    },
    variants: {
      extend: {
        borderColor: ["active", "group-focus", "focus-within"],
        margin: ["last", "first"],
      },
    },
  },
};
