#### global
# > References the root environment RikkiTikki is operating in
global = exports ? window
# Includes Backbone & Underscore if the environment is NodeJS
_         = (unless typeof exports is 'undefined' then require 'underscore' else global)._
Backbone  = unless typeof exports is 'undefined' then require 'backbone' else global.Backbone
Backbone.controls = {}
Backbone.interactions = {}
class Backbone.CompositeView extends Backbone.View
  ns:Backbone
  collection: null
  __children: []
  __parent:   null
  subviews:{}
  render:->
    @createChildren()
  ## createChildren
  # > traverses subviews hash, defining any view classes upon DOM elements
  # subviews hash may be defined as follos:
  # a simple hash: `{'hashKey':ViewClass}`
  # a nested hash: `{'hashKey':{viewClass:ViewClass, param1:val1, param2:val2 ...}}`
  createChildren:->
    @removeAllChildren()
    if typeof @subviews != 'undefined' and @subviews? and _.isObject @subviews
      _.each @subviews, ((view, selector)=>
        return if typeof view == 'undefined'
        params = {}
        if typeof view is 'object'
          return unless (clazz = view.viewClass)?
          delete view.viewClass
          _.extend params, view
        else
          clazz = view
        _.each (@$el.find selector), (v,k)=>
          @__children.push @[selector] = new clazz _.extend params, {el: v, __parent:@}
      )
      @delegateEvents()
    @childrenComplete()
    @
  getElement:->
    @$el
  setElement:(el)->
    @$el?.remove()
    @$el = $(@el = el) if el
    @delegateEvents()
    @
  setCollection:(c)->
    return unless c?
    @collection.off "change reset add remove" if @collection
    (@collection = c).on "change reset add remove", @render, @
    @
  getCollection:->
    @collection
  setModel:(c)->
    return unless c?
    @model.off "change reset" if @model
    (@model = c).on "change reset", @render, @
    @
  getModel:->
    @model
  getChildren:->
    @__children
  getChild:(sel)->
    return throw 'clazz must be type <Function>' unless typeof clazz is 'function'
    @__children[sel] || null
  addChild:(sel,clazz,opts)->
    return throw 'clazz must be type <Function>' unless typeof clazz is 'function'
    (@subviews ?= {})[sel] = clazz
    @createChildren() unless opts?.create? and opts.create == false
    @
  removeChild:(sel,opts)->
    return unless sel
    if typeof sel is 'string'
      if @[sel]?
        @__children.splice idx,1 if (idx = @__children.indexOf @[sel]) >= 0
        @[sel].remove()
        delete @[sel]
        delete @subviews[sel]
    else
      throw 'param sel must be CSS Selector String'
    @
  replaceChild:(sel,clazz)->
    return throw 'param sel must be CSS Selector String' unless sel? and typeof sel is 'string'
    return throw 'param clazz must be Backbone.View' unless clazz instanceof Backbone.View
    @__children.splice idx,1 if (idx = @__children.indexOf _oC = @[sel]) >= 0
    @__children[clazz] = @[sel] = clazz 
    @
  removeAllChildren:->
    for sel in _.keys( @subviews  )
      @removeChild sel
    @
  childrenComplete:->
    @
  initialize:(o)->
    @model?.on "change reset", @render, @
    @collection?.on "change reset add remove", @render, @
    @__parent = o.__parent if o? and o.__parent
    if typeof @init == 'function'
      if o? then @init o else @init()
    @render()
'{{classes}}'