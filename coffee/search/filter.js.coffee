class ApiHeroUI.search.Filter extends Backbone.Model
  defaults:{}
  changeHandler:->
    if (diffs = ApiHeroUI.utils.getDiffs @attributes, @defaults).length > 1
      _.each diffs, (v,k)=> diffs.splice k, 1 if v? and v[0] == 'page'
    window.app.ViewHistory.navigate "#{ApiHeroUI.utils.querify diffs}"
  initialize:(o={})->
    _.extend @defaults, o.defaults if o.hasOwnProperty 'defaults'
    _.extend @attributes, ApiHeroUI.utils.queryToObject window.location.search
    @on 'change', @changeHandler, @