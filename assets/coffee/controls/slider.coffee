class Backbone.controls.Slider extends Backbone.CompositeView
  ns:Backbone.controls
  modelClass: Backbone.Model.extend
    defaults:
      start:50
      range:
        min:0
        max:100
      label:''
      classes:''
  model: null
  getSliderOpts:(o)->
     _.pick (o || @model.attributes), 'start', 'range', 'connect', 'margin', 'limit', 'step', 'orientation', 'direction', 'animate'
  events:
    'slide .bbui-slider-element':->
      @trigger 'change', value:@value()
  value:(v)->
    if (v? and typeof v is 'Number')
      @$('.bbui-slider-element').val v
      return @
    @$('.bbui-slider-element').val()
  render:->
    Slider.__super__.render.call @
    @$el.html @template @model.attributes if @template?
    @$('.bbui-slider-element').noUiSlider @getSliderOpts()
  initialize:(o)->
    @model ?= new @modelClass
    _.extend @model.attributes, @getSliderOpts o
    @template = _.template _t if typeof (_t = @ns[Fun.getConstructorName @]?.__template__ || Backbone.controls.Slider.__template__) is 'string'
    @model.on 'change', @render, @
    Slider.__super__.initialize.call @, o
Backbone.controls.Slider.__template__ = """
<div class="bbui-slider <%=classes || ''%>">
  <span class="label"><%=label%></span>
  <div class="bbui-slider-element"></div>
</div>
"""