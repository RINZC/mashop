const express = require('express');
const r = express.Router();

const {store, user} = require('../libs/db');
const {xlogin} = require('./utils');

r.get('/',async (req, res) => {
    if (req.session.name == undefined) {
        return res.redirect('/')
    } else if (req.session.name) {
        await xlogin(req, req.session)
    }
    let gerr = null;
    if ( req.session.got_error ) {
        gerr = req.session.got_error;
        req.session.got_error = null
    }
    res.render('store', {_Data: req, m_session: req.session, store: await store.get(), got_error: gerr})
})

r.get ( '/buy' , async ( req , res ) => {
    if (req.session.name == undefined) {
        return res.redirect('/')
    }
    try {
        let id = req.query.id
        let onBuy = await store.buy(id, req.session)
        if ( onBuy[0]==true ) {
            user.update(
                {
                    session: req.session,
                    value: onBuy[1]
                }
            )
            return res.redirect('/store')
        } if(onBuy[0]==false) {
            req.session['got_error'] = onBuy[1]
            return res.redirect(`/store#${id}`) 
        }
    } catch (e) {
        console.error(e)
    }
})

module.exports = r