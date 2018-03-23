// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '189169395033134', // your App ID
        'clientSecret'  : '33a5d5ae7cce5762a1ff0d649dbe36c7', // your App Secret
        'callbackURL'   : 'http://localhost:8000/api/facebookCallback'
    },

    'googleAuth' : {
        'clientID'      : '386528372500-fuqf7224n11epmgkjak9u9jqojcj912n.apps.googleusercontent.com',
        'clientSecret'  : 'svd3lVTWBBLtTLULmCbxQGup',
        'callbackURL'   : 'http://localhost:8000/api/googleCallback'
    }

};
