//once pre-assess is over, displays assessment questions
$('#pre-assess-button').click(function(event) {

    //gets form
    var myform = $('#pre-assess-form')
    
    if(!myform[0].checkValidity()) {
        // If the form is invalid, submit it. The form won't actually submit;
        // this will just cause the browser to display the native HTML5 error messages.
        return;
    }
    
    //if everything is filled then prevent form from submitting and display assessment questions instead
    event.preventDefault();
    $('h2.title').hide();
    $('#pre-assess-container').hide();
    $('.assessment-container').show();
    
    // Pull information from form.
    var responses = $('#pre-assess-form').serializeArray();

    // Firebase login info.
    
    // Create new firebase app if not already created.
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    
    // Setup database communication.
    var db = firebase.database();
    var ref = db.ref("live_well");

    // Move to sub-directory.
    var marketsRef = ref.child("markets");

    // Check if new market or existing market.
    if (responses.length == 5) {
        var marketName = responses[4].value;

        marketsRef.child(marketName).set({
            personalInfo: {
                firstName: responses[0].value,
                lastName: responses[1].value,
                email: responses[2].value,
                code: responses[3].value,
            },
            marketInfo: {
                marketName: marketName,
            },
            responses: {
                filler: "test"
            },
            market_rating: -1
        });
    } else {
        var marketName = responses[5].value;

        marketsRef.child(marketName).set({
            personalInfo: {
                firstName: responses[0].value,
                lastName: responses[1].value,
                email: responses[2].value,
                code: responses[3].value,
            },
            marketInfo: {
                marketName: marketName,
                storeType: responses[6].value,
                address: responses[7].value,
                city: responses[8].value,
                state: responses[9].value,
                zip: responses[10].value
            },
            responses: {
                filler: "test"
            },
            market_rating: -1
        });
    }
});


