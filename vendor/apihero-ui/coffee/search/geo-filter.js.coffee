class ApiHeroUI.search.GeoFilter extends ApiHeroUI.search.Filter
  getBounds:->
    createMarker = (llSW,llNE)->
      lat = ApiHeroUI.utils.decodeLatLng llSW
      lng = ApiHeroUI.utils.decodeLatLng llNE
      new google.maps.LatLngBounds lat, lng
    if (llNE = @attributes.latLngNe)? and (llSW = @attributes.latLngSw)? then createMarker llSW,llNE else null
  changeHandler:->
    if (bounds = @getBounds())?
      @attributes.near = null 
      @attributes.search_radius = MapView.getBoundsRad bounds
      GeoFilter.__super__.changeHandler.apply @, arguments
  initialize:(o={})->
    GeoFilter.__super__.initialize.call @, o
    @on 'change', @changeHandler, @