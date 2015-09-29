SysEquController = require("./SysEqController.coffee")

sysEq = new SysEqController({
`
    'x': [
        '2x': function(x){  
            return 2 * x
        },
        'x-1': function(x){
            return x-1
        }
    ],
    '2x':[
        'x': function(xx){
            return xx/2
        }
    ],
    'x-1'[
        'x': function(xm1){
            return xm1 + 1
        }
    ]
`
})

sysEq.update('x', 10)

assert(sysEq.get('x') == 10)
assert(sysEq.get('2x') == 20)
assert(sysEq.get('x-1') == 9)

# TODO: test updating 2x & x-1