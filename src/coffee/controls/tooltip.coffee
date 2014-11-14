class Backbone.controls.Tooltip extends Backbone.View
  ns:Backbone.controls
  modelClass: Backbone.Model.extend
    defaults:
      classes:''
      text:''
      top: 0
      left: 0
  model:null
  text:(val)->
    if val?
      model.set text : val
      return @
    else
      return model.get 'text'
  render:->
    @remove()
    @el = (@$el = $ @template @model.attributes).get()
    pos = _.pick @model.attributes, 'top', 'left'
    $('body').append @$el
    @$el.css top:(pos.top - (@$el.height()*2)) - 6, left:pos.left
    @delegateEvents()
    @
  remove:->
    $('.tooltip-container').remove()
  destroy:->
    @remove()
    @$target.off 'mouseout'
  initialize:(target,opts={})->
    return unless target?
    (@$target = target).on 'mouseout', => @destroy()
    _.extend opts, _.pick @$target.position(), 'top', 'left' unless opts.top? or opts.left?
    (@model = new @modelClass opts).on 'change', @render, @
    @template = _.template _t if (clazz = @ns[Fun.getConstructorName @] || Backbone.controls.Tooltip)? and typeof (_t = clazz.__template__) is 'string'
    @render()
Backbone.controls.Tooltip.__template__ = """
<div class="tooltip-container">
  <span class="tooltip-text <%= classes || ''%>"><%=text %></span>
  <div class="tooltip-notch"></div>
</div>
"""