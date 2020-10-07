let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let app = require("../index");
let Contact = require('../contactModel');
//Our parent block
chai.should();

describe("ototb2", () => {
    describe("GET", () => {
         it("it must GET the list of all contacts", (done) => {
         chai.request(app)
             .get("/api/contacts")
             .end((err, res) => {
                   (res).should.have.status(200);
                   (res.body).should.be.a("object");
                   done();
                });
             });
         });
    
         describe('POST', () => {
            it('it must be able to POST a new contact', (done) => {
               let contact = {
                   name: "Lebron James",
                   email: "lebronjames@gmail.com",
                   gender: "Male",
                   phone: "98798798"
               }
                 chai.request(app)
                 .post('/api/contacts')
                 .send(contact)
                 .end((err, res) => {
                       res.should.have.status(200);
                       res.body.should.be.a('object');
                       res.body.data.should.have.property('name');
                       res.body.data.should.have.property('email');
                       res.body.data.should.have.property('gender');
                       res.body.data.should.have.property('phone');
                   done();
                 });
           });
         });
         describe('PUT', () => {
            it('it must be able to UPDATE changes of a contact', (done) => {
               let contact = new Contact({name: "Chia Yi You",
               email: "chiayiyou@gmail.com",
               gender: "Male",
               phone: "12345678"})
               contact.save((err, contact) => {
                   chai.request(app)
                    .put('/api/contacts/' + contact._id)
                    .send({name: "Chia Yi Xuan",
                    email: "chiayixuan@gmail.com",
                    gender: "Male",
                    phone: "87654321"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Contact Info updated');
                        res.body.data.should.have.property('name').eql("Chia Yi Xuan");
                      done();
                    });
               });
            });
         });
         describe('DELETE', () => {
            it('it must be able DELETE a contact', (done) => {
               let contact = new Contact({name: "Test @1am",
               email: "nosleep@gmail.com",
               gender: "Male",
               phone: "321321321"})
               contact.save((err, contact) => {
                  chai.request(app)
                    .delete('/api/contacts/' + contact._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Contact deleted');
                      done();
                    });
               });
            });
         });



        });