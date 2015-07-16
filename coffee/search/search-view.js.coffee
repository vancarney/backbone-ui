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
  submit:(evt)->
    evt.preventDefault()
    evt.stopPropagation()
    console.log @collection.filter.attributes
    # @collection.filter.submit @collection.filter.attributes
    false
  init:->
    ApiHeroUI.ViewHistory ?= new ApiHeroUI.search.History
    @collection ?= new ApiHeroUI.search.Collection
    if (submitter = @$el.attr 'data-search-submitter')?
      switch ($s = $ submitter).prop 'tagName'
        when 'BUTTON'
          $s.on 'click', @submit, @
        when 'A'
          $s.on 'click', @submit, @
        when 'INPUT'
          if $s.attr('type') is 'text'
            @collection.filter.addElement new ApiHeroUI.search.FilterElement el:$s
            return $s.closest('form').submit (evt)=> @submit evt
          $s.on 'change', ((evt)=> @submit())
            
