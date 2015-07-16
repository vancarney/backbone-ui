class ApiHeroUI.search.Filter extends Backbone.Model
  defaults:{}
  options:
    autoUpdate:true
  changeHandler:->
    if (diffs = ApiHeroUI.utils.getDiffs @attributes, @defaults).length > 1
      _.each diffs, (v,k)=> diffs.splice k, 1 if v? and v[0] == 'page'
    @submit diffs
  submit:(query)->
    # console.log query
    # console.log "#{ApiHeroUI.utils.querify query}"
    ApiHeroUI.ViewHistory.navigate "#{ApiHeroUI.utils.querify query}" # "#{ApiHeroUI.utils.objectToQuery query}"
  addElement:(el,opts)->
    _.extend @attributes, el.valueOf()
    fFunc = (data)=> @set data
    el.on 'change', fFunc, @
    el.stopFiltering = => el.off 'change', fFunc
    @
  removeElement:(el,opts)->
    el.stopFiltering()
    delete el.stopFiltering
    @
  initialize:(o={})->
    _.extend @options, o
    _.extend @attributes, ApiHeroUI.utils.queryToObject window.location.search
    @on 'change', @changeHandler, @ if @options.autoUpdate