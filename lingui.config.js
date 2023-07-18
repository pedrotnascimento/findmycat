/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
    locales: ["en", "pt_BR", "en_US"],
    catalogs: [
      {
        path: "src/locales/{locale}/messages",
        include: ["src"],
      },
    ],
    format: "po",
  };