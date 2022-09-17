function webmate_load(dir) {
    if(dir[dir.length - 1] != '/') {
        dir = dir + '/'
    }

    var filename = dir + "webmate.json"
    var request = new XMLHttpRequest();
    request.open('GET', filename, false);
    request.send(null);
    if (request.status == 200) {
        return JSON.parse(request.responseText);
    } else {
        return null;
    }
}
