class ApiHeroUI.components.FormView extends ApiHeroUI.core.View
  events:
    "change input":(evt)->
      @model.set ((t = $ evt.target).attr 'name').replace(/^reg_+/, ''), t.val(), {validate:true}
    "click button[name=cancel]":-> 
      @model.clear()
      @$('input').val null
      _.extend @model.attributes, _.clone @model.defaults
      @trigger 'cancelled'
    "click button[name=submit]":->
      @model.save null,
        success:(m,r,o)=>
          @trigger 'submit-success'
        error:=>
          @trigger 'submit-failure', message:'unable to complete form submission'
  init:(o)->
    @model = new @modelClass()
    .on "change reset", (=>
        @trigger 'changing'
        @model.validate()
      ), @
    .on 'invalid', ((model, e)=> @trigger 'invalid', message:e ), @