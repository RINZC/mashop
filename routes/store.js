const express = require('express');
const r = express.Router();

const {store} = require('../libs/db');

r.get('/',async (req, res) => {
    if (req.session.name == undefined) {
        return res.redirect('/')
    }
    res.render('store', {_Data: req, m_session: req.session, store: await store.get()})
})

r.get ( '/buy' , async ( req , res ) => {
    if (req.session.name == undefined) {
        return res.redirect('/')
    }
    try {
        let id = req.query.id
        store.buy(id, req.session)
    } catch (e) {
        console.error(e)
    }
})

module.exports = r