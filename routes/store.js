const express = require('express');
const r = express.Router();

const {store, user} = require('../libs/db');

r.get('/',async (req, res) => {
    if (req.session.name == undefined) {
        return res.redirect('/')
    }
    let err = 0;
    if (req.query.alert != undefined) {
        switch(req.query.alert){
            case 'not_enough_osb':
                err = 4;
                break;
        }
    }
    console.log(err)
    res.render('store', {_Data: req, m_session: req.session, store: await store.get(), m_error: err})
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
            return res.redirect('/store?alert=not_enough_osb')
        }
    } catch (e) {
        console.error(e)
    }
})

module.exports = r