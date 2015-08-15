#### RikkiTikki.Auth
# > Authentication Provider Interface
class $scope.Auth extends $scope.Object
  # idAttribute:'session_id'
  constructor:->
    user  = new $scope.User
    login = null
    _token = null
    @getToken = =>
      login?.attributes?[@idAttribute] || null
    # virtualizes user authentidation test helper method
    @isAuthenticated = => 
      (@getToken())?
    # virtualizes user login helper method
    @login = (username, password, options={})=>
      @trigger 'authenticating'
      options = @createOptions options
      _opts = _.extend {}, options, {
        success:=>
          @trigger 'authenticated', login.attributes
          options.success?.apply @, arguments
      }
      (login ?= new $scope.Login).login username, password, _opts
    # virtualizes user logout helper method
    @logout = (options={})=>
      @trigger 'deauthenticating'
      _opts = _.extend {}, @createOptions( options ), {
        success:=>
          @trigger 'deauthenticated', login.attributes
          options.success?.apply @, arguments
      }
      (login ?= new $scope.Login).logout _opts
    # virtualizes user session restoration helper method
    @restore = (token, options={})=>
      _token = token
      @trigger 'authenticating'
      _opts = _.extend {}, @createOptions( options ), {
        success:=>
          @trigger 'authenticated', login.attributes
          options.success?.apply @, arguments
      }
      (login ?= new $scope.Login).restore _token, _opts
    # virtualizes user settings getter method
    @getUser = => user.attributes
    # virtualizes user settings setter method
    @setUser = (attributes, options)=> user.set attributes, @createOptions options
    # virtualizes user user settings update helper method
    @saveUser = (attributes, options)=> user.save attributes, @createOptions options
    # virtualizes user registration helper method
    @registerUser = (attributes, options)=> @saveUser attributes, @createOptions options
  @getInstance: ->
    @__instance ?= new @