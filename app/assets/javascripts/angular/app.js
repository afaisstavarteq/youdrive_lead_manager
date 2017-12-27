var app = angular.module('de.youlearn.statistic', ['ngSanitize', 'ui.bootstrap', 'chart.js', 'templates', 'datetimepicker']);

app.config(function(ChartJsProvider) {
    ChartJsProvider.setOptions({ chartColors : [ '#1ab394', '#ED5565', '#c2c2c2'] });
});

