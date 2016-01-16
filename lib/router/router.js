Router.configure({
    layoutTemplate : 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404'
});

Router.route('/msgs', {
    name: 'msgs'
});

Router.route('/msg', {
    name: 'add-msg',
    template : 'msg'
});

Router.route('/msg/:msgId', {
    name: 'edit-msg',
    template : 'msg',
    data: function(){
        var msg = Messages.findOne(this.params.msgId);
        return msg;
    }
});

Router.route( "/api/msgs", { where: "server" })
    .get(function(){
        var data = [];

        var accountId = this.params.query.accountId;
        if (accountId){
            var messages = Messages.find({}).fetch();
            for (var i = 0; i < messages.length; i++) {
                var message = messages[i];

                if (message.templateId) message.url = 'http://localhost:3000/api/template/' + message.templateId;
                if (message.url) {
                    if (accountId) message.url += '?accountId=' + accountId;
                    data.push(message);
                }
            }
        }

        this.response.setHeader('access-control-allow-origin', '*' );
        this.response.setHeader('Content-Type', 'application/json; charset=utf-8');
        this.response.statusCode = 200;
        this.response.end(JSON.stringify(data));
    });

Router.route( "/api/template/:templateId", { where: "server" })
    .get(function(){
        var html, msgCode = this.params.msgCode; templateId = 'JXrZsjv9k9iSYvNrf';

        var accountId = this.params.query.accountId;
        var params = {
            LOAN_AMOUNT : '34,120.00',
            BRUNCH_NAME : 'אבן גבירול',
            SUPPORT_PHONE_NUMBER : '1-700-200-300'
        };

        this.response.setHeader('access-control-allow-origin', '*' );
        this.response.setHeader('content-type', 'text/html; charset=utf-8');
        this.response.statusCode = templateId ? 200 : 500;

        var template = Templates.findOne({_id : this.params.templateId});
        if (template && template._id){
            var path = 'templates/' + template._id + '/';
            var rootFile = path + 'index.html';

            var data = Assets.getText(rootFile);

            //Set base tag
            var headIndex = data.indexOf('<head>') + 6;
            data = data.substr(0, headIndex) + '<base href="/' + path + '">' + data.substr(headIndex);

            for (var key in params) {
                var value = params[key];
                data = data.replace(new RegExp('{{' + key + '}}', 'g'), value);
            }

            this.response.end(data);
        } else {
            html = 'TEMPLATE NOT EXISTS!';
            this.response.end(html);
        }
    });