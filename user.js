var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Traveling';
var fs=require('fs');
var data=fs.readFileSync('./html/word.json');
var word=JSON.parse(data);

module.exports = {
    signup: function(name, email, password){
        MongoClient.connect(url, function(err, db) {
            db.collection('user').insertOne( {
                "name": name,
                "email": email,
                "password": password
            },function(err, result){
                assert.equal(err, null);
                console.log("Пользователь " + name + " успешно зарегистрирован");
            });
        });
    },
    getUserInfo: function(username, callback){
        MongoClient.connect(url, function(err, db){

            db.collection('user').findOne( { email : username
            },function(err, result){
                if(result==null){
                    callback(false)
                }
                else{
                    callback(result);
                }
            });
        });
    },
    updateProfile: function(name, password, username, callback){
        MongoClient.connect(url, function(err, db) {
            db.collection('user').updateOne(
                { "email": username },
                { $set:
                        { "name" : name,
                            "password" : password
                        }
                },function(err, result){

                    if(err == null){
                        callback(true)
                    }
                    else{
                        callback(false)
                    }
                });
        });
    },
    validateSignIn: function(username, password,callback){
        MongoClient.connect(url, function(err, db){

            db.collection('user').findOne( { email : username ,password: password
            },function(err, result){
                if(result==null){
                    console.log('Пользователь не смог войти(неверное имя или пароль)')
                    callback(false)
                }
                else{
                    console.log('Пользователь с почтой: ' + username + ' успешно вошел')
                    callback(true)
                }
            });
            db.collection('data').insertOne({
                 word
            }),function(err, result){
                assert.equal(err, null);
                console.log("error with data.json");
            };
        });
    }
}
