const { MongoClient , ObjectId} = require('mongodb');
const uri = "mongodb://data.app.riz:4566/"

const client = new MongoClient(uri)
const dataBase = client.db('users_store');

const md5 = require('md5');
const cmd = new(require('./cmd'))(dataBase);

const user = {
    async create(data){
        if (await this.findOne({name: data.name})==null){
            if(this.compare(data)){
                let ndate = new Date(Date.now());
                let cd = `${ndate.getFullYear()}.${ndate.getMonth()}.${ndate.getDay()}`
                let comp = {
                    perm:'norm',
                    name: data.name,
                    password: md5(data.password),
                    email: data.email,
                    created: cd,
                    osb: 0
                }
                await cmd.insertOne('users', comp);
                return 'success'
            } else { 
                return 'error'  
            }
        }else { 
            return 'error'  
        }
    },
    async login(data){
        const usersColl = dataBase.collection('users');

        const query = {
            name: data.name,
            password: data.password
        };
        var out = usersColl.findOne(data)
        if(out!={}){
            return new Promise((res, rej)=>{
                res(usersColl.findOne(query))
            });
        } else {
            return new Promise((res, rej)=>{
                res("error")
            });
        }
    },
    compare(data){
        return true;
    },
    async find(data){
        return await cmd.findOne('users', data)
    },
    async update(data){
        var value = data.value;
        var session = data.session;
        session.osb -= value
        await cmd.updateOne(
            'users',
            {
                id: {name: session.name},
                new: {
                    $set : {
                        osb: session.osb,
                    }
                }
            }
        )
    }
}

module.exports = user;