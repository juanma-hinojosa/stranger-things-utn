import "dotenv/config";
import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

export const home = (req, res) => {
    res.render("home", {
        personajes:[
            {numPic: "01", picDesc: "Imagen de Vecna"},
            {numPic: "02", picDesc: "Imagem ilustrativa de los amigos de Eleven"},
            {numPic: "03", picDesc: "Imagen Eleven asustada"}
        ]
    })
}



export const datoGuardado = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error,db) =>{
        const database = db.db(process.env.DATABASE)

        if (error) {
            console.log("Error en la conexion");
        } else {
            const { txtName, txtEstado, /*txtUrl ,*/ txtCharacter } = req.body;

            database.collection("userStrangerThings").insertOne({txtName, txtEstado, /*txtUrl ,*/ txtCharacter}, (error, result) => {
                if (error) {
                    console.log("Error en la conexion");
                } else {
                    console.log("Dato Guardado correctamente " + JSON.stringify(req.body));
                    // res.json(result);
                    res.render("postSucces");
                }
            })

        }
    });
}

export const creadores = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error,db) =>{
        const database = db.db(process.env.DATABASE)

        if (error) {
            console.log("Error en la conexion");
        } else {
            console.log(`Base de Datos Conectada a ${database}`);   
            database.collection("userStrangerThings").find({}).toArray((error, result) => {
                if (error) {
                    console.log("Error en la conexion");
                } else {
                    // res.json(result);
                    res.render("creadores", {result})
                }
            })

        }
    });
}

export const editar = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db(process.env.DATABASE)
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let id = req.params.id;

            database.collection('userStrangerThings').findOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) { 
                    throw error;
                }else{
                    res.render('editar', { 
                        result
                    })
                }
            })
        }
    });
}

export const editPost = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        // const database = db.db("stranger-thigns");
        const database = db.db(process.env.DATABASE);
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let id = req.params.id;

            console.log(ObjectId(id));
            
            const { txtName, txtEstado, /*txtUrl ,*/ txtCharacter} = req.body;

            database.collection('userStrangerThings').findOne({_id: ObjectId(id)}, {$set: {txtName, txtEstado, /*txtUrl ,*/ txtCharacter}} ,(error, result) => {
                error? console.log(error.message) : database.collection('userStrangerThings').replaceOne({_id: ObjectId(id)},{txtName, txtEstado, /*txtUrl ,*/ txtCharacter}, )
                //console.log(req.body)
                res.redirect('/')
            })

        }
    });
}

export const eliminarUser = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db(process.env.DATABASE)
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let id = req.params.id;

            database.collection('userStrangerThings').findOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) {
                    throw error;
                }else{
                    res.render('eliminar', { 
                        result
                    })
                }
            })
        }
    });
}


export const eliminado = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error,db) =>{
        const database = db.db(process.env.DATABASE)

        if (error) {
            console.log("Error en la conexion");
        } else {
            const id = req.params.id;
            const ObjectId = mongodb.ObjectId

            database.collection("userStrangerThings").deleteOne({_id: ObjectId(id)}, (error, result) => {
                if (error) {
                    console.log("Error en la conexion");
                } else {
                    console.log("Documento eliminado");
                    // res.json(result);
                    res.redirect("/")
                }
            })

        }
    });
}