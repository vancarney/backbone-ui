class ApiHeroUI.search.History extends Backbone.Collection
  model:null
  currentParams:window.location.search
  route:"/search"
  currentIndex:-1
  __popCount:-1
  getLocation:->
    window.location.search.replace '?', ''
  getParams:(search)->
    # decodeURIComponent ApiHeroUI.utils.objectToQuery search
    decodeURIComponent ApiHeroUI.utils.querify _.pairs search
  uuidExists:(params)->
    if (len = (u = @where search:params).length) then u[0].get 'uuid' else null
  getUUIDAt:(idx)->
    if (itm = @at idx)? then itm.get 'uuid' else null
  navigate:(search)->
    search = ApiHeroUI.utils.queryToObject search
    search['s_id'] = searchHistoryId = ApiHeroUI.utils.mkGUID()
    window.history.pushState null, null, "#{@route}?#{@currentParams = @getParams search}".replace '?&', '?'
    original_uuid = @uuidExists @currentParams
    @add new @model search:@currentParams, uuid:searchHistoryId, unique:(original_uuid==null), o_uuid:original_uuid
  add:(models, opts)->
    @remove @slice @currentIndex, @models.length-1 if ((@models.length-1) - @currentIndex) > 0
    models = [models] unless _.isArray models
    History.__super__.add.call @, models, opts || {}
  getSearchIndex:(search)->
    (@pluck 'search').lastIndexOf search.replace '?', ''
  initialize:(o={})->
    @route = o.route if o.hasOwnProperty 'route'
    @on 'add', (models, object, options)=>
      @currentIndex = @models.length - 1
      models = [models] unless _.isArray models
      _.each (models), (v,k)=>
        @trigger 'navigate', v if v.get 'unique'
    @on 'remove', => 
      @currentIndex = @models.length - 1
    $(window).on 'popstate', (evt)=>
      return if ((@__popCount = @__popCount + 1) + @currentIndex) == 0
      if (idx = @getSearchIndex @currentParams = @getLocation()) >= 0
        @currentIndex = idx
      else
        p = ApiHeroUI.utils.queryToObject @currentParams
        @unshift new @model search:@currentParams, uuid:p.s_id || null, unique:true, o_uuid:null
        @currentIndex = @getSearchIndex @currentParams
      @trigger 'popstate', @at @currentIndex
    search_d = if (m = window.location.search.match(/s_id=([a-z0-9\-]{12})/)) then m[1] else ApiHeroUI.utils.mkGUID()
    ApiHeroUI.on 'apihero-init-complete', =>
      @models.push new @model search:(@currentParams = @getLocation().split('&s_id').shift()), uuid:search_d
    @currentIndex = 0