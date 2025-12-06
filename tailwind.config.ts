import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", ".dark"],
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;


// import type { Config } from "tailwindcss";

// export default {
//   darkMode: ["class"],
//   content: [
//     "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
//     "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// } satisfies Config;
