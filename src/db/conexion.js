import mongodb from "mongodb";
import "dotenv/config";

const mongoClient = mongodb.MongoClient;
const MONGOLOCAL = process.env.MONGOLOCAL;

try {
    mongoClient.connect(MONGOLOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`DB Conectada a ${MONGOLOCAL}`);
} catch (error) {
    console.log(`No estamos conectados`);   
}
