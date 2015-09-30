var helper = {
    debug : function() {
        postMessage({'evtName':'debug', 'echo': arguments});
    }
}

var onmessage = function(e) {
    var reader = new FileReader(),
        file = e.data.file,
        index = e.data.index;

    reader.onloadend = function(e) {
        postMessage({'index': index, 'evtName': 'loadend', 'src': e.target.result});
    }

    reader.readAsDataURL(file);
}
