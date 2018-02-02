var env = process.env.NODE_ENV || 'local';
var envConfig = {
  local: {
    siteUrl: 'http://localhost:3000',
    port: 3000,
    googleAuth: {
      clientID: '562692892340-9o35ra5u84gr56dv797jtj7f0mvb1r7p.apps.googleusercontent.com',
      clientSecret: '44ui31IRScrmBYu13xmWYS8f',
      callbackUrl: '/auth/google/callback'
    },
    mongoURI: 'mongodb://localhost:27017/ATF',
    sessionSecret: 'myKey'
  },
  development: {
    siteUrl: 'http://localhost:3000',
    port: 3000,
    googleAuth: {
      clientID: '562692892340-9o35ra5u84gr56dv797jtj7f0mvb1r7p.apps.googleusercontent.com',
      clientSecret: '44ui31IRScrmBYu13xmWYS8f',
      callbackUrl: '/auth/google/callback'
    },
    mongoURI: 'mongodb://accolite:accolite@ds231987.mlab.com:31987/atf_accolite',
    sessionSecret: 'BJNRvSLbio'
  },
  production: {}
};
module.exports = envConfig[env];