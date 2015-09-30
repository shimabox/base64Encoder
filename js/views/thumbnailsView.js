;(function() {
    Base64Encoder.View.Thumbnails = Backbone.View.extend({
        el: $('#thumbnailsArea'),
        initialize: function() {
            if (this.model.get('isSelect')) {
                this.$el.show();
            }

            this.model.on('onLoadEnd', this.loadend, this);
        },
        loadingRender: function() {
            var thumbnail = new Base64Encoder.View.Thumbnail({
                model: this.model,
                collection: this.collection
            });

            this.$el.append(thumbnail.loadingRender().el);
        },
        loadend: function() {
            this.model.trigger('renderThumbnail');
        }
    });
})();
