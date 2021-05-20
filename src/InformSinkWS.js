const log = require('not-log')(module, 'InformSinkWS');
try{
	const
		notNode = require('not-node'),
		Sink = require('not-inform').Sink;

	class InformSinkWS extends Sink{
		/**
		* @param {object} options
		*/
		constructor(options){
			super(options);
			return this;
		}

		deploy(message, rule){
			try{
				if(message._id && this.options.eventName){
					const server = notNode.Application.WSServer();
					if(server){
						const client = server.getClient({_id: message._id});
						if(client){
							client.sendMessage('event', this.options.eventName, message);
						}
					}
				}
			}catch(e){
				log.error(e);
			}
		}
	}
	module.exports = InformSinkWS;
}catch(e){
	log.error(e);
}
