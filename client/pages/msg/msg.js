Template.msg.onCreated(function(){
    window.setTimeout(function(){
        $(document).ready(function() {
            $('.modal-trigger').leanModal();
        });
    }, 0);
});

Template.msg.helpers({
    msgCode : function(){
        return Session.get('msgCode') || this.msgCode;
    },
    templateId : function(){
        return Session.get('templateId') || this.templateId;
    },
    templates : function(){
        var query = {};

        if (Session.get('templateSearch')) query.name = {$regex : Session.get('templateSearch')};
        return Templates.find(query);
    }
});

Template.msg.events({
    'submit #add-msg' : function(e){
        e.preventDefault();

        var data = {};
        data.msgCode = e.target.msgCode.value || Math.floor(Math.random() * 1000);
        data.title = e.target.title.value;
        data.txt = e.target.txt.value;
        data.url = e.target.url.value;
        data.templateId = Session.get('templateId') || this.templateId;

        //TODO:: fix update
        if (this._id) Messages.update({_id : this._id}, {$set : data});
        else Messages.insert(data);

        //clear session
        Session.set('msgCode', null);
        Session.set('templateSearch', null);
        Session.set('templateId', null);

        Router.go('/msgs');
    },
    'submit #generate-msg-code' : function(e){
        e.preventDefault();

        var msgCode = Math.floor(Math.random() * 100000);

        Session.set('msgCode', msgCode);
    },
    'submit #add-template' : function(e){
        e.preventDefault();

        var name = e.target.templateName.value;
        Templates.insert({name : name});

        e.target.reset();
        $('#add-template').closeModal();
    },
    'keyup #templateSearch' : function(e){
        var val = e.target.value;
        if (val.length >= 3){
            Session.set('templateSearch', val);
        } else {
            Session.set('templateSearch', null);
        }
    },
    'click .template' : function(e){
        Session.set('templateId', e.target.getAttribute('data-template-id'));

        $('#choose-template').closeModal();
    }
});