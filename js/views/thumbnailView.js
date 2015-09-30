;(function() {
    Base64Encoder.View.Thumbnail = Backbone.View.extend({
        tagName: 'li',
        className: 'thumbnail-list',
        tmplThumbnail: _.template($('#tmpl-thumbnail').html()),
        initialize: function(){
            this.model.on('renderThumbnail', this.finishRender, this);
            this.model.on('change:isSelect', this.isSelectedChange, this);
        },
        events: {
            'click .thumbnail-img': 'onSelect'
        },
        loadingRender: function(){
            var json = { "isLoading": true, "src": "./img/loading.gif", "name": "Now Loadning..." },
                tmpl = this.tmplThumbnail(json);

            this.$el.html(tmpl);
            return this;
        },
        finishRender: function(){
            this.$el.html(this.tmplThumbnail(this.model.toJSON()));
        },
        onSelect: function(e) {
            e.stopPropagation();

            if (this.model.get('isSelect')) {
                return;
            }

            this.collection.findWhere({isSelect: true}).set({isSelect: false});
            this.model.set({isSelect: true});

            this.model.trigger('select-change');
        },
        isSelectedChange: function(){
            var target = $(this.el).find('.thumbnail-img');

            if (this.model.get('isSelect')) {
                target.addClass('selected');
                return;
            }

            target.removeClass('selected');
        }
    });
})();
