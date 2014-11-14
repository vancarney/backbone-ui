class Backbone.controls.Tooltip extends Backbone.View
  ns:Backbone.controls
  modelClass: Backbone.Model.extend
    defaults:
      classes:''
      text:''
  model:null
  text:(val)->
    if val?
      model.set text : val
      return @
    else
      return model.get 'text'
  events:
    'mouseout':-> @$el.remove()
  render:->
    @$el.remove() if @$el?
    $('body').append @$el = $ @template @model.attributes
    @delegateEvents()
    @
  initialize:(target,opts)->
    return unless target?
    @$target = target
    (@model = new @modelClass opts).on 'change', @render, @
    @template = _.template _t if (clazz = @ns[Fun.getConstructorName @] || Backbone.controls.Tooltip)? and typeof (_t = clazz.__template__) is 'string'
    @render()
Backbone.controls.Tooltip.__template__ = """
<div class="tooltip-container">
  <span class="tooltip-text <%= classes || ''%>"><%=text %></span>
  <div class="tooltip-notch"></div>
</div>
"""