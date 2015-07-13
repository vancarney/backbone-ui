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
    @on 'view-loaded', (data)=>
      @["#main"].html("").append data
      viewID =  @["#main"].$("div[data-viewid]").attr "data-viewid" || 'UNKOWN_ID'
      viewTitle =  @["#main"].$("div[data-title]").attr "data-title" || viewID
      console.log "WARNING: data-viewid was not set" if viewId is 'UNKOWN_ID'
      document.title = viewTitle
      @trigger "view-initialized", viewID
      @delegateEvents()
  init:(o)->
    _.extend @subviews, ApiHeroUI.core.Application::subviews
    routeOpts = pushState: true
    routeOpts.root = o.rootRoute if o?.hasOwnProperty.rootRooute
    routeOpts.root = rootRoute if (rootRoute = @$el.attr 'data-root-route')?
    @router = new @Router
    Backbone.history.start routeOpts
ApiHeroUI.core.Application::subviews =
  "#main":ApiHeroUI.core.View
ApiHeroUI.core.Application::Router = class ApiHeroUI.core.Routes extends Backbone.Router
  routes:
    "*actions":"url"
  url:(route)->
    $.get "/#{route}", (data,t,r)=>
      @trigger 'view-loaded', data
      