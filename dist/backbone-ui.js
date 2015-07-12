var ApiHeroUI, Backbone, _, global;

global = typeof exports !== "undefined" && exports !== null ? exports : window;

_ = (typeof exports !== 'undefined' ? require('underscore') : global)._;

Backbone = typeof exports !== 'undefined' ? require('backbone') : global.Backbone;

ApiHeroUI = {
  core: {},
  controls: {},
  interactions: {},
  utils: {},
  routes: {}
};$.fn.draggable = function(opt) {
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
            return _this.__children.push(_this[selector] = new clazz(_.extend(params, {
              el: v,
              __parent: _this
            })));
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

  View.prototype.setCollection = function(c) {
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
    var ref, ref1;
    if ((ref = this.model) != null) {
      ref.on("change reset", this.render, this);
    }
    if ((ref1 = this.collection) != null) {
      ref1.on("change reset add remove", this.render, this);
    }
    if ((o != null) && o.__parent) {
      this.__parent = o.__parent;
    }
    if (typeof this.init === 'function') {
      if (o != null) {
        this.init(o);
      } else {
        this.init();
      }
    }
    return this.render();
  };

  return View;

})(Backbone.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
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

ApiHeroUI.controls.Panel.__template__ = "<div class=\"bbui-panel-container<%= minified ? ' minified' : ''%>\">\n  <div class=\"panel-header\">\n    <div class=\"panel-title-container\">\n      <h1 class=\"panel-title\"><%=title%></h1>\n    </div> \n  </div>\n  <div class=\"panel-content\">\n  </div>\n</div>";var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
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
});
/*
(=) require ./index
(=) require_tree ./interactions
(=) require_tree ./core
(=) require_tree ./controls
(=) require_tree ./plugins
 */
;
