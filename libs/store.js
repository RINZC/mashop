const { MongoClient , ObjectId} = require('mongodb');
const uri = "mongodb://data.app.riz:4566/"

const client = new MongoClient(uri)
const dataBase = client.db('shop_store');

const cmd = new(require('./cmd'))(dataBase);



const store= {
    async get(t){
        if ( t == null){
            t = {}
        };
        x = await cmd.findOne('items', t)
        return x
    },
    async add(t) {
        return await cmd.insertOne('items', t)
    },
    async buy(id, session) {
        res = await this.get({_id: ObjectId(id)})
        value = res[0].data.value
        // console.log(`${session.osb} : ${value}`)
        // console.log(res[0])
        if(res[0]!=null && (session.osb>=value)!=false ){
            console.log('success')
            // return [cmd.deleteOne('items', {_id: ObjectId(id)}), value]
            return [true, value]
        } else {
            return [session.osb>=value, 'not_enough_osb'];
        }
    }
}

module.exports = store;