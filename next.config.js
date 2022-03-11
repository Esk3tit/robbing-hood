module.exports = {

  env: {
    finnhubApiKey1: 'c8l3rtaad3icvur3mk3g'
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
}