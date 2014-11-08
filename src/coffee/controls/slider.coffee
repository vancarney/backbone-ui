class Backbone.controls.Slider extends Backbone.CompositeView
  model: new (Backbone.Model.extend
    defaults:
      minValue:0
      maxValue:100
      value:50
    valueOf:->
      @attributes.value || 0
  )
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
  subviews:
    '.bbui-slider-base':Backbone.controls._sliderBase
  init:(opts)->
Backbone.controls.Slider.__template__ = """
<div class="bbui-slider {{classes || ""}}>
  <div class="bbui-slider-base">
    <div class="bbui-slider-ticks"></div>
  </div>
</div>"
"""