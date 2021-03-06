/*
  21.09.17
  WordPress Xidipity Theme
  Tinymce add-table plugin
  purpose:  add table
  source:   github.com/WpThemeDev/xidipity/
  (C) https://doc.xidipity.com/license/
*/
!(function () {
  "use strict";
  var n,
    e,
    t,
    r,
    o,
    i,
    u = tinymce.util.Tools.resolve("tinymce.PluginManager"),
    a = function (n) {
      return function () {
        return n;
      };
    },
    c = a(!1),
    l = a(!0),
    y = {
      noop: function () {
        for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
      },
      noarg: function (t) {
        return function () {
          for (var n = [], e = 0; e < arguments.length; e++)
            n[e] = arguments[e];
          return t();
        };
      },
      compose: function (t, r) {
        return function () {
          for (var n = [], e = 0; e < arguments.length; e++)
            n[e] = arguments[e];
          return t(r.apply(null, arguments));
        };
      },
      constant: a,
      identity: function (n) {
        return n;
      },
      tripleEquals: function (n, e) {
        return n === e;
      },
      curry: function (i) {
        for (var n = [], e = 1; e < arguments.length; e++)
          n[e - 1] = arguments[e];
        for (
          var u = new Array(arguments.length - 1), t = 1;
          t < arguments.length;
          t++
        )
          u[t - 1] = arguments[t];
        return function () {
          for (var n = [], e = 0; e < arguments.length; e++)
            n[e] = arguments[e];
          for (var t = new Array(arguments.length), r = 0; r < t.length; r++)
            t[r] = arguments[r];
          var o = u.concat(t);
          return i.apply(null, o);
        };
      },
      not: function (t) {
        return function () {
          for (var n = [], e = 0; e < arguments.length; e++)
            n[e] = arguments[e];
          return !t.apply(null, arguments);
        };
      },
      die: function (n) {
        return function () {
          throw new Error(n);
        };
      },
      apply: function (n) {
        return n();
      },
      call: function (n) {
        n();
      },
      never: c,
      always: l,
    },
    s = y.never,
    f = y.always,
    d = function () {
      return m;
    },
    m =
      ((r = {
        fold: function (n, e) {
          return n();
        },
        is: s,
        isSome: s,
        isNone: f,
        getOr: (t = function (n) {
          return n;
        }),
        getOrThunk: (e = function (n) {
          return n();
        }),
        getOrDie: function (n) {
          throw new Error(n || "error: getOrDie called on none.");
        },
        or: t,
        orThunk: e,
        map: d,
        ap: d,
        each: function () {},
        bind: d,
        flatten: d,
        exists: s,
        forall: f,
        filter: d,
        equals: (n = function (n) {
          return n.isNone();
        }),
        equals_: n,
        toArray: function () {
          return [];
        },
        toString: y.constant("none()"),
      }),
      Object.freeze && Object.freeze(r),
      r),
    g = function (t) {
      var n = function () {
          return t;
        },
        e = function () {
          return o;
        },
        r = function (n) {
          return n(t);
        },
        o = {
          fold: function (n, e) {
            return e(t);
          },
          is: function (n) {
            return t === n;
          },
          isSome: f,
          isNone: s,
          getOr: n,
          getOrThunk: n,
          getOrDie: n,
          or: e,
          orThunk: e,
          map: function (n) {
            return g(n(t));
          },
          ap: function (n) {
            return n.fold(d, function (n) {
              return g(n(t));
            });
          },
          each: function (n) {
            n(t);
          },
          bind: r,
          flatten: n,
          exists: r,
          forall: r,
          filter: function (n) {
            return n(t) ? o : m;
          },
          equals: function (n) {
            return n.is(t);
          },
          equals_: function (n, e) {
            return n.fold(s, function (n) {
              return e(t, n);
            });
          },
          toArray: function () {
            return [t];
          },
          toString: function () {
            return "some(" + t + ")";
          },
        };
      return o;
    },
    x = {
      some: g,
      none: d,
      from: function (n) {
        return null === n || n === undefined ? m : g(n);
      },
    },
    h = function (e) {
      return function (n) {
        return (
          (function (n) {
            if (null === n) return "null";
            var e = typeof n;
            return "object" === e && Array.prototype.isPrototypeOf(n)
              ? "array"
              : "object" === e && String.prototype.isPrototypeOf(n)
              ? "string"
              : e;
          })(n) === e
        );
      };
    },
    p = {
      isString: h("string"),
      isObject: h("object"),
      isArray: h("array"),
      isNull: h("null"),
      isBoolean: h("boolean"),
      isUndefined: h("undefined"),
      isFunction: h("function"),
      isNumber: h("number"),
    },
    v =
      (o = Array.prototype.indexOf) === undefined
        ? function (n, e) {
            return D(n, e);
          }
        : function (n, e) {
            return o.call(n, e);
          },
    b = function (n, e) {
      return -1 < v(n, e);
    },
    w = function (n, e) {
      for (var t = n.length, r = new Array(t), o = 0; o < t; o++) {
        var i = n[o];
        r[o] = e(i, o, n);
      }
      return r;
    },
    C = function (n, e) {
      for (var t = 0, r = n.length; t < r; t++) e(n[t], t, n);
    },
    R = function (n, e) {
      for (var t = n.length - 1; 0 <= t; t--) e(n[t], t, n);
    },
    S = function (n, e) {
      for (var t = [], r = 0, o = n.length; r < o; r++) {
        var i = n[r];
        e(i, r, n) && t.push(i);
      }
      return t;
    },
    T = function (n, e) {
      for (var t = 0, r = n.length; t < r; t++)
        if (e(n[t], t, n)) return x.some(t);
      return x.none();
    },
    D = function (n, e) {
      for (var t = 0, r = n.length; t < r; ++t) if (n[t] === e) return t;
      return -1;
    },
    k = Array.prototype.push,
    A = function (n) {
      for (var e = [], t = 0, r = n.length; t < r; ++t) {
        if (!Array.prototype.isPrototypeOf(n[t]))
          throw new Error(
            "Arr.flatten item " + t + " was not an array, input: " + n
          );
        k.apply(e, n[t]);
      }
      return e;
    },
    O = function (n, e) {
      for (var t = 0, r = n.length; t < r; ++t)
        if (!0 !== e(n[t], t, n)) return !1;
      return !0;
    },
    N = Array.prototype.slice,
    E = p.isFunction(Array.from)
      ? Array.from
      : function (n) {
          return N.call(n);
        },
    P = {
      map: w,
      each: C,
      eachr: R,
      partition: function (n, e) {
        for (var t = [], r = [], o = 0, i = n.length; o < i; o++) {
          var u = n[o];
          (e(u, o, n) ? t : r).push(u);
        }
        return {
          pass: t,
          fail: r,
        };
      },
      filter: S,
      groupBy: function (n, e) {
        if (0 === n.length) return [];
        for (var t = e(n[0]), r = [], o = [], i = 0, u = n.length; i < u; i++) {
          var a = n[i],
            c = e(a);
          c !== t && (r.push(o), (o = [])), (t = c), o.push(a);
        }
        return 0 !== o.length && r.push(o), r;
      },
      indexOf: function (n, e) {
        var t = v(n, e);
        return -1 === t ? x.none() : x.some(t);
      },
      foldr: function (n, e, t) {
        return (
          R(n, function (n) {
            t = e(t, n);
          }),
          t
        );
      },
      foldl: function (n, e, t) {
        return (
          C(n, function (n) {
            t = e(t, n);
          }),
          t
        );
      },
      find: function (n, e) {
        for (var t = 0, r = n.length; t < r; t++) {
          var o = n[t];
          if (e(o, t, n)) return x.some(o);
        }
        return x.none();
      },
      findIndex: T,
      flatten: A,
      bind: function (n, e) {
        var t = w(n, e);
        return A(t);
      },
      forall: O,
      exists: function (n, e) {
        return T(n, e).isSome();
      },
      contains: b,
      equal: function (n, t) {
        return (
          n.length === t.length &&
          O(n, function (n, e) {
            return n === t[e];
          })
        );
      },
      reverse: function (n) {
        var e = N.call(n, 0);
        return e.reverse(), e;
      },
      chunk: function (n, e) {
        for (var t = [], r = 0; r < n.length; r += e) {
          var o = n.slice(r, r + e);
          t.push(o);
        }
        return t;
      },
      difference: function (n, e) {
        return S(n, function (n) {
          return !b(e, n);
        });
      },
      mapToObject: function (n, e) {
        for (var t = {}, r = 0, o = n.length; r < o; r++) {
          var i = n[r];
          t[String(i)] = e(i, r);
        }
        return t;
      },
      pure: function (n) {
        return [n];
      },
      sort: function (n, e) {
        var t = N.call(n, 0);
        return t.sort(e), t;
      },
      range: function (n, e) {
        for (var t = [], r = 0; r < n; r++) t.push(e(r));
        return t;
      },
      head: function (n) {
        return 0 === n.length ? x.none() : x.some(n[0]);
      },
      last: function (n) {
        return 0 === n.length ? x.none() : x.some(n[n.length - 1]);
      },
      from: E,
    },
    B =
      (i = Object.keys) === undefined
        ? function (n) {
            var e = [];
            for (var t in n) n.hasOwnProperty(t) && e.push(t);
            return e;
          }
        : i,
    I = function (n, e) {
      for (var t = B(n), r = 0, o = t.length; r < o; r++) {
        var i = t[r];
        e(n[i], i, n);
      }
    },
    W = function (r, o) {
      var i = {};
      return (
        I(r, function (n, e) {
          var t = o(n, e, r);
          i[t.k] = t.v;
        }),
        i
      );
    },
    M = function (n, t) {
      var r = [];
      return (
        I(n, function (n, e) {
          r.push(t(n, e));
        }),
        r
      );
    },
    L = function (n) {
      return M(n, function (n) {
        return n;
      });
    },
    q = {
      bifilter: function (n, t) {
        var r = {},
          o = {};
        return (
          I(n, function (n, e) {
            (t(n, e) ? r : o)[e] = n;
          }),
          {
            t: r,
            f: o,
          }
        );
      },
      each: I,
      map: function (n, r) {
        return W(n, function (n, e, t) {
          return {
            k: e,
            v: r(n, e, t),
          };
        });
      },
      mapToArray: M,
      tupleMap: W,
      find: function (n, e) {
        for (var t = B(n), r = 0, o = t.length; r < o; r++) {
          var i = t[r],
            u = n[i];
          if (e(u, i, n)) return x.some(u);
        }
        return x.none();
      },
      keys: B,
      values: L,
      size: function (n) {
        return L(n).length;
      },
    },
    j = function (n) {
      return n.slice(0).sort();
    },
    _ = function (n, e) {
      throw new Error(
        "All required keys (" +
          j(n).join(", ") +
          ") were not specified. Specified keys were: " +
          j(e).join(", ") +
          "."
      );
    },
    z = function (n) {
      throw new Error("Unsupported keys for object: " + j(n).join(", "));
    },
    H = function (e, n) {
      if (!p.isArray(n))
        throw new Error(
          "The " + e + " fields must be an array. Was: " + n + "."
        );
      P.each(n, function (n) {
        if (!p.isString(n))
          throw new Error(
            "The value " + n + " in the " + e + " fields was not a string."
          );
      });
    },
    F = function (n, e) {
      throw new Error(
        "All values need to be of type: " +
          e +
          ". Keys (" +
          j(n).join(", ") +
          ") were not."
      );
    },
    U = function (n) {
      var t = j(n);
      P.find(t, function (n, e) {
        return e < t.length - 1 && n === t[e + 1];
      }).each(function (n) {
        throw new Error(
          "The field: " +
            n +
            " occurs more than once in the combined fields: [" +
            t.join(", ") +
            "]."
        );
      });
    },
    V = {
      immutable: function () {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        return function () {
          for (var t = [], n = 0; n < arguments.length; n++)
            t[n] = arguments[n];
          if (e.length !== t.length)
            throw new Error(
              'Wrong number of arguments to struct. Expected "[' +
                e.length +
                ']", got ' +
                t.length +
                " arguments"
            );
          var r = {};
          return (
            P.each(e, function (n, e) {
              r[n] = y.constant(t[e]);
            }),
            r
          );
        };
      },
      immutableBag: function (o, i) {
        var u = o.concat(i);
        if (0 === u.length)
          throw new Error(
            "You must specify at least one required or optional field."
          );
        return (
          H("required", o),
          H("optional", i),
          U(u),
          function (e) {
            var t = q.keys(e);
            P.forall(o, function (n) {
              return P.contains(t, n);
            }) || _(o, t);
            var n = P.filter(t, function (n) {
              return !P.contains(u, n);
            });
            0 < n.length && z(n);
            var r = {};
            return (
              P.each(o, function (n) {
                r[n] = y.constant(e[n]);
              }),
              P.each(i, function (n) {
                r[n] = y.constant(
                  Object.prototype.hasOwnProperty.call(e, n)
                    ? x.some(e[n])
                    : x.none()
                );
              }),
              r
            );
          }
        );
      },
    },
    G = V.immutable("width", "height"),
    X = V.immutable("rows", "columns"),
    Y = V.immutable("row", "column"),
    K = V.immutable("x", "y"),
    $ = V.immutable("element", "rowspan", "colspan"),
    J = V.immutable("element", "rowspan", "colspan", "isNew"),
    Q = {
      dimensions: G,
      grid: X,
      address: Y,
      coords: K,
      extended: V.immutable("element", "rowspan", "colspan", "row", "column"),
      detail: $,
      detailnew: J,
      rowdata: V.immutable("element", "cells", "section"),
      elementnew: V.immutable("element", "isNew"),
      rowdatanew: V.immutable("element", "cells", "section", "isNew"),
      rowcells: V.immutable("cells", "section"),
      rowdetails: V.immutable("details", "section"),
      bounds: V.immutable("startRow", "startCol", "finishRow", "finishCol"),
    },
    Z = function (n) {
      if (null === n || n === undefined)
        throw new Error("Node cannot be null or undefined");
      return {
        dom: y.constant(n),
      };
    },
    nn = {
      fromHtml: function (n, e) {
        var t = (e || document).createElement("div");
        if (((t.innerHTML = n), !t.hasChildNodes() || 1 < t.childNodes.length))
          throw (
            (console.error("HTML does not have a single root node", n),
            "HTML must have a single root node")
          );
        return Z(t.childNodes[0]);
      },
      fromTag: function (n, e) {
        var t = (e || document).createElement(n);
        return Z(t);
      },
      fromText: function (n, e) {
        var t = (e || document).createTextNode(n);
        return Z(t);
      },
      fromDom: Z,
      fromPoint: function (n, e, t) {
        return x.from(n.dom().elementFromPoint(e, t)).map(Z);
      },
    },
    en = 8,
    tn = 9,
    rn = 1,
    on = 3,
    un = rn,
    an = tn,
    cn = function (n) {
      return (
        (n.nodeType !== un && n.nodeType !== an) || 0 === n.childElementCount
      );
    },
    ln = {
      all: function (n, e) {
        var t = e === undefined ? document : e.dom();
        return cn(t) ? [] : P.map(t.querySelectorAll(n), nn.fromDom);
      },
      is: function (n, e) {
        var t = n.dom();
        if (t.nodeType !== un) return !1;
        if (t.matches !== undefined) return t.matches(e);
        if (t.msMatchesSelector !== undefined) return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector !== undefined)
          return t.webkitMatchesSelector(e);
        if (t.mozMatchesSelector !== undefined) return t.mozMatchesSelector(e);
        throw new Error("Browser lacks native selectors");
      },
      one: function (n, e) {
        var t = e === undefined ? document : e.dom();
        return cn(t) ? x.none() : x.from(t.querySelector(n)).map(nn.fromDom);
      },
    },
    sn = function (n, e) {
      for (
        var t = [],
          r = function (n) {
            return t.push(n), e(n);
          },
          o = e(n);
        (o = o.bind(r)).isSome();

      );
      return t;
    },
    fn = "undefined" != typeof window ? window : Function("return this;")(),
    dn = function (n, e) {
      for (
        var t = e !== undefined && null !== e ? e : fn, r = 0;
        r < n.length && t !== undefined && null !== t;
        ++r
      )
        t = t[n[r]];
      return t;
    },
    mn = function (n, e) {
      var t = n.split(".");
      return dn(t, e);
    },
    gn = function (n, e) {
      var t = mn(n, e);
      if (t === undefined || null === t)
        throw n + " not available on this browser";
      return t;
    },
    hn = function () {
      return gn("Node");
    },
    pn = function (n, e, t) {
      return 0 != (n.compareDocumentPosition(e) & t);
    },
    vn = function (n, e) {
      return pn(n, e, hn().DOCUMENT_POSITION_CONTAINED_BY);
    },
    bn = function (n) {
      var e,
        t = !1;
      return function () {
        return t || ((t = !0), (e = n.apply(null, arguments))), e;
      };
    },
    wn = function (n, e) {
      var t = (function (n, e) {
        for (var t = 0; t < n.length; t++) {
          var r = n[t];
          if (r.test(e)) return r;
        }
        return undefined;
      })(n, e);
      if (!t)
        return {
          major: 0,
          minor: 0,
        };
      var r = function (n) {
        return Number(e.replace(t, "$" + n));
      };
      return xn(r(1), r(2));
    },
    yn = function () {
      return xn(0, 0);
    },
    xn = function (n, e) {
      return {
        major: n,
        minor: e,
      };
    },
    Cn = {
      nu: xn,
      detect: function (n, e) {
        var t = String(e).toLowerCase();
        return 0 === n.length ? yn() : wn(n, t);
      },
      unknown: yn,
    },
    Rn = "Firefox",
    Sn = function (n, e) {
      return function () {
        return e === n;
      };
    },
    Tn = function (n) {
      var e = n.current;
      return {
        current: e,
        version: n.version,
        isEdge: Sn("Edge", e),
        isChrome: Sn("Chrome", e),
        isIE: Sn("IE", e),
        isOpera: Sn("Opera", e),
        isFirefox: Sn(Rn, e),
        isSafari: Sn("Safari", e),
      };
    },
    Dn = {
      unknown: function () {
        return Tn({
          current: undefined,
          version: Cn.unknown(),
        });
      },
      nu: Tn,
      edge: y.constant("Edge"),
      chrome: y.constant("Chrome"),
      ie: y.constant("IE"),
      opera: y.constant("Opera"),
      firefox: y.constant(Rn),
      safari: y.constant("Safari"),
    },
    kn = "Windows",
    An = "Android",
    On = "Solaris",
    Nn = "FreeBSD",
    En = function (n, e) {
      return function () {
        return e === n;
      };
    },
    Pn = function (n) {
      var e = n.current;
      return {
        current: e,
        version: n.version,
        isWindows: En(kn, e),
        isiOS: En("iOS", e),
        isAndroid: En(An, e),
        isOSX: En("OSX", e),
        isLinux: En("Linux", e),
        isSolaris: En(On, e),
        isFreeBSD: En(Nn, e),
      };
    },
    Bn = {
      unknown: function () {
        return Pn({
          current: undefined,
          version: Cn.unknown(),
        });
      },
      nu: Pn,
      windows: y.constant(kn),
      ios: y.constant("iOS"),
      android: y.constant(An),
      linux: y.constant("Linux"),
      osx: y.constant("OSX"),
      solaris: y.constant(On),
      freebsd: y.constant(Nn),
    },
    In = function (n, e) {
      var t = String(e).toLowerCase();
      return P.find(n, function (n) {
        return n.search(t);
      });
    },
    Wn = function (n, t) {
      return In(n, t).map(function (n) {
        var e = Cn.detect(n.versionRegexes, t);
        return {
          current: n.name,
          version: e,
        };
      });
    },
    Mn = function (n, t) {
      return In(n, t).map(function (n) {
        var e = Cn.detect(n.versionRegexes, t);
        return {
          current: n.name,
          version: e,
        };
      });
    },
    Ln = function (n, e) {
      return e + n;
    },
    qn = function (n, e) {
      return n + e;
    },
    jn = function (n, e) {
      return n.substring(e);
    },
    _n = function (n, e) {
      return n.substring(0, n.length - e);
    },
    zn = function (n) {
      return "" === n ? x.none() : x.some(n.substr(0, 1));
    },
    Hn = function (n) {
      return "" === n ? x.none() : x.some(n.substring(1));
    },
    Fn = function (n, e, t) {
      return (
        "" === e || (!(n.length < e.length) && n.substr(t, t + e.length) === e)
      );
    },
    Un = function (n, e) {
      return Fn(n, e, 0);
    },
    Vn = function (n, e) {
      return Fn(n, e, n.length - e.length);
    },
    Gn = {
      supplant: function (n, o) {
        return n.replace(/\${([^{}]*)}/g, function (n, e) {
          var t,
            r = o[e];
          return "string" == (t = typeof r) || "number" === t ? r : n;
        });
      },
      startsWith: Un,
      removeLeading: function (n, e) {
        return Un(n, e) ? jn(n, e.length) : n;
      },
      removeTrailing: function (n, e) {
        return Vn(n, e) ? _n(n, e.length) : n;
      },
      ensureLeading: function (n, e) {
        return Un(n, e) ? n : Ln(n, e);
      },
      ensureTrailing: function (n, e) {
        return Vn(n, e) ? n : qn(n, e);
      },
      endsWith: Vn,
      contains: function (n, e) {
        return -1 !== n.indexOf(e);
      },
      trim: function (n) {
        return n.replace(/^\s+|\s+$/g, "");
      },
      lTrim: function (n) {
        return n.replace(/^\s+/g, "");
      },
      rTrim: function (n) {
        return n.replace(/\s+$/g, "");
      },
      capitalize: function (n) {
        return zn(n)
          .bind(function (e) {
            return Hn(n).map(function (n) {
              return e.toUpperCase() + n;
            });
          })
          .getOr(n);
      },
    },
    Xn = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
    Yn = function (e) {
      return function (n) {
        return Gn.contains(n, e);
      };
    },
    Kn = [
      {
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (n) {
          return (
            Gn.contains(n, "edge/") &&
            Gn.contains(n, "chrome") &&
            Gn.contains(n, "safari") &&
            Gn.contains(n, "applewebkit")
          );
        },
      },
      {
        name: "Chrome",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, Xn],
        search: function (n) {
          return Gn.contains(n, "chrome") && !Gn.contains(n, "chromeframe");
        },
      },
      {
        name: "IE",
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/,
        ],
        search: function (n) {
          return Gn.contains(n, "msie") || Gn.contains(n, "trident");
        },
      },
      {
        name: "Opera",
        versionRegexes: [Xn, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: Yn("opera"),
      },
      {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: Yn("firefox"),
      },
      {
        name: "Safari",
        versionRegexes: [Xn, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: function (n) {
          return (
            (Gn.contains(n, "safari") || Gn.contains(n, "mobile/")) &&
            Gn.contains(n, "applewebkit")
          );
        },
      },
    ],
    $n = [
      {
        name: "Windows",
        search: Yn("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/],
      },
      {
        name: "iOS",
        search: function (n) {
          return Gn.contains(n, "iphone") || Gn.contains(n, "ipad");
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/,
        ],
      },
      {
        name: "Android",
        search: Yn("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/],
      },
      {
        name: "OSX",
        search: Yn("os x"),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/],
      },
      {
        name: "Linux",
        search: Yn("linux"),
        versionRegexes: [],
      },
      {
        name: "Solaris",
        search: Yn("sunos"),
        versionRegexes: [],
      },
      {
        name: "FreeBSD",
        search: Yn("freebsd"),
        versionRegexes: [],
      },
    ],
    Jn = {
      browsers: y.constant(Kn),
      oses: y.constant($n),
    },
    Qn = function (n) {
      var e,
        t,
        r,
        o,
        i,
        u,
        a,
        c,
        l,
        s,
        f,
        d = Jn.browsers(),
        m = Jn.oses(),
        g = Wn(d, n).fold(Dn.unknown, Dn.nu),
        h = Mn(m, n).fold(Bn.unknown, Bn.nu);
      return {
        browser: g,
        os: h,
        deviceType:
          ((t = g),
          (r = n),
          (o = (e = h).isiOS() && !0 === /ipad/i.test(r)),
          (i = e.isiOS() && !o),
          (u = e.isAndroid() && 3 === e.version.major),
          (a = e.isAndroid() && 4 === e.version.major),
          (c = o || u || (a && !0 === /mobile/i.test(r))),
          (l = e.isiOS() || e.isAndroid()),
          (s = l && !c),
          (f = t.isSafari() && e.isiOS() && !1 === /safari/i.test(r)),
          {
            isiPad: y.constant(o),
            isiPhone: y.constant(i),
            isTablet: y.constant(c),
            isPhone: y.constant(s),
            isTouch: y.constant(l),
            isAndroid: e.isAndroid,
            isiOS: e.isiOS,
            isWebView: y.constant(f),
          }),
      };
    },
    Zn = {
      detect: bn(function () {
        var n = navigator.userAgent;
        return Qn(n);
      }),
    },
    ne = function (n, e) {
      return n.dom() === e.dom();
    },
    ee = Zn.detect().browser.isIE()
      ? function (n, e) {
          return vn(n.dom(), e.dom());
        }
      : function (n, e) {
          var t = n.dom(),
            r = e.dom();
          return t !== r && t.contains(r);
        },
    te = {
      eq: ne,
      isEqualNode: function (n, e) {
        return n.dom().isEqualNode(e.dom());
      },
      member: function (n, e) {
        return P.exists(e, y.curry(ne, n));
      },
      contains: ee,
      is: ln.is,
    },
    re = function (n) {
      return nn.fromDom(n.dom().ownerDocument);
    },
    oe = function (n) {
      var e = n.dom();
      return x.from(e.parentNode).map(nn.fromDom);
    },
    ie = function (n) {
      var e = n.dom();
      return x.from(e.previousSibling).map(nn.fromDom);
    },
    ue = function (n) {
      var e = n.dom();
      return x.from(e.nextSibling).map(nn.fromDom);
    },
    ae = function (n) {
      var e = n.dom();
      return P.map(e.childNodes, nn.fromDom);
    },
    ce = function (n, e) {
      var t = n.dom().childNodes;
      return x.from(t[e]).map(nn.fromDom);
    },
    le = V.immutable("element", "offset"),
    se = {
      owner: re,
      defaultView: function (n) {
        var e = n.dom().ownerDocument.defaultView;
        return nn.fromDom(e);
      },
      documentElement: function (n) {
        var e = re(n);
        return nn.fromDom(e.dom().documentElement);
      },
      parent: oe,
      findIndex: function (t) {
        return oe(t).bind(function (n) {
          var e = ae(n);
          return P.findIndex(e, function (n) {
            return te.eq(t, n);
          });
        });
      },
      parents: function (n, e) {
        for (
          var t = p.isFunction(e) ? e : y.constant(!1), r = n.dom(), o = [];
          null !== r.parentNode && r.parentNode !== undefined;

        ) {
          var i = r.parentNode,
            u = nn.fromDom(i);
          if ((o.push(u), !0 === t(u))) break;
          r = i;
        }
        return o;
      },
      siblings: function (e) {
        return oe(e)
          .map(ae)
          .map(function (n) {
            return P.filter(n, function (n) {
              return !te.eq(e, n);
            });
          })
          .getOr([]);
      },
      prevSibling: ie,
      offsetParent: function (n) {
        var e = n.dom();
        return x.from(e.offsetParent).map(nn.fromDom);
      },
      prevSiblings: function (n) {
        return P.reverse(sn(n, ie));
      },
      nextSibling: ue,
      nextSiblings: function (n) {
        return sn(n, ue);
      },
      children: ae,
      child: ce,
      firstChild: function (n) {
        return ce(n, 0);
      },
      lastChild: function (n) {
        return ce(n, n.dom().childNodes.length - 1);
      },
      childNodesCount: function (n) {
        return n.dom().childNodes.length;
      },
      hasChildNodes: function (n) {
        return n.dom().hasChildNodes();
      },
      leaf: function (n, e) {
        var t = ae(n);
        return 0 < t.length && e < t.length ? le(t[e], 0) : le(n, e);
      },
    },
    fe = function (n, e, t) {
      return P.bind(se.children(n), function (n) {
        return ln.is(n, e) ? (t(n) ? [n] : []) : fe(n, e, t);
      });
    },
    de = {
      firstLayer: function (n, e) {
        return fe(n, e, y.constant(!0));
      },
      filterFirstLayer: fe,
    },
    me = function (n) {
      return n.dom().nodeName.toLowerCase();
    },
    ge = function (n) {
      return n.dom().nodeType;
    },
    he = function (e) {
      return function (n) {
        return ge(n) === e;
      };
    },
    pe = he(rn),
    ve = he(on),
    be = he(tn),
    we = {
      name: me,
      type: ge,
      value: function (n) {
        return n.dom().nodeValue;
      },
      isElement: pe,
      isText: ve,
      isDocument: be,
      isComment: function (n) {
        return ge(n) === en || "#comment" === me(n);
      },
    },
    ye = function (n, e, t) {
      if (!(p.isString(t) || p.isBoolean(t) || p.isNumber(t)))
        throw (
          (console.error(
            "Invalid call to Attr.set. Key ",
            e,
            ":: Value ",
            t,
            ":: Element ",
            n
          ),
          new Error("Attribute value was not simple"))
        );
      n.setAttribute(e, t + "");
    },
    xe = function (n, e, t) {
      ye(n.dom(), e, t);
    },
    Ce = function (n, e) {
      var t = n.dom().getAttribute(e);
      return null === t ? undefined : t;
    },
    Re = function (n, e) {
      var t = n.dom();
      return !(!t || !t.hasAttribute) && t.hasAttribute(e);
    },
    Se = {
      clone: function (n) {
        return P.foldl(
          n.dom().attributes,
          function (n, e) {
            return (n[e.name] = e.value), n;
          },
          {}
        );
      },
      set: xe,
      setAll: function (n, e) {
        var t = n.dom();
        q.each(e, function (n, e) {
          ye(t, e, n);
        });
      },
      get: Ce,
      has: Re,
      remove: function (n, e) {
        n.dom().removeAttribute(e);
      },
      hasNone: function (n) {
        var e = n.dom().attributes;
        return e === undefined || null === e || 0 === e.length;
      },
      transfer: function (o, i, n) {
        we.isElement(o) &&
          we.isElement(i) &&
          P.each(n, function (n) {
            var e, t, r;
            (t = i), Re((e = o), (r = n)) && !Re(t, r) && xe(t, r, Ce(e, r));
          });
      },
    },
    Te = bn(function () {
      return De(nn.fromDom(document));
    }),
    De = function (n) {
      var e = n.dom().body;
      if (null === e || e === undefined) throw "Body is not available yet";
      return nn.fromDom(e);
    },
    ke = {
      body: Te,
      getBody: De,
      inBody: function (n) {
        var e = we.isText(n) ? n.dom().parentNode : n.dom();
        return (
          e !== undefined && null !== e && e.ownerDocument.body.contains(e)
        );
      },
    },
    Ae = function (n, e) {
      var t = [];
      return (
        P.each(se.children(n), function (n) {
          e(n) && (t = t.concat([n])), (t = t.concat(Ae(n, e)));
        }),
        t
      );
    },
    Oe = {
      all: function (n) {
        return Ae(ke.body(), n);
      },
      ancestors: function (n, e, t) {
        return P.filter(se.parents(n, t), e);
      },
      siblings: function (n, e) {
        return P.filter(se.siblings(n), e);
      },
      children: function (n, e) {
        return P.filter(se.children(n), e);
      },
      descendants: Ae,
    },
    Ne = {
      all: function (n) {
        return ln.all(n);
      },
      ancestors: function (n, e, t) {
        return Oe.ancestors(
          n,
          function (n) {
            return ln.is(n, e);
          },
          t
        );
      },
      siblings: function (n, e) {
        return Oe.siblings(n, function (n) {
          return ln.is(n, e);
        });
      },
      children: function (n, e) {
        return Oe.children(n, function (n) {
          return ln.is(n, e);
        });
      },
      descendants: function (n, e) {
        return ln.all(e, n);
      },
    };

  function Ee(n, e, t, r, o) {
    return n(t, r)
      ? x.some(t)
      : p.isFunction(o) && o(t)
      ? x.none()
      : e(t, r, o);
  }
  var Pe,
    Be,
    Ie,
    We,
    Me,
    Le = function (n, e, t) {
      for (
        var r = n.dom(), o = p.isFunction(t) ? t : y.constant(!1);
        r.parentNode;

      ) {
        r = r.parentNode;
        var i = nn.fromDom(r);
        if (e(i)) return x.some(i);
        if (o(i)) break;
      }
      return x.none();
    },
    qe = function (n, e) {
      return P.find(n.dom().childNodes, y.compose(e, nn.fromDom)).map(
        nn.fromDom
      );
    },
    je = function (n, r) {
      var o = function (n) {
        for (var e = 0; e < n.childNodes.length; e++) {
          if (r(nn.fromDom(n.childNodes[e])))
            return x.some(nn.fromDom(n.childNodes[e]));
          var t = o(n.childNodes[e]);
          if (t.isSome()) return t;
        }
        return x.none();
      };
      return o(n.dom());
    },
    _e = {
      first: function (n) {
        return je(ke.body(), n);
      },
      ancestor: Le,
      closest: function (n, e, t) {
        return Ee(
          function (n) {
            return e(n);
          },
          Le,
          n,
          e,
          t
        );
      },
      sibling: function (e, t) {
        var n = e.dom();
        return n.parentNode
          ? qe(nn.fromDom(n.parentNode), function (n) {
              return !te.eq(e, n) && t(n);
            })
          : x.none();
      },
      child: qe,
      descendant: je,
    },
    ze = function (n, e, t) {
      return _e.ancestor(
        n,
        function (n) {
          return ln.is(n, e);
        },
        t
      );
    },
    He = {
      first: function (n) {
        return ln.one(n);
      },
      ancestor: ze,
      sibling: function (n, e) {
        return _e.sibling(n, function (n) {
          return ln.is(n, e);
        });
      },
      child: function (n, e) {
        return _e.child(n, function (n) {
          return ln.is(n, e);
        });
      },
      descendant: function (n, e) {
        return ln.one(e, n);
      },
      closest: function (n, e, t) {
        return Ee(ln.is, ze, n, e, t);
      },
    },
    Fe = function (n, e, t) {
      var r = t !== undefined ? t : y.constant(!1);
      return r(e)
        ? x.none()
        : P.contains(n, we.name(e))
        ? x.some(e)
        : He.ancestor(e, n.join(","), function (n) {
            return ln.is(n, "table") || r(n);
          });
    },
    Ue = function (e, n) {
      return se.parent(n).map(function (n) {
        return Ne.children(n, e);
      });
    },
    Ve = y.curry(Ue, "th,td"),
    Ge = y.curry(Ue, "tr"),
    Xe = function (n, e) {
      return parseInt(Se.get(n, e), 10);
    },
    Ye = {
      cell: function (n, e) {
        return Fe(["td", "th"], n, e);
      },
      firstCell: function (n) {
        return He.descendant(n, "th,td");
      },
      cells: function (n) {
        return de.firstLayer(n, "th,td");
      },
      neighbourCells: Ve,
      table: function (n, e) {
        return He.closest(n, "table", e);
      },
      row: function (n, e) {
        return Fe(["tr"], n, e);
      },
      rows: function (n) {
        return de.firstLayer(n, "tr");
      },
      notCell: function (n, e) {
        return Fe(["caption", "tr", "tbody", "tfoot", "thead"], n, e);
      },
      neighbourRows: Ge,
      attr: Xe,
      grid: function (n, e, t) {
        var r = Xe(n, e),
          o = Xe(n, t);
        return Q.grid(r, o);
      },
    },
    Ke = function (n) {
      var e = Ye.rows(n);
      return P.map(e, function (n) {
        var e = n,
          t = se.parent(e).bind(function (n) {
            var e = we.name(n);
            return "tfoot" === e || "thead" === e || "tbody" === e
              ? e
              : "tbody";
          }),
          r = P.map(Ye.cells(n), function (n) {
            var e = Se.has(n, "rowspan")
                ? parseInt(Se.get(n, "rowspan"), 10)
                : 1,
              t = Se.has(n, "colspan") ? parseInt(Se.get(n, "colspan"), 10) : 1;
            return Q.detail(n, e, t);
          });
        return Q.rowdata(e, r, t);
      });
    },
    $e = function (n, t) {
      return P.map(n, function (n) {
        var e = P.map(Ye.cells(n), function (n) {
          var e = Se.has(n, "rowspan") ? parseInt(Se.get(n, "rowspan"), 10) : 1,
            t = Se.has(n, "colspan") ? parseInt(Se.get(n, "colspan"), 10) : 1;
          return Q.detail(n, e, t);
        });
        return Q.rowdata(n, e, t.section());
      });
    },
    Je = function (n, e) {
      return n + "," + e;
    },
    Qe = function (n, e) {
      var t = P.bind(n.all(), function (n) {
        return n.cells();
      });
      return P.filter(t, e);
    },
    Ze = {
      generate: function (n) {
        var s = {},
          e = [],
          t = n.length,
          f = 0;
        P.each(n, function (n, c) {
          var l = [];
          P.each(n.cells(), function (n, e) {
            for (var t = 0; s[Je(c, t)] !== undefined; ) t++;
            for (
              var r = Q.extended(n.element(), n.rowspan(), n.colspan(), c, t),
                o = 0;
              o < n.colspan();
              o++
            )
              for (var i = 0; i < n.rowspan(); i++) {
                var u = t + o,
                  a = Je(c + i, u);
                (s[a] = r), (f = Math.max(f, u + 1));
              }
            l.push(r);
          }),
            e.push(Q.rowdata(n.element(), l, n.section()));
        });
        var r = Q.grid(t, f);
        return {
          grid: y.constant(r),
          access: y.constant(s),
          all: y.constant(e),
        };
      },
      getAt: function (n, e, t) {
        var r = n.access()[Je(e, t)];
        return r !== undefined ? x.some(r) : x.none();
      },
      findItem: function (n, e, t) {
        var r = Qe(n, function (n) {
          return t(e, n.element());
        });
        return 0 < r.length ? x.some(r[0]) : x.none();
      },
      filterItems: Qe,
      justCells: function (n) {
        var e = P.map(n.all(), function (n) {
          return n.cells();
        });
        return P.flatten(e);
      },
    },
    nt = function (n) {
      return n.style !== undefined;
    },
    et = function (n, e, t) {
      if (!p.isString(t))
        throw (
          (console.error(
            "Invalid call to CSS.set. Property ",
            e,
            ":: Value ",
            t,
            ":: Element ",
            n
          ),
          new Error("CSS value must be a string: " + t))
        );
      nt(n) && n.style.setProperty(e, t);
    },
    tt = function (n, e) {
      nt(n) && n.style.removeProperty(e);
    },
    rt = function (n, e, t) {
      var r = n.dom();
      et(r, e, t);
    },
    ot = function (n, e) {
      return nt(n) ? n.style.getPropertyValue(e) : "";
    },
    it = function (n, e) {
      var t = n.dom(),
        r = ot(t, e);
      return x.from(r).filter(function (n) {
        return 0 < n.length;
      });
    },
    ut = {
      copy: function (n, e) {
        var t = n.dom(),
          r = e.dom();
        nt(t) && nt(r) && (r.style.cssText = t.style.cssText);
      },
      set: rt,
      preserve: function (n, e) {
        var t = Se.get(n, "style"),
          r = e(n);
        return (t === undefined ? Se.remove : Se.set)(n, "style", t), r;
      },
      setAll: function (n, e) {
        var t = n.dom();
        q.each(e, function (n, e) {
          et(t, e, n);
        });
      },
      setOptions: function (n, e) {
        var t = n.dom();
        q.each(e, function (n, e) {
          n.fold(
            function () {
              tt(t, e);
            },
            function (n) {
              et(t, e, n);
            }
          );
        });
      },
      remove: function (n, e) {
        var t = n.dom();
        tt(t, e),
          Se.has(n, "style") &&
            "" === Gn.trim(Se.get(n, "style")) &&
            Se.remove(n, "style");
      },
      get: function (n, e) {
        var t = n.dom(),
          r = window.getComputedStyle(t).getPropertyValue(e),
          o = "" !== r || ke.inBody(n) ? r : ot(t, e);
        return null === o ? undefined : o;
      },
      getRaw: it,
      getAllRaw: function (n) {
        var e = {},
          t = n.dom();
        if (nt(t))
          for (var r = 0; r < t.style.length; r++) {
            var o = t.style.item(r);
            e[o] = t.style[o];
          }
        return e;
      },
      isValidValue: function (n, e, t) {
        var r = nn.fromTag(n);
        return rt(r, e, t), it(r, e).isSome();
      },
      reflow: function (n) {
        return n.dom().offsetWidth;
      },
      transfer: function (r, o, n) {
        we.isElement(r) &&
          we.isElement(o) &&
          P.each(n, function (n) {
            var e, t;
            (e = o),
              it(r, (t = n)).each(function (n) {
                it(e, t).isNone() && rt(e, t, n);
              });
          });
      },
    },
    at = function (e, t) {
      se.parent(e).each(function (n) {
        n.dom().insertBefore(t.dom(), e.dom());
      });
    },
    ct = function (n, e) {
      n.dom().appendChild(e.dom());
    },
    lt = {
      before: at,
      after: function (n, e) {
        se.nextSibling(n).fold(
          function () {
            se.parent(n).each(function (n) {
              ct(n, e);
            });
          },
          function (n) {
            at(n, e);
          }
        );
      },
      prepend: function (e, t) {
        se.firstChild(e).fold(
          function () {
            ct(e, t);
          },
          function (n) {
            e.dom().insertBefore(t.dom(), n.dom());
          }
        );
      },
      append: ct,
      appendAt: function (n, e, t) {
        se.child(n, t).fold(
          function () {
            ct(n, e);
          },
          function (n) {
            at(n, e);
          }
        );
      },
      wrap: function (n, e) {
        at(n, e), ct(e, n);
      },
    },
    st = {
      before: function (e, n) {
        P.each(n, function (n) {
          lt.before(e, n);
        });
      },
      after: function (r, o) {
        P.each(o, function (n, e) {
          var t = 0 === e ? r : o[e - 1];
          lt.after(t, n);
        });
      },
      prepend: function (e, n) {
        P.each(n.slice().reverse(), function (n) {
          lt.prepend(e, n);
        });
      },
      append: function (e, n) {
        P.each(n, function (n) {
          lt.append(e, n);
        });
      },
    },
    ft = function (n) {
      var e = n.dom();
      null !== e.parentNode && e.parentNode.removeChild(e);
    },
    dt = {
      empty: function (n) {
        (n.dom().textContent = ""),
          P.each(se.children(n), function (n) {
            ft(n);
          });
      },
      remove: ft,
      unwrap: function (n) {
        var e = se.children(n);
        0 < e.length && st.before(n, e), ft(n);
      },
    },
    mt = V.immutable("minRow", "minCol", "maxRow", "maxCol"),
    gt = function (n, e) {
      var t,
        i,
        r,
        u,
        a,
        c,
        l,
        o,
        s,
        f,
        d = function (n) {
          return ln.is(n.element(), e);
        },
        m = Ke(n),
        g = Ze.generate(m),
        h =
          ((i = d),
          (r = (t = g).grid().columns()),
          (u = t.grid().rows()),
          (a = r),
          (l = c = 0),
          q.each(t.access(), function (n) {
            if (i(n)) {
              var e = n.row(),
                t = e + n.rowspan() - 1,
                r = n.column(),
                o = r + n.colspan() - 1;
              e < u ? (u = e) : c < t && (c = t),
                r < a ? (a = r) : l < o && (l = o);
            }
          }),
          mt(u, a, c, l)),
        p = "th:not(" + e + "),td:not(" + e + ")",
        v = de.filterFirstLayer(n, "th,td", function (n) {
          return ln.is(n, p);
        });
      return (
        P.each(v, dt.remove),
        (function (n, e, t, r) {
          for (
            var o, i, u, a = e.grid().columns(), c = e.grid().rows(), l = 0;
            l < c;
            l++
          )
            for (var s = !1, f = 0; f < a; f++)
              l < t.minRow() ||
                l > t.maxRow() ||
                f < t.minCol() ||
                f > t.maxCol() ||
                (Ze.getAt(e, l, f).filter(r).isNone()
                  ? ((o = s),
                    (i = n[l].element()),
                    (u = nn.fromTag("td")),
                    lt.append(u, nn.fromTag("br")),
                    (o ? lt.append : lt.prepend)(i, u))
                  : (s = !0));
        })(m, g, h, d),
        (o = n),
        (s = h),
        (f = P.filter(de.firstLayer(o, "tr"), function (n) {
          return 0 === n.dom().childElementCount;
        })),
        P.each(f, dt.remove),
        (s.minCol() !== s.maxCol() && s.minRow() !== s.maxRow()) ||
          P.each(de.firstLayer(o, "th,td"), function (n) {
            Se.remove(n, "rowspan"), Se.remove(n, "colspan");
          }),
        Se.remove(o, "width"),
        Se.remove(o, "height"),
        ut.remove(o, "width"),
        ut.remove(o, "height"),
        n
      );
    },
    ht = function (n, e) {
      return nn.fromDom(n.dom().cloneNode(e));
    },
    pt = function (n) {
      return ht(n, !0);
    },
    vt = function (n, e) {
      var t = nn.fromTag(e),
        r = Se.clone(n);
      return Se.setAll(t, r), t;
    },
    bt = function (n) {
      return ht(n, !1);
    },
    wt = pt,
    yt = function (n, e) {
      var t = vt(n, e),
        r = se.children(pt(n));
      return st.append(t, r), t;
    },
    xt =
      ((Pe = we.isText),
      (Be = "text"),
      (Ie = function (n) {
        return Pe(n) ? x.from(n.dom().nodeValue) : x.none();
      }),
      (We = Zn.detect().browser),
      {
        get: function (n) {
          if (!Pe(n))
            throw new Error(
              "Can only get " + Be + " value of a " + Be + " node"
            );
          return Me(n).getOr("");
        },
        getOption: (Me =
          We.isIE() && 10 === We.version.major
            ? function (n) {
                try {
                  return Ie(n);
                } catch (e) {
                  return x.none();
                }
              }
            : Ie),
        set: function (n, e) {
          if (!Pe(n))
            throw new Error(
              "Can only set raw " + Be + " value of a " + Be + " node"
            );
          n.dom().nodeValue = e;
        },
      }),
    Ct = {
      get: function (n) {
        return xt.get(n);
      },
      getOption: function (n) {
        return xt.getOption(n);
      },
      set: function (n, e) {
        xt.set(n, e);
      },
    },
    Rt = function (n) {
      return "img" === we.name(n)
        ? 1
        : Ct.getOption(n).fold(
            function () {
              return se.children(n).length;
            },
            function (n) {
              return n.length;
            }
          );
    },
    St = ["img", "br"],
    Tt = Rt,
    Dt = function (n) {
      return (
        Ct.getOption(n)
          .filter(function (n) {
            return 0 !== n.trim().length || -1 < n.indexOf("\xa0");
          })
          .isSome() || P.contains(St, we.name(n))
      );
    },
    kt = function (n, i) {
      var u = function (n) {
        for (var e = se.children(n), t = e.length - 1; 0 <= t; t--) {
          var r = e[t];
          if (i(r)) return x.some(r);
          var o = u(r);
          if (o.isSome()) return o;
        }
        return x.none();
      };
      return u(n);
    },
    At = {
      first: function (n) {
        return _e.descendant(n, Dt);
      },
      last: function (n) {
        return kt(n, Dt);
      },
    },
    Ot = function () {
      var n = nn.fromTag("td");
      return lt.append(n, nn.fromTag("br")), n;
    },
    Nt = function (n, e, t) {
      var r = yt(n, e);
      return (
        q.each(t, function (n, e) {
          null === n ? Se.remove(r, e) : Se.set(r, e, n);
        }),
        r
      );
    },
    Et = function (n) {
      return n;
    },
    Pt = function (n) {
      return function () {
        return nn.fromTag("tr", n.dom());
      };
    },
    Bt = function (c, n, l) {
      return {
        row: Pt(n),
        cell: function (n) {
          var r,
            o,
            i,
            e = se.owner(n.element()),
            t = nn.fromTag(we.name(n.element()), e.dom()),
            u = l.getOr([
              "strong",
              "em",
              "b",
              "i",
              "span",
              "font",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "p",
              "div",
            ]),
            a =
              0 < u.length
                ? ((r = n.element()),
                  (o = t),
                  (i = u),
                  At.first(r)
                    .map(function (n) {
                      var e = i.join(","),
                        t = Ne.ancestors(n, e, function (n) {
                          return te.eq(n, r);
                        });
                      return P.foldr(
                        t,
                        function (n, e) {
                          var t = bt(e);
                          return lt.append(n, t), t;
                        },
                        o
                      );
                    })
                    .getOr(o))
                : t;
          return (
            lt.append(a, nn.fromTag("br")),
            ut.copy(n.element(), t),
            ut.remove(t, "height"),
            1 !== n.colspan() && ut.remove(n.element(), "width"),
            c(n.element(), t),
            t
          );
        },
        replace: Nt,
        gap: Ot,
      };
    },
    It = function (n) {
      return {
        row: Pt(n),
        cell: Ot,
        replace: Et,
        gap: Ot,
      };
    },
    Wt = function (n, e) {
      var t = (e || document).createElement("div");
      return (t.innerHTML = n), se.children(nn.fromDom(t));
    },
    Mt = [
      "body",
      "p",
      "div",
      "article",
      "aside",
      "figcaption",
      "figure",
      "footer",
      "header",
      "nav",
      "section",
      "ol",
      "ul",
      "li",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "caption",
      "tr",
      "td",
      "th",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "pre",
      "address",
    ];

  function Lt() {
    return {
      up: y.constant({
        selector: He.ancestor,
        closest: He.closest,
        predicate: _e.ancestor,
        all: se.parents,
      }),
      down: y.constant({
        selector: Ne.descendants,
        predicate: Oe.descendants,
      }),
      styles: y.constant({
        get: ut.get,
        getRaw: ut.getRaw,
        set: ut.set,
        remove: ut.remove,
      }),
      attrs: y.constant({
        get: Se.get,
        set: Se.set,
        remove: Se.remove,
        copyTo: function (n, e) {
          var t = Se.clone(n);
          Se.setAll(e, t);
        },
      }),
      insert: y.constant({
        before: lt.before,
        after: lt.after,
        afterAll: st.after,
        append: lt.append,
        appendAll: st.append,
        prepend: lt.prepend,
        wrap: lt.wrap,
      }),
      remove: y.constant({
        unwrap: dt.unwrap,
        remove: dt.remove,
      }),
      create: y.constant({
        nu: nn.fromTag,
        clone: function (n) {
          return nn.fromDom(n.dom().cloneNode(!1));
        },
        text: nn.fromText,
      }),
      query: y.constant({
        comparePosition: function (n, e) {
          return n.dom().compareDocumentPosition(e.dom());
        },
        prevSibling: se.prevSibling,
        nextSibling: se.nextSibling,
      }),
      property: y.constant({
        children: se.children,
        name: we.name,
        parent: se.parent,
        isText: we.isText,
        isComment: we.isComment,
        isElement: we.isElement,
        getText: Ct.get,
        setText: Ct.set,
        isBoundary: function (n) {
          return (
            !!we.isElement(n) &&
            ("body" === we.name(n) || P.contains(Mt, we.name(n)))
          );
        },
        isEmptyTag: function (n) {
          return (
            !!we.isElement(n) &&
            P.contains(["br", "img", "hr", "input"], we.name(n))
          );
        },
      }),
      eq: te.eq,
      is: te.is,
    };
  }
  var qt = V.immutable("left", "right"),
    jt = function (n, e, t) {
      var r = n.property().children(e);
      return P.findIndex(r, y.curry(n.eq, t)).map(function (n) {
        return {
          before: y.constant(r.slice(0, n)),
          after: y.constant(r.slice(n + 1)),
        };
      });
    },
    _t = function (t, r, o) {
      return jt(t, r, o).map(function (n) {
        var e = t.create().clone(r);
        return (
          t.insert().appendAll(e, n.before().concat([o])),
          t.insert().appendAll(r, n.after()),
          t.insert().before(r, e),
          qt(e, r)
        );
      });
    },
    zt = function (t, r, n) {
      return jt(t, r, n).map(function (n) {
        var e = t.create().clone(r);
        return (
          t.insert().appendAll(e, n.after()), t.insert().after(r, e), qt(r, e)
        );
      });
    },
    Ht = function (i, n, u, a) {
      var r = V.immutable("first", "second", "splits"),
        c = function (n, e, o) {
          var t = r(n, x.none(), o);
          return u(n)
            ? r(n, e, o)
            : i
                .property()
                .parent(n)
                .bind(function (r) {
                  return a(i, r, n)
                    .map(function (n) {
                      var e = [
                          {
                            first: n.left,
                            second: n.right,
                          },
                        ],
                        t = u(r) ? r : n.left();
                      return c(t, x.some(n.right()), o.concat(e));
                    })
                    .getOr(t);
                });
        };
      return c(n, x.none(), []);
    },
    Ft = function (r, o, n, e) {
      var t = o(r, n);
      return P.foldr(
        e,
        function (n, e) {
          var t = o(r, e);
          return Ut(r, n, t);
        },
        t
      );
    },
    Ut = function (e, n, t) {
      return n.bind(function (n) {
        return t.filter(y.curry(e.eq, n));
      });
    },
    Vt = function (n, e, t) {
      return 0 < t.length ? Ft(n, e, (r = t)[0], r.slice(1)) : x.none();
      var r;
    },
    Gt = function (n, e) {
      return y.curry(n.eq, e);
    },
    Xt = function (e, n, t, r) {
      var o = r !== undefined ? r : y.constant(!1),
        i = [n].concat(e.up().all(n)),
        u = [t].concat(e.up().all(t)),
        a = function (e) {
          return P.findIndex(e, o).fold(
            function () {
              return e;
            },
            function (n) {
              return e.slice(0, n + 1);
            }
          );
        },
        c = a(i),
        l = a(u),
        s = P.find(c, function (n) {
          return P.exists(l, Gt(e, n));
        });
      return {
        firstpath: y.constant(c),
        secondpath: y.constant(l),
        shared: y.constant(s),
      };
    },
    Yt = function (e, n, t) {
      var r = Xt(e, n, t);
      return r.shared().bind(function (n) {
        return (function (o, i, n, e) {
          var u = o.property().children(i);
          if (o.eq(i, n[0])) return x.some([n[0]]);
          if (o.eq(i, e[0])) return x.some([e[0]]);
          var t = function (n) {
              var e = P.reverse(n),
                t = P.findIndex(e, Gt(o, i)).getOr(-1),
                r = t < e.length - 1 ? e[t + 1] : e[t];
              return P.findIndex(u, Gt(o, r));
            },
            r = t(n),
            a = t(e);
          return r.bind(function (r) {
            return a.map(function (n) {
              var e = Math.min(r, n),
                t = Math.max(r, n);
              return u.slice(e, t + 1);
            });
          });
        })(e, n, r.firstpath(), r.secondpath());
      });
    },
    Kt = Xt,
    $t = function (n, e, t) {
      return Vt(n, e, t);
    },
    Jt = function (n, e, t) {
      return Yt(n, e, t);
    },
    Qt = function (n, e, t, r) {
      return Kt(n, e, t, r);
    },
    Zt = function (n, e, t) {
      return _t(n, e, t);
    },
    nr = function (n, e, t) {
      return zt(n, e, t);
    },
    er = function (n, e, t, r) {
      return Ht(n, e, t, r);
    },
    tr = Lt(),
    rr = {
      sharedOne: function (t, n) {
        return $t(
          tr,
          function (n, e) {
            return t(e);
          },
          n
        );
      },
      subset: function (n, e) {
        return Jt(tr, n, e);
      },
      ancestors: function (n, e, t) {
        return Qt(tr, n, e, t);
      },
      breakToLeft: function (n, e) {
        return Zt(tr, n, e);
      },
      breakToRight: function (n, e) {
        return nr(tr, n, e);
      },
      breakPath: function (n, e, r) {
        return er(tr, n, e, function (n, e, t) {
          return r(e, t);
        });
      },
    },
    or = function (n, e) {
      return (
        e.column() >= n.startCol() &&
        e.column() + e.colspan() - 1 <= n.finishCol() &&
        e.row() >= n.startRow() &&
        e.row() + e.rowspan() - 1 <= n.finishRow()
      );
    },
    ir = function (n, e) {
      var t = e.column(),
        r = e.column() + e.colspan() - 1,
        o = e.row(),
        i = e.row() + e.rowspan() - 1;
      return (
        t <= n.finishCol() &&
        r >= n.startCol() &&
        o <= n.finishRow() &&
        i >= n.startRow()
      );
    },
    ur = function (n, e) {
      for (
        var t = !0, r = y.curry(or, e), o = e.startRow();
        o <= e.finishRow();
        o++
      )
        for (var i = e.startCol(); i <= e.finishCol(); i++)
          t = t && Ze.getAt(n, o, i).exists(r);
      return t ? x.some(e) : x.none();
    },
    ar = function (n, e, t) {
      var r = Ze.findItem(n, e, te.eq),
        o = Ze.findItem(n, t, te.eq);
      return r.bind(function (r) {
        return o.map(function (n) {
          return (
            (e = r),
            (t = n),
            Q.bounds(
              Math.min(e.row(), t.row()),
              Math.min(e.column(), t.column()),
              Math.max(e.row() + e.rowspan() - 1, t.row() + t.rowspan() - 1),
              Math.max(
                e.column() + e.colspan() - 1,
                t.column() + t.colspan() - 1
              )
            )
          );
          var e, t;
        });
      });
    },
    cr = ar,
    lr = function (e, n, t) {
      return ar(e, n, t).bind(function (n) {
        return ur(e, n);
      });
    },
    sr = function (r, n, o, i) {
      return Ze.findItem(r, n, te.eq).bind(function (n) {
        var e = 0 < o ? n.row() + n.rowspan() - 1 : n.row(),
          t = 0 < i ? n.column() + n.colspan() - 1 : n.column();
        return Ze.getAt(r, e + o, t + i).map(function (n) {
          return n.element();
        });
      });
    },
    fr = function (t, n, e) {
      return cr(t, n, e).map(function (n) {
        var e = Ze.filterItems(t, y.curry(ir, n));
        return P.map(e, function (n) {
          return n.element();
        });
      });
    },
    dr = function (n, e) {
      return Ze.findItem(n, e, function (n, e) {
        return te.contains(e, n);
      }).bind(function (n) {
        return n.element();
      });
    },
    mr = function (n) {
      var e = Ke(n);
      return Ze.generate(e);
    },
    gr = function (t, r, o) {
      return Ye.table(t).bind(function (n) {
        var e = mr(n);
        return sr(e, t, r, o);
      });
    },
    hr = function (n, e, t) {
      var r = mr(n);
      return fr(r, e, t);
    },
    pr = function (n, e, t, r, o) {
      var i = mr(n),
        u = te.eq(n, t) ? e : dr(i, e),
        a = te.eq(n, o) ? r : dr(i, r);
      return fr(i, u, a);
    },
    vr = function (n, e, t) {
      var r = mr(n);
      return lr(r, e, t);
    },
    br = function (n, e) {
      return He.ancestor(n, "table");
    },
    wr = V.immutableBag(["boxes", "start", "finish"], []),
    yr = function (a, c, r) {
      var l = function (e) {
        return function (n) {
          return r(n) || te.eq(n, e);
        };
      };
      return te.eq(a, c)
        ? x.some(
            wr({
              boxes: x.some([a]),
              start: a,
              finish: c,
            })
          )
        : br(a).bind(function (u) {
            return br(c).bind(function (i) {
              if (te.eq(u, i))
                return x.some(
                  wr({
                    boxes: hr(u, a, c),
                    start: a,
                    finish: c,
                  })
                );
              if (te.contains(u, i)) {
                var n =
                  0 < (e = Ne.ancestors(c, "td,th", l(u))).length
                    ? e[e.length - 1]
                    : c;
                return x.some(
                  wr({
                    boxes: pr(u, a, u, c, i),
                    start: a,
                    finish: n,
                  })
                );
              }
              if (te.contains(i, u)) {
                var e,
                  t =
                    0 < (e = Ne.ancestors(a, "td,th", l(i))).length
                      ? e[e.length - 1]
                      : a;
                return x.some(
                  wr({
                    boxes: pr(i, a, u, c, i),
                    start: a,
                    finish: t,
                  })
                );
              }
              return rr
                .ancestors(a, c)
                .shared()
                .bind(function (n) {
                  return He.closest(n, "table", r).bind(function (n) {
                    var e = Ne.ancestors(c, "td,th", l(n)),
                      t = 0 < e.length ? e[e.length - 1] : c,
                      r = Ne.ancestors(a, "td,th", l(n)),
                      o = 0 < r.length ? r[r.length - 1] : a;
                    return x.some(
                      wr({
                        boxes: pr(n, a, u, c, i),
                        start: o,
                        finish: t,
                      })
                    );
                  });
                });
            });
          });
    },
    xr = yr,
    Cr = function (n, e) {
      var t = Ne.descendants(n, e);
      return 0 < t.length ? x.some(t) : x.none();
    },
    Rr = function (n, e, t, r, o) {
      return ((i = n),
      (u = o),
      P.find(i, function (n) {
        return ln.is(n, u);
      })).bind(function (n) {
        return gr(n, e, t).bind(function (n) {
          return (
            (e = n),
            (t = r),
            He.ancestor(e, "table").bind(function (n) {
              return He.descendant(n, t).bind(function (n) {
                return yr(n, e).bind(function (e) {
                  return e.boxes().map(function (n) {
                    return {
                      boxes: y.constant(n),
                      start: y.constant(e.start()),
                      finish: y.constant(e.finish()),
                    };
                  });
                });
              });
            })
          );
          var e, t;
        });
      });
      var i, u;
    },
    Sr = function (n, e, r) {
      return He.descendant(n, e).bind(function (t) {
        return He.descendant(n, r).bind(function (e) {
          return rr.sharedOne(br, [t, e]).map(function (n) {
            return {
              first: y.constant(t),
              last: y.constant(e),
              table: y.constant(n),
            };
          });
        });
      });
    },
    Tr = function (n, e) {
      return Cr(n, e);
    },
    Dr = function (o, n, e) {
      return Sr(o, n, e).bind(function (t) {
        var n = function (n) {
            return te.eq(o, n);
          },
          e = He.ancestor(t.first(), "thead,tfoot,tbody,table", n),
          r = He.ancestor(t.last(), "thead,tfoot,tbody,table", n);
        return e.bind(function (e) {
          return r.bind(function (n) {
            return te.eq(e, n) ? vr(t.table(), t.first(), t.last()) : x.none();
          });
        });
      });
    },
    kr = "data-mce-selected",
    Ar = "data-mce-first-selected",
    Or = "data-mce-last-selected",
    Nr = {
      selected: y.constant(kr),
      selectedSelector: y.constant(
        "td[data-mce-selected],th[data-mce-selected]"
      ),
      attributeSelector: y.constant("[data-mce-selected]"),
      firstSelected: y.constant(Ar),
      firstSelectedSelector: y.constant(
        "td[data-mce-first-selected],th[data-mce-first-selected]"
      ),
      lastSelected: y.constant(Or),
      lastSelectedSelector: y.constant(
        "td[data-mce-last-selected],th[data-mce-last-selected]"
      ),
    },
    Er = function (u) {
      if (!p.isArray(u)) throw new Error("cases must be an array");
      if (0 === u.length) throw new Error("there must be at least one case");
      var a = [],
        t = {};
      return (
        P.each(u, function (n, r) {
          var e = q.keys(n);
          if (1 !== e.length) throw new Error("one and only one name per case");
          var o = e[0],
            i = n[o];
          if (t[o] !== undefined)
            throw new Error("duplicate key detected:" + o);
          if ("cata" === o)
            throw new Error("cannot have a case named cata (sorry)");
          if (!p.isArray(i)) throw new Error("case arguments must be an array");
          a.push(o),
            (t[o] = function () {
              var n = arguments.length;
              if (n !== i.length)
                throw new Error(
                  "Wrong number of arguments to case " +
                    o +
                    ". Expected " +
                    i.length +
                    " (" +
                    i +
                    "), got " +
                    n
                );
              for (var t = new Array(n), e = 0; e < t.length; e++)
                t[e] = arguments[e];
              return {
                fold: function () {
                  if (arguments.length !== u.length)
                    throw new Error(
                      "Wrong number of arguments to fold. Expected " +
                        u.length +
                        ", got " +
                        arguments.length
                    );
                  return arguments[r].apply(null, t);
                },
                match: function (n) {
                  var e = q.keys(n);
                  if (a.length !== e.length)
                    throw new Error(
                      "Wrong number of arguments to match. Expected: " +
                        a.join(",") +
                        "\nActual: " +
                        e.join(",")
                    );
                  if (
                    !P.forall(a, function (n) {
                      return P.contains(e, n);
                    })
                  )
                    throw new Error(
                      "Not all branches were specified when using match. Specified: " +
                        e.join(", ") +
                        "\nRequired: " +
                        a.join(", ")
                    );
                  return n[o].apply(null, t);
                },
                log: function (n) {
                  console.log(n, {
                    constructors: a,
                    constructor: o,
                    params: t,
                  });
                },
              };
            });
        }),
        t
      );
    },
    Pr = Er([
      {
        none: [],
      },
      {
        multiple: ["elements"],
      },
      {
        single: ["selection"],
      },
    ]),
    Br = {
      cata: function (n, e, t, r) {
        return n.fold(e, t, r);
      },
      none: Pr.none,
      multiple: Pr.multiple,
      single: Pr.single,
    },
    Ir = function (n, e) {
      return Br.cata(e.get(), y.constant([]), y.identity, y.constant([n]));
    },
    Wr = function (t, n) {
      return Br.cata(
        n.get(),
        x.none,
        function (e, n) {
          return 0 === e.length
            ? x.none()
            : Dr(t, Nr.firstSelectedSelector(), Nr.lastSelectedSelector()).bind(
                function (n) {
                  return 1 < e.length
                    ? x.some({
                        bounds: y.constant(n),
                        cells: y.constant(e),
                      })
                    : x.none();
                }
              );
        },
        x.none
      );
    },
    Mr = function (n, e) {
      var t = Ir(n, e);
      return 0 < t.length &&
        P.forall(t, function (n) {
          return (
            (Se.has(n, "rowspan") && 1 < parseInt(Se.get(n, "rowspan"), 10)) ||
            (Se.has(n, "colspan") && 1 < parseInt(Se.get(n, "colspan"), 10))
          );
        })
        ? x.some(t)
        : x.none();
    },
    Lr = Ir,
    qr = function (n) {
      return {
        element: y.constant(n),
        mergable: x.none,
        unmergable: x.none,
        selection: y.constant([n]),
      };
    },
    jr = V.immutable("element", "clipboard", "generators"),
    _r = {
      noMenu: qr,
      forMenu: function (n, e, t) {
        return {
          element: y.constant(t),
          mergable: y.constant(Wr(e, n)),
          unmergable: y.constant(Mr(t, n)),
          selection: y.constant(Lr(t, n)),
        };
      },
      notCell: function (n) {
        return qr(n);
      },
      paste: jr,
      pasteRows: function (n, e, t, r, o) {
        return {
          element: y.constant(t),
          mergable: x.none,
          unmergable: x.none,
          selection: y.constant(Lr(t, n)),
          clipboard: y.constant(r),
          generators: y.constant(o),
        };
      },
    },
    zr = function (a, n, c, l) {
      a.on("BeforeGetContent", function (t) {
        !0 === t.selection &&
          Br.cata(
            n.get(),
            y.noop,
            function (n) {
              var e;
              t.preventDefault(),
                ((e = n),
                Ye.table(e[0])
                  .map(wt)
                  .map(function (n) {
                    return [gt(n, Nr.attributeSelector())];
                  })).each(function (n) {
                  t.content = P.map(n, function (n) {
                    return (
                      (e = n), a.selection.serializer.serialize(e.dom(), {})
                    );
                    var e;
                  }).join("");
                });
            },
            y.noop
          );
      }),
        a.on("BeforeSetContent", function (u) {
          !0 === u.selection &&
            !0 === u.paste &&
            x
              .from(a.dom.getParent(a.selection.getStart(), "th,td"))
              .each(function (n) {
                var i = nn.fromDom(n);
                Ye.table(i).bind(function (e) {
                  var n = P.filter(Wt(u.content), function (n) {
                    return "meta" !== we.name(n);
                  });
                  if (1 === n.length && "table" === we.name(n[0])) {
                    u.preventDefault();
                    var t = nn.fromDom(a.getDoc()),
                      r = It(t),
                      o = _r.paste(i, n[0], r);
                    c.pasteCells(e, o).each(function (n) {
                      a.selection.setRng(n), a.focus(), l.clear(e);
                    });
                  }
                });
              });
        });
    };

  function Hr(r, o) {
    var n = function (n) {
        var e = o(n);
        if (e <= 0 || null === e) {
          var t = ut.get(n, r);
          return parseFloat(t) || 0;
        }
        return e;
      },
      i = function (o, n) {
        return P.foldl(
          n,
          function (n, e) {
            var t = ut.get(o, e),
              r = t === undefined ? 0 : parseInt(t, 10);
            return isNaN(r) ? n : n + r;
          },
          0
        );
      };
    return {
      set: function (n, e) {
        if (!p.isNumber(e) && !e.match(/^[0-9]+$/))
          throw r + ".set accepts only positive integer values. Value was " + e;
        var t = n.dom();
        nt(t) && (t.style[r] = e + "px");
      },
      get: n,
      getOuter: n,
      aggregate: i,
      max: function (n, e, t) {
        var r = i(n, t);
        return r < e ? e - r : 0;
      },
    };
  }
  var Fr = Hr("height", function (n) {
      return ke.inBody(n)
        ? n.dom().getBoundingClientRect().height
        : n.dom().offsetHeight;
    }),
    Ur = function (n) {
      return Fr.get(n);
    },
    Vr = function (n) {
      return Fr.getOuter(n);
    },
    Gr = Hr("width", function (n) {
      return n.dom().offsetWidth;
    }),
    Xr = function (n) {
      return Gr.get(n);
    },
    Yr = function (n) {
      return Gr.getOuter(n);
    },
    Kr = Zn.detect(),
    $r = function (n, e, t) {
      return (r = ut.get(n, e)), (o = t), (i = parseFloat(r)), isNaN(i) ? o : i;
      var r, o, i;
    },
    Jr = function (n) {
      return Kr.browser.isIE() || Kr.browser.isEdge()
        ? ((t = $r((e = n), "padding-top", 0)),
          (r = $r(e, "padding-bottom", 0)),
          (o = $r(e, "border-top-width", 0)),
          (i = $r(e, "border-bottom-width", 0)),
          (u = e.dom().getBoundingClientRect().height),
          "border-box" === ut.get(e, "box-sizing") ? u : u - t - r - (o + i))
        : $r(n, "height", Ur(n));
      var e, t, r, o, i, u;
    },
    Qr = /(\d+(\.\d+)?)(\w|%)*/,
    Zr = /(\d+(\.\d+)?)%/,
    no = /(\d+(\.\d+)?)px|em/,
    eo = function (n, e) {
      ut.set(n, "height", e + "px");
    },
    to = function (n, e, t, r) {
      var o,
        i,
        u,
        a,
        c,
        l = parseInt(n, 10);
      return Gn.endsWith(n, "%") && "table" !== we.name(e)
        ? ((o = e),
          (i = l),
          (u = t),
          (a = r),
          (c = Ye.table(o)
            .map(function (n) {
              var e = u(n);
              return Math.floor((i / 100) * e);
            })
            .getOr(i)),
          a(o, c),
          c)
        : l;
    },
    ro = function (n) {
      var e,
        t =
          ((e = n),
          ut.getRaw(e, "height").getOrThunk(function () {
            return Jr(e) + "px";
          }));
      return t ? to(t, n, Ur, eo) : Ur(n);
    },
    oo = function (n, e) {
      return Se.has(n, e) ? parseInt(Se.get(n, e), 10) : 1;
    },
    io = function (n) {
      return ut.getRaw(n, "width").fold(
        function () {
          return x.from(Se.get(n, "width"));
        },
        function (n) {
          return x.some(n);
        }
      );
    },
    uo = function (n, e) {
      return (n / e.pixelWidth()) * 100;
    },
    ao = {
      percentageBasedSizeRegex: y.constant(Zr),
      pixelBasedSizeRegex: y.constant(no),
      setPixelWidth: function (n, e) {
        ut.set(n, "width", e + "px");
      },
      setPercentageWidth: function (n, e) {
        ut.set(n, "width", e + "%");
      },
      setHeight: eo,
      getPixelWidth: function (e, t) {
        return io(e).fold(
          function () {
            var n = Xr(e);
            return parseInt(n, 10);
          },
          function (n) {
            return (function (n, e, t) {
              if (no.test(e)) {
                var r = no.exec(e);
                return parseInt(r[1], 10);
              }
              if (Zr.test(e)) {
                var o = Zr.exec(e),
                  i = parseFloat(o[1]);
                return (i / 100) * t.pixelWidth();
              }
              var u = Xr(n);
              return parseInt(u, 10);
            })(e, n, t);
          }
        );
      },
      getPercentageWidth: function (t, r) {
        return io(t).fold(
          function () {
            var n = Xr(t),
              e = parseInt(n, 10);
            return uo(e, r);
          },
          function (n) {
            return (function (n, e, t) {
              if (Zr.test(e)) {
                var r = Zr.exec(e);
                return parseFloat(r[1]);
              }
              var o = Xr(n),
                i = parseInt(o, 10);
              return uo(i, t);
            })(t, n, r);
          }
        );
      },
      getGenericWidth: function (n) {
        return io(n).bind(function (n) {
          if (Qr.test(n)) {
            var e = Qr.exec(n);
            return x.some({
              width: y.constant(e[1]),
              unit: y.constant(e[3]),
            });
          }
          return x.none();
        });
      },
      setGenericWidth: function (n, e, t) {
        ut.set(n, "width", e + t);
      },
      getHeight: function (n) {
        return (t = "rowspan"), ro((e = n)) / oo(e, t);
        var e, t;
      },
      getRawWidth: io,
    },
    co = function (t, r) {
      ao.getGenericWidth(t).each(function (n) {
        var e = n.width() / 2;
        ao.setGenericWidth(t, e, n.unit()), ao.setGenericWidth(r, e, n.unit());
      });
    },
    lo = function (n, e) {
      var t = e || nn.fromDom(document.documentElement);
      return _e.ancestor(n, y.curry(te.eq, t)).isSome();
    },
    so = function (n) {
      var e = n.dom();
      return e === e.window
        ? n
        : we.isDocument(n)
        ? e.defaultView || e.parentWindow
        : null;
    },
    fo = function (t, r) {
      return {
        left: y.constant(t),
        top: y.constant(r),
        translate: function (n, e) {
          return fo(t + n, r + e);
        },
      };
    },
    mo = function (n, e) {
      return n !== undefined ? n : e !== undefined ? e : 0;
    },
    go = function (n) {
      var e,
        t = n.dom(),
        r = t.ownerDocument,
        o = r.body,
        i = nn.fromDom(r.documentElement);
      return o === t
        ? fo(o.offsetLeft, o.offsetTop)
        : lo(n, i)
        ? ((e = t.getBoundingClientRect()), fo(e.left, e.top))
        : fo(0, 0);
    },
    ho = function (n) {
      var e = n.dom().ownerDocument,
        t = e.body,
        r = so(nn.fromDom(e)),
        o = e.documentElement,
        i = mo(r.pageYOffset, o.scrollTop),
        u = mo(r.pageXOffset, o.scrollLeft),
        a = mo(o.clientTop, t.clientTop),
        c = mo(o.clientLeft, t.clientLeft);
      return go(n).translate(u - c, i - a);
    },
    po = V.immutable("row", "y"),
    vo = V.immutable("col", "x"),
    bo = function (n) {
      return ho(n).left() + Yr(n);
    },
    wo = function (n) {
      return ho(n).left();
    },
    yo = function (n, e) {
      return vo(n, wo(e));
    },
    xo = function (n, e) {
      return vo(n, bo(e));
    },
    Co = function (n) {
      return ho(n).top();
    },
    Ro = function (t, e, r) {
      if (0 === r.length) return [];
      var n = P.map(r.slice(1), function (n, e) {
          return n.map(function (n) {
            return t(e, n);
          });
        }),
        o = r[r.length - 1].map(function (n) {
          return e(r.length - 1, n);
        });
      return n.concat([o]);
    },
    So = {
      delta: y.identity,
      positions: y.curry(
        Ro,
        function (n, e) {
          return po(n, Co(e));
        },
        function (n, e) {
          return po(n, Co(e) + Vr(e));
        }
      ),
      edge: Co,
    },
    To = {
      delta: y.identity,
      edge: wo,
      positions: y.curry(Ro, yo, xo),
    },
    Do = {
      height: So,
      rtl: {
        delta: function (n, e) {
          return -n;
        },
        edge: bo,
        positions: y.curry(Ro, xo, yo),
      },
      ltr: To,
    },
    ko = {
      ltr: Do.ltr,
      rtl: Do.rtl,
    };

  function Ao(e) {
    var t = function (n) {
      return e(n).isRtl() ? ko.rtl : ko.ltr;
    };
    return {
      delta: function (n, e) {
        return t(e).delta(n, e);
      },
      edge: function (n) {
        return t(n).edge(n);
      },
      positions: function (n, e) {
        return t(e).positions(n, e);
      },
    };
  }
  var Oo = function (n) {
      var e = Ke(n);
      return Ze.generate(e).grid();
    },
    No = function (n) {
      var e = n,
        t = function () {
          return e;
        };
      return {
        get: t,
        set: function (n) {
          e = n;
        },
        clone: function () {
          return No(t());
        },
      };
    },
    Eo = function (n, e) {
      return Po(n, e, {
        validate: p.isFunction,
        label: "function",
      });
    },
    Po = function (r, o, i) {
      if (0 === o.length)
        throw new Error("You must specify at least one required field.");
      return (
        H("required", o),
        U(o),
        function (e) {
          var t = q.keys(e);
          P.forall(o, function (n) {
            return P.contains(t, n);
          }) || _(o, t),
            r(o, t);
          var n = P.filter(o, function (n) {
            return !i.validate(e[n], n);
          });
          return 0 < n.length && F(n, i.label), e;
        }
      );
    },
    Bo = y.noop,
    Io = {
      exactly: y.curry(Eo, function (e, n) {
        var t = P.filter(n, function (n) {
          return !P.contains(e, n);
        });
        0 < t.length && z(t);
      }),
      ensure: y.curry(Eo, Bo),
      ensureWith: y.curry(Po, Bo),
    },
    Wo = function (n) {
      var e = Se.has(n, "colspan") ? parseInt(Se.get(n, "colspan"), 10) : 1,
        t = Se.has(n, "rowspan") ? parseInt(Se.get(n, "rowspan"), 10) : 1;
      return {
        element: y.constant(n),
        colspan: y.constant(e),
        rowspan: y.constant(t),
      };
    },
    Mo = Io.exactly(["cell", "row", "replace", "gap"]),
    Lo = function (r, n) {
      Mo(r);
      var t = No(x.none()),
        o = n !== undefined ? n : Wo,
        i = function (n) {
          var e,
            t = o(n);
          return (e = t), r.cell(e);
        },
        u = function (n) {
          var e = i(n);
          return (
            t.get().isNone() && t.set(x.some(e)),
            (a = x.some({
              item: n,
              replacement: e,
            })),
            e
          );
        },
        a = x.none();
      return {
        getOrInit: function (e, t) {
          return a.fold(
            function () {
              return u(e);
            },
            function (n) {
              return t(e, n.item) ? n.replacement : u(e);
            }
          );
        },
        cursor: t.get,
      };
    },
    qo = function (o, a) {
      return function (t) {
        var r = No(x.none());
        Mo(t);
        var i = [],
          u = function (n) {
            var e = t.replace(n, a, {
              scope: o,
            });
            return (
              i.push({
                item: n,
                sub: e,
              }),
              r.get().isNone() && r.set(x.some(e)),
              e
            );
          };
        return {
          replaceOrInit: function (e, t) {
            return ((r = e),
            (o = t),
            P.find(i, function (n) {
              return o(n.item, r);
            })).fold(
              function () {
                return u(e);
              },
              function (n) {
                return t(e, n.item) ? n.sub : u(e);
              }
            );
            var r, o;
          },
          cursor: r.get,
        };
      };
    },
    jo = function (t) {
      Mo(t);
      var n = No(x.none());
      return {
        combine: function (e) {
          return (
            n.get().isNone() && n.set(x.some(e)),
            function () {
              var n = t.cell({
                element: y.constant(e),
                colspan: y.constant(1),
                rowspan: y.constant(1),
              });
              return ut.remove(n, "width"), ut.remove(e, "width"), n;
            }
          );
        },
        cursor: n.get,
      };
    },
    _o = [
      "body",
      "p",
      "div",
      "article",
      "aside",
      "figcaption",
      "figure",
      "footer",
      "header",
      "nav",
      "section",
      "ol",
      "ul",
      "table",
      "thead",
      "tfoot",
      "tbody",
      "caption",
      "tr",
      "td",
      "th",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "pre",
      "address",
    ],
    zo = function (n, e) {
      var t = n.property().name(e);
      return P.contains(_o, t);
    },
    Ho = function (n, e) {
      return P.contains(["br", "img", "hr", "input"], n.property().name(e));
    },
    Fo = zo,
    Uo = function (n, e) {
      var t = n.property().name(e);
      return P.contains(["ol", "ul"], t);
    },
    Vo = Ho,
    Go = Lt(),
    Xo = function (n) {
      return Fo(Go, n);
    },
    Yo = function (n) {
      return Uo(Go, n);
    },
    Ko = function (n) {
      return Vo(Go, n);
    },
    $o = function (n) {
      var e,
        i = function (n) {
          return "br" === we.name(n);
        },
        r = function (o) {
          return At.last(o)
            .bind(function (t) {
              var n,
                r =
                  ((n = t),
                  se
                    .nextSibling(n)
                    .map(function (n) {
                      return !!Xo(n) || (Ko(n) ? "img" !== we.name(n) : void 0);
                    })
                    .getOr(!1));
              return se.parent(t).map(function (n) {
                return !0 === r ||
                  ((e = n),
                  "li" === we.name(e) || _e.ancestor(e, Yo).isSome()) ||
                  i(t) ||
                  (Xo(n) && !te.eq(o, n))
                  ? []
                  : [nn.fromTag("br")];
                var e;
              });
            })
            .getOr([]);
        },
        t =
          0 ===
          (e = P.bind(n, function (n) {
            var e,
              t = se.children(n);
            return (
              (e = t),
              P.forall(e, function (n) {
                return i(n) || (we.isText(n) && 0 === Ct.get(n).trim().length);
              })
                ? []
                : t.concat(r(n))
            );
          })).length
            ? [nn.fromTag("br")]
            : e;
      dt.empty(n[0]), st.append(n[0], t);
    },
    Jo = function (u) {
      return function () {
        for (var n = new Array(arguments.length), e = 0; e < n.length; e++)
          n[e] = arguments[e];
        if (0 === n.length) throw new Error("Can't merge zero objects");
        for (var t = {}, r = 0; r < n.length; r++) {
          var o = n[r];
          for (var i in o) o.hasOwnProperty(i) && (t[i] = u(t[i], o[i]));
        }
        return t;
      };
    },
    Qo = Jo(function (n, e) {
      return p.isObject(n) && p.isObject(e) ? Qo(n, e) : e;
    }),
    Zo = Jo(function (n, e) {
      return e;
    }),
    ni = {
      deepMerge: Qo,
      merge: Zo,
    },
    ei = function (n) {
      for (
        var e = [],
          t = function (n) {
            e.push(n);
          },
          r = 0;
        r < n.length;
        r++
      )
        n[r].each(t);
      return e;
    },
    ti = function (n, e) {
      for (var t = 0; t < n.length; t++) {
        var r = e(n[t], t);
        if (r.isSome()) return r;
      }
      return x.none();
    },
    ri = function (n, e) {
      return Q.rowcells(e, n.section());
    },
    oi = function (n, e) {
      return n.cells()[e];
    },
    ii = {
      addCell: function (n, e, t) {
        var r = n.cells(),
          o = r.slice(0, e),
          i = r.slice(e),
          u = o.concat([t]).concat(i);
        return ri(n, u);
      },
      setCells: ri,
      mutateCell: function (n, e, t) {
        n.cells()[e] = t;
      },
      getCell: oi,
      getCellElement: function (n, e) {
        return oi(n, e).element();
      },
      mapCells: function (n, e) {
        var t = n.cells(),
          r = P.map(t, e);
        return Q.rowcells(r, n.section());
      },
      cellLength: function (n) {
        return n.cells().length;
      },
    },
    ui = function (n, e) {
      if (0 === n.length) return 0;
      var t = n[0];
      return P.findIndex(n, function (n) {
        return !e(t.element(), n.element());
      }).fold(
        function () {
          return n.length;
        },
        function (n) {
          return n;
        }
      );
    },
    ai = function (n, e, t, r) {
      var o,
        i,
        u,
        a,
        c = ((o = n), (i = e), o[i]).cells().slice(t),
        l = ui(c, r),
        s = ((u = n),
        (a = t),
        P.map(u, function (n) {
          return ii.getCell(n, a);
        })).slice(e),
        f = ui(s, r);
      return {
        colspan: y.constant(l),
        rowspan: y.constant(f),
      };
    },
    ci = function (o, i) {
      var u = P.map(o, function (n, e) {
        return P.map(n.cells(), function (n, e) {
          return !1;
        });
      });
      return P.map(o, function (n, r) {
        var e = P.bind(n.cells(), function (n, e) {
          if (!1 === u[r][e]) {
            var t = ai(o, r, e, i);
            return (
              (function (n, e, t, r) {
                for (var o = n; o < n + t; o++)
                  for (var i = e; i < e + r; i++) u[o][i] = !0;
              })(r, e, t.rowspan(), t.colspan()),
              [Q.detailnew(n.element(), t.rowspan(), t.colspan(), n.isNew())]
            );
          }
          return [];
        });
        return Q.rowdetails(e, n.section());
      });
    },
    li = function (n, e, t) {
      for (var r = [], o = 0; o < n.grid().rows(); o++) {
        for (var i = [], u = 0; u < n.grid().columns(); u++) {
          var a = Ze.getAt(n, o, u)
            .map(function (n) {
              return Q.elementnew(n.element(), t);
            })
            .getOrThunk(function () {
              return Q.elementnew(e.gap(), !0);
            });
          i.push(a);
        }
        var c = Q.rowcells(i, n.all()[o].section());
        r.push(c);
      }
      return r;
    },
    si = function (n, e, t, r) {
      t === r ? Se.remove(n, e) : Se.set(n, e, t);
    },
    fi = function (o, n) {
      var i = [],
        u = [],
        e = function (n, e) {
          var t;
          0 < n.length
            ? (function (n, e) {
                var t = He.child(o, e).getOrThunk(function () {
                  var n = nn.fromTag(e, se.owner(o).dom());
                  return lt.append(o, n), n;
                });
                dt.empty(t);
                var r = P.map(n, function (n) {
                  n.isNew() && i.push(n.element());
                  var e = n.element();
                  return (
                    dt.empty(e),
                    P.each(n.cells(), function (n) {
                      n.isNew() && u.push(n.element()),
                        si(n.element(), "colspan", n.colspan(), 1),
                        si(n.element(), "rowspan", n.rowspan(), 1),
                        lt.append(e, n.element());
                    }),
                    e
                  );
                });
                st.append(t, r);
              })(n, e)
            : ((t = e), He.child(o, t).bind(dt.remove));
        },
        t = [],
        r = [],
        a = [];
      return (
        P.each(n, function (n) {
          switch (n.section()) {
            case "thead":
              t.push(n);
              break;
            case "tbody":
              r.push(n);
              break;
            case "tfoot":
              a.push(n);
          }
        }),
        e(t, "thead"),
        e(r, "tbody"),
        e(a, "tfoot"),
        {
          newRows: y.constant(i),
          newCells: y.constant(u),
        }
      );
    },
    di = function (n) {
      return P.map(n, function (n) {
        var t = bt(n.element());
        return (
          P.each(n.cells(), function (n) {
            var e = wt(n.element());
            si(e, "colspan", n.colspan(), 1),
              si(e, "rowspan", n.rowspan(), 1),
              lt.append(t, e);
          }),
          t
        );
      });
    },
    mi = function (n, e) {
      for (var t = [], r = 0; r < n; r++) t.push(e(r));
      return t;
    },
    gi = function (n, e) {
      for (var t = [], r = n; r < e; r++) t.push(r);
      return t;
    },
    hi = function (e, t) {
      if (t < 0 || t >= e.length - 1) return x.none();
      var n = e[t].fold(
          function () {
            var n = P.reverse(e.slice(0, t));
            return ti(n, function (n, e) {
              return n.map(function (n) {
                return {
                  value: n,
                  delta: e + 1,
                };
              });
            });
          },
          function (n) {
            return x.some({
              value: n,
              delta: 0,
            });
          }
        ),
        r = e[t + 1].fold(
          function () {
            var n = e.slice(t + 1);
            return ti(n, function (n, e) {
              return n.map(function (n) {
                return {
                  value: n,
                  delta: e + 1,
                };
              });
            });
          },
          function (n) {
            return x.some({
              value: n,
              delta: 1,
            });
          }
        );
      return n.bind(function (t) {
        return r.map(function (n) {
          var e = n.delta + t.delta;
          return Math.abs(n.value - t.value) / e;
        });
      });
    },
    pi = function (n, e, t) {
      var r = n();
      return P.find(r, e)
        .orThunk(function () {
          return x.from(r[0]).orThunk(t);
        })
        .map(function (n) {
          return n.element();
        });
    },
    vi = function (t) {
      var n = t.grid(),
        e = gi(0, n.columns()),
        r = gi(0, n.rows());
      return P.map(e, function (e) {
        return pi(
          function () {
            return P.bind(r, function (n) {
              return Ze.getAt(t, n, e)
                .filter(function (n) {
                  return n.column() === e;
                })
                .fold(y.constant([]), function (n) {
                  return [n];
                });
            });
          },
          function (n) {
            return 1 === n.colspan();
          },
          function () {
            return Ze.getAt(t, 0, e);
          }
        );
      });
    },
    bi = function (t) {
      var n = t.grid(),
        e = gi(0, n.rows()),
        r = gi(0, n.columns());
      return P.map(e, function (e) {
        return pi(
          function () {
            return P.bind(r, function (n) {
              return Ze.getAt(t, e, n)
                .filter(function (n) {
                  return n.row() === e;
                })
                .fold(y.constant([]), function (n) {
                  return [n];
                });
            });
          },
          function (n) {
            return 1 === n.rowspan();
          },
          function () {
            return Ze.getAt(t, e, 0);
          }
        );
      });
    },
    wi = function (n, e, t, r, o) {
      var i = nn.fromTag("div");
      return (
        ut.setAll(i, {
          position: "absolute",
          left: e - r / 2 + "px",
          top: t + "px",
          height: o + "px",
          width: r + "px",
        }),
        Se.setAll(i, {
          "data-column": n,
          role: "presentation",
        }),
        i
      );
    },
    yi = function (n, e, t, r, o) {
      var i = nn.fromTag("div");
      return (
        ut.setAll(i, {
          position: "absolute",
          left: e + "px",
          top: t - o / 2 + "px",
          height: o + "px",
          width: r + "px",
        }),
        Se.setAll(i, {
          "data-row": n,
          role: "presentation",
        }),
        i
      );
    },
    xi = function (n) {
      var e = n.replace(/\./g, "-");
      return {
        resolve: function (n) {
          return e + "-" + n;
        },
      };
    },
    Ci = {
      resolve: xi("ephox-snooker").resolve,
    },
    Ri = function (n, e) {
      var t = Se.get(n, e);
      return t === undefined || "" === t ? [] : t.split(" ");
    },
    Si = Ri,
    Ti = function (n, e, t) {
      var r = Ri(n, e).concat([t]);
      Se.set(n, e, r.join(" "));
    },
    Di = function (n, e, t) {
      var r = P.filter(Ri(n, e), function (n) {
        return n !== t;
      });
      0 < r.length ? Se.set(n, e, r.join(" ")) : Se.remove(n, e);
    },
    ki = function (n) {
      return Si(n, "class");
    },
    Ai = function (n, e) {
      return Ti(n, "class", e);
    },
    Oi = function (n, e) {
      return Di(n, "class", e);
    },
    Ni = ki,
    Ei = Ai,
    Pi = Oi,
    Bi = function (n, e) {
      P.contains(ki(n), e) ? Oi(n, e) : Ai(n, e);
    },
    Ii = function (n) {
      return n.dom().classList !== undefined;
    },
    Wi = function (n, e) {
      return Ii(n) && n.dom().classList.contains(e);
    },
    Mi = {
      add: function (n, e) {
        Ii(n) ? n.dom().classList.add(e) : Ei(n, e);
      },
      remove: function (n, e) {
        var t;
        Ii(n) ? n.dom().classList.remove(e) : Pi(n, e),
          0 === (Ii((t = n)) ? t.dom().classList : Ni(t)).length &&
            Se.remove(t, "class");
      },
      toggle: function (n, e) {
        return Ii(n) ? n.dom().classList.toggle(e) : Bi(n, e);
      },
      toggler: function (n, e) {
        var t,
          r,
          o,
          i,
          u,
          a,
          c = Ii(n),
          l = n.dom().classList;
        return (
          (t = function () {
            c ? l.remove(e) : Pi(n, e);
          }),
          (r = function () {
            c ? l.add(e) : Ei(n, e);
          }),
          (o = Wi(n, e)),
          (i = o || !1),
          {
            on: (u = function () {
              r(), (i = !0);
            }),
            off: (a = function () {
              t(), (i = !1);
            }),
            toggle: function () {
              (i ? a : u)();
            },
            isOn: function () {
              return i;
            },
          }
        );
      },
      has: Wi,
    },
    Li = Ci.resolve("resizer-bar"),
    qi = Ci.resolve("resizer-rows"),
    ji = Ci.resolve("resizer-cols"),
    _i = function (n) {
      var e = Ne.descendants(n.parent(), "." + Li);
      P.each(e, dt.remove);
    },
    zi = function (t, n, r) {
      var o = t.origin();
      P.each(n, function (n, e) {
        n.each(function (n) {
          var e = r(o, n);
          Mi.add(e, Li), lt.append(t.parent(), e);
        });
      });
    },
    Hi = function (n, e, t, r, o, i) {
      var u,
        a,
        c,
        l,
        s = ho(e),
        f = 0 < t.length ? o.positions(t, e) : [];
      (u = n),
        (a = f),
        (c = s),
        (l = Yr(e)),
        zi(u, a, function (n, e) {
          var t = yi(e.row(), c.left() - n.left(), e.y() - n.top(), l, 7);
          return Mi.add(t, qi), t;
        });
      var d,
        m,
        g,
        h,
        p = 0 < r.length ? i.positions(r, e) : [];
      (d = n),
        (m = p),
        (g = s),
        (h = Vr(e)),
        zi(d, m, function (n, e) {
          var t = wi(e.col(), e.x() - n.left(), g.top() - n.top(), 7, h);
          return Mi.add(t, ji), t;
        });
    },
    Fi = function (n, e) {
      var t = Ne.descendants(n.parent(), "." + Li);
      P.each(t, e);
    },
    Ui = {
      refresh: function (n, e, t, r) {
        _i(n);
        var o = Ke(e),
          i = Ze.generate(o),
          u = bi(i),
          a = vi(i);
        Hi(n, e, u, a, t, r);
      },
      hide: function (n) {
        Fi(n, function (n) {
          ut.set(n, "display", "none");
        });
      },
      show: function (n) {
        Fi(n, function (n) {
          ut.set(n, "display", "block");
        });
      },
      destroy: _i,
      isRowBar: function (n) {
        return Mi.has(n, qi);
      },
      isColBar: function (n) {
        return Mi.has(n, ji);
      },
    },
    Vi = function (n, r) {
      return P.map(n, function (n) {
        var e,
          t =
            ((e = n.details()),
            ti(e, function (n) {
              return se.parent(n.element()).map(function (n) {
                var e = se.parent(n).isNone();
                return Q.elementnew(n, e);
              });
            }).getOrThunk(function () {
              return Q.elementnew(r.row(), !0);
            }));
        return Q.rowdatanew(t.element(), n.details(), n.section(), t.isNew());
      });
    },
    Gi = function (n, e) {
      var t = ci(n, te.eq);
      return Vi(t, e);
    },
    Xi = function (n, e) {
      var t = P.flatten(
        P.map(n.all(), function (n) {
          return n.cells();
        })
      );
      return P.find(t, function (n) {
        return te.eq(e, n.element());
      });
    },
    Yi = function (a, c, l, s, f) {
      return function (t, r, n, o, i) {
        var e = Ke(r),
          u = Ze.generate(e);
        return c(u, n)
          .map(function (n) {
            var e = li(u, o, !1),
              t = a(e, n, te.eq, f(o)),
              r = Gi(t.grid(), o);
            return {
              grid: y.constant(r),
              cursor: t.cursor,
            };
          })
          .fold(
            function () {
              return x.none();
            },
            function (n) {
              var e = fi(r, n.grid());
              return (
                l(r, n.grid(), i),
                s(r),
                Ui.refresh(t, r, Do.height, i),
                x.some({
                  cursor: n.cursor,
                  newRows: e.newRows,
                  newCells: e.newCells,
                })
              );
            }
          );
      };
    },
    Ki = Gi,
    $i = function (e, n) {
      return Ye.cell(n.element()).bind(function (n) {
        return Xi(e, n);
      });
    },
    Ji = function (e, n) {
      var t = P.map(n.selection(), function (n) {
          return Ye.cell(n).bind(function (n) {
            return Xi(e, n);
          });
        }),
        r = ei(t);
      return 0 < r.length ? x.some(r) : x.none();
    },
    Qi = function (e, t) {
      return Ye.cell(t.element()).bind(function (n) {
        return Xi(e, n).map(function (n) {
          return ni.merge(n, {
            generators: t.generators,
            clipboard: t.clipboard,
          });
        });
      });
    },
    Zi = function (e, n) {
      var t = P.map(n.selection(), function (n) {
          return Ye.cell(n).bind(function (n) {
            return Xi(e, n);
          });
        }),
        r = ei(t);
      return 0 < r.length
        ? x.some(
            ni.merge(
              {
                cells: r,
              },
              {
                generators: n.generators,
                clipboard: n.clipboard,
              }
            )
          )
        : x.none();
    },
    nu = function (n, e) {
      return e.mergable();
    },
    eu = function (n, e) {
      return e.unmergable();
    },
    tu = function (t) {
      return {
        is: function (n) {
          return t === n;
        },
        isValue: y.always,
        isError: y.never,
        getOr: y.constant(t),
        getOrThunk: y.constant(t),
        getOrDie: y.constant(t),
        or: function (n) {
          return tu(t);
        },
        orThunk: function (n) {
          return tu(t);
        },
        fold: function (n, e) {
          return e(t);
        },
        map: function (n) {
          return tu(n(t));
        },
        each: function (n) {
          n(t);
        },
        bind: function (n) {
          return n(t);
        },
        exists: function (n) {
          return n(t);
        },
        forall: function (n) {
          return n(t);
        },
        toOption: function () {
          return x.some(t);
        },
      };
    },
    ru = function (t) {
      return {
        is: y.never,
        isValue: y.never,
        isError: y.always,
        getOr: y.identity,
        getOrThunk: function (n) {
          return n();
        },
        getOrDie: function () {
          return y.die(String(t))();
        },
        or: function (n) {
          return n;
        },
        orThunk: function (n) {
          return n();
        },
        fold: function (n, e) {
          return n(t);
        },
        map: function (n) {
          return ru(t);
        },
        each: y.noop,
        bind: function (n) {
          return ru(t);
        },
        exists: y.never,
        forall: y.always,
        toOption: x.none,
      };
    },
    ou = {
      value: tu,
      error: ru,
    },
    iu = function (n, e) {
      return P.map(n, function () {
        return Q.elementnew(e.cell(), !0);
      });
    },
    uu = function (e, n, t) {
      return e.concat(
        mi(n, function (n) {
          return ii.setCells(e[e.length - 1], iu(e[e.length - 1].cells(), t));
        })
      );
    },
    au = function (n, e, t) {
      return P.map(n, function (n) {
        return ii.setCells(n, n.cells().concat(iu(gi(0, e), t)));
      });
    },
    cu = function (n, e, t) {
      if (n.row() >= e.length || n.column() > ii.cellLength(e[0]))
        return ou.error(
          "invalid start address out of table bounds, row: " +
            n.row() +
            ", column: " +
            n.column()
        );
      var r = e.slice(n.row()),
        o = r[0].cells().slice(n.column()),
        i = ii.cellLength(t[0]),
        u = t.length;
      return ou.value({
        rowDelta: y.constant(r.length - u),
        colDelta: y.constant(o.length - i),
      });
    },
    lu = function (n, e) {
      var t = ii.cellLength(n[0]),
        r = ii.cellLength(e[0]);
      return {
        rowDelta: y.constant(0),
        colDelta: y.constant(t - r),
      };
    },
    su = function (n, e, t) {
      var r = e.colDelta() < 0 ? au : y.identity;
      return (e.rowDelta() < 0 ? uu : y.identity)(
        r(n, Math.abs(e.colDelta()), t),
        Math.abs(e.rowDelta()),
        t
      );
    },
    fu = function (n, e, t, r) {
      if (0 === n.length) return n;
      for (var o = e.startRow(); o <= e.finishRow(); o++)
        for (var i = e.startCol(); i <= e.finishCol(); i++)
          ii.mutateCell(n[o], i, Q.elementnew(r(), !1));
      return n;
    },
    du = function (n, e, t, r) {
      for (var o = !0, i = 0; i < n.length; i++)
        for (var u = 0; u < ii.cellLength(n[0]); u++) {
          var a = t(ii.getCellElement(n[i], u), e);
          !0 === a && !1 === o
            ? ii.mutateCell(n[i], u, Q.elementnew(r(), !0))
            : !0 === a && (o = !1);
        }
      return n;
    },
    mu = function (i, u, a, c) {
      if (0 < u && u < i.length) {
        var n = i[u - 1].cells(),
          e =
            ((t = n),
            (r = a),
            P.foldl(
              t,
              function (n, e) {
                return P.exists(n, function (n) {
                  return r(n.element(), e.element());
                })
                  ? n
                  : n.concat([e]);
              },
              []
            ));
        P.each(e, function (n) {
          for (var e = x.none(), t = u; t < i.length; t++)
            for (var r = 0; r < ii.cellLength(i[0]); r++) {
              var o = i[t].cells()[r];
              a(o.element(), n.element()) &&
                (e.isNone() && (e = x.some(c())),
                e.each(function (n) {
                  ii.mutateCell(i[t], r, Q.elementnew(n, !0));
                }));
            }
        });
      }
      var t, r;
      return i;
    },
    gu = function (t, r, o, i, u) {
      return cu(t, r, o).map(function (n) {
        var e = su(r, n, i);
        return (function (n, e, t, r, o) {
          for (
            var i,
              u,
              a,
              c,
              l,
              s,
              f,
              d = n.row(),
              m = n.column(),
              g = d + t.length,
              h = m + ii.cellLength(t[0]),
              p = d;
            p < g;
            p++
          )
            for (var v = m; v < h; v++) {
              (i = e),
                (u = p),
                (a = v),
                (c = o),
                (s = l = void 0),
                (l = ii.getCell(i[u], a)),
                (s = y.curry(c, l.element())),
                (f = i[u]),
                1 < i.length &&
                  1 < ii.cellLength(f) &&
                  ((0 < a && s(ii.getCellElement(f, a - 1))) ||
                    (a < f.length - 1 && s(ii.getCellElement(f, a + 1))) ||
                    (0 < u && s(ii.getCellElement(i[u - 1], a))) ||
                    (u < i.length - 1 && s(ii.getCellElement(i[u + 1], a)))) &&
                  du(e, ii.getCellElement(e[p], v), o, r.cell);
              var b = ii.getCellElement(t[p - d], v - m),
                w = r.replace(b);
              ii.mutateCell(e[p], v, Q.elementnew(w, !0));
            }
          return e;
        })(t, e, o, i, u);
      });
    },
    hu = function (n, e, t, r, o) {
      mu(e, n, o, r.cell);
      var i = lu(t, e),
        u = su(t, i, r),
        a = lu(e, u),
        c = su(e, a, r);
      return c.slice(0, n).concat(u).concat(c.slice(n, c.length));
    },
    pu = function (t, r, n, o, i) {
      var e = t.slice(0, r),
        u = t.slice(r),
        a = ii.mapCells(t[n], function (n, e) {
          return 0 < r &&
            r < t.length &&
            o(ii.getCellElement(t[r - 1], e), ii.getCellElement(t[r], e))
            ? ii.getCell(t[r], e)
            : Q.elementnew(i(n.element(), o), !0);
        });
      return e.concat([a]).concat(u);
    },
    vu = function (n, t, r, o, i) {
      return P.map(n, function (n) {
        var e =
          0 < t &&
          t < ii.cellLength(n) &&
          o(ii.getCellElement(n, t - 1), ii.getCellElement(n, t))
            ? ii.getCell(n, t)
            : Q.elementnew(i(ii.getCellElement(n, r), o), !0);
        return ii.addCell(n, t, e);
      });
    },
    bu = function (n, r, o, i, u) {
      var a = o + 1;
      return P.map(n, function (n, e) {
        var t =
          e === r
            ? Q.elementnew(u(ii.getCellElement(n, o), i), !0)
            : ii.getCell(n, o);
        return ii.addCell(n, a, t);
      });
    },
    wu = function (n, e, t, r, o) {
      var i = e + 1,
        u = n.slice(0, i),
        a = n.slice(i),
        c = ii.mapCells(n[e], function (n, e) {
          return e === t ? Q.elementnew(o(n.element(), r), !0) : n;
        });
      return u.concat([c]).concat(a);
    },
    yu = function (n, e, t) {
      return n.slice(0, e).concat(n.slice(t + 1));
    },
    xu = function (n, t, r) {
      var e = P.map(n, function (n) {
        var e = n
          .cells()
          .slice(0, t)
          .concat(n.cells().slice(r + 1));
        return Q.rowcells(e, n.section());
      });
      return P.filter(e, function (n) {
        return 0 < n.cells().length;
      });
    },
    Cu = function (n, t, r, o) {
      return P.map(n, function (n) {
        return ii.mapCells(n, function (n) {
          return (
            (e = n),
            P.exists(t, function (n) {
              return r(e.element(), n.element());
            })
              ? Q.elementnew(o(n.element(), r), !0)
              : n
          );
          var e;
        });
      });
    },
    Ru = function (n, e, t, r) {
      return (
        ii.getCellElement(n[e], t) !== undefined &&
        0 < e &&
        r(ii.getCellElement(n[e - 1], t), ii.getCellElement(n[e], t))
      );
    },
    Su = function (n, e, t) {
      return 0 < e && t(ii.getCellElement(n, e - 1), ii.getCellElement(n, e));
    },
    Tu = function (t, r, o, n) {
      var e = P.bind(t, function (n, e) {
        return Ru(t, e, r, o) || Su(n, r, o) ? [] : [ii.getCell(n, r)];
      });
      return Cu(t, e, o, n);
    },
    Du = function (t, r, o, n) {
      var i = t[r],
        e = P.bind(i.cells(), function (n, e) {
          return Ru(t, r, e, o) || Su(i, e, o) ? [] : [n];
        });
      return Cu(t, e, o, n);
    },
    ku = function (n) {
      return {
        fold: n,
      };
    },
    Au = function () {
      return ku(function (n, e, t, r, o) {
        return n();
      });
    },
    Ou = function (i) {
      return ku(function (n, e, t, r, o) {
        return e(i);
      });
    },
    Nu = function (i, u) {
      return ku(function (n, e, t, r, o) {
        return t(i, u);
      });
    },
    Eu = function (i, u, a) {
      return ku(function (n, e, t, r, o) {
        return r(i, u, a);
      });
    },
    Pu = function (i, u) {
      return ku(function (n, e, t, r, o) {
        return o(i, u);
      });
    },
    Bu = function (n, e, i, u) {
      var t,
        r,
        a = n.slice(0),
        o =
          ((r = e),
          0 === (t = n).length
            ? Au()
            : 1 === t.length
            ? Ou(0)
            : 0 === r
            ? Nu(0, 1)
            : r === t.length - 1
            ? Pu(r - 1, r)
            : 0 < r && r < t.length - 1
            ? Eu(r - 1, r, r + 1)
            : Au()),
        c = function (n) {
          return P.map(n, y.constant(0));
        },
        l = y.constant(c(a)),
        s = function (n, e) {
          if (0 <= i) {
            var t = Math.max(u.minCellWidth(), a[e] - i);
            return c(a.slice(0, n))
              .concat([i, t - a[e]])
              .concat(c(a.slice(e + 1)));
          }
          var r = Math.max(u.minCellWidth(), a[n] + i),
            o = a[n] - r;
          return c(a.slice(0, n))
            .concat([r - a[n], o])
            .concat(c(a.slice(e + 1)));
        },
        f = s;
      return o.fold(
        l,
        function (n) {
          return u.singleColumnWidth(a[n], i);
        },
        f,
        function (n, e, t) {
          return s(e, t);
        },
        function (n, e) {
          if (0 <= i) return c(a.slice(0, e)).concat([i]);
          var t = Math.max(u.minCellWidth(), a[e] + i);
          return c(a.slice(0, e)).concat([t - a[e]]);
        }
      );
    },
    Iu = function (n, e) {
      return Se.has(n, e) && 1 < parseInt(Se.get(n, e), 10);
    },
    Wu = {
      hasColspan: function (n) {
        return Iu(n, "colspan");
      },
      hasRowspan: function (n) {
        return Iu(n, "rowspan");
      },
      minWidth: y.constant(10),
      minHeight: y.constant(10),
      getInt: function (n, e) {
        return parseInt(ut.get(n, e), 10);
      },
    },
    Mu = function (n, e, t) {
      return ut.getRaw(n, e).fold(
        function () {
          return t(n) + "px";
        },
        function (n) {
          return n;
        }
      );
    },
    Lu = function (n) {
      return Mu(n, "width", ao.getPixelWidth);
    },
    qu = function (n) {
      return Mu(n, "height", ao.getHeight);
    },
    ju = function (n, e, t, r, o) {
      var i = vi(n),
        u = P.map(i, function (n) {
          return n.map(e.edge);
        });
      return P.map(i, function (n, e) {
        return n.filter(y.not(Wu.hasColspan)).fold(
          function () {
            var n = hi(u, e);
            return r(n);
          },
          function (n) {
            return t(n, o);
          }
        );
      });
    },
    _u = function (n) {
      return n
        .map(function (n) {
          return n + "px";
        })
        .getOr("");
    },
    zu = function (n, e, t, r) {
      var o = bi(n),
        i = P.map(o, function (n) {
          return n.map(e.edge);
        });
      return P.map(o, function (n, e) {
        return n.filter(y.not(Wu.hasRowspan)).fold(
          function () {
            var n = hi(i, e);
            return r(n);
          },
          function (n) {
            return t(n);
          }
        );
      });
    },
    Hu = {
      getRawWidths: function (n, e) {
        return ju(n, e, Lu, _u);
      },
      getPixelWidths: function (n, e, t) {
        return ju(
          n,
          e,
          ao.getPixelWidth,
          function (n) {
            return n.getOrThunk(t.minCellWidth);
          },
          t
        );
      },
      getPercentageWidths: function (n, e, t) {
        return ju(
          n,
          e,
          ao.getPercentageWidth,
          function (n) {
            return n.fold(
              function () {
                return t.minCellWidth();
              },
              function (n) {
                return (n / t.pixelWidth()) * 100;
              }
            );
          },
          t
        );
      },
      getPixelHeights: function (n, e) {
        return zu(n, e, ao.getHeight, function (n) {
          return n.getOrThunk(Wu.minHeight);
        });
      },
      getRawHeights: function (n, e) {
        return zu(n, e, qu, _u);
      },
    },
    Fu = function (n, e, t) {
      for (var r = 0, o = n; o < e; o++) r += t[o] !== undefined ? t[o] : 0;
      return r;
    },
    Uu = function (n, t) {
      var e = Ze.justCells(n);
      return P.map(e, function (n) {
        var e = Fu(n.column(), n.column() + n.colspan(), t);
        return {
          element: n.element,
          width: y.constant(e),
          colspan: n.colspan,
        };
      });
    },
    Vu = function (n, t) {
      var e = Ze.justCells(n);
      return P.map(e, function (n) {
        var e = Fu(n.row(), n.row() + n.rowspan(), t);
        return {
          element: n.element,
          height: y.constant(e),
          rowspan: n.rowspan,
        };
      });
    },
    Gu = function (n, t) {
      return P.map(n.all(), function (n, e) {
        return {
          element: n.element,
          height: y.constant(t[e]),
        };
      });
    },
    Xu = function (n) {
      var e = parseInt(n, 10),
        t = y.identity;
      return {
        width: y.constant(e),
        pixelWidth: y.constant(e),
        getWidths: Hu.getPixelWidths,
        getCellDelta: t,
        singleColumnWidth: function (n, e) {
          return [Math.max(Wu.minWidth(), n + e) - n];
        },
        minCellWidth: Wu.minWidth,
        setElementWidth: ao.setPixelWidth,
        setTableWidth: function (n, e, t) {
          var r = P.foldr(
            e,
            function (n, e) {
              return n + e;
            },
            0
          );
          ao.setPixelWidth(n, r);
        },
      };
    },
    Yu = function (n, e) {
      if (ao.percentageBasedSizeRegex().test(e)) {
        var t = ao.percentageBasedSizeRegex().exec(e);
        return (
          (o = t[1]),
          (i = n),
          (u = parseFloat(o)),
          (a = Xr(i)),
          {
            width: y.constant(u),
            pixelWidth: y.constant(a),
            getWidths: Hu.getPercentageWidths,
            getCellDelta: function (n) {
              return (n / a) * 100;
            },
            singleColumnWidth: function (n, e) {
              return [100 - n];
            },
            minCellWidth: function () {
              return (Wu.minWidth() / a) * 100;
            },
            setElementWidth: ao.setPercentageWidth,
            setTableWidth: function (n, e, t) {
              var r = u + t;
              ao.setPercentageWidth(n, r);
            },
          }
        );
      }
      if (ao.pixelBasedSizeRegex().test(e)) {
        var r = ao.pixelBasedSizeRegex().exec(e);
        return Xu(r[1]);
      }
      var o,
        i,
        u,
        a,
        c = Xr(n);
      return Xu(c);
    },
    Ku = function (e) {
      return ao.getRawWidth(e).fold(
        function () {
          var n = Xr(e);
          return Xu(n);
        },
        function (n) {
          return Yu(e, n);
        }
      );
    },
    $u = function (n) {
      return Ze.generate(n);
    },
    Ju = function (n) {
      var e = Ke(n);
      return $u(e);
    },
    Qu = function (n, e, t, r) {
      var o = Ku(n),
        i = o.getCellDelta(e),
        u = Ju(n),
        a = o.getWidths(u, r, o),
        c = Bu(a, t, i, o),
        l = P.map(c, function (n, e) {
          return n + a[e];
        }),
        s = Uu(u, l);
      P.each(s, function (n) {
        o.setElementWidth(n.element(), n.width());
      }),
        t === u.grid().columns() - 1 && o.setTableWidth(n, l, i);
    },
    Zu = function (n, t, r, e) {
      var o = Ju(n),
        i = Hu.getPixelHeights(o, e),
        u = P.map(i, function (n, e) {
          return r === e ? Math.max(t + n, Wu.minHeight()) : n;
        }),
        a = Vu(o, u),
        c = Gu(o, u);
      P.each(c, function (n) {
        ao.setHeight(n.element(), n.height());
      }),
        P.each(a, function (n) {
          ao.setHeight(n.element(), n.height());
        });
      var l,
        s =
          ((l = u),
          P.foldr(
            l,
            function (n, e) {
              return n + e;
            },
            0
          ));
      ao.setHeight(n, s);
    },
    na = function (n, e, t) {
      var r = Ku(n),
        o = $u(e),
        i = r.getWidths(o, t, r),
        u = Uu(o, i);
      P.each(u, function (n) {
        r.setElementWidth(n.element(), n.width());
      });
      var a = P.foldr(
        i,
        function (n, e) {
          return e + n;
        },
        0
      );
      0 < u.length && r.setElementWidth(n, a);
    },
    ea = function (n) {
      0 === Ye.cells(n).length && dt.remove(n);
    },
    ta = V.immutable("grid", "cursor"),
    ra = function (n, e, t) {
      return oa(n, e, t).orThunk(function () {
        return oa(n, 0, 0);
      });
    },
    oa = function (n, e, t) {
      return x.from(n[e]).bind(function (n) {
        return x.from(n.cells()[t]).bind(function (n) {
          return x.from(n.element());
        });
      });
    },
    ia = function (n, e, t) {
      return ta(n, oa(n, e, t));
    },
    ua = function (n) {
      return P.foldl(
        n,
        function (n, e) {
          return P.exists(n, function (n) {
            return n.row() === e.row();
          })
            ? n
            : n.concat([e]);
        },
        []
      ).sort(function (n, e) {
        return n.row() - e.row();
      });
    },
    aa = function (n) {
      return P.foldl(
        n,
        function (n, e) {
          return P.exists(n, function (n) {
            return n.column() === e.column();
          })
            ? n
            : n.concat([e]);
        },
        []
      ).sort(function (n, e) {
        return n.column() - e.column();
      });
    },
    ca = function (n, e, t) {
      var r = $e(n, t),
        o = Ze.generate(r);
      return li(o, e, !0);
    },
    la = na,
    sa = {
      insertRowBefore: Yi(
        function (n, e, t, r) {
          var o = e.row(),
            i = e.row(),
            u = pu(n, i, o, t, r.getOrInit);
          return ia(u, i, e.column());
        },
        $i,
        y.noop,
        y.noop,
        Lo
      ),
      insertRowsBefore: Yi(
        function (n, e, t, r) {
          var o = e[0].row(),
            i = e[0].row(),
            u = ua(e),
            a = P.foldl(
              u,
              function (n, e) {
                return pu(n, i, o, t, r.getOrInit);
              },
              n
            );
          return ia(a, i, e[0].column());
        },
        Ji,
        y.noop,
        y.noop,
        Lo
      ),
      insertRowAfter: Yi(
        function (n, e, t, r) {
          var o = e.row(),
            i = e.row() + e.rowspan(),
            u = pu(n, i, o, t, r.getOrInit);
          return ia(u, i, e.column());
        },
        $i,
        y.noop,
        y.noop,
        Lo
      ),
      insertRowsAfter: Yi(
        function (n, e, t, r) {
          var o = ua(e),
            i = o[o.length - 1].row(),
            u = o[o.length - 1].row() + o[o.length - 1].rowspan(),
            a = P.foldl(
              o,
              function (n, e) {
                return pu(n, u, i, t, r.getOrInit);
              },
              n
            );
          return ia(a, u, e[0].column());
        },
        Ji,
        y.noop,
        y.noop,
        Lo
      ),
      insertColumnBefore: Yi(
        function (n, e, t, r) {
          var o = e.column(),
            i = e.column(),
            u = vu(n, i, o, t, r.getOrInit);
          return ia(u, e.row(), i);
        },
        $i,
        la,
        y.noop,
        Lo
      ),
      insertColumnsBefore: Yi(
        function (n, e, t, r) {
          var o = aa(e),
            i = o[0].column(),
            u = o[0].column(),
            a = P.foldl(
              o,
              function (n, e) {
                return vu(n, u, i, t, r.getOrInit);
              },
              n
            );
          return ia(a, e[0].row(), u);
        },
        Ji,
        la,
        y.noop,
        Lo
      ),
      insertColumnAfter: Yi(
        function (n, e, t, r) {
          var o = e.column(),
            i = e.column() + e.colspan(),
            u = vu(n, i, o, t, r.getOrInit);
          return ia(u, e.row(), i);
        },
        $i,
        la,
        y.noop,
        Lo
      ),
      insertColumnsAfter: Yi(
        function (n, e, t, r) {
          var o = e[e.length - 1].column(),
            i = e[e.length - 1].column() + e[e.length - 1].colspan(),
            u = aa(e),
            a = P.foldl(
              u,
              function (n, e) {
                return vu(n, i, o, t, r.getOrInit);
              },
              n
            );
          return ia(a, e[0].row(), i);
        },
        Ji,
        la,
        y.noop,
        Lo
      ),
      splitCellIntoColumns: Yi(
        function (n, e, t, r) {
          var o = bu(n, e.row(), e.column(), t, r.getOrInit);
          return ia(o, e.row(), e.column());
        },
        $i,
        la,
        y.noop,
        Lo
      ),
      splitCellIntoRows: Yi(
        function (n, e, t, r) {
          var o = wu(n, e.row(), e.column(), t, r.getOrInit);
          return ia(o, e.row(), e.column());
        },
        $i,
        y.noop,
        y.noop,
        Lo
      ),
      eraseColumns: Yi(
        function (n, e, t, r) {
          var o = aa(e),
            i = xu(n, o[0].column(), o[o.length - 1].column()),
            u = ra(i, e[0].row(), e[0].column());
          return ta(i, u);
        },
        Ji,
        la,
        ea,
        Lo
      ),
      eraseRows: Yi(
        function (n, e, t, r) {
          var o = ua(e),
            i = yu(n, o[0].row(), o[o.length - 1].row()),
            u = ra(i, e[0].row(), e[0].column());
          return ta(i, u);
        },
        Ji,
        y.noop,
        ea,
        Lo
      ),
      makeColumnHeader: Yi(
        function (n, e, t, r) {
          var o = Tu(n, e.column(), t, r.replaceOrInit);
          return ia(o, e.row(), e.column());
        },
        $i,
        y.noop,
        y.noop,
        qo("row", "th")
      ),
      unmakeColumnHeader: Yi(
        function (n, e, t, r) {
          var o = Tu(n, e.column(), t, r.replaceOrInit);
          return ia(o, e.row(), e.column());
        },
        $i,
        y.noop,
        y.noop,
        qo(null, "td")
      ),
      makeRowHeader: Yi(
        function (n, e, t, r) {
          var o = Du(n, e.row(), t, r.replaceOrInit);
          return ia(o, e.row(), e.column());
        },
        $i,
        y.noop,
        y.noop,
        qo("col", "th")
      ),
      unmakeRowHeader: Yi(
        function (n, e, t, r) {
          var o = Du(n, e.row(), t, r.replaceOrInit);
          return ia(o, e.row(), e.column());
        },
        $i,
        y.noop,
        y.noop,
        qo(null, "td")
      ),
      mergeCells: Yi(
        function (n, e, t, r) {
          var o = e.cells();
          $o(o);
          var i = fu(n, e.bounds(), t, y.constant(o[0]));
          return ta(i, x.from(o[0]));
        },
        nu,
        y.noop,
        y.noop,
        jo
      ),
      unmergeCells: Yi(
        function (n, e, t, r) {
          var o = P.foldr(
            e,
            function (n, e) {
              return du(n, e, t, r.combine(e));
            },
            n
          );
          return ta(o, x.from(e[0]));
        },
        eu,
        la,
        y.noop,
        jo
      ),
      pasteCells: Yi(
        function (n, t, e, r) {
          var o,
            i,
            u,
            a,
            c =
              ((o = t.clipboard()),
              (i = t.generators()),
              (u = Ke(o)),
              (a = Ze.generate(u)),
              li(a, i, !0)),
            l = Q.address(t.row(), t.column());
          return gu(l, n, c, t.generators(), e).fold(
            function () {
              return ta(n, x.some(t.element()));
            },
            function (n) {
              var e = ra(n, t.row(), t.column());
              return ta(n, e);
            }
          );
        },
        Qi,
        la,
        y.noop,
        Lo
      ),
      pasteRowsBefore: Yi(
        function (n, e, t, r) {
          var o = n[e.cells[0].row()],
            i = e.cells[0].row(),
            u = ca(e.clipboard(), e.generators(), o),
            a = hu(i, n, u, e.generators(), t),
            c = ra(a, e.cells[0].row(), e.cells[0].column());
          return ta(a, c);
        },
        Zi,
        y.noop,
        y.noop,
        Lo
      ),
      pasteRowsAfter: Yi(
        function (n, e, t, r) {
          var o = n[e.cells[0].row()],
            i =
              e.cells[e.cells.length - 1].row() +
              e.cells[e.cells.length - 1].rowspan(),
            u = ca(e.clipboard(), e.generators(), o),
            a = hu(i, n, u, e.generators(), t),
            c = ra(a, e.cells[0].row(), e.cells[0].column());
          return ta(a, c);
        },
        Zi,
        y.noop,
        y.noop,
        Lo
      ),
    },
    fa = function (n) {
      return nn.fromDom(n.getBody());
    },
    da = function (n) {
      return n.getBoundingClientRect().width;
    },
    ma = function (n) {
      return n.getBoundingClientRect().height;
    },
    ga = function (e) {
      return function (n) {
        return te.eq(n, fa(e));
      };
    },
    ha = function (n) {
      return /^[0-9]+$/.test(n) && (n += "px"), n;
    },
    pa = function (n) {
      var e = Ne.descendants(n, "td[data-mce-style],th[data-mce-style]");
      Se.remove(n, "data-mce-style"),
        P.each(e, function (n) {
          Se.remove(n, "data-mce-style");
        });
    },
    va = function (n) {
      return "rtl" === ut.get(n, "direction") ? "rtl" : "ltr";
    },
    ba = {
      onDirection: function (e, t) {
        return function (n) {
          return "rtl" === va(n) ? t : e;
        };
      },
      getDirection: va,
    },
    wa = {
      isRtl: y.constant(!1),
    },
    ya = {
      isRtl: y.constant(!0),
    },
    xa = {
      directionAt: function (n) {
        return "rtl" === ba.getDirection(n) ? ya : wa;
      },
    },
    Ca = [
      "tableprops",
      "tabledelete",
      "|",
      "tableinsertrowbefore",
      "tableinsertrowafter",
      "tabledeleterow",
      "|",
      "tableinsertcolbefore",
      "tableinsertcolafter",
      "tabledeletecol",
    ],
    Ra = {
      "border-collapse": "collapse",
      width: "100%",
    },
    Sa = {
      border: "1",
    },
    Ta = function (n) {
      return n.getParam("table_cell_advtab", !0, "boolean");
    },
    Da = function (n) {
      return n.getParam("table_row_advtab", !0, "boolean");
    },
    ka = function (n) {
      return n.getParam("table_advtab", !0, "boolean");
    },
    Aa = function (n) {
      return n.getParam("table_style_by_css", !1, "boolean");
    },
    Oa = function (n) {
      return n.getParam("table_cell_class_list", [], "array");
    },
    Na = function (n) {
      return n.getParam("table_row_class_list", [], "array");
    },
    Ea = function (n) {
      return n.getParam("table_class_list", [], "array");
    },
    Pa = function (n) {
      return !1 === n.getParam("table_responsive_width");
    },
    Ba = function (n, e) {
      return n.fire("newrow", {
        node: e,
      });
    },
    Ia = function (n, e) {
      return n.fire("newcell", {
        node: e,
      });
    },
    Wa = function (n, e, t, r) {
      n.fire("ObjectResizeStart", {
        target: e,
        width: t,
        height: r,
      });
    },
    Ma = function (n, e, t, r) {
      n.fire("ObjectResized", {
        target: e,
        width: t,
        height: r,
      });
    },
    La = function (s, n) {
      var e,
        t = function (n) {
          return "table" === we.name(fa(n));
        },
        f =
          ((e = s.getParam("table_clone_elements")),
          p.isString(e)
            ? x.some(e.split(/[ ,]/))
            : Array.isArray(e)
            ? x.some(e)
            : x.none()),
        r = function (u, a, c, l) {
          return function (n, e) {
            pa(n);
            var t = l(),
              r = nn.fromDom(s.getDoc()),
              o = Ao(xa.directionAt),
              i = Bt(c, r, f);
            return a(n)
              ? u(t, n, e, i, o).bind(function (n) {
                  return (
                    P.each(n.newRows(), function (n) {
                      Ba(s, n.dom());
                    }),
                    P.each(n.newCells(), function (n) {
                      Ia(s, n.dom());
                    }),
                    n.cursor().map(function (n) {
                      var e = s.dom.createRng();
                      return e.setStart(n.dom(), 0), e.setEnd(n.dom(), 0), e;
                    })
                  );
                })
              : x.none();
          };
        };
      return {
        deleteRow: r(
          sa.eraseRows,
          function (n) {
            var e = Oo(n);
            return !1 === t(s) || 1 < e.rows();
          },
          y.noop,
          n
        ),
        deleteColumn: r(
          sa.eraseColumns,
          function (n) {
            var e = Oo(n);
            return !1 === t(s) || 1 < e.columns();
          },
          y.noop,
          n
        ),
        insertRowsBefore: r(sa.insertRowsBefore, y.always, y.noop, n),
        insertRowsAfter: r(sa.insertRowsAfter, y.always, y.noop, n),
        insertColumnsBefore: r(sa.insertColumnsBefore, y.always, co, n),
        insertColumnsAfter: r(sa.insertColumnsAfter, y.always, co, n),
        mergeCells: r(sa.mergeCells, y.always, y.noop, n),
        unmergeCells: r(sa.unmergeCells, y.always, y.noop, n),
        pasteRowsBefore: r(sa.pasteRowsBefore, y.always, y.noop, n),
        pasteRowsAfter: r(sa.pasteRowsAfter, y.always, y.noop, n),
        pasteCells: r(sa.pasteCells, y.always, y.noop, n),
      };
    },
    qa = function (n, e, r) {
      var t = Ke(n),
        o = Ze.generate(t);
      return Ji(o, e).map(function (n) {
        var e = li(o, r, !1).slice(
            n[0].row(),
            n[n.length - 1].row() + n[n.length - 1].rowspan()
          ),
          t = Ki(e, r);
        return di(t);
      });
    },
    ja = tinymce.util.Tools.resolve("tinymce.util.Tools"),
    _a = function (n, e, t) {
      t && n.formatter.apply("align" + t, {}, e);
    },
    za = function (n, e, t) {
      t && n.formatter.apply("valign" + t, {}, e);
    },
    Ha = function (e, t) {
      ja.each("left center right".split(" "), function (n) {
        e.formatter.remove("align" + n, {}, t);
      });
    },
    Fa = function (e, t) {
      ja.each("top middle bottom".split(" "), function (n) {
        e.formatter.remove("valign" + n, {}, t);
      });
    },
    Ua = function (o, n, i) {
      var e;
      return (e = (function (n, e) {
        for (var t = 0; t < e.length; t++) {
          var r = o.getStyle(e[t], i);
          if ((void 0 === n && (n = r), n !== r)) return "";
        }
        return n;
      })(e, o.select("td,th", n)));
    },
    Va = function (n, e) {
      var t = n.dom,
        r = e.control.rootControl,
        o = r.toJSON(),
        i = t.parseStyle(o.style);
      "style" === e.control.name()
        ? (r
            .find("#borderStyle")
            .value(i["border-style"] || "")[0]
            .fire("select"),
          r
            .find("#borderColor")
            .value(i["border-color"] || "")[0]
            .fire("change"),
          r
            .find("#backgroundColor")
            .value(i["background-color"] || "")[0]
            .fire("change"),
          r
            .find("#width")
            .value(i.width || "")
            .fire("change"),
          r
            .find("#height")
            .value(i.height || "")
            .fire("change"))
        : ((i["border-style"] = o.borderStyle),
          (i["border-color"] = o.borderColor),
          (i["background-color"] = o.backgroundColor),
          (i.width = o.width ? ha(o.width) : ""),
          (i.height = o.height ? ha(o.height) : "")),
        r
          .find("#style")
          .value(t.serializeStyle(t.parseStyle(t.serializeStyle(i))));
    },
    Ga = function (t) {
      var n = function () {
        var n = t.getParam("color_picker_callback");
        if (n)
          return function (e) {
            return n.call(
              t,
              function (n) {
                e.control.value(n).fire("change");
              },
              e.control.value()
            );
          };
      };
      return {
        title: "Advanced",
        type: "form",
        defaults: {
          onchange: y.curry(Va, t),
        },
        items: [
          {
            label: "Style",
            name: "style",
            type: "textbox",
          },
          {
            type: "form",
            padding: 0,
            formItemDefaults: {
              layout: "grid",
              alignH: ["start", "right"],
            },
            defaults: {
              size: 7,
            },
            items: [
              {
                label: "Border style",
                type: "listbox",
                name: "borderStyle",
                width: 90,
                onselect: y.curry(Va, t),
                values: [
                  {
                    text: "Select...",
                    value: "",
                  },
                  {
                    text: "Solid",
                    value: "solid",
                  },
                  {
                    text: "Dotted",
                    value: "dotted",
                  },
                  {
                    text: "Dashed",
                    value: "dashed",
                  },
                  {
                    text: "Double",
                    value: "double",
                  },
                  {
                    text: "Groove",
                    value: "groove",
                  },
                  {
                    text: "Ridge",
                    value: "ridge",
                  },
                  {
                    text: "Inset",
                    value: "inset",
                  },
                  {
                    text: "Outset",
                    value: "outset",
                  },
                  {
                    text: "None",
                    value: "none",
                  },
                  {
                    text: "Hidden",
                    value: "hidden",
                  },
                ],
              },
              {
                label: "Border color",
                type: "colorbox",
                name: "borderColor",
                onaction: n(),
              },
              {
                label: "Background color",
                type: "colorbox",
                name: "backgroundColor",
                onaction: n(),
              },
            ],
          },
        ],
      };
    },
    Xa = function (n, r, e) {
      var o = function (n, t) {
        return (
          (t = t || []),
          ja.each(n, function (n) {
            var e = {
              text: n.text || n.title,
            };
            n.menu ? (e.menu = o(n.menu)) : ((e.value = n.value), r && r(e)),
              t.push(e);
          }),
          t
        );
      };
      return o(n, e || []);
    },
    Ya = Va,
    Ka = function (n, e) {
      var t = n.parseStyle(n.getAttrib(e, "style")),
        r = {};
      return (
        t["border-style"] && (r.borderStyle = t["border-style"]),
        t["border-color"] && (r.borderColor = t["border-color"]),
        t["background-color"] && (r.backgroundColor = t["background-color"]),
        (r.style = n.serializeStyle(t)),
        r
      );
    },
    $a = function (r, o, n) {
      var i,
        u = r.dom;

      function a(n, e, t) {
        t && u.setAttrib(n, e, t);
      }

      function c(n, e, t) {
        t && u.setStyle(n, e, t);
      }
      Ya(r, n),
        (i = n.control.rootControl.toJSON()),
        r.undoManager.transact(function () {
          ja.each(o, function (n) {
            var e, t;
            a(n, "scope", i.scope),
              1 === o.length
                ? a(n, "style", i.style)
                : ((e = n),
                  (t = i.style),
                  delete e.dataset.mceStyle,
                  (e.style.cssText += ";" + t)),
              a(n, "class", i["class"]),
              c(n, "width", ha(i.width)),
              c(n, "height", ha(i.height)),
              i.type &&
                n.nodeName.toLowerCase() !== i.type &&
                (n = u.rename(n, i.type)),
              1 === o.length && (Ha(r, n), Fa(r, n)),
              i.align && _a(r, n, i.align),
              i.valign && za(r, n, i.valign);
          }),
            r.focus();
        });
    },
    Ja = function (e) {
      var n,
        t,
        r,
        o = [];
      if (
        ((o = e.dom.select("td[data-mce-selected],th[data-mce-selected]")),
        (n = e.dom.getParent(e.selection.getStart(), "td,th")),
        !o.length && n && o.push(n),
        (n = n || o[0]))
      ) {
        var i, u, a, c;
        1 < o.length
          ? (t = {
              width: "",
              height: "",
              scope: "",
              class: "",
              align: "",
              valign: "",
              style: "",
              type: n.nodeName.toLowerCase(),
            })
          : ((u = n),
            (a = (i = e).dom),
            (c = {
              width: a.getStyle(u, "width") || a.getAttrib(u, "width"),
              height: a.getStyle(u, "height") || a.getAttrib(u, "height"),
              scope: a.getAttrib(u, "scope"),
              class: a.getAttrib(u, "class"),
              type: u.nodeName.toLowerCase(),
              style: "",
              align: "",
              valign: "",
            }),
            ja.each("left center right".split(" "), function (n) {
              i.formatter.matchNode(u, "align" + n) && (c.align = n);
            }),
            ja.each("top middle bottom".split(" "), function (n) {
              i.formatter.matchNode(u, "valign" + n) && (c.valign = n);
            }),
            Ta(i) && ja.extend(c, Ka(a, u)),
            (t = c)),
          0 < Oa(e).length &&
            (r = {
              name: "class",
              type: "listbox",
              label: "Class",
              values: Xa(Oa(e), function (n) {
                n.value &&
                  (n.textStyle = function () {
                    return e.formatter.getCssText({
                      block: "td",
                      classes: [n.value],
                    });
                  });
              }),
            });
        var l = {
          type: "form",
          layout: "flex",
          direction: "column",
          labelGapCalc: "children",
          padding: 0,
          items: [
            {
              type: "form",
              layout: "grid",
              columns: 2,
              labelGapCalc: !1,
              padding: 0,
              defaults: {
                type: "textbox",
                maxWidth: 50,
              },
              items: [
                {
                  label: "Width",
                  name: "width",
                  onchange: y.curry(Ya, e),
                },
                {
                  label: "Height",
                  name: "height",
                  onchange: y.curry(Ya, e),
                },
                {
                  label: "Cell type",
                  name: "type",
                  type: "listbox",
                  text: "None",
                  minWidth: 90,
                  maxWidth: null,
                  values: [
                    {
                      text: "Cell",
                      value: "td",
                    },
                    {
                      text: "Header cell",
                      value: "th",
                    },
                  ],
                },
                {
                  label: "Scope",
                  name: "scope",
                  type: "listbox",
                  text: "None",
                  minWidth: 90,
                  maxWidth: null,
                  values: [
                    {
                      text: "None",
                      value: "",
                    },
                    {
                      text: "Row",
                      value: "row",
                    },
                    {
                      text: "Column",
                      value: "col",
                    },
                    {
                      text: "Row group",
                      value: "rowgroup",
                    },
                    {
                      text: "Column group",
                      value: "colgroup",
                    },
                  ],
                },
                {
                  label: "H Align",
                  name: "align",
                  type: "listbox",
                  text: "None",
                  minWidth: 90,
                  maxWidth: null,
                  values: [
                    {
                      text: "None",
                      value: "",
                    },
                    {
                      text: "Left",
                      value: "left",
                    },
                    {
                      text: "Center",
                      value: "center",
                    },
                    {
                      text: "Right",
                      value: "right",
                    },
                  ],
                },
                {
                  label: "V Align",
                  name: "valign",
                  type: "listbox",
                  text: "None",
                  minWidth: 90,
                  maxWidth: null,
                  values: [
                    {
                      text: "None",
                      value: "",
                    },
                    {
                      text: "Top",
                      value: "top",
                    },
                    {
                      text: "Middle",
                      value: "middle",
                    },
                    {
                      text: "Bottom",
                      value: "bottom",
                    },
                  ],
                },
              ],
            },
            r,
          ],
        };
        Ta(e)
          ? e.windowManager.open({
              title: "Cell properties",
              bodyType: "tabpanel",
              data: t,
              body: [
                {
                  title: "General",
                  type: "form",
                  items: l,
                },
                Ga(e),
              ],
              onsubmit: y.curry($a, e, o),
            })
          : e.windowManager.open({
              title: "Cell properties",
              data: t,
              body: l,
              onsubmit: y.curry($a, e, o),
            });
      }
    };

  function Qa(s, n, f, e) {
    var d = s.dom;

    function m(n, e, t) {
      t && d.setAttrib(n, e, t);
    }
    Ya(s, e);
    var g = e.control.rootControl.toJSON();
    s.undoManager.transact(function () {
      ja.each(n, function (n) {
        var e, t, r, o, i, u, a, c, l;
        m(n, "scope", g.scope),
          m(n, "style", g.style),
          m(n, "class", g["class"]),
          (e = n),
          (t = "height"),
          (r = ha(g.height)) && d.setStyle(e, t, r),
          g.type !== n.parentNode.nodeName.toLowerCase() &&
            ((o = s.dom),
            (i = n),
            (u = g.type),
            (a = o.getParent(i, "table")),
            (c = i.parentNode),
            (l = o.select(u, a)[0]) ||
              ((l = o.create(u)),
              a.firstChild
                ? "CAPTION" === a.firstChild.nodeName
                  ? o.insertAfter(l, a.firstChild)
                  : a.insertBefore(l, a.firstChild)
                : a.appendChild(l)),
            l.appendChild(i),
            c.hasChildNodes() || o.remove(c)),
          g.align !== f.align && (Ha(s, n), _a(s, n, g.align));
      }),
        s.focus();
    });
  }
  var Za = function (e) {
      var n,
        t,
        r,
        o,
        i,
        u,
        a,
        c,
        l,
        s,
        f = e.dom,
        d = [];
      (n = f.getParent(e.selection.getStart(), "table")),
        (t = f.getParent(e.selection.getStart(), "td,th")),
        ja.each(n.rows, function (e) {
          ja.each(e.cells, function (n) {
            if (f.getAttrib(n, "data-mce-selected") || n === t)
              return d.push(e), !1;
          });
        }),
        (r = d[0]) &&
          (1 < d.length
            ? (i = {
                height: "",
                scope: "",
                style: "",
                class: "",
                align: "",
                type: r.parentNode.nodeName.toLowerCase(),
              })
            : ((c = r),
              (l = (a = e).dom),
              (s = {
                height: l.getStyle(c, "height") || l.getAttrib(c, "height"),
                scope: l.getAttrib(c, "scope"),
                class: l.getAttrib(c, "class"),
                align: "",
                style: "",
                type: c.parentNode.nodeName.toLowerCase(),
              }),
              ja.each("left center right".split(" "), function (n) {
                a.formatter.matchNode(c, "align" + n) && (s.align = n);
              }),
              Da(a) && ja.extend(s, Ka(l, c)),
              (i = s)),
          0 < Na(e).length &&
            (o = {
              name: "class",
              type: "listbox",
              label: "Class",
              values: Xa(Na(e), function (n) {
                n.value &&
                  (n.textStyle = function () {
                    return e.formatter.getCssText({
                      block: "tr",
                      classes: [n.value],
                    });
                  });
              }),
            }),
          (u = {
            type: "form",
            columns: 2,
            padding: 0,
            defaults: {
              type: "textbox",
            },
            items: [
              {
                type: "listbox",
                name: "type",
                label: "Row type",
                text: "Header",
                maxWidth: null,
                values: [
                  {
                    text: "Header",
                    value: "thead",
                  },
                  {
                    text: "Body",
                    value: "tbody",
                  },
                  {
                    text: "Footer",
                    value: "tfoot",
                  },
                ],
              },
              {
                type: "listbox",
                name: "align",
                label: "Alignment",
                text: "None",
                maxWidth: null,
                values: [
                  {
                    text: "None",
                    value: "",
                  },
                  {
                    text: "Left",
                    value: "left",
                  },
                  {
                    text: "Center",
                    value: "center",
                  },
                  {
                    text: "Right",
                    value: "right",
                  },
                ],
              },
              {
                label: "Height",
                name: "height",
              },
              o,
            ],
          }),
          Da(e)
            ? e.windowManager.open({
                title: "Row properties",
                data: i,
                bodyType: "tabpanel",
                body: [
                  {
                    title: "General",
                    type: "form",
                    items: u,
                  },
                  Ga(e),
                ],
                onsubmit: y.curry(Qa, e, d, i),
              })
            : e.windowManager.open({
                title: "Row properties",
                data: i,
                body: u,
                onsubmit: y.curry(Qa, e, d, i),
              }));
    },
    nc = tinymce.util.Tools.resolve("tinymce.Env"),
    ec = {
      styles: {
        "border-collapse": "collapse",
        width: "100%",
      },
      attributes: {
        border: "1",
      },
      percentages: !0,
    },
    tc = function (n, e, t, r, o) {
      void 0 === o && (o = ec);
      var i = nn.fromTag("table");
      ut.setAll(i, o.styles), Se.setAll(i, o.attributes);
      var u = nn.fromTag("tbody");
      lt.append(i, u);
      for (var a = [], c = 0; c < n; c++) {
        for (var l = nn.fromTag("tr"), s = 0; s < e; s++) {
          var f = c < t || s < r ? nn.fromTag("th") : nn.fromTag("td");
          s < r && Se.set(f, "scope", "row"),
            c < t && Se.set(f, "scope", "col"),
            lt.append(f, nn.fromTag("br")),
            o.percentages && ut.set(f, "width", 100 / e + "%"),
            lt.append(l, f);
        }
        a.push(l);
      }
      return st.append(u, a), i;
    },
    rc = function (n) {
      return n.dom().innerHTML;
    },
    oc = function (n) {
      var e = nn.fromTag("div"),
        t = nn.fromDom(n.dom().cloneNode(!0));
      return lt.append(e, t), rc(e);
    },
    ic = function (n, e) {
      n.selection.select(e.dom(), !0), n.selection.collapse(!0);
    },
    uc = function (i, n, e) {
      var t,
        r,
        o = i.getParam("table_default_styles", Ra, "object"),
        u = {
          styles: o,
          attributes:
            ((r = i), r.getParam("table_default_attributes", Sa, "object")),
          percentages:
            ((t = o.width), p.isString(t) && -1 !== t.indexOf("%") && !Pa(i)),
        },
        a = tc(e, n, 0, 0, u);
      Se.set(a, "data-mce-id", "__mce");
      var c = oc(a);
      return (
        i.insertContent(c),
        He.descendant(fa(i), 'table[data-mce-id="__mce"]')
          .map(function (n) {
            var e, t, r, o;
            return (
              Pa(i) && ut.set(n, "width", ut.get(n, "width")),
              Se.remove(n, "data-mce-id"),
              (e = i),
              (t = n),
              P.each(Ne.descendants(t, "tr"), function (n) {
                Ba(e, n.dom()),
                  P.each(Ne.descendants(n, "th,td"), function (n) {
                    Ia(e, n.dom());
                  });
              }),
              (r = i),
              (o = n),
              He.descendant(o, "td,th").each(y.curry(ic, r)),
              n.dom()
            );
          })
          .getOr(null)
      );
    };

  function ac(n, e, t, r) {
    if ("TD" === e.tagName || "TH" === e.tagName) n.setStyle(e, t, r);
    else if (e.children)
      for (var o = 0; o < e.children.length; o++) ac(n, e.children[o], t, r);
  }
  var cc = function (n, e, t) {
      var r,
        o,
        i = n.dom;
      Ya(n, t),
        !1 === (o = t.control.rootControl.toJSON())["class"] &&
          delete o["class"],
        n.undoManager.transact(function () {
          e || (e = uc(n, o.cols || 1, o.rows || 1)),
            (function (n, e, t) {
              var r,
                o = n.dom,
                i = {},
                u = {};
              if (
                ((i["class"] = t["class"]),
                (u.height = ha(t.height)),
                o.getAttrib(e, "width") && !Aa(n)
                  ? (i.width = (r = t.width) ? r.replace(/px$/, "") : "")
                  : (u.width = ha(t.width)),
                Aa(n)
                  ? ((u["border-width"] = ha(t.border)),
                    (u["border-spacing"] = ha(t.cellspacing)),
                    ja.extend(i, {
                      "data-mce-border-color": t.borderColor,
                      "data-mce-cell-padding": t.cellpadding,
                      "data-mce-border": t.border,
                    }))
                  : ja.extend(i, {
                      border: t.border,
                      cellpadding: t.cellpadding,
                      cellspacing: t.cellspacing,
                    }),
                Aa(n) && e.children)
              )
                for (var a = 0; a < e.children.length; a++)
                  ac(o, e.children[a], {
                    "border-width": ha(t.border),
                    "border-color": t.borderColor,
                    padding: ha(t.cellpadding),
                  });
              t.style
                ? ja.extend(u, o.parseStyle(t.style))
                : (u = ja.extend({}, o.parseStyle(o.getAttrib(e, "style")), u)),
                (i.style = o.serializeStyle(u)),
                o.setAttribs(e, i);
            })(n, e, o),
            (r = i.select("caption", e)[0]) && !o.caption && i.remove(r),
            !r &&
              o.caption &&
              (((r = i.create("caption")).innerHTML = nc.ie
                ? "\xa0"
                : '<br data-mce-bogus="1"/>'),
              e.insertBefore(r, e.firstChild)),
            Ha(n, e),
            o.align && _a(n, e, o.align),
            n.focus(),
            n.addVisual();
        });
    },
    lc = function (e, n) {
      var t,
        r,
        o,
        i,
        u,
        a,
        c,
        l,
        s,
        f,
        d = e.dom,
        m = {};
      !0 === n
        ? (t = d.getParent(e.selection.getStart(), "table")) &&
          ((c = t),
          (l = (a = e).dom),
          (s = {
            width: l.getStyle(c, "width") || l.getAttrib(c, "width"),
            height: l.getStyle(c, "height") || l.getAttrib(c, "height"),
            cellspacing:
              l.getStyle(c, "border-spacing") || l.getAttrib(c, "cellspacing"),
            cellpadding:
              l.getAttrib(c, "data-mce-cell-padding") ||
              l.getAttrib(c, "cellpadding") ||
              Ua(a.dom, c, "padding"),
            border:
              l.getAttrib(c, "data-mce-border") ||
              l.getAttrib(c, "border") ||
              Ua(a.dom, c, "border"),
            borderColor: l.getAttrib(c, "data-mce-border-color"),
            caption: !!l.select("caption", c)[0],
            class: l.getAttrib(c, "class"),
          }),
          ja.each("left center right".split(" "), function (n) {
            a.formatter.matchNode(c, "align" + n) && (s.align = n);
          }),
          ka(a) && ja.extend(s, Ka(l, c)),
          (m = s))
        : ((r = {
            label: "Cols",
            name: "cols",
          }),
          (o = {
            label: "Rows",
            name: "rows",
          })),
        0 < Ea(e).length &&
          (m["class"] &&
            (m["class"] = m["class"].replace(/\s*mce\-item\-table\s*/g, "")),
          (i = {
            name: "class",
            type: "listbox",
            label: "Class",
            values: Xa(Ea(e), function (n) {
              n.value &&
                (n.textStyle = function () {
                  return e.formatter.getCssText({
                    block: "table",
                    classes: [n.value],
                  });
                });
            }),
          })),
        (u = {
          type: "form",
          layout: "flex",
          direction: "column",
          labelGapCalc: "children",
          padding: 0,
          items: [
            {
              type: "form",
              labelGapCalc: !1,
              padding: 0,
              layout: "grid",
              columns: 2,
              defaults: {
                type: "textbox",
                maxWidth: 50,
              },
              items:
                ((f = e),
                f.getParam("table_appearance_options", !0, "boolean")
                  ? [
                      r,
                      o,
                      {
                        label: "Width",
                        name: "width",
                        onchange: y.curry(Ya, e),
                      },
                      {
                        label: "Height",
                        name: "height",
                        onchange: y.curry(Ya, e),
                      },
                      {
                        label: "Cell spacing",
                        name: "cellspacing",
                      },
                      {
                        label: "Cell padding",
                        name: "cellpadding",
                      },
                      {
                        label: "Border",
                        name: "border",
                      },
                      {
                        label: "Caption",
                        name: "caption",
                        type: "checkbox",
                      },
                    ]
                  : [
                      r,
                      o,
                      {
                        label: "Width",
                        name: "width",
                        onchange: y.curry(Ya, e),
                      },
                      {
                        label: "Height",
                        name: "height",
                        onchange: y.curry(Ya, e),
                      },
                    ]),
            },
            {
              label: "Alignment",
              name: "align",
              type: "listbox",
              text: "None",
              values: [
                {
                  text: "None",
                  value: "",
                },
                {
                  text: "Left",
                  value: "left",
                },
                {
                  text: "Center",
                  value: "center",
                },
                {
                  text: "Right",
                  value: "right",
                },
              ],
            },
            i,
          ],
        }),
        ka(e)
          ? e.windowManager.open({
              title: "Table properties",
              data: m,
              bodyType: "tabpanel",
              body: [
                {
                  title: "General",
                  type: "form",
                  items: u,
                },
                Ga(e),
              ],
              onsubmit: y.curry(cc, e, t),
            })
          : e.windowManager.open({
              title: "Table properties",
              data: m,
              body: u,
              onsubmit: y.curry(cc, e, t),
            });
    },
    sc = ja.each,
    fc = function (a, e, c, l, t) {
      var r = ga(a),
        s = function () {
          return nn.fromDom(a.dom.getParent(a.selection.getStart(), "th,td"));
        },
        f = function (n) {
          return Ye.table(n, r);
        },
        d = function (n) {
          return {
            width: da(n.dom()),
            height: da(n.dom()),
          };
        },
        o = function (e) {
          var t = s();
          f(t).each(function (i) {
            var n = _r.forMenu(l, i, t),
              u = d(i);
            e(i, n).each(function (n) {
              var e, t, r, o;
              (e = a),
                (t = u),
                (o = d((r = i))),
                (t.width === o.width && t.height === o.height) ||
                  (Wa(e, r.dom(), t.width, t.height),
                  Ma(e, r.dom(), o.width, o.height)),
                a.selection.setRng(n),
                a.focus(),
                c.clear(i),
                pa(i);
            });
          });
        },
        i = function (n) {
          var o = s();
          return f(o).bind(function (n) {
            var e = nn.fromDom(a.getDoc()),
              t = _r.forMenu(l, n, o),
              r = Bt(y.noop, e, x.none());
            return qa(n, t, r);
          });
        },
        u = function (u) {
          t.get().each(function (n) {
            var o = P.map(n, function (n) {
                return wt(n);
              }),
              i = s();
            f(i).bind(function (e) {
              var n = nn.fromDom(a.getDoc()),
                t = It(n),
                r = _r.pasteRows(l, e, i, o, t);
              u(e, r).each(function (n) {
                a.selection.setRng(n), a.focus(), c.clear(e);
              });
            });
          });
        };
      sc(
        {
          mceTableSplitCells: function () {
            o(e.unmergeCells);
          },
          mceTableMergeCells: function () {
            o(e.mergeCells);
          },
          mceTableInsertRowBefore: function () {
            o(e.insertRowsBefore);
          },
          mceTableInsertRowAfter: function () {
            o(e.insertRowsAfter);
          },
          mceTableInsertColBefore: function () {
            o(e.insertColumnsBefore);
          },
          mceTableInsertColAfter: function () {
            o(e.insertColumnsAfter);
          },
          mceTableDeleteCol: function () {
            o(e.deleteColumn);
          },
          mceTableDeleteRow: function () {
            o(e.deleteRow);
          },
          mceTableCutRow: function (n) {
            t.set(i()), o(e.deleteRow);
          },
          mceTableCopyRow: function (n) {
            t.set(i());
          },
          mceTablePasteRowBefore: function (n) {
            u(e.pasteRowsBefore);
          },
          mceTablePasteRowAfter: function (n) {
            u(e.pasteRowsAfter);
          },
          mceTableDelete: function () {
            var n = nn.fromDom(
              a.dom.getParent(a.selection.getStart(), "th,td")
            );
            Ye.table(n, r)
              .filter(y.not(r))
              .each(function (n) {
                var e = nn.fromText("");
                lt.after(n, e), dt.remove(n);
                var t = a.dom.createRng();
                t.setStart(e.dom(), 0),
                  t.setEnd(e.dom(), 0),
                  a.selection.setRng(t);
              });
          },
        },
        function (n, e) {
          a.addCommand(e, n);
        }
      ),
        sc(
          {
            mceInsertTable: y.curry(lc, a),
            mceTableProps: y.curry(lc, a, !0),
            mceTableRowProps: y.curry(Za, a),
            mceTableCellProps: y.curry(Ja, a),
          },
          function (t, n) {
            a.addCommand(n, function (n, e) {
              t(e);
            });
          }
        );
    },
    dc = function (n) {
      var e = x.from(n.dom().documentElement).map(nn.fromDom).getOr(n);
      return {
        parent: y.constant(e),
        view: y.constant(n),
        origin: y.constant(fo(0, 0)),
      };
    },
    mc = function (n, e) {
      return {
        parent: y.constant(e),
        view: y.constant(n),
        origin: y.constant(fo(0, 0)),
      };
    };

  function gc(n) {
    var t = V.immutable.apply(null, n),
      r = [];
    return {
      bind: function (n) {
        if (n === undefined) throw "Event bind error: undefined handler";
        r.push(n);
      },
      unbind: function (e) {
        r = P.filter(r, function (n) {
          return n !== e;
        });
      },
      trigger: function () {
        var e = t.apply(null, arguments);
        P.each(r, function (n) {
          n(e);
        });
      },
    };
  }
  var hc = {
      create: function (n) {
        return {
          registry: q.map(n, function (n) {
            return {
              bind: n.bind,
              unbind: n.unbind,
            };
          }),
          trigger: q.map(n, function (n) {
            return n.trigger;
          }),
        };
      },
    },
    pc = {
      mode: Io.exactly(["compare", "extract", "mutate", "sink"]),
      sink: Io.exactly(["element", "start", "stop", "destroy"]),
      api: Io.exactly(["forceDrop", "drop", "move", "delayDrop"]),
    },
    vc = {
      resolve: xi("ephox-dragster").resolve,
    },
    bc = function (m, g) {
      return function (n) {
        if (m(n)) {
          var e,
            t,
            r,
            o,
            i,
            u,
            a,
            c = nn.fromDom(n.target),
            l = function () {
              n.stopPropagation();
            },
            s = function () {
              n.preventDefault();
            },
            f = y.compose(s, l),
            d =
              ((e = c),
              (t = n.clientX),
              (r = n.clientY),
              (o = l),
              (i = s),
              (u = f),
              (a = n),
              {
                target: y.constant(e),
                x: y.constant(t),
                y: y.constant(r),
                stop: o,
                prevent: i,
                kill: u,
                raw: y.constant(a),
              });
          g(d);
        }
      };
    },
    wc = function (n, e, t, r, o) {
      var i = bc(t, r);
      return (
        n.dom().addEventListener(e, i, o),
        {
          unbind: y.curry(yc, n, e, i, o),
        }
      );
    },
    yc = function (n, e, t, r) {
      n.dom().removeEventListener(e, t, r);
    },
    xc = function (n, e, t, r) {
      return wc(n, e, t, r, !1);
    },
    Cc = function (n, e, t, r) {
      return wc(n, e, t, r, !0);
    },
    Rc = y.constant(!0),
    Sc = {
      bind: function (n, e, t) {
        return xc(n, e, Rc, t);
      },
      capture: function (n, e, t) {
        return Cc(n, e, Rc, t);
      },
    },
    Tc = pc.mode({
      compare: function (n, e) {
        return fo(e.left() - n.left(), e.top() - n.top());
      },
      extract: function (n) {
        return x.some(fo(n.x(), n.y()));
      },
      sink: function (n, e) {
        var t,
          r,
          o,
          i =
            ((t = e),
            (r = ni.merge(
              {
                layerClass: vc.resolve("blocker"),
              },
              t
            )),
            (o = nn.fromTag("div")),
            Se.set(o, "role", "presentation"),
            ut.setAll(o, {
              position: "fixed",
              left: "0px",
              top: "0px",
              width: "100%",
              height: "100%",
            }),
            Mi.add(o, vc.resolve("blocker")),
            Mi.add(o, r.layerClass),
            {
              element: function () {
                return o;
              },
              destroy: function () {
                dt.remove(o);
              },
            }),
          u = Sc.bind(i.element(), "mousedown", n.forceDrop),
          a = Sc.bind(i.element(), "mouseup", n.drop),
          c = Sc.bind(i.element(), "mousemove", n.move),
          l = Sc.bind(i.element(), "mouseout", n.delayDrop);
        return pc.sink({
          element: i.element,
          start: function (n) {
            lt.append(n, i.element());
          },
          stop: function () {
            dt.remove(i.element());
          },
          destroy: function () {
            i.destroy(), a.unbind(), c.unbind(), l.unbind(), u.unbind();
          },
        });
      },
      mutate: function (n, e) {
        n.mutate(e.left(), e.top());
      },
    });

  function Dc() {
    var i = x.none(),
      u = hc.create({
        move: gc(["info"]),
      });
    return {
      onEvent: function (n, o) {
        o.extract(n).each(function (n) {
          var e, t, r;
          ((e = o),
          (t = n),
          (r = i.map(function (n) {
            return e.compare(n, t);
          })),
          (i = x.some(t)),
          r).each(function (n) {
            u.trigger.move(n);
          });
        });
      },
      reset: function () {
        i = x.none();
      },
      events: u.registry,
    };
  }

  function kc() {
    var n = {
        onEvent: function (n, e) {},
        reset: y.noop,
      },
      e = Dc(),
      t = n;
    return {
      on: function () {
        t.reset(), (t = e);
      },
      off: function () {
        t.reset(), (t = n);
      },
      isOn: function () {
        return t === e;
      },
      onEvent: function (n, e) {
        t.onEvent(n, e);
      },
      events: e.events,
    };
  }
  var Ac = function (e, t) {
      var r = null;
      return {
        cancel: function () {
          null !== r && (clearTimeout(r), (r = null));
        },
        throttle: function () {
          var n = arguments;
          null !== r && clearTimeout(r),
            (r = setTimeout(function () {
              e.apply(null, n), (n = r = null);
            }, t));
        },
      };
    },
    Oc = function (e, t, n) {
      var r = !1,
        o = hc.create({
          start: gc([]),
          stop: gc([]),
        }),
        i = kc(),
        u = function () {
          l.stop(), i.isOn() && (i.off(), o.trigger.stop());
        },
        a = Ac(u, 200);
      i.events.move.bind(function (n) {
        t.mutate(e, n.info());
      });
      var c = function (e) {
          return function () {
            var n = Array.prototype.slice.call(arguments, 0);
            if (r) return e.apply(null, n);
          };
        },
        l = t.sink(
          pc.api({
            forceDrop: u,
            drop: c(u),
            move: c(function (n, e) {
              a.cancel(), i.onEvent(n, t);
            }),
            delayDrop: c(a.throttle),
          }),
          n
        );
      return {
        element: l.element,
        go: function (n) {
          l.start(n), i.on(), o.trigger.start();
        },
        on: function () {
          r = !0;
        },
        off: function () {
          r = !1;
        },
        destroy: function () {
          l.destroy();
        },
        events: o.registry,
      };
    },
    Nc = {
      transform: function (n, e) {
        var t = e !== undefined ? e : {},
          r = t.mode !== undefined ? t.mode : Tc;
        return Oc(n, r, e);
      },
    };

  function Ec() {
    var t,
      r = hc.create({
        drag: gc(["xDelta", "yDelta", "target"]),
      }),
      o = x.none(),
      n = {
        mutate: function (n, e) {
          t.trigger.drag(n, e);
        },
        events: (t = hc.create({
          drag: gc(["xDelta", "yDelta"]),
        })).registry,
      };
    return (
      n.events.drag.bind(function (e) {
        o.each(function (n) {
          r.trigger.drag(e.xDelta(), e.yDelta(), n);
        });
      }),
      {
        assign: function (n) {
          o = x.some(n);
        },
        get: function () {
          return o;
        },
        mutate: n.mutate,
        events: r.registry,
      }
    );
  }
  var Pc = {
      any: function (n) {
        return He.first(n).isSome();
      },
      ancestor: function (n, e, t) {
        return He.ancestor(n, e, t).isSome();
      },
      sibling: function (n, e) {
        return He.sibling(n, e).isSome();
      },
      child: function (n, e) {
        return He.child(n, e).isSome();
      },
      descendant: function (n, e) {
        return He.descendant(n, e).isSome();
      },
      closest: function (n, e, t) {
        return He.closest(n, e, t).isSome();
      },
    },
    Bc = Ci.resolve("resizer-bar-dragging");

  function Ic(n, t) {
    var r = Do.height,
      e = (function (o, e, i) {
        var t = Ec(),
          r = Nc.transform(t, {}),
          u = x.none(),
          n = function (n, e) {
            return x.from(Se.get(n, e));
          };
        t.events.drag.bind(function (t) {
          n(t.target(), "data-row").each(function (n) {
            var e = Wu.getInt(t.target(), "top");
            ut.set(t.target(), "top", e + t.yDelta() + "px");
          }),
            n(t.target(), "data-column").each(function (n) {
              var e = Wu.getInt(t.target(), "left");
              ut.set(t.target(), "left", e + t.xDelta() + "px");
            });
        });
        var a = function (n, e) {
          return Wu.getInt(n, e) - parseInt(Se.get(n, "data-initial-" + e), 10);
        };
        r.events.stop.bind(function () {
          t.get().each(function (r) {
            u.each(function (t) {
              n(r, "data-row").each(function (n) {
                var e = a(r, "top");
                Se.remove(r, "data-initial-top"),
                  d.trigger.adjustHeight(t, e, parseInt(n, 10));
              }),
                n(r, "data-column").each(function (n) {
                  var e = a(r, "left");
                  Se.remove(r, "data-initial-left"),
                    d.trigger.adjustWidth(t, e, parseInt(n, 10));
                }),
                Ui.refresh(o, t, i, e);
            });
          });
        });
        var c = function (n, e) {
            d.trigger.startAdjust(),
              t.assign(n),
              Se.set(n, "data-initial-" + e, parseInt(ut.get(n, e), 10)),
              Mi.add(n, Bc),
              ut.set(n, "opacity", "0.2"),
              r.go(o.parent());
          },
          l = Sc.bind(o.parent(), "mousedown", function (n) {
            Ui.isRowBar(n.target()) && c(n.target(), "top"),
              Ui.isColBar(n.target()) && c(n.target(), "left");
          }),
          s = function (n) {
            return te.eq(n, o.view());
          },
          f = Sc.bind(o.view(), "mouseover", function (n) {
            "table" === we.name(n.target()) ||
            Pc.closest(n.target(), "table", s)
              ? (u =
                  "table" === we.name(n.target())
                    ? x.some(n.target())
                    : He.ancestor(n.target(), "table", s)).each(function (n) {
                  Ui.refresh(o, n, i, e);
                })
              : ke.inBody(n.target()) && Ui.destroy(o);
          }),
          d = hc.create({
            adjustHeight: gc(["table", "delta", "row"]),
            adjustWidth: gc(["table", "delta", "column"]),
            startAdjust: gc([]),
          });
        return {
          destroy: function () {
            l.unbind(), f.unbind(), r.destroy(), Ui.destroy(o);
          },
          refresh: function (n) {
            Ui.refresh(o, n, i, e);
          },
          on: r.on,
          off: r.off,
          hideBars: y.curry(Ui.hide, o),
          showBars: y.curry(Ui.show, o),
          events: d.registry,
        };
      })(n, t, r),
      o = hc.create({
        beforeResize: gc(["table"]),
        afterResize: gc(["table"]),
        startDrag: gc([]),
      });
    return (
      e.events.adjustHeight.bind(function (n) {
        o.trigger.beforeResize(n.table());
        var e = r.delta(n.delta(), n.table());
        Zu(n.table(), e, n.row(), r), o.trigger.afterResize(n.table());
      }),
      e.events.startAdjust.bind(function (n) {
        o.trigger.startDrag();
      }),
      e.events.adjustWidth.bind(function (n) {
        o.trigger.beforeResize(n.table());
        var e = t.delta(n.delta(), n.table());
        Qu(n.table(), e, n.column(), t), o.trigger.afterResize(n.table());
      }),
      {
        on: e.on,
        off: e.off,
        hideBars: e.hideBars,
        showBars: e.showBars,
        destroy: e.destroy,
        events: o.registry,
      }
    );
  }
  var Wc = function (n, e) {
      return n.inline
        ? mc(
            fa(n),
            ((t = nn.fromTag("div")),
            ut.setAll(t, {
              position: "static",
              height: "0",
              width: "0",
              padding: "0",
              margin: "0",
              border: "0",
            }),
            lt.append(ke.body(), t),
            t)
          )
        : dc(nn.fromDom(n.getDoc()));
      var t;
    },
    Mc = function (n, e) {
      n.inline && dt.remove(e.parent());
    },
    Lc = function (u) {
      var a,
        c,
        o = x.none(),
        i = x.none(),
        l = x.none(),
        s = /(\d+(\.\d+)?)%/,
        f = function (n) {
          return "TABLE" === n.nodeName;
        };
      return (
        u.on("init", function () {
          var n,
            e = Ao(xa.directionAt),
            t = Wc(u);
          if (
            ((l = x.some(t)),
            ("table" === (n = u.getParam("object_resizing", !0)) || n) &&
              u.getParam("table_resize_bars", !0, "boolean"))
          ) {
            var r = Ic(t, e);
            r.on(),
              r.events.startDrag.bind(function (n) {
                o = x.some(u.selection.getRng());
              }),
              r.events.beforeResize.bind(function (n) {
                var e = n.table().dom();
                Wa(u, e, da(e), ma(e));
              }),
              r.events.afterResize.bind(function (n) {
                var e = n.table(),
                  t = e.dom();
                pa(e),
                  o.each(function (n) {
                    u.selection.setRng(n), u.focus();
                  }),
                  Ma(u, t, da(t), ma(t)),
                  u.undoManager.add();
              }),
              (i = x.some(r));
          }
        }),
        u.on("ObjectResizeStart", function (n) {
          var e,
            t = n.target;
          f(t) &&
            ((a = n.width),
            (e = t),
            (c = u.dom.getStyle(e, "width") || u.dom.getAttrib(e, "width")));
        }),
        u.on("ObjectResized", function (n) {
          var e = n.target;
          if (f(e)) {
            var t = e;
            if (s.test(c)) {
              var r = parseFloat(s.exec(c)[1]),
                o = (n.width * r) / a;
              u.dom.setStyle(t, "width", o + "%");
            } else {
              var i = [];
              ja.each(t.rows, function (n) {
                ja.each(n.cells, function (n) {
                  var e = u.dom.getStyle(n, "width", !0);
                  i.push({
                    cell: n,
                    width: e,
                  });
                });
              }),
                ja.each(i, function (n) {
                  u.dom.setStyle(n.cell, "width", n.width),
                    u.dom.setAttrib(n.cell, "width", null);
                });
            }
          }
        }),
        {
          lazyResize: function () {
            return i;
          },
          lazyWire: function () {
            return l.getOr(dc(nn.fromDom(u.getBody())));
          },
          destroy: function () {
            i.each(function (n) {
              n.destroy();
            }),
              l.each(function (n) {
                Mc(u, n);
              });
          },
        }
      );
    },
    qc = function (n) {
      return {
        fold: n,
      };
    },
    jc = function (o) {
      return qc(function (n, e, t, r) {
        return n(o);
      });
    },
    _c = function (o) {
      return qc(function (n, e, t, r) {
        return e(o);
      });
    },
    zc = function (o, i) {
      return qc(function (n, e, t, r) {
        return t(o, i);
      });
    },
    Hc = function (o) {
      return qc(function (n, e, t, r) {
        return r(o);
      });
    },
    Fc = function (t, n) {
      return Ye.table(t, n).bind(function (n) {
        var e = Ye.cells(n);
        return P.findIndex(e, function (n) {
          return te.eq(t, n);
        }).map(function (n) {
          return {
            index: y.constant(n),
            all: y.constant(e),
          };
        });
      });
    },
    Uc = function (e, n) {
      return Fc(e, n).fold(
        function () {
          return jc(e);
        },
        function (n) {
          return n.index() + 1 < n.all().length
            ? zc(e, n.all()[n.index() + 1])
            : Hc(e);
        }
      );
    },
    Vc = function (e, n) {
      return Fc(e, n).fold(
        function () {
          return jc();
        },
        function (n) {
          return 0 <= n.index() - 1 ? zc(e, n.all()[n.index() - 1]) : _c(e);
        }
      );
    },
    Gc = Er([
      {
        before: ["element"],
      },
      {
        on: ["element", "offset"],
      },
      {
        after: ["element"],
      },
    ]),
    Xc = {
      before: Gc.before,
      on: Gc.on,
      after: Gc.after,
      cata: function (n, e, t, r) {
        return n.fold(e, t, r);
      },
      getStart: function (n) {
        return n.fold(y.identity, y.identity, y.identity);
      },
    },
    Yc = Er([
      {
        domRange: ["rng"],
      },
      {
        relative: ["startSitu", "finishSitu"],
      },
      {
        exact: ["start", "soffset", "finish", "foffset"],
      },
    ]),
    Kc = V.immutable("start", "soffset", "finish", "foffset"),
    $c = {
      domRange: Yc.domRange,
      relative: Yc.relative,
      exact: Yc.exact,
      exactFromRange: function (n) {
        return Yc.exact(n.start(), n.soffset(), n.finish(), n.foffset());
      },
      range: Kc,
      getWin: function (n) {
        var e = n.match({
          domRange: function (n) {
            return nn.fromDom(n.startContainer);
          },
          relative: function (n, e) {
            return Xc.getStart(n);
          },
          exact: function (n, e, t, r) {
            return n;
          },
        });
        return se.defaultView(e);
      },
    },
    Jc = function (n, e, t, r) {
      var o = se.owner(n).dom().createRange();
      return o.setStart(n.dom(), e), o.setEnd(t.dom(), r), o;
    },
    Qc = function (n, e, t, r) {
      var o = Jc(n, e, t, r),
        i = te.eq(n, t) && e === r;
      return o.collapsed && !i;
    },
    Zc = function (n, e) {
      n.selectNodeContents(e.dom());
    },
    nl = function (n) {
      n.deleteContents();
    },
    el = function (n) {
      return {
        left: y.constant(n.left),
        top: y.constant(n.top),
        right: y.constant(n.right),
        bottom: y.constant(n.bottom),
        width: y.constant(n.width),
        height: y.constant(n.height),
      };
    },
    tl = {
      create: function (n) {
        return n.document.createRange();
      },
      replaceWith: function (n, e) {
        nl(n), n.insertNode(e.dom());
      },
      selectNodeContents: function (n, e) {
        var t = n.document.createRange();
        return Zc(t, e), t;
      },
      selectNodeContentsUsing: Zc,
      relativeToNative: function (n, e, t) {
        var r,
          o,
          i = n.document.createRange();
        return (
          (r = i),
          e.fold(
            function (n) {
              r.setStartBefore(n.dom());
            },
            function (n, e) {
              r.setStart(n.dom(), e);
            },
            function (n) {
              r.setStartAfter(n.dom());
            }
          ),
          (o = i),
          t.fold(
            function (n) {
              o.setEndBefore(n.dom());
            },
            function (n, e) {
              o.setEnd(n.dom(), e);
            },
            function (n) {
              o.setEndAfter(n.dom());
            }
          ),
          i
        );
      },
      exactToNative: function (n, e, t, r, o) {
        var i = n.document.createRange();
        return i.setStart(e.dom(), t), i.setEnd(r.dom(), o), i;
      },
      deleteContents: nl,
      cloneFragment: function (n) {
        var e = n.cloneContents();
        return nn.fromDom(e);
      },
      getFirstRect: function (n) {
        var e = n.getClientRects(),
          t = 0 < e.length ? e[0] : n.getBoundingClientRect();
        return 0 < t.width || 0 < t.height ? x.some(t).map(el) : x.none();
      },
      getBounds: function (n) {
        var e = n.getBoundingClientRect();
        return 0 < e.width || 0 < e.height ? x.some(e).map(el) : x.none();
      },
      isWithin: function (n, e) {
        return (
          e.compareBoundaryPoints(n.END_TO_START, n) < 1 &&
          -1 < e.compareBoundaryPoints(n.START_TO_END, n)
        );
      },
      toString: function (n) {
        return n.toString();
      },
    },
    rl = Er([
      {
        ltr: ["start", "soffset", "finish", "foffset"],
      },
      {
        rtl: ["start", "soffset", "finish", "foffset"],
      },
    ]),
    ol = function (n, e, t) {
      return e(
        nn.fromDom(t.startContainer),
        t.startOffset,
        nn.fromDom(t.endContainer),
        t.endOffset
      );
    },
    il = function (n, e) {
      var o,
        t,
        r,
        i =
          ((o = n),
          e.match({
            domRange: function (n) {
              return {
                ltr: y.constant(n),
                rtl: x.none,
              };
            },
            relative: function (n, e) {
              return {
                ltr: bn(function () {
                  return tl.relativeToNative(o, n, e);
                }),
                rtl: bn(function () {
                  return x.some(tl.relativeToNative(o, e, n));
                }),
              };
            },
            exact: function (n, e, t, r) {
              return {
                ltr: bn(function () {
                  return tl.exactToNative(o, n, e, t, r);
                }),
                rtl: bn(function () {
                  return x.some(tl.exactToNative(o, t, r, n, e));
                }),
              };
            },
          }));
      return (r = (t = i).ltr()).collapsed
        ? t
            .rtl()
            .filter(function (n) {
              return !1 === n.collapsed;
            })
            .map(function (n) {
              return rl.rtl(
                nn.fromDom(n.endContainer),
                n.endOffset,
                nn.fromDom(n.startContainer),
                n.startOffset
              );
            })
            .getOrThunk(function () {
              return ol(0, rl.ltr, r);
            })
        : ol(0, rl.ltr, r);
    },
    ul = {
      ltr: rl.ltr,
      rtl: rl.rtl,
      diagnose: il,
      asLtrRange: function (i, n) {
        return il(i, n).match({
          ltr: function (n, e, t, r) {
            var o = i.document.createRange();
            return o.setStart(n.dom(), e), o.setEnd(t.dom(), r), o;
          },
          rtl: function (n, e, t, r) {
            var o = i.document.createRange();
            return o.setStart(t.dom(), r), o.setEnd(n.dom(), e), o;
          },
        });
      },
    },
    al = function (n, e, t) {
      return e >= n.left && e <= n.right && t >= n.top && t <= n.bottom;
    },
    cl = function (n, e, t, r, o) {
      if (0 === o) return 0;
      if (e === r) return o - 1;
      for (var i = r, u = 1; u < o; u++) {
        var a = n(u),
          c = Math.abs(e - a.left);
        if (t > a.bottom);
        else {
          if (t < a.top || i < c) return u - 1;
          i = c;
        }
      }
      return 0;
    },
    ll = {
      locate: function (l, s, f, d) {
        var n = l.dom().createRange();
        n.selectNode(s.dom());
        var e = n.getClientRects();
        return ti(e, function (n) {
          return al(n, f, d) ? x.some(n) : x.none();
        }).map(function (n) {
          return (
            (t = l),
            (e = f),
            (o = d),
            (i = n),
            (u = function (n) {
              var e = t.dom().createRange();
              return e.setStart(r.dom(), n), e.collapse(!0), e;
            }),
            (a = Ct.get((r = s)).length),
            (c = cl(
              function (n) {
                return u(n).getBoundingClientRect();
              },
              e,
              o,
              i.right,
              a
            )),
            u(c)
          );
          var t, r, e, o, i, u, a, c;
        });
      },
    },
    sl = function (e, n, t, r) {
      var o = e.dom().createRange(),
        i = se.children(n);
      return ti(i, function (n) {
        return (
          o.selectNode(n.dom()),
          al(o.getBoundingClientRect(), t, r) ? fl(e, n, t, r) : x.none()
        );
      });
    },
    fl = function (n, e, t, r) {
      return (we.isText(e) ? ll.locate : sl)(n, e, t, r);
    },
    dl = function (n, e, t, r) {
      var o = n.dom().createRange();
      o.selectNode(e.dom());
      var i = o.getBoundingClientRect(),
        u = Math.max(i.left, Math.min(i.right, t)),
        a = Math.max(i.top, Math.min(i.bottom, r));
      return fl(n, e, u, a);
    },
    ml = function (n, e) {
      return e - n.left < n.right - e;
    },
    gl = function (n, e, t) {
      var r = n.dom().createRange();
      return r.selectNode(e.dom()), r.collapse(t), r;
    },
    hl = function (e, n, t) {
      var r = e.dom().createRange();
      r.selectNode(n.dom());
      var o = r.getBoundingClientRect(),
        i = ml(o, t);
      return (!0 === i ? At.first : At.last)(n).map(function (n) {
        return gl(e, n, i);
      });
    },
    pl = function (n, e, t) {
      var r = e.dom().getBoundingClientRect(),
        o = ml(r, t);
      return x.some(gl(n, e, o));
    },
    vl = function (n, e, t) {
      return (0 === se.children(e).length ? pl : hl)(n, e, t);
    },
    bl = document.caretPositionFromPoint
      ? function (t, n, e) {
          return x
            .from(t.dom().caretPositionFromPoint(n, e))
            .bind(function (n) {
              if (null === n.offsetNode) return x.none();
              var e = t.dom().createRange();
              return (
                e.setStart(n.offsetNode, n.offset), e.collapse(), x.some(e)
              );
            });
        }
      : document.caretRangeFromPoint
      ? function (n, e, t) {
          return x.from(n.dom().caretRangeFromPoint(e, t));
        }
      : function (t, r, o) {
          return nn.fromPoint(t, r, o).bind(function (n) {
            var e = function () {
              return vl(t, n, r);
            };
            return 0 === se.children(n).length
              ? e()
              : (function (n, e, t, r) {
                  var o = n.dom().createRange();
                  o.selectNode(e.dom());
                  var i = o.getBoundingClientRect(),
                    u = Math.max(i.left, Math.min(i.right, t)),
                    a = Math.max(i.top, Math.min(i.bottom, r));
                  return dl(n, e, u, a);
                })(t, n, r, o).orThunk(e);
          });
        },
    wl = function (n, e, t) {
      var r = nn.fromDom(n.document);
      return bl(r, e, t).map(function (n) {
        return $c.range(
          nn.fromDom(n.startContainer),
          n.startOffset,
          nn.fromDom(n.endContainer),
          n.endOffset
        );
      });
    },
    yl = function (n, e) {
      var t = we.name(n);
      return "input" === t
        ? Xc.after(n)
        : P.contains(["br", "img"], t)
        ? 0 === e
          ? Xc.before(n)
          : Xc.after(n)
        : Xc.on(n, e);
    },
    xl = function (n, e) {
      var t = n.fold(Xc.before, yl, Xc.after),
        r = e.fold(Xc.before, yl, Xc.after);
      return $c.relative(t, r);
    },
    Cl = function (n, e, t, r) {
      var o = yl(n, e),
        i = yl(t, r);
      return $c.relative(o, i);
    },
    Rl = function (n) {
      return n.match({
        domRange: function (n) {
          var e = nn.fromDom(n.startContainer),
            t = nn.fromDom(n.endContainer);
          return Cl(e, n.startOffset, t, n.endOffset);
        },
        relative: xl,
        exact: Cl,
      });
    },
    Sl = xl,
    Tl = Cl,
    Dl = function (n, e) {
      x.from(n.getSelection()).each(function (n) {
        n.removeAllRanges(), n.addRange(e);
      });
    },
    kl = function (n, e, t, r, o) {
      var i = tl.exactToNative(n, e, t, r, o);
      Dl(n, i);
    },
    Al = function (i, n) {
      return ul.diagnose(i, n).match({
        ltr: function (n, e, t, r) {
          kl(i, n, e, t, r);
        },
        rtl: function (n, e, t, r) {
          var o = i.getSelection();
          o.setBaseAndExtent
            ? o.setBaseAndExtent(n.dom(), e, t.dom(), r)
            : o.extend
            ? (o.collapse(n.dom(), e), o.extend(t.dom(), r))
            : kl(i, t, r, n, e);
        },
      });
    },
    Ol = function (n) {
      var e = nn.fromDom(n.anchorNode),
        t = nn.fromDom(n.focusNode);
      return Qc(e, n.anchorOffset, t, n.focusOffset)
        ? x.some(
            $c.range(
              nn.fromDom(n.anchorNode),
              n.anchorOffset,
              nn.fromDom(n.focusNode),
              n.focusOffset
            )
          )
        : (function (n) {
            if (0 < n.rangeCount) {
              var e = n.getRangeAt(0),
                t = n.getRangeAt(n.rangeCount - 1);
              return x.some(
                $c.range(
                  nn.fromDom(e.startContainer),
                  e.startOffset,
                  nn.fromDom(t.endContainer),
                  t.endOffset
                )
              );
            }
            return x.none();
          })(n);
    },
    Nl = function (n) {
      return x
        .from(n.getSelection())
        .filter(function (n) {
          return 0 < n.rangeCount;
        })
        .bind(Ol);
    },
    El = function (n, e, t, r, o) {
      var i = Tl(e, t, r, o);
      Al(n, i);
    },
    Pl = function (n) {
      return Nl(n).map(function (n) {
        return $c.exact(n.start(), n.soffset(), n.finish(), n.foffset());
      });
    },
    Bl = function (n, e, t) {
      var r = Sl(e, t);
      Al(n, r);
    },
    Il = function (n) {
      var o = $c.getWin(n).dom(),
        e = function (n, e, t, r) {
          return tl.exactToNative(o, n, e, t, r);
        },
        t = Rl(n);
      return ul.diagnose(o, t).match({
        ltr: e,
        rtl: e,
      });
    },
    Wl = function (n, e) {
      var t = tl.selectNodeContents(n, e);
      Dl(n, t);
    },
    Ml = function (n) {
      n.getSelection().removeAllRanges();
    },
    Ll = function (n, e) {
      var t = ul.asLtrRange(n, e);
      return tl.getFirstRect(t);
    },
    ql = function (n, e, t) {
      return wl(n, e, t);
    },
    jl = tinymce.util.Tools.resolve("tinymce.util.VK"),
    _l = function (n, e, t, r) {
      return Fl(n, e, Uc(t), r);
    },
    zl = function (n, e, t, r) {
      return Fl(n, e, Vc(t), r);
    },
    Hl = function (n, e) {
      var t = $c.exact(e, 0, e, 0);
      return Il(t);
    },
    Fl = function (o, n, e, i, t) {
      return e.fold(
        x.none,
        x.none,
        function (n, e) {
          return At.first(e).map(function (n) {
            return Hl(0, n);
          });
        },
        function (r) {
          return Ye.table(r, n).bind(function (n) {
            var e,
              t = _r.noMenu(r);
            return (
              o.undoManager.transact(function () {
                i.insertRowsAfter(n, t);
              }),
              (e = Ne.descendants(n, "tr")),
              P.last(e).bind(function (n) {
                return He.descendant(n, "td,th").map(function (n) {
                  return Hl(0, n);
                });
              })
            );
          });
        }
      );
    },
    Ul = ["table", "li", "dl"],
    Vl = function (e, t, r, o) {
      if (e.keyCode === jl.TAB) {
        var i = fa(t),
          u = function (n) {
            var e = we.name(n);
            return te.eq(n, i) || P.contains(Ul, e);
          },
          n = t.selection.getRng();
        if (n.collapsed) {
          var a = nn.fromDom(n.startContainer);
          Ye.cell(a, u).each(function (n) {
            e.preventDefault(),
              (e.shiftKey ? zl : _l)(t, u, n, r, o).each(function (n) {
                t.selection.setRng(n);
              });
          });
        }
      }
    },
    Gl = {
      response: V.immutable("selection", "kill"),
    },
    Xl = function (e) {
      return function (n) {
        return n === e;
      };
    },
    Yl = Xl(38),
    Kl = Xl(40),
    $l = {
      ltr: {
        isBackward: Xl(37),
        isForward: Xl(39),
      },
      rtl: {
        isBackward: Xl(39),
        isForward: Xl(37),
      },
      isUp: Yl,
      isDown: Kl,
      isNavigation: function (n) {
        return 37 <= n && n <= 40;
      },
    },
    Jl = function (n, e) {
      var t = ul.asLtrRange(n, e);
      return {
        start: y.constant(nn.fromDom(t.startContainer)),
        soffset: y.constant(t.startOffset),
        finish: y.constant(nn.fromDom(t.endContainer)),
        foffset: y.constant(t.endOffset),
      };
    },
    Ql = function (n, e, t, r) {
      return {
        start: y.constant(Xc.on(n, e)),
        finish: y.constant(Xc.on(t, r)),
      };
    },
    Zl =
      (Zn.detect().browser.isSafari(),
      function (n) {
        var e = n !== undefined ? n.dom() : document,
          t = e.body.scrollLeft || e.documentElement.scrollLeft,
          r = e.body.scrollTop || e.documentElement.scrollTop;
        return fo(t, r);
      }),
    ns = Zl,
    es = function (n, e, t) {
      (t !== undefined ? t.dom() : document).defaultView.scrollBy(n, e);
    };

  function ts(i) {
    return {
      elementFromPoint: function (n, e) {
        return nn.fromPoint(nn.fromDom(i.document), n, e);
      },
      getRect: function (n) {
        return n.dom().getBoundingClientRect();
      },
      getRangedRect: function (n, e, t, r) {
        var o = $c.exact(n, e, t, r);
        return Ll(i, o).map(function (n) {
          return q.map(n, y.apply);
        });
      },
      getSelection: function () {
        return Pl(i).map(function (n) {
          return Jl(i, n);
        });
      },
      fromSitus: function (n) {
        var e = $c.relative(n.start(), n.finish());
        return Jl(i, e);
      },
      situsFromPoint: function (n, e) {
        return ql(i, n, e).map(function (n) {
          return {
            start: y.constant(Xc.on(n.start(), n.soffset())),
            finish: y.constant(Xc.on(n.finish(), n.foffset())),
          };
        });
      },
      clearSelection: function () {
        Ml(i);
      },
      setSelection: function (n) {
        El(i, n.start(), n.soffset(), n.finish(), n.foffset());
      },
      setRelativeSelection: function (n, e) {
        Bl(i, n, e);
      },
      selectContents: function (n) {
        Wl(i, n);
      },
      getInnerHeight: function () {
        return i.innerHeight;
      },
      getScrollY: function () {
        return ns(nn.fromDom(i.document)).top();
      },
      scrollBy: function (n, e) {
        es(n, e, nn.fromDom(i.document));
      },
    };
  }
  var rs = function (t, n, r, e, o) {
      return te.eq(r, e)
        ? x.none()
        : xr(r, e, n).bind(function (n) {
            var e = n.boxes().getOr([]);
            return 0 < e.length
              ? (o(t, e, n.start(), n.finish()),
                x.some(Gl.response(x.some(Ql(r, 0, r, Tt(r))), !0)))
              : x.none();
          });
    },
    os = {
      sync: function (t, r, n, e, o, i, u) {
        return te.eq(n, o) && e === i
          ? x.none()
          : He.closest(n, "td,th", r).bind(function (e) {
              return He.closest(o, "td,th", r).bind(function (n) {
                return rs(t, r, e, n, u);
              });
            });
      },
      detect: rs,
      update: function (n, e, t, r, o) {
        return Rr(
          r,
          n,
          e,
          o.firstSelectedSelector(),
          o.lastSelectedSelector()
        ).map(function (n) {
          return (
            o.clear(t),
            o.selectRange(t, n.boxes(), n.start(), n.finish()),
            n.boxes()
          );
        });
      },
    },
    is = V.immutableBag(["left", "top", "right", "bottom"], []),
    us = {
      nu: is,
      moveUp: function (n, e) {
        return is({
          left: n.left(),
          top: n.top() - e,
          right: n.right(),
          bottom: n.bottom() - e,
        });
      },
      moveDown: function (n, e) {
        return is({
          left: n.left(),
          top: n.top() + e,
          right: n.right(),
          bottom: n.bottom() + e,
        });
      },
      moveBottomTo: function (n, e) {
        var t = n.bottom() - n.top();
        return is({
          left: n.left(),
          top: e - t,
          right: n.right(),
          bottom: e,
        });
      },
      moveTopTo: function (n, e) {
        var t = n.bottom() - n.top();
        return is({
          left: n.left(),
          top: e,
          right: n.right(),
          bottom: e + t,
        });
      },
      getTop: function (n) {
        return n.top();
      },
      getBottom: function (n) {
        return n.bottom();
      },
      translate: function (n, e, t) {
        return is({
          left: n.left() + e,
          top: n.top() + t,
          right: n.right() + e,
          bottom: n.bottom() + t,
        });
      },
      toString: function (n) {
        return (
          "(" +
          n.left() +
          ", " +
          n.top() +
          ") -> (" +
          n.right() +
          ", " +
          n.bottom() +
          ")"
        );
      },
    },
    as = function (n) {
      return us.nu({
        left: n.left,
        top: n.top,
        right: n.right,
        bottom: n.bottom,
      });
    },
    cs = function (n, e) {
      return x.some(n.getRect(e));
    },
    ls = function (n, e, t) {
      return we.isElement(e)
        ? cs(n, e).map(as)
        : we.isText(e)
        ? ((r = n),
          (o = e),
          (i = t),
          0 <= i && i < Tt(o)
            ? r.getRangedRect(o, i, o, i + 1)
            : 0 < i
            ? r.getRangedRect(o, i - 1, o, i)
            : x.none()).map(as)
        : x.none();
      var r, o, i;
    },
    ss = function (n, e) {
      return we.isElement(e)
        ? cs(n, e).map(as)
        : we.isText(e)
        ? n.getRangedRect(e, 0, e, Tt(e)).map(as)
        : x.none();
    },
    fs = V.immutable("item", "mode"),
    ds = function (n, e, t, r) {
      var o = r !== undefined ? r : ms;
      return n
        .property()
        .parent(e)
        .map(function (n) {
          return fs(n, o);
        });
    },
    ms = function (n, e, t, r) {
      var o = r !== undefined ? r : gs;
      return t.sibling(n, e).map(function (n) {
        return fs(n, o);
      });
    },
    gs = function (n, e, t, r) {
      var o = r !== undefined ? r : gs,
        i = n.property().children(e);
      return t.first(i).map(function (n) {
        return fs(n, o);
      });
    },
    hs = [
      {
        current: ds,
        next: ms,
        fallback: x.none(),
      },
      {
        current: ms,
        next: gs,
        fallback: x.some(ds),
      },
      {
        current: gs,
        next: gs,
        fallback: x.some(ms),
      },
    ],
    ps = function (e, t, r, o, n) {
      return (
        (n = n !== undefined ? n : hs),
        P.find(n, function (n) {
          return n.current === r;
        }).bind(function (n) {
          return n.current(e, t, o, n.next).orThunk(function () {
            return n.fallback.bind(function (n) {
              return ps(e, t, n, o);
            });
          });
        })
      );
    },
    vs = {
      backtrack: ds,
      sidestep: ms,
      advance: gs,
      go: ps,
    },
    bs = {
      left: function () {
        return {
          sibling: function (n, e) {
            return n.query().prevSibling(e);
          },
          first: function (n) {
            return 0 < n.length ? x.some(n[n.length - 1]) : x.none();
          },
        };
      },
      right: function () {
        return {
          sibling: function (n, e) {
            return n.query().nextSibling(e);
          },
          first: function (n) {
            return 0 < n.length ? x.some(n[0]) : x.none();
          },
        };
      },
    },
    ws = function (e, n, t, r, o, i) {
      return vs.go(e, n, r, o).bind(function (n) {
        return i(n.item())
          ? x.none()
          : t(n.item())
          ? x.some(n.item())
          : ws(e, n.item(), t, n.mode(), o, i);
      });
    },
    ys = function (n, e, t, r) {
      return ws(n, e, t, vs.sidestep, bs.left(), r);
    },
    xs = function (n, e, t, r) {
      return ws(n, e, t, vs.sidestep, bs.right(), r);
    },
    Cs = function (n, e) {
      return 0 === n.property().children(e).length;
    },
    Rs = function (n, e, t, r) {
      return ys(n, e, t, r);
    },
    Ss = function (n, e, t, r) {
      return xs(n, e, t, r);
    },
    Ts = {
      before: function (n, e, t) {
        return Rs(n, e, y.curry(Cs, n), t);
      },
      after: function (n, e, t) {
        return Ss(n, e, y.curry(Cs, n), t);
      },
      seekLeft: Rs,
      seekRight: Ss,
      walkers: function () {
        return {
          left: bs.left,
          right: bs.right,
        };
      },
      walk: function (n, e, t, r, o) {
        return vs.go(n, e, t, r, o);
      },
      backtrack: vs.backtrack,
      sidestep: vs.sidestep,
      advance: vs.advance,
    },
    Ds = Lt(),
    ks = {
      gather: function (n, e, t) {
        return Ts.gather(Ds, n, e, t);
      },
      before: function (n, e) {
        return Ts.before(Ds, n, e);
      },
      after: function (n, e) {
        return Ts.after(Ds, n, e);
      },
      seekLeft: function (n, e, t) {
        return Ts.seekLeft(Ds, n, e, t);
      },
      seekRight: function (n, e, t) {
        return Ts.seekRight(Ds, n, e, t);
      },
      walkers: function () {
        return Ts.walkers();
      },
      walk: function (n, e, t, r) {
        return Ts.walk(Ds, n, e, t, r);
      },
    },
    As = Er([
      {
        none: [],
      },
      {
        retry: ["caret"],
      },
    ]),
    Os = function (e, n, r) {
      return _e.closest(n, Xo).fold(y.constant(!1), function (n) {
        return ss(e, n).exists(function (n) {
          return (
            (t = n),
            (e = r).left() < t.left() ||
              Math.abs(t.right() - e.left()) < 1 ||
              e.left() > t.right()
          );
          var e, t;
        });
      });
    },
    Ns = {
      point: us.getTop,
      adjuster: function (n, e, t, r, o) {
        var i = us.moveUp(o, 5);
        return Math.abs(t.top() - r.top()) < 1
          ? As.retry(i)
          : t.bottom() < o.top()
          ? As.retry(i)
          : t.bottom() === o.top()
          ? As.retry(us.moveUp(o, 1))
          : Os(n, e, o)
          ? As.retry(us.translate(i, 5, 0))
          : As.none();
      },
      move: us.moveUp,
      gather: ks.before,
    },
    Es = {
      point: us.getBottom,
      adjuster: function (n, e, t, r, o) {
        var i = us.moveDown(o, 5);
        return Math.abs(t.bottom() - r.bottom()) < 1
          ? As.retry(i)
          : t.top() > o.bottom()
          ? As.retry(i)
          : t.top() === o.bottom()
          ? As.retry(us.moveDown(o, 1))
          : Os(n, e, o)
          ? As.retry(us.translate(i, 5, 0))
          : As.none();
      },
      move: us.moveDown,
      gather: ks.after,
    },
    Ps = function (t, r, o, i, u) {
      return 0 === u
        ? x.some(i)
        : ((c = t),
          (l = i.left()),
          (s = r.point(i)),
          c
            .elementFromPoint(l, s)
            .filter(function (n) {
              return "table" === we.name(n);
            })
            .isSome()
            ? ((e = i), (a = u - 1), Ps(t, (n = r), o, n.move(e, 5), a))
            : t.situsFromPoint(i.left(), r.point(i)).bind(function (n) {
                return n.start().fold(
                  x.none,
                  function (e, n) {
                    return ss(t, e, n)
                      .bind(function (n) {
                        return r
                          .adjuster(t, e, n, o, i)
                          .fold(x.none, function (n) {
                            return Ps(t, r, o, n, u - 1);
                          });
                      })
                      .orThunk(function () {
                        return x.some(i);
                      });
                  },
                  x.none
                );
              }));
      var n, e, a, c, l, s;
    },
    Bs = function (e, t, n) {
      var r,
        o,
        i,
        u = e.move(n, 5),
        a = Ps(t, e, n, u, 100).getOr(u);
      return ((r = e),
      (o = a),
      (i = t),
      r.point(o) > i.getInnerHeight()
        ? x.some(r.point(o) - i.getInnerHeight())
        : r.point(o) < 0
        ? x.some(-r.point(o))
        : x.none()).fold(
        function () {
          return t.situsFromPoint(a.left(), e.point(a));
        },
        function (n) {
          return t.scrollBy(0, n), t.situsFromPoint(a.left(), e.point(a) - n);
        }
      );
    },
    Is = {
      tryUp: y.curry(Bs, Ns),
      tryDown: y.curry(Bs, Es),
      ieTryUp: function (n, e) {
        return n.situsFromPoint(e.left(), e.top() - 5);
      },
      ieTryDown: function (n, e) {
        return n.situsFromPoint(e.left(), e.bottom() + 5);
      },
      getJumpSize: y.constant(5),
    },
    Ws = Er([
      {
        none: ["message"],
      },
      {
        success: [],
      },
      {
        failedUp: ["cell"],
      },
      {
        failedDown: ["cell"],
      },
    ]),
    Ms = function (n) {
      return He.closest(n, "tr");
    },
    Ls = {
      verify: function (a, n, e, t, r, c, o) {
        return He.closest(t, "td,th", o)
          .bind(function (u) {
            return He.closest(n, "td,th", o).map(function (i) {
              return te.eq(u, i)
                ? te.eq(t, u) && Tt(u) === r
                  ? c(i)
                  : Ws.none("in same cell")
                : rr.sharedOne(Ms, [u, i]).fold(
                    function () {
                      return (
                        (e = i),
                        (t = u),
                        (r = (n = a).getRect(e)),
                        (o = n.getRect(t)).right > r.left && o.left < r.right
                          ? Ws.success()
                          : c(i)
                      );
                      var n, e, t, r, o;
                    },
                    function (n) {
                      return c(i);
                    }
                  );
            });
          })
          .getOr(Ws.none("default"));
      },
      cata: function (n, e, t, r, o) {
        return n.fold(e, t, r, o);
      },
      adt: Ws,
    },
    qs = {
      point: V.immutable("element", "offset"),
      delta: V.immutable("element", "deltaOffset"),
      range: V.immutable("element", "start", "finish"),
      points: V.immutable("begin", "end"),
      text: V.immutable("element", "text"),
    },
    js =
      (V.immutable("ancestor", "descendants", "element", "index"),
      V.immutable("parent", "children", "element", "index")),
    _s = function (n, e) {
      return P.findIndex(n, y.curry(te.eq, e));
    },
    zs = function (r) {
      return se.parent(r).bind(function (e) {
        var t = se.children(e);
        return _s(t, r).map(function (n) {
          return js(e, t, r, n);
        });
      });
    },
    Hs = function (n) {
      return "br" === we.name(n);
    },
    Fs = function (n, e, t) {
      return e(n, t).bind(function (n) {
        return we.isText(n) && 0 === Ct.get(n).trim().length
          ? Fs(n, e, t)
          : x.some(n);
      });
    },
    Us = function (e, n, t, r) {
      return ((o = n),
      (i = t),
      se
        .child(o, i)
        .filter(Hs)
        .orThunk(function () {
          return se.child(o, i - 1).filter(Hs);
        })).bind(function (n) {
        return r.traverse(n).fold(
          function () {
            return Fs(n, r.gather, e).map(r.relative);
          },
          function (n) {
            return zs(n).map(function (n) {
              return Xc.on(n.parent(), n.index());
            });
          }
        );
      });
      var o, i;
    },
    Vs = function (n, e, t, r) {
      var o, i, u;
      return (
        Hs(e)
          ? ((o = n),
            (i = e),
            (u = r)
              .traverse(i)
              .orThunk(function () {
                return Fs(i, u.gather, o);
              })
              .map(u.relative))
          : Us(n, e, t, r)
      ).map(function (n) {
        return {
          start: y.constant(n),
          finish: y.constant(n),
        };
      });
    },
    Gs = function (n) {
      return Ls.cata(
        n,
        function (n) {
          return x.none();
        },
        function () {
          return x.none();
        },
        function (n) {
          return x.some(qs.point(n, 0));
        },
        function (n) {
          return x.some(qs.point(n, Tt(n)));
        }
      );
    },
    Xs = Zn.detect(),
    Ys = function (r, o, i, u, a, c) {
      return 0 === c
        ? x.none()
        : Js(r, o, i, u, a).bind(function (n) {
            var e = r.fromSitus(n),
              t = Ls.verify(r, i, u, e.finish(), e.foffset(), a.failure, o);
            return Ls.cata(
              t,
              function () {
                return x.none();
              },
              function () {
                return x.some(n);
              },
              function (n) {
                return te.eq(i, n) && 0 === u
                  ? Ks(r, i, u, us.moveUp, a)
                  : Ys(r, o, n, 0, a, c - 1);
              },
              function (n) {
                return te.eq(i, n) && u === Tt(n)
                  ? Ks(r, i, u, us.moveDown, a)
                  : Ys(r, o, n, Tt(n), a, c - 1);
              }
            );
          });
    },
    Ks = function (e, n, t, r, o) {
      return ls(e, n, t).bind(function (n) {
        return $s(e, o, r(n, Is.getJumpSize()));
      });
    },
    $s = function (n, e, t) {
      return Xs.browser.isChrome() ||
        Xs.browser.isSafari() ||
        Xs.browser.isFirefox() ||
        Xs.browser.isEdge()
        ? e.otherRetry(n, t)
        : Xs.browser.isIE()
        ? e.ieRetry(n, t)
        : x.none();
    },
    Js = function (e, n, t, r, o) {
      return ls(e, t, r).bind(function (n) {
        return $s(e, o, n);
      });
    },
    Qs = function (e, t, r) {
      return ((o = e),
      (i = t),
      (u = r),
      o.getSelection().bind(function (r) {
        return Vs(i, r.finish(), r.foffset(), u).fold(
          function () {
            return x.some(qs.point(r.finish(), r.foffset()));
          },
          function (n) {
            var e = o.fromSitus(n),
              t = Ls.verify(
                o,
                r.finish(),
                r.foffset(),
                e.finish(),
                e.foffset(),
                u.failure,
                i
              );
            return Gs(t);
          }
        );
      })).bind(function (n) {
        return Ys(e, t, n.element(), n.offset(), r, 20).map(e.fromSitus);
      });
      var o, i, u;
    },
    Zs = function (n, e, t) {
      return _e.ancestor(n, e, t).isSome();
    },
    nf = Zn.detect(),
    ef = function (r, o, i, n, u) {
      return He.closest(n, "td,th", o).bind(function (t) {
        return He.closest(t, "table", o).bind(function (n) {
          return (
            (e = n),
            Zs(u, function (n) {
              return se.parent(n).exists(function (n) {
                return te.eq(n, e);
              });
            })
              ? Qs(r, o, i).bind(function (e) {
                  return He.closest(e.finish(), "td,th", o).map(function (n) {
                    return {
                      start: y.constant(t),
                      finish: y.constant(n),
                      range: y.constant(e),
                    };
                  });
                })
              : x.none()
          );
          var e;
        });
      });
    },
    tf = function (n, e, t, r, o, i) {
      return nf.browser.isIE()
        ? x.none()
        : i(r, e).orThunk(function () {
            return ef(n, e, t, r, o).map(function (n) {
              var e = n.range();
              return Gl.response(
                x.some(Ql(e.start(), e.soffset(), e.finish(), e.foffset())),
                !0
              );
            });
          });
    },
    rf = function (n, e, t, r, o, i, u) {
      return ef(n, t, r, o, i).bind(function (n) {
        return os.detect(e, t, n.start(), n.finish(), u);
      });
    },
    of = function (n, r) {
      return He.closest(n, "tr", r).bind(function (t) {
        return He.closest(t, "table", r).bind(function (n) {
          var e = Ne.descendants(n, "tr");
          return te.eq(t, e[0])
            ? ks
                .seekLeft(
                  n,
                  function (n) {
                    return At.last(n).isSome();
                  },
                  r
                )
                .map(function (n) {
                  var e = Tt(n);
                  return Gl.response(x.some(Ql(n, e, n, e)), !0);
                })
            : x.none();
        });
      });
    },
    uf = function (n, r) {
      return He.closest(n, "tr", r).bind(function (t) {
        return He.closest(t, "table", r).bind(function (n) {
          var e = Ne.descendants(n, "tr");
          return te.eq(t, e[e.length - 1])
            ? ks
                .seekRight(
                  n,
                  function (n) {
                    return At.first(n).isSome();
                  },
                  r
                )
                .map(function (n) {
                  return Gl.response(x.some(Ql(n, 0, n, 0)), !0);
                })
            : x.none();
        });
      });
    },
    af = function (n, e) {
      return He.closest(n, "td,th", e);
    },
    cf = {
      down: {
        traverse: se.nextSibling,
        gather: ks.after,
        relative: Xc.before,
        otherRetry: Is.tryDown,
        ieRetry: Is.ieTryDown,
        failure: Ls.adt.failedDown,
      },
      up: {
        traverse: se.prevSibling,
        gather: ks.before,
        relative: Xc.before,
        otherRetry: Is.tryUp,
        ieRetry: Is.ieTryUp,
        failure: Ls.adt.failedUp,
      },
    },
    lf = V.immutable("rows", "cols"),
    sf = {
      mouse: function (n, e, t, r) {
        var o,
          i,
          u,
          a,
          c,
          l,
          s = ts(n),
          f =
            ((o = s),
            (i = e),
            (u = t),
            (a = r),
            (c = x.none()),
            (l = function () {
              c = x.none();
            }),
            {
              mousedown: function (n) {
                a.clear(i), (c = af(n.target(), u));
              },
              mouseover: function (n) {
                c.each(function (r) {
                  a.clear(i),
                    af(n.target(), u).each(function (t) {
                      xr(r, t, u).each(function (n) {
                        var e = n.boxes().getOr([]);
                        (1 < e.length || (1 === e.length && !te.eq(r, t))) &&
                          (a.selectRange(i, e, n.start(), n.finish()),
                          o.selectContents(t));
                      });
                    });
                });
              },
              mouseup: function () {
                c.each(l);
              },
            });
        return {
          mousedown: f.mousedown,
          mouseover: f.mouseover,
          mouseup: f.mouseup,
        };
      },
      keyboard: function (n, c, l, s) {
        var f = ts(n),
          d = function () {
            return s.clear(c), x.none();
          };
        return {
          keydown: function (n, e, t, r, o, i) {
            var u = n.raw().which,
              a = !0 === n.raw().shiftKey;
            return Cr(c, s.selectedSelector()).fold(
              function () {
                return $l.isDown(u) && a
                  ? y.curry(rf, f, c, l, cf.down, r, e, s.selectRange)
                  : $l.isUp(u) && a
                  ? y.curry(rf, f, c, l, cf.up, r, e, s.selectRange)
                  : $l.isDown(u)
                  ? y.curry(tf, f, l, cf.down, r, e, uf)
                  : $l.isUp(u)
                  ? y.curry(tf, f, l, cf.up, r, e, of)
                  : x.none;
              },
              function (e) {
                var n = function (n) {
                  return function () {
                    return ti(n, function (n) {
                      return os.update(n.rows(), n.cols(), c, e, s);
                    }).fold(
                      function () {
                        return Sr(
                          c,
                          s.firstSelectedSelector(),
                          s.lastSelectedSelector()
                        ).map(function (n) {
                          var e =
                            $l.isDown(u) || i.isForward(u)
                              ? Xc.after
                              : Xc.before;
                          return (
                            f.setRelativeSelection(
                              Xc.on(n.first(), 0),
                              e(n.table())
                            ),
                            s.clear(c),
                            Gl.response(x.none(), !0)
                          );
                        });
                      },
                      function (n) {
                        return x.some(Gl.response(x.none(), !0));
                      }
                    );
                  };
                };
                return $l.isDown(u) && a
                  ? n([lf(1, 0)])
                  : $l.isUp(u) && a
                  ? n([lf(-1, 0)])
                  : i.isBackward(u) && a
                  ? n([lf(0, -1), lf(-1, 0)])
                  : i.isForward(u) && a
                  ? n([lf(0, 1), lf(1, 0)])
                  : $l.isNavigation(u) && !1 === a
                  ? d
                  : x.none;
              }
            )();
          },
          keyup: function (e, t, r, o, i) {
            return Cr(c, s.selectedSelector()).fold(function () {
              var n = e.raw().which;
              return 0 == (!0 === e.raw().shiftKey)
                ? x.none()
                : $l.isNavigation(n)
                ? os.sync(c, l, t, r, o, i, s.selectRange)
                : x.none();
            }, x.none);
          },
        };
      },
    },
    ff = function (e, n) {
      P.each(n, function (n) {
        Mi.remove(e, n);
      });
    },
    df = function (e) {
      return function (n) {
        Mi.add(n, e);
      };
    },
    mf = function (e) {
      return function (n) {
        ff(n, e);
      };
    },
    gf = {
      byClass: function (o) {
        var i = df(o.selected()),
          t = mf([o.selected(), o.lastSelected(), o.firstSelected()]),
          u = function (n) {
            var e = Ne.descendants(n, o.selectedSelector());
            P.each(e, t);
          };
        return {
          clear: u,
          selectRange: function (n, e, t, r) {
            u(n),
              P.each(e, i),
              Mi.add(t, o.firstSelected()),
              Mi.add(r, o.lastSelected());
          },
          selectedSelector: o.selectedSelector,
          firstSelectedSelector: o.firstSelectedSelector,
          lastSelectedSelector: o.lastSelectedSelector,
        };
      },
      byAttr: function (o) {
        var t = function (n) {
            Se.remove(n, o.selected()),
              Se.remove(n, o.firstSelected()),
              Se.remove(n, o.lastSelected());
          },
          i = function (n) {
            Se.set(n, o.selected(), "1");
          },
          u = function (n) {
            var e = Ne.descendants(n, o.selectedSelector());
            P.each(e, t);
          };
        return {
          clear: u,
          selectRange: function (n, e, t, r) {
            u(n),
              P.each(e, i),
              Se.set(t, o.firstSelected(), "1"),
              Se.set(r, o.lastSelected(), "1");
          },
          selectedSelector: o.selectedSelector,
          firstSelectedSelector: o.firstSelectedSelector,
          lastSelectedSelector: o.lastSelectedSelector,
        };
      },
    },
    hf = function (n) {
      return !1 === Mi.has(nn.fromDom(n.target), "ephox-snooker-resizer-bar");
    };

  function pf(h, p) {
    var v = V.immutableBag(
        ["mousedown", "mouseover", "mouseup", "keyup", "keydown"],
        []
      ),
      b = x.none(),
      w = gf.byAttr(Nr);
    return (
      h.on("init", function (n) {
        var r = h.getWin(),
          o = fa(h),
          e = ga(h),
          t = sf.mouse(r, o, e, w),
          a = sf.keyboard(r, o, e, w),
          c = function (n, e) {
            !0 === n.raw().shiftKey &&
              (e.kill() && n.kill(),
              e.selection().each(function (n) {
                var e = $c.relative(n.start(), n.finish()),
                  t = ul.asLtrRange(r, e);
                h.selection.setRng(t);
              }));
          },
          i = function (n) {
            var e = s(n);
            if (e.raw().shiftKey && $l.isNavigation(e.raw().which)) {
              var t = h.selection.getRng(),
                r = nn.fromDom(t.startContainer),
                o = nn.fromDom(t.endContainer);
              a.keyup(e, r, t.startOffset, o, t.endOffset).each(function (n) {
                c(e, n);
              });
            }
          },
          u = function (n) {
            var e = s(n);
            p().each(function (n) {
              n.hideBars();
            });
            var t = h.selection.getRng(),
              r = nn.fromDom(h.selection.getStart()),
              o = nn.fromDom(t.startContainer),
              i = nn.fromDom(t.endContainer),
              u = xa.directionAt(r).isRtl() ? $l.rtl : $l.ltr;
            a
              .keydown(e, o, t.startOffset, i, t.endOffset, u)
              .each(function (n) {
                c(e, n);
              }),
              p().each(function (n) {
                n.showBars();
              });
          },
          l = function (n) {
            return n.hasOwnProperty("x") && n.hasOwnProperty("y");
          },
          s = function (n) {
            var e = nn.fromDom(n.target),
              t = function () {
                n.stopPropagation();
              },
              r = function () {
                n.preventDefault();
              },
              o = y.compose(r, t);
            return {
              target: y.constant(e),
              x: y.constant(l(n) ? n.x : null),
              y: y.constant(l(n) ? n.y : null),
              stop: t,
              prevent: r,
              kill: o,
              raw: y.constant(n),
            };
          },
          f = function (n) {
            return 0 === n.button;
          },
          d = function (n) {
            f(n) && hf(n) && t.mousedown(s(n));
          },
          m = function (n) {
            var e;
            ((e = n).buttons !== undefined && 0 == (1 & e.buttons)) ||
              !hf(n) ||
              t.mouseover(s(n));
          },
          g = function (n) {
            f(n) && hf(n) && t.mouseup(s(n));
          };
        h.on("mousedown", d),
          h.on("mouseover", m),
          h.on("mouseup", g),
          h.on("keyup", i),
          h.on("keydown", u),
          h.on("nodechange", function () {
            var n = h.selection,
              e = nn.fromDom(n.getStart()),
              t = nn.fromDom(n.getEnd());
            rr.sharedOne(Ye.table, [e, t]).fold(function () {
              w.clear(o);
            }, y.noop);
          }),
          (b = x.some(
            v({
              mousedown: d,
              mouseover: m,
              mouseup: g,
              keyup: i,
              keydown: u,
            })
          ));
      }),
      {
        clear: w.clear,
        destroy: function () {
          b.each(function (n) {});
        },
      }
    );
  }
  var vf = ja.each,
    bf = function (e) {
      var t = [];

      function n(n) {
        return function () {
          e.execCommand(n);
        };
      }
      vf(
        "inserttable tableprops deletetable | cell row column".split(" "),
        function (n) {
          "|" === n
            ? t.push({
                text: "-",
              })
            : t.push(e.menuItems[n]);
        }
      ),
        e.addButton("table", {
          type: "menubutton",
          title: "Table",
          icon: false,
          image:
            "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+X2ljb248L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Il9pY29uIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIHBvaW50cz0iMCAwIDMyIDAgMzIgMzIgMCAzMiI+PC9wb2x5Z29uPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB4PSI1LjMzMzMzMzMzIiB5PSI1LjMzMzMzMzMzIiB3aWR0aD0iMjEuMzMzMzMzMyIgaGVpZ2h0PSIyMS4zMzMzMzMzIiByeD0iMi42NjY2NjY2NyI+PC9yZWN0PgogICAgICAgICAgICA8bGluZSB4MT0iNS4zMzMzMzMzMyIgeTE9IjEzLjMzMzMzMzMiIHgyPSIyNi42NjY2NjY3IiB5Mj0iMTMuMzMzMzMzMyIgaWQ9IlBhdGgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjEzLjMzMzMzMzMiIHkxPSI1LjMzMzMzMzMzIiB4Mj0iMTMuMzMzMzMzMyIgeTI9IjI2LjY2NjY2NjciIGlkPSJQYXRoIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
          menu: t,
        }),
        e.addButton("tableprops", {
          title: "Table properties",
          onclick: n("mceTableProps"),
          icon: "table",
        }),
        e.addButton("tabledelete", {
          title: "Delete table",
          onclick: n("mceTableDelete"),
        }),
        e.addButton("tablecellprops", {
          title: "Cell properties",
          onclick: n("mceTableCellProps"),
        }),
        e.addButton("tablemergecells", {
          title: "Merge cells",
          onclick: n("mceTableMergeCells"),
        }),
        e.addButton("tablesplitcells", {
          title: "Split cell",
          onclick: n("mceTableSplitCells"),
        }),
        e.addButton("tableinsertrowbefore", {
          title: "Insert row before",
          onclick: n("mceTableInsertRowBefore"),
        }),
        e.addButton("tableinsertrowafter", {
          title: "Insert row after",
          onclick: n("mceTableInsertRowAfter"),
        }),
        e.addButton("tabledeleterow", {
          title: "Delete row",
          onclick: n("mceTableDeleteRow"),
        }),
        e.addButton("tablerowprops", {
          title: "Row properties",
          onclick: n("mceTableRowProps"),
        }),
        e.addButton("tablecutrow", {
          title: "Cut row",
          onclick: n("mceTableCutRow"),
        }),
        e.addButton("tablecopyrow", {
          title: "Copy row",
          onclick: n("mceTableCopyRow"),
        }),
        e.addButton("tablepasterowbefore", {
          title: "Paste row before",
          onclick: n("mceTablePasteRowBefore"),
        }),
        e.addButton("tablepasterowafter", {
          title: "Paste row after",
          onclick: n("mceTablePasteRowAfter"),
        }),
        e.addButton("tableinsertcolbefore", {
          title: "Insert column before",
          onclick: n("mceTableInsertColBefore"),
        }),
        e.addButton("tableinsertcolafter", {
          title: "Insert column after",
          onclick: n("mceTableInsertColAfter"),
        }),
        e.addButton("tabledeletecol", {
          title: "Delete column",
          onclick: n("mceTableDeleteCol"),
        });
    },
    wf = function (e) {
      var n,
        t =
          "" === (n = e.getParam("table_toolbar", Ca)) || !1 === n
            ? []
            : p.isString(n)
            ? n.split(/[ ,]/)
            : p.isArray(n)
            ? n
            : [];
      0 < t.length &&
        e.addContextToolbar(function (n) {
          return e.dom.is(n, "table") && e.getBody().contains(n);
        }, t.join(" "));
    },
    yf = function (o, t) {
      var r = x.none(),
        i = [],
        u = [],
        a = [],
        c = [],
        l = function (n) {
          n.disabled(!0);
        },
        s = function (n) {
          n.disabled(!1);
        },
        n = function () {
          var e = this;
          i.push(e),
            r.fold(
              function () {
                l(e);
              },
              function (n) {
                s(e);
              }
            );
        },
        e = function () {
          var e = this;
          u.push(e),
            r.fold(
              function () {
                l(e);
              },
              function (n) {
                s(e);
              }
            );
        };
      o.on("init", function () {
        o.on("nodechange", function (n) {
          var e = x.from(o.dom.getParent(o.selection.getStart(), "th,td"));
          (r = e.bind(function (n) {
            var e = nn.fromDom(n);
            return Ye.table(e).map(function (n) {
              return _r.forMenu(t, n, e);
            });
          })).fold(
            function () {
              P.each(i, l), P.each(u, l), P.each(a, l), P.each(c, l);
            },
            function (e) {
              P.each(i, s),
                P.each(u, s),
                P.each(a, function (n) {
                  n.disabled(e.mergable().isNone());
                }),
                P.each(c, function (n) {
                  n.disabled(e.unmergable().isNone());
                });
            }
          );
        });
      });
      var f = function (n, e, t, r) {
          var o,
            i,
            u,
            a,
            c,
            l = r.getEl().getElementsByTagName("table")[0],
            s = r.isRtl() || "tl-tr" === r.parent().rel;
          for (
            l.nextSibling.innerHTML = e + 1 + " x " + (t + 1),
              s && (e = 9 - e),
              i = 0;
            i < 10;
            i++
          )
            for (o = 0; o < 10; o++)
              (a = l.rows[i].childNodes[o].firstChild),
                (c = (s ? e <= o : o <= e) && i <= t),
                n.dom.toggleClass(a, "mce-active", c),
                c && (u = a);
          return u.parentNode;
        },
        d =
          !1 === o.getParam("table_grid", !0, "boolean")
            ? {
                text: "Table",
                icon: "table",
                context: "table",
                onclick: m("mceInsertTable"),
              }
            : {
                text: "Table",
                icon: "table",
                context: "table",
                ariaHideMenu: !0,
                onclick: function (n) {
                  n.aria &&
                    (this.parent().hideAll(),
                    n.stopImmediatePropagation(),
                    o.execCommand("mceInsertTable"));
                },
                onshow: function () {
                  f(o, 0, 0, this.menu.items()[0]);
                },
                onhide: function () {
                  var n = this.menu
                    .items()[0]
                    .getEl()
                    .getElementsByTagName("a");
                  o.dom.removeClass(n, "mce-active"),
                    o.dom.addClass(n[0], "mce-active");
                },
                menu: [
                  {
                    type: "container",
                    html: (function () {
                      var n = "";
                      n =
                        '<table role="grid" class="mce-grid mce-grid-border" aria-readonly="true">';
                      for (var e = 0; e < 10; e++) {
                        n += "<tr>";
                        for (var t = 0; t < 10; t++)
                          n +=
                            '<td role="gridcell" tabindex="-1"><a id="mcegrid' +
                            (10 * e + t) +
                            '" href="#" data-mce-x="' +
                            t +
                            '" data-mce-y="' +
                            e +
                            '"></a></td>';
                        n += "</tr>";
                      }
                      return (
                        (n += "</table>"),
                        (n +=
                          '<div class="mce-text-center" role="presentation">1 x 1</div>')
                      );
                    })(),
                    onPostRender: function () {
                      this.lastX = this.lastY = 0;
                    },
                    onmousemove: function (n) {
                      var e,
                        t,
                        r = n.target;
                      "A" === r.tagName.toUpperCase() &&
                        ((e = parseInt(r.getAttribute("data-mce-x"), 10)),
                        (t = parseInt(r.getAttribute("data-mce-y"), 10)),
                        (this.isRtl() || "tl-tr" === this.parent().rel) &&
                          (e = 9 - e),
                        (e === this.lastX && t === this.lastY) ||
                          (f(o, e, t, n.control),
                          (this.lastX = e),
                          (this.lastY = t)));
                    },
                    onclick: function (n) {
                      var e = this;
                      "A" === n.target.tagName.toUpperCase() &&
                        (n.preventDefault(),
                        n.stopPropagation(),
                        e.parent().cancel(),
                        o.undoManager.transact(function () {
                          uc(o, e.lastX + 1, e.lastY + 1);
                        }),
                        o.addVisual());
                    },
                  },
                ],
              };

      function m(n) {
        return function () {
          o.execCommand(n);
        };
      }
      var g = {
          text: "Table properties",
          context: "table",
          onPostRender: n,
          onclick: m("mceTableProps"),
        },
        h = {
          text: "Delete table",
          context: "table",
          onPostRender: n,
          cmd: "mceTableDelete",
        },
        p = {
          text: "Row",
          context: "table",
          menu: [
            {
              text: "Insert row before",
              onclick: m("mceTableInsertRowBefore"),
              onPostRender: e,
            },
            {
              text: "Insert row after",
              onclick: m("mceTableInsertRowAfter"),
              onPostRender: e,
            },
            {
              text: "Delete row",
              onclick: m("mceTableDeleteRow"),
              onPostRender: e,
            },
            {
              text: "Row properties",
              onclick: m("mceTableRowProps"),
              onPostRender: e,
            },
            {
              text: "-",
            },
            {
              text: "Cut row",
              onclick: m("mceTableCutRow"),
              onPostRender: e,
            },
            {
              text: "Copy row",
              onclick: m("mceTableCopyRow"),
              onPostRender: e,
            },
            {
              text: "Paste row before",
              onclick: m("mceTablePasteRowBefore"),
              onPostRender: e,
            },
            {
              text: "Paste row after",
              onclick: m("mceTablePasteRowAfter"),
              onPostRender: e,
            },
          ],
        },
        v = {
          text: "Column",
          context: "table",
          menu: [
            {
              text: "Insert column before",
              onclick: m("mceTableInsertColBefore"),
              onPostRender: e,
            },
            {
              text: "Insert column after",
              onclick: m("mceTableInsertColAfter"),
              onPostRender: e,
            },
            {
              text: "Delete column",
              onclick: m("mceTableDeleteCol"),
              onPostRender: e,
            },
          ],
        },
        b = {
          separator: "before",
          text: "Cell",
          context: "table",
          menu: [
            {
              text: "Cell properties",
              onclick: m("mceTableCellProps"),
              onPostRender: e,
            },
            {
              text: "Merge cells",
              onclick: m("mceTableMergeCells"),
              onPostRender: function () {
                var e = this;
                a.push(e),
                  r.fold(
                    function () {
                      l(e);
                    },
                    function (n) {
                      e.disabled(n.mergable().isNone());
                    }
                  );
              },
            },
            {
              text: "Split cell",
              onclick: m("mceTableSplitCells"),
              onPostRender: function () {
                var e = this;
                c.push(e),
                  r.fold(
                    function () {
                      l(e);
                    },
                    function (n) {
                      e.disabled(n.unmergable().isNone());
                    }
                  );
              },
            },
          ],
        };
      o.addMenuItem("inserttable", d),
        o.addMenuItem("tableprops", g),
        o.addMenuItem("deletetable", h),
        o.addMenuItem("row", p),
        o.addMenuItem("column", v),
        o.addMenuItem("cell", b);
    },
    xf = function (t, o) {
      return {
        insertTable: function (n, e) {
          return uc(t, n, e);
        },
        setClipboardRows: function (n) {
          return (
            (e = n), (t = o), (r = P.map(e, nn.fromDom)), void t.set(x.from(r))
          );
          var e, t, r;
        },
        getClipboardRows: function () {
          return o.get().fold(
            function () {},
            function (n) {
              return P.map(n, function (n) {
                return n.dom();
              });
            }
          );
        },
      };
    };
  u.add("table", function (e) {
    var t,
      r = Lc(e),
      n = pf(e, r.lazyResize),
      o = La(e, r.lazyWire),
      i =
        ((t = e),
        {
          get: function () {
            var n = fa(t);
            return Tr(n, Nr.selectedSelector()).fold(
              function () {
                return t.selection.getStart() === undefined
                  ? Br.none()
                  : Br.single(t.selection);
              },
              function (n) {
                return Br.multiple(n);
              }
            );
          },
        }),
      u = No(x.none());
    return (
      fc(e, o, n, i, u),
      zr(e, i, o, n),
      yf(e, i),
      bf(e),
      wf(e),
      e.on("PreInit", function () {
        e.serializer.addTempAttr(Nr.firstSelected()),
          e.serializer.addTempAttr(Nr.lastSelected());
      }),
      e.getParam("table_tab_navigation", !0, "boolean") &&
        e.on("keydown", function (n) {
          Vl(n, e, o, r.lazyWire);
        }),
      e.on("remove", function () {
        r.destroy(), n.destroy();
      }),
      xf(e, u)
    );
  });
})();
/* 
  END: mce toolbar
  EOF: add-table / plugin.js / 21.09.17
*/
