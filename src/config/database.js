const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://admin:123@cluster1026.mm8xhvx.mongodb.net/?retryWrites=true&w=majority";

let _studentModel = null;
let _classModel = null;

async function connectToDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const db = client.db("graphql");
    console.log("connect to DB Success");

    _studentModel = db.collection("students");
    _classModel = db.collection("classes");
  } catch (error) {
    console.log("connect to DB Fail", error);
  }
}

function getStudentModel() {
  return _studentModel;
}

function getClassModel() {
  return _classModel;
}

module.exports = {
  connectToDatabase,
  getStudentModel,
  getClassModel,
};
