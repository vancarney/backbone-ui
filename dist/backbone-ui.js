// Generated by CoffeeScript 1.7.1
(function() {
  var Backbone, global, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  global = typeof exports !== "undefined" && exports !== null ? exports : window;

  _ = (typeof exports !== 'undefined' ? require('underscore') : global)._;

  Backbone = typeof exports !== 'undefined' ? require('backbone') : global.Backbone;

  (function($) {
    Backbone.controls = {};
    Backbone.interactions = {};
    Backbone.CompositeView = (function(_super) {
      __extends(CompositeView, _super);

      function CompositeView() {
        return CompositeView.__super__.constructor.apply(this, arguments);
      }

      CompositeView.prototype.collection = null;

      CompositeView.prototype.__children = [];

      CompositeView.prototype.__parent = null;

      CompositeView.prototype.subviews = {};

      CompositeView.prototype.createChildren = function() {
        if (typeof this.subviews !== 'undefined' && (this.subviews != null) && _.isObject(this.subviews)) {
          _.each(this.subviews, ((function(_this) {
            return function(view, selector) {
              if (typeof view === 'undefined') {
                return;
              }
              return _.each(_this.$el.find(selector), function(v, k) {
                return _this.__children.push((_this[selector] = new view({
                  el: v,
                  __parent: _this
                })));
              });
            };
          })(this)));
          this.delegateEvents();
        }
        this.childrenComplete();
        return this.render();
      };

      CompositeView.prototype.getElement = function() {
        return this.$el;
      };

      CompositeView.prototype.setElement = function(el) {
        if (el) {
          this.$el = $(this.el = el);
        }
        this.delegateEvents();
        return this;
      };

      CompositeView.prototype.setCollection = function(c) {
        if (this.__collection) {
          this.__collection.off("change reset add remove");
        }
        (this.__collection = c).on("change reset add remove", this.render, this);
        return this;
      };

      CompositeView.prototype.getCollection = function() {
        return this.__collection;
      };

      CompositeView.prototype.getChildren = function() {
        return this.__children;
      };

      CompositeView.prototype.getChild = function(sel) {
        if (typeof clazz !== 'function') {
          throw 'clazz must be type <Function>';
        }
        return this.__children[sel] || null;
      };

      CompositeView.prototype.addChild = function(sel, clazz, opts) {
        if (typeof clazz !== 'function') {
          throw 'clazz must be type <Function>';
        }
        (this.subviews != null ? this.subviews : this.subviews = {})[sel] = clazz;
        if (!(((opts != null ? opts.create : void 0) != null) && opts.create === false)) {
          this.createChildren();
        }
        return this;
      };

      CompositeView.prototype.removeChild = function(sel, opts) {
        if (!sel) {
          return;
        }
        if (typeof sel === 'string') {
          if (this.__children[sel] != null) {
            this.__children[sel].remove();
            delete this.__children[sel];
          }
        } else {
          throw 'param sel must be CSS Selector String';
        }
        return this;
      };

      CompositeView.prototype.replaceChild = function(sel, clazz) {
        if (!((sel != null) && typeof sel === 'string')) {
          throw 'param sel must be CSS Selector String';
        }
        if (typeof sel === 'string' && clazz instanceof Backbone.View) {
          this.__children[sel] = clazz;
        }
        return this;
      };

      CompositeView.prototype.removeAllChildren = function() {
        var sel, _i, _len, _ref;
        _ref = _.keys(this.__children);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sel = _ref[_i];
          this.$(sel).remove();
          delete this[sel];
          delete this.__children[sel];
        }
        return this;
      };

      CompositeView.prototype.childrenComplete = function() {
        return this;
      };

      CompositeView.prototype.initialize = function(o) {
        if ((o != null) && o.el) {
          this.setElement(o.el);
        }
        if ((o != null) && o.collection) {
          this.setCollection(o.collection);
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
        return this.createChildren();
      };

      return CompositeView;

    })(Backbone.View);
    
	$.fn.draggable = function(opt) {
	  var $el;
	  opt = $.extend({
	    handle: null,
	    cursor: "move"
	  }, opt);
	  $el = opt.handle != null ? this : this.find(opt.handle);
	  return $el.css('cursor', opt.cursor).on("mousedown", function(evt) {
	    var $drag, drg_h, drg_w, pos_x, pos_y, z_idx;
	    $drag = opt.handle != null ? $(this).addClass('draggable') : $(this).addClass('active-handle').parent().addClass('draggable');
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
	          return $(_this).removeClass('draggable');
	        } else {
	          return $(_this).removeClass('active-handle').parent().removeClass('draggable');
	        }
	      };
	    })(this));
	  });
	};
	
	Backbone.controls.Checkbox = (function(_super) {
	  __extends(Checkbox, _super);
	
	  function Checkbox() {
	    return Checkbox.__super__.constructor.apply(this, arguments);
	  }
	
	  Checkbox.prototype.__opts = {
	    classes: '',
	    label: '',
	    id: '',
	    name: '',
	    checked: false
	  };
	
	  Checkbox.prototype.val = function(val) {
	    if (val != null) {
	      this.$el.find('input').val(val);
	      return this;
	    } else {
	      return this.$el.find('input').val();
	    }
	  };
	
	  Checkbox.prototype.render = function() {
	    this.$el.html(this.template(this.__opts));
	    this.delegateEvents();
	    return this;
	  };
	
	  Checkbox.prototype.initialize = function(opts) {
	    var clazz, _t;
	    if (opts == null) {
	      opts = {};
	    }
	    _.extend(this.__opts, opts.params);
	    if (opts.el) {
	      this.$el = $(this.el = opts.el);
	    }
	    if (((clazz = global[Fun.getConstructorName(this)] || Backbone.controls.Checkbox) != null) && typeof (_t = clazz.__template__) === 'string') {
	      this.template = _.template(_t);
	    }
	    return this.render();
	  };
	
	  return Checkbox;
	
	})(Backbone.View);
	
	Backbone.controls.Checkbox.__template__ = "<span class=\"checkbox-container\">\n  <label for=\"{{id || ''}}\">{{label}}</label>\n  <input type=\"checkbox\" name=\"{{name}}\" id=\"{{id || ''}}\" checked=\"{{ checked ? 'checked' : false}}\"/>\n  <div class=\"checkbox-symbol {{classes || ''}}\"></div>\n</span>";
	
	Backbone.controls.Panel = (function(_super) {
	  __extends(Panel, _super);
	
	  function Panel() {
	    return Panel.__super__.constructor.apply(this, arguments);
	  }
	
	  Panel.prototype.model = new (Backbone.Model.extend({
	    defaults: {
	      title: 'Panel',
	      collapsable: false,
	      minified: false
	    }
	  }));
	
	  Panel.prototype.events = {
	    'click .panel-header .help': function() {},
	    'click .panel-header .close': function() {},
	    'click .panel-header .expand': function() {},
	    'click .panel-header .collapse': function() {}
	  };
	
	  Panel.prototype.getCollection = function() {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.getCollection() : void 0;
	  };
	
	  Panel.prototype.setCollection = function(c) {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.setCollection(c) : void 0;
	  };
	
	  Panel.prototype.getChildren = function() {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.getChildren() : void 0;
	  };
	
	  Panel.prototype.addChild = function(sel, clazz, opts) {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.addChild(sel, clazz, opts) : void 0;
	  };
	
	  Panel.prototype.removeChild = function(sel, opts) {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.removeChild(sel, opts) : void 0;
	  };
	
	  Panel.prototype.replaceChild = function(sel, clazz) {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.replaceChild(sel, clazz) : void 0;
	  };
	
	  Panel.prototype.removeAllChildren = function() {
	    var _ref;
	    return (_ref = this['.panel-content']) != null ? _ref.removeAllChildren() : void 0;
	  };
	
	  Panel.prototype.createChildren = function() {
	    var _ref, _ref1, _t, _tpl;
	    if (typeof (_t = ((_ref = Fun.getConstructorName(this)) != null ? _ref.__template__ : void 0) || Backbone.controls.Panel.__template__) === 'string') {
	      _tpl = _.template(_t);
	    }
	    if (_tpl) {
	      this.$el.html(_tpl(((_ref1 = this.model) != null ? _ref1.attributes : void 0) != null ? this.model.attributes : {}));
	    }
	    if ((this.__content != null) && typeof this.__content === 'string') {
	      this.$el.find('.panel-content').html(this.__content);
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
	    this.__content = this.$el.children().html();
	    this.$el.children().remove();
	    return Panel.__super__.initialize.call(this, o);
	  };
	
	  return Panel;
	
	})(Backbone.CompositeView);
	
	Backbone.controls.Panel.__template__ = "<div class=\"bbui-panel-container<%= minified ? ' minified' : ''%>\">\n  <div class=\"panel-header\">\n    <div class=\"panel-title-container\">\n      <h1 class=\"panel-title\"><%=title%></h1>\n    </div> \n  </div>\n  <div class=\"panel-content\">\n  </div>\n</div>";
	
	Backbone.controls.Slider = (function(_super) {
	  __extends(Slider, _super);
	
	  function Slider() {
	    return Slider.__super__.constructor.apply(this, arguments);
	  }
	
	  Slider.prototype.model = new (Backbone.Model.extend({
	    defaults: {
	      minValue: 0,
	      maxValue: 100,
	      value: 50,
	      label: '',
	      classes: ''
	    },
	    valueOf: function() {
	      return this.attributes.value || 0;
	    }
	  }));
	
	  Slider.prototype.events = {
	    'slide .bbui-slider-element': function() {
	      return console.log('slide');
	    }
	  };
	
	  Slider.prototype.minValue = function(v) {
	    if ((v != null) && typeof v === 'Number') {
	      this.model.set({
	        minValue: v
	      });
	      return this;
	    }
	    return this.attributes.minValue;
	  };
	
	  Slider.prototype.maxValue = function(v) {
	    if ((v != null) && typeof v === 'Number') {
	      this.model.set({
	        maxValue: v
	      });
	      return this;
	    }
	    return this.attributes.maxValue;
	  };
	
	  Slider.prototype.value = function(v) {
	    if ((v != null) && typeof v === 'Number') {
	      this.model.set({
	        value: v
	      });
	      return this;
	    }
	    return this.attributes.value;
	  };
	
	  Slider.prototype.render = function() {
	    var _ref, _ref1, _ref2;
	    Slider.__super__.render.call(this);
	    if (this.template != null) {
	      this.$el.html(this.template(this.model.attributes));
	    }
	    console.log(this.$('.bbui-slider-element'));
	    return this.$('.bbui-slider-element').noUiSlider({
	      start: ((_ref = this.model.attributes) != null ? _ref.value : void 0) || 0,
	      range: {
	        min: ((_ref1 = this.model.attributes) != null ? _ref1.minValue : void 0) || 0,
	        max: ((_ref2 = this.model.attributes) != null ? _ref2.maxValue : void 0) || 100
	      }
	    });
	  };
	
	  Slider.prototype.initialize = function(o) {
	    var clazz, _t;
	    _.extend(this.model.attributes, o);
	    if (((clazz = Backbone.controls.Slider) != null) && typeof (_t = clazz.__template__) === 'string') {
	      this.template = _.template(_t);
	    }
	    return Slider.__super__.initialize.call(this, o);
	  };
	
	  return Slider;
	
	})(Backbone.CompositeView);
	
	Backbone.controls.Slider.__template__ = "<div class=\"bbui-slider <%=classes || ''%>\">\n  <span class=\"label\"><%=label%></span>\n  <div class=\"bbui-slider-element\"></div>\n</div>";
	
    return true;
  })(jQuery);

}).call(this);
