class ApiHeroUI.search.FilterElement extends ApiHeroUI.core.View
  getName:->
    @$el.attr 'name'
  getValue:->
    @$el.val()
  setValue:(v)->
    @$el.val v
  valueOf:->
    o = {}
    o[@getName()] = @getValue()
    o
  init:->
    throw "element #{@$el.get()} missing required `name` attribute. please add one." unless @getName()?
    @$el.on 'change', (=> @trigger 'change', @valueOf() )
    # @$el.on 'change', (=> @trigger @$el.valueOf() ), @
    # switch @$el.prop 'tagName'
      # when 'button'
        # @getValue = =>
          # @$el.attr 'data-value'
        # @setValue = (v)=>
          # @$el.attr 'data-value', v
          # @
        # @$el.on 'click', (=> @trigger @$el.attr 'data-value'), @
      # when 'input'
        # @$el.on 'change', (=> @trigger @$el.val() ), @
      # when 'select'
        # @$el.on 'change', (=> @trigger @$el.val() ), @
      # when 'textarea'
    