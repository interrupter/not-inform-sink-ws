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
				let Notification = notNode.Application.getLogic('Notification');
				if(rule && rule.getData()){
					options = Object.assign(options, rule.getData());
				}
				let	text = hb.compile(options.templates.text),
						title = hb.compile(options.templates.subject),
						notifyOptions = {
							ownerId: message.ownerId,
							ownerModel: message.ownerModel,
							title: 		title(message), 		// Subject line
							text: 		text(message)
						};
				Notification.notify(notifyOptions)
					.then((res)=>{
						if(res.status === 'ok'){
							let {_id, title, owner, ownerModel} = res.result;
							log.log(`notify deployed: "${title}" to ${ownerModel}:${owner} with _id#${_id} `);
						}else{
							log.error(res);
						}
					})
					.catch((e)=>{
						log.error(e);
					});
			}catch(e){
				log.error(e);
			}
		}
	}
	module.exports = InformSinkWS;
}catch(e){
	log.error(e);
}
