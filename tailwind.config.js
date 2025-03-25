module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      maxWidth: { global: "476px" },
      spacing: { global: "16px" },

      colors: {
        white01: "#FFFFFF",
        white02: "#F9F8F3",
        black01: "#292D32",
        gray06: "#6B7178",
        gray05: "#8E8E93",
        gray04: "#AEAEB2",
        gray03: "#C7C7CC",
        gray02: "#D1D1D6",
        gray01: "#E5E5EA",
        gray00: "#EBEBEE",
        line01: "#F4F5EF",
        line02: "#E8E8E8",
        white01: "#FFFFFF",
        white02: "#F9F8F3",
        green03: "#84A667",
        green02: "#B0CBB5",
        green01: "#D6E173",
        blue02: "#304D79",
        blue01: "#8DC3DB",
        mochabeige01: "#DDCEBF",
      },

      fontSize: {
        Caption1_R_12: [
          "12px",
          { lineHeight: "16px", fontWeight: "400", letterSpacing: "-0.048px" },
        ],
        Caption1_M_12: [
          "12px",
          { lineHeight: "16px", fontWeight: "500", letterSpacing: "-0.048px" },
        ],
        Caption1_B_12: [
          "12px",
          { lineHeight: "16px", fontWeight: "700", letterSpacing: "-0.048px" },
        ],

        Body2_R_14: [
          "14px",
          { lineHeight: "22px", fontWeight: "400", letterSpacing: "-0.056px" },
        ],
        Body2_M_14: [
          "14px",
          { lineHeight: "22px", fontWeight: "500", letterSpacing: "-0.056px" },
        ],
        Body2_B_14: [
          "14px",
          { lineHeight: "22px", fontWeight: "700", letterSpacing: "-0.056px" },
        ],

        Body1_R_16: [
          "16px",
          { lineHeight: "24px", fontWeight: "400", letterSpacing: "-0.064px" },
        ],
        Body1_M_16: [
          "16px",
          { lineHeight: "24px", fontWeight: "500", letterSpacing: "-0.064px" },
        ],
        Body1_B_16: [
          "16px",
          { lineHeight: "24px", fontWeight: "700", letterSpacing: "-0.064px" },
        ],

        Body0_R_18: [
          "18px",
          { lineHeight: "26px", fontWeight: "400", lineSpacing: "-0.072px" },
        ],
        Body0_M_18: [
          "18px",
          { lineHeight: "26px", fontWeight: "500", lineSpacing: "-0.072px" },
        ],
        Body0_B_18: [
          "18px",
          { lineHeight: "26px", fontWeight: "700", lineSpacing: "-0.072px" },
        ],

        Title3_R_20: [
          "20px",
          { lineHeight: "28px", fontWeight: "400", letterSpacing: "-0.08px" },
        ],
        Title3_M_20: [
          "20px",
          { lineHeight: "28px", fontWeight: "500", letterSpacing: "-0.08px" },
        ],
        Title3_B_20: [
          "20px",
          { lineHeight: "28px", fontWeight: "700", letterSpacing: "-0.08px" },
        ],

        Title2_R_24: [
          "24px",
          { lineHeight: "30px", fontWeight: "400", letterSpacing: "-0.096px" },
        ],
        Title2_M_24: [
          "24px",
          { lineHeight: "30px", fontWeight: "500", letterSpacing: "-0.096px" },
        ],
        Title2_B_24: [
          "24px",
          { lineHeight: "30px", fontWeight: "700", letterSpacing: "-0.096px" },
        ],

        Title1_R_28: [
          "28px",
          { lineHeight: "38px", fontWeight: "400", letterSpacing: "-0.112px" },
        ],
        Title1_M_28: [
          "28px",
          { lineHeight: "38px", fontWeight: "500", letterSpacing: "-0.112px" },
        ],
        Title1_B_28: [
          "28px",
          { lineHeight: "38px", fontWeight: "700", letterSpacing: "-0.112px" },
        ],

        LargeTitle_R_36: [
          "36px",
          { lineHeight: "46px", fontWeight: "400", letterSpacing: "-0.144px" },
        ],
        LargeTitle_M_36: [
          "36px",
          { lineHeight: "46px", fontWeight: "500", letterSpacing: "-0.144px" },
        ],
        LargeTitle_B_36: [
          "36px",
          { lineHeight: "46px", fontWeight: "700", letterSpacing: "-0.144px" },
        ],
      },

      fontFamily: {
        nanumBrush: ["var(--font-nanumBrush)", "cursive"],
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-up": "slideUp 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
