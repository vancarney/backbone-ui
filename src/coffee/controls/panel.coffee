class Backbone.controls.Panel extends Backbone.CompositeView
  ns:Backbone.controls
  model: new (Backbone.Model.extend
    defaults:
      title:'Panel'
      collapsable:false
      minified:false
  )
  events:
    'click .panel-header .help': ->
    'click .panel-header .close': ->
    'click .panel-header .expand': ->
    'click .panel-header .collapse': ->
  getCollection:->
    @['.panel-content']?.getCollection()
  setCollection:(c)->
    @['.panel-content']?.setCollection c
  getChildren:->
    @['.panel-content']?.getChildren()
  addChild:(sel,clazz,opts)->
    @['.panel-content']?.addChild sel,clazz,opts
  removeChild:(sel,opts)->
    @['.panel-content']?.removeChild sel,opts
  replaceChild:(sel,clazz)->
    @['.panel-content']?.replaceChild sel,clazz
  removeAllChildren:->
    @['.panel-content']?.removeAllChildren()
  createChildren:->
    if typeof (_t = @ns[Fun.getConstructorName @]?.__template__ || Backbone.controls.Panel.__template__) is 'string'
      _tpl = _.template _t
    @$el.html _tpl( if @model?.attributes? then @model.attributes else {} ) if _tpl
    @$('.panel-content').html @__content if @__content? and typeof @__content is 'string'
    Panel.__super__.createChildren.call @
  render:->
    Panel.__super__.render.call @
    @$el.draggable handle:'.panel-header'
    @
  initialize:(o)->
    _o_subviews = _.clone @subviews
    @subviews = 
      '.panel-header':Backbone.CompositeView
      '.panel-content':Backbone.CompositeView.extend subviews: _o_subviews
    @__content =  @$el.children().html()
    @$el.children().remove()
    Panel.__super__.initialize.call @, o
Backbone.controls.Panel.__template__ = """
<div class="bbui-panel-container<%= minified ? ' minified' : ''%>">
  <div class="panel-header">
    <div class="panel-title-container">
      <h1 class="panel-title"><%=title%></h1>
    </div> 
  </div>
  <div class="panel-content">
  </div>
</div>
"""