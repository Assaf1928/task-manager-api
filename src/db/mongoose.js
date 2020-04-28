const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true, //  when mongoose works with mongo the indexs are created
    useFindAndModify:false
})

