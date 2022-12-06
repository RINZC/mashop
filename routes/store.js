const express = require('express');
const r = express.Router();

r.get('/', (req, res) => {
    res.render('store', {_Data: req, m_session: req.session, store: ''})
})

module.exports = r