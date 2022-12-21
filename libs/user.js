const { MongoClient , ObjectId} = require('mongodb');
const uri = "mongodb://data.app.riz:4566/"

const client = new MongoClient(uri)
const dataBase = client.db('users_store');

const md5 = require('md5');
const cmd = new(require('./cmd'))(dataBase);

const user = {
    async create(data){
        var findRes = [];
        var findPreRes;
        await this.find(
            [
                {name: data.name},
                {email: data.email}
            ]
        ).then(o=>{
            findPreRes=o
        })
        if ( findPreRes[0] == 0 ) {
            findRes[0]=0
        } else {
            findRes[0]=1
        }; if ( findPreRes[1] == 0 ) {
            findRes[1]=0
        } else {
            findRes[1]=1
        };
        var findFinalRes = `2${findRes[0]}${findRes[1]}`;
        if (findFinalRes=='200'){
                let ndate = new Date(Date.now());
                let cd = `${ndate.getFullYear()}.${ndate.getMonth()}.${ndate.getDate()}`
                let comp = {
                    perm:'norm',
                    name: data.name,
                    password: md5(data.password),
                    email: data.email,
                    created: cd,
                    osb: 0
                }
                await cmd.insertOne('users', comp);
                return {
                    message: 'success',
                    code: findFinalRes
                }
        }else { 
            return {
                message: 'error',
                code: findFinalRes
            } 
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
        var result = []
        for ( x in data ) {
            result.push(Object.keys(await cmd.findOne('users', data[x])).length)
        }
        return result
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