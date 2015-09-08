class ApiHeroUI.components.FormView extends ApiHeroUI.core.View
  events:
    "change input.bind-change,textarea.bind-change,select.bind-change":(evt)->
      unless @model?
        identifier = @$el.prop('id') || @$el.prop('name') || @$el.prop('class')
        return console.log "Formview for '#{identifier}' has no model" 
      val = if ((t = $ evt.target).prop 'type').match /^(checkbox|radio)$/ then t.is ':checked' else t.val()
      @model.set (t.prop 'name').replace(/^reg_+/, ''), val, {validate:true}
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
    return throw 'setModel required setModel argument to not be undefined or null' unless modelClass?
    (@model = if typeof modelClass is 'function' then new modelClass() else modelClass)
    .on "change reset", (=> @trigger 'changing'), @
    .on 'invalid', ((model, e)=> @trigger 'invalid', message:e ), @
    @
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
