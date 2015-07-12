class ApiHeroUI.components.LoginFormView extends ApiHeroUI.components.FormView
  init:(o)->
    LoginFormView.__super__.init.call @, o
    formEvents:
      "click button[name=submit]":->
        @model.login()
    _.extend @events, formEvents
    @delegateEvents()
