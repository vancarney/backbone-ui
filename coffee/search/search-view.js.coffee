class ApiHeroUI.search.View extends ApiHeroUI.core.View
  events:
    "click .search-submit":"submit"
  subviews:
    '.search-filter':ApiHeroUI.search.FilterElement
    'ul.search-results':ApiHeroUI.controls.List
  childrenComplete:->
    _.each @['.search-filter'], (filter)=> @collection.filter.addElement filter
    @['ul.search-results'].setCollection @collection
  submit:->
    @collection.filter.submit @collection.filter.attributes
  init:->    
    new ApiHeroUI.search.SearchHistory
