//once pre-assess is over, displays assessment questions
$('#pre-assess-button').click(function(event) {
    event.preventDefault();

    var responses = $('#pre-assess-form').serializeArray();
    console.log(responses);

    var config = {
        apiKey: "AIzaSyAt3owhyucxkE6YzxZKiootmMuRdfbZDmw",
        authDomain: "live-well-ff7c8.firebaseapp.com",
        databaseURL: "https://live-well-ff7c8.firebaseio.com",
        projectId: "live-well-ff7c8",
        storageBucket: "live-well-ff7c8.appspot.com",
        messagingSenderId: "1012764335295"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    var db = firebase.database();
    var ref = db.ref("live_well");

    var marketsRef = ref.child("markets");

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
});

$('#pre-assess-button').click(function(){
    $('h2.title').hide();
    $('#pre-assess-container').hide();
    $('.assessment-container').show();
});