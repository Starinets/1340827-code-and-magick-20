'use strict';

(function () {
  var loadSimilarWizard = window.backend.load;
  var showError = window.util.showError;

  var getSimilarWizardsData = function (cb) {
    var onSuccess = function (data) {
      cb(data);
    };

    var onError = function (error) {
      showError(error);
    };

    loadSimilarWizard(onSuccess, onError);
  };

  window.data = {
    getSimilarWizards: getSimilarWizardsData,
  };
})();
