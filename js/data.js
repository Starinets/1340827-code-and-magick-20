'use strict';

(function () {
  var getSimilarWizardsData = function (cb) {
    var onSuccess = function (data) {
      cb(data);
    };

    var onError = function (error) {
      window.util.showError(error);
    };

    window.backend.load(onSuccess, onError);
  };

  window.data = {
    getSimilarWizards: getSimilarWizardsData,
  };
})();
