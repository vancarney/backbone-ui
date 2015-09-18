class ApiHeroUI.controls.Image extends ApiHeroUI.core.View
  init:->
    @options = new (Backbone.Model.extend
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
    @options.set _.zipObject @$el.attributes
    @options.on 'change', =>
      _.each @options.changedAttributes(), (v,k)=>
        @$el.prop k, v
ApiHeroUI.controls.Image.create = (opts={})->
  new ApiHeroUI.controls.Image el: (new Image), options: opts
