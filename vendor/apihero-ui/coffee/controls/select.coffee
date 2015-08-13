'use strict'
class ApiHeroUI.Select extends ApiHeroUI.core.View
  events:
    "change":"changeHandler"
  changeHandler:(evt)->
    evt.preventDefault()
    @trigger 'change', @getValue()
    false
  reset:->
    _.each @$el.find('option'), (v,k)=> $(v).attr 'selected', false
    @
  setOptions:(opts)->
    @reset()
    if opts.selected?
      opt.attr 'selected', true if (opt = @$el.find("option[value=#{opts.selected}]"))? and opt.length
    @
  getValue:->
    @$el.val()
  setValue:(v)->
    @setOptions selected:v
    @
$.fn.Select = (opts)=>
  return new ApiHeroUI.controls.Select {el: @}, opts || {}