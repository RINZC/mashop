const { MongoClient , ObjectId} = require('mongodb');
const uri = "mongodb://data.app.riz:4566/"

const client = new MongoClient(uri)
const dataBase = client.db('shop');

const insert = async (coll, data)=>{
    try {
        const usersColl = dataBase.collection(coll);

        const query = data;
        await usersColl.insertOne(query)
    } finally {
        
    }
} 
const findOne = async (coll, data)=>{
    try {
        const usersColl = dataBase.collection(coll);

        const query = data;
        const out = await usersColl.findOne(query)
        console.log(out)
        return out;
    } catch (e) {
        console.error(e)
    }
} 

const user = {
    async create(data){
        if (await this.find({name: data.name})==null){
            if(this.compare(data)){
                let ndate = new Date(Date.now());
                let cd = `${ndate.getFullYear()}.${ndate.getMonth()}.${ndate.getDay()}`
                let comp = {
                    name: data.name,
                    password: data.password,
                    email: data.email,
                    created: cd
                }
                await insert('users', comp);
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
        return await findOne('users', data)
    },
}

//user.create({name:"oprcrinzc", email:'oprcrinzc@mail.riz'})
//user.create({name:"rinzc", email:'rinzc@mail.riz'})

module.exports = user;