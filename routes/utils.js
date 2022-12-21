const {user} = require('../libs/db');
const xlogin = async (req, iden)=>{
    let data = {
        name: iden.name,
        password: iden.password,
    }
    // console.log("on login")
    var c = user.login(data)
    await c.then(r=>{ 
        if(r==null){
            res.redirect('/user?error=1')
        } else {
            let data = {}
            for ( i in r) {
                data[i] = r[i]
            }
            // req.session.perm = data.perm
            // req.session.name = data.name
            // req.session.email = data.email
            // req.session.created = data.created
            // req.session.osb = data.osb
            for (x in data){
                if (x != '_id') {
                    req.session[x] = data[x]
                }
            }
        }
    })
}

module.exports = {xlogin};