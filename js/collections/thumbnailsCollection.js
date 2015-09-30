;(function() {
    Base64Encoder.Collection.Thumbnails = Backbone.Collection.extend({
        FILE_MAX_SIZE: 5120000, // 5M 変えたければこの値を変える
        model: Base64Encoder.Model.Thumbnail,
        initialize: function() {
             this.fileReadedCnt = 0;
        },
        readFiles: function(files){
            var self = this,
                fileSize = 0,
                fileCnt = files.length,
                models = [];

            var loop = 0;
            for (var i = 0, f; f = files[i]; i++) {

                if (!f.type.match('image.*') ||
                        f.type.match("image¥/vnd.adobe.*")) {
                    continue;
                }

                fileSize += ~~f.size;
                if (fileSize > self.FILE_MAX_SIZE) {
                    return;
                }

                var model = new Base64Encoder.Model.Thumbnail({
                    isSelect: self.fileReadedCnt === 0 && loop === 0,
                    name: f.name,
                    type: f.type,
                    size: f.size
                });
                models.push(model);

                if (self.fileReadedCnt === 0) {
                    self.trigger('detailRender-start', model);
                }

                // 画像追加 0になるのは最初の読込処理だけ(非同期)
                if (self.fileReadedCnt > 0) {
                    self.trigger('addDetail', model);
                }

                self.trigger('render-start', model);

                var worker = new Worker('./js/worker/readFileWorker.js');
                worker.postMessage({"file": f, "index": loop});
                worker.onmessage = function (e) {
                    var _model = models[e.data.index];
                    switch (e.data.evtName) {
                        case 'loadend' :
                            //なるべく描画をブロックしないように
                            _.defer(function(){
                                _model.set({src: e.data.src}, {silent: true});
                                self.add(_model, {silent: true});
                                self.trigger('loadend', _model);
                            });

                            self.fileReadedCnt++;
                            break;
                        case 'debug' :
                            console.log(e.data.echo);
                            break;
                        default:
                            break;
                    }
                }

                loop++;
            }
        }
    });
})();
