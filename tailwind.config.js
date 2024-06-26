/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", "sans-serif"],
                serif: ["Roboto", "serif"],
                mono: ["Roboto", "monospace"],
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-hidden::-webkit-scrollbar": {
                    display: "none",
                },
                ".scrollbar-hidden": {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                },
            };

            addUtilities(newUtilities);
        },
    ],
};
