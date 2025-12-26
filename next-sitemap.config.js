const config = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/private/" },

      { userAgent: "*", allow: "/" },
    ],
  },
};

module.exports = config;
