# safeDrive

Presentation showing dangerous traffic situations with solutions.
It could be used e.g. in schools.

Using [http://phaser.io](http://phaser.io) framework.

[http://skobo.pl/safedrive/](http://skobo.pl/safedrive/)

![screenshot](https://raw.githubusercontent.com/adamskopl/safeDrive/master/safedrive.png)

# building

- generate_min.sh to create js file ready to be minimalized with e.g. http://jscompress.com
- save as e.g. safedrive.min.js. Include on a page with phaser.min.v2.3.0.js and and 'assets' directory' and we're done:

```
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>SafeDrive</title>
    <script src="phaser.min.v2.3.0.js"></script>
    <script src="safedrive.min.js"></script>
</head>

<body>
    <script type="text/javascript">
        window.onload = function () {
            startSafeDrive();
        }
    </script>
</body>

</html>
```