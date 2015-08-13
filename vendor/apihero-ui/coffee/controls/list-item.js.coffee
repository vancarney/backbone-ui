class ApiHeroUI.controls.ListItem extends Backbone.View
  render:->
    unless @template
      @setText @model.attributes.text if @model.attributes.hasOwnProperty 'text'
    else
      ListItem.__super__.render.apply @, arguments
  init:(o)->
    @model ?= new (Backbone.Model.extend
      defaults:
        text:""
      )
    @model.on 'change', @render, @
$.fn.ListItem = (opts)=>
  return new ApiHeroUI.controls.ListItem {el: @}, opts || {}