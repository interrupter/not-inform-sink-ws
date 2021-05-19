const InformSinkWS = require('./InformSinkWS.js');
module.exports = {
  name: 'not-inform-sink-ws',
	paths:{
		controllers:  __dirname + '/controllers'
	},
  getClass(){
    return InformSinkWS;
  }
};
