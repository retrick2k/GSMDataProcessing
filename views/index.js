$(function () {
    $.ajax({
        url: '/get-temp',
        async: true,
        dataType: 'json',
        type: 'get'
    }).done((response) => {
        var ctx = $('#temperatureChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: response.map(x => x.time),
                datasets: [{
                    label: 'Температура с датчика',
                    data: response.map(x => x.data),
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            }
        });
    });
});