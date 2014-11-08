#### global
# > References the root environment RikkiTikki is operating in
global = exports ? window
# Includes Backbone & Underscore if the environment is NodeJS
_         = (unless typeof exports is 'undefined' then require 'underscore' else global)._
Backbone  = unless typeof exports is 'undefined' then require 'backbone' else global.Backbone
(($)->
  Backbone.controls ?= {}
  Backbone.interactions ?= {}
  class Backbone.CompositeView extends Backbone.View 
    collection: null
    __children: []
    __parent:   null
    subviews:{}
    createChildren:->
      if typeof @subviews != 'undefined' and @subviews? and _.isObject @subviews
        _.each @subviews, ((view, selector)=>
          return if typeof view == 'undefined'
          _.each (@$el.find selector), (v,k)=>
            @__children.push (@[selector] = new view
              el: v
              __parent:@
            )
        )
        @delegateEvents()
      @childrenComplete()
      @render()
    getElement:->
      @$el
    setElement:(el)->
      @$el = $(@el = el) if el
      @delegateEvents()
      @
    setCollection:(c)->
      @__collection.off "change reset add remove" if @__collection
      (@__collection = c).on "change reset add remove", @render, @
      @
    getCollection:->
      @__collection
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
        if @__children[sel]?
          @__children[sel].remove()
          delete @__children[sel]
      else
        throw 'param sel must be CSS Selector String'
      @
    replaceChild:(sel,clazz)->
      return throw 'param sel must be CSS Selector String' unless sel? and typeof sel is 'string'
      @__children[sel] = clazz if typeof sel is 'string' and clazz instanceof Backbone.View
      @
    removeAllChildren:->
      for sel in _.keys( @__children  )
        @$(sel).remove()
        delete @[sel]
        delete @__children[sel]
      @
    childrenComplete:->
      @
    initialize:(o)->
      _.extend @, Backbone.Events
      @setElement o.el if o? and o.el
      @setCollection o.collection if o? and o.collection
      @__parent = o.__parent if o? and o.__parent
      if typeof @init == 'function'
        if o? then @init o else @init() 
      @createChildren()
  class Backbone.interactions.Draggable extends Object
    constructor : (@__target, opts)->
      _def =
        oRoot:@__target
        minX:0
        maxX:window.width
        maxY:0
        maxY:window.height
      _.extend _def, opts
      _.extend @, Backbone.Events
      _calcX = (xPos) =>
        return x if xPos < (x = _def.minX)
        return x if xPos > (x = _def.maxX)
        xPos
      _calcY = (yPos) =>
        return y if yPos < (y = _def.minY)
        return y if yPos > (y = _def.maxY)
        yPos
      @__target.on 'mousedown', (evt)=>
        _def.oRoot.addClass 'drag-target'
        @trigger 'dragStart', @_target.offset()
        @__target.on 'mousemove', (evt)=>
          @__target.offset o =
            top:  ( _calcY evt.pageY ) - $('.drag-target').outerHeight() / 2
            left: ( _calcX evt.pageX ) - $('.drag-target').outerWidth()  / 2
          @trigger 'dragUpdate', o
        @__target.on 'mouseup', (evt)=>
          @__target.on 'mouseup', (evt)=>
            _def.oRoot.removeClass('drag-target').off 'mousemove'
            @trigger 'dragStop', @__target.offset()
  '{{classes}}'
) jQuery