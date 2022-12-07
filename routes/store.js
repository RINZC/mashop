const express = require('express');
const r = express.Router();

const {store} = require('../libs/db');

r.get('/',async (req, res) => {
    res.render('store', {_Data: req, m_session: req.session, store: await store.get()})
})

module.exports = r