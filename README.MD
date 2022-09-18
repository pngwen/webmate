# Webmate
This program adds a little animated friend to a web page. This program
is inspired by the little desk-mate apps we all used to love back in
the 1990s (anyone remember esheep?)

The buddy is displayed in fixed positioning so it will always be
present on your page, and will not scroll away. The webmates
themselves consist of a directory of images, and if you use gifs they
will be animated. Their behavior is defined as a simple JSON file.


## Using Webmate
Using this program is fairly simple. First, you must include
webmate.js in your web page:

```html
<script src = "webmate.js"></script>
```

Next, you need to call the `webmate` function and give it a path
to the directory where your webmate is defined:

```javascript
<script>
webmate("./oldpa");
</script>
```

See the file `sample.html` for a web page which has a webmate.

Note that the `webmate` function returns the object representing the
webmate. If you want to manipulate it in a script, you will want to
capture it in a variable.


## Creating a Webmate
A webmate is a directory consisting of the graphics which the webmate
can display and a file `webmate.json` which defines its behavior. If
you want your webmate to be animated, its graphics should be animated
gifs.

The format for this file is shown below:

```JSON
{
    "name": "oldpa",
    "author": "pngwen",
    "behaviors": [
        {"image": "oldpa-book.gif", 
         "dxrange":[0,0], 
         "dyrange":[0,0],
         "dtrange":[10, 60]},
        {"image": "oldpa-fly.gif", 
         "dxrange":[-10,10], 
         "dyrange":[-10,10],
         "dtrange":[10, 30]},
        {"image": "oldpa-stand-left.gif", 
         "dxrange":[0,0], 
         "dyrange":[0,0],
         "dtrange":[10, 20]},
        {"image": "oldpa-stand-right.gif", 
         "dxrange":[0,0], 
         "dyrange":[0,0],
         "dtrange":[10, 20]},
        {"image": "oldpa-walk-left.gif", 
         "dxrange":[-1, -10], 
         "dyrange":[0,0],
         "dtrange":[15, 40]},
        {"image": "oldpa-walk-right.gif", 
         "dxrange":[1, 10], 
         "dyrange":[0,0],
         "dtrange":[15, 40]}
    ]
}
```

`name` and `author` should be fairly self explanatory. The behaviors
all consist of the following fields:

* `image` - The name of the image file to use for this behavior.
* `dxrange` - The range of values for the change in x. `[min, max]`
* `dyrange` - The range of values for the change in y. `[min, max]`
* `dtrange` - The range of values for the duration. `[min, max]`

When the webmate runs, it picks a random behavior and a random `dx`,
`dy`, and `duration` according to the behaviors ranges. `dx` and `dy`
are given in pixels per second. `duration` is given in seconds. While
executing a behavior, the webmate will update itself 10 times per
second. Once the duration has expired, a new behavior is randomly
selected and the process begins again.

## Acknowledgements
The `oldpa` directory contains a sample webmate. This is based on
a program which I downloaded from a long-defunct section of
tunetown.tw. The program's name is `oldpa.exe`, but all of its text is
in Chinese. I do not know who wrote this program, but I just love this
little guy and I could not let him be lost to history. So I extracted
his graphics from the exe file and turned him into gifs so he could
live on the web! He was part of my desktop environment from Windows
3.1 through Windows 7. He no longer worked properly from that point
forward.

You can see `oldpa` in the computing section of my website:
[CS Castle](https://pngwen.sdf.org/cscastle.html)
