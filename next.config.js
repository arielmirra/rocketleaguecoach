/**
 * @type {import("next").NextConfig}
 */
const nextTranslate = require("next-translate")

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
    pages: {
      "*": ["common"],
    },
  },
}

module.exports = nextTranslate(nextConfig)
