$.fn.draggable = (opt)->
  opt = $.extend {handle:null,cursor:"move"}, opt
  $el = if opt.handle? then @find opt.handle else @
  $el.css('cursor', opt.cursor).on "mousedown", (evt)->
    ($drag = if opt.handle? then $(@).addClass('active-handle').parent() else $(@)).addClass('draggable') 
    z_idx = $drag.css 'z-index'
    drg_h = $drag.outerHeight()
    drg_w = $drag.outerWidth()
    pos_y = $drag.offset().top  + drg_h - evt.pageY
    pos_x = $drag.offset().left + drg_w - evt.pageX
    $drag.css('z-index', 1000).parents()
    .on "mousemove", (evt)->
      $('.draggable').offset
        top:evt.pageY + pos_y - drg_h,
        left:evt.pageX + pos_x - drg_w
      .on "mouseup", ()=>
        $(@).removeClass('draggable').css 'z-index', z_idx
        evt.preventDefault()
    .on "mouseup", =>
      if opt.handle?
        $(@).removeClass('active-handle').parent().removeClass 'draggable'
      else
        $(@).removeClass 'draggable'
        