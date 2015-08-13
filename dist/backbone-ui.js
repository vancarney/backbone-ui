'use strict';
var Backbone, _, global;

global = typeof exports !== "undefined" && exports !== null ? exports : window;

_ = (typeof exports !== 'undefined' ? require('underscore') : global)._;

Backbone = typeof exports !== 'undefined' ? require('backbone') : global.Backbone;

if (global.Util == null) {
  global.Util = {};
}

global.Util.GUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r;
    return ((r = Math.random() * 16 | 0) >= 0 && c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
};

global.Util.isMobile = function() {
  return jQuery.browser.mobile;
};

global.Util.isPhonegap = function() {
  return ((window.cordova || window.PhoneGap || window.phonegap) != null) || /^file:\/{3}[^\/]/i.test(window.location.href);
};

global.ApiHeroUI = {
  core: {},
  components: {},
  controls: {},
  interactions: {},
  plugins: {},
  utils: {},
  search: {},
  routes: {}
};

_.extend(global.ApiHeroUI, Backbone.Events);$.fn.draggable = function(opt) {
  var $el;
  opt = $.extend({
    handle: null,
    cursor: "move"
  }, opt);
  $el = opt.handle != null ? this.find(opt.handle) : this;
  return $el.css('cursor', opt.cursor).on("mousedown", function(evt) {
    var $drag, drg_h, drg_w, pos_x, pos_y, z_idx;
    ($drag = opt.handle != null ? $(this).addClass('active-handle').parent() : $(this)).addClass('draggable');
    z_idx = $drag.css('z-index');
    drg_h = $drag.outerHeight();
    drg_w = $drag.outerWidth();
    pos_y = $drag.offset().top + drg_h - evt.pageY;
    pos_x = $drag.offset().left + drg_w - evt.pageX;
    return $drag.css('z-index', 1000).parents().on("mousemove", function(evt) {
      return $('.draggable').offset({
        top: evt.pageY + pos_y - drg_h,
        left: evt.pageX + pos_x - drg_w
      }).on("mouseup", (function(_this) {
        return function() {
          $(_this).removeClass('draggable').css('z-index', z_idx);
          return evt.preventDefault();
        };
      })(this));
    }).on("mouseup", (function(_this) {
      return function() {
        if (opt.handle != null) {
          return $(_this).removeClass('active-handle').parent().removeClass('draggable');
        } else {
          return $(_this).removeClass('draggable');
        }
      };
    })(this));
  });
};ApiHeroUI.utils.getFunctionName = function(fun) {
  var n;
  if ((n = fun.toString().match(/function+\s{1,}([a-zA-Z_0-9]*)/)) != null) {
    return n[1];
  } else {
    return null;
  }
};

ApiHeroUI.utils.getDiffs = function(obj1, obj2) {
  if ((obj1 != null) && (obj2 != null)) {
    return _.reject(_.pairs(obj1), (function(_this) {
      return function(v) {
        return obj2[v[0]] === v[1];
      };
    })(this));
  } else {
    return null;
  }
};

