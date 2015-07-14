#### getFunctionName(function)
# returns name of passed function
ApiHeroUI.utils.getFunctionName = (fun)->
  if (n = fun.toString().match /function+\s{1,}([a-zA-Z_0-9]*)/)? then n[1] else null
#### getDiffs(object, object)
# returns object containing differences between objects
ApiHeroUI.utils.getDiffs = (obj1, obj2)->
    if obj1? and obj2? then _.reject (_.pairs obj1), (v)=> obj2[v[0]] == v[1] else null
#### getTypeOf(object)
# returns  name of Object type as string
ApiHeroUI.utils.getTypeOf = (obj)-> 
  Object.prototype.toString.call(obj).slice 8, -1
#### isOfType(object, kind)
# returns `boolean` based on object passed as object param matching  object passed as kind param
ApiHeroUI.utils.isOfType = (value, kind)->
  (@getTypeOf value) == (ApiHeroUI.utils.getFunctionName kind) or value instanceof kind
ApiHeroUI.utils.querify = (array)->
  return null unless typeof array is 'object'
  return ApiHeroUI.utils.objectToQuery array unless _.isArray array
  "#{(_.map array, (v)-> v.join '=').join '&'}"
#### objectToQuery(object)
# Transforms Object to name value paired Query String
ApiHeroUI.utils.objectToQuery = (object={})->
  return null unless typeof array is 'object'
  pairs = []
  keys  = Object.keys object
  for i in [0..(keys.length - 1)]
    pairs[i] = [keys[i], object[keys[i]]]
  (pairs.map (v,k) => v.join '=' ).join '&'
#### queryToObject(string)
# Transforms name value paired Query String to Object 
ApiHeroUI.utils.queryToObject = (string)->
  return null unless typeof string is 'string'
  o={}
  decodeURIComponent(string).replace('?','').split('&').forEach (v,k)=> o[p[0]] = p[1] if (p = v.split '=').length == 2
  o
#### mkGUID()
# returns hexadecimal UUID
ApiHeroUI.utils.mkGUID = ->
  'xxxxxxxxxxxx'.replace /[xy]/g, (c)-> (r = Math.random()*16|0).toString 16