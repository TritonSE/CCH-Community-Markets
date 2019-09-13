if (sessionStorage.getItem('loggedIn') != "true") {location.href = "/admin-login";}

$(document).ready( function () {

    /* Levels chart */
    var levZero = 0;
    var levOne = 0;
    var levTwo = 0;
    var levThree = 0;

    /* Store Type chart */
    let small = 0;
    let medium = 0;
    let large = 0;
    let convenience = 0;

    levelArray = null;
    typeArray = null;


    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    google.charts.load('current', {'packages':['corechart']});
    
    // Creates connection to database.
    var db = firebase.database();

    // Links to head of database.
    var ref = db.ref("live_weller");

    // Links to markets list.
    var marketsRef = ref.child("markets");


    // Call async function
    callFirebase(loadCharts);



    // Start of callback
    function loadCharts() {
        levelArray = [
            ['Market Level', 'Number of Markets'],
            ['Level 0', levZero],
            ['Level 1', levOne],
            ['Level 2', levTwo],
            ['Level 3', levThree]
        ];

        typeArray = [
            ['Market Type', 'Number of Markets'],
            ['Convenience', convenience],
            ['Small', small],
            ['Medium', medium],
            ['Large', large]
        ];
    
        /* Render chart */
        google.charts.setOnLoadCallback(drawLevelChart);
        google.charts.setOnLoadCallback(drawTypeChart);
        
        

        function drawLevelChart() {
    
            var levelData = google.visualization.arrayToDataTable(levelArray);
    
            var levelOptions = {
                title: 'Market Level',
                chartArea: {left: 73},
                legend: {
                    textStyle: {
                        color: '#838488',
                        fontSize: '30px'
                    }
                },
                slices:[
                    {color: '#7B7B7B'},
                    {color: '#FDC947'},
                    {color: '#C7D48D'},
                    {color: '#35C0C8'}
                ],
                titleTextStyle:{
                    bold: false,
                    fontSize: 12
                }
            };
    
            var levelChart = new google.visualization.PieChart(document.getElementById('levelChart'));
            levelChart.draw(levelData, levelOptions);
        }



        function drawTypeChart() {

            var typeData = google.visualization.arrayToDataTable(
                typeArray);
    
            var typeOptions = {
                title: 'Market Type',
                chartArea: {left: 73},
                legend: {
                    textStyle: {
                        color: '#838488',
                        fontSize: '30px'
                    }
                },
                slices:[
                    {color: '#7B7B7B'},
                    {color: '#FDC947'},
                    {color: '#C7D48D'},
                    {color: '#35C0C8'}
                ],
                titleTextStyle:{
                    bold: false,
                    fontSize: 12
                }
            };
    
            var typeChart = new google.visualization.PieChart(document.getElementById('typeChart'));
            typeChart.draw(typeData, typeOptions);
        }
    }


    // Start of async
    function callFirebase(loadCharts) {
        marketsRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var level = parseInt(childData.marketInfo.marketLevel);
                var type = childData.marketInfo.storeType;
    
                if (level == 0) {levZero++;}
                else if (level == 1) {levOne++;}
                else if (level == 2) {levTwo++;}
                else if (level == 3) {levThree++;}

                if (type == "Small") {small++;}
                else if (type == "Medium") {medium++;}
                else if (type == "Large") {large++;}
                else if (type == "Convenience") {convenience++;}
            });
            
            // Callback
            loadCharts();
        });
    }
});

/* Question Chart */
function drawQuestion() {

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    
    // Creates connection to database.
    var db = firebase.database();

    // Links to head of database.
    var ref = db.ref("live_weller");

    // Links to markets list.
    var marketsRef = ref.child("markets");

    google.charts.load('current', {'packages':['corechart']});
    
    // Get question to work with.
    var questionTitle = document.getElementById("question-name-dropdown").value;
    var questionResults = [];
    var uniqueResults = {};

    getQuestionAnswers(drawChart);

    function drawChart() {
        questionArray = [
            [questionTitle, 'Number of Markets']
        ];

        for (var answer in questionResults) {
            uniqueResults[questionResults[answer]] += 1;
        }

        for (var key in uniqueResults) {
            if (key != "undefined") {
                questionArray.push([key, uniqueResults[key]]);
            }
        }

        /* Render chart */
        google.charts.setOnLoadCallback(drawQuestionChart);

        function drawQuestionChart() {
    
            var questionData = google.visualization.arrayToDataTable(questionArray);
    
            var questionOptions = {
                title: questionTitle,
                chartArea: {left: 73},
                legend: {
                    textStyle: {
                        color: '#838488',
                        fontSize: '30px'
                    }
                },
                slices:[
                    {color: '#7B7B7B'},
                    {color: '#FDC947'},
                    {color: '#C7D48D'},
                    {color: '#35C0C8'}
                ],
                titleTextStyle:{
                    bold: false,
                    fontSize: 12
                }
            };
    
            var questionChart = new google.visualization.PieChart(document.getElementById('questionChart'));
            questionChart.draw(questionData, questionOptions);
        }
    }

    function getQuestionAnswers(drawChart) {

        var stripKey = questionTitle.replace(/[^0-9a-zA-Z, ]/gi, '');

        marketsRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                try {
                    uniqueResults[childData.questions[stripKey]] = 0;
                    questionResults.push(childData.questions[stripKey]);
                } catch (err) {}
            });

            drawChart();
        });
    }
};
