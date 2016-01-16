Messages = new Mongo.Collection('messages');

Messages.allow({
    insert: function(userId, party) {
        return true;
    },
    update: function(userId, party, fields, modifier) {
        return true;
    },
    remove: function(userId, party) {
        return true;
    }
});

Messages.attachSchema(new SimpleSchema({
    msgCode: {
        type: String,
        max : 64,
        index: 1,
        unique: true
    },
    title: {
        type: String,
        max : 512,
        index: 1,
        optional: true
    },
    templateId : {
        type: String,
        optional: true
    },
    txt : {
        type: String,
        max: 1024,
        optional: true
    },
    url : {
        type: String,
        max: 1024,
        optional: true
    },
    createdAt : {
        type : Date,
        autoValue : function(){
            return new Date();
        }
    }
}));