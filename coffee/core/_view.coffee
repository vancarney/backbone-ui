class ApiHeroUI.core.View extends Backbone.View
  ns:ApiHeroUI.core
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
          if _.isArray v
            @[selector] = _.map v, (vEl)=> new clazz _.extend _.clone(params), {el: vEl, __parent:@}
          else
            @[selector] = new clazz _.extend params, {el: v, __parent:@}
          @__children.push @[selector]
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
  __formatter: null
  setTextFormatter:(fmt)->
    @__formatter = fmt
  getText:->
    @$el.text()
  setText:(v)->
    @$el.text (@__formatter? v) || v
    @
  setCollection:(c)->
    return @ unless c? and c instanceof Backbone.Collection
    @collection.off "change reset add remove" if @collection
    (@collection = c).on "change reset add remove", @render, @
    @
  getCollection:->
    @collection
  setModel:(c)->
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
  initialize:(o={})->
    @setTextFormatter o.textFormatter if o.hasOwnProperty 'textFormatter'
    pkg = if (dataClass = @$el.attr 'data-source')? then ApiHeroUI.utils.getPackageClass dataClass else null
    if pkg?
      @collection = pkg if pkg instanceof Backbone.Collection
      @model      = pkg if pkg instanceof Backbone.Model
    @model?.on "change reset", @render, @
    @collection?.on "change reset add remove", @render, @
    @__parent = o.__parent if o.hasOwnProperty '__parent'
    @init o if @init? and typeof @init is 'function'
    @render()