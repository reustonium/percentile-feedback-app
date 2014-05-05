module.exports = {

  db: process.env.MONGODB, //|| 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET,
  
  mandrill: {
    login: process.env.MANDRILL_LOGIN,
    password: process.env.MANDRILL_PASSWORD
  },

  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },

  twitter: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },

  google: {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  }  
};
