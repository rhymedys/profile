/**
 * Copyright (c) 2016 Xinhuanet Inc. All rights reserved.
 * rio2016
 * @time 2016-07-14-09.46.31
 */
! function(a) {
    a.fn.extend({
        slimScroll: function(b) {
            var c = a.extend({
                width: "auto",
                height: "250px",
                size: "2px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "2px",
                railBorderRadius: "2px"
            }, b);
            return this.each(function() {
                function d(b) {
                    if (j) {
                        b = b || window.event;
                        var d = 0;
                        b.wheelDelta && (d = -b.wheelDelta / 120), b.detail && (d = b.detail / 3), a(b.target || b.srcTarget || b.srcElement).closest("." + c.wrapperClass).is(s.parent()) && e(d, !0), b.preventDefault && !r && b.preventDefault(), r || (b.returnValue = !1)
                    }
                }

                function e(a, b, d) {
                    r = !1;
                    var e = a,
                        f = s.outerHeight() - v.outerHeight();
                    b && (e = parseInt(v.css("top")) + a * parseInt(c.wheelStep) / 100 * v.outerHeight(), e = Math.min(Math.max(e, 0), f), e = 0 < a ? Math.ceil(e) : Math.floor(e), v.css({
                        top: e + "px"
                    })), p = parseInt(v.css("top")) / (s.outerHeight() - v.outerHeight()), e = p * (s[0].scrollHeight - s.outerHeight()), d && (e = a, a = e / s[0].scrollHeight * s.outerHeight(), a = Math.min(Math.max(a, 0), f), v.css({
                        top: a + "px"
                    })), s.scrollTop(e), s.trigger("slimscrolling", ~~e), h(), i()
                }

                function f() {
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", d, !1), this.addEventListener("mousewheel", d, !1)) : document.attachEvent("onmousewheel", d)
                }

                function g() {
                    o = Math.max(s.outerHeight() / s[0].scrollHeight * s.outerHeight(), 30), v.css({
                        height: o + "px"
                    });
                    var a = o == s.outerHeight() ? "none" : "block";
                    v.css({
                        display: a
                    })
                }

                function h() {
                    g(), clearTimeout(m), p == ~~p ? (r = c.allowPageScroll, q != p && s.trigger("slimscroll", 0 == ~~p ? "top" : "bottom")) : r = !1, q = p, o >= s.outerHeight() ? r = !0 : (v.stop(!0, !0).fadeIn("fast"), c.railVisible && w.stop(!0, !0).fadeIn("fast"))
                }

                function i() {
                    c.alwaysVisible || (m = setTimeout(function() {
                        c.disableFadeOut && j || k || l || (v.fadeOut("slow"), w.fadeOut("slow"))
                    }, 1e3))
                }
                var j, k, l, m, n, o, p, q, r = !1,
                    s = a(this);
                if (s.parent().hasClass(c.wrapperClass)) {
                    var u = s.scrollTop(),
                        v = s.parent().find("." + c.barClass),
                        w = s.parent().find("." + c.railClass);
                    if (g(), a.isPlainObject(b)) {
                        if ("height" in b && "auto" == b.height) {
                            s.parent().css("height", "auto"), s.css("height", "auto");
                            var x = s.parent().parent().height();
                            s.parent().css("height", x), s.css("height", x)
                        }
                        if ("scrollTo" in b) u = parseInt(c.scrollTo);
                        else if ("scrollBy" in b) u += parseInt(c.scrollBy);
                        else if ("destroy" in b) return v.remove(), w.remove(), void s.unwrap();
                        e(u, !1, !0)
                    }
                } else if (!(a.isPlainObject(b) && "destroy" in b)) {
                    c.height = "auto" == c.height ? s.parent().height() : c.height, u = a("<div></div>").addClass(c.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: c.width,
                        height: c.height
                    }), s.css({
                        overflow: "hidden",
                        width: c.width,
                        height: c.height
                    });
                    var w = a("<div></div>").addClass(c.railClass).css({
                            width: c.size,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            display: c.alwaysVisible && c.railVisible ? "block" : "none",
                            "border-radius": c.railBorderRadius,
                            background: c.railColor,
                            opacity: c.railOpacity,
                            zIndex: 90
                        }),
                        v = a("<div></div>").addClass(c.barClass).css({
                            background: c.color,
                            width: c.size,
                            position: "absolute",
                            top: 0,
                            opacity: c.opacity,
                            display: c.alwaysVisible ? "block" : "none",
                            "border-radius": c.borderRadius,
                            BorderRadius: c.borderRadius,
                            MozBorderRadius: c.borderRadius,
                            WebkitBorderRadius: c.borderRadius,
                            zIndex: 99
                        }),
                        x = "right" == c.position ? {
                            right: c.distance
                        } : {
                            left: c.distance
                        };
                    w.css(x), v.css(x), s.wrap(u), s.parent().append(v), s.parent().append(w), c.railDraggable && v.bind("mousedown", function(b) {
                        var c = a(document);
                        return l = !0, t = parseFloat(v.css("top")), pageY = b.pageY, c.bind("mousemove.slimscroll", function(a) {
                            currTop = t + a.pageY - pageY, v.css("top", currTop), e(0, v.position().top, !1)
                        }), c.bind("mouseup.slimscroll", function(a) {
                            l = !1, i(), c.unbind(".slimscroll")
                        }), !1
                    }).bind("selectstart.slimscroll", function(a) {
                        return a.stopPropagation(), a.preventDefault(), !1
                    }), w.hover(function() {
                        h()
                    }, function() {
                        i()
                    }), v.hover(function() {
                        k = !0
                    }, function() {
                        k = !1
                    }), s.hover(function() {
                        j = !0, h(), i()
                    }, function() {
                        j = !1, i()
                    }), s.bind("touchstart", function(a, b) {
                        a.originalEvent.touches.length && (n = a.originalEvent.touches[0].pageY)
                    }), s.bind("touchmove", function(a) {
                        r || a.originalEvent.preventDefault(), a.originalEvent.touches.length && (e((n - a.originalEvent.touches[0].pageY) / c.touchScrollStep, !0), n = a.originalEvent.touches[0].pageY)
                    }), g(), "bottom" === c.start ? (v.css({
                        top: s.outerHeight() - v.outerHeight()
                    }), e(0, !0)) : "top" !== c.start && (e(a(c.start).position().top, null, !0), c.alwaysVisible || v.hide()), f()
                }
            }), this
        }
    }), a.fn.extend({
        slimscroll: a.fn.slimScroll
    })
}(jQuery);
