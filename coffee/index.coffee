'use strict'
#### global
# > References the root environment RikkiTikki is operating in
global = exports ? window
# Includes Backbone & Underscore if the environment is NodeJS
_         = (unless typeof exports is 'undefined' then require 'underscore' else global)._
Backbone  = unless typeof exports is 'undefined' then require 'backbone' else global.Backbone
global.ApiHeroUI =
  core: {}
  components:{}
  controls: {}
  interactions: {}
  plugins:{}
  utils:
    guid: ->
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, (c)->
        (if (r = Math.random()*16|0)>=0 and c == 'x' then r else (r&0x3|0x8)).toString 16
    isMobile: ->
      /Mobi/i.test navigator.userAgent
    isPhonegap: ->
      (window.cordova || window.PhoneGap || window.phonegap)? || /^file:\/{3}[^\/]/i.test( window.location.href )
  search:{}
  routes: {}
# mixes-in Backbone.Events
_.extend global.ApiHeroUI, Backbone.Events