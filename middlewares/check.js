const jwt = require('jsonwebtoken')
const defined = require('../config/defined')

// 生成token 方法
exports.setToken = function (name, id) {
  console.log(name, id)
  return new Promise((resolve, reject) => {
    const token = jwt.sign(
      {
        _name: name,
        _id: id,
      },
      defined.signkey,
      { expiresIn: '24h' },
    )
    console.log('settoken', token)
    resolve(token)
  }).catch((err) => {
    console.log('setToken err: ' + err)
  })
}

// 解析token 方法
exports.verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    console.log(token)
    jwt.verify(token.split(' ')[1], defined.signkey, function (err, decoded) {
      if (err) {
        reject(err)
        throw err
      }
      console.log('decoded', decoded)
      resolve(decoded)
    })
  }).catch((err) => {
    console.log('verifyToken err: ' + err)
  })
}
