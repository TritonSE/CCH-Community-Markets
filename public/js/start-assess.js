//once pre-assess is over, displays assessment questions
$('#pre-assess-button').click(function(event) {

    //gets form
    var myform = $('#pre-assess-form')
    
    if( ! myform[0].checkValidity()){
        // If the form is invalid, submit it. The form won't actually submit;
        // this will just cause the browser to display the native HTML5 error messages.
        return;
    }
    
    //if everything is filled then prevent form from submitting and display assessment questions instead
    event.preventDefault();
    $('h2.title').hide();
    $('#pre-assess-container').hide();
    $('.assessment-container').show();
    
    /**
    // Pull information from form.
    var responses = $('#pre-assess-form').serializeArray();
    console.log(responses);

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
        var marketName = responses[4];

        marketsRef.update({
            Test: {
                personalInfo: {
                    firstName: responses[0],
                    lastName: responses[1],
                    email: responses[2],
                    code: responses[3],
                },
                marketInfo: {
                    marketName: marketName,
                },
                responses: {
                    filler: "test"
                }
            }
        });
    } else {
        var marketName = responses[5];

        marketsRef.set({
            Test: {
                personalInfo: {
                    firstName: responses[0],
                    lastName: responses[1],
                    email: responses[2],
                    code: responses[3],
                },
                marketInfo: {
                    marketName: marketName,
                    storeType: responses[6],
                    address: responses[7],
                    city: responses[8],
                    state: responses[9],
                    zip: responses[10]
                },
                responses: {
                    filler: "test"
                }
            }
        });
    }
    */
});


