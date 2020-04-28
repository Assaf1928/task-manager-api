//example of promise-chaning,
//how to call a method after method correctly.


// IN THIS JS PAGE
//two examples of the same thing.
// the secodn way is correct and more short. we use async and await so methods will accure one after.


require('../src/db/mongoose')
const User = require('../src/models/user');

User.findByIdAndUpdate('5e9ebe17d12fe21ac8e59e25',{age: 1}).then((user)=> {
    console.log(user)
    return User.countDocuments({age: 1 }).then((result)=> {
        console.log(result)
    }).catch((e) => {
        console.log(e)
    })
})

const updateAgeAndCounting = async (id,age) => {
    const user = await User.findByIdAndUpdate(id, {age: age}) // can also be (id,age) because the variable name is the same as the db field name
    const count = await User.countDocuments({age})
    return count;
}

updateAgeAndCounting('5e9ebe17d12fe21ac8e59e25',2).then((count)=> {
console.log(count)
}).catch((e)=> {
    console.log(e)
})