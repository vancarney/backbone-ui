class ApiHeroUI.components.FormView extends ApiHeroUI.core.View
  events:
    "change input.bind-change,textarea.bind-change,select.bind-change":(evt)->
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
  setModel:(modelClass)->
    @model = new @modelClass()
    .on "change reset", (=> @trigger 'changing'), @
    .on 'invalid', ((model, e)=> @trigger 'invalid', message:e ), @
  init:(o)->
    @modelClass = o.modelClass if o.hasOwnProperty 'modelClass'
    @setModel @modelClass if @modelClass?