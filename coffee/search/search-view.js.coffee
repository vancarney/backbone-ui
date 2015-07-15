class ApiHeroUI.search.View extends ApiHeroUI.core.View
  events:
    "click .search-submit":"submit"
  subviews:
    '.search-filter':ApiHeroUI.search.FilterElement
    'ul.search-results':ApiHeroUI.controls.List
  childrenComplete:->
    _.each @['.search-filter'], (filter)=> @collection.filter.addElement filter
    throw "element ul.search-results was not a child of search view" unless @['ul.search-results']?
    @['ul.search-results'].setCollection @collection
  submit:->
    @collection.filter.submit @collection.filter.attributes
  init:->
    global.app.ViewHistory ?= new ApiHeroUI.search.History
    @collection ?= new ApiHeroUI.search.Collection