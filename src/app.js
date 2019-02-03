const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const path = require('path');

const bodyParser = require('body-parser');
const myConnection = require('express-myconnection'),
dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'Rodrigo.1',
    port: 3306,
    database: 'agence'
  };




// importando las rutas //#endregion


const consutorRouter = require('../src/routes/consultores') ;


app.set('port', process.env.PORT || 3000);

;

// body parser para application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//midelwares
app.use(morgan('dev'));

app.use(myConnection(mysql, dbOptions, 'single'));



//statict files //#endregion


// use it before all route definitions

//configurar cabeceras y cors
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials','*');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();

});



//routes
app.use('/' ,express.static('client', {redirect:false}));
app.use('/', consutorRouter);


app.use(express.static(path.join(__dirname)));

app.get('*', function(req , res , next){
    res.sendFile(path.resolve('client/src/index.html'));
})

app.listen(app.get('port'), () =>{
    console.log('server run in port 3000');
});
