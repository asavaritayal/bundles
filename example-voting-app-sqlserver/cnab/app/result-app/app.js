const CosmosClient = require('@azure/cosmos').CosmosClient;

const config = require('./config');
const url = require('url');

const endpoint = config.endpoint;
const masterKey = config.primaryKey;

const client = new CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } });

const HttpStatusCodes = { NOTFOUND: 404 };

const databaseId = config.database.id;
const containerId = config.container.id;

/**
* Read the database definition
*/
async function readDatabase() {
    const { body: databaseDefinition } = await client.database(databaseId).read();
    console.log(`Reading database:\n${databaseDefinition.id}\n`);
 }

 function exit(message) {
    console.log(message);
    console.log('Press any key to exit');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
 };

 /**
* Query the container using SQL
 */
async function queryContainer() {
    console.log(`Querying container:\n${config.container.id}`);
  
    const querySpec = {
       query: "SELECT * FROM c where c.vote = 'a' ",
   };
  
   const { result: results } = await client.database(databaseId).container(containerId).items.query(querySpec).toArray();
   a = results.length;
   console.log(`\t# of votes for 'a' ${a}\n`);

   const querySpecb = {
        query: "SELECT * FROM c where c.vote = 'b' ",
    };

    const { result: resultsb } = await client.database(databaseId).container(containerId).items.query(querySpecb).toArray();
    b = resultsb.length;
    console.log(`\t# of votes for 'b' ${b}\n`);

  };

  queryContainer();