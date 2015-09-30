var _helper = {
    debug : function() {
        postMessage({'evtName':'debug', 'echo': arguments});
    }
};

onmessage = function(e) {
    var reader = new FileReader(),
        file = e.data.file,
        index = e.data.index;

    reader.onloadend = function(e) {
        postMessage({'index': index, 'evtName': 'loadend', 'src': e.target.result});
        // _helper.debug(file, index);
    };

    reader.readAsDataURL(file);
};