const config = {
  siteUrl: "http://localhost:3000",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/private/" },

      { userAgent: "*", allow: "/" },
    ],
  },
};

module.exports = config;
