const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { isEmptyPayload, isInValidEmail } = require('./validator');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'company_db';
const collName = 'employees';


app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/dist'));
app.get('/getprofile', async function(req, res) {

    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection(collName);
    const result = await collection.findOne({ id: 1 });
    console.log(result);
    client.close();
    if (result === null) {
        res.send({});
    } else {
        const response = {
            name: result.name,
            email: result.email,
            interests: result.interests

        };
        res.send(response);
    }




});
app.post('/putprofile', async function(req, res) {
    const payload = req.body;
    console.log(payload);


    if (isEmptyPayload(payload) || isInValidEmail(payload)) {
        res.status(400).send({ error: "Invalid payload" });
    } else {
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection(collName);
        payload['id'] = 1;
        const updatedValue = { $set: payload }
        await collection.updateOne({ id: 1 }, updatedValue, { upsert: true });
        client.close();

        res.status(200).send({ info: "Profile updated successfully" });
    }

});
const server = app.listen(3035, function() {
    console.log("Server is running at http://localhost:3035");
});

module.exports = {
    app,
    server
};