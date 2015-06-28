class ApiHeroUI.controls.Checkbox extends Backbone.View
  ns:ApiHeroUI.controls
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
    @template = _.template _t if (clazz = @ns[Fun.getConstructorName @] || Backbone.controls.Checkbox)? and typeof (_t = clazz.__template__) is 'string'
    @render()
ApiHeroUI.controls.Checkbox.__template__ = """
<span class="checkbox-container">
  <label for="{{id || ''}}">{{label}}</label>
  <input type="checkbox" name="{{name}}" id="{{id || ''}}" value="off"/>
  <div class="checkbox-symbol {{classes || ''}}"></div>
</span>
"""