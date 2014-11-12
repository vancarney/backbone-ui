class Backbone.controls.Checkbox extends Backbone.View
  __opts:
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
      console.log $(evt.target).val()
    'click .checkbox-container':->
      (ckBx = @$el.find 'input[type="checkbox"]').val (val = if ckBx.val() is 'on' then 'off' else 'on')
      @$el.find('.checkbox-symbol')[if val is 'on' then 'addClass' else 'removeClass'] 'checkbox-on'
  render:->
    @$el.html @template @__opts
    @delegateEvents()
    @
  initialize:(opts={})->
    _.extend @__opts, opts.params
    @$el      = $(@el = opts.el) if opts.el
    @template = _.template _t if (clazz = global[Fun.getConstructorName @] || Backbone.controls.Checkbox)? and typeof (_t = clazz.__template__) is 'string'
    @render()
Backbone.controls.Checkbox.__template__ = """
<span class="checkbox-container">
  <label for="{{id || ''}}">{{label}}</label>
  <input type="checkbox" name="{{name}}" id="{{id || ''}}" checked="false"/>
  <div class="checkbox-symbol {{classes || ''}}"></div>
</span>
"""