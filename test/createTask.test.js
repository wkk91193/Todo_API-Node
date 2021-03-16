let chai = require('chai');
let chaiHttp = require('chai-http')
let server =require('../app/server')
const responseMessage =require('../app/consts/responseMessages.json');

//Assertion style
chai.should()

chai.use(chaiHttp);

let taskkId = null;

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
    it ("Delete the task created", (done)=>{
        chai.request(server)
        .delete("/api/deleteTaskById/taskId/"+taskkId)
        .end((err,response)=>{
            response.should.have.status(200);
            response.text.should.be.eql(responseMessage["response.task.deleted"]);
            done();
        })
    })

 })
