import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global{
    function auth(url:string,email:string):Promise<string[]>
    function changeRole(email:string,role:string):void
    function allowPermission(role:string,url:string,method:string):void
}

let mongo:any

beforeAll(async()=>{
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://localhost:27017", {});
    // mongo = await MongoMemoryServer.create();
    // const mongoUri = mongo.getUri()
    // mongoose.set("strictQuery", false);
    // await mongoose.connect(mongoUri,{})
})

beforeEach(async()=>{
    // const collections = await mongoose.connection.db.collections()

    // for(let collection of collections){
    //     await collection.deleteMany({})
    // }
})


afterAll(async ()=>{
    if (mongo) {
        await mongo.stop()
    }
    await mongoose.connection.close()
})

global.auth = async(url,email:string) => {
    const password = "password";
    const response = await request(app)
    .post(`/${url}`)
    .send({
      email,
      password,
    })
    .expect(201);

    const cookie = response.get("Set-Cookie");
    return cookie;
}

global.changeRole = async(email:string,role:string) => {
    await request(app)
    .post('/changeRole')
    .send({email,role })
    expect(200)
}

global.allowPermission = async(role,url,method) => {
    return await request(app)
    .post('/permission')
    .send({role,url,method})
    .expect(200)
}