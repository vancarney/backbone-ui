fs            = require 'fs'
mincer        = require 'mincer'
environment   = require '../environment'
module.exports.init = (app)->
  app.set 'views', './views'
  app.set 'view engine', 'jade'
  app.use '/assets', mincer.createServer environment
  app.use (req, res, next)->
    res.locals ?= {}
    res.locals.isXHR = (rh = req.headers['x-requested-with'])? && rh is 'XMLHttpRequest' #then true else false
    next()
  app.get '/', (eq,res,next)->
    res.render 'index'