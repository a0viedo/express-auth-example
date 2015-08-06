var users = [{
  id: 1,
  username: 'bob',
  password: 'secret',
  email: 'bob@example.com'
}, {
  id: 2,
  username: 'joe',
  password: 'birthday',
  email: 'joe@example.com'
}];
var uuid = require('uuid');

var utils = {
  findById: function(id, fn) {
    var res;
    var found = users.some(function(user) {
      if (user.id === id) {
        res = user;
        return true;
      }
    });

    if (found) {
      fn(null, res)
    } else {
      fn(new Error('User ' + id + ' does not exist'));
    }
  },
  findOrCreate: function(obj, cb) {
    var res = {
      id: uuid.v4(),
      username: obj.githubProfile.username,
      email: obj.githubProfile.emails && obj.githubProfile.emails[0].value
    };
    users.push(res);

    return cb(null, res);
  },
  findByUsername: function(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.username === username) {
        return fn(null, user);
      }
    }
    return fn(null, null);
  }
};




module.exports = utils;