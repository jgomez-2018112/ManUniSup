'use strict'


exports.errHandler = (err, req, res, next)=>{
    console.error(err.message);
    res.status(500).send('Algo salio ma en el servidor');
};

