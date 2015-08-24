class ApiHeroUI.core.Application extends ApiHeroUI.core.View
  el:"body"
  events:
    "click a[href^='/']": (evt)->
      href = $(evt.currentTarget).attr 'href'
      # Allow shift+click for new tabs, etc.
      evt.preventDefault() unless evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey
      # Remove leading slashes and hash bangs (backward compatablility)
      url = href.replace(/^\//,'').replace '\#\!\/',''
      # Instruct Backbone to trigger routing events
      @router.navigate url, trigger: true
      false
  childrenComplete:->
    throw "required element `#main` was not found, please check your layout" unless @["#main"]?
    (initMainView = ()=>
      viewClass = @["#main"].$el.children().first().attr 'data-controller'
      # console.log "viewClass: #{viewClass}"
      pkg = if viewClass? then ApiHeroUI.utils.getPackageClass viewClass else null
      pkg ?= ApiHeroUI.core.View
      viewEl = @["#main"].$el.children().first()
      @["#main"].__children.splice 0, @["#main"].__children.length, @["#main"]["page-view"] = new pkg {el:viewEl, __parent:@["#main"]}
      viewID    = viewEl.attr "data-viewid" || 'UNKOWN_ID'
      viewTitle = viewEl.attr "data-title" || viewID
      console.log "WARNING: data-viewid was not set" if viewID is 'UNKOWN_ID'
      document.title = viewTitle
      @trigger "view-initialized", viewID
    )()
    @router.on 'view-loaded', (data)=>
      @["#main"].$el.html("").append data
      initMainView()
      @delegateEvents()
  init:(o)->
    throw "ApiHeroUI requires 'data-app-namespace' to be set on document body" unless (ApiHeroUI.ns = @$el.attr 'data-app-namespace')?
    _.extend @subviews, ApiHeroUI.core.Application::subviews
    routeOpts = pushState: true, silent: true, root: '/'
    routeOpts.root = o.rootRoute if o?.hasOwnProperty.rootRooute
    routeOpts.root = rootRoute if (rootRoute = @$el.attr 'data-root-route')?
    if (@auth = (window[ApiHeroUI.ns])?.Auth?.getInstance())?
      @auth.on 'authenticated', =>
        c = ApiHeroUI.config.AuthCookie
        if @auth.persist
          Cookies.set "#{ApiHeroUI.ns}-persist", true, c
        else
          delete c.expires 
        Cookies.set "#{ApiHeroUI.ns}-auth", (window[ApiHeroUI.ns])?.Auth?.getInstance().getToken(), c
        @router.refresh()
      @auth.on 'deauthenticated', =>
        c = ApiHeroUI.config.AuthCookie
        @router.refresh()
        return unless (cookie = Cookies.get "#{ApiHeroUI.ns}-auth")?
        if (Cookies.get "#{ApiHeroUI.ns}-persist")?
          delete c.expires
          Cookies.remove "#{ApiHeroUI.ns}-persist", c
        Cookies.remove "#{ApiHeroUI.ns}-auth", c
      @auth.restore token if (token = Cookies.get "#{ApiHeroUI.ns}-auth")?
    @router = new @Router
    Backbone.history.start routeOpts
  @getInstance: ->
    @__instance ?= new @
ApiHeroUI.config =
  AuthCookie:
    expires: 14
    path: '/'
ApiHeroUI.core.Application::subviews =
  "#main":ApiHeroUI.core.View
ApiHeroUI.core.Application::Router = class ApiHeroUI.core.Routes extends Backbone.Router
  routes:
    "*actions":"url"
  refresh:->
    @url window.location.pathname.replace(/^\//, ''), window.location.search.replace /^\?/, ''
  url:(route="",query)->
    query = if query?.length then "?#{query}" else ''
    $.ajax 
      url:"/#{route}#{query}"
      headers: 'Authorization' : (window[ApiHeroUI.ns])?.Auth?.getInstance().getToken()
    .done (data,t,r)=>
      @trigger 'view-loaded', data
# intializes App into global scope
(( global, $ ) ->
  $(document).bind (if ApiHeroUI.utils.isPhonegap() then 'deviceready' else 'ready'), =>
    if window.DEBUG
      ApiHeroUI.on 'apihero-init-started apihero-init-complete', (type)->
        console.log "ApiHeroUI init #{type}: #{Date.now()}"
    ApiHeroUI.trigger 'apihero-init-started', 'start'
    global.app = ApiHeroUI.core.Application.getInstance()
    ApiHeroUI.trigger 'apihero-init-complete', 'complete'
) window, jQuery