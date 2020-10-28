const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');
const User = require('../models/User');
var bcrypt = require('bcrypt');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (username, password) => {
    const user = await User.findOne({ username:username })
    if (user) {
      const matched = await bcrypt.compare(password, user.password)
      if (matched && (user.role == 'admin' || user.role == 'tutor')) {
        return user
      }
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
})

module.exports = router;
