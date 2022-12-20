// func main

class cmd{
    dataBase;
    constructor( db ){
        this.dataBase = db;
    }
    findOne = async (coll, data) => {
        try {
            let catchs = [];
            (await this.dataBase.collection(coll).find(data).toArray()).forEach(item => {
                if ( item != null) {
                    catchs.push(item)
                }
            }); return catchs;
        } catch (e) {
            console.error(e);
        }
    };
    insertOne = async ( coll, data ) => {
        try {
            (await this.dataBase.collection( coll ).insertOne(data))
        } catch (e) {
            console.error(e);
        }
    }
    deleteOne = async ( coll, data ) => {
        try {
            this.dataBase.collection(coll).deleteOne(data, (err, res) => {
                if (err)
                    throw err;
                else {
                    return true;
                }
            })
        } catch ( e ) {
            console.error(e);
        }
    }
    updateOne = async ( coll, data ) => {
        try {
            await this.dataBase.collection(coll).updateOne(data.id, data.new, {upsert:true});
        } catch ( e ) {
            console.error(e);
        }
    }
}

// func main
module.exports = cmd;