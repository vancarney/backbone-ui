###
  router.js
  Application Router
###
global = exports ? window
global.ApiHero = {} if !global.ApiHero
###
  App Router
###
class ApiHero.Routes extends Backbone.Router
  routes:
    "*actions":"url"
  url:(route)->
    $.get "/#{route}", (data,t,r)=>
      $("#main").html("").append data
      @trigger "setView", $("div[data-viewid]").attr "data-viewid"