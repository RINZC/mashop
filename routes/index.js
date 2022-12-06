const express = require('express');
const r = express.Router();

r.get('/', (req, res)=>{
    res.render("index.ejs", {_Data: req, m_session: req.session});
})

module.exports = r;