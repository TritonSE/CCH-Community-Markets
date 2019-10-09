$(document).ready( function () {
    google.charts.load('current', {'packages':['corechart']});
    
    var levelArray = null;
    var typeArray = null;
    
    $.get('/data/general', function(data) {
        levelArray = [['Market Level', 'Number of Markets']];
        for (var i = 0; i < data.levels.length; i++) {
            levelArray.push(['Level ' + i, data.levels[i]]);
        }

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
    
            var levelChart = new google.visualization.PieChart($('#levelChart')[0]);
            levelChart.draw(levelData, levelOptions);
        }

        function drawTypeChart() {

            var typeData = google.visualization.arrayToDataTable(typeArray);
    
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
    
            var typeChart = new google.visualization.PieChart($('#typeChart')[0]);
            typeChart.draw(typeData, typeOptions);
        }
    });
});

/* Question Chart */
function drawQuestion() {
    google.charts.load('current', {'packages':['corechart']});

    // Get question to work with.
    var questionTitle = $("#question-name-dropdown")[0].value;
    var questionArray = null;

    $.post('/data/question', {title: questionTitle}, function(data) {
        questionArray = [
            [questionTitle, 'Number of Markets']
        ];

        for (var answer in data.questionResults) {
            data.uniqueResults[data.questionResults[answer]] += 1;
        }

        for (var key in data.uniqueResults) {
            if (key != "undefined") {
                questionArray.push([key, data.uniqueResults[key]]);
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
    
            var questionChart = new google.visualization.PieChart($('#questionChart')[0]);
            questionChart.draw(questionData, questionOptions);
        }
    });
};
