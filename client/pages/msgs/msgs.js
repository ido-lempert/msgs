Template.msgs.helpers({
   messages : function(){
       return Messages.find({}, {sort : {createdAt : -1}});
   }
});

Template.msgs.events({
    'click .remove-msg' : function(e){
        e.preventDefault();

        var id = e.target.getAttribute('data-msg-id');
        if (window.confirm('Are you sure?')) Messages.remove({_id : id});
    }
});