ApiHeroUI.utils.getTypeOf = function(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

ApiHeroUI.utils.isOfType = function(value, kind) {
  return (this.getTypeOf(value)) === (ApiHeroUI.utils.getFunctionName(kind)) || value instanceof kind;
};

ApiHeroUI.utils.querify = function(array) {
  if (typeof array !== 'object') {
    return null;
  }
  if (!_.isArray(array)) {
    return ApiHeroUI.utils.objectToQuery(array);
  }
  return "" + ((_.map(array, function(v) {
    return v.join('=');
  })).join('&'));
};

ApiHeroUI.utils.objectToQuery = function(object) {
  var i, j, keys, pairs, ref;
  if (object == null) {
    object = {};
  }
  if (typeof object !== 'object') {
    return null;
  }
  pairs = [];
  keys = Object.keys(object);
  for (i = j = 0, ref = keys.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
    pairs[i] = [keys[i], object[keys[i]]];
  }
  return (pairs.map((function(_this) {
    return function(v, k) {
      return v.join('=');
    };
  })(this))).join('&');
};

ApiHeroUI.utils.queryToObject = function(string) {
  var o;
  if (typeof string !== 'string') {
    return null;
  }
  o = {};
  decodeURIComponent(string).replace('?', '').split('&').forEach((function(_this) {
    return function(v, k) {
      var p;
      if ((p = v.split('=')).length === 2) {
        return o[p[0]] = p[1];
      }
    };
  })(this));
  return o;
};

ApiHeroUI.utils.getPackageClass = function(_path) {
  var j, len, nsPath, pkg, ref;
  if (!((_path != null) && typeof _path === 'string')) {
    return null;
  }
  pkg = window;
  ref = _path.split('.');
  for (j = 0, len = ref.length; j < len; j++) {
    nsPath = ref[j];
    pkg = pkg[nsPath];
  }
  return pkg;
};

ApiHeroUI.utils.mkGUID = function() {
  return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r;
    return (r = Math.random() * 16 | 0).toString(16);
  });
};var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.core.View = (function(superClass) {
  extend(View, superClass);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.ns = ApiHeroUI.core;

  View.prototype.collection = null;

  View.prototype.__children = [];

  View.prototype.__parent = null;

  View.prototype.subviews = {};

  View.prototype.render = function() {
    return this.createChildren();
  };

  View.prototype.createChildren = function() {
    this.removeAllChildren();
    if (typeof this.subviews !== 'undefined' && (this.subviews != null) && _.isObject(this.subviews)) {
      _.each(this.subviews, ((function(_this) {
        return function(view, selector) {
          var clazz, params;
          if (typeof view === 'undefined') {
            return;
          }
          params = {};
          if (typeof view === 'object') {
            if ((clazz = view.viewClass) == null) {
              return;
            }
            delete view.viewClass;
            _.extend(params, view);
          } else {
            clazz = view;
          }
          return _.each(_this.$el.find(selector), function(v, k) {
            if (_.isArray(v)) {
              _this[selector] = _.map(v, function(vEl) {
                return new clazz(_.extend({}, _.clone(params), {
                  el: vEl,
                  __parent: _this
                }));
              });
            } else {
              _this[selector] = new clazz(_.extend({}, _.clone(params), {
                el: v,
                __parent: _this
              }));
            }
            return _this.__children.push(_this[selector]);
          });
        };
      })(this)));
      this.delegateEvents();
    }
    this.childrenComplete();
    return this;
  };

  View.prototype.getElement = function() {
    return this.$el;
  };

  View.prototype.setElement = function(el) {
    var ref;
    if ((ref = this.$el) != null) {
      ref.remove();
    }
    if (el) {
      this.$el = $(this.el = el);
    }
    this.delegateEvents();
    return this;
  };

  View.prototype.__formatter = null;

  View.prototype.setTextFormatter = function(fmt) {
    return this.__formatter = fmt;
  };

  View.prototype.getText = function() {
    return this.$el.text();
  };

  View.prototype.setText = function(v) {
    this.$el.text((typeof this.__formatter === "function" ? this.__formatter(v) : void 0) || v);
    return this;
  };

  View.prototype.setCollection = function(c) {
    if (!((c != null) && c instanceof Backbone.Collection)) {
      return this;
    }
    if (this.collection) {
      this.collection.off("change reset add remove");
    }
    (this.collection = c).on("change reset add remove", this.render, this);
    return this;
  };

  View.prototype.getCollection = function() {
    return this.collection;
  };

  View.prototype.setModel = function(c) {
    if (this.model) {
      this.model.off("change reset");
    }
    (this.model = c).on("change reset", this.render, this);
    return this;
  };

  View.prototype.getModel = function() {
    return this.model;
  };

  View.prototype.getChildren = function() {
    return this.__children;
  };

  View.prototype.getChild = function(sel) {
    if (typeof clazz !== 'function') {
      throw 'clazz must be type <Function>';
    }
    return this.__children[sel] || null;
  };

  View.prototype.addChild = function(sel, clazz, opts) {
    if (typeof clazz !== 'function') {
      throw 'clazz must be type <Function>';
    }
    (this.subviews != null ? this.subviews : this.subviews = {})[sel] = clazz;
    if (!(((opts != null ? opts.create : void 0) != null) && opts.create === false)) {
      this.createChildren();
    }
    return this;
  };

  View.prototype.removeChild = function(sel, opts) {
    var idx;
    if (!sel) {
      return;
    }
    if (typeof sel === 'string') {
      if (this[sel] != null) {
        if ((idx = this.__children.indexOf(this[sel])) >= 0) {
          this.__children.splice(idx, 1);
        }
        this[sel].remove();
        delete this[sel];
        delete this.subviews[sel];
      }
    } else {
      throw 'param sel must be CSS Selector String';
    }
    return this;
  };

  View.prototype.replaceChild = function(sel, clazz) {
    var _oC, idx;
    if (!((sel != null) && typeof sel === 'string')) {
      throw 'param sel must be CSS Selector String';
    }
    if (!(clazz instanceof Backbone.View)) {
      throw 'param clazz must be Backbone.View';
    }
    if ((idx = this.__children.indexOf(_oC = this[sel])) >= 0) {
      this.__children.splice(idx, 1);
    }
    this.__children[clazz] = this[sel] = clazz;
    return this;
  };

  View.prototype.removeAllChildren = function() {
    var i, len, ref, sel;
    ref = _.keys(this.subviews);
    for (i = 0, len = ref.length; i < len; i++) {
      sel = ref[i];
      this.removeChild(sel);
    }
    return this;
  };

  View.prototype.childrenComplete = function() {
    return this;
  };

  View.prototype.initialize = function(o) {
    var dataClass, pkg, ref, ref1;
    if (o == null) {
      o = {};
    }
    if (o.hasOwnProperty('textFormatter')) {
      this.setTextFormatter(o.textFormatter);
    }
    pkg = (dataClass = this.$el.attr('data-source')) != null ? ApiHeroUI.utils.getPackageClass(dataClass) : null;
    if (pkg != null) {
      if (pkg instanceof Backbone.Collection) {
        this.collection = pkg;
      }
      if (pkg instanceof Backbone.Model) {
        this.model = pkg;
      }
    }
    if ((ref = this.model) != null) {
      ref.on("change reset", this.render, this);
    }
    if ((ref1 = this.collection) != null) {
      ref1.on("change reset add remove", this.render, this);
    }
    if (o.hasOwnProperty('__parent')) {
      this.__parent = o.__parent;
    }
    if ((this.init != null) && typeof this.init === 'function') {
      this.init(o);
    }
    return this.render();
  };

  return View;

})(Backbone.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.core.Application = (function(superClass) {
  extend(Application, superClass);

  function Application() {
    return Application.__super__.constructor.apply(this, arguments);
  }

  Application.prototype.el = "body";

  Application.prototype.events = {
    "click a[href^='/']": function(evt) {
      var href, url;
      href = $(evt.currentTarget).attr('href');
      if (!(evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey)) {
        evt.preventDefault();
      }
      url = href.replace(/^\//, '').replace('\#\!\/', '');
      this.router.navigate(url, {
        trigger: true
      });
      return false;
    }
  };

  Application.prototype.childrenComplete = function() {
    var initMainView;
    if (this["#main"] == null) {
      throw "required element `#main` was not found, please check your layout";
    }
    (initMainView = (function(_this) {
      return function() {
        var pkg, viewClass, viewEl, viewID, viewTitle;
        viewClass = _this["#main"].$el.children().first().attr('data-controller');
        pkg = viewClass != null ? ApiHeroUI.utils.getPackageClass(viewClass) : null;
        if (pkg == null) {
          pkg = ApiHeroUI.core.View;
        }
        viewEl = _this["#main"].$el.children().first();
        _this["#main"].__children.splice(0, _this["#main"].__children.length, _this["#main"]["page-view"] = new pkg({
          el: viewEl,
          __parent: _this["#main"]
        }));
        viewID = viewEl.attr("data-viewid" || 'UNKOWN_ID');
        viewTitle = viewEl.attr("data-title" || viewID);
        if (viewID === 'UNKOWN_ID') {
          console.log("WARNING: data-viewid was not set");
        }
        document.title = viewTitle;
        return _this.trigger("view-initialized", viewID);
      };
    })(this))();
    return this.router.on('view-loaded', (function(_this) {
      return function(data) {
        _this["#main"].$el.html("").append(data);
        initMainView();
        return _this.delegateEvents();
      };
    })(this));
  };

  Application.prototype.init = function(o) {
    var rootRoute, routeOpts;
    if ((ApiHeroUI.ns = this.$el.attr('data-app-namespace')) == null) {
      throw "ApiHeroUI requires 'data-app-namespace' to be set on document body";
    }
    _.extend(this.subviews, ApiHeroUI.core.Application.prototype.subviews);
    routeOpts = {
      pushState: true,
      silent: true,
      root: '/'
    };
    if (o != null ? o.hasOwnProperty.rootRooute : void 0) {
      routeOpts.root = o.rootRoute;
    }
    if ((rootRoute = this.$el.attr('data-root-route')) != null) {
      routeOpts.root = rootRoute;
    }
    this.router = new this.Router;
    return Backbone.history.start(routeOpts);
  };

  Application.getInstance = function() {
    return this.__instance != null ? this.__instance : this.__instance = new this;
  };

  return Application;

})(ApiHeroUI.core.View);

ApiHeroUI.core.Application.prototype.subviews = {
  "#main": ApiHeroUI.core.View
};

ApiHeroUI.core.Application.prototype.Router = ApiHeroUI.core.Routes = (function(superClass) {
  extend(Routes, superClass);

  function Routes() {
    return Routes.__super__.constructor.apply(this, arguments);
  }

  Routes.prototype.routes = {
    "*actions": "url"
  };

  Routes.prototype.url = function(route, query) {
    if (route == null) {
      route = "";
    }
    query = query != null ? "?" + query : '';
    return $.get("/" + route + query, (function(_this) {
      return function(data, t, r) {
        return _this.trigger('view-loaded', data);
      };
    })(this));
  };

  return Routes;

})(Backbone.Router);

(function(global, $) {
  return $(document).bind((global.Util.isPhonegap() ? 'deviceready' : 'ready'), (function(_this) {
    return function() {
      if (window.DEBUG) {
        ApiHeroUI.on('apihero-init-started apihero-init-complete', function(type) {
          return console.log("ApiHeroUI init " + type + ": " + (Date.now()));
        });
      }
      ApiHeroUI.trigger('apihero-init-started', 'start');
      global.app = ApiHeroUI.core.Application.getInstance();
      return ApiHeroUI.trigger('apihero-init-complete', 'complete');
    };
  })(this));
})(window, jQuery);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.controls.Checkbox = (function(superClass) {
  extend(Checkbox, superClass);

  function Checkbox() {
    return Checkbox.__super__.constructor.apply(this, arguments);
  }

  Checkbox.prototype.ns = ApiHeroUI.controls;

  Checkbox.prototype.__props = null;

  Checkbox.prototype.propsClass = Backbone.Model.extend({
    defaults: {
      classes: '',
      label: '',
      id: '',
      name: '',
      checked: false
    }
  });

  Checkbox.prototype.val = function(val) {
    if (val != null) {
      this.$el.find('input').val(val);
      return this;
    } else {
      return this.$el.find('input').val();
    }
  };

  Checkbox.prototype.events = {
    'change input': function(evt) {
      return this.trigger('change', this.val());
    },
    'click .checkbox-container': function(evt) {
      var ckBx, val;
      evt.stopPropagation();
      evt.preventDefault();
      (ckBx = this.$('input[type="checkbox"]')).val(val = ckBx.val() === 'on' ? 'off' : 'on').trigger('change');
      return this.$('.checkbox-symbol')[val === 'on' ? 'addClass' : 'removeClass']('checkbox-on');
    }
  };

  Checkbox.prototype.render = function() {
    this.$el.children().remove().end().html(this.template(this.__props.attributes));
    return this;
  };

  Checkbox.prototype.initialize = function(opts) {
    var _t, clazz;
    if (opts == null) {
      opts = {};
    }
    if (this.__props == null) {
      this.__props = new this.propsClass(opts.params || null);
    }
    if (((clazz = this.ns[Fun.getConstructorName(this)] || Backbone.controls.Checkbox) != null) && typeof (_t = clazz.__template__) === 'string') {
      this.template = _.template(_t);
    }
    return this.render();
  };

  return Checkbox;

})(Backbone.View);

ApiHeroUI.controls.Checkbox.__template__ = "<span class=\"checkbox-container\">\n  <label for=\"{{id || ''}}\">{{label}}</label>\n  <input type=\"checkbox\" name=\"{{name}}\" id=\"{{id || ''}}\" value=\"off\"/>\n  <div class=\"checkbox-symbol {{classes || ''}}\"></div>\n</span>";var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.controls.DataLabel = (function(superClass) {
  extend(DataLabel, superClass);

  function DataLabel() {
    return DataLabel.__super__.constructor.apply(this, arguments);
  }

  DataLabel.prototype.model = null;

  DataLabel.prototype.defaultTitle = "Title";

  DataLabel.prototype.subviews = {
    '.datalabel-value': ApiHeroUI.core.View,
    '.datalabel-title': ApiHeroUI.core.View
  };

  DataLabel.prototype.setOptions = function(opts) {
    if (opts.defaultTitle) {
      this.defaultTitle = opts.defaultTitle;
      delete opts.defaultTitle;
    }
    this.model.set(opts);
    return this;
  };

  DataLabel.prototype.getTitle = function() {
    return this.model.get('title');
  };

  DataLabel.prototype.setTitle = function(v) {
    this.model.set({
      title: v,
      validate: true
    });
    return this;
  };

  DataLabel.prototype.getValue = function() {
    return this.model.get('value');
  };

  DataLabel.prototype.setValue = function(v) {
    this.model.set({
      value: (typeof this.__formatter === "function" ? this.__formatter(v) : void 0) || v,
      validate: true
    });
    return this;
  };

  DataLabel.prototype.setText = function(v) {
    return this.setValue(v);
  };

  DataLabel.prototype.init = function(o) {
    return (this.model = new (Backbone.Model.extend({
      defaults: {
        title: this.defaultTitle || "",
        value: ""
      },
      validate: function(o) {
        var param, type, value;
        for (param in o) {
          value = o[param];
          if ((type = typeof value) !== 'string') {
            return param + " required to be string type was <" + type + ">";
          }
        }
      }
    }))).on('change', (function(_this) {
      return function() {
        _this['.datalabel-value'].setText(_this.model.get('value'));
        return _this['.datalabel-title'].setText(_this.model.get('title'));
      };
    })(this));
  };

  return DataLabel;

})(ApiHeroUI.core.View);

$.fn.DataLabel = (function(_this) {
  return function(opts) {
    return new ApiHeroUI.controls.DataLabel({
      el: _this
    }, opts || {});
  };
})(this);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.controls.ListItem = (function(superClass) {
  extend(ListItem, superClass);

  function ListItem() {
    return ListItem.__super__.constructor.apply(this, arguments);
  }

  ListItem.prototype.render = function() {
    if (!this.template) {
      if (this.model.attributes.hasOwnProperty('text')) {
        return this.setText(this.model.attributes.text);
      }
    } else {
      return ListItem.__super__.render.apply(this, arguments);
    }
  };

  ListItem.prototype.init = function(o) {
    if (this.model == null) {
      this.model = new (Backbone.Model.extend({
        defaults: {
          text: ""
        }
      }));
    }
    return this.model.on('change', this.render, this);
  };

  return ListItem;

})(Backbone.View);

$.fn.ListItem = (function(_this) {
  return function(opts) {
    return new ApiHeroUI.controls.ListItem({
      el: _this
    }, opts || {});
  };
})(this);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.controls.List = (function(superClass) {
  extend(List, superClass);

  function List() {
    return List.__super__.constructor.apply(this, arguments);
  }

  List.prototype.el = "ul";

  List.prototype.subviews = {
    "li": ApiHeroUI.controls.ListItem
  };

  List.prototype.init = function(o) {
    if (this.collection == null) {
      this.collection = new Backbone.Collection;
    }
    return this.collection.on('change', this.render, this);
  };

  return List;

})(ApiHeroUI.core.View);

$.fn.List = (function(_this) {
  return function(opts) {
    return new ApiHeroUI.controls.List({
      el: _this
    }, opts || {});
  };
})(this);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.controls.Panel = (function(superClass) {
  extend(Panel, superClass);

  function Panel() {
    return Panel.__super__.constructor.apply(this, arguments);
  }

  Panel.prototype.ns = ApiHeroUI.controls;

  Panel.prototype.modelClass = Backbone.Model.extend({
    defaults: {
      title: 'Panel',
      collapsable: false,
      minified: false
    }
  });

  Panel.prototype.events = {
    'click .panel-header .close': function() {
      this.$el.parent().remove(this.$el);
      return this.trigger('closed');
    },
    'click .panel-header .collapse': function() {
      if (this.$el.hasClass('panel-collapsed')) {
        this.$el.removeClass('panel-collapsed');
        return this.trigger('expanded');
      } else {
        this.$el.addClass('panel-collapsed');
        return this.trigger('collapsed');
      }
    }
  };

  Panel.prototype.getCollection = function() {
    var ref;
    return (ref = this['.panel-content']) != null ? ref.getCollection() : void 0;
  };

  Panel.prototype.setCollection = function(c) {
    var ref;
    return (ref = this['.panel-content']) != null ? ref.setCollection(c) : void 0;
  };

  Panel.prototype.getChildren = function() {
    var ref;
    return (ref = this['.panel-content']) != null ? ref.getChildren() : void 0;
  };

  Panel.prototype.addChild = function(sel, clazz, opts) {
    var ref;
    return (ref = this['.panel-content']) != null ? ref.addChild(sel, clazz, opts) : void 0;
  };

  Panel.prototype.removeChild = function(sel, opts) {
    var ref;
    return (ref = this['.panel-content']) != null ? ref.removeChild(sel, opts) : void 0;
  };

  Panel.prototype.replaceChild = function(sel, clazz) {
    var ref;
    return (ref = this['.panel-content']) != null ? ref.replaceChild(sel, clazz) : void 0;
  };

  Panel.prototype.removeAllChildren = function() {
    var ref;
    return (ref = this['.panel-content']) != null ? ref.removeAllChildren() : void 0;
  };

  Panel.prototype.createChildren = function() {
    var _t, _tpl, ref, ref1;
    if (typeof (_t = ((ref = this.ns[Fun.getConstructorName(this)]) != null ? ref.__template__ : void 0) || Backbone.controls.Panel.__template__) === 'string') {
      _tpl = _.template(_t);
    }
    if (_tpl) {
      this.$el.html(_tpl(((ref1 = this.model) != null ? ref1.attributes : void 0) != null ? this.model.attributes : {}));
    }
    if ((this.__content != null) && typeof this.__content === 'string') {
      this.$('.panel-content').html(this.__content);
    }
    return Panel.__super__.createChildren.call(this);
  };

  Panel.prototype.render = function() {
    Panel.__super__.render.call(this);
    this.$el.draggable({
      handle: '.panel-header'
    });
    return this;
  };

  Panel.prototype.initialize = function(o) {
    if (this.model == null) {
      this.model = new this.modelClass;
    }
    this.subviews = {
      '.panel-header': Backbone.CompositeView,
      '.panel-content': Backbone.CompositeView.extend({
        subviews: _.clone(this.subviews)
      })
    };
    this.events = _.extend({}, Panel.prototype.events, this.events);
    this.__content = this.$el.children().html();
    this.$el.children().remove();
    return Panel.__super__.initialize.call(this, o);
  };

  return Panel;

})(ApiHeroUI.core.View);

ApiHeroUI.controls.Panel.__template__ = "<div class=\"bbui-panel-container<%= minified ? ' minified' : ''%>\">\n  <div class=\"panel-header\">\n    <div class=\"panel-title-container\">\n      <h1 class=\"panel-title\"><%=title%></h1>\n    </div> \n  </div>\n  <div class=\"panel-content\">\n  </div>\n</div>";'use strict';
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.Select = (function(superClass) {
  extend(Select, superClass);

  function Select() {
    return Select.__super__.constructor.apply(this, arguments);
  }

  Select.prototype.events = {
    "change": "changeHandler"
  };

  Select.prototype.changeHandler = function(evt) {
    evt.preventDefault();
    this.trigger('change', this.getValue());
    return false;
  };

  Select.prototype.reset = function() {
    _.each(this.$el.find('option'), (function(_this) {
      return function(v, k) {
        return $(v).attr('selected', false);
      };
    })(this));
    return this;
  };

  Select.prototype.setOptions = function(opts) {
    var opt;
    this.reset();
    if (opts.selected != null) {
      if (((opt = this.$el.find("option[value=" + opts.selected + "]")) != null) && opt.length) {
        opt.attr('selected', true);
      }
    }
    return this;
  };

  Select.prototype.getValue = function() {
    return this.$el.val();
  };

  Select.prototype.setValue = function(v) {
    this.setOptions({
      selected: v
    });
    return this;
  };

  return Select;

})(ApiHeroUI.core.View);

$.fn.Select = (function(_this) {
  return function(opts) {
    return new ApiHeroUI.controls.Select({
      el: _this
    }, opts || {});
  };
})(this);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.controls.Slider = (function(superClass) {
  extend(Slider, superClass);

  function Slider() {
    return Slider.__super__.constructor.apply(this, arguments);
  }

  Slider.prototype.ns = ApiHeroUI.controls;

  Slider.prototype.modelClass = Backbone.Model.extend({
    defaults: {
      start: 50,
      range: {
        min: 0,
        max: 100
      },
      label: '',
      classes: ''
    }
  });

  Slider.prototype.model = null;

  Slider.prototype.getSliderOpts = function(o) {
    return _.pick(o || this.model.attributes, 'start', 'range', 'connect', 'margin', 'limit', 'step', 'orientation', 'direction', 'animate');
  };

  Slider.prototype.events = {
    'slide .bbui-slider-element': function() {
      return this.trigger('change', {
        value: this.value()
      });
    }
  };

  Slider.prototype.value = function(v) {
    if ((v != null) && typeof v === 'Number') {
      this.$('.bbui-slider-element').val(v);
      return this;
    }
    return this.$('.bbui-slider-element').val();
  };

  Slider.prototype.render = function() {
    Slider.__super__.render.call(this);
    if (this.template != null) {
      this.$el.html(this.template(this.model.attributes));
    }
    return this.$('.bbui-slider-element').noUiSlider(this.getSliderOpts());
  };

  Slider.prototype.initialize = function(o) {
    var _t, ref;
    if (this.model == null) {
      this.model = new this.modelClass;
    }
    _.extend(this.model.attributes, this.getSliderOpts(o));
    if (typeof (_t = ((ref = this.ns[Fun.getConstructorName(this)]) != null ? ref.__template__ : void 0) || Backbone.controls.Slider.__template__) === 'string') {
      this.template = _.template(_t);
    }
    this.model.on('change', this.render, this);
    return Slider.__super__.initialize.call(this, o);
  };

  return Slider;

})(ApiHeroUI.core.View);

ApiHeroUI.controls.Slider.__template__ = "<div class=\"bbui-slider <%=classes || ''%>\">\n  <span class=\"label\"><%=label%></span>\n  <div class=\"bbui-slider-element\"></div>\n</div>";$.fn.extend({
  rotaterator: function(options) {
    var defaults;
    defaults = {
      fadeSpeed: 600,
      pauseSpeed: 100,
      child: null
    };
    options = $.extend(defaults, options);
    return this.each(function() {
      var items, next, o, obj;
      o = options;
      obj = $(this);
      items = $(obj.children(), obj);
      items.each(function() {
        return $(this).hide();
      });
      if (!o.child) {
        next = $(obj).children(":first");
      } else {
        next = o.child;
      }
      return $(next).fadeIn(o.fadeSpeed, function() {
        return $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
          next = $(this).next();
          if (next.length === 0) {
            next = $(obj).children(":first");
          }
          return $(obj).rotaterator({
            child: next,
            fadeSpeed: o.fadeSpeed,
            pauseSpeed: o.pauseSpeed
          });
        });
      });
    });
  }
});var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.components.FormView = (function(superClass) {
  extend(FormView, superClass);

  function FormView() {
    return FormView.__super__.constructor.apply(this, arguments);
  }

  FormView.prototype.events = {
    "change input.bind-change,textarea.bind-change,select.bind-change": function(evt) {
      var identifier, t;
      if (this.model == null) {
        identifier = this.$el.attr('id') || this.$el.attr('name') || this.$el.attr('class');
        return console.log("Formview for '" + identifier + "' has no model");
      }
      return this.model.set(((t = $(evt.target)).attr('name')).replace(/^reg_+/, ''), t.val(), {
        validate: true
      });
    },
    "click button[name=cancel]": function() {
      this.model.clear();
      this.$('input').val(null);
      _.extend(this.model.attributes, _.clone(this.model.defaults));
      return this.trigger('cancelled');
    },
    "click button[name=submit]": function() {
      return this.model.save(null, {
        success: (function(_this) {
          return function(m, r, o) {
            return _this.trigger('submit-success');
          };
        })(this),
        error: (function(_this) {
          return function() {
            return _this.trigger('submit-failure', {
              message: 'unable to complete form submission'
            });
          };
        })(this)
      });
    }
  };

  FormView.prototype.setModel = function(modelClass) {
    return this.model = new this.modelClass().on("change reset", ((function(_this) {
      return function() {
        return _this.trigger('changing');
      };
    })(this)), this).on('invalid', ((function(_this) {
      return function(model, e) {
        return _this.trigger('invalid', {
          message: e
        });
      };
    })(this)), this);
  };

  FormView.prototype.init = function(o) {
    if (o.hasOwnProperty('modelClass')) {
      this.modelClass = o.modelClass;
    }
    if (this.modelClass != null) {
      return this.setModel(this.modelClass);
    }
  };

  return FormView;

})(ApiHeroUI.core.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.components.LoginFormView = (function(superClass) {
  extend(LoginFormView, superClass);

  function LoginFormView() {
    return LoginFormView.__super__.constructor.apply(this, arguments);
  }

  LoginFormView.prototype.init = function(o) {
    ({
      formEvents: {
        "click button[name=submit]": function() {
          return this.model.login();
        }
      }
    });
    this.events = _.extend({}, this.events, formEvents);
    return LoginFormView.__super__.init.call(this, o);
  };

  return LoginFormView;

})(ApiHeroUI.components.FormView);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

ApiHeroUI.search.Collection = (function(superClass) {
  extend(Collection, superClass);

  function Collection() {
    return Collection.__super__.constructor.apply(this, arguments);
  }

  Collection.prototype.model = null;

  Collection.prototype.filter = null;

  Collection.prototype.className = 'search';

  Collection.prototype.getLastResults = function() {
    return this.at(this.models.length - 1);
  };

  Collection.prototype.getCurrentResults = function() {
    var idx;
    return this.at((idx = ApiHeroUI.ViewHistory.currentIndex) >= 0 ? idx : 0);
  };

  Collection.prototype.getResultsByUUID = function(uuid) {
    return _.findWhere(this.models, {
      uuid: uuid
    });
  };

  Collection.prototype.setFilter = function(filter) {
    return this.filter = filter;
  };

  Collection.prototype.seed = function(seed_elements) {
    var h;
    this.models[0] = new this.model(seed_elements);
    return this.models[0].uuid = (h = ApiHeroUI.ViewHistory).getUUIDAt(h.currentIndex);
  };

  Collection.prototype.initialize = function(o) {
    if (this.model == null) {
      this.model = global[ApiHeroUI.ns].Object;
    }
    this.model.prototype.className = this.className;
    Collection.__super__.initialize.apply(this, arguments);
    this.filter = new ApiHeroUI.search.Filter;
    this.on('add', (function(_this) {
      return function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        console.log("args[0l:");
        console.log(args[0]);
        return args[0].fetch({
          params: window.location.search
        });
      };
    })(this));
    return ApiHeroUI.ViewHistory.on('navigate', (function(_this) {
      return function(o) {
        var m;
        console.log(m = new _this.model);
        if (o.get('unique')) {
          return _this.add(m);
        }
      };
    })(this));
  };

  return Collection;

})(Backbone.Collection);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.search.FilterElement = (function(superClass) {
  extend(FilterElement, superClass);

  function FilterElement() {
    return FilterElement.__super__.constructor.apply(this, arguments);
  }

  FilterElement.prototype.getName = function() {
    return this.$el.attr('name');
  };

  FilterElement.prototype.getValue = function() {
    return this.$el.val();
  };

  FilterElement.prototype.setValue = function(v) {
    return this.$el.val(v);
  };

  FilterElement.prototype.valueOf = function() {
    var o;
    o = {};
    o[this.getName()] = this.getValue();
    return o;
  };

  FilterElement.prototype.init = function() {
    if (this.getName() == null) {
      throw "element " + (this.$el.get()) + " missing required `name` attribute. please add one.";
    }
    return this.$el.on('change', ((function(_this) {
      return function() {
        return _this.trigger('change', _this.valueOf());
      };
    })(this)));
  };

  return FilterElement;

})(ApiHeroUI.core.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.search.Filter = (function(superClass) {
  extend(Filter, superClass);

  function Filter() {
    return Filter.__super__.constructor.apply(this, arguments);
  }

  Filter.prototype.defaults = {};

  Filter.prototype.options = {
    autoUpdate: true
  };

  Filter.prototype.paginationLinkId = 'page';

  Filter.prototype.changeHandler = function() {
    var diffs;
    if ((diffs = ApiHeroUI.utils.getDiffs(this.attributes, this.defaults)).length > 1) {
      _.each(diffs, (function(_this) {
        return function(v, k) {
          if ((v != null) && v[0] === _this.paginationLinkId) {
            return diffs.splice(k, 1);
          }
        };
      })(this));
    }
    return this.submit(diffs);
  };

  Filter.prototype.submit = function(query) {
    return ApiHeroUI.ViewHistory.navigate("" + (ApiHeroUI.utils.querify(query)));
  };

  Filter.prototype.addElement = function(el, opts) {
    var fFunc;
    _.extend(this.attributes, el.valueOf());
    fFunc = (function(_this) {
      return function(data) {
        return _this.set(data);
      };
    })(this);
    el.on('change', fFunc, this);
    el.stopFiltering = (function(_this) {
      return function() {
        return el.off('change', fFunc);
      };
    })(this);
    return this;
  };

  Filter.prototype.removeElement = function(el, opts) {
    el.stopFiltering();
    delete el.stopFiltering;
    return this;
  };

  Filter.prototype.initialize = function(o) {
    if (o == null) {
      o = {};
    }
    _.extend(this.options, o);
    _.extend(this.attributes, ApiHeroUI.utils.queryToObject(window.location.search));
    if (this.options.autoUpdate) {
      return this.on('change', this.changeHandler, this);
    }
  };

  return Filter;

})(Backbone.Model);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.search.GeoFilter = (function(superClass) {
  extend(GeoFilter, superClass);

  function GeoFilter() {
    return GeoFilter.__super__.constructor.apply(this, arguments);
  }

  GeoFilter.prototype.getBounds = function() {
    var createMarker, llNE, llSW;
    createMarker = function(llSW, llNE) {
      var lat, lng;
      lat = ApiHeroUI.utils.decodeLatLng(llSW);
      lng = ApiHeroUI.utils.decodeLatLng(llNE);
      return new google.maps.LatLngBounds(lat, lng);
    };
    if (((llNE = this.attributes.latLngNe) != null) && ((llSW = this.attributes.latLngSw) != null)) {
      return createMarker(llSW, llNE);
    } else {
      return null;
    }
  };

  GeoFilter.prototype.changeHandler = function() {
    var bounds;
    if ((bounds = this.getBounds()) != null) {
      this.attributes.near = null;
      this.attributes.search_radius = MapView.getBoundsRad(bounds);
      return GeoFilter.__super__.changeHandler.apply(this, arguments);
    }
  };

  GeoFilter.prototype.initialize = function(o) {
    if (o == null) {
      o = {};
    }
    GeoFilter.__super__.initialize.call(this, o);
    return this.on('change', this.changeHandler, this);
  };

  return GeoFilter;

})(ApiHeroUI.search.Filter);ApiHeroUI.on('apihero-init-complete', function() {
  global[ApiHeroUI.ns].HistoryItem = global[ApiHeroUI.ns].Object.extend({
    className: 'search',
    ns: ApiHeroUI.ns,
    defaults: {
      search: "",
      unique: true,
      uuid: "",
      o_uuid: null
    }
  });
  return ApiHeroUI.search.History.prototype.model = global[ApiHeroUI.ns].HistoryItem;
});var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.search.History = (function(superClass) {
  extend(History, superClass);

  function History() {
    return History.__super__.constructor.apply(this, arguments);
  }

  History.prototype.model = null;

  History.prototype.currentParams = window.location.search;

  History.prototype.route = "/search";

  History.prototype.currentIndex = -1;

  History.prototype.__popCount = -1;

  History.prototype.getLocation = function() {
    return window.location.search.replace('?', '');
  };

  History.prototype.getParams = function(search) {
    return decodeURIComponent(ApiHeroUI.utils.querify(_.pairs(search)));
  };

  History.prototype.uuidExists = function(params) {
    var len, u;
    if ((len = (u = this.where({
      search: params
    })).length)) {
      return u[0].get('uuid');
    } else {
      return null;
    }
  };

  History.prototype.getUUIDAt = function(idx) {
    var itm;
    if ((itm = this.at(idx)) != null) {
      return itm.get('uuid');
    } else {
      return null;
    }
  };

  History.prototype.navigate = function(search) {
    var original_uuid, searchHistoryId;
    search = ApiHeroUI.utils.queryToObject(search);
    search['s_id'] = searchHistoryId = ApiHeroUI.utils.mkGUID();
    window.history.pushState(null, null, (this.route + "?" + (this.currentParams = this.getParams(search))).replace('?&', '?'));
    original_uuid = this.uuidExists(this.currentParams);
    return this.add(new this.model({
      search: this.currentParams,
      uuid: searchHistoryId,
      unique: original_uuid === null,
      o_uuid: original_uuid
    }));
  };

  History.prototype.add = function(models, opts) {
    if (((this.models.length - 1) - this.currentIndex) > 0) {
      this.remove(this.slice(this.currentIndex, this.models.length - 1));
    }
    if (!_.isArray(models)) {
      models = [models];
    }
    return History.__super__.add.call(this, models, opts || {});
  };

  History.prototype.getSearchIndex = function(search) {
    return (this.pluck('search')).lastIndexOf(search.replace('?', ''));
  };

  History.prototype.initialize = function(o) {
    var m, search_d;
    if (o == null) {
      o = {};
    }
    if (o.hasOwnProperty('route')) {
      this.route = o.route;
    }
    this.on('add', (function(_this) {
      return function(models, object, options) {
        _this.currentIndex = _this.models.length - 1;
        if (!_.isArray(models)) {
          models = [models];
        }
        return _.each(models, function(v, k) {
          if (v.get('unique')) {
            return _this.trigger('navigate', v);
          }
        });
      };
    })(this));
    this.on('remove', (function(_this) {
      return function() {
        return _this.currentIndex = _this.models.length - 1;
      };
    })(this));
    $(window).on('popstate', (function(_this) {
      return function(evt) {
        var idx, p;
        if (((_this.__popCount = _this.__popCount + 1) + _this.currentIndex) === 0) {
          return;
        }
        if ((idx = _this.getSearchIndex(_this.currentParams = _this.getLocation())) >= 0) {
          _this.currentIndex = idx;
        } else {
          p = ApiHeroUI.utils.queryToObject(_this.currentParams);
          _this.unshift(new _this.model({
            search: _this.currentParams,
            uuid: p.s_id || null,
            unique: true,
            o_uuid: null
          }));
          _this.currentIndex = _this.getSearchIndex(_this.currentParams);
        }
        return _this.trigger('popstate', _this.at(_this.currentIndex));
      };
    })(this));
    search_d = (m = window.location.search.match(/s_id=([a-z0-9\-]{12})/)) ? m[1] : ApiHeroUI.utils.mkGUID();
    ApiHeroUI.on('apihero-init-complete', (function(_this) {
      return function() {
        return _this.models.push(new _this.model({
          search: (_this.currentParams = _this.getLocation().split('&s_id').shift()),
          uuid: search_d
        }));
      };
    })(this));
    return this.currentIndex = 0;
  };

  return History;

})(Backbone.Collection);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.search.View = (function(superClass) {
  extend(View, superClass);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.events = {
    "click .search-submit": "submit"
  };

  View.prototype.subviews = {
    '.search-filter': ApiHeroUI.search.FilterElement,
    'ul.search-results': ApiHeroUI.controls.List
  };

  View.prototype.childrenComplete = function() {
    _.each(this['.search-filter'], (function(_this) {
      return function(filter) {
        return _this.collection.filter.addElement(filter);
      };
    })(this));
    if (this['ul.search-results'] == null) {
      throw "element ul.search-results was not a child of search view";
    }
    return this['ul.search-results'].setCollection(this.collection);
  };

  View.prototype.submit = function(evt) {
    return false;
  };

  View.prototype.init = function() {
    var $s, submitter;
    if (ApiHeroUI.ViewHistory == null) {
      ApiHeroUI.ViewHistory = new ApiHeroUI.search.History;
    }
    if (this.collection == null) {
      this.collection = new ApiHeroUI.search.Collection;
    }
    if ((submitter = this.$el.attr('data-search-submitter')) != null) {
      switch (($s = $(submitter)).prop('tagName')) {
        case 'BUTTON':
          return $s.on('click', this.submit, this);
        case 'A':
          return $s.on('click', this.submit, this);
        case 'INPUT':
          if ($s.attr('type') === 'text') {
            this.collection.filter.addElement(new ApiHeroUI.search.FilterElement({
              el: $s
            }));
            return $s.closest('form').submit((function(_this) {
              return function(evt) {
                return _this.submit(evt);
              };
            })(this));
          }
          return $s.on('change', ((function(_this) {
            return function(evt) {
              return _this.submit();
            };
          })(this)));
      }
    }
  };

  return View;

})(ApiHeroUI.core.View);
/*
(=) require ./index
(=) require_tree ./interactions
(=) require_tree ./core
(=) require_tree ./controls
(=) require_tree ./plugins
(=) require_tree ./components
(=) require_tree ./models
(=) require_tree ./search
 */
;
