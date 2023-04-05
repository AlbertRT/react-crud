import mongoose from "mongoose"

async function connection() {
    try {
        await mongoose.connect(process.env.MongoDBURL, { useNewUrlParser: true })
        console.log('Connection successfull')
    } catch (error) {
        console.log('Connection failed \n' +  error)
    }
}

export default connection