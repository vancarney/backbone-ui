class Backbone.controls.Slider extends Backbone.CompositeView
  model: new (Backbone.Model.extend
    defaults:
      minValue:0
      maxValue:100
      value:50
      label:''
      classes:''
    valueOf:->
      @attributes.value || 0
  )
  events:
    'slide .bbui-slider-element':-> console.log 'slide'
  minValue:(v)->
    if (v? and typeof v is 'Number')
      @model.set minValue:v
      return @
    @attributes.minValue
  maxValue:(v)->
    if (v? and typeof v is 'Number')
      @model.set maxValue:v
      return @
    @attributes.maxValue
  value:(v)->
    if (v? and typeof v is 'Number')
      @model.set value:v
      return @
    @attributes.value
  render:->
    Slider.__super__.render.call @
    @$el.html @template @model.attributes if @template?
    console.log @$('.bbui-slider-element')
    @$('.bbui-slider-element').noUiSlider
      start: @model.attributes?.value || 0
      range:
        min:@model.attributes?.minValue || 0
        max:@model.attributes?.maxValue || 100
  initialize:(o)->
    _.extend @model.attributes, o
    @template   = _.template _t if (clazz = Backbone.controls.Slider)? and typeof (_t = clazz.__template__) == 'string'
    Slider.__super__.initialize.call @, o
    
Backbone.controls.Slider.__template__ = """
<div class="bbui-slider <%=classes || ""%>>
  <span class="label"><%=label%></span>
  <div class="bbui-slider-element"></div>
</div>
"""