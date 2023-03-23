const log = require("not-log")(module, "InformSinkWS"),
    hb = require("handlebars");
try {
    const notNode = require("not-node"),
        Sink = require("not-inform").Sink;

    class InformSinkWS extends Sink {
        /**
         * @param {object} options
         */
        constructor(options) {
            super(options);
            return this;
        }

        async deploy(message, rule) {
            try {
                if (this.options.eventName) {
                    await this.deployCycle(message, rule);
                }
            } catch (e) {
                log.error(e);
            }
        }

        async deployOne({ message, recipient, index, recipientsFilter, rule }) {
            const server = notNode.Application.WSServer();
            let owner = recipient._id,
                ownerModel = recipientsFilter.modelName,
                options = {};

            if (rule && rule.getData()) {
                options = Object.assign(options, rule.getData());
            }

            let text = hb.compile(options.templates.text),
                title = hb.compile(options.templates.subject),
                link = options.templates.link
                    ? hb.compile(options.templates.link)
                    : false,
                notifyOptions = {
                    owner,
                    ownerModel,
                    title: title(message), // Subject line
                    text: text(message),
                    message,
                };

            if (link) {
                notifyOptions.link = link(message);
            }

            if (server && recipient._id) {
                const clients = server.getClients({ _id: recipient._id });
                if (clients && clients.length) {
                    clients.forEach(
                        this.deliver(this.options.eventName, notifyOptions)
                    );
                }
            }
        }

        deliver(eventName, message) {
            return (client) => {
                client.send("event", eventName, message);
            };
        }
    }

    module.exports = InformSinkWS;
} catch (e) {
    log.error(e);
}
