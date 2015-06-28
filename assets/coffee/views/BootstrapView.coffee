class Backbone.BootstrapView extends Backbone.View
  show:->
    @$el
    .addClass 'show'
    .removeCLass 'hidden'
    @
  hide:->
    @$el
    .addClass 'hidden'
    .removeCLass 'show'
    @
  setTooltip:(text,opts={})->
    @$el.toolTip _.extend opts, title:text
    @
  initialize:->
    BootstrapView.__super__.initialize.apply @, arguments