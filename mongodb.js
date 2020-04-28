
const {MongoClient, ObjectID} = require('mongodb')
const id = new ObjectID();
console.log(id);
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
//Connection to the database.
MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client) => {
if(error) 
    return console.log('Unable to connect to database!')
    //Setting the database table
    const db = client.db(databaseName)
    
    // **DELETE METHOD**

    db.collection('users').deleteMany({
        age:23
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
    
    
    // *** UPDATE METHODS***
//    const updatePromise = db.collection('users').updateOne({
//         age: 22
//     }, {
//         $inc: {
//             age: 1
//         }
//     })
//     updatePromise.then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)

//     })

    
    // *** READ METHODS ****

    // db.collection('users').findOne({name: 'Roni'}, (error,user) =>  {
//     if(error)
//         return console.log('Unable to fetch');

//     console.log(user);

// })


// db.collection('users').find({age: 20}).toArray((error,users) => {
//     console.log(users)
// })


        // *** INSERTS METHODS ****

    //Adding a document to the collection with a callback method
    
    // db.collection('users').insertOne({
    // name:'Assaf',
    // age:27
    // }, (error,result) => {
    //     if(error)
    //         return console.log('Unable to insert unser');

    //         console.log(result.ops) 
    // })

    //example of inserting few documents at once:

    // db.collection('tasks').insertMany([{
    //     description:'Shopping',
    //     completed:false 
    // },{
    //     description:'Eating',
    //     completed:false 
    // },
    // {
    //     description:'Watching TV',
    //     completed:true 
    // }], (error,result) => {
    //     if(error)
    //     return console.log('Unable to insert documents')

    //     console.log(result.ops)

    // })

})