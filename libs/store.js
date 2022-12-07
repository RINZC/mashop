const { MongoClient , ObjectId} = require('mongodb');
const uri = "mongodb://data.app.riz:4566/"

const client = new MongoClient(uri)
const dataBase = client.db('shop_store');


// func main
const find = async (coll, data) => {
    try {
        let catchs = [];
        (await dataBase.collection(coll).find(data).toArray()).forEach(item => {
            if ( item != null) {
                catchs.push(item)
            }
        }); return catchs;
    } catch (e) {
        console.error(e);
    }
};
const insertOne = async ( coll, data ) => {
    try {
        (await dataBase.collection( coll ).insertOne(data))
    } catch (e) {
        console.error(e);
    }
}
// func main

const store= {
    async get(t){
        if ( t == null){
            t = {}
        };
        x = await find('items', t)
        return x
    },
    async add(t) {
        return await insertOne('items', t)
    }
}

module.exports = store;