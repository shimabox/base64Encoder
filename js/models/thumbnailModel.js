;(function() {
    Base64Encoder.Model.Thumbnail = Backbone.Model.extend({
        defaults: {
            src: '',
            name: '',
            type: '',
            size: '',
            selectTag: 'css',
            isSelect: false,
            isLoading: false
        }
    });
})();
