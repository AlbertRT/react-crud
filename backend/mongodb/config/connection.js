import mongoose from "mongoose"

async function connection() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/react_crud_db', { useNewUrlParser: true })
        console.log('Connection successfull')
    } catch (error) {
        console.log('Connection failed \n' +  error)
    }
}

export default connection