/*
    Webmate adds a little friend to your web pages.
    Copyright (C) 2022 Robert Lowe

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

function webmate_load(dir) {
    if(dir[dir.length - 1] != '/') {
        dir = dir + '/'
    }

    // attempt to load the json file
    var filename = dir + "webmate.json"
    var request = new XMLHttpRequest();
    request.open('GET', filename, false);
    request.send(null);
    if (request.status != 200) {
        return undefined;
    } 

    var mate = JSON.parse(request.responseText);

    // correct the directories for the images
    mate.behaviors.forEach( (elem, index) => {
        elem.image = dir + elem.image;
    });

    ////////////////////////////////////////////////
    // Webmate Methods
    ////////////////////////////////////////////////
    mate.random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    mate.choose_behavior = function () {
        var idx = this.random(0, mate.behaviors.length-1);

        // select the current behavior
        this.behavior = mate.behaviors[idx];

        // set the image
        this.elem.src = mate.behavior.image;

        // generate the speed and duration
        var dxr = mate.behavior.dxrange;
        var dyr = mate.behavior.dyrange;
        var dtr = mate.behavior.dtrange;
        this.dx = this.random(dxr[0], dxr[1])/10;
        this.dy = this.random(dyr[0], dyr[1])/10;
        this.duration = this.random(dtr[0], dtr[1]) * 10;
    }


    mate.move = function(x, y) {
        this.x = x;
        this.y = y;
        this.elem.style.top = y + "px";
        this.elem.style.left = x + "px";
    }


    mate.update = function() {
        this.duration--;
        if(this.duration < 0) {
            this.choose_behavior();
        }

        this.move(this.x + this.dx, this.y + this.dy);
    }

    mate.drag = function(e) {
        e.preventDefault();
        var preview = this.elem.cloneNode(true);
        preview.style.display = "none";
        document.body.appendChild(preview);
        e.dataTransfer.setDragImage(preview, 0, 0);
        this.move(e.clientX, e.clientY);
    }



    return mate;
}






function webmate(dir) {
    // load the webmate
    var mate = webmate_load(dir);

    // randomly position the webmate
    mate.x = mate.random(0, window.innerWidth);
    mate.y = mate.random(0, window.innerHeight);

    // create the webmate element
    mate.elem = document.createElement('img');
    mate.elem.style.position = 'fixed';
    mate.elem.style.top = mate.y + "px";
    mate.elem.style.left = mate.x + "px";

    // do the first behavior
    mate.choose_behavior(mate);

    mate.elem.ondrag = function(e) { mate.drag(e); }

    // display the mate
    document.body.appendChild(mate.elem);

    //set the timeout going
    window.setInterval(function() { mate.update();}, 100);

    return mate;
}
