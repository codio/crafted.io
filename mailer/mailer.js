var express = require("express"),
    app = express(),
    https = require('https'),
    querystring = require('querystring'),
    _ = require('lodash'),
    httpsOptions = {
        hostname: 'craftedio.wufoo.com',
        path: '/api/v3/forms/z7x4m1/entries.json',
        method: 'POST',
        auth: '84AD-7P0Q-1429-SV7W:craftedio'
    },
    fields = {
        name: {
            id: 'Field12'
        },
        email: {
            id: 'Field3'
        },
        phone: {
            id: 'Field16'
        },
        text: {
            id: 'Field4'
        }
    };

app.use(express.logger());
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    next();
};
app.configure(function () {
    app.use(allowCrossDomain);
    app.use(express.bodyParser());
});

app.post('/', function (req, res) {
    var postData = {}, userData = req.body, options, httpsReq

    res.set('Content-Type', 'application/json');

    _.each(fields, function (val, key) {
        userData[key] = !userData[key] ? '' : userData[key]
        postData[val.id] = userData[key]
    })

    postData = querystring.stringify(postData);

    options = _.merge(httpsOptions, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    })

    httpsReq = https.request(options, function (httpsRes) {
        httpsRes.on('data', function (d) {
            var serverRes = JSON.parse(d),
                response = {
                    success: true
                }

            if (serverRes.Success) return res.send(response);

            response.errors = {}
            response.success = false

            _.each(serverRes.FieldErrors, function (error) {
                response.errors[_.findKey(fields, {id: error.ID})] = error.ErrorText
            })

            res.send(response)
        });
    });

    httpsReq.on('error', function (e) {
        console.log('WuFoo request error', e)
        res.send(500, 'Remote server error please try again later');
    });

    httpsReq.write(postData);
    httpsReq.end();
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});