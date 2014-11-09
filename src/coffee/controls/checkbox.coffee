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
  # events:
    # 'change input':(evt)->
      # $(evt.target).val
    # 'click .checkbox-container':->
      # alert 'clicky'
      # @$el.find('input[type="checkbox"]').attr('checked', !checked).click()
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
  <input type="checkbox" name="{{name}}" id="{{id || ''}}" checked="{{ checked ? 'checked' : false}}"/>
  <div class="checkbox-symbol {{classes || ''}}"></div>
</span>
"""