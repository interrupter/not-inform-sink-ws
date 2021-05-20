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

		async deploy(message, rule){
			try{
				if(this.options.eventName){
					await this.deployCycle(message, rule);
				}
			}catch(e){
				log.error(e);
			}
		}

		async deployOne({message, recipient,  index, recipientsFilter, rule}){
			const server = notNode.Application.WSServer();
			if(server && recipient._id){
				const client = server.getClient({_id: recipient._id});
				if(client){
					client.sendMessage('event', this.options.eventName, message);
				}
			}
		}
	}




	module.exports = InformSinkWS;
}catch(e){
	log.error(e);
}
