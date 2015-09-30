;(function() {
    Base64Encoder.View.MainView = Backbone.View.extend({
        el: '#read-img',
        initialize: function(opts) {
            this.collection.on('render-start', this.render, this);
            this.collection.on('detailRender-start', this.detailRender, this);
            this.collection.on('addDetail', this.addDetail, this);
            this.collection.on('loadend', this.dispathLoadEnd, this);
        },
        events: {
            'change input[id=read-file]': 'onChange',
            'click #choice': 'onClick',
            'dragover': 'onDragOver',
            'drop': 'onDrop'
        },
        onClick: function(e) {
            e.stopPropagation();
            $('input[id=read-file]').click();
        },
        onChange: function(e) {
            e.stopPropagation();
            this.readFiles(e.target.files);
        },
        onDragOver: function(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        onDrop: function(e) {
            e.preventDefault();
            e.stopPropagation();

            this.readFiles(e.dataTransfer.files);
        },
        readFiles: function(files){
            this.collection.readFiles(files);
        },
        render: function(thumbnail){
            var thumnails = new Base64Encoder.View.Thumbnails({
                model: thumbnail,
                collection: this.collection
            });
            thumnails.loadingRender();
            return this;
        },
        detailRender: function(thumbnail){
            var detailThumbnail = new Base64Encoder.View.DetailThumbnail({
                model: thumbnail
            });
            detailThumbnail.loadingRender();
        },
        addDetail: function(thumbnail) {
            var detailThumbnail = new Base64Encoder.View.DetailThumbnail({
                model: thumbnail
            });
        },
        dispathLoadEnd: function(thumbnail){
            if (thumbnail.get('isSelect')) {
                thumbnail.trigger('detail-finish-render');
            }

            thumbnail.trigger('onLoadEnd');
        }
    });
})();
