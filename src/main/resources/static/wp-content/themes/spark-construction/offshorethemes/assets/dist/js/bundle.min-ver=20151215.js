if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
    "use strict";
    var e = jQuery.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(), function (t) {
    "use strict";
    t.fn.emulateTransitionEnd = function (e) {
        var i = !1, n = this;
        t(this).one("bsTransitionEnd", function () {
            i = !0
        });
        return setTimeout(function () {
            i || t(n).trigger(t.support.transition.end)
        }, e), this
    }, t(function () {
        t.support.transition = function () {
            var t = document.createElement("bootstrap"), e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var i in e) if (void 0 !== t.style[i]) return {end: e[i]};
            return !1
        }(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), function (t) {
    "use strict";
    var e = '[data-dismiss="alert"]', i = function (i) {
        t(i).on("click", e, this.close)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.close = function (e) {
        function n() {
            r.detach().trigger("closed.bs.alert").remove()
        }

        var s = t(this), o = s.attr("data-target");
        o || (o = s.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var r = t("#" === o ? [] : o);
        e && e.preventDefault(), r.length || (r = s.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    };
    var n = t.fn.alert;
    t.fn.alert = function (e) {
        return this.each(function () {
            var n = t(this), s = n.data("bs.alert");
            s || n.data("bs.alert", s = new i(this)), "string" == typeof e && s[e].call(n)
        })
    }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function () {
        return t.fn.alert = n, this
    }, t(document).on("click.bs.alert.data-api", e, i.prototype.close)
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), s = n.data("bs.button"), o = "object" == typeof e && e;
            s || n.data("bs.button", s = new i(this, o)), "toggle" == e ? s.toggle() : e && s.setState(e)
        })
    }

    var i = function (e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.isLoading = !1
    };
    i.VERSION = "3.3.7", i.DEFAULTS = {loadingText: "loading..."}, i.prototype.setState = function (e) {
        var i = "disabled", n = this.$element, s = n.is("input") ? "val" : "html", o = n.data();
        e += "Text", null == o.resetText && n.data("resetText", n[s]()), setTimeout(t.proxy(function () {
            n[s](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, n.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, n.removeClass(i).removeAttr(i).prop(i, !1))
        }, this), 0)
    }, i.prototype.toggle = function () {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), t && i.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var n = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function () {
        return t.fn.button = n, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
        var n = t(i.target).closest(".btn");
        e.call(n, "toggle"), t(i.target).is('input[type="radio"], input[type="checkbox"]') || (i.preventDefault(), n.is("input,button") ? n.trigger("focus") : n.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), s = n.data("bs.carousel"),
                o = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e),
                r = "string" == typeof e ? e : o.slide;
            s || n.data("bs.carousel", s = new i(this, o)), "number" == typeof e ? s.to(e) : r ? s[r]() : o.interval && s.pause().cycle()
        })
    }

    var i = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function (t, e) {
        var i = this.getItemIndex(e);
        if (("prev" == t && 0 === i || "next" == t && i == this.$items.length - 1) && !this.options.wrap) return e;
        var n = (i + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(n)
    }, i.prototype.to = function (t) {
        var e = this, i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function () {
        if (!this.sliding) return this.slide("next")
    }, i.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev")
    }, i.prototype.slide = function (e, n) {
        var s = this.$element.find(".item.active"), o = n || this.getItemForDirection(e, s), r = this.interval,
            a = "next" == e ? "left" : "right", l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var h = o[0], p = t.Event("slide.bs.carousel", {relatedTarget: h, direction: a});
        if (this.$element.trigger(p), !p.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var c = t(this.$indicators.children()[this.getItemIndex(o)]);
                c && c.addClass("active")
            }
            var d = t.Event("slid.bs.carousel", {relatedTarget: h, direction: a});
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, s.addClass(a), o.addClass(a), s.one("bsTransitionEnd", function () {
                o.removeClass([e, a].join(" ")).addClass("active"), s.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function () {
                    l.$element.trigger(d)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (s.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(d)), r && this.cycle(), this
        }
    };
    var n = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = n, this
    };
    var s = function (i) {
        var n, s = t(this), o = t(s.attr("data-target") || (n = s.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var r = t.extend({}, o.data(), s.data()), a = s.attr("data-slide-to");
            a && (r.interval = !1), e.call(o, r), a && o.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", s).on("click.bs.carousel.data-api", "[data-slide-to]", s), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        var i, n = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(n)
    }

    function i(e) {
        return this.each(function () {
            var i = t(this), s = i.data("bs.collapse"),
                o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
            !s && o.toggle && /show|hide/.test(e) && (o.toggle = !1), s || i.data("bs.collapse", s = new n(this, o)), "string" == typeof e && s[e]()
        })
    }

    var n = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 350, n.DEFAULTS = {toggle: !0}, n.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    }, n.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, s = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(s && s.length && (e = s.data("bs.collapse")) && e.transitioning)) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    s && s.length && (i.call(s, "hide"), e || s.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return a.call(this);
                    var l = t.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(n.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }, n.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var s = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : s.call(this)
            }
        }
    }, n.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, n.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (i, n) {
            var s = t(n);
            this.addAriaAndCollapsedClass(e(s), s)
        }, this)).end()
    }, n.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var s = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = n, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = s, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (n) {
        var s = t(this);
        s.attr("data-target") || n.preventDefault();
        var o = e(s), r = o.data("bs.collapse") ? "toggle" : s.data();
        i.call(o, r)
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var n = i && t(i);
        return n && n.length ? n : e.parent()
    }

    function i(i) {
        i && 3 === i.which || (t(n).remove(), t(s).each(function () {
            var n = t(this), s = e(n), o = {relatedTarget: this};
            s.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(s[0], i.target) || (s.trigger(i = t.Event("hide.bs.dropdown", o)), i.isDefaultPrevented() || (n.attr("aria-expanded", "false"), s.removeClass("open").trigger(t.Event("hidden.bs.dropdown", o)))))
        }))
    }

    var n = ".dropdown-backdrop", s = '[data-toggle="dropdown"]', o = function (e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    o.VERSION = "3.3.7", o.prototype.toggle = function (n) {
        var s = t(this);
        if (!s.is(".disabled, :disabled")) {
            var o = e(s), r = o.hasClass("open");
            if (i(), !r) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var a = {relatedTarget: this};
                if (o.trigger(n = t.Event("show.bs.dropdown", a)), n.isDefaultPrevented()) return;
                s.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger(t.Event("shown.bs.dropdown", a))
            }
            return !1
        }
    }, o.prototype.keydown = function (i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var n = t(this);
            if (i.preventDefault(), i.stopPropagation(), !n.is(".disabled, :disabled")) {
                var o = e(n), r = o.hasClass("open");
                if (!r && 27 != i.which || r && 27 == i.which) return 27 == i.which && o.find(s).trigger("focus"), n.trigger("click");
                var a = o.find(".dropdown-menu li:not(.disabled):visible a");
                if (a.length) {
                    var l = a.index(i.target);
                    38 == i.which && l > 0 && l--, 40 == i.which && l < a.length - 1 && l++, ~l || (l = 0), a.eq(l).trigger("focus")
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = function (e) {
        return this.each(function () {
            var i = t(this), n = i.data("bs.dropdown");
            n || i.data("bs.dropdown", n = new o(this)), "string" == typeof e && n[e].call(i)
        })
    }, t.fn.dropdown.Constructor = o, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = r, this
    }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", s, o.prototype.toggle).on("keydown.bs.dropdown.data-api", s, o.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", o.prototype.keydown)
}(jQuery), function (t) {
    "use strict";

    function e(e, n) {
        return this.each(function () {
            var s = t(this), o = s.data("bs.modal"), r = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
            o || s.data("bs.modal", o = new i(this, r)), "string" == typeof e ? o[e](n) : r.show && o.show(n)
        })
    }

    var i = function (e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function (e) {
        var n = this, s = t.Event("show.bs.modal", {relatedTarget: e});
        this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            n.$element.one("mouseup.dismiss.bs.modal", function (e) {
                t(e.target).is(n.$element) && (n.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var s = t.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(n.$body), n.$element.show().scrollTop(0), n.adjustDialog(), s && n.$element[0].offsetWidth, n.$element.addClass("in"), n.enforceFocus();
            var o = t.Event("shown.bs.modal", {relatedTarget: e});
            s ? n.$dialog.one("bsTransitionEnd", function () {
                n.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : n.$element.trigger("focus").trigger(o)
        }))
    }, i.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function () {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function (e) {
        var n = this, s = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && s;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + s).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
            }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function () {
                n.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
        } else e && e()
    }, i.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function () {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, i.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var n = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
        return t.fn.modal = n, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
        var n = t(this), s = n.attr("href"), o = t(n.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")),
            r = o.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(s) && s}, o.data(), n.data());
        n.is("a") && i.preventDefault(), o.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function () {
                n.is(":visible") && n.trigger("focus")
            })
        }), e.call(o, r, this)
    })
}(jQuery), function (t) {
    "use strict";
    var e = function (t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    e.VERSION = "3.3.7", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, e.prototype.init = function (e, i, n) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var s = this.options.trigger.split(" "), o = s.length; o--;) {
            var r = s[o];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin", l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, e.prototype.getDefaults = function () {
        return e.DEFAULTS
    }, e.prototype.getOptions = function (e) {
        return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, e.prototype.getDelegateOptions = function () {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function (t, n) {
            i[t] != n && (e[t] = n)
        }), e
    }, e.prototype.enter = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void (i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void (i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, e.prototype.isInStateTrue = function () {
        for (var t in this.inState) if (this.inState[t]) return !0;
        return !1
    }, e.prototype.leave = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), !i.isInStateTrue()) return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void (i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, e.prototype.show = function () {
        var i = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(i);
            var n = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (i.isDefaultPrevented() || !n) return;
            var s = this, o = this.tip(), r = this.getUID(this.type);
            this.setContent(), o.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && o.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i, h = l.test(a);
            h && (a = a.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var p = this.getPosition(), c = o[0].offsetWidth, d = o[0].offsetHeight;
            if (h) {
                var u = a, f = this.getPosition(this.$viewport);
                a = "bottom" == a && p.bottom + d > f.bottom ? "top" : "top" == a && p.top - d < f.top ? "bottom" : "right" == a && p.right + c > f.width ? "left" : "left" == a && p.left - c < f.left ? "right" : a, o.removeClass(u).addClass(a)
            }
            var g = this.getCalculatedOffset(a, p, c, d);
            this.applyPlacement(g, a);
            var m = function () {
                var t = s.hoverState;
                s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == t && s.leave(s)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", m).emulateTransitionEnd(e.TRANSITION_DURATION) : m()
        }
    }, e.prototype.applyPlacement = function (e, i) {
        var n = this.tip(), s = n[0].offsetWidth, o = n[0].offsetHeight, r = parseInt(n.css("margin-top"), 10),
            a = parseInt(n.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top += r, e.left += a, t.offset.setOffset(n[0], t.extend({
            using: function (t) {
                n.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), n.addClass("in");
        var l = n[0].offsetWidth, h = n[0].offsetHeight;
        "top" == i && h != o && (e.top = e.top + o - h);
        var p = this.getViewportAdjustedDelta(i, e, l, h);
        p.left ? e.left += p.left : e.top += p.top;
        var c = /top|bottom/.test(i), d = c ? 2 * p.left - s + l : 2 * p.top - o + h,
            u = c ? "offsetWidth" : "offsetHeight";
        n.offset(e), this.replaceArrow(d, n[0][u], c)
    }, e.prototype.replaceArrow = function (t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, e.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, e.prototype.hide = function (i) {
        function n() {
            "in" != s.hoverState && o.detach(), s.$element && s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type), i && i()
        }

        var s = this, o = t(this.$tip), r = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(r), !r.isDefaultPrevented()) return o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(e.TRANSITION_DURATION) : n(), this.hoverState = null, this
    }, e.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function () {
        return this.getTitle()
    }, e.prototype.getPosition = function (e) {
        var i = (e = e || this.$element)[0], n = "BODY" == i.tagName, s = i.getBoundingClientRect();
        null == s.width && (s = t.extend({}, s, {width: s.right - s.left, height: s.bottom - s.top}));
        var o = window.SVGElement && i instanceof window.SVGElement, r = n ? {top: 0, left: 0} : o ? null : e.offset(),
            a = {scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()},
            l = n ? {width: t(window).width(), height: t(window).height()} : null;
        return t.extend({}, s, a, l, r)
    }, e.prototype.getCalculatedOffset = function (t, e, i, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {top: e.top + e.height / 2 - n / 2, left: e.left - i} : {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    }, e.prototype.getViewportAdjustedDelta = function (t, e, i, n) {
        var s = {top: 0, left: 0};
        if (!this.$viewport) return s;
        var o = this.options.viewport && this.options.viewport.padding || 0, r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - o - r.scroll, l = e.top + o - r.scroll + n;
            a < r.top ? s.top = r.top - a : l > r.top + r.height && (s.top = r.top + r.height - l)
        } else {
            var h = e.left - o, p = e.left + o + i;
            h < r.left ? s.left = r.left - h : p > r.right && (s.left = r.left + r.width - p)
        }
        return s
    }, e.prototype.getTitle = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, e.prototype.getUID = function (t) {
        do {
            t += ~~(1e6 * Math.random())
        } while (document.getElementById(t));
        return t
    }, e.prototype.tip = function () {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, e.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, e.prototype.enable = function () {
        this.enabled = !0
    }, e.prototype.disable = function () {
        this.enabled = !1
    }, e.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, e.prototype.toggle = function (e) {
        var i = this;
        e && ((i = t(e.currentTarget).data("bs." + this.type)) || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, e.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("bs.tooltip"), o = "object" == typeof i && i;
            !s && /destroy|hide/.test(i) || (s || n.data("bs.tooltip", s = new e(this, o)), "string" == typeof i && s[i]())
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = i, this
    }
}(jQuery), function (t) {
    "use strict";
    var e = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    e.VERSION = "3.3.7", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function () {
        return e.DEFAULTS
    }, e.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, e.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, e.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, e.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = t.fn.popover;
    t.fn.popover = function (i) {
        return this.each(function () {
            var n = t(this), s = n.data("bs.popover"), o = "object" == typeof i && i;
            !s && /destroy|hide/.test(i) || (s || n.data("bs.popover", s = new e(this, o)), "string" == typeof i && s[i]())
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function () {
        return t.fn.popover = i, this
    }
}(jQuery), function (t) {
    "use strict";

    function e(i, n) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, n), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function () {
            var n = t(this), s = n.data("bs.scrollspy"), o = "object" == typeof i && i;
            s || n.data("bs.scrollspy", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }

    e.VERSION = "3.3.7", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = this, i = "offset", n = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", n = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var e = t(this), s = e.data("target") || e.attr("href"), o = /^#./.test(s) && t(s);
            return o && o.length && o.is(":visible") && [[o[i]().top + n, s]] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(),
            n = this.options.offset + i - this.$scrollElement.height(), s = this.offsets, o = this.targets,
            r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= n) return r != (t = o[o.length - 1]) && this.activate(t);
        if (r && e < s[0]) return this.activeTarget = null, this.clear();
        for (t = s.length; t--;) r != o[t] && e >= s[t] && (void 0 === s[t + 1] || e < s[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            n = t(i).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var n = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = n, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), s = n.data("bs.tab");
            s || n.data("bs.tab", s = new i(this)), "string" == typeof e && s[e]()
        })
    }

    var i = function (e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), n = e.data("target");
        if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var s = i.find(".active:last a"), o = t.Event("hide.bs.tab", {relatedTarget: e[0]}),
                r = t.Event("show.bs.tab", {relatedTarget: s[0]});
            if (s.trigger(o), e.trigger(r), !r.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var a = t(n);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function () {
                    s.trigger({type: "hidden.bs.tab", relatedTarget: e[0]}), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: s[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function (e, n, s) {
        function o() {
            r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), s && s()
        }

        var r = n.find("> .active"),
            a = s && t.support.transition && (r.length && r.hasClass("fade") || !!n.find("> .fade").length);
        r.length && a ? r.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), r.removeClass("in")
    };
    var n = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
        return t.fn.tab = n, this
    };
    var s = function (i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', s).on("click.bs.tab.data-api", '[data-toggle="pill"]', s)
}(jQuery), function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), s = n.data("bs.affix"), o = "object" == typeof e && e;
            s || n.data("bs.affix", s = new i(this, o)), "string" == typeof e && s[e]()
        })
    }

    var i = function (e, n) {
        this.options = t.extend({}, i.DEFAULTS, n), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.7", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function (t, e, i, n) {
        var s = this.$target.scrollTop(), o = this.$element.offset(), r = this.$target.height();
        if (null != i && "top" == this.affixed) return s < i && "top";
        if ("bottom" == this.affixed) return null != i ? !(s + this.unpin <= o.top) && "bottom" : !(s + r <= t - n) && "bottom";
        var a = null == this.affixed, l = a ? s : o.top;
        return null != i && s <= i ? "top" : null != n && l + (a ? r : e) >= t - n && "bottom"
    }, i.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(), e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), n = this.options.offset, s = n.top, o = n.bottom,
                r = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof n && (o = s = n), "function" == typeof s && (s = n.top(this.$element)), "function" == typeof o && (o = n.bottom(this.$element));
            var a = this.getState(r, e, s, o);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""), h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({top: r - e - o})
        }
    };
    var n = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
        return t.fn.affix = n, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var i = t(this), n = i.data();
            n.offset = n.offset || {}, null != n.offsetBottom && (n.offset.bottom = n.offsetBottom), null != n.offsetTop && (n.offset.top = n.offsetTop), e.call(i, n)
        })
    })
}(jQuery), function (t) {
    "use strict";
    t.fn.counterUp = function (e) {
        var i, n = t.extend({
            time: 400,
            delay: 10,
            offset: 100,
            beginAt: 0,
            formatter: !1,
            context: "window",
            callback: function () {
            }
        }, e);
        return this.each(function () {
            var e = t(this), s = {
                time: t(this).data("counterup-time") || n.time,
                delay: t(this).data("counterup-delay") || n.delay,
                offset: t(this).data("counterup-offset") || n.offset,
                beginAt: t(this).data("counterup-beginat") || n.beginAt,
                context: t(this).data("counterup-context") || n.context
            };
            e.waypoint(function (t) {
                !function () {
                    var t = [], o = s.time / s.delay, r = e.attr("data-num") ? e.attr("data-num") : e.text(),
                        a = /[0-9]+,[0-9]+/.test(r), l = ((r = r.replace(/,/g, "")).split(".")[1] || []).length;
                    s.beginAt > r && (s.beginAt = r);
                    var h = /[0-9]+:[0-9]+:[0-9]+/.test(r);
                    if (h) {
                        var p = r.split(":"), c = 1;
                        for (i = 0; p.length > 0;) i += c * parseInt(p.pop(), 10), c *= 60
                    }
                    for (var d = o; d >= s.beginAt / r * o; d--) {
                        var u = parseFloat(r / o * d).toFixed(l);
                        if (h) {
                            u = parseInt(i / o * d);
                            var f = parseInt(u / 3600) % 24, g = parseInt(u / 60) % 60, m = parseInt(u % 60, 10);
                            u = (f < 10 ? "0" + f : f) + ":" + (g < 10 ? "0" + g : g) + ":" + (m < 10 ? "0" + m : m)
                        }
                        if (a) for (; /(\d+)(\d{3})/.test(u.toString());) u = u.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                        n.formatter && (u = n.formatter.call(this, u)), t.unshift(u)
                    }
                    e.data("counterup-nums", t), e.text(s.beginAt);
                    e.data("counterup-func", function () {
                        e.data("counterup-nums") ? (e.html(e.data("counterup-nums").shift()), e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), s.delay) : (e.data("counterup-nums", null), e.data("counterup-func", null), n.callback.call(this))) : n.callback.call(this)
                    }), setTimeout(e.data("counterup-func"), s.delay)
                }(), this.destroy()
            }, {offset: s.offset + "%", context: s.context})
        })
    }
}(jQuery), function (t) {
    !function (t) {
        function e(n) {
            if (i[n]) return i[n].exports;
            var s = i[n] = {i: n, l: !1, exports: {}};
            return t[n].call(s.exports, s, s.exports, e), s.l = !0, s.exports
        }

        var i = {};
        e.m = t, e.c = i, e.d = function (t, i, n) {
            e.o(t, i) || Object.defineProperty(t, i, {configurable: !1, enumerable: !0, get: n})
        }, e.n = function (t) {
            var i = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(i, "a", i), i
        }, e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "", e(e.s = 4)
    }([function (t, e, i) {
        "use strict";
        i.d(e, "l", function () {
            return s
        }), i.d(e, "b", function () {
            return o
        }), i.d(e, "d", function () {
            return r
        }), i.d(e, "i", function () {
            return a
        }), i.d(e, "h", function () {
            return l
        }), i.d(e, "f", function () {
            return h
        }), i.d(e, "j", function () {
            return p
        }), i.d(e, "g", function () {
            return c
        }), i.d(e, "k", function () {
            return d
        }), i.d(e, "c", function () {
            return u
        }), i.d(e, "e", function () {
            return f
        }), i.d(e, "m", function () {
            return g
        }), i.d(e, "a", function () {
            return m
        });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, s = function (t, e) {
                for (var i = !1, n = 0; n < t.length; n++) t[n] === e && (i = !0);
                return i
            }, o = function (t, e) {
                for (var i = 0; i < t.length; i++) {
                    for (var n = !1, s = t[i], o = 0; o < e.length; o++) s === e[o] && (n = !0);
                    if (!n) return !1
                }
                return !0
            }, r = function (t) {
                var e = {};
                for (var i in t) e[i] = t[i];
                return e
            }, a = function t(e, i) {
                for (var s in e) s in i ? "object" !== n(i[s]) || "object" !== n(e[s]) || Array.isArray(e[s]) || (i[s] = t("object" === n(i[s]) ? i[s] : {}, e[s])) : i[s] = e[s];
                return i
            }, l = function (t, e) {
                return Array.prototype.filter.call(t, function (t) {
                    return ~e.indexOf(t)
                })
            }, h = function (t, e, i) {
                var n = void 0;
                return function () {
                    var s = this, o = arguments;
                    clearTimeout(n), n = setTimeout(function () {
                        n = null, i || t.apply(s, o)
                    }, e), i && !n && t.apply(s, o)
                }
            }, p = function (t) {
                for (var e = t.slice(0), i = []; 0 !== e.length;) {
                    var n = Math.floor(e.length * Math.random());
                    i.push(e[n]), e.splice(n, 1)
                }
                return i
            }, c = function (t, e) {
                if (t.length !== e.length) return !1;
                for (var i = 0; i < t.length; i++) if (t[i].props.index !== e[i].props.index) return !1;
                return !0
            }, d = function (t, e) {
                return t.slice(0).sort(function (t) {
                    return function (e, i) {
                        var n = t(e), s = t(i);
                        return n < s ? -1 : n > s ? 1 : 0
                    }
                }(e))
            }, u = function (t, e, i, s, o) {
                if (void 0 !== e) {
                    var r = new Error('Filterizr: expected type of option "' + t + '" to be "' + i + '", but its type is: "' + (void 0 === e ? "undefined" : n(e)) + '"'),
                        a = !1, l = !1, h = ~i.lastIndexOf("array");
                    if ((void 0 === e ? "undefined" : n(e)).match(i) ? a = !0 : !a && h && (l = Array.isArray(e)), !a && !h) throw r;
                    if (!a && h && !l) throw r;
                    var p = function (t) {
                        return t ? " For further help read here: " + t : ""
                    };
                    if (Array.isArray(s)) {
                        var c = !1;
                        if (s.forEach(function (t) {
                            t === e && (c = !0)
                        }), !c) throw new Error('Filterizr: allowed values for option "' + t + '" are: ' + s.map(function (t) {
                            return '"' + t + '"'
                        }).join(", ") + '. Value received: "' + e + '".' + p(o))
                    } else if (s instanceof RegExp) {
                        if (!e.match(s)) throw new Error('Filterizr: invalid value "' + e + '" for option "' + t + '" received.' + p(o))
                    }
                }
            },
            f = /(^linear$)|(^ease-in-out$)|(^ease-in$)|(^ease-out$)|(^ease$)|(^step-start$)|(^step-end$)|(^steps\(\d\s*,\s*(end|start)\))$|(^cubic-bezier\((\d*\.*\d+)\s*,\s*(\d*\.*\d+)\s*,\s*(\d*\.*\d+)\s*,\s*(\d*\.*\d+)\))$/,
            g = "\n  webkitTransitionEnd.Filterizr \n  otransitionend.Filterizr \n  oTransitionEnd.Filterizr \n  msTransitionEnd.Filterizr \n  transitionend.Filterizr\n",
            m = {IDLE: "IDLE", FILTERING: "FILTERING", SORTING: "SORTING", SHUFFLING: "SHUFFLING"}
    }, function (e, i, n) {
        "use strict";
        var s = n(2), o = n(0), r = function () {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }

            return function (e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(), a = function () {
            function e() {
                var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".filtr-container",
                    n = arguments[1];
                (function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                })(this, e), this.$node = t(i), this.props = {
                    FilterItems: this.getFilterItems(n),
                    w: this.getWidth(),
                    h: 0
                }, this.$node.css({padding: 0, position: "relative"})
            }

            return r(e, [{
                key: "destroy", value: function () {
                    this.$node.attr("style", "").find(".filtr-item").attr("style", ""), this.unbindEvents()
                }
            }, {
                key: "getFilterItems", value: function (e) {
                    return t.map(this.$node.find(".filtr-item"), function (i, n) {
                        return new s.a(t(i), n, e)
                    })
                }
            }, {
                key: "push", value: function (t, e) {
                    var i = this.props.FilterItems;
                    this.$node.append(t);
                    var n = i.length, o = new s.a(t, n, e);
                    this.props.FilterItems.push(o)
                }
            }, {
                key: "calcColumns", value: function () {
                    return Math.round(this.props.w / this.props.FilterItems[0].props.w)
                }
            }, {
                key: "updateFilterItemsTransitionStyle", value: function (t, e, i, n) {
                    this.props.FilterItems.forEach(function (s) {
                        return s.$node.css({transition: "all " + t + "s " + e + " " + s.calcDelay(i, n) + "ms"})
                    })
                }
            }, {
                key: "updateHeight", value: function (t) {
                    this.props.h = t, this.$node.css("height", t)
                }
            }, {
                key: "updateWidth", value: function () {
                    this.props.w = this.getWidth()
                }
            }, {
                key: "updateFilterItemsDimensions", value: function () {
                    this.props.FilterItems.forEach(function (t) {
                        return t.updateDimensions()
                    })
                }
            }, {
                key: "getWidth", value: function () {
                    return this.$node.innerWidth()
                }
            }, {
                key: "bindTransitionEnd", value: function (t, e) {
                    this.$node.on(o.m, Object(o.f)(function () {
                        t()
                    }, e))
                }
            }, {
                key: "bindEvents", value: function (t) {
                    this.$node.on("filteringStart.Filterizr", t.onFilteringStart), this.$node.on("filteringEnd.Filterizr", t.onFilteringEnd), this.$node.on("shufflingStart.Filterizr", t.onShufflingStart), this.$node.on("shufflingEnd.Filterizr", t.onShufflingEnd), this.$node.on("sortingStart.Filterizr", t.onSortingStart), this.$node.on("sortingEnd.Filterizr", t.onSortingEnd)
                }
            }, {
                key: "unbindEvents", value: function () {
                    this.$node.off(o.m + "\n      filteringStart.Filterizr \n      filteringEnd.Filterizr \n      shufflingStart.Filterizr \n      shufflingEnd.Filterizr \n      sortingStart.Filterizr \n      sortingEnd.Filterizr")
                }
            }, {
                key: "trigger", value: function (t) {
                    this.$node.trigger(t)
                }
            }]), e
        }();
        i.a = a
    }, function (t, e, i) {
        "use strict";
        var n = i(0), s = function () {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }

            return function (e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(), o = function () {
            function t(e, i, n) {
                var s = this;
                !function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var o = n.delay, r = n.delayMode, a = n.filterOutCss, l = n.animationDuration, h = n.easing;
                this.$node = e, this.props = {
                    data: function () {
                        var t = s.$node.data();
                        return delete t.category, delete t.sort, t
                    }(),
                    index: i,
                    sortData: this.$node.data("sort"),
                    lastPosition: {left: 0, top: 0},
                    filteredOut: !1,
                    w: this.getWidth(),
                    h: this.getHeight()
                }, this.$node.css(a).css({
                    "-webkit-backface-visibility": "hidden",
                    perspective: "1000px",
                    "-webkit-perspective": "1000px",
                    "-webkit-transform-style": "preserve-3d",
                    position: "absolute",
                    transition: "all " + l + "s " + h + " " + this.calcDelay(o, r) + "ms"
                }), this.bindEvents()
            }

            return s(t, [{
                key: "filterIn", value: function (t, e) {
                    var i = Object(n.d)(e);
                    i.transform += " translate3d(" + t.left + "px," + t.top + "px, 0)", this.$node.css(i), this.props.lastPosition = t, this.props.filteredOut = !1
                }
            }, {
                key: "filterOut", value: function (t) {
                    var e = Object(n.d)(t), i = this.props.lastPosition;
                    e.transform += " translate3d(" + i.left + "px," + i.top + "px, 0)", this.$node.css(e), this.props.filteredOut = !0
                }
            }, {
                key: "calcDelay", value: function (t, e) {
                    var i = 0;
                    return "progressive" === e ? i = t * this.props.index : this.props.index % 2 == 0 && (i = t), i
                }
            }, {
                key: "getContentsLowercase", value: function () {
                    return this.$node.text().toLowerCase()
                }
            }, {
                key: "getCategories", value: function () {
                    return this.$node.attr("data-category").split(/\s*,\s*/g)
                }
            }, {
                key: "getHeight", value: function () {
                    return this.$node.innerHeight()
                }
            }, {
                key: "getWidth", value: function () {
                    return this.$node.innerWidth()
                }
            }, {
                key: "trigger", value: function (t) {
                    this.$node.trigger(t)
                }
            }, {
                key: "updateDimensions", value: function () {
                    this.props.w = this.getWidth(), this.props.h = this.getHeight()
                }
            }, {
                key: "bindEvents", value: function () {
                    var t = this;
                    this.$node.on(n.m, function () {
                        var e = t.props.filteredOut;
                        t.$node.toggleClass("filteredOut", e), t.$node.css("z-index", e ? -1e3 : "")
                    })
                }
            }, {
                key: "unbindEvents", value: function () {
                    this.$node.off(n.m)
                }
            }]), t
        }();
        e.a = o
    }, function (t, e, i) {
        "use strict";
        e.a = {
            animationDuration: .5,
            callbacks: {
                onFilteringStart: function () {
                }, onFilteringEnd: function () {
                }, onShufflingStart: function () {
                }, onShufflingEnd: function () {
                }, onSortingStart: function () {
                }, onSortingEnd: function () {
                }
            },
            controlsSelector: "",
            delay: 0,
            delayMode: "progressive",
            easing: "ease-out",
            filter: "all",
            filterOutCss: {opacity: 0, transform: "scale(0.5)"},
            filterInCss: {opacity: 1, transform: "scale(1)"},
            layout: "sameSize",
            multifilterLogicalOperator: "or",
            setupControls: !0
        }
    }, function (t, e, i) {
        t.exports = i(5)
    }, function (t, e, i) {
        "use strict";

        function n(t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                return i
            }
            return Array.from(t)
        }

        Object.defineProperty(e, "__esModule", {value: !0});
        var s = i(6), o = i(1), r = i(2), a = i(3);
        i.d(e, "Filterizr", function () {
            return s.a
        }), i.d(e, "FilterContainer", function () {
            return o.a
        }), i.d(e, "FilterItem", function () {
            return r.a
        }), i.d(e, "DefaultOptions", function () {
            return a.a
        });
        var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        !function (t) {
            if (!t) throw new Error("Filterizr requires jQuery to work.");
            t.fn.filterizr = function () {
                var e = "." + t.trim(this.get(0).className).replace(/\s+/g, "."), i = arguments;
                if (!this._fltr && 0 === i.length || 1 === i.length && "object" === l(i[0])) {
                    var o = i.length > 0 ? i[0] : a.a;
                    this._fltr = new s.a(e, o)
                } else if (i.length >= 1 && "string" == typeof i[0]) {
                    var r = i[0], h = Array.prototype.slice.call(i, 1), p = this._fltr;
                    switch (r) {
                        case"filter":
                            return p.filter.apply(p, n(h)), this;
                        case"insertItem":
                            return p.insertItem.apply(p, n(h)), this;
                        case"toggleFilter":
                            return p.toggleFilter.apply(p, n(h)), this;
                        case"sort":
                            return p.sort.apply(p, n(h)), this;
                        case"shuffle":
                            return p.shuffle.apply(p, n(h)), this;
                        case"search":
                            return p.search.apply(p, n(h)), this;
                        case"setOptions":
                            return p.setOptions.apply(p, n(h)), this;
                        case"destroy":
                            return p.destroy.apply(p, n(h)), delete this._fltr, this;
                        default:
                            throw new Error("Filterizr: " + r + " is not part of the Filterizr API. Please refer to the docs for more information.")
                    }
                }
                return this
            }
        }(jQuery)
    }, function (e, i, n) {
        "use strict";
        var s = n(7), o = n(1), r = n(8), a = n(3), l = n(0), h = function () {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }

            return function (e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(), p = function () {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ".filtr-container",
                    i = arguments[1];
                (function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                })(this, e), this.options = Object(l.i)(a.a, i);
                var n = new o.a(t, this.options);
                if (!n.$node.length) throw new Error("Filterizr: could not find a container with the selector " + t + ", to initialize Filterizr.");
                new s.a(this, this.options.controlsSelector), this.props = {
                    filterizrState: l.a.IDLE,
                    searchTerm: "",
                    sort: "index",
                    sortOrder: "asc",
                    FilterContainer: n,
                    FilterItems: n.props.FilterItems,
                    FilteredItems: []
                }, this.bindEvents(), this.filter(this.options.filter)
            }

            return h(e, [{
                key: "filter", value: function (t) {
                    var e = this.props, i = e.searchTerm, n = e.FilterContainer, s = e.FilterItems;
                    n.trigger("filteringStart"), this.props.filterizrState = l.a.FILTERING, t = Array.isArray(t) ? t.map(function (t) {
                        return t.toString()
                    }) : t.toString();
                    var o = this.searchFilterItems(this.filterFilterItems(s, t), i);
                    this.props.FilteredItems = o, this.render(o)
                }
            }, {
                key: "destroy", value: function () {
                    var e = this.props.FilterContainer, i = this.options.controlsSelector;
                    e.destroy(), t(window).off("resize.Filterizr"), t(i + " *[data-filter]").off("click.Filterizr"), t(i + " *[data-multifilter]").off("click.Filterizr"), t(i + " *[data-shuffle]").off("click.Filterizr"), t(i + " *[data-search]").off("keyup.Filterizr"), t(i + " *[data-sortAsc]").off("click.Filterizr"), t(i + " *[data-sortDesc]").off("click.Filterizr")
                }
            }, {
                key: "insertItem", value: function (t) {
                    var e = this.props.FilterContainer, i = t.clone().attr("style", "");
                    e.push(i, this.options);
                    var n = this.filterFilterItems(this.props.FilterItems, this.options.filter);
                    this.render(n)
                }
            }, {
                key: "sort", value: function () {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "index",
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "asc", i = this.props,
                        n = i.FilterContainer, s = i.FilterItems;
                    n.trigger("sortingStart"), this.props.filterizrState = l.a.SORTING, this.props.FilterItems = this.sortFilterItems(s, t, e);
                    var o = this.filterFilterItems(this.props.FilterItems, this.options.filter);
                    this.props.FilteredItems = o, this.render(o)
                }
            }, {
                key: "search", value: function () {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props.searchTerm,
                        e = this.props.FilterItems,
                        i = this.searchFilterItems(this.filterFilterItems(e, this.options.filter), t);
                    this.props.FilteredItems = i, this.render(i)
                }
            }, {
                key: "shuffle", value: function () {
                    var t = this.props, e = t.FilterContainer, i = t.FilteredItems;
                    e.trigger("shufflingStart"), this.props.filterizrState = l.a.SHUFFLING;
                    var n = this.shuffleFilterItems(i);
                    this.props.FilteredItems = n, this.render(n)
                }
            }, {
                key: "setOptions", value: function (t) {
                    Object(l.c)("animationDuration", t.animationDuration, "number"), Object(l.c)("callbacks", t.callbacks, "object"), Object(l.c)("controlsSelector", t.controlsSelector, "string"), Object(l.c)("delay", t.delay, "number"), Object(l.c)("easing", t.easing, "string", l.e, "https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp"), Object(l.c)("delayMode", t.delayMode, "string", ["progressive", "alternate"]), Object(l.c)("filter", t.filter, "string|number|array"), Object(l.c)("filterOutCss", t.filterOutCss, "object"), Object(l.c)("filterInCss", t.filterOutCss, "object"), Object(l.c)("layout", t.layout, "string", ["sameSize", "vertical", "horizontal", "sameHeight", "sameWidth", "packed"]), Object(l.c)("multifilterLogicalOperator", t.multifilterLogicalOperator, "string", ["and", "or"]), Object(l.c)("setupControls", t.setupControls, "boolean"), this.options = Object(l.i)(this.options, t), (t.animationDuration || t.delay || t.delayMode || t.easing) && this.props.FilterContainer.updateFilterItemsTransitionStyle(t.animationDuration, t.easing, t.delay, t.delayMode), (t.callbacks || t.animationDuration) && this.rebindFilterContainerEvents(), t.filter && this.filter(t.filter), t.multifilterLogicalOperator && this.filter(this.options.filter)
                }
            }, {
                key: "toggleFilter", value: function (t) {
                    var e = this.options.filter;
                    "all" === e ? e = t : Array.isArray(e) ? Object(l.l)(e, t) ? 1 === (e = e.filter(function (e) {
                        return e !== t
                    })).length && (e = e[0]) : e.push(t) : e = e === t ? "all" : [e, t], this.setOptions({filter: e}), this.filter(this.options.filter)
                }
            }, {
                key: "filterFilterItems", value: function (t, e) {
                    var i = this.options.multifilterLogicalOperator;
                    return "all" === e ? t : t.filter(function (t) {
                        var n = t.getCategories();
                        return Array.isArray(e) ? "or" === i ? Object(l.h)(n, e).length : Object(l.b)(e, n) : Object(l.l)(n, e)
                    })
                }
            }, {
                key: "sortFilterItems", value: function (t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "index",
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "asc",
                        n = Object(l.k)(t, function (t) {
                            return "index" !== e && "sortData" !== e ? t.props.data[e] : t.props[e]
                        });
                    return n = "asc" === i ? n : n.reverse()
                }
            }, {
                key: "searchFilterItems", value: function (t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.props.searchTerm;
                    return e ? t.filter(function (t) {
                        return ~t.getContentsLowercase().lastIndexOf(e)
                    }) : t
                }
            }, {
                key: "shuffleFilterItems", value: function (t) {
                    for (var e = Object(l.j)(t); t.length > 1 && Object(l.g)(t, e);) e = Object(l.j)(t);
                    return e
                }
            }, {
                key: "render", value: function (t) {
                    var e = this, i = this.options.multifilterLogicalOperator;
                    this.props.FilterItems.filter(function (t) {
                        var n = t.getCategories(), s = e.options.filter;
                        return Array.isArray(s) ? "or" === i ? !Object(l.h)(n, s).length : !Object(l.b)(s, n) : !Object(l.l)(n, s)
                    }).forEach(function (t) {
                        t.filterOut(e.options.filterOutCss)
                    });
                    var n = Object(r.a)(this.options.layout, this);
                    t.forEach(function (t, i) {
                        t.filterIn(n[i], e.options.filterInCss)
                    })
                }
            }, {
                key: "onTransitionEndCallback", value: function () {
                    var t = this.props, e = t.filterizrState, i = t.FilterContainer;
                    switch (e) {
                        case l.a.FILTERING:
                            i.trigger("filteringEnd");
                            break;
                        case l.a.SORTING:
                            i.trigger("sortingEnd");
                            break;
                        case l.a.SHUFFLING:
                            i.trigger("shufflingEnd")
                    }
                    this.props.filterizrState = l.a.IDLE
                }
            }, {
                key: "rebindFilterContainerEvents", value: function () {
                    var t = this, e = this.props.FilterContainer, i = this.options, n = i.animationDuration,
                        s = i.callbacks;
                    e.unbindEvents(), e.bindEvents(s), e.bindTransitionEnd(function () {
                        t.onTransitionEndCallback()
                    }, n)
                }
            }, {
                key: "bindEvents", value: function () {
                    var e = this, i = this.props.FilterContainer;
                    this.rebindFilterContainerEvents(), t(window).on("resize.Filterizr", Object(l.f)(function () {
                        i.updateWidth(), i.updateFilterItemsDimensions(), e.filter(e.options.filter)
                    }, 250))
                }
            }]), e
        }();
        i.a = p
    }, function (e, i, n) {
        "use strict";
        var s = n(0), o = function () {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }

            return function (e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(), r = function () {
            function e(t) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                (function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                })(this, e), this.props = {
                    Filterizr: t,
                    selector: i
                }, this.setupFilterControls(), this.setupShuffleControls(), this.setupSearchControls(), this.setupSortControls()
            }

            return o(e, [{
                key: "setupFilterControls", value: function () {
                    var e = this.props, i = e.Filterizr, n = e.selector;
                    t(n + "[data-filter]").on("click.Filterizr", function (e) {
                        var n = t(e.target).attr("data-filter");
                        i.setOptions({filter: n}), i.filter(i.options.filter)
                    }), t(n + "[data-multifilter]").on("click.Filterizr", function (e) {
                        var n = t(e.target).attr("data-multifilter");
                        i.toggleFilter(n)
                    })
                }
            }, {
                key: "setupShuffleControls", value: function () {
                    var e = this.props, i = e.Filterizr, n = e.selector;
                    t(n + "[data-shuffle]").on("click.Filterizr", function () {
                        i.shuffle()
                    })
                }
            }, {
                key: "setupSearchControls", value: function () {
                    var e = this.props, i = e.Filterizr, n = e.selector;
                    t(n + "[data-search]").on("keyup.Filterizr", Object(s.f)(function (e) {
                        var n = t(e.target).val();
                        i.props.searchTerm = n.toLowerCase(), i.search(i.props.searchTerm)
                    }, 250))
                }
            }, {
                key: "setupSortControls", value: function () {
                    var e = this.props, i = e.Filterizr, n = e.selector;
                    t(n + "[data-sortAsc]").on("click.Filterizr", function () {
                        var e = t(n + "[data-sortOrder]").val();
                        i.props.sortOrder = "asc", i.sort(e, "asc")
                    }), t(n + "[data-sortDesc]").on("click.Filterizr", function () {
                        var e = t(n + "[data-sortOrder]").val();
                        i.props.sortOrder = "desc", i.sort(e, "desc")
                    })
                }
            }, {
                key: "destroy", value: function () {
                    var e = this.props.selector;
                    t(e + "[data-filter]").off("click.Filterizr"), t(e + "[data-multifilter]").off("click.Filterizr"), t(e + "[data-shuffle]").off("click.Filterizr"), t(e + "[data-search]").off("keyup.Filterizr"), t(e + "[data-sortAsc]").off("click.Filterizr"), t(e + "[data-sortDesc]").off("click.Filterizr")
                }
            }]), e
        }();
        i.a = r
    }, function (t, e, i) {
        "use strict";
        var n = i(9), s = i(10), o = i(11), r = i(12), a = i(13), l = i(14);
        e.a = function (t, e) {
            switch (t) {
                case"horizontal":
                    return Object(n.a)(e);
                case"vertical":
                    return Object(s.a)(e);
                case"sameHeight":
                    return Object(o.a)(e);
                case"sameWidth":
                    return Object(r.a)(e);
                case"sameSize":
                    return Object(a.a)(e);
                case"packed":
                    return Object(l.a)(e);
                default:
                    return Object(a.a)(e)
            }
        }
    }, function (t, e, i) {
        "use strict";
        e.a = function (t) {
            var e = t.props, i = e.FilterContainer, n = 0, s = 0, o = e.FilterItems.map(function (t) {
                var e = {left: n, top: 0};
                return n += t.props.w, t.props.h > s && (s = t.props.h), e
            });
            return i.updateHeight(s), o
        }
    }, function (t, e, i) {
        "use strict";
        e.a = function (t) {
            var e = t.props, i = e.FilterContainer, n = 0, s = e.FilterItems.map(function (t) {
                var e = {left: 0, top: n};
                return n += t.props.h, e
            });
            return i.updateHeight(n), s
        }
    }, function (t, e, i) {
        "use strict";
        e.a = function (t) {
            var e = t.props, i = e.FilterContainer, n = e.FilterItems, s = i.props.w, o = n[0].props.h, r = 0, a = 0,
                l = n.map(function (t) {
                    var e = t.props.w;
                    a + e > s && (r++, a = 0);
                    var i = {left: a, top: o * r};
                    return a += e, i
                });
            return i.updateHeight((r + 1) * n[0].props.h), l
        }
    }, function (t, e, i) {
        "use strict";
        var n = function (t, e, i) {
            var n = 0;
            if (i < e - 1) return 0;
            for (i -= e; i >= 0;) n += t[i].props.h, i -= e;
            return n
        };
        e.a = function (t) {
            var e = t.props, i = e.FilterContainer, s = e.FilterItems, o = i.calcColumns(), r = 0, a = 0, l = 0,
                h = s.map(function (t, e) {
                    var i = t.props.h;
                    return i > a && (a = i), e % o == 0 && e >= o && (r++, l += a, a = 0), {
                        left: (e - o * r) * t.props.w,
                        top: n(s, o, e)
                    }
                });
            return l += a, i.updateHeight(l), h
        }
    }, function (t, e, i) {
        "use strict";
        e.a = function (t) {
            var e = t.props, i = e.FilterContainer, n = e.FilterItems, s = i.calcColumns(), o = 0,
                r = n.map(function (t, e) {
                    return e % s == 0 && e >= s && o++, {left: (e - s * o) * t.props.w, top: o * t.props.h}
                });
            return i.updateHeight((o + 1) * n[0].props.h), r
        }
    }, function (t, e, i) {
        "use strict";
        var n = function (t) {
            this.init(t)
        };
        n.prototype = {
            init: function (t) {
                this.root = {x: 0, y: 0, w: t}
            }, fit: function (t) {
                var e, i, n, s = t.length, o = s > 0 ? t[0].h : 0;
                for (this.root.h = o, e = 0; e < s; e++) n = t[e], (i = this.findNode(this.root, n.w, n.h)) ? n.fit = this.splitNode(i, n.w, n.h) : n.fit = this.growDown(n.w, n.h)
            }, findNode: function (t, e, i) {
                return t.used ? this.findNode(t.right, e, i) || this.findNode(t.down, e, i) : e <= t.w && i <= t.h ? t : null
            }, splitNode: function (t, e, i) {
                return t.used = !0, t.down = {x: t.x, y: t.y + i, w: t.w, h: t.h - i}, t.right = {
                    x: t.x + e,
                    y: t.y,
                    w: t.w - e,
                    h: i
                }, t
            }, growDown: function (t, e) {
                var i;
                return this.root = {
                    used: !0,
                    x: 0,
                    y: 0,
                    w: this.root.w,
                    h: this.root.h + e,
                    down: {x: 0, y: this.root.h, w: this.root.w, h: e},
                    right: this.root
                }, (i = this.findNode(this.root, t, e)) ? this.splitNode(i, t, e) : null
            }
        }, e.a = function (t) {
            var e = t.props, i = e.FilterContainer, s = e.FilterItems, o = new n(i.props.w), r = s.map(function (t) {
                return {w: t.props.w, h: t.props.h}
            });
            o.fit(r);
            var a = r.map(function (t) {
                var e = t.fit;
                return {left: e.x, top: e.y}
            });
            return i.updateHeight(o.root.h), a
        }
    }])
}(jQuery), function (t) {
    function e() {
        var t = location.href;
        return hashtag = -1 !== t.indexOf("#prettyPhoto") && decodeURI(t.substring(t.indexOf("#prettyPhoto") + 1, t.length)), hashtag && (hashtag = hashtag.replace(/<|>/g, "")), hashtag
    }

    function i(t, e) {
        var i = "[\\?&]" + (t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")) + "=([^&#]*)",
            n = new RegExp(i).exec(e);
        return null == n ? "" : n[1]
    }

    t.prettyPhoto = {version: "3.1.6"}, t.fn.prettyPhoto = function (n) {
        function s() {
            t(".pp_loaderIcon").hide(), projectedTop = scroll_pos.scrollTop + (b / 2 - d.containerHeight / 2), projectedTop < 0 && (projectedTop = 0), $ppt.fadeTo(settings.animation_speed, 1), $pp_pic_holder.find(".pp_content").animate({
                height: d.contentHeight,
                width: d.contentWidth
            }, settings.animation_speed), $pp_pic_holder.animate({
                top: projectedTop,
                left: x / 2 - d.containerWidth / 2 < 0 ? 0 : x / 2 - d.containerWidth / 2,
                width: d.containerWidth
            }, settings.animation_speed, function () {
                $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(d.height).width(d.width), $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed), isSet && "image" == l(pp_images[set_position]) ? $pp_pic_holder.find(".pp_hoverContainer").show() : $pp_pic_holder.find(".pp_hoverContainer").hide(), settings.allow_expand && (d.resized ? t("a.pp_expand,a.pp_contract").show() : t("a.pp_expand").hide()), !settings.autoplay_slideshow || y || u || t.prettyPhoto.startSlideshow(), settings.changepicturecallback(), u = !0
            }), isSet && settings.overlay_gallery && "image" == l(pp_images[set_position]) ? (itemWidth = 57, navWidth = "facebook" == settings.theme || "pp_default" == settings.theme ? 50 : 30, itemsPerPage = Math.floor((d.containerWidth - 100 - navWidth) / itemWidth), itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length, totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1, 0 == totalPage ? (navWidth = 0, $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()) : $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show(), galleryWidth = itemsPerPage * itemWidth, fullGalleryWidth = pp_images.length * itemWidth, $pp_gallery.css("margin-left", -(galleryWidth / 2 + navWidth / 2)).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected"), goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage, t.prettyPhoto.changeGalleryPage(goToPage), $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected")) : $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave"), n.ajaxcallback()
        }

        function o(e) {
            $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden"), $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function () {
                t(".pp_loaderIcon").show(), e()
            })
        }

        function r(t, e) {
            if (resized = !1, a(t, e), imageWidth = t, imageHeight = e, (v > x || m > b) && doresize && settings.allow_resize && !_) {
                for (resized = !0, fitting = !1; !fitting;) v > x ? (imageWidth = x - 200, imageHeight = e / t * imageWidth) : m > b ? (imageHeight = b - 200, imageWidth = t / e * imageHeight) : fitting = !0, m = imageHeight, v = imageWidth;
                (v > x || m > b) && r(v, m), a(imageWidth, imageHeight)
            }
            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(m),
                containerWidth: Math.floor(v) + 2 * settings.horizontal_padding,
                contentHeight: Math.floor(f),
                contentWidth: Math.floor(g),
                resized: resized
            }
        }

        function a(e, i) {
            e = parseFloat(e), i = parseFloat(i), $pp_details = $pp_pic_holder.find(".pp_details"), $pp_details.width(e), detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom")), $pp_details = $pp_details.clone().addClass(settings.theme).width(e).appendTo(t("body")).css({
                position: "absolute",
                top: -1e4
            }), detailsHeight += $pp_details.height(), detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight, $pp_details.remove(), $pp_title = $pp_pic_holder.find(".ppt"), $pp_title.width(e), titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom")), $pp_title = $pp_title.clone().appendTo(t("body")).css({
                position: "absolute",
                top: -1e4
            }), titleHeight += $pp_title.height(), $pp_title.remove(), f = i + detailsHeight, g = e, m = f + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height(), v = e
        }

        function l(t) {
            return t.match(/youtube\.com\/watch/i) || t.match(/youtu\.be/i) ? "youtube" : t.match(/vimeo\.com/i) ? "vimeo" : t.match(/\b.mov\b/i) ? "quicktime" : t.match(/\b.swf\b/i) ? "flash" : t.match(/\biframe=true\b/i) ? "iframe" : t.match(/\bajax=true\b/i) ? "ajax" : t.match(/\bcustom=true\b/i) ? "custom" : "#" == t.substr(0, 1) ? "inline" : "image"
        }

        function h() {
            if (doresize && "undefined" != typeof $pp_pic_holder) {
                if (scroll_pos = p(), contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width(), projectedTop = b / 2 + scroll_pos.scrollTop - contentHeight / 2, projectedTop < 0 && (projectedTop = 0), contentHeight > b) return;
                $pp_pic_holder.css({top: projectedTop, left: x / 2 + scroll_pos.scrollLeft - contentwidth / 2})
            }
        }

        function p() {
            return self.pageYOffset ? {
                scrollTop: self.pageYOffset,
                scrollLeft: self.pageXOffset
            } : document.documentElement && document.documentElement.scrollTop ? {
                scrollTop: document.documentElement.scrollTop,
                scrollLeft: document.documentElement.scrollLeft
            } : document.body ? {scrollTop: document.body.scrollTop, scrollLeft: document.body.scrollLeft} : void 0
        }

        function c(e) {
            if (settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href))), settings.markup = settings.markup.replace("{pp_social}", ""), t("body").append(settings.markup), $pp_pic_holder = t(".pp_pic_holder"), $ppt = t(".ppt"), $pp_overlay = t("div.pp_overlay"), isSet && settings.overlay_gallery) {
                currentGalleryPage = 0, toInject = "";
                for (var i = 0; i < pp_images.length; i++) pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi) ? (classname = "", img_src = pp_images[i]) : (classname = "default", img_src = ""), toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
                toInject = settings.gallery_markup.replace(/{gallery}/g, toInject), $pp_pic_holder.find("#pp_full_res").after(toInject), $pp_gallery = t(".pp_pic_holder .pp_gallery"), $pp_gallery_li = $pp_gallery.find("li"), $pp_gallery.find(".pp_arrow_next").click(function () {
                    return t.prettyPhoto.changeGalleryPage("next"), t.prettyPhoto.stopSlideshow(), !1
                }), $pp_gallery.find(".pp_arrow_previous").click(function () {
                    return t.prettyPhoto.changeGalleryPage("previous"), t.prettyPhoto.stopSlideshow(), !1
                }), $pp_pic_holder.find(".pp_content").hover(function () {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()
                }, function () {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()
                }), itemWidth = 57, $pp_gallery_li.each(function (e) {
                    t(this).find("a").click(function () {
                        return t.prettyPhoto.changePage(e), t.prettyPhoto.stopSlideshow(), !1
                    })
                })
            }
            settings.slideshow && ($pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>'), $pp_pic_holder.find(".pp_nav .pp_play").click(function () {
                return t.prettyPhoto.startSlideshow(), !1
            })), $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme), $pp_overlay.css({
                opacity: 0,
                height: t(document).height(),
                width: t(window).width()
            }).bind("click", function () {
                settings.modal || t.prettyPhoto.close()
            }), t("a.pp_close").bind("click", function () {
                return t.prettyPhoto.close(), !1
            }), settings.allow_expand && t("a.pp_expand").bind("click", function (e) {
                return t(this).hasClass("pp_expand") ? (t(this).removeClass("pp_expand").addClass("pp_contract"), doresize = !1) : (t(this).removeClass("pp_contract").addClass("pp_expand"), doresize = !0), o(function () {
                    t.prettyPhoto.open()
                }), !1
            }), $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function () {
                return t.prettyPhoto.changePage("previous"), t.prettyPhoto.stopSlideshow(), !1
            }), $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function () {
                return t.prettyPhoto.changePage("next"), t.prettyPhoto.stopSlideshow(), !1
            }), h()
        }

        n = jQuery.extend({
            hook: "rel",
            animation_speed: "fast",
            ajaxcallback: function () {
            },
            slideshow: 5e3,
            autoplay_slideshow: !1,
            opacity: .8,
            show_title: !0,
            allow_resize: !0,
            allow_expand: !0,
            default_width: 500,
            default_height: 344,
            counter_separator_label: "/",
            theme: "pp_default",
            horizontal_padding: 20,
            hideflash: !1,
            wmode: "opaque",
            autoplay: !0,
            modal: !1,
            deeplinking: !0,
            overlay_gallery: !0,
            overlay_gallery_max: 30,
            keyboard_shortcuts: !0,
            changepicturecallback: function () {
            },
            callback: function () {
            },
            ie6_fallback: !0,
            markup: '<div class="pp_pic_holder"> \t\t\t\t\t\t<div class="ppt">&nbsp;</div> \t\t\t\t\t\t<div class="pp_top"> \t\t\t\t\t\t\t<div class="pp_left"></div> \t\t\t\t\t\t\t<div class="pp_middle"></div> \t\t\t\t\t\t\t<div class="pp_right"></div> \t\t\t\t\t\t</div> \t\t\t\t\t\t<div class="pp_content_container"> \t\t\t\t\t\t\t<div class="pp_left"> \t\t\t\t\t\t\t<div class="pp_right"> \t\t\t\t\t\t\t\t<div class="pp_content"> \t\t\t\t\t\t\t\t\t<div class="pp_loaderIcon"></div> \t\t\t\t\t\t\t\t\t<div class="pp_fade"> \t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_expand" title="Expand the image">Expand</a> \t\t\t\t\t\t\t\t\t\t<div class="pp_hoverContainer"> \t\t\t\t\t\t\t\t\t\t\t<a class="pp_next" href="#">next</a> \t\t\t\t\t\t\t\t\t\t\t<a class="pp_previous" href="#">previous</a> \t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t<div id="pp_full_res"></div> \t\t\t\t\t\t\t\t\t\t<div class="pp_details"> \t\t\t\t\t\t\t\t\t\t\t<div class="pp_nav"> \t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_previous">Previous</a> \t\t\t\t\t\t\t\t\t\t\t\t<p class="currentTextHolder">0/0</p> \t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_next">Next</a> \t\t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t\t<p class="pp_description"></p> \t\t\t\t\t\t\t\t\t\t\t<div class="pp_social">{pp_social}</div> \t\t\t\t\t\t\t\t\t\t\t<a class="pp_close" href="#">Close</a> \t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t</div> \t\t\t\t\t\t<div class="pp_bottom"> \t\t\t\t\t\t\t<div class="pp_left"></div> \t\t\t\t\t\t\t<div class="pp_middle"></div> \t\t\t\t\t\t\t<div class="pp_right"></div> \t\t\t\t\t\t</div> \t\t\t\t\t</div> \t\t\t\t\t<div class="pp_overlay"></div>',
            gallery_markup: '<div class="pp_gallery"> \t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_previous">Previous</a> \t\t\t\t\t\t\t\t<div> \t\t\t\t\t\t\t\t\t<ul> \t\t\t\t\t\t\t\t\t\t{gallery} \t\t\t\t\t\t\t\t\t</ul> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_next">Next</a> \t\t\t\t\t\t\t</div>',
            image_markup: '<img id="fullResImage" src="{path}" />',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup: '<div class="pp_inline">{content}</div>',
            custom_markup: "",
            social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"><\/script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
        }, n);
        var d, u, f, g, m, v, y, w = this, _ = !1, b = t(window).height(), x = t(window).width();
        return doresize = !0, scroll_pos = p(), t(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function () {
            h(), b = t(window).height(), x = t(window).width(), "undefined" != typeof $pp_overlay && $pp_overlay.height(t(document).height()).width(x)
        }), n.keyboard_shortcuts && t(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function (e) {
            if ("undefined" != typeof $pp_pic_holder && $pp_pic_holder.is(":visible")) switch (e.keyCode) {
                case 37:
                    t.prettyPhoto.changePage("previous"), e.preventDefault();
                    break;
                case 39:
                    t.prettyPhoto.changePage("next"), e.preventDefault();
                    break;
                case 27:
                    settings.modal || t.prettyPhoto.close(), e.preventDefault()
            }
        }), t.prettyPhoto.initialize = function () {
            return settings = n, "pp_default" == settings.theme && (settings.horizontal_padding = 16), theRel = t(this).attr(settings.hook), galleryRegExp = /\[(?:.*)\]/, isSet = !!galleryRegExp.exec(theRel), pp_images = isSet ? jQuery.map(w, function (e, i) {
                if (-1 != t(e).attr(settings.hook).indexOf(theRel)) return t(e).attr("href")
            }) : t.makeArray(t(this).attr("href")), pp_titles = isSet ? jQuery.map(w, function (e, i) {
                if (-1 != t(e).attr(settings.hook).indexOf(theRel)) return t(e).find("img").attr("alt") ? t(e).find("img").attr("alt") : ""
            }) : t.makeArray(t(this).find("img").attr("alt")), pp_descriptions = isSet ? jQuery.map(w, function (e, i) {
                if (-1 != t(e).attr(settings.hook).indexOf(theRel)) return t(e).attr("title") ? t(e).attr("title") : ""
            }) : t.makeArray(t(this).attr("title")), pp_images.length > settings.overlay_gallery_max && (settings.overlay_gallery = !1), set_position = jQuery.inArray(t(this).attr("href"), pp_images), rel_index = isSet ? set_position : t("a[" + settings.hook + "^='" + theRel + "']").index(t(this)), c(), settings.allow_resize && t(window).bind("scroll.prettyphoto", function () {
                h()
            }), t.prettyPhoto.open(), !1
        }, t.prettyPhoto.open = function (e) {
            return "undefined" == typeof settings && (settings = n, pp_images = t.makeArray(arguments[0]), pp_titles = arguments[1] ? t.makeArray(arguments[1]) : t.makeArray(""), pp_descriptions = arguments[2] ? t.makeArray(arguments[2]) : t.makeArray(""), isSet = pp_images.length > 1, set_position = arguments[3] ? arguments[3] : 0, c(e.target)), settings.hideflash && t("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden"), function (e) {
                e > 1 ? t(".pp_nav").show() : t(".pp_nav").hide()
            }(t(pp_images).size()), t(".pp_loaderIcon").show(), settings.deeplinking && "undefined" != typeof theRel && (location.hash = theRel + "/" + rel_index + "/"), settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href)), $pp_pic_holder.find(".pp_social").html(facebook_like_link)), $ppt.is(":hidden") && $ppt.css("opacity", 0).show(), $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity), $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + t(pp_images).size()), void 0 !== pp_descriptions[set_position] && "" != pp_descriptions[set_position] ? $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position])) : $pp_pic_holder.find(".pp_description").hide(), movie_width = parseFloat(i("width", pp_images[set_position])) ? i("width", pp_images[set_position]) : settings.default_width.toString(), movie_height = parseFloat(i("height", pp_images[set_position])) ? i("height", pp_images[set_position]) : settings.default_height.toString(), _ = !1, -1 != movie_height.indexOf("%") && (movie_height = parseFloat(t(window).height() * parseFloat(movie_height) / 100 - 150), _ = !0), -1 != movie_width.indexOf("%") && (movie_width = parseFloat(t(window).width() * parseFloat(movie_width) / 100 - 150), _ = !0), $pp_pic_holder.fadeIn(function () {
                switch (settings.show_title && "" != pp_titles[set_position] && void 0 !== pp_titles[set_position] ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html("&nbsp;"), imgPreloader = "", skipInjection = !1, l(pp_images[set_position])) {
                    case"image":
                        imgPreloader = new Image, nextImage = new Image, isSet && set_position < t(pp_images).size() - 1 && (nextImage.src = pp_images[set_position + 1]), prevImage = new Image, isSet && pp_images[set_position - 1] && (prevImage.src = pp_images[set_position - 1]), $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]), imgPreloader.onload = function () {
                            d = r(imgPreloader.width, imgPreloader.height), s()
                        }, imgPreloader.onerror = function () {
                            alert("Image cannot be loaded. Make sure the path is correct and image exist."), t.prettyPhoto.close()
                        }, imgPreloader.src = pp_images[set_position];
                        break;
                    case"youtube":
                        d = r(movie_width, movie_height), movie_id = i("v", pp_images[set_position]), "" == movie_id && (movie_id = pp_images[set_position].split("youtu.be/"), movie_id = movie_id[1], movie_id.indexOf("?") > 0 && (movie_id = movie_id.substr(0, movie_id.indexOf("?"))), movie_id.indexOf("&") > 0 && (movie_id = movie_id.substr(0, movie_id.indexOf("&")))), movie = "http://www.youtube.com/embed/" + movie_id, i("rel", pp_images[set_position]) ? movie += "?rel=" + i("rel", pp_images[set_position]) : movie += "?rel=1", settings.autoplay && (movie += "&autoplay=1"), toInject = settings.iframe_markup.replace(/{width}/g, d.width).replace(/{height}/g, d.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
                        break;
                    case"vimeo":
                        d = r(movie_width, movie_height), movie_id = pp_images[set_position];
                        var e = movie_id.match(/http(s?):\/\/(www\.)?vimeo.com\/(\d+)/);
                        movie = "http://player.vimeo.com/video/" + e[3] + "?title=0&amp;byline=0&amp;portrait=0", settings.autoplay && (movie += "&autoplay=1;"), vimeo_width = d.width + "/embed/?moog_width=" + d.width, toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, d.height).replace(/{path}/g, movie);
                        break;
                    case"quicktime":
                        (d = r(movie_width, movie_height)).height += 15, d.contentHeight += 15, d.containerHeight += 15, toInject = settings.quicktime_markup.replace(/{width}/g, d.width).replace(/{height}/g, d.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                        break;
                    case"flash":
                        d = r(movie_width, movie_height), flash_vars = pp_images[set_position], flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length), filename = pp_images[set_position], filename = filename.substring(0, filename.indexOf("?")), toInject = settings.flash_markup.replace(/{width}/g, d.width).replace(/{height}/g, d.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
                        break;
                    case"iframe":
                        d = r(movie_width, movie_height), frame_url = pp_images[set_position], frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1), toInject = settings.iframe_markup.replace(/{width}/g, d.width).replace(/{height}/g, d.height).replace(/{path}/g, frame_url);
                        break;
                    case"ajax":
                        doresize = !1, d = r(movie_width, movie_height), doresize = !0, skipInjection = !0, t.get(pp_images[set_position], function (t) {
                            toInject = settings.inline_markup.replace(/{content}/g, t), $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject, s()
                        });
                        break;
                    case"custom":
                        d = r(movie_width, movie_height), toInject = settings.custom_markup;
                        break;
                    case"inline":
                        myClone = t(pp_images[set_position]).clone().append('<br clear="all" />').css({width: settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(t("body")).show(), doresize = !1, d = r(t(myClone).width(), t(myClone).height()), doresize = !0, t(myClone).remove(), toInject = settings.inline_markup.replace(/{content}/g, t(pp_images[set_position]).html())
                }
                imgPreloader || skipInjection || ($pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject, s())
            }), !1
        }, t.prettyPhoto.changePage = function (e) {
            currentGalleryPage = 0, "previous" == e ? (set_position--, set_position < 0 && (set_position = t(pp_images).size() - 1)) : "next" == e ? (set_position++, set_position > t(pp_images).size() - 1 && (set_position = 0)) : set_position = e, rel_index = set_position, doresize || (doresize = !0), settings.allow_expand && t(".pp_contract").removeClass("pp_contract").addClass("pp_expand"), o(function () {
                t.prettyPhoto.open()
            })
        }, t.prettyPhoto.changeGalleryPage = function (t) {
            "next" == t ? (currentGalleryPage++, currentGalleryPage > totalPage && (currentGalleryPage = 0)) : "previous" == t ? (currentGalleryPage--, currentGalleryPage < 0 && (currentGalleryPage = totalPage)) : currentGalleryPage = t, slide_speed = "next" == t || "previous" == t ? settings.animation_speed : 0, slide_to = currentGalleryPage * (itemsPerPage * itemWidth), $pp_gallery.find("ul").animate({left: -slide_to}, slide_speed)
        }, t.prettyPhoto.startSlideshow = function () {
            void 0 === y ? ($pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function () {
                return t.prettyPhoto.stopSlideshow(), !1
            }), y = setInterval(t.prettyPhoto.startSlideshow, settings.slideshow)) : t.prettyPhoto.changePage("next")
        }, t.prettyPhoto.stopSlideshow = function () {
            $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function () {
                return t.prettyPhoto.startSlideshow(), !1
            }), clearInterval(y), y = void 0
        }, t.prettyPhoto.close = function () {
            $pp_overlay.is(":animated") || (t.prettyPhoto.stopSlideshow(), $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden"), t("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function () {
                t(this).remove()
            }), $pp_overlay.fadeOut(settings.animation_speed, function () {
                settings.hideflash && t("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible"), t(this).remove(), t(window).unbind("scroll.prettyphoto"), -1 !== location.href.indexOf("#prettyPhoto") && (location.hash = "prettyPhoto"), settings.callback(), doresize = !0, u = !1, delete settings
            }))
        }, !pp_alreadyInitialized && e() && (pp_alreadyInitialized = !0, hashIndex = e(), hashRel = hashIndex, hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1), hashRel = hashRel.substring(0, hashRel.indexOf("/")), setTimeout(function () {
            t("a[" + n.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click")
        }, 50)), this.unbind("click.prettyphoto").bind("click.prettyphoto", t.prettyPhoto.initialize)
    }
}(jQuery);
var pp_alreadyInitialized = !1;
!function (t, e) {
    "use strict";
    var i = {
        item: 3,
        autoWidth: !1,
        slideMove: 1,
        slideMargin: 10,
        addClass: "",
        mode: "slide",
        useCSS: !0,
        cssEasing: "ease",
        easing: "linear",
        speed: 400,
        auto: !1,
        pauseOnHover: !1,
        loop: !1,
        slideEndAnimation: !0,
        pause: 2e3,
        keyPress: !1,
        controls: !0,
        prevHtml: "",
        nextHtml: "",
        rtl: !1,
        adaptiveHeight: !1,
        vertical: !1,
        verticalHeight: 500,
        vThumbWidth: 100,
        thumbItem: 10,
        pager: !0,
        gallery: !1,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: "middle",
        enableTouch: !0,
        enableDrag: !0,
        freeMove: !0,
        swipeThreshold: 40,
        responsive: [],
        onBeforeStart: function (t) {
        },
        onSliderLoad: function (t) {
        },
        onBeforeSlide: function (t, e) {
        },
        onAfterSlide: function (t, e) {
        },
        onBeforeNextSlide: function (t, e) {
        },
        onBeforePrevSlide: function (t, e) {
        }
    };
    t.fn.lightSlider = function (e) {
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function () {
            t(this).lightSlider(e)
        }), this;
        var n = {}, s = t.extend(!0, {}, i, e), o = {}, r = this;
        n.$el = this, "fade" === s.mode && (s.vertical = !1);
        var a = r.children(), l = t(window).width(), h = null, p = null, c = 0, d = 0, u = !1, f = 0, g = "", m = 0,
            v = !0 === s.vertical ? "height" : "width", y = !0 === s.vertical ? "margin-bottom" : "margin-right", w = 0,
            _ = 0, b = 0, x = 0, C = null, $ = "ontouchstart" in document.documentElement, S = {};
        return S.chbreakpoint = function () {
            if (l = t(window).width(), s.responsive.length) {
                var e;
                if (!1 === s.autoWidth && (e = s.item), l < s.responsive[0].breakpoint) for (var i = 0; i < s.responsive.length; i++) l < s.responsive[i].breakpoint && (h = s.responsive[i].breakpoint, p = s.responsive[i]);
                if (void 0 !== p && null !== p) for (var n in p.settings) p.settings.hasOwnProperty(n) && (void 0 !== o[n] && null !== o[n] || (o[n] = s[n]), s[n] = p.settings[n]);
                if (!t.isEmptyObject(o) && l > s.responsive[0].breakpoint) for (var r in o) o.hasOwnProperty(r) && (s[r] = o[r]);
                !1 === s.autoWidth && w > 0 && b > 0 && e !== s.item && (m = Math.round(w / ((b + s.slideMargin) * s.slideMove)))
            }
        }, S.calSW = function () {
            !1 === s.autoWidth && (b = (f - (s.item * s.slideMargin - s.slideMargin)) / s.item)
        }, S.calWidth = function (t) {
            var e = !0 === t ? g.find(".lslide").length : a.length;
            if (!1 === s.autoWidth) d = e * (b + s.slideMargin); else {
                d = 0;
                for (var i = 0; i < e; i++) d += parseInt(a.eq(i).width()) + s.slideMargin
            }
            return d
        }, (n = {
            doCss: function () {
                return !(!s.useCSS || !function () {
                    for (var t = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"], e = document.documentElement, i = 0; i < t.length; i++) if (t[i] in e.style) return !0
                }())
            }, keyPress: function () {
                s.keyPress && t(document).on("keyup.lightslider", function (e) {
                    t(":focus").is("input, textarea") || (e.preventDefault ? e.preventDefault() : e.returnValue = !1, 37 === e.keyCode ? r.goToPrevSlide() : 39 === e.keyCode && r.goToNextSlide())
                })
            }, controls: function () {
                s.controls && (r.after('<div class="lSAction"><a class="lSPrev">' + s.prevHtml + '</a><a class="lSNext">' + s.nextHtml + "</a></div>"), s.autoWidth ? S.calWidth(!1) < f && g.find(".lSAction").hide() : c <= s.item && g.find(".lSAction").hide(), g.find(".lSAction a").on("click", function (e) {
                    return e.preventDefault ? e.preventDefault() : e.returnValue = !1, "lSPrev" === t(this).attr("class") ? r.goToPrevSlide() : r.goToNextSlide(), !1
                }))
            }, initialStyle: function () {
                var t = this;
                "fade" === s.mode && (s.autoWidth = !1, s.slideEndAnimation = !1), s.auto && (s.slideEndAnimation = !1), s.autoWidth && (s.slideMove = 1, s.item = 1), s.loop && (s.slideMove = 1, s.freeMove = !1), s.onBeforeStart.call(this, r), S.chbreakpoint(), r.addClass("lightSlider").wrap('<div class="lSSlideOuter ' + s.addClass + '"><div class="lSSlideWrapper"></div></div>'), g = r.parent(".lSSlideWrapper"), !0 === s.rtl && g.parent().addClass("lSrtl"), s.vertical ? (g.parent().addClass("vertical"), f = s.verticalHeight, g.css("height", f + "px")) : f = r.outerWidth(), a.addClass("lslide"), !0 === s.loop && "slide" === s.mode && (S.calSW(), S.clone = function () {
                    if (S.calWidth(!0) > f) {
                        for (var e = 0, i = 0, n = 0; n < a.length && (e += parseInt(r.find(".lslide").eq(n).width()) + s.slideMargin, i++, !(e >= f + s.slideMargin)); n++) ;
                        var o = !0 === s.autoWidth ? i : s.item;
                        if (o < r.find(".clone.left").length) for (var l = 0; l < r.find(".clone.left").length - o; l++) a.eq(l).remove();
                        if (o < r.find(".clone.right").length) for (var h = a.length - 1; h > a.length - 1 - r.find(".clone.right").length; h--) m--, a.eq(h).remove();
                        for (var p = r.find(".clone.right").length; p < o; p++) r.find(".lslide").eq(p).clone().removeClass("lslide").addClass("clone right").appendTo(r), m++;
                        for (var c = r.find(".lslide").length - r.find(".clone.left").length; c > r.find(".lslide").length - o; c--) r.find(".lslide").eq(c - 1).clone().removeClass("lslide").addClass("clone left").prependTo(r);
                        a = r.children()
                    } else a.hasClass("clone") && (r.find(".clone").remove(), t.move(r, 0))
                }, S.clone()), S.sSW = function () {
                    c = a.length, !0 === s.rtl && !1 === s.vertical && (y = "margin-left"), !1 === s.autoWidth && a.css(v, b + "px"), a.css(y, s.slideMargin + "px"), d = S.calWidth(!1), r.css(v, d + "px"), !0 === s.loop && "slide" === s.mode && !1 === u && (m = r.find(".clone.left").length)
                }, S.calL = function () {
                    a = r.children(), c = a.length
                }, this.doCss() && g.addClass("usingCss"), S.calL(), "slide" === s.mode ? (S.calSW(), S.sSW(), !0 === s.loop && (w = t.slideValue(), this.move(r, w)), !1 === s.vertical && this.setHeight(r, !1)) : (this.setHeight(r, !0), r.addClass("lSFade"), this.doCss() || (a.fadeOut(0), a.eq(m).fadeIn(0))), !0 === s.loop && "slide" === s.mode ? a.eq(m).addClass("active") : a.first().addClass("active")
            }, pager: function () {
                var t = this;
                if (S.createPager = function () {
                    x = (f - (s.thumbItem * s.thumbMargin - s.thumbMargin)) / s.thumbItem;
                    var e = g.find(".lslide"), i = g.find(".lslide").length, n = 0, o = "", a = 0;
                    for (n = 0; n < i; n++) {
                        "slide" === s.mode && (s.autoWidth ? a += (parseInt(e.eq(n).width()) + s.slideMargin) * s.slideMove : a = n * ((b + s.slideMargin) * s.slideMove));
                        var l = e.eq(n * s.slideMove).attr("data-thumb");
                        if (!0 === s.gallery ? o += '<li style="width:100%;' + v + ":" + x + "px;" + y + ":" + s.thumbMargin + 'px"><a href="#"><img src="' + l + '" /></a></li>' : o += '<li><a href="#">' + (n + 1) + "</a></li>", "slide" === s.mode && a >= d - f - s.slideMargin) {
                            n += 1;
                            var h = 2;
                            s.autoWidth && (o += '<li><a href="#">' + (n + 1) + "</a></li>", h = 1), n < h ? (o = null, g.parent().addClass("noPager")) : g.parent().removeClass("noPager");
                            break
                        }
                    }
                    var p = g.parent();
                    p.find(".lSPager").html(o), !0 === s.gallery && (!0 === s.vertical && p.find(".lSPager").css("width", s.vThumbWidth + "px"), _ = n * (s.thumbMargin + x) + .5, p.find(".lSPager").css({
                        property: _ + "px",
                        "transition-duration": s.speed + "ms"
                    }), !0 === s.vertical && g.parent().css("padding-right", s.vThumbWidth + s.galleryMargin + "px"), p.find(".lSPager").css(v, _ + "px"));
                    var c = p.find(".lSPager").find("li");
                    c.first().addClass("active"), c.on("click", function () {
                        return !0 === s.loop && "slide" === s.mode ? m += c.index(this) - p.find(".lSPager").find("li.active").index() : m = c.index(this), r.mode(!1), !0 === s.gallery && t.slideThumb(), !1
                    })
                }, s.pager) {
                    var e = "lSpg";
                    s.gallery && (e = "lSGallery"), g.after('<ul class="lSPager ' + e + '"></ul>');
                    var i = s.vertical ? "margin-left" : "margin-top";
                    g.parent().find(".lSPager").css(i, s.galleryMargin + "px"), S.createPager()
                }
                setTimeout(function () {
                    S.init()
                }, 0)
            }, setHeight: function (t, e) {
                var i = null, n = this;
                i = s.loop ? t.children(".lslide ").first() : t.children().first();
                var o = function () {
                    var n = i.outerHeight(), s = 0, o = n;
                    e && (n = 0, s = 100 * o / f), t.css({height: n + "px", "padding-bottom": s + "%"})
                };
                o(), i.find("img").length ? i.find("img")[0].complete ? (o(), C || n.auto()) : i.find("img").on("load", function () {
                    setTimeout(function () {
                        o(), C || n.auto()
                    }, 100)
                }) : C || n.auto()
            }, active: function (t, e) {
                this.doCss() && "fade" === s.mode && g.addClass("on");
                var i = 0;
                if (m * s.slideMove < c) {
                    t.removeClass("active"), this.doCss() || "fade" !== s.mode || !1 !== e || t.fadeOut(s.speed), i = !0 === e ? m : m * s.slideMove;
                    var n, o;
                    !0 === e && (o = (n = t.length) - 1, i + 1 >= n && (i = o)), !0 === s.loop && "slide" === s.mode && (i = !0 === e ? m - r.find(".clone.left").length : m * s.slideMove, !0 === e && (o = (n = t.length) - 1, i + 1 === n ? i = o : i + 1 > n && (i = 0))), this.doCss() || "fade" !== s.mode || !1 !== e || t.eq(i).fadeIn(s.speed), t.eq(i).addClass("active")
                } else t.removeClass("active"), t.eq(t.length - 1).addClass("active"), this.doCss() || "fade" !== s.mode || !1 !== e || (t.fadeOut(s.speed), t.eq(i).fadeIn(s.speed))
            }, move: function (t, e) {
                !0 === s.rtl && (e = -e), this.doCss() ? !0 === s.vertical ? t.css({
                    transform: "translate3d(0px, " + -e + "px, 0px)",
                    "-webkit-transform": "translate3d(0px, " + -e + "px, 0px)"
                }) : t.css({
                    transform: "translate3d(" + -e + "px, 0px, 0px)",
                    "-webkit-transform": "translate3d(" + -e + "px, 0px, 0px)"
                }) : !0 === s.vertical ? t.css("position", "relative").animate({top: -e + "px"}, s.speed, s.easing) : t.css("position", "relative").animate({left: -e + "px"}, s.speed, s.easing);
                var i = g.parent().find(".lSPager").find("li");
                this.active(i, !0)
            }, fade: function () {
                this.active(a, !1);
                var t = g.parent().find(".lSPager").find("li");
                this.active(t, !0)
            }, slide: function () {
                var t = this;
                S.calSlide = function () {
                    d > f && (w = t.slideValue(), t.active(a, !1), w > d - f - s.slideMargin ? w = d - f - s.slideMargin : w < 0 && (w = 0), t.move(r, w), !0 === s.loop && "slide" === s.mode && (m >= c - r.find(".clone.left").length / s.slideMove && t.resetSlide(r.find(".clone.left").length), 0 === m && t.resetSlide(g.find(".lslide").length)))
                }, S.calSlide()
            }, resetSlide: function (t) {
                var e = this;
                g.find(".lSAction a").addClass("disabled"), setTimeout(function () {
                    m = t, g.css("transition-duration", "0ms"), w = e.slideValue(), e.active(a, !1), n.move(r, w), setTimeout(function () {
                        g.css("transition-duration", s.speed + "ms"), g.find(".lSAction a").removeClass("disabled")
                    }, 50)
                }, s.speed + 100)
            }, slideValue: function () {
                var t = 0;
                if (!1 === s.autoWidth) t = m * ((b + s.slideMargin) * s.slideMove); else {
                    t = 0;
                    for (var e = 0; e < m; e++) t += parseInt(a.eq(e).width()) + s.slideMargin
                }
                return t
            }, slideThumb: function () {
                var t;
                switch (s.currentPagerPosition) {
                    case"left":
                        t = 0;
                        break;
                    case"middle":
                        t = f / 2 - x / 2;
                        break;
                    case"right":
                        t = f - x
                }
                var e = m - r.find(".clone.left").length, i = g.parent().find(".lSPager");
                "slide" === s.mode && !0 === s.loop && (e >= i.children().length ? e = 0 : e < 0 && (e = i.children().length));
                var n = e * (x + s.thumbMargin) - t;
                n + f > _ && (n = _ - f - s.thumbMargin), n < 0 && (n = 0), this.move(i, n)
            }, auto: function () {
                s.auto && (clearInterval(C), C = setInterval(function () {
                    r.goToNextSlide()
                }, s.pause))
            }, pauseOnHover: function () {
                var e = this;
                s.auto && s.pauseOnHover && (g.on("mouseenter", function () {
                    t(this).addClass("ls-hover"), r.pause(), s.auto = !0
                }), g.on("mouseleave", function () {
                    t(this).removeClass("ls-hover"), g.find(".lightSlider").hasClass("lsGrabbing") || e.auto()
                }))
            }, touchMove: function (t, e) {
                if (g.css("transition-duration", "0ms"), "slide" === s.mode) {
                    var i = w - (t - e);
                    if (i >= d - f - s.slideMargin) if (!1 === s.freeMove) i = d - f - s.slideMargin; else {
                        var n = d - f - s.slideMargin;
                        i = n + (i - n) / 5
                    } else i < 0 && (!1 === s.freeMove ? i = 0 : i /= 5);
                    this.move(r, i)
                }
            }, touchEnd: function (t) {
                if (g.css("transition-duration", s.speed + "ms"), "slide" === s.mode) {
                    var e = !1, i = !0;
                    (w -= t) > d - f - s.slideMargin ? (w = d - f - s.slideMargin, !1 === s.autoWidth && (e = !0)) : w < 0 && (w = 0);
                    var n = function (t) {
                        var i = 0;
                        if (e || t && (i = 1), s.autoWidth) for (var n = 0, o = 0; o < a.length && (n += parseInt(a.eq(o).width()) + s.slideMargin, m = o + i, !(n >= w)); o++) ; else {
                            var r = w / ((b + s.slideMargin) * s.slideMove);
                            m = parseInt(r) + i, w >= d - f - s.slideMargin && r % 1 != 0 && m++
                        }
                    };
                    t >= s.swipeThreshold ? (n(!1), i = !1) : t <= -s.swipeThreshold && (n(!0), i = !1), r.mode(i), this.slideThumb()
                } else t >= s.swipeThreshold ? r.goToPrevSlide() : t <= -s.swipeThreshold && r.goToNextSlide()
            }, enableDrag: function () {
                var e = this;
                if (!$) {
                    var i = 0, n = 0, o = !1;
                    g.find(".lightSlider").addClass("lsGrab"), g.on("mousedown", function (e) {
                        if (d < f && 0 !== d) return !1;
                        "lSPrev" !== t(e.target).attr("class") && "lSNext" !== t(e.target).attr("class") && (i = !0 === s.vertical ? e.pageY : e.pageX, o = !0, e.preventDefault ? e.preventDefault() : e.returnValue = !1, g.scrollLeft += 1, g.scrollLeft -= 1, g.find(".lightSlider").removeClass("lsGrab").addClass("lsGrabbing"), clearInterval(C))
                    }), t(window).on("mousemove", function (t) {
                        o && (n = !0 === s.vertical ? t.pageY : t.pageX, e.touchMove(n, i))
                    }), t(window).on("mouseup", function (r) {
                        if (o) {
                            g.find(".lightSlider").removeClass("lsGrabbing").addClass("lsGrab"), o = !1;
                            var a = (n = !0 === s.vertical ? r.pageY : r.pageX) - i;
                            Math.abs(a) >= s.swipeThreshold && t(window).on("click.ls", function (e) {
                                e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopImmediatePropagation(), e.stopPropagation(), t(window).off("click.ls")
                            }), e.touchEnd(a)
                        }
                    })
                }
            }, enableTouch: function () {
                var t = this;
                if ($) {
                    var e = {}, i = {};
                    g.on("touchstart", function (t) {
                        i = t.originalEvent.targetTouches[0], e.pageX = t.originalEvent.targetTouches[0].pageX, e.pageY = t.originalEvent.targetTouches[0].pageY, clearInterval(C)
                    }), g.on("touchmove", function (n) {
                        if (d < f && 0 !== d) return !1;
                        var o = n.originalEvent;
                        i = o.targetTouches[0];
                        var r = Math.abs(i.pageX - e.pageX), a = Math.abs(i.pageY - e.pageY);
                        !0 === s.vertical ? (3 * a > r && n.preventDefault(), t.touchMove(i.pageY, e.pageY)) : (3 * r > a && n.preventDefault(), t.touchMove(i.pageX, e.pageX))
                    }), g.on("touchend", function () {
                        if (d < f && 0 !== d) return !1;
                        var n;
                        n = !0 === s.vertical ? i.pageY - e.pageY : i.pageX - e.pageX, t.touchEnd(n)
                    })
                }
            }, build: function () {
                var e = this;
                e.initialStyle(), this.doCss() && (!0 === s.enableTouch && e.enableTouch(), !0 === s.enableDrag && e.enableDrag()), t(window).on("focus", function () {
                    e.auto()
                }), t(window).on("blur", function () {
                    clearInterval(C)
                }), e.pager(), e.pauseOnHover(), e.controls(), e.keyPress()
            }
        }).build(), S.init = function () {
            S.chbreakpoint(), !0 === s.vertical ? (f = s.item > 1 ? s.verticalHeight : a.outerHeight(), g.css("height", f + "px")) : f = g.outerWidth(), !0 === s.loop && "slide" === s.mode && S.clone(), S.calL(), "slide" === s.mode && r.removeClass("lSSlide"), "slide" === s.mode && (S.calSW(), S.sSW()), setTimeout(function () {
                "slide" === s.mode && r.addClass("lSSlide")
            }, 1e3), s.pager && S.createPager(), !0 === s.adaptiveHeight && !1 === s.vertical && r.css("height", a.eq(m).outerHeight(!0)), !1 === s.adaptiveHeight && ("slide" === s.mode ? !1 === s.vertical ? n.setHeight(r, !1) : n.auto() : n.setHeight(r, !0)), !0 === s.gallery && n.slideThumb(), "slide" === s.mode && n.slide(), !1 === s.autoWidth ? a.length <= s.item ? g.find(".lSAction").hide() : g.find(".lSAction").show() : S.calWidth(!1) < f && 0 !== d ? g.find(".lSAction").hide() : g.find(".lSAction").show()
        }, r.goToPrevSlide = function () {
            if (m > 0) s.onBeforePrevSlide.call(this, r, m), m--, r.mode(!1), !0 === s.gallery && n.slideThumb(); else if (!0 === s.loop) {
                if (s.onBeforePrevSlide.call(this, r, m), "fade" === s.mode) {
                    var t = c - 1;
                    m = parseInt(t / s.slideMove)
                }
                r.mode(!1), !0 === s.gallery && n.slideThumb()
            } else !0 === s.slideEndAnimation && (r.addClass("leftEnd"), setTimeout(function () {
                r.removeClass("leftEnd")
            }, 400))
        }, r.goToNextSlide = function () {
            var t = !0;
            if ("slide" === s.mode) {
                t = n.slideValue() < d - f - s.slideMargin
            }
            m * s.slideMove < c - s.slideMove && t ? (s.onBeforeNextSlide.call(this, r, m), m++, r.mode(!1), !0 === s.gallery && n.slideThumb()) : !0 === s.loop ? (s.onBeforeNextSlide.call(this, r, m), m = 0, r.mode(!1), !0 === s.gallery && n.slideThumb()) : !0 === s.slideEndAnimation && (r.addClass("rightEnd"), setTimeout(function () {
                r.removeClass("rightEnd")
            }, 400))
        }, r.mode = function (t) {
            !0 === s.adaptiveHeight && !1 === s.vertical && r.css("height", a.eq(m).outerHeight(!0)), !1 === u && ("slide" === s.mode ? n.doCss() && (r.addClass("lSSlide"), "" !== s.speed && g.css("transition-duration", s.speed + "ms"), "" !== s.cssEasing && g.css("transition-timing-function", s.cssEasing)) : n.doCss() && ("" !== s.speed && r.css("transition-duration", s.speed + "ms"), "" !== s.cssEasing && r.css("transition-timing-function", s.cssEasing))), t || s.onBeforeSlide.call(this, r, m), "slide" === s.mode ? n.slide() : n.fade(), g.hasClass("ls-hover") || n.auto(), setTimeout(function () {
                t || s.onAfterSlide.call(this, r, m)
            }, s.speed), u = !0
        }, r.play = function () {
            r.goToNextSlide(), s.auto = !0, n.auto()
        }, r.pause = function () {
            s.auto = !1, clearInterval(C)
        }, r.refresh = function () {
            S.init()
        }, r.getCurrentSlideCount = function () {
            var t = m;
            if (s.loop) {
                var e = g.find(".lslide").length, i = r.find(".clone.left").length;
                t = m <= i - 1 ? e + (m - i) : m >= e + i ? m - e - i : m - i
            }
            return t + 1
        }, r.getTotalSlideCount = function () {
            return g.find(".lslide").length
        }, r.goToSlide = function (t) {
            m = s.loop ? t + r.find(".clone.left").length - 1 : t, r.mode(!1), !0 === s.gallery && n.slideThumb()
        }, r.destroy = function () {
            r.lightSlider && (r.goToPrevSlide = function () {
            }, r.goToNextSlide = function () {
            }, r.mode = function () {
            }, r.play = function () {
            }, r.pause = function () {
            }, r.refresh = function () {
            }, r.getCurrentSlideCount = function () {
            }, r.getTotalSlideCount = function () {
            }, r.goToSlide = function () {
            }, r.lightSlider = null, S = {
                init: function () {
                }
            }, r.parent().parent().find(".lSAction, .lSPager").remove(), r.removeClass("lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right").removeAttr("style").unwrap().unwrap(), r.children().removeAttr("style"), a.removeClass("lslide active"), r.find(".clone").remove(), a = null, C = null, u = !1, m = 0)
        }, setTimeout(function () {
            s.onSliderLoad.call(this, r)
        }, 10), t(window).on("resize orientationchange", function (t) {
            setTimeout(function () {
                t.preventDefault ? t.preventDefault() : t.returnValue = !1, S.init()
            }, 200)
        }), this
    }
}(jQuery), function (t, e, i, n) {
    "use strict";

    function s(e, i) {
        this.element = e, this.$elem = t(this.element), this.options = t.extend(r, i), this.init()
    }

    var o = 0, r = {
        resizeWidth: "767",
        initiallyVisible: !1,
        collapserTitle: "Main Menu",
        animSpeed: "medium",
        easingEffect: null,
        indentChildren: !1,
        childrenIndenter: "&nbsp;&nbsp;",
        expandIcon: '<i class="fa fa-angle-down" aria-hidden="true"></i>',
        collapseIcon: '<i class="fa fa-angle-down" aria-hidden="true"></i>'
    };
    s.prototype = {
        init: function () {
            var i, n = t(e), s = this.options, o = this.$elem,
                r = '<div class="menu-collapser">' + s.collapserTitle + '<div class="collapse-button"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></div></div>';
            o.before(r), i = o.prev(".menu-collapser"), o.on("click", ".sub-toggle", function (e) {
                e.preventDefault(), e.stopPropagation();
                var i = t(this).closest("li");
                t(this).hasClass("expanded") ? (t(this).removeClass("expanded").html(s.expandIcon), i.find(">ul").slideUp(s.animSpeed, s.easingEffect)) : (t(this).addClass("expanded").html(s.collapseIcon), i.find(">ul").slideDown(s.animSpeed, s.easingEffect))
            }), i.on("click", ".collapse-button", function (t) {
                t.preventDefault(), o.slideToggle(s.animSpeed, s.easingEffect)
            }), this.resizeMenu(), n.on("resize", this.resizeMenu.bind(this)), n.trigger("resize")
        }, resizeMenu: function () {
            var i = this, n = t(e).width(), s = this.options, r = t(this.element),
                a = t("body").find(".menu-collapser");
            void 0 !== e.innerWidth && e.innerWidth > n && (n = e.innerWidth), n != o && (o = n, r.find("li").each(function () {
                t(this).has("ul").length && (t(this).addClass("has-submenu").has(".sub-toggle").length ? t(this).children(".sub-toggle").html(s.expandIcon) : t(this).addClass("has-submenu").append('<span class="sub-toggle">' + s.expandIcon + "</span>")), t(this).children("ul").hide().end().find(".sub-toggle").removeClass("expanded").html(s.expandIcon)
            }), s.resizeWidth >= n ? (s.indentChildren && r.find("ul").each(function () {
                var e = t(this).parents("ul").length;
                t(this).children("li").children("a").has("i").length || t(this).children("li").children("a").prepend(i.indent(e, s))
            }), r.addClass("collapsed").find("li").has("ul").off("mouseenter mouseleave"), a.show(), s.initiallyVisible || r.hide()) : (r.find("li").has("ul").on("mouseenter", function () {
                t(this).find(">ul").stop().slideDown(s.animSpeed, s.easingEffect)
            }).on("mouseleave", function () {
                t(this).find(">ul").stop().slideUp(s.animSpeed, s.easingEffect)
            }), r.find("li > a > i").remove(), r.removeClass("collapsed").show(), a.hide()))
        }, indent: function (t, e) {
            for (var i = 0, n = ""; i < t; i++) n += e.childrenIndenter;
            return "<i>" + n + "</i> "
        }
    }, t.fn.slimmenu = function (e) {
        return this.each(function () {
            t.data(this, "plugin_slimmenu") || t.data(this, "plugin_slimmenu", new s(this, e))
        })
    }
}(jQuery, window, document), function (t, e, i, n) {
    function s(e, i) {
        this.settings = null, this.options = t.extend({}, s.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {start: null, current: null},
            direction: null
        }, this._states = {
            current: {},
            tags: {initializing: ["busy"], animating: ["busy"], dragging: ["interacting"]}
        }, t.each(["onResize", "onThrottledResize"], t.proxy(function (e, i) {
            this._handlers[i] = t.proxy(this[i], this)
        }, this)), t.each(s.Plugins, t.proxy(function (t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(s.Workers, t.proxy(function (e, i) {
            this._pipe.push({filter: i.filter, run: t.proxy(i.run, this)})
        }, this)), this.setup(), this.initialize()
    }

    s.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, s.Width = {Default: "default", Inner: "inner", Outer: "outer"}, s.Type = {
        Event: "event",
        State: "state"
    }, s.Plugins = {}, s.Workers = [{
        filter: ["width", "settings"], run: function () {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"], run: function () {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            var e = this.settings.margin || "", i = !this.settings.autoWidth, n = this.settings.rtl,
                s = {width: "auto", "margin-left": n ? e : "", "margin-right": n ? "" : e};
            !i && this.$stage.children().css(s), t.css = s
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, i = null,
                n = this._items.length, s = !this.settings.autoWidth, o = [];
            for (t.items = {
                merge: !1,
                width: e
            }; n--;) i = this._mergers[n], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = i > 1 || t.items.merge, o[n] = s ? e * i : this._items[n].width();
            this._widths = o
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var e = [], i = this._items, n = this.settings, s = Math.max(2 * n.items, 4),
                o = 2 * Math.ceil(i.length / 2), r = n.loop && i.length ? n.rewind ? s : Math.max(s, o) : 0, a = "",
                l = "";
            for (r /= 2; r > 0;) e.push(this.normalize(e.length / 2, !0)), a += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), l = i[e[e.length - 1]][0].outerHTML + l, r -= 1;
            this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, n = 0, s = 0, o = []; ++i < e;) n = o[i - 1] || 0, s = this._widths[this.relative(i)] + this.settings.margin, o.push(n + s * t);
            this._coordinates = o
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var t = this.settings.stagePadding, e = this._coordinates, i = {
                width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                "padding-left": t || "",
                "padding-right": t || ""
            };
            this.$stage.css(i)
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            var e = this._coordinates.length, i = !this.settings.autoWidth, n = this.$stage.children();
            if (i && t.items.merge) for (; e--;) t.css.width = this._widths[this.relative(e)], n.eq(e).css(t.css); else i && (t.css.width = t.items.width, n.css(t.css))
        }
    }, {
        filter: ["items"], run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
        }
    }, {
        filter: ["position"], run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"], run: function () {
            var t, e, i, n, s = this.settings.rtl ? 1 : -1, o = 2 * this.settings.stagePadding,
                r = this.coordinates(this.current()) + o, a = r + this.width() * s, l = [];
            for (i = 0, n = this._coordinates.length; i < n; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * s, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && l.push(i);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }], s.prototype.initialize = function () {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var e, i, n;
            e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : void 0, n = this.$element.children(i).width(), e.length && n <= 0 && this.preloadAutoWidthImages(e)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, s.prototype.setup = function () {
        var e = this.viewport(), i = this.options.responsive, n = -1, s = null;
        i ? (t.each(i, function (t) {
            t <= e && t > n && (n = Number(t))
        }), "function" == typeof (s = t.extend({}, this.options, i[n])).stagePadding && (s.stagePadding = s.stagePadding()), delete s.responsive, s.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n))) : s = t.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: s
            }
        }), this._breakpoint = n, this.settings = s, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, s.prototype.optionsLogic = function () {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, s.prototype.prepare = function (e) {
        var i = this.trigger("prepare", {content: e});
        return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {content: i.data}), i.data
    }, s.prototype.update = function () {
        for (var e = 0, i = this._pipe.length, n = t.proxy(function (t) {
            return this[t]
        }, this._invalidated), s = {}; e < i;) (this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(s), e++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, s.prototype.width = function (t) {
        switch (t = t || s.Width.Default) {
            case s.Width.Inner:
            case s.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, s.prototype.refresh = function () {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, s.prototype.onThrottledResize = function () {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, s.prototype.onResize = function () {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, s.prototype.registerEventHandlers = function () {
        t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
    }, s.prototype.onDragStart = function (e) {
        var n = null;
        3 !== e.which && (t.support.transform ? n = {
            x: (n = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === n.length ? 12 : 4],
            y: n[16 === n.length ? 13 : 5]
        } : (n = this.$stage.position(), n = {
            x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left,
            y: n.top
        }), this.is("animating") && (t.support.transform ? this.animate(n.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = n, this._drag.stage.current = n, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function (e) {
            var n = this.difference(this._drag.pointer, this.pointer(e));
            t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(n.x) < Math.abs(n.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, s.prototype.onDragMove = function (t) {
        var e = null, i = null, n = null, s = this.difference(this._drag.pointer, this.pointer(t)),
            o = this.difference(this._drag.stage.start, s);
        this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), n = this.settings.pullDrag ? -1 * s.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + n), i + n)), this._drag.stage.current = o, this.animate(o.x))
    }, s.prototype.onDragEnd = function (e) {
        var n = this.difference(this._drag.pointer, this.pointer(e)), s = this._drag.stage.current,
            o = n.x > 0 ^ this.settings.rtl ? "left" : "right";
        t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== n.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(s.x, 0 !== n.x ? o : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = o, (Math.abs(n.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, s.prototype.closest = function (e, i) {
        var n = -1, s = this.width(), o = this.coordinates();
        return this.settings.freeDrag || t.each(o, t.proxy(function (t, r) {
            return "left" === i && e > r - 30 && e < r + 30 ? n = t : "right" === i && e > r - s - 30 && e < r - s + 30 ? n = t + 1 : this.op(e, "<", r) && this.op(e, ">", o[t + 1] || r - s) && (n = "left" === i ? t + 1 : t), -1 === n
        }, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? n = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (n = e = this.maximum())), n
    }, s.prototype.animate = function (e) {
        var i = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : i ? this.$stage.animate({left: e + "px"}, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({left: e + "px"})
    }, s.prototype.is = function (t) {
        return this._states.current[t] && this._states.current[t] > 0
    }, s.prototype.current = function (t) {
        if (void 0 === t) return this._current;
        if (0 !== this._items.length) {
            if (t = this.normalize(t), this._current !== t) {
                var e = this.trigger("change", {property: {name: "position", value: t}});
                void 0 !== e.data && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                })
            }
            return this._current
        }
    }, s.prototype.invalidate = function (e) {
        return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function (t, e) {
            return e
        })
    }, s.prototype.reset = function (t) {
        void 0 !== (t = this.normalize(t)) && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, s.prototype.normalize = function (t, e) {
        var i = this._items.length, n = e ? 0 : this._clones.length;
        return !this.isNumeric(t) || i < 1 ? t = void 0 : (t < 0 || t >= i + n) && (t = ((t - n / 2) % i + i) % i + n / 2), t
    }, s.prototype.relative = function (t) {
        return t -= this._clones.length / 2, this.normalize(t, !0)
    }, s.prototype.maximum = function (t) {
        var e, i, n, s = this.settings, o = this._coordinates.length;
        if (s.loop) o = this._clones.length / 2 + this._items.length - 1; else if (s.autoWidth || s.merge) {
            if (e = this._items.length) for (i = this._items[--e].width(), n = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > n);) ;
            o = e + 1
        } else o = s.center ? this._items.length - 1 : this._items.length - s.items;
        return t && (o -= this._clones.length / 2), Math.max(o, 0)
    }, s.prototype.minimum = function (t) {
        return t ? 0 : this._clones.length / 2
    }, s.prototype.items = function (t) {
        return void 0 === t ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, s.prototype.mergers = function (t) {
        return void 0 === t ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, s.prototype.clones = function (e) {
        var i = this._clones.length / 2, n = i + this._items.length, s = function (t) {
            return t % 2 == 0 ? n + t / 2 : i - (t + 1) / 2
        };
        return void 0 === e ? t.map(this._clones, function (t, e) {
            return s(e)
        }) : t.map(this._clones, function (t, i) {
            return t === e ? s(i) : null
        })
    }, s.prototype.speed = function (t) {
        return void 0 !== t && (this._speed = t), this._speed
    }, s.prototype.coordinates = function (e) {
        var i, n = 1, s = e - 1;
        return void 0 === e ? t.map(this._coordinates, t.proxy(function (t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (this.settings.rtl && (n = -1, s = e + 1), i = this._coordinates[e], i += (this.width() - i + (this._coordinates[s] || 0)) / 2 * n) : i = this._coordinates[s] || 0, i = Math.ceil(i))
    }, s.prototype.duration = function (t, e, i) {
        return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, s.prototype.to = function (t, e) {
        var i = this.current(), n = null, s = t - this.relative(i), o = (s > 0) - (s < 0), r = this._items.length,
            a = this.minimum(), l = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(s) > r / 2 && (s += -1 * o * r), (n = (((t = i + s) - a) % r + r) % r + a) !== t && n - s <= l && n - s > 0 && (i = n - s, t = n, this.reset(i))) : t = this.settings.rewind ? (t % (l += 1) + l) % l : Math.max(a, Math.min(l, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
    }, s.prototype.next = function (t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, s.prototype.prev = function (t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, s.prototype.onTransitionEnd = function (t) {
        if (void 0 !== t && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, s.prototype.viewport = function () {
        var n;
        return this.options.responsiveBaseElement !== e ? n = t(this.options.responsiveBaseElement).width() : e.innerWidth ? n = e.innerWidth : i.documentElement && i.documentElement.clientWidth ? n = i.documentElement.clientWidth : console.warn("Can not detect viewport width."), n
    }, s.prototype.replace = function (e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function () {
            return 1 === this.nodeType
        }).each(t.proxy(function (t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, s.prototype.add = function (e, i) {
        var n = this.relative(this._current);
        i = void 0 === i ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
            content: e,
            position: i
        }), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[n] && this.reset(this._items[n].index()), this.invalidate("items"), this.trigger("added", {
            content: e,
            position: i
        })
    }, s.prototype.remove = function (t) {
        void 0 !== (t = this.normalize(t, !0)) && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, s.prototype.preloadAutoWidthImages = function (e) {
        e.each(t.proxy(function (e, i) {
            this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy(function (t) {
                i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
        }, this))
    }, s.prototype.destroy = function () {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
        for (var n in this._plugins) this._plugins[n].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, s.prototype.op = function (t, e, i) {
        var n = this.settings.rtl;
        switch (e) {
            case"<":
                return n ? t > i : t < i;
            case">":
                return n ? t < i : t > i;
            case">=":
                return n ? t <= i : t >= i;
            case"<=":
                return n ? t >= i : t <= i
        }
    }, s.prototype.on = function (t, e, i, n) {
        t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
    }, s.prototype.off = function (t, e, i, n) {
        t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
    }, s.prototype.trigger = function (e, i, n, o, r) {
        var a = {item: {count: this._items.length, index: this.current()}},
            l = t.camelCase(t.grep(["on", e, n], function (t) {
                return t
            }).join("-").toLowerCase()),
            h = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({relatedTarget: this}, a, i));
        return this._supress[e] || (t.each(this._plugins, function (t, e) {
            e.onTrigger && e.onTrigger(h)
        }), this.register({
            type: s.Type.Event,
            name: e
        }), this.$element.trigger(h), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, h)), h
    }, s.prototype.enter = function (e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
            void 0 === this._states.current[e] && (this._states.current[e] = 0), this._states.current[e]++
        }, this))
    }, s.prototype.leave = function (e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
            this._states.current[e]--
        }, this))
    }, s.prototype.register = function (e) {
        if (e.type === s.Type.Event) {
            if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
                var i = t.event.special[e.name]._default;
                t.event.special[e.name]._default = function (t) {
                    return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
                }, t.event.special[e.name].owl = !0
            }
        } else e.type === s.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function (i, n) {
            return t.inArray(i, this._states.tags[e.name]) === n
        }, this)))
    }, s.prototype.suppress = function (e) {
        t.each(e, t.proxy(function (t, e) {
            this._supress[e] = !0
        }, this))
    }, s.prototype.release = function (e) {
        t.each(e, t.proxy(function (t, e) {
            delete this._supress[e]
        }, this))
    }, s.prototype.pointer = function (t) {
        var i = {x: null, y: null};
        return t = t.originalEvent || t || e.event, (t = t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
    }, s.prototype.isNumeric = function (t) {
        return !isNaN(parseFloat(t))
    }, s.prototype.difference = function (t, e) {
        return {x: t.x - e.x, y: t.y - e.y}
    }, t.fn.owlCarousel = function (e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var n = t(this), o = n.data("owl.carousel");
            o || (o = new s(this, "object" == typeof e && e), n.data("owl.carousel", o), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (e, i) {
                o.register({
                    type: s.Type.Event,
                    name: i
                }), o.$element.on(i + ".owl.carousel.core", t.proxy(function (t) {
                    t.namespace && t.relatedTarget !== this && (this.suppress([i]), o[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
                }, o))
            })), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i)
        })
    }, t.fn.owlCarousel.Constructor = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    var s = function (e) {
        this._core = e, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = t.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    s.Defaults = {autoRefresh: !0, autoRefreshInterval: 500}, s.prototype.watch = function () {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, s.prototype.refresh = function () {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, s.prototype.destroy = function () {
        var t, i;
        e.clearInterval(this._interval);
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    var s = function (e) {
        this._core = e, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function (e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type)) for (var i = this._core.settings, n = i.center && Math.ceil(i.items / 2) || i.items, s = i.center && -1 * n || 0, o = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + s, r = this._core.clones().length, a = t.proxy(function (t, e) {
                    this.load(e)
                }, this); s++ < n;) this.load(r / 2 + this._core.relative(o)), r && t.each(this._core.clones(this._core.relative(o)), a), o++
            }, this)
        }, this._core.options = t.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    s.Defaults = {lazyLoad: !1}, s.prototype.load = function (i) {
        var n = this._core.$stage.children().eq(i), s = n && n.find(".owl-lazy");
        !s || t.inArray(n.get(0), this._loaded) > -1 || (s.each(t.proxy(function (i, n) {
            var s, o = t(n), r = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
            this._core.trigger("load", {
                element: o,
                url: r
            }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function () {
                o.css("opacity", 1), this._core.trigger("loaded", {element: o, url: r}, "lazy")
            }, this)).attr("src", r) : ((s = new Image).onload = t.proxy(function () {
                o.css({"background-image": 'url("' + r + '")', opacity: "1"}), this._core.trigger("loaded", {
                    element: o,
                    url: r
                }, "lazy")
            }, this), s.src = r)
        }, this)), this._loaded.push(n.get(0)))
    }, s.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Lazy = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    var s = function (e) {
        this._core = e, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.autoHeight && this.update()
            }, this), "changed.owl.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this), "loaded.owl.lazy": t.proxy(function (t) {
                t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = t.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    s.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, s.prototype.update = function () {
        var e = this._core._current, i = e + this._core.settings.items,
            n = this._core.$stage.children().toArray().slice(e, i), s = [], o = 0;
        t.each(n, function (e, i) {
            s.push(t(i).height())
        }), o = Math.max.apply(null, s), this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass)
    }, s.prototype.destroy = function () {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    var s = function (e) {
        this._core = e, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": t.proxy(function (t) {
                t.namespace && this._core.register({type: "state", name: "playing", tags: ["interacting"]})
            }, this), "resize.owl.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
            }, this), "refreshed.owl.carousel": t.proxy(function (t) {
                t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this), "changed.owl.carousel": t.proxy(function (t) {
                t.namespace && "position" === t.property.name && this._playing && this.stop()
            }, this), "prepared.owl.carousel": t.proxy(function (e) {
                if (e.namespace) {
                    var i = t(e.content).find(".owl-video");
                    i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
                }
            }, this)
        }, this._core.options = t.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (t) {
            this.play(t)
        }, this))
    };
    s.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, s.prototype.fetch = function (t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
            n = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
            s = t.attr("data-width") || this._core.settings.videoWidth,
            o = t.attr("data-height") || this._core.settings.videoHeight, r = t.attr("href");
        if (!r) throw new Error("Missing video URL.");
        if ((n = r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube"; else if (n[3].indexOf("vimeo") > -1) i = "vimeo"; else {
            if (!(n[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            i = "vzaar"
        }
        n = n[6], this._videos[r] = {
            type: i,
            id: n,
            width: s,
            height: o
        }, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
    }, s.prototype.thumbnail = function (e, i) {
        var n, s, o, r = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
            a = e.find("img"), l = "src", h = "", p = this._core.settings, c = function (t) {
                s = '<div class="owl-video-play-icon"></div>', n = p.lazyLoad ? '<div class="owl-video-tn ' + h + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(n), e.after(s)
            };
        if (e.wrap('<div class="owl-video-wrapper"' + r + "></div>"), this._core.settings.lazyLoad && (l = "data-src", h = "owl-lazy"), a.length) return c(a.attr(l)), a.remove(), !1;
        "youtube" === i.type ? (o = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg", c(o)) : "vimeo" === i.type ? t.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (t) {
                o = t[0].thumbnail_large, c(o)
            }
        }) : "vzaar" === i.type && t.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (t) {
                o = t.framegrab_url, c(o)
            }
        })
    }, s.prototype.stop = function () {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, s.prototype.play = function (e) {
        var i, n = t(e.target).closest("." + this._core.settings.itemClass), s = this._videos[n.attr("data-video")],
            o = s.width || "100%", r = s.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), n = this._core.items(this._core.relative(n.index())), this._core.reset(n.index()), "youtube" === s.type ? i = '<iframe width="' + o + '" height="' + r + '" src="//www.youtube.com/embed/' + s.id + "?autoplay=1&rel=0&v=" + s.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === s.type ? i = '<iframe src="//player.vimeo.com/video/' + s.id + '?autoplay=1" width="' + o + '" height="' + r + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === s.type && (i = '<iframe frameborder="0"height="' + r + '"width="' + o + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + s.id + '/player?autoplay=true"></iframe>'), t('<div class="owl-video-frame">' + i + "</div>").insertAfter(n.find(".owl-video")), this._playing = n.addClass("owl-video-playing"))
    }, s.prototype.isInFullScreen = function () {
        var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return e && t(e).parent().hasClass("owl-video-frame")
    }, s.prototype.destroy = function () {
        var t, e;
        this._core.$element.off("click.owl.video");
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Video = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    var s = function (e) {
        this.core = e, this.core.options = t.extend({}, s.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
            "change.owl.carousel": t.proxy(function (t) {
                t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
                t.namespace && (this.swapping = "translated" == t.type)
            }, this), "translate.owl.carousel": t.proxy(function (t) {
                t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    s.Defaults = {animateOut: !1, animateIn: !1}, s.prototype.swap = function () {
        if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
            this.core.speed(0);
            var e, i = t.proxy(this.clear, this), n = this.core.$stage.children().eq(this.previous),
                s = this.core.$stage.children().eq(this.next), o = this.core.settings.animateIn,
                r = this.core.settings.animateOut;
            this.core.current() !== this.previous && (r && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.one(t.support.animation.end, i).css({left: e + "px"}).addClass("animated owl-animated-out").addClass(r)), o && s.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(o))
        }
    }, s.prototype.clear = function (e) {
        t(e.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, s.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Animate = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    var s = function (e) {
        this._core = e, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
            "changed.owl.carousel": t.proxy(function (t) {
                t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._paused && (this._time = 0)
            }, this), "initialized.owl.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.autoplay && this.play()
            }, this), "play.owl.autoplay": t.proxy(function (t, e, i) {
                t.namespace && this.play(e, i)
            }, this), "stop.owl.autoplay": t.proxy(function (t) {
                t.namespace && this.stop()
            }, this), "mouseover.owl.autoplay": t.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this), "mouseleave.owl.autoplay": t.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this), "touchstart.owl.core": t.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this), "touchend.owl.core": t.proxy(function () {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, s.Defaults, this._core.options)
    };
    s.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, s.prototype._next = function (n) {
        this._call = e.setTimeout(t.proxy(this._next, this, n), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(n || this._core.settings.autoplaySpeed)
    }, s.prototype.read = function () {
        return (new Date).getTime() - this._time
    }, s.prototype.play = function (i, n) {
        var s;
        this._core.is("rotating") || this._core.enter("rotating"), i = i || this._core.settings.autoplayTimeout, s = Math.min(this._time % (this._timeout || i), i), this._paused ? (this._time = this.read(), this._paused = !1) : e.clearTimeout(this._call), this._time += this.read() % i - s, this._timeout = i, this._call = e.setTimeout(t.proxy(this._next, this, n), i - s)
    }, s.prototype.stop = function () {
        this._core.is("rotating") && (this._time = 0, this._paused = !0, e.clearTimeout(this._call), this._core.leave("rotating"))
    }, s.prototype.pause = function () {
        this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, e.clearTimeout(this._call))
    }, s.prototype.destroy = function () {
        var t, e;
        this.stop();
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.autoplay = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    "use strict";
    var s = function (e) {
        this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": t.proxy(function (e) {
                e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this), "added.owl.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
            }, this), "remove.owl.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this), "changed.owl.carousel": t.proxy(function (t) {
                t.namespace && "position" == t.property.name && this.draw()
            }, this), "initialized.owl.carousel": t.proxy(function (t) {
                t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this), "refreshed.owl.carousel": t.proxy(function (t) {
                t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = t.extend({}, s.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    s.Defaults = {
        nav: !1,
        navText: ['<span aria-label="prev">&#x2039;</span>', '<span aria-label="next">&#x203a;</span>'],
        navSpeed: !1,
        navElement: 'button role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, s.prototype.initialize = function () {
        var e, i = this._core.settings;
        this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function (t) {
            this.prev(i.navSpeed)
        }, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function (t) {
            this.next(i.navSpeed)
        }, this)), i.dotsData || (this._templates = [t("<button>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", t.proxy(function (e) {
            var n = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
            e.preventDefault(), this.to(n, i.dotsSpeed)
        }, this));
        for (e in this._overrides) this._core[e] = t.proxy(this[e], this)
    }, s.prototype.destroy = function () {
        var t, e, i, n;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) "$relative" === e && settings.navContainer ? this._controls[e].html("") : this._controls[e].remove();
        for (n in this.overides) this._core[n] = this._overrides[n];
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, s.prototype.update = function () {
        var t, e, i = this._core.clones().length / 2, n = i + this._core.items().length, s = this._core.maximum(!0),
            o = this._core.settings, r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
        if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy) for (this._pages = [], t = i, e = 0, 0; t < n; t++) {
            if (e >= r || 0 === e) {
                if (this._pages.push({start: Math.min(s, t - i), end: t - i + r - 1}), Math.min(s, t - i) === s) break;
                e = 0, 0
            }
            e += this._core.mergers(this._core.relative(t))
        }
    }, s.prototype.draw = function () {
        var e, i = this._core.settings, n = this._core.items().length <= i.items,
            s = this._core.relative(this._core.current()), o = i.loop || i.rewind;
        this._controls.$relative.toggleClass("disabled", !i.nav || n), i.nav && (this._controls.$previous.toggleClass("disabled", !o && s <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && s >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || n), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
    }, s.prototype.onTrigger = function (e) {
        var i = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
        }
    }, s.prototype.current = function () {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, t.proxy(function (t, i) {
            return t.start <= e && t.end >= e
        }, this)).pop()
    }, s.prototype.getPosition = function (e) {
        var i, n, s = this._core.settings;
        return "page" == s.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += s.slideBy : i -= s.slideBy), i
    }, s.prototype.next = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }, s.prototype.prev = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }, s.prototype.to = function (e, i, n) {
        var s;
        !n && this._pages.length ? (s = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % s + s) % s].start, i)) : t.proxy(this._overrides.to, this._core)(e, i)
    }, t.fn.owlCarousel.Constructor.Plugins.Navigation = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    "use strict";
    var s = function (i) {
        this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": t.proxy(function (i) {
                i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
            }, this), "prepared.owl.carousel": t.proxy(function (e) {
                if (e.namespace) {
                    var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!i) return;
                    this._hashes[i] = e.content
                }
            }, this), "changed.owl.carousel": t.proxy(function (i) {
                if (i.namespace && "position" === i.property.name) {
                    var n = this._core.items(this._core.relative(this._core.current())),
                        s = t.map(this._hashes, function (t, e) {
                            return t === n ? e : null
                        }).join();
                    if (!s || e.location.hash.slice(1) === s) return;
                    e.location.hash = s
                }
            }, this)
        }, this._core.options = t.extend({}, s.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function (t) {
            var i = e.location.hash.substring(1), n = this._core.$stage.children(),
                s = this._hashes[i] && n.index(this._hashes[i]);
            void 0 !== s && s !== this._core.current() && this._core.to(this._core.relative(s), !1, !0)
        }, this))
    };
    s.Defaults = {URLhashListener: !1}, s.prototype.destroy = function () {
        var i, n;
        t(e).off("hashchange.owl.navigation");
        for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
        for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Hash = s
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    function s(e, i) {
        var s = !1, o = e.charAt(0).toUpperCase() + e.slice(1);
        return t.each((e + " " + a.join(o + " ") + o).split(" "), function (t, e) {
            if (r[e] !== n) return s = !i || e, !1
        }), s
    }

    function o(t) {
        return s(t, !0)
    }

    var r = t("<support>").get(0).style, a = "Webkit Moz O ms".split(" "), l = {
        transition: {
            end: {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            }
        },
        animation: {
            end: {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oAnimationEnd",
                animation: "animationend"
            }
        }
    }, h = {
        csstransforms: function () {
            return !!s("transform")
        }, csstransforms3d: function () {
            return !!s("perspective")
        }, csstransitions: function () {
            return !!s("transition")
        }, cssanimations: function () {
            return !!s("animation")
        }
    };
    h.csstransitions() && (t.support.transition = new String(o("transition")), t.support.transition.end = l.transition.end[t.support.transition]), h.cssanimations() && (t.support.animation = new String(o("animation")), t.support.animation.end = l.animation.end[t.support.animation]), h.csstransforms() && (t.support.transform = new String(o("transform")), t.support.transform3d = h.csstransforms3d())
}(window.Zepto || window.jQuery, window, document), function (t) {
    "use strict";

    function e(t) {
        if (!t) throw new Error("No options passed to Waypoint constructor");
        if (!t.element) throw new Error("No element option passed to Waypoint constructor");
        if (!t.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + i, this.options = e.Adapter.extend({}, e.defaults, t), this.element = this.options.element, this.adapter = new e.Adapter(this.element), this.callback = t.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = e.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = e.Context.findOrCreateByElement(this.options.context), e.offsetAliases[this.options.offset] && (this.options.offset = e.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), n[this.key] = this, i += 1
    }

    var i = 0, n = {};
    e.prototype.queueTrigger = function (t) {
        this.group.queueTrigger(this, t)
    }, e.prototype.trigger = function (t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, e.prototype.destroy = function () {
        this.context.remove(this), this.group.remove(this), delete n[this.key]
    }, e.prototype.disable = function () {
        return this.enabled = !1, this
    }, e.prototype.enable = function () {
        return this.context.refresh(), this.enabled = !0, this
    }, e.prototype.next = function () {
        return this.group.next(this)
    }, e.prototype.previous = function () {
        return this.group.previous(this)
    }, e.invokeAll = function (t) {
        var e = [];
        for (var i in n) e.push(n[i]);
        for (var s = 0, o = e.length; o > s; s++) e[s][t]()
    }, e.destroyAll = function () {
        e.invokeAll("destroy")
    }, e.disableAll = function () {
        e.invokeAll("disable")
    }, e.enableAll = function () {
        e.invokeAll("enable")
    }, e.refreshAll = function () {
        e.Context.refreshAll()
    }, e.viewportHeight = function () {
        return window.innerHeight || document.documentElement.clientHeight
    }, e.viewportWidth = function () {
        return document.documentElement.clientWidth
    }, e.adapters = [], e.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, e.offsetAliases = {
        "bottom-in-view": function () {
            return this.context.innerHeight() - this.adapter.outerHeight()
        }, "right-in-view": function () {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = e
}(), function () {
    "use strict";

    function t(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + e, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, i[t.waypointContextKey] = this, e += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }

    var e = 0, i = {}, n = window.Waypoint, s = window.onload;
    t.prototype.add = function (t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, t.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete i[this.key])
    }, t.prototype.createThrottledResizeHandler = function () {
        function t() {
            e.handleResize(), e.didResize = !1
        }

        var e = this;
        this.adapter.on("resize.waypoints", function () {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, t.prototype.createThrottledScrollHandler = function () {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }

        var e = this;
        this.adapter.on("scroll.waypoints", function () {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, t.prototype.handleResize = function () {
        n.Context.refreshAll()
    }, t.prototype.handleScroll = function () {
        var t = {}, e = {
            horizontal: {
                newScroll: this.adapter.scrollLeft(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left"
            },
            vertical: {
                newScroll: this.adapter.scrollTop(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up"
            }
        };
        for (var i in e) {
            var n = e[i], s = n.newScroll > n.oldScroll ? n.forward : n.backward;
            for (var o in this.waypoints[i]) {
                var r = this.waypoints[i][o], a = n.oldScroll < r.triggerPoint, l = n.newScroll >= r.triggerPoint;
                (a && l || !a && !l) && (r.queueTrigger(s), t[r.group.id] = r.group)
            }
        }
        for (var h in t) t[h].flushTriggers();
        this.oldScroll = {x: e.horizontal.newScroll, y: e.vertical.newScroll}
    }, t.prototype.innerHeight = function () {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, t.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, t.prototype.innerWidth = function () {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, t.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints) for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var n = 0, s = t.length; s > n; n++) t[n].destroy()
    }, t.prototype.refresh = function () {
        var t, e = this.element == this.element.window, i = e ? void 0 : this.adapter.offset(), s = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var o in t) {
            var r = t[o];
            for (var a in this.waypoints[o]) {
                var l, h, p, c, d, u = this.waypoints[o][a], f = u.options.offset, g = u.triggerPoint, m = 0,
                    v = null == g;
                u.element !== u.element.window && (m = u.adapter.offset()[r.offsetProp]), "function" == typeof f ? f = f.apply(u) : "string" == typeof f && (f = parseFloat(f), u.options.offset.indexOf("%") > -1 && (f = Math.ceil(r.contextDimension * f / 100))), l = r.contextScroll - r.contextOffset, u.triggerPoint = m + l - f, h = g < r.oldScroll, p = u.triggerPoint >= r.oldScroll, c = h && p, d = !h && !p, !v && c ? (u.queueTrigger(r.backward), s[u.group.id] = u.group) : !v && d ? (u.queueTrigger(r.forward), s[u.group.id] = u.group) : v && r.oldScroll >= u.triggerPoint && (u.queueTrigger(r.forward), s[u.group.id] = u.group)
            }
        }
        return n.requestAnimationFrame(function () {
            for (var t in s) s[t].flushTriggers()
        }), this
    }, t.findOrCreateByElement = function (e) {
        return t.findByElement(e) || new t(e)
    }, t.refreshAll = function () {
        for (var t in i) i[t].refresh()
    }, t.findByElement = function (t) {
        return i[t.waypointContextKey]
    }, window.onload = function () {
        s && s(), t.refreshAll()
    }, n.requestAnimationFrame = function (t) {
        (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (t) {
            window.setTimeout(t, 1e3 / 60)
        }).call(window, t)
    }, n.Context = t
}(), function () {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), n[this.axis][this.name] = this
    }

    var n = {vertical: {}, horizontal: {}}, s = window.Waypoint;
    i.prototype.add = function (t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = {up: [], down: [], left: [], right: []}
    }, i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
            var n = this.triggerQueues[i], s = "up" === i || "left" === i;
            n.sort(s ? e : t);
            for (var o = 0, r = n.length; r > o; o += 1) {
                var a = n[o];
                (a.options.continuous || o === n.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = s.Adapter.inArray(e, this.waypoints);
        return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = s.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function (t) {
        var e = s.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function () {
        return this.waypoints[0]
    }, i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function (t) {
        return n[t.axis][t.name] || new i(t)
    }, s.Group = i
}(), function () {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }

    var e = window.jQuery, i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
        t.prototype[i] = function () {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function (i, n) {
        t[n] = e[n]
    }), i.adapters.push({name: "jquery", Adapter: t}), i.Adapter = t
}(), function () {
    "use strict";

    function t(t) {
        return function () {
            var i = [], n = arguments[0];
            return t.isFunction(arguments[0]) && (n = t.extend({}, arguments[1]), n.handler = arguments[0]), this.each(function () {
                var s = t.extend({}, n, {element: this});
                "string" == typeof s.context && (s.context = t(this).closest(s.context)[0]), i.push(new e(s))
            }), i
        }
    }

    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}(), function (t, e) {
    if ("function" == typeof define && define.amd) define(["module", "exports"], e); else if ("undefined" != typeof exports) e(module, exports); else {
        var i = {exports: {}};
        e(i, i.exports), t.WOW = i.exports
    }
}(this, function (t, e) {
    "use strict";

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function n(t, e) {
        return e.indexOf(t) >= 0
    }

    function s(t, e, i) {
        null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
    }

    function o(t, e, i) {
        null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var r, a, l = function () {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }

            return function (e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }(), h = window.WeakMap || window.MozWeakMap || function () {
            function t() {
                i(this, t), this.keys = [], this.values = []
            }

            return l(t, [{
                key: "get", value: function (t) {
                    for (var e = 0; e < this.keys.length; e++) {
                        if (this.keys[e] === t) return this.values[e]
                    }
                }
            }, {
                key: "set", value: function (t, e) {
                    for (var i = 0; i < this.keys.length; i++) {
                        if (this.keys[i] === t) return this.values[i] = e, this
                    }
                    return this.keys.push(t), this.values.push(e), this
                }
            }]), t
        }(),
        p = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (a = r = function () {
            function t() {
                i(this, t), "undefined" != typeof console && null !== console && (console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))
            }

            return l(t, [{
                key: "observe", value: function () {
                }
            }]), t
        }(), r.notSupported = !0, a), c = window.getComputedStyle || function (t) {
            var e = /(\-([a-z]){1})/g;
            return {
                getPropertyValue: function (i) {
                    "float" === i && (i = "styleFloat"), e.test(i) && i.replace(e, function (t, e) {
                        return e.toUpperCase()
                    });
                    var n = t.currentStyle;
                    return (null != n ? n[i] : void 0) || null
                }
            }
        }, d = function () {
            function t() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                i(this, t), this.defaults = {
                    boxClass: "wow",
                    animateClass: "animated",
                    offset: 0,
                    mobile: !0,
                    live: !0,
                    callback: null,
                    scrollContainer: null,
                    resetAnimation: !0
                }, this.animate = "requestAnimationFrame" in window ? function (t) {
                    return window.requestAnimationFrame(t)
                } : function (t) {
                    return t()
                }, this.vendors = ["moz", "webkit"], this.start = this.start.bind(this), this.resetAnimation = this.resetAnimation.bind(this), this.scrollHandler = this.scrollHandler.bind(this), this.scrollCallback = this.scrollCallback.bind(this), this.scrolled = !0, this.config = function (t, e) {
                    for (var i in e) if (null == t[i]) {
                        var n = e[i];
                        t[i] = n
                    }
                    return t
                }(e, this.defaults), null != e.scrollContainer && (this.config.scrollContainer = document.querySelector(e.scrollContainer)), this.animationNameCache = new h, this.wowEvent = function (t) {
                    var e = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1],
                        i = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
                        n = arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3], s = void 0;
                    return null != document.createEvent ? (s = document.createEvent("CustomEvent")).initCustomEvent(t, e, i, n) : null != document.createEventObject ? (s = document.createEventObject(), s.eventType = t) : s.eventName = t, s
                }(this.config.boxClass)
            }

            return l(t, [{
                key: "init", value: function () {
                    this.element = window.document.documentElement, n(document.readyState, ["interactive", "complete"]) ? this.start() : s(document, "DOMContentLoaded", this.start), this.finished = []
                }
            }, {
                key: "start", value: function () {
                    var t = this;
                    if (this.stopped = !1, this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass)), this.all = this.boxes.slice(0), this.boxes.length) if (this.disabled()) this.resetStyle(); else for (var e = 0; e < this.boxes.length; e++) {
                        var i = this.boxes[e];
                        this.applyStyle(i, !0)
                    }
                    if (this.disabled() || (s(this.config.scrollContainer || window, "scroll", this.scrollHandler), s(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live) {
                        new p(function (e) {
                            for (var i = 0; i < e.length; i++) for (var n = e[i], s = 0; s < n.addedNodes.length; s++) {
                                var o = n.addedNodes[s];
                                t.doSync(o)
                            }
                        }).observe(document.body, {childList: !0, subtree: !0})
                    }
                }
            }, {
                key: "stop", value: function () {
                    this.stopped = !0, o(this.config.scrollContainer || window, "scroll", this.scrollHandler), o(window, "resize", this.scrollHandler), null != this.interval && clearInterval(this.interval)
                }
            }, {
                key: "sync", value: function () {
                    p.notSupported && this.doSync(this.element)
                }
            }, {
                key: "doSync", value: function (t) {
                    if (void 0 !== t && null !== t || (t = this.element), 1 === t.nodeType) for (var e = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass), i = 0; i < e.length; i++) {
                        var s = e[i];
                        n(s, this.all) || (this.boxes.push(s), this.all.push(s), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(s, !0), this.scrolled = !0)
                    }
                }
            }, {
                key: "show", value: function (t) {
                    return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), function (t, e) {
                        null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) && t["on" + e]()
                    }(t, this.wowEvent), this.config.resetAnimation && (s(t, "animationend", this.resetAnimation), s(t, "oanimationend", this.resetAnimation), s(t, "webkitAnimationEnd", this.resetAnimation), s(t, "MSAnimationEnd", this.resetAnimation)), t
                }
            }, {
                key: "applyStyle", value: function (t, e) {
                    var i = this, n = t.getAttribute("data-wow-duration"), s = t.getAttribute("data-wow-delay"),
                        o = t.getAttribute("data-wow-iteration");
                    return this.animate(function () {
                        return i.customStyle(t, e, n, s, o)
                    })
                }
            }, {
                key: "resetStyle", value: function () {
                    for (var t = 0; t < this.boxes.length; t++) {
                        this.boxes[t].style.visibility = "visible"
                    }
                }
            }, {
                key: "resetAnimation", value: function (t) {
                    if (t.type.toLowerCase().indexOf("animationend") >= 0) {
                        var e = t.target || t.srcElement;
                        e.className = e.className.replace(this.config.animateClass, "").trim()
                    }
                }
            }, {
                key: "customStyle", value: function (t, e, i, n, s) {
                    return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {animationDuration: i}), n && this.vendorSet(t.style, {animationDelay: n}), s && this.vendorSet(t.style, {animationIterationCount: s}), this.vendorSet(t.style, {animationName: e ? "none" : this.cachedAnimationName(t)}), t
                }
            }, {
                key: "vendorSet", value: function (t, e) {
                    for (var i in e) if (e.hasOwnProperty(i)) {
                        var n = e[i];
                        t["" + i] = n;
                        for (var s = 0; s < this.vendors.length; s++) {
                            t["" + this.vendors[s] + i.charAt(0).toUpperCase() + i.substr(1)] = n
                        }
                    }
                }
            }, {
                key: "vendorCSS", value: function (t, e) {
                    for (var i = c(t), n = i.getPropertyCSSValue(e), s = 0; s < this.vendors.length; s++) {
                        var o = this.vendors[s];
                        n = n || i.getPropertyCSSValue("-" + o + "-" + e)
                    }
                    return n
                }
            }, {
                key: "animationName", value: function (t) {
                    var e = void 0;
                    try {
                        e = this.vendorCSS(t, "animation-name").cssText
                    } catch (i) {
                        e = c(t).getPropertyValue("animation-name")
                    }
                    return "none" === e ? "" : e
                }
            }, {
                key: "cacheAnimationName", value: function (t) {
                    return this.animationNameCache.set(t, this.animationName(t))
                }
            }, {
                key: "cachedAnimationName", value: function (t) {
                    return this.animationNameCache.get(t)
                }
            }, {
                key: "scrollHandler", value: function () {
                    this.scrolled = !0
                }
            }, {
                key: "scrollCallback", value: function () {
                    if (this.scrolled) {
                        this.scrolled = !1;
                        for (var t = [], e = 0; e < this.boxes.length; e++) {
                            var i = this.boxes[e];
                            if (i) {
                                if (this.isVisible(i)) {
                                    this.show(i);
                                    continue
                                }
                                t.push(i)
                            }
                        }
                        this.boxes = t, this.boxes.length || this.config.live || this.stop()
                    }
                }
            }, {
                key: "offsetTop", value: function (t) {
                    for (; void 0 === t.offsetTop;) t = t.parentNode;
                    for (var e = t.offsetTop; t.offsetParent;) t = t.offsetParent, e += t.offsetTop;
                    return e
                }
            }, {
                key: "isVisible", value: function (t) {
                    var e = t.getAttribute("data-wow-offset") || this.config.offset,
                        i = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset,
                        n = i + Math.min(this.element.clientHeight, "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight) - e,
                        s = this.offsetTop(t), o = s + t.clientHeight;
                    return n >= s && o >= i
                }
            }, {
                key: "disabled", value: function () {
                    return !this.config.mobile && function (t) {
                        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
                    }(navigator.userAgent)
                }
            }]), t
        }();
    e.default = d, t.exports = e.default
});