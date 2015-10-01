chai = require 'chai'

describe('when running tests', ()->
    it('should be able to return before 2000ms', (done)->
        done()
    )
    it('should be able to compare values w/ chai', (done)->
        chai.expect(1).to.equal(1)
        done()
    )
    it('should be able to call done from a callback', (done)->
        funkyShun = (data)->
            done()

        funkyShun({fake:'data'})
    )
    it('should be able to import component with require()', (done)->
        c = require('../ng-modules/demoWidget/SysEqController.coffee')
        chai.expect(c).to.not.be.undefined
        done()
    )
)