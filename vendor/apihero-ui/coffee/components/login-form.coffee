class ApiHeroUI.components.LoginFormView extends ApiHeroUI.components.FormView
  init:(o)->
    formEvents:
      "click button[name=submit]":->
        @model.login()
    @events = _.extend {}, @events, formEvents
    LoginFormView.__super__.init.call @, o
