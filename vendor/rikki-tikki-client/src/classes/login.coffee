#### $scope.Login
# > Implements Login functionality
class $scope.Login extends $scope.Object
  # idAttribute:'token'
  defaults:
    email:String
    password:String
  constructor:->
    Login.__super__.constructor.apply @, arguments
    # overrides default pluralized upper-case classname
    @className = "login"
  validate:(o)->
    email     = o.email || @attributes.email || null
    password  = o.password || @attributes.password || null
    token     = o[@idAttribute] || @attributes[@idAttribute] || null
    # tests for basic authentication
    if email?
      # invalidates if password IS NOT set
      return "password required" unless password?
    if password?
      # invalidates if email IS NOT set
      return "email required" unless email?
    # tests for bearer token authentication
    # if token?
      # console.log "token: #{token}"
      # # invalidates if email IS set
      # return "token based authentication does not use email address" if email?
      # # invalidates if password IS set
      # return "token based authentication does not use password" if password?
  login:(email, password, options={})->
    _opts = _.extend {}, options,
      success:=>
        throw "INVALID RESPONSE:\n#{JSON.stringify arguments[1]}" unless ($scope.SESSION_TOKEN = @attributes[@idAttribute])?
        options.success?.apply @, arguments 
    @save {email:email, password:password}, _opts
  logout:(options={})->
    _opts = _.extend {}, options,
      success:=>
        options.success?.apply @, arguments 
    @destroy _opts
  restore:(token, options={})->
    _opts = _.extend {}, options,
      success:=> options.success?.apply @, arguments 
    @fetch token:token, _opts
  isAuthenticated:->
    @attributes[@idAttribute]?