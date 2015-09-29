SysEquController = require("./SysEqController.coffee")

chai = require 'chai'

describe 'basic sysEq usage', ->
    sysEq = new SysEqController({
    `
        'x': [
            '2x': function(x){  
                return 2 * x
            },
            '2x-1': function(x){
                return x-1
            },
            'z': function(x){
                return x*x
            }
        ],
        '2x':[
            'x': function(xx){
                return xx/2
            },
            'y': function(xx){
                return xx + 100
            }
        ],
        'x-1':[
            'x': function(xm1){
                return xm1 + 1
            }
        ],
        'y':[
            '2x': function(y){
                return y - 100
            }
        ],
        'z':[]
    `
    })
    
    VALUE = 10
    sysEq.update('x', VALUE)

    # TODO: test updating other vars? 

    it 'should have updated given var value', (done) ->
        chai.expect(sysEq.get('x')).to.equal(VALUE)

    it 'should have correct value for dependent var 2x' ->
        chai.expect(sysEq.get('2x')).to.equal(VALUE*2)
        
    it 'should have correct value for other dependent var x-1' ->
        chai.expect(sysEq.get('x-1')).to.equal(VALUE-1)
        
    it 'should have correct value for var dependend on dependent var' ->
        chai.expect(sysEq.get('y')).to.equal(VALUE*2 + 100)
        
    it 'should work with var with no dependencies' ->
        chai.expect(sysEq.get('z')).to.equal(VALUE*VALUE)
        
        
      