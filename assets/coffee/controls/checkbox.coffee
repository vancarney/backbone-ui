class Backbone.controls.Checkbox extends Backbone.View
  ns:Backbone.controls
  __props:null
  propsClass: Backbone.Model.extend
    defaults:
      classes:''
      label:''
      id:''
      name:''
      checked: false
  val:(val)->
    if val?
      @$el.find('input').val val
      return @
    else
      return @$el.find('input').val()
  events:
    'change input':(evt)->
      @trigger 'change', @val()
    'click .checkbox-container':(evt)->
      evt.stopPropagation();
      evt.preventDefault();
      (ckBx = @$ 'input[type="checkbox"]').val(val = if ckBx.val() is 'on' then 'off' else 'on').trigger 'change'
      @$('.checkbox-symbol')[if val is 'on' then 'addClass' else 'removeClass'] 'checkbox-on'
  render:->
    @$el.children().remove().end().html @template @__props.attributes
    @
  initialize:(opts={})->
    @__props ?= new @propsClass  opts.params || null
    @render()
Backbone.controls.Checkbox.__template__ = Handlebars.templates['checkbox-control']
