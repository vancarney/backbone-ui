class ApiHeroUI.components.FormView extends ApiHeroUI.core.View
  events:
    "change input.bind-change,textarea.bind-change,select.bind-change":(evt)->
      unless @model?
        identifier = @$el.attr('id') || @$el.attr('name') || @$el.attr('class')
        return console.log "Formview for '#{identifier}' has no model" 
      @model.set ((t = $ evt.target).attr 'name').replace(/^reg_+/, ''), t.val(), {validate:true}
    "click button[name=cancel]":->
      evt.stopPropagation()
      evt.preventDefault()
      @model.clear()
      @$('input').val null
      _.extend @model.attributes, _.clone @model.defaults
      @trigger 'cancelled'
      false
    "click button[name=submit]":(evt)->
      evt.stopPropagation()
      evt.preventDefault()
      @model.save null, ApiHeroUI.components.FormView.createOptions @
      false
  setModel:(modelClass)->
    @model = new @modelClass()
    .on "change reset", (=> @trigger 'changing'), @
    .on 'invalid', ((model, e)=> @trigger 'invalid', message:e ), @
  init:(o)->
    @modelClass = o.modelClass if o.hasOwnProperty 'modelClass'
    @setModel @modelClass if @modelClass?
ApiHeroUI.components.FormView.createOptions = (scope)->
  throw "scope object required to apply callbacks upon" unless scope? and typeof scope is 'object'
  opts = 
    success:(m,r,o)=>
      scope.trigger 'submit-success'
    error:=>
      scope.trigger 'submit-failure', message:'unable to complete form submission'
  opts
