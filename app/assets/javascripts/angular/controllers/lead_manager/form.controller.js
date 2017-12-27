angular.module('de.youlearn.statistic')

  .controller('LeadManagerFormCtrl', ['$scope', '$http', function ($scope, $http, $routeParams, $q) {
    var self = this;

    $scope.datetimepicker_options = {
      viewMode: 'years',
      format: 'DD.MM.YYYY',
      defaultDate: new Date(2000, 0, 1, 00, 01),
      icons: {
        next: 'glyphicon glyphicon-arrow-right',
        previous: 'glyphicon glyphicon-arrow-left',
        up: 'glyphicon glyphicon-arrow-up',
        down: 'glyphicon glyphicon-arrow-down'
      }
    };

    $scope.formData = {
      salutation: 'male',
      country: 'DE',
    };

    $scope.isSaving = false;
    $scope.toc_accepted = false;
    $scope.params = {};
    $scope.saved = false;

    self.getHostLeadManagerAPI = function () {
      var host;
      switch ($scope.params.env) {
        case 'production':
          host = 'https://manager.you-drive.de/api/manager/v1/';
          break;
        case 'staging':
          host = 'https://youdrive_crm:gBrDxV9Lz2f7@youdrive-crm.development.avarteq.de/api/manager/v1/';
          break;
        case 'dev':
          host = 'http://localhost:3000/api/manager/v1/';
          break;
      }
      return host;
    };

    $scope.init = function (learner_lead_slug, advertiser_key_id, env) {
      $scope.$evalAsync(function () {
        $scope.params = {
          env: env,
        };
        $scope.formData.learner_lead_slug = learner_lead_slug;
        if (advertiser_key_id) {
          $scope.formData.advertiser_key_id = advertiser_key_id;
        }
      });
    };

    $scope.submit = function () {
      if ($scope.formData.toc_accepted === true) {
        $scope.saveError = undefined;
        $scope.isSaving = true;
        return $http({
          method: 'POST',
          url: self.getHostLeadManagerAPI() + 'learner_leads.json',
          params: $scope.formData
        }).then(function successCallback(response) {
          $scope.saved = true;
          $scope.isSaving = false;
        }, function errorCallback(response) {
          console.log(JSON.stringify(response));
          $scope.saveError = "Es ist ein Fehler beim Speichern aufgetreten. Bitte kontrolliere deine Eingaben und versuch es dann nochmal.";
          $scope.isSaving = false;
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }
    }

  }
  ])
;