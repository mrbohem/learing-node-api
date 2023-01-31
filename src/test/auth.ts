import request from "supertest";
import { app } from "../app";


const createUser = () => request(app)
.post('/signup')
.send({
    email:'abc@gmail.com',
    password: 'password'
})
.expect(201)

it("successfully signup",async() => {
    return createUser()
})

it("successfully signin", async() => {
    const response = await request(app)
        .post('/signin')
        .send({
            email:'abc@gmail.com',
            password: 'password'
        })
        .expect(200)
    
    expect(response.get('Set-Cookie')).toBeDefined();
})


it('create user,editor and admin account',async()=>{
    await global.auth('signup','user@gmail.com')
    await global.auth('signup','editor@gmail.com')
    await global.auth('signup','admin@gmail.com')
})