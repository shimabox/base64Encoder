//event.dataTransferプロパティ追加
jQuery.event.fixHooks['drop'] = { props: ['dataTransfer'] };

//namespace
window.Base64Encoder = {
    View: {},
    Model: {},
    Collection: {}
};

//main
jQuery(function($){
    new Base64Encoder.View.MainView({
        collection: new Base64Encoder.Collection.Thumbnails()
    });
});
