let chai = require('chai');
let chaiHttp = require('chai-http')
let server =require('../app/server')
const responseMessage =require('../app/consts/responseMessages.json');

//Assertion style
chai.should()

chai.use(chaiHttp);

let taskkId =1;

describe('Tasks API',()=>{
    it("Create a new task", (done)=>{
        chai.request(server)
            .post("/api/createTask")
            .set('content-type','application/json')
            .send({
                "title":"TestTask"
            })
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                if(typeof response.body.id !== "undefined")
                    taskkId = response.body.id;

                done();
            })

    })
 })


 describe('Tasks API',()=>{
    it("Update task status", (done)=>{
        chai.request(server)
            .put("/api/updateTaskStatus/taskId/"+taskkId)
            .set('content-type','application/json')
            .send({
                "title":"Testtask_1",
                "completed":true,
            })
            .end((err,response)=>{
                response.should.have.status(200);
                response.text.should.be.eql(responseMessage["response.task.updated"]);
                done();
            })

    })
 })


 describe('Tasks API',()=>{
    it("It should GET Task by Id", (done)=>{
        chai.request(server)
            .get("/api/findTaskById/taskId/"+taskkId)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })

    })
 })

describe('Tasks API',()=>{
    it("It should GET all the tasks", (done)=>{
        chai.request(server)
            .get("/api/findAllTasks")
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            })

    })
 })

 describe('Tasks API',()=>{
    it("It should DELETE Task by Id", (done)=>{
        chai.request(server)
            .delete("/api/deleteTaskById/taskId/"+taskkId)
            .end((err,response)=>{
                response.should.have.status(200);
                response.text.should.be.eql(responseMessage["response.task.deleted"]);
                done();
            })

    })
 })


 describe('Tasks API',()=>{
    it("It should CHECK all tasks that not complete", (done)=>{
        chai.request(server)
            .put("/api/todosCheckAll")
            .end((err,response)=>{
                response.should.have.status(200);
                response.text.should.be.eql(responseMessage["response.task.updated"]);
                done();
            })

    })
 })

 describe('Tasks API',()=>{
    it("It should DELETE all tasks that are complete", (done)=>{
        chai.request(server)
            .delete("/api/todosDeleteCompleted")
            .end((err,response)=>{
                response.should.have.status(200);
                response.text.should.be.eql(responseMessage["response.task.deleted"]);
                done();
            })

    })
 })

