class ApiHeroUI.search.Collection extends Backbone.Collection
  model:ApiHeroUI.search.ResultsModel
  filter:new boat.SearchFilter
  getLastResults:->
    @at @models.length - 1 
  getCurrentResults:->
    @at if (idx = global.app.ViewHistory.currentIndex) >= 0 then idx else 0
  getResultsByUUID:(uuid)->
    _.findWhere @models, uuid:uuid
  setFilter:(filter)->
    @filter = filter
  seed:(seed_elements)->
    # init the models array wtih pre-seeded search rsults on load
    @models[0] = new @model seed_elements
    @models[0].uuid =  (h=global.app.ViewHistory).getUUIDAt h.currentIndex
  initialize:(o)->
    Collection.__super__.initialize.apply @, arguments
    global.app.ViewHistory.on 'navigate', (o)=>
      @add new @model() if o.get 'unique'
    @on 'add', (args...) => 
      args[0].fetch params: window.location.search