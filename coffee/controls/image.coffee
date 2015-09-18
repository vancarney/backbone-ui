class ApiHeroUI.controls.Image extends ApiHeroUI.core.View
  options: new (Backbone.Model.extend
    defaults:
      alt: "image"
      complete: ""
      crossOrigin: ""
      currentSrc: ""
      height: ""
      isMap: ""
      name: ""
      src: ""
      srcset: ""
      useMap: ""
      width: ""
    validate: ->
  )
  render:(options)->
    return unless @options.isValid()
    @attributes = _.extend @attributes, @model.valueOf()
    @
  init:->
    @options.set _.zipObject @$el.attributes
    @options.on 'change', @render, @
ApiHeroUI.controls.Image.create = (opts={})->
  new ApiHeroUI.controls.Image el: (new Image), options: opts
