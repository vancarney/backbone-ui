class ApiHeroUI.controls.DataLabel extends ApiHeroUI.core.View
  model:null
  defaultTitle:"Title"
  subviews:
    '.datalabel-value':ApiHeroUI.core.View
    '.datalabel-title':ApiHeroUI.core.View
  setOptions:(opts)->
    if opts.defaultTitle
      @defaultTitle = opts.defaultTitle
      delete opts.defaultTitle
    @model.set opts
    @
  getTitle:->
    @model.get 'title'
  setTitle:(v)->
    @model.set title:v, validate:true
    @
  getValue:->
    @model.get 'value'
  setValue:(v)->
    @model.set value:( (@__formatter? v) || v ), validate:true
    @
  setText:(v)->
    @setValue v
  init:(o)->
    (@model = new (Backbone.Model.extend
      defaults:
        title: @defaultTitle || "" 
        value:""
      validate:(o)->
        for param,value of o
          return "#{param} required to be string type was <#{type}>" unless (type = typeof value) is 'string'
    )).on 'change', =>
      @['.datalabel-value'].setText @model.get 'value'
      @['.datalabel-title'].setText @model.get 'title'
$.fn.DataLabel = (opts)=>
  return new ApiHeroUI.controls.DataLabel {el: @}, opts || {}