const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');
const User = require('../models/User');
const Log = require('../models/Log');
var bcrypt = require('bcrypt');

AdminBro.registerAdapter(AdminBroMongoose);

const isAdminRole = ({currentUser}) => currentUser && currentUser.role === 'admin';

const adminBro = new AdminBro({
  resources: [
    {
      resource: User,
      options: {
        actions: {
          new: {isAccessible: isAdminRole },
          edit: {isAccessible: isAdminRole },
          delete: {isAccessible: isAdminRole },
        }
      }
    },
    {
      
      resource: Log,
      options: {
        isVisible: isAdminRole
      }
    }
  ],
  locale: {
    language: 'es',
    translations: {
      labels: {
        User: 'Usuarios',
        Log: 'Logs',
      }
    }
  },
  branding: {
    companyName: 'Asociación Vale',
  },
  rootPath: '/admin',
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (username, password) => {
    const user = await User.findOne({ username:username })
    if (user) {
      //const matched = await bcrypt.compare(password, user.password)
      if ((password == user.password) && (user.role == 'admin' || user.role == 'tutor')) {
        return user
      }
    }
    return false
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
})

module.exports = router;
