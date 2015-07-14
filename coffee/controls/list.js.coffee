class ApiHeroUI.controls.List extends Backbone.View
  el:"ul"
  subviews:
    "li": ApiHeroUI.controls.ListItem
  init:(o)->
    @collection ?= new Backbone.Collection
    @collection.on 'change', @render, @
$.fn.List = (opts)=>
  return new ApiHeroUI.controls.List {el: @}, opts || {}