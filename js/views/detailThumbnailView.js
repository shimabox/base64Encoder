;(function() {
    Base64Encoder.View.DetailThumbnail = Backbone.View.extend({
        tagName: 'div',
        id: 'detail',
        className: 'well well-small clearfix',
        target: $('#detail-target'),
        selectedImageAnchor: $('#selected-image-anchor'),
        tmplDetailThumbnail: _.template($('#tmpl-detail').html()),
        tmplDetailThumbnailInfo: _.template($('#tmpl-detail-info').html()),
        tmplAnchor: _.template($('#tmpl-anchor').html()),
        initialize: function() {
             //もろもろ削除する
            this.remove();
            this.model.off();

              this.listenTo(this.model, 'detail-finish-render', this.render);
              this.listenTo(this.model, 'select-change', this.selectChangeRender);
        },
        loadingRender: function(){
              var modelJson = { isLoading: true, name: "Now Loading..." },
                  tmpl = this.tmplDetailThumbnail(modelJson);

              this.target.html(this.$el.html(tmpl));
        },
        render: function(){
            var modelJson = this.model.toJSON(),
                tmpl = this.tmplDetailThumbnail(modelJson);

            //サムネイルリストの描画を待ってから
            _.defer(function(){
                this.target.html(this.$el.html(tmpl));
                this.$el.append(this.tmplDetailThumbnailInfo(modelJson));
                this.selectedImageAnchor.html(this.tmplAnchor(modelJson));
                this.addEvents();
                return this;
            }.bind(this));
        },
        selectChangeRender: function(){
            this.loadingRender();
            //loadingの表示を行なってからレンダリング開始
            _.defer(function(){ this.render(); }.bind(this));
        },
        addEvents: function(){
            var events = {
                'click #detail-img-info .btn': 'toggleDisplayTag'
            };
            this.delegateEvents(events);
        },
        toggleDisplayTag: function(e){
            e.stopPropagation();
            var tagId = $(e.target).attr('id');
            this.detailImgInfoRender(true, tagId);
            //loadingの表示を行う為に少し遅らせてからレンダリング開始
            _.delay(function(){ this.infoRender(tagId); }.bind(this), 100);
        },
        detailImgInfoRender: function(isLoading, tagId) {
            $('#detail-img-info').remove();
            this.model.set({ isLoading: isLoading, selectTag: tagId}, {silent: true});
            this.$el.append(this.tmplDetailThumbnailInfo(this.model.toJSON()));
        },
        infoRender: function(tagId) {
            this.detailImgInfoRender(false, tagId);
        }
    });
})();
