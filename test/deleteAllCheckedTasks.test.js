let chai = require('chai');
let chaiHttp = require('chai-http')
let server =require('../app/server')
const responseMessage =require('../app/consts/responseMessages.json');

//Assertion style
chai.should()

chai.use(chaiHttp);

let taskInfo={
    id:null,
    title:null,
    completed:true
}

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
                if(typeof response.body.id !== "undefined"){
                    taskInfo.id = response.body.id;
                    taskInfo.title= response.body.title;
                }
                done();
            })

    })

    it("Update task status", (done)=>{
        chai.request(server)
            .put("/api/updateTaskStatus/taskId/"+taskInfo.id)
            .set('content-type','application/json')
            .send({
                "title":taskInfo.title,
                "completed":taskInfo.completed
            })
            .end((err,response)=>{
                response.should.have.status(200);
                response.text.should.be.eql(responseMessage["response.task.updated"]);
                done();
            })
    })

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