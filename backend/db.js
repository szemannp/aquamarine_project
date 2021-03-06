'use strict';

function handleError (err) {
  if(err) {
    console.log(err.toString());
    return;
  }
}

var readTheFunctions = (function () {

  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'solar``7',
    database: 'caloriecounter'
  });


  con.connect();

  function readAll (data, callback) {
    con.query('SELECT * FROM meals;', function(err,rows){
      handleError(err);
      callback(rows);
    });
  }

  function createNewMeal(req, callback) {
    con.query("INSERT INTO meals (name, calories, date) VALUES ('"+ req.body.name +"','" +req.body.calories+ "', '"+req.body.date.split('T')[0]+"')", function(err,rows){
      handleError(err);
      callback({
        id: rows.insertId,
        name: req.body.name,
        calories: req.body.calories,
        date: req.body.date})
    });
  }

  function deleteCalorie(id, callback) {
    con.query('DELETE FROM meals WHERE id = ?', id, function(err,rows){
      handleError();
      callback({id: id});
    });
  }

  return {
    readAll: readAll,
    createNewMeal: createNewMeal,
    deleteCalorie: deleteCalorie
  }
})();

module.exports = readTheFunctions;
