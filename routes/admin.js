const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');
const User = require('../models/User');
const Log = require('../models/Log');
var bcrypt = require('bcrypt');
const { response } = require('express');

AdminBro.registerAdapter(AdminBroMongoose);

const isAdminRole = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin';

const adminBro = new AdminBro({
  database: [mongoose],
  resources: [
    {
      resource: User,
      options: {
        parent: {
          name: 'Gestión de usuarios',
          icon: 'fas fa-cogs'
        },
        locale: {
          language: 'es',
          translations: {
            resources: {
              User: {
                label: 'Usuarios'
              }
            }
          }
        },
        properties: {
          token: {
            isVisible: false,
          },
          password: {
            isVisible: { 
              show: false,
              edit: true,
              list: false,
              filter: false 
            }
          }
        },
        actions: {
          show: { isAccessible: isAdminRole },
          new: { isAccessible: isAdminRole },
          edit: { isAccessible: isAdminRole },
          delete: { isAccessible: isAdminRole }
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
}, null, {
  resave: false,
  saveUninitialized: true
}) 
/* 
const router = AdminBroExpress.buildRouter(adminBro)
*/
module.exports = router;
