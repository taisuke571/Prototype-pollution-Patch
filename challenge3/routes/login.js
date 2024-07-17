var express = require('express');
var path = require('path');
const pug = require('pug');
var router = express.Router();

// Store the original arguments to ensure restart with clean values
const originalArgs = [...process.argv];

/* GET users listing. */
router.post('/', function(req, res, next) {
    try {
        // Parse the user data using JSON.parse to prevent prototype pollution
        const userData = JSON.parse(req.body);

        const userName = userData.user && userData.user.hasOwnProperty('name') ? userData.user.name : null;
        const userPassword = userData.user && userData.user.hasOwnProperty('password') ? userData.user.password : null;

        if (userName === "admin" && userPassword === "dksjhf2798y8372ghkjfgsd8tg823gkjbfsig7g2gkfjsh") {
            res.send('Nice Try??');
        } else {
            res.send(`${userPassword} is the incorrect password for ${userName}`);
        }

        var proc = require("child_process").spawn('sleep', ['10']);
    }
    catch (error) {
        setTimeout(function() {
            process.on("exit", function() {
                require("child_process")
                    .spawn(
                        originalArgs.shift(),
                        originalArgs,
                        {
                            cwd: process.cwd(),
                            detached: true,
                            stdio: "inherit"
                        }
                    );
            });
            process.exit();
        }, 1000);
    }
});

router.get('/', function(req, res, next) {
    res.send('You need to provide a username and password');
});

module.exports = router;
