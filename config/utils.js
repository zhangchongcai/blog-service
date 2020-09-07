'use strict';

module.exports = data => {
  const dataReturn = {
    'code': data[0] || 400,
    'data': data[1] || 0,
    'message': data[2] || 'none'
  }
  return dataReturn
};

