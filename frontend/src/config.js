const app_config = {
  apiUrl: "http://localhost:5000",
  title: "SPORTSMANIA",
  themeColor: "#0e8aee",
  status: {
    login: {
      success: 201,
      fail: 401,
    },
  },
  games: [
    { id: 1, name: "Cricket", image: 'cricket.jpg', type: 'team',},
    { id: 2, name: "Football", image: 'football.jpg', type: 'team', },
    { id: 3, name: "Basketball", image: 'basketball.jpg', type: 'team', },
    { id: 4, name: "Tennis", image: 'tennis.jpg', type: 'solo' },
    { id: 5, name: "Badminton", image: 'badminton.jpg', type: 'solo' },
  ],
  categoryData : {
    Cricket: [],
    Football: [],
    Basketball: [],
    Tennis: ['Men Singles', 'Men Doubles', 'Women Singles', 'Women Doubles', 'Mixed Doubles'],
    Badminton: ['Men Singles', 'Men Doubles', 'Women Singles', 'Women Doubles', 'Mixed Doubles'],
  }
};

export default app_config;
