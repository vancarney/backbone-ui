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
    @collection.filter.submit @collection.filter.attributes
    false
  init:->
    ApiHeroUI.on 'apihero-initialized', =>
      console.log "init"
      global.app.ViewHistory ?= new ApiHeroUI.search.History
    @collection ?= new ApiHeroUI.search.Collection
    if (submitter = @$el.attr 'data-search-submitter')?
      switch ($submitter = $ submitter).prop 'tagName'
        when 'button'
          $submitter.on 'click', @submit, @
        when 'a'
          $submitter.on 'click', @submit, @
        when 'input'
          if $submitter.attr 'type' is 'select'
            $submitter.keyup (evt)=> @submit() if evt.keycode is 13
          $submitter.on 'change', @submit, @  if $submitter.attr 'type' is 'checkbox'
          $submitter.on 'change', @submit, @  if $submitter.attr 'type' is 'radio'
          $submitter.on 'change', @submit, @  if $submitter.attr 'type' is 'select'
            
