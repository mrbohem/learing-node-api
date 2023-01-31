import request from "supertest";
import { app } from "../app";
import { Post } from "../models/post";

const createPost = async(cookie:string[]) => {
    
    return request(app)
    .post('/post')
    .set('Cookie', cookie)
    .send({
        title:"title of first post",
        body:"body of first post"
    }).
    expect(200)
}

it('user can read article but can not create,update and delete',async()=>{
    const cookie = await global.auth('signup','user@gmail.com')
    await global.allowPermission('user','/post','GET')

    await Post.create({
        title:"title of post",
        body:"body of post"
    })

    await request(app)
        .get('/post')
        .set('Cookie', cookie)      
        .send({
            title:"title of post"
        })
        .expect(200)
    
    await request(app)
    .post('/post')
    .set('Cookie', cookie)      
    .send({
        title:"title",
        body:"body"
    })
    .expect(403)

    await request(app)
    .put('/post')
    .set('Cookie', cookie)      
    .send({
        title:"title",
        body:"body"
    })
    .expect(403)
})

it('editor can read,create and update the article but can not delete',async()=>{
    await global.auth('signup','editor@gmail.com')
    global.changeRole('editor@gmail.com','editor')

    global.allowPermission('editor','/post','GET')
    global.allowPermission('editor','/post','POST')
    global.allowPermission('editor','/post','PUT')
    
    const cookie:string[] = await global.auth('signin','editor@gmail.com')
    await request(app)
        .post('/post')
        .set('Cookie', cookie)
        .send({
            title:"title of first post",
            body:"body of first post"
        }).
        expect(200)

    const {body:post} = await request(app)
        .get('/post')
        .set('Cookie', cookie)
        .send({
            title:"title of first post",
        }).
        expect(200)

    await request(app)
        .put('/post')
        .set('Cookie', cookie)
        .send({
            postId:post.data._id,
            title:"updated title",
            body:"updated post"
        }).
        expect(200)

    await request(app)
        .delete('/post')
        .set('Cookie', cookie)
        .send({
            title:"updated title",
            body:"updated post"
        }).
        expect(403)
})


it('admin can read,create, update and delete the article',async()=>{
    await global.auth('signup','admin@gmail.com')
    global.changeRole('admin@gmail.com','admin')
    
    const cookie:string[] = await global.auth('signin','admin@gmail.com')
    await request(app)
        .post('/post')
        .set('Cookie', cookie)
        .send({
            title:"title of first post",
            body:"body of first post"
        }).
        expect(200)

    const {body:post} = await request(app)
        .get('/post')
        .set('Cookie', cookie)
        .send({
            title:"title of first post",
        }).
        expect(200)

    await request(app)
        .put('/post')
        .set('Cookie', cookie)
        .send({
            postId:post.data._id,
            title:"updated title",
            body:"updated post"
        }).
        expect(200)

    await request(app)
        .delete('/post')
        .set('Cookie', cookie)
        .send({
            postId:post.data._id,
        }).
        expect(200)
})