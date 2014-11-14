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
    'click .checkbox-container':->
      (ckBx = @$el.find 'input[type="checkbox"]').val (val = if ckBx.val() is 'on' then 'off' else 'on')
      @$el.find('.checkbox-symbol')[if val is 'on' then 'addClass' else 'removeClass'] 'checkbox-on'
  render:->
    @$el.html @template @__props.attributes
    @delegateEvents()
    @
  initialize:(opts={})->
    @__props ?= new @propsClass  opts.params || {}
    @$el      = $(@el = opts.el) if opts.el
    @template = _.template _t if (clazz = @ns[Fun.getConstructorName @] || Backbone.controls.Checkbox)? and typeof (_t = clazz.__template__) is 'string'
    @render()
Backbone.controls.Checkbox.__template__ = """
<span class="checkbox-container">
  <label for="{{id || ''}}">{{label}}</label>
  <input type="checkbox" name="{{name}}" id="{{id || ''}}" value="off"/>
  <div class="checkbox-symbol {{classes || ''}}"></div>
</span>
"""