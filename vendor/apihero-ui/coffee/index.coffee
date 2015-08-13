'use strict'
#### global
# > References the root environment RikkiTikki is operating in
global = exports ? window
# Includes Backbone & Underscore if the environment is NodeJS
_         = (unless typeof exports is 'undefined' then require 'underscore' else global)._
Backbone  = unless typeof exports is 'undefined' then require 'backbone' else global.Backbone
global.Util ?= {}
global.Util.GUID = ->
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, (c)->
    (if (r = Math.random()*16|0)>=0 and c == 'x' then r else (r&0x3|0x8)).toString 16
global.Util.isMobile = ->
  jQuery.browser.mobile
global.Util.isPhonegap = ->
  (window.cordova || window.PhoneGap || window.phonegap)? || /^file:\/{3}[^\/]/i.test( window.location.href )
global.ApiHeroUI =
  core: {}
  components:{}
  controls: {}
  interactions: {}
  plugins:{}
  utils: {}
  search:{}
  routes: {}
_.extend global.ApiHeroUI, Backbone.Events