const expect = require("chai").expect
const authMiddleware = require("../middleware/is-auth")
const jwt = require("jsonwebtoken")
const sinon  = require("sinon")

describe("Auth Middleware",function(){
   
it("should throw an error when there in no authorization header",function(){
    const req = {
        get:function(headerName){
            return  null
        }
    }
    expect(authMiddleware.bind(this,req,{},()=>{})).to.throw("Not Authenticated")
})

it("should throw an error when the authorization header is only one string",function(){
    const req = {
        get:function(headerName){
            return  "nbvrghbfd"
        }
    }

    expect(authMiddleware.bind(this,req,{},()=>{})).to.throw()

})



it('should yield a userId after decoding the token', function() {
    const req = {
      get: function(headerName) {
        return 'Bearer djfkalsdjfaslfjdlas';
      }
    };
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });


it("should throw an error if the token cannot be verified",function(){
    const req = {
        get:function(headerName){
            return  "Bearer hffjdhkjh "
        }
    }

    expect(authMiddleware.bind(this,req,{},()=>{})).to.throw()


})

})
