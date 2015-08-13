$.fn.extend rotaterator: (options) ->
  defaults =
    fadeSpeed: 600
    pauseSpeed: 100
    child: null

  options = $.extend defaults, options
  
  @each ->
    o = options
    obj = $ @
    items = $ obj.children(), obj
    items.each ->
      $(@).hide()

    unless o.child
      next = $(obj).children ":first"
    else
      next = o.child
      
    $(next).fadeIn o.fadeSpeed, ->
      $(next).delay(o.pauseSpeed).fadeOut o.fadeSpeed, ->
        next = $(@).next()
        next = $(obj).children ":first" if next.length is 0
        $(obj).rotaterator
          child: next
          fadeSpeed: o.fadeSpeed
          pauseSpeed: o.pauseSpeed




