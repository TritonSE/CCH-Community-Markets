if (sessionStorage.getItem('loggedIn') != "true") {location.href = "/admin-login";}

$(document).ready( function () {
    google.charts.load('current', {'packages':['corechart']});
    
    levelArray = null;
    typeArray = null;
    
    $.post('/data', {type: "general"}, function(data) {
        levelArray = [
            ['Market Level', 'Number of Markets'],
            ['Level 0', data.levels[0]],
            ['Level 1', data.levels[1]],
            ['Level 2', data.levels[2]],
            ['Level 3', data.levels[3]]
        ];

        typeArray = [
            ['Market Type', 'Number of Markets'],
            ['Convenience', data.stores['convenience']],
            ['Small', data.stores['small']],
            ['Medium', data.stores['medium']],
            ['Large', data.stores['large']]
        ];
    
        /* Render chart */
        google.charts.setOnLoadCallback(drawLevelChart);
        google.charts.setOnLoadCallback(drawTypeChart);

        function drawLevelChart() {
    
            const levelData = google.visualization.arrayToDataTable(levelArray);
    
            const levelOptions = {
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
    
            const levelChart = new google.visualization.PieChart($('#levelChart')[0]);
            levelChart.draw(levelData, levelOptions);
        }

        function drawTypeChart() {

            const typeData = google.visualization.arrayToDataTable(typeArray);
    
            const typeOptions = {
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
    
            const typeChart = new google.visualization.PieChart($('#typeChart')[0]);
            typeChart.draw(typeData, typeOptions);
        }
    });
});

/* Question Chart */
function drawQuestion() {
    google.charts.load('current', {'packages':['corechart']});

    // Get question to work with.
    const questionTitle = $("#question-name-dropdown")[0].value;
    let questionArray = null;

    $.post('/data', {type: "question", title: questionTitle}, function(data) {
        questionArray = [
            [questionTitle, 'Number of Markets']
        ];

        for (const answer in data.questionResults) {
            data.uniqueResults[data.questionResults[answer]] += 1;
        }

        for (const key in data.uniqueResults) {
            if (key != "undefined") {
                questionArray.push([key, data.uniqueResults[key]]);
            }
        }

        /* Render chart */
        google.charts.setOnLoadCallback(drawQuestionChart);

        function drawQuestionChart() {
    
            const questionData = google.visualization.arrayToDataTable(questionArray);
    
            const questionOptions = {
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
    
            const questionChart = new google.visualization.PieChart($('#questionChart')[0]);
            questionChart.draw(questionData, questionOptions);
        }
    });
};
