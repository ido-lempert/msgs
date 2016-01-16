Templates = new Mongo.Collection('templates');

Templates.allow({
    insert: function(userId) {
        return true;
    },
    update: function(userId) {
        return true;
    },
    remove: function(userId) {
        return true;
    }
});

Templates.attachSchema(new SimpleSchema({
    name: {
        type: String,
        max : 512
    },
    createdAt : {
        type : Date,
        autoValue : function(){
            return new Date();
        },
        denyUpdate: true
    }
}));