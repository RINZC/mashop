const express = require('express');
const r = express.Router();

const {store} = require('../libs/db');

r.post('/', (req, res) => {
    if(req.session.perm != 'super'){
        res.redirect('/')
    } else if (req.session.perm === 'super') {
        res.render('index', {_Data: req, m_session: req.session, content: 'backend', items: store.get()})
    }
})

module.exports = r;