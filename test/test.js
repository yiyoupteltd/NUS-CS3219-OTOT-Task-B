let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
let app = require("../index");
let Contact = require('../contactModel');
chai.use(chaiHttp);
chai.should();

describe("GET", () => {
   it("it must GET the list of all contacts", function (done) {
      chai.request(app)
         .get("/api/contacts")
         .end((err, res) => {
            res.body.should.have.property('message').eql('Contacts retrieved successfully');
            done();
         });
   });
});

describe('POST', () => {
   it('it must be able to POST a new contact', function (done) {
      chai.request(app)
         .post('/api/contacts')
         .send({
            name: "Lebron James",
            email: "lebronjames@gmail.com",
            gender: "Male",
            phone: "98798798"
         })
         .end((err, res) => {
            res.body.should.have.property('message').eql('New contact created!');
            res.body.data.should.have.property('name');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('gender');
            res.body.data.should.have.property('phone');
            done();
         });
   });
});
describe('PUT', () => {
   it('it must be able to UPDATE changes of a contact', function (done) {
      let contact = new Contact({
         name: "Chia Yi You",
         email: "chiayiyou@gmail.com",
         gender: "Male",
         phone: "12345678"
      })
      contact.save((err, contact) => {
         chai.request(app)
            .put('/api/contacts/' + contact._id)
            .send({
               name: "Chia Yi Xuan",
               email: "chiayixuan@gmail.com",
               gender: "Male",
               phone: "87654321"
            })
            .end((err, res) => {
               res.body.should.have.property('message').eql('Contact Info updated');
               res.body.data.should.have.property('name').eql("Chia Yi Xuan");
               res.body.data.should.have.property('email').eql("chiayixuan@gmail.com");
               res.body.data.should.have.property('gender').eql("Male");
               res.body.data.should.have.property('phone').eql("87654321");
               done();
            });
      });
   });
});
describe('DELETE', () => {
   it('it must be able DELETE a contact', function (done) {
      let contact = new Contact({
         name: "Test @1am",
         email: "nosleep@gmail.com",
         gender: "Male",
         phone: "321321321"
      })
      contact.save((err, contact) => {
         chai.request(app)
            .delete('/api/contacts/' + contact._id)
            .end((err, res) => {
               res.body.should.have.property('message').eql('Contact deleted');
               done();
            });
      });
   });
});