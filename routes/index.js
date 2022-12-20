const express = require('express');
const session = require('express-session');
const r = express.Router();

const {xlogin} = require('./utils');

r.get('/', async (req, res)=>{

    if ( req.session.name ) {
        await xlogin(req, req.session)
    }

    res.render("index.ejs", {_Data: req, m_session: req.session});
})

module.exports = r;