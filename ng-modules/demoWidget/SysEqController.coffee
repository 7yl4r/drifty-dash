# A non-clever system of equations controller.
#
# This doesn't solve systems, it doesn't check your work,
# it won't even complain if you input an impossible system.
#
# It just takes your equations and pushes any changes you make
# to one variable through the system once.
#
# Useful for making interactive forms.

module.exports = class SysEqController
    constructor: (variables)->
        # sets up system of equation using given variable 
        # definition object in the form:
        # variables = {
        #    "var-1-name": [
        #        "VAR-2": function(variable1){
        #            return variable1 * 10;
        #        },
        #        "var3key": function(v1){
        #            return v1-1;
        #        }
        #    ], 
        #    "VAR-2":[
        #        "var-1-name": function(var2){
        #            return var2 / 10;
        #        }
        #    ],
        #    "var3key":[
        #        "var-1-name": function(var3){
        #            return var3 + 1;
        #        }
        #    ]
        # }
        
        @sysEq = variables
        @values = {}  # dict for variable values
        @updated = {}  # dict to track if var updated since user input
        
        for key of variables
            @values[key] = 0
            @updated[key] = false
        

    update: (var_key, newValue)->
        # updates given var with given value and updates all dependent 
        # values in the system of eq.
        # for making changes from code directly.
        @updated = (false for key in @updated)
        @_update(var_key, newValue)
        
    get: (key)->
        # get value of a variable
        return @values[key]
        
    change: (key) ->
        # triggerable method which makes assumptions about html document to 
        # get the value for the given var key.
        # assumes variable value is stored in DOM with id "sys-eq-varname".
        # variable names with caps will be toLowerCase()ed,
        # since html id must be lowercase; otherwise should match var key
        # exactly.
        newVal = parseFloat(document.getElementById(
            _getElementName(key)
        ).value)
        update(key, newval)
        
    # === PRIVATE METHODS ===
    
    _getElementName: (key)->
        return 'sys-eq-' + key.toLowerCase()
        
    _update: (var_key, newValue) -> 
        # used to update a single variable (not for calling from UI)
        @values[var_key] = newValue
        @updated[var_key] = true
        for dependency_key of @sysEq[var_key]
            if not @updated[dependency_key]
                @_update(
                    dependency_key, 
                    @sysEq[var_key][dependency_key](newValue)
                )
            