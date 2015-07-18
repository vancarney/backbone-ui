ApiHeroUI.on 'apihero-init-complete', ->
  global[ApiHeroUI.ns].HistoryItem = global[ApiHeroUI.ns].Object.extend
    className:'search'
    ns:ApiHeroUI.ns
    defaults:
      search:""
      unique:true
      uuid:""
      o_uuid:null
  ApiHeroUI.search.History::model = global[ApiHeroUI.ns].HistoryItem