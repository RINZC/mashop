const ep = require('express');
const { login } = require('../libs/db');
const r = ep.Router();

const user = require('../libs/db')

r.get('/', (req, res)=>{
    var err = 0
    if (req.query.out == "1"){
        console.log('session destroyed')
        req.session.destroy()
        return res.redirect('/')
    } else if (req.query.error){
        switch (req.query.error){
            case '1':
                err = 1
            case '2':
                err = 2
        }
    }
    res.render("user.ejs", {_Data: req, m_session: req.session, m_error: err})
})
r.post('/',async (req, res)=>{
    xlogin=async ()=>{
        let data = {
            name: bod.uname,
            email: bod.memail,
            password: bod.paswd
        }
        console.log("on login")
        var c = user.login(data)
        await c.then(r=>{ 
            if(r==null){
                res.redirect('/user?error=1')
            } else {
                let data = {}
                for ( i in r) {
                    data[i] = r[i]
                }
                req.session.name = data.name
                req.session.email = data.email
                req.session.created = data.created
                res.redirect('/')
            }
        })
    }
    var bod = req.body
    if (bod.memail==undefined){
        xlogin()
    } else if (bod.memail){
        let data = {
            name: bod.uname,
            email: bod.memail,
            password: bod.paswd
        }
        console.log(data.name) 
        let resp = user.create(data)
        canLogin = false
        await resp.then(r=>{
            if ( r == 'success'){
                canLogin = true
            } else if ( r == 'error'){
                res.redirect('/user?error=2')
            }
        }) 
        if ( canLogin == true ) {
            console.log(canLogin)
            return xlogin()
        }
    }   
})

module.exports = r;   