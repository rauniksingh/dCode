const elasticsearch = require('elasticsearch');
// const esClient = new elasticsearch.Client({
//     host: ['127.0.0.1:9200'],
//     log: 'error'
//   });

//   esClient.ping({
//     requestTimeout: 30000,
// }, (error) => {
//     if (error) {
//         console.error('Elasticsearch cluster is down!');
//     } else {
//         console.log('Everything is ok');
//     }
// });

let elasticClient;

module.exports.getElasticInstance = () => {
    if (elasticClient)
        return elasticClient;
    elasticClient = new elasticsearch.Client({
        host: 'localhost:9200'
    });
    return elasticClient;
};



//----Create new index

// esClient.indices.create({ index: 'thread' }, (err, resp, status) => {
//     if (err) console.log(err); 
//         else console.log("create", resp);
// });

//----Adding document to index

// esClient.index({
//     index: 'thread',
//     id: '1',
//     type: 'posts',
//     body: {
//         "PostName": "Integrating Elasticsearch Into Your Node.js Application",
//         "PostType": "Tutorial",
//         "PostBody": "This is the text of our tutorial about using Elasticsearch in your Node.js application.",
//     }
// }, (err, resp, status) => {
//     console.log(resp);
// });

// esClient.search({
//     index: 'blog',
//     type: 'posts',
//     q: 'PostType:*to*'
// }).then(function(resp) {
//     console.log('----->', resp.hits.hits);
// }, function(err) {
//     console.trace(err.message);
// });