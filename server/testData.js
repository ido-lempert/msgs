loadTestData = function loadTestData() {
    if (Messages.find().count() !== 0) return;

    var templatesData = [
        {
            _id : '1',
            name: 'image'
        },
        {
            _id : '2',
            name: 'video'
        },
        //{
        //    _id : '3',
        //    name: 'Credit cards'
        //},
        //{
        //    _id : '4',
        //    name: 'Hanuka'
        //},
        //{
        //    _id : '5',
        //    name: 'Passover'
        //}
    ];

    var messagesData = [
        {
            _id : '1',
            msgCode: 100,
            title: "רוצה לקחת הלוואה?"
        },
        {
            _id : '2',
            msgCode: 200,
            title: "BHI"
        },
        {
            _id : '3',
            msgCode: 300,
            //title: "רוצה לקחת הלוואה?",
            url : 'https://docs.google.com/forms/d/12DWmRMO1_LN2Y4887dx-il1_6rTSC9NqAe5QH_oJYtY/viewform?usp=send_form'
        },
        //{
        //    _id : '4',
        //    msgCode: 400,
        //    title: "חנוכה"
        //},
        //{
        //    _id : '5',
        //    msgCode: 500,
        //    title: "פסח"
        //},
        //{
        //    _id : '6',
        //    msgCode: 600,
        //    title: 'הודעת מזל טוב',
        //    txt: 'מזל טוב {{FULL_NAME}}.\n מחכה לך מתנה בסניף {{BRUNCH_NAME}}.'
        //},
        //{
        //    _id : '7',
        //    msgCode : 700,
        //    title : 'Best campaigns',
        //    url : 'http://www.walla.co.il'
        //}
    ];

    for (var i = 0; i < messagesData.length; i++) {
        var messageData = messagesData[i];
        var templateData = templatesData[i] ? templatesData[i] : null;

        if (templateData) {
            var templateId = Templates.insert(templateData);
            messageData.templateId = templateId;
        }

        Messages.insert(messageData);
    }
};