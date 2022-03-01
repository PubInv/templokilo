!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.ExifReader = t())
    : (e.ExifReader = t());
})("undefined" != typeof self ? self : this, function () {
  return (function () {
    "use strict";
    var e = {
        d: function (t, n) {
          for (var r in n)
            e.o(n, r) &&
              !e.o(t, r) &&
              Object.defineProperty(t, r, { enumerable: 1, get: n[r] });
        },
        o: function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        },
        r: function (e) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: 1 });
        },
      },
      t = {};
    function n(e) {
      return (
        (n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        n(e)
      );
    }
    function r(e, t, n) {
      for (var r = [], i = 0; i < n && t + i < e.byteLength; i++)
        r.push(e.getUint8(t + i));
      return o(r);
    }
    function i(e, t, n) {
      for (var r = [], i = 0; i < n && t + i < e.byteLength; i += 2)
        r.push(e.getUint16(t + i));
      return o(r);
    }
    function o(e) {
      return e
        .map(function (e) {
          return String.fromCharCode(e);
        })
        .join("");
    }
    function a() {
      for (var e = 1; e < arguments.length; e++)
        for (var t in arguments[e]) arguments[0][t] = arguments[e][t];
      return arguments[0];
    }
    function u(e, t, n) {
      var r = 0;
      Object.defineProperty(e, t, {
        get: function () {
          return (
            r ||
              ((r = 1),
              Object.defineProperty(e, t, {
                configurable: 1,
                enumerable: 1,
                value: n.apply(e),
                writable: 1,
              })),
            e[t]
          );
        },
        configurable: 1,
        enumerable: 1,
      });
    }
    function c(e) {
      return "undefined" != typeof btoa
        ? btoa(
            Array.prototype.reduce.call(
              new Uint8Array(e),
              function (e, t) {
                return e + String.fromCharCode(t);
              },
              ""
            )
          )
        : "undefined" != typeof Buffer
        ? void 0 !== n(Buffer.from)
          ? Buffer.from(e).toString("base64")
          : new Buffer(e).toString("base64")
        : void 0;
    }
    function f(e) {
      return (
        (f =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        f(e)
      );
    }
    e.r(t),
      e.d(t, {
        default: function () {
          return jt;
        },
        errors: function () {
          return zt;
        },
        load: function () {
          return Wt;
        },
        loadView: function () {
          return Vt;
        },
      });
    var s = (function () {
      function e(t) {
        if (
          ((function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          (function (e) {
            return (
              "object" !== f(e) ||
              void 0 === e.length ||
              void 0 === e.readUInt8 ||
              void 0 === e.readUInt16LE ||
              void 0 === e.readUInt16BE ||
              void 0 === e.readUInt32LE ||
              void 0 === e.readUInt32BE ||
              void 0 === e.readInt32LE ||
              void 0 === e.readInt32BE
            );
          })(t))
        )
          throw Error("DataView: Passed buffer type is unsupported.");
        (this.buffer = t), (this.byteLength = this.buffer.length);
      }
      var t;
      return (
        (t = [
          {
            key: "getUint8",
            value: function (e) {
              return this.buffer.readUInt8(e);
            },
          },
          {
            key: "getUint16",
            value: function (e, t) {
              return t
                ? this.buffer.readUInt16LE(e)
                : this.buffer.readUInt16BE(e);
            },
          },
          {
            key: "getUint32",
            value: function (e, t) {
              return t
                ? this.buffer.readUInt32LE(e)
                : this.buffer.readUInt32BE(e);
            },
          },
          {
            key: "getInt32",
            value: function (e, t) {
              return t
                ? this.buffer.readInt32LE(e)
                : this.buffer.readInt32BE(e);
            },
          },
        ]) &&
          (function (e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || 0),
                (r.configurable = 1),
                "value" in r && (r.writable = 1),
                Object.defineProperty(e, r.key, r);
            }
          })(e.prototype, t),
        e
      );
    })();
    function l(e) {
      return e
        .map(function (e) {
          return String.fromCharCode(e);
        })
        .join("");
    }
    function d(e) {
      if (e.length >= 8) {
        var t = l(e.slice(0, 8));
        if ("ASCII\0\0\0" === t) return l(e.slice(8));
        if ("JIS\0\0\0\0\0" === t) return "[JIS encoded text]";
        if ("UNICODE\0" === t) return "[Unicode encoded text]";
        if ("\0\0\0\0\0\0\0\0" === t) return "[Undefined encoding]";
      }
      return "Undefined";
    }
    function p(e) {
      return (
        e[0][0] / e[0][1] + e[1][0] / e[1][1] / 60 + e[2][0] / e[2][1] / 3600
      );
    }
    var m = 18761,
      g = m,
      v = function (e, t) {
        if (e.getUint16(t) === m) return m;
        if (19789 === e.getUint16(t)) return 19789;
        throw Error("Illegal byte order value. Faulty image.");
      },
      h = 65505;
    function y(e, t) {
      return 65472 === e.getUint16(t);
    }
    function S(e, t) {
      return 65474 === e.getUint16(t);
    }
    function b(e, t) {
      return 65506 === e.getUint16(t) && "ICC_PROFILE\0" === r(e, t + 4, 12);
    }
    function C(e, t) {
      return 65506 === e.getUint16(t) && "MPF\0" === r(e, t + 4, 4);
    }
    function I(e, t) {
      return (
        65504 === e.getUint16(t) &&
        "JFIF" === r(e, t + 4, 4) &&
        0 === e.getUint8(t + 4 + 4)
      );
    }
    function A(e, t) {
      return (
        e.getUint16(t) === h &&
        "Exif" === r(e, t + 4, 4) &&
        0 === e.getUint8(t + 4 + 4)
      );
    }
    function P(e, t) {
      return (
        e.getUint16(t) === h &&
        (function (e, t) {
          return "http://ns.adobe.com/xap/1.0/\0" === r(e, t + 4, 29);
        })(e, t)
      );
    }
    function U(e, t) {
      return (
        e.getUint16(t) === h &&
        (function (e, t) {
          return "http://ns.adobe.com/xmp/extension/\0" === r(e, t + 4, 35);
        })(e, t)
      );
    }
    function w(e, t) {
      return { dataOffset: e + 33, length: t - 31 };
    }
    function D(e, t) {
      return { dataOffset: e + 79, length: t - 77 };
    }
    function T(e, t) {
      return (
        65517 === e.getUint16(t) &&
        "Photoshop 3.0" === r(e, t + 4, 13) &&
        0 === e.getUint8(t + 4 + 13)
      );
    }
    function O(e, t) {
      var n = e.getUint16(t);
      return (
        (n >= 65504 && n <= 65519) ||
        65534 === n ||
        65472 === n ||
        65474 === n ||
        65476 === n ||
        65499 === n ||
        65501 === n ||
        65498 === n
      );
    }
    var F = "PNG\r\n\n";
    function M(e, t) {
      return "IHDR" === r(e, t + 4, 4);
    }
    function R(e, t) {
      return (
        "iTXt" === r(e, t + 4, 4) && "XML:com.adobe.xmp\0" === r(e, t + 8, 18)
      );
    }
    function L(e, t) {
      t += 28;
      for (var n = 0; n < 2 && t < e.byteLength; )
        0 === e.getUint8(t) && n++, t++;
      if (!(n < 2)) return t;
    }
    function k(e, t) {
      var n = e.getUint32(t);
      return (function (e) {
        return 0 === e;
      })(n)
        ? e.byteLength - t
        : (function (e) {
            return 1 === e;
          })(n) &&
          (function (e, t) {
            return 0 === e.getUint32(t + 8);
          })(e, t)
        ? e.getUint32(t + 12)
        : n;
    }
    var x = function (e) {
        if (
          (function (e) {
            return (
              !!e &&
              e.byteLength >= 4 &&
              (function (e) {
                var t = e.getUint16(0) === g;
                return 42 === e.getUint16(2, t);
              })(e)
            );
          })(e)
        )
          return { hasAppMarkers: 1, tiffHeaderOffset: 0 };
        if (
          (function (e) {
            return !!e && e.byteLength >= 2 && 65496 === e.getUint16(0);
          })(e)
        )
          return (function (e) {
            for (
              var t, n, r, i, o, a, u, c, f, s = 2;
              s + 4 + 5 <= e.byteLength;

            ) {
              if (y(e, s)) n = s + 2;
              else if (S(e, s)) r = s + 2;
              else if (I(e, s)) (t = e.getUint16(s + 2)), (i = s + 2);
              else if (A(e, s)) (t = e.getUint16(s + 2)), (o = s + 10);
              else if (P(e, s))
                u || (u = []), (t = e.getUint16(s + 2)), u.push(w(s, t));
              else if (U(e, s))
                u || (u = []), (t = e.getUint16(s + 2)), u.push(D(s, t));
              else if (T(e, s)) (t = e.getUint16(s + 2)), (a = s + 18);
              else if (b(e, s)) {
                var l = s + 18,
                  d = (t = e.getUint16(s + 2)) - 16,
                  p = e.getUint8(s + 16),
                  m = e.getUint8(s + 17);
                c || (c = []),
                  c.push({
                    offset: l,
                    length: d,
                    chunkNumber: p,
                    chunksTotal: m,
                  });
              } else if (C(e, s)) (t = e.getUint16(s + 2)), (f = s + 8);
              else {
                if (!O(e, s)) break;
                t = e.getUint16(s + 2);
              }
              s += 2 + t;
            }
            return {
              hasAppMarkers: s > 2,
              fileDataOffset: n || r,
              jfifDataOffset: i,
              tiffHeaderOffset: o,
              iptcDataOffset: a,
              xmpChunks: u,
              iccChunks: c,
              mpfDataOffset: f,
            };
          })(e);
        if (
          (function (e) {
            return !!e && r(e, 0, 8) === F;
          })(e)
        )
          return (function (e) {
            for (
              var t = { hasAppMarkers: 0 }, n = 8;
              n + 4 + 4 <= e.byteLength;

            ) {
              if (M(e, n)) (t.hasAppMarkers = 1), (t.pngHeaderOffset = n + 8);
              else if (R(e, n)) {
                var r = L(e, n);
                void 0 !== r &&
                  ((t.hasAppMarkers = 1),
                  (t.xmpChunks = [
                    {
                      dataOffset: r,
                      length: e.getUint32(n + 0) - (r - (n + 8)),
                    },
                  ]));
              }
              n += e.getUint32(n + 0) + 4 + 4 + 4;
            }
            return t;
          })(e);
        if (
          (function (e) {
            if (!e) return 0;
            var t = r(e, 8, 4);
            return (
              "ftyp" === r(e, 4, 4) &&
              -1 !==
                [
                  "heic",
                  "heix",
                  "hevc",
                  "hevx",
                  "heim",
                  "heis",
                  "hevm",
                  "hevs",
                  "mif1",
                ].indexOf(t)
            );
          })(e)
        )
          return (function (e) {
            var t = (function (e) {
                for (var t = 0; t + 4 + 4 <= e.byteLength; ) {
                  var n = k(e, t);
                  if (n >= 8 && "meta" === r(e, t + 4, 4))
                    return { offset: t, length: n };
                  t += n;
                }
                return { offset: void 0, length: 0 };
              })(e),
              n = t.offset,
              i = t.length;
            if (void 0 === n) return { hasAppMarkers: 0 };
            var o = Math.min(n + i, e.byteLength),
              a = (function (e, t, n) {
                for (
                  var i = {
                    ilocOffset: void 0,
                    exifItemOffset: void 0,
                    colrOffset: void 0,
                  };
                  t + 4 <= n &&
                  (!i.ilocOffset || !i.exifItemOffset || !i.colrOffset);

                ) {
                  var o = r(e, t, 4);
                  "iloc" === o
                    ? (i.ilocOffset = t)
                    : "Exif" === o
                    ? (i.exifItemOffset = t + -4)
                    : "colr" === o && (i.colrOffset = t + -4),
                    t++;
                }
                return i;
              })(e, n, o),
              u = a.exifItemOffset,
              c = a.ilocOffset,
              f = a.colrOffset,
              s = (function (e, t, n, r) {
                if (n && t && !(t + 2 > r)) {
                  var i = e.getUint16(t);
                  for (n += 12; n + 16 <= r; ) {
                    if (e.getUint16(n) === i) {
                      var o = e.getUint32(n + 8);
                      if (o + 4 <= e.byteLength)
                        return o + (e.getUint32(o) + 4);
                    }
                    n += 16;
                  }
                }
              })(e, u, c, o),
              l = (function (e, t, n) {
                if (t && !(t + 12 > n)) {
                  var i = r(e, t + 8, 4);
                  if ("prof" === i || "rICC" === i)
                    return [
                      {
                        offset: t + 12,
                        length: k(e, t) - 12,
                        chunkNumber: 1,
                        chunksTotal: 1,
                      },
                    ];
                }
              })(e, f, o);
            return {
              hasAppMarkers: void 0 !== s || void 0 !== l,
              tiffHeaderOffset: s,
              iccChunks: l,
            };
          })(e);
        if (
          (function (e) {
            return !!e && "RIFF" === r(e, 0, 4) && "WEBP" === r(e, 8, 4);
          })(e)
        )
          return (function (e) {
            for (var t, n, i, o = 12, a = 0; o + 8 < e.byteLength; ) {
              var u = r(e, o, 4),
                c = e.getUint32(o + 4, 1);
              "EXIF" === u
                ? ((a = 1),
                  (t = "Exif\0\0" === r(e, o + 8, 6) ? o + 8 + 6 : o + 8))
                : "XMP " === u
                ? ((a = 1), (n = [{ dataOffset: o + 8, length: c }]))
                : "ICCP" === u &&
                  ((a = 1),
                  (i = [
                    {
                      offset: o + 8,
                      length: c,
                      chunkNumber: 1,
                      chunksTotal: 1,
                    },
                  ])),
                (o += 8 + (c % 2 == 0 ? c : c + 1));
            }
            return {
              hasAppMarkers: a,
              tiffHeaderOffset: t,
              xmpChunks: n,
              iccChunks: i,
            };
          })(e);
        throw Error("Invalid image format");
      },
      N = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8, 13: 4 },
      E = {
        BYTE: 1,
        ASCII: 2,
        SHORT: 3,
        LONG: 4,
        RATIONAL: 5,
        UNDEFINED: 7,
        SLONG: 9,
        SRATIONAL: 10,
        IFD: 13,
      },
      G = {
        getAsciiValue: function (e) {
          return e.map(function (e) {
            return String.fromCharCode(e);
          });
        },
        getByteAt: B,
        getAsciiAt: function (e, t) {
          return e.getUint8(t);
        },
        getShortAt: function (e, t, n) {
          return e.getUint16(t, n === g);
        },
        getLongAt: j,
        getRationalAt: function (e, t, n) {
          return [j(e, t, n), j(e, t + 4, n)];
        },
        getUndefinedAt: function (e, t) {
          return B(e, t);
        },
        getSlongAt: z,
        getSrationalAt: function (e, t, n) {
          return [z(e, t, n), z(e, t + 4, n)];
        },
        getIfdPointerAt: function (e, t, n) {
          return j(e, t, n);
        },
        typeSizes: N,
        tagTypes: E,
        getTypeSize: function (e) {
          if (void 0 === E[e]) throw Error("No such type found.");
          return N[E[e]];
        },
      };
    function B(e, t) {
      return e.getUint8(t);
    }
    function j(e, t, n) {
      return e.getUint32(t, n === g);
    }
    function z(e, t, n) {
      return e.getInt32(t, n === g);
    }
    var W = {
      LightSource: function (e) {
        return 1 === e
          ? "Daylight"
          : 2 === e
          ? "Fluorescent"
          : 3 === e
          ? "Tungsten (incandescent light)"
          : 4 === e
          ? "Flash"
          : 9 === e
          ? "Fine weather"
          : 10 === e
          ? "Cloudy weather"
          : 11 === e
          ? "Shade"
          : 12 === e
          ? "Daylight fluorescent (D 5700 – 7100K)"
          : 13 === e
          ? "Day white fluorescent (N 4600 – 5400K)"
          : 14 === e
          ? "Cool white fluorescent (W 3900 – 4500K)"
          : 15 === e
          ? "White fluorescent (WW 3200 – 3700K)"
          : 17 === e
          ? "Standard light A"
          : 18 === e
          ? "Standard light B"
          : 19 === e
          ? "Standard light C"
          : 20 === e
          ? "D55"
          : 21 === e
          ? "D65"
          : 22 === e
          ? "D75"
          : 23 === e
          ? "D50"
          : 24 === e
          ? "ISO studio tungsten"
          : 255 === e
          ? "Other light source"
          : "Unknown";
      },
    };
    function H(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function V(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var X = {
        0: {
          name: "GPSVersionID",
          description: function (e) {
            return 2 === e[0] && 2 === e[1] && 0 === e[2] && 0 === e[3]
              ? "Version 2.2"
              : "Unknown";
          },
        },
        1: {
          name: "GPSLatitudeRef",
          description: function (e) {
            var t = e.join("");
            return "N" === t
              ? "North latitude"
              : "S" === t
              ? "South latitude"
              : "Unknown";
          },
        },
        2: { name: "GPSLatitude", description: p },
        3: {
          name: "GPSLongitudeRef",
          description: function (e) {
            var t = e.join("");
            return "E" === t
              ? "East longitude"
              : "W" === t
              ? "West longitude"
              : "Unknown";
          },
        },
        4: { name: "GPSLongitude", description: p },
        5: {
          name: "GPSAltitudeRef",
          description: function (e) {
            return 0 === e
              ? "Sea level"
              : 1 === e
              ? "Sea level reference (negative value)"
              : "Unknown";
          },
        },
        6: {
          name: "GPSAltitude",
          description: function (e) {
            return e[0] / e[1] + " m";
          },
        },
        7: {
          name: "GPSTimeStamp",
          description: function (e) {
            return e
              .map(function (e) {
                var t,
                  n =
                    (2,
                    (function (e) {
                      if (Array.isArray(e)) return e;
                    })((t = e)) ||
                      (function (e, t) {
                        var n =
                          null == e
                            ? null
                            : ("undefined" != typeof Symbol &&
                                e[Symbol.iterator]) ||
                              e["@@iterator"];
                        if (null != n) {
                          var r,
                            i,
                            o = [],
                            a = 1,
                            u = 0;
                          try {
                            for (
                              n = n.call(e);
                              !(a = (r = n.next()).done) &&
                              (o.push(r.value), 2 !== o.length);
                              a = 1
                            );
                          } catch (e) {
                            (u = 1), (i = e);
                          } finally {
                            try {
                              a || null == n.return || n.return();
                            } finally {
                              if (u) throw i;
                            }
                          }
                          return o;
                        }
                      })(t) ||
                      (function (e, t) {
                        if (e) {
                          if ("string" == typeof e) return V(e, 2);
                          var n = Object.prototype.toString
                            .call(e)
                            .slice(8, -1);
                          return (
                            "Object" === n &&
                              e.constructor &&
                              (n = e.constructor.name),
                            "Map" === n || "Set" === n
                              ? Array.from(e)
                              : "Arguments" === n ||
                                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                  n
                                )
                              ? V(e, 2)
                              : void 0
                          );
                        }
                      })(t) ||
                      (function () {
                        throw new TypeError(
                          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                        );
                      })()),
                  r = n[0] / n[1];
                return /^\d(\.|$)/.test("".concat(r)) ? "0".concat(r) : r;
              })
              .join(":");
          },
        },
        8: "GPSSatellites",
        9: {
          name: "GPSStatus",
          description: function (e) {
            var t = e.join("");
            return "A" === t
              ? "Measurement in progress"
              : "V" === t
              ? "Measurement Interoperability"
              : "Unknown";
          },
        },
        10: {
          name: "GPSMeasureMode",
          description: function (e) {
            var t = e.join("");
            return "2" === t
              ? "2-dimensional measurement"
              : "3" === t
              ? "3-dimensional measurement"
              : "Unknown";
          },
        },
        11: "GPSDOP",
        12: {
          name: "GPSSpeedRef",
          description: function (e) {
            var t = e.join("");
            return "K" === t
              ? "Kilometers per hour"
              : "M" === t
              ? "Miles per hour"
              : "N" === t
              ? "Knots"
              : "Unknown";
          },
        },
        13: "GPSSpeed",
        14: {
          name: "GPSTrackRef",
          description: function (e) {
            var t = e.join("");
            return "T" === t
              ? "True direction"
              : "M" === t
              ? "Magnetic direction"
              : "Unknown";
          },
        },
        15: "GPSTrack",
        16: {
          name: "GPSImgDirectionRef",
          description: function (e) {
            var t = e.join("");
            return "T" === t
              ? "True direction"
              : "M" === t
              ? "Magnetic direction"
              : "Unknown";
          },
        },
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: {
          name: "GPSDestLatitudeRef",
          description: function (e) {
            var t = e.join("");
            return "N" === t
              ? "North latitude"
              : "S" === t
              ? "South latitude"
              : "Unknown";
          },
        },
        20: {
          name: "GPSDestLatitude",
          description: function (e) {
            return (
              e[0][0] / e[0][1] +
              e[1][0] / e[1][1] / 60 +
              e[2][0] / e[2][1] / 3600
            );
          },
        },
        21: {
          name: "GPSDestLongitudeRef",
          description: function (e) {
            var t = e.join("");
            return "E" === t
              ? "East longitude"
              : "W" === t
              ? "West longitude"
              : "Unknown";
          },
        },
        22: {
          name: "GPSDestLongitude",
          description: function (e) {
            return (
              e[0][0] / e[0][1] +
              e[1][0] / e[1][1] / 60 +
              e[2][0] / e[2][1] / 3600
            );
          },
        },
        23: {
          name: "GPSDestBearingRef",
          description: function (e) {
            var t = e.join("");
            return "T" === t
              ? "True direction"
              : "M" === t
              ? "Magnetic direction"
              : "Unknown";
          },
        },
        24: "GPSDestBearing",
        25: {
          name: "GPSDestDistanceRef",
          description: function (e) {
            var t = e.join("");
            return "K" === t
              ? "Kilometers"
              : "M" === t
              ? "Miles"
              : "N" === t
              ? "Knots"
              : "Unknown";
          },
        },
        26: "GPSDestDistance",
        27: { name: "GPSProcessingMethod", description: d },
        28: { name: "GPSAreaInformation", description: d },
        29: "GPSDateStamp",
        30: {
          name: "GPSDifferential",
          description: function (e) {
            return 0 === e
              ? "Measurement without differential correction"
              : 1 === e
              ? "Differential correction applied"
              : "Unknown";
          },
        },
        31: "GPSHPositioningError",
      },
      q = {
        1: "InteroperabilityIndex",
        2: {
          name: "InteroperabilityVersion",
          description: function (e) {
            return l(e);
          },
        },
        4096: "RelatedImageFileFormat",
        4097: "RelatedImageWidth",
        4098: "RelatedImageHeight",
      },
      Y = {
        45056: {
          name: "MPFVersion",
          description: function (e) {
            return l(e);
          },
        },
        45057: "NumberOfImages",
        45058: "MPEntry",
        45059: "ImageUIDList",
        45060: "TotalFrames",
      },
      J = a(
        {},
        {
          11: "ProcessingSoftware",
          254: {
            name: "SubfileType",
            description: function (e) {
              return (
                {
                  0: "Full-resolution image",
                  1: "Reduced-resolution image",
                  2: "Single page of multi-page image",
                  3: "Single page of multi-page reduced-resolution image",
                  4: "Transparency mask",
                  5: "Transparency mask of reduced-resolution image",
                  6: "Transparency mask of multi-page image",
                  7: "Transparency mask of reduced-resolution multi-page image",
                  65537: "Alternate reduced-resolution image",
                  4294967295: "Invalid",
                }[e] || "Unknown"
              );
            },
          },
          255: {
            name: "OldSubfileType",
            description: function (e) {
              return (
                {
                  0: "Full-resolution image",
                  1: "Reduced-resolution image",
                  2: "Single page of multi-page image",
                }[e] || "Unknown"
              );
            },
          },
          256: "ImageWidth",
          257: "ImageLength",
          258: "BitsPerSample",
          259: "Compression",
          262: "PhotometricInterpretation",
          263: {
            name: "Thresholding",
            description: function (e) {
              return (
                {
                  1: "No dithering or halftoning",
                  2: "Ordered dither or halfton",
                  3: "Randomized dither",
                }[e] || "Unknown"
              );
            },
          },
          264: "CellWidth",
          265: "CellLength",
          266: {
            name: "FillOrder",
            description: function (e) {
              return { 1: "Normal", 2: "Reversed" }[e] || "Unknown";
            },
          },
          269: "DocumentName",
          270: "ImageDescription",
          271: "Make",
          272: "Model",
          273: "StripOffsets",
          274: {
            name: "Orientation",
            description: function (e) {
              return 1 === e
                ? "top-left"
                : 2 === e
                ? "top-right"
                : 3 === e
                ? "bottom-right"
                : 4 === e
                ? "bottom-left"
                : 5 === e
                ? "left-top"
                : 6 === e
                ? "right-top"
                : 7 === e
                ? "right-bottom"
                : 8 === e
                ? "left-bottom"
                : "Undefined";
            },
          },
          277: "SamplesPerPixel",
          278: "RowsPerStrip",
          279: "StripByteCounts",
          280: "MinSampleValue",
          281: "MaxSampleValue",
          282: {
            name: "XResolution",
            description: function (e) {
              return "" + Math.round(e[0] / e[1]);
            },
          },
          283: {
            name: "YResolution",
            description: function (e) {
              return "" + Math.round(e[0] / e[1]);
            },
          },
          284: "PlanarConfiguration",
          285: "PageName",
          286: {
            name: "XPosition",
            description: function (e) {
              return "" + Math.round(e[0] / e[1]);
            },
          },
          287: {
            name: "YPosition",
            description: function (e) {
              return "" + Math.round(e[0] / e[1]);
            },
          },
          290: {
            name: "GrayResponseUnit",
            description: function (e) {
              return (
                { 1: "0.1", 2: "0.001", 3: "0.0001", 4: "1e-05", 5: "1e-06" }[
                  e
                ] || "Unknown"
              );
            },
          },
          296: {
            name: "ResolutionUnit",
            description: function (e) {
              return 2 === e ? "inches" : 3 === e ? "centimeters" : "Unknown";
            },
          },
          297: "PageNumber",
          301: "TransferFunction",
          305: "Software",
          306: "DateTime",
          315: "Artist",
          316: "HostComputer",
          317: "Predictor",
          318: {
            name: "WhitePoint",
            description: function (e) {
              return e
                .map(function (e) {
                  return "".concat(e[0], "/").concat(e[1]);
                })
                .join(", ");
            },
          },
          319: {
            name: "PrimaryChromaticities",
            description: function (e) {
              return e
                .map(function (e) {
                  return "".concat(e[0], "/").concat(e[1]);
                })
                .join(", ");
            },
          },
          321: "HalftoneHints",
          322: "TileWidth",
          323: "TileLength",
          330: "A100DataOffset",
          332: {
            name: "InkSet",
            description: function (e) {
              return { 1: "CMYK", 2: "Not CMYK" }[e] || "Unknown";
            },
          },
          337: "TargetPrinter",
          338: {
            name: "ExtraSamples",
            description: function (e) {
              return (
                {
                  0: "Unspecified",
                  1: "Associated Alpha",
                  2: "Unassociated Alpha",
                }[e] || "Unknown"
              );
            },
          },
          339: {
            name: "SampleFormat",
            description: function (e) {
              var t = {
                1: "Unsigned",
                2: "Signed",
                3: "Float",
                4: "Undefined",
                5: "Complex int",
                6: "Complex float",
              };
              return Array.isArray(e)
                ? e
                    .map(function (e) {
                      return t[e] || "Unknown";
                    })
                    .join(", ")
                : "Unknown";
            },
          },
          513: "JPEGInterchangeFormat",
          514: "JPEGInterchangeFormatLength",
          529: {
            name: "YCbCrCoefficients",
            description: function (e) {
              return e
                .map(function (e) {
                  return "" + e[0] / e[1];
                })
                .join("/");
            },
          },
          530: "YCbCrSubSampling",
          531: {
            name: "YCbCrPositioning",
            description: function (e) {
              return 1 === e
                ? "centered"
                : 2 === e
                ? "co-sited"
                : "undefined " + e;
            },
          },
          532: {
            name: "ReferenceBlackWhite",
            description: function (e) {
              return e
                .map(function (e) {
                  return "" + e[0] / e[1];
                })
                .join(", ");
            },
          },
          700: "ApplicationNotes",
          18246: "Rating",
          18249: "RatingPercent",
          33432: {
            name: "Copyright",
            description: function (e) {
              return e.join("; ");
            },
          },
          33550: "PixelScale",
          33723: "IPTC-NAA",
          33920: "IntergraphMatrix",
          33922: "ModelTiePoint",
          34118: "SEMInfo",
          34264: "ModelTransform",
          34377: "PhotoshopSettings",
          34665: "Exif IFD Pointer",
          34675: "ICC_Profile",
          34735: "GeoTiffDirectory",
          34736: "GeoTiffDoubleParams",
          34737: "GeoTiffAsciiParams",
          34853: "GPS Info IFD Pointer",
          40091: "XPTitle",
          40092: "XPComment",
          40093: "XPAuthor",
          40094: "XPKeywords",
          40095: "XPSubject",
          42112: "GDALMetadata",
          42113: "GDALNoData",
          50341: "PrintIM",
          50707: "DNGBackwardVersion",
          50708: "UniqueCameraModel",
          50709: "LocalizedCameraModel",
          50721: "ColorMatrix1",
          50722: "ColorMatrix2",
          50723: "CameraCalibration1",
          50724: "CameraCalibration2",
          50725: "ReductionMatrix1",
          50726: "ReductionMatrix2",
          50727: "AnalogBalance",
          50728: "AsShotNeutral",
          50729: "AsShotWhiteXY",
          50730: "BaselineExposure",
          50731: "BaselineNoise",
          50732: "BaselineSharpness",
          50734: "LinearResponseLimit",
          50735: "CameraSerialNumber",
          50736: "DNGLensInfo",
          50739: "ShadowScale",
          50741: {
            name: "MakerNoteSafety",
            description: function (e) {
              return { 0: "Unsafe", 1: "Safe" }[e] || "Unknown";
            },
          },
          50778: { name: "CalibrationIlluminant1", description: W.LightSource },
          50779: { name: "CalibrationIlluminant2", description: W.LightSource },
          50781: "RawDataUniqueID",
          50827: "OriginalRawFileName",
          50828: "OriginalRawFileData",
          50831: "AsShotICCProfile",
          50832: "AsShotPreProfileMatrix",
          50833: "CurrentICCProfile",
          50834: "CurrentPreProfileMatrix",
          50879: "ColorimetricReference",
          50885: "SRawType",
          50898: "PanasonicTitle",
          50899: "PanasonicTitle2",
          50931: "CameraCalibrationSig",
          50932: "ProfileCalibrationSig",
          50933: "ProfileIFD",
          50934: "AsShotProfileName",
          50936: "ProfileName",
          50937: "ProfileHueSatMapDims",
          50938: "ProfileHueSatMapData1",
          50939: "ProfileHueSatMapData2",
          50940: "ProfileToneCurve",
          50941: {
            name: "ProfileEmbedPolicy",
            description: function (e) {
              return (
                {
                  0: "Allow Copying",
                  1: "Embed if Used",
                  2: "Never Embed",
                  3: "No Restrictions",
                }[e] || "Unknown"
              );
            },
          },
          50942: "ProfileCopyright",
          50964: "ForwardMatrix1",
          50965: "ForwardMatrix2",
          50966: "PreviewApplicationName",
          50967: "PreviewApplicationVersion",
          50968: "PreviewSettingsName",
          50969: "PreviewSettingsDigest",
          50970: {
            name: "PreviewColorSpace",
            description: function (e) {
              return (
                {
                  1: "Gray Gamma 2.2",
                  2: "sRGB",
                  3: "Adobe RGB",
                  4: "ProPhoto RGB",
                }[e] || "Unknown"
              );
            },
          },
          50971: "PreviewDateTime",
          50972: "RawImageDigest",
          50973: "OriginalRawFileDigest",
          50981: "ProfileLookTableDims",
          50982: "ProfileLookTableData",
          51043: "TimeCodes",
          51044: "FrameRate",
          51058: "TStop",
          51081: "ReelName",
          51089: "OriginalDefaultFinalSize",
          51090: "OriginalBestQualitySize",
          51091: "OriginalDefaultCropSize",
          51105: "CameraLabel",
          51107: {
            name: "ProfileHueSatMapEncoding",
            description: function (e) {
              return { 0: "Linear", 1: "sRGB" }[e] || "Unknown";
            },
          },
          51108: {
            name: "ProfileLookTableEncoding",
            description: function (e) {
              return { 0: "Linear", 1: "sRGB" }[e] || "Unknown";
            },
          },
          51109: "BaselineExposureOffset",
          51110: {
            name: "DefaultBlackRender",
            description: function (e) {
              return { 0: "Auto", 1: "None" }[e] || "Unknown";
            },
          },
          51111: "NewRawImageDigest",
          51112: "RawToPreviewGain",
        },
        {
          33434: {
            name: "ExposureTime",
            description: function (e) {
              return 0 !== e[0]
                ? "1/".concat(Math.round(e[1] / e[0]))
                : "0/".concat(e[1]);
            },
          },
          33437: {
            name: "FNumber",
            description: function (e) {
              return "f/".concat(e[0] / e[1]);
            },
          },
          34850: {
            name: "ExposureProgram",
            description: function (e) {
              return 0 === e
                ? "Undefined"
                : 1 === e
                ? "Manual"
                : 2 === e
                ? "Normal program"
                : 3 === e
                ? "Aperture priority"
                : 4 === e
                ? "Shutter priority"
                : 5 === e
                ? "Creative program"
                : 6 === e
                ? "Action program"
                : 7 === e
                ? "Portrait mode"
                : 8 === e
                ? "Landscape mode"
                : 9 === e
                ? "Bulb"
                : "Unknown";
            },
          },
          34852: "SpectralSensitivity",
          34855: "ISOSpeedRatings",
          34856: {
            name: "OECF",
            description: function () {
              return "[Raw OECF table data]";
            },
          },
          34858: "TimeZoneOffset",
          34859: "SelfTimerMode",
          34864: {
            name: "SensitivityType",
            description: function (e) {
              return (
                {
                  1: "Standard Output Sensitivity",
                  2: "Recommended Exposure Index",
                  3: "ISO Speed",
                  4: "Standard Output Sensitivity and Recommended Exposure Index",
                  5: "Standard Output Sensitivity and ISO Speed",
                  6: "Recommended Exposure Index and ISO Speed",
                  7: "Standard Output Sensitivity, Recommended Exposure Index and ISO Speed",
                }[e] || "Unknown"
              );
            },
          },
          34865: "StandardOutputSensitivity",
          34866: "RecommendedExposureIndex",
          34867: "ISOSpeed",
          34868: "ISOSpeedLatitudeyyy",
          34869: "ISOSpeedLatitudezzz",
          36864: {
            name: "ExifVersion",
            description: function (e) {
              return l(e);
            },
          },
          36867: "DateTimeOriginal",
          36868: "DateTimeDigitized",
          36873: "GooglePlusUploadCode",
          36880: "OffsetTime",
          36881: "OffsetTimeOriginal",
          36882: "OffsetTimeDigitized",
          37121: {
            name: "ComponentsConfiguration",
            description: function (e) {
              return e
                .map(function (e) {
                  return 49 === e
                    ? "Y"
                    : 50 === e
                    ? "Cb"
                    : 51 === e
                    ? "Cr"
                    : 52 === e
                    ? "R"
                    : 53 === e
                    ? "G"
                    : 54 === e
                    ? "B"
                    : void 0;
                })
                .join("");
            },
          },
          37122: "CompressedBitsPerPixel",
          37377: {
            name: "ShutterSpeedValue",
            description: function (e) {
              return "1/".concat(Math.round(Math.pow(2, e[0] / e[1])));
            },
          },
          37378: {
            name: "ApertureValue",
            description: function (e) {
              return Math.pow(Math.sqrt(2), e[0] / e[1]).toFixed(2);
            },
          },
          37379: "BrightnessValue",
          37380: "ExposureBiasValue",
          37381: {
            name: "MaxApertureValue",
            description: function (e) {
              return Math.pow(Math.sqrt(2), e[0] / e[1]).toFixed(2);
            },
          },
          37382: {
            name: "SubjectDistance",
            description: function (e) {
              return e[0] / e[1] + " m";
            },
          },
          37383: {
            name: "MeteringMode",
            description: function (e) {
              return 1 === e
                ? "Average"
                : 2 === e
                ? "CenterWeightedAverage"
                : 3 === e
                ? "Spot"
                : 4 === e
                ? "MultiSpot"
                : 5 === e
                ? "Pattern"
                : 6 === e
                ? "Partial"
                : 255 === e
                ? "Other"
                : "Unknown";
            },
          },
          37384: { name: "LightSource", description: W.LightSource },
          37385: {
            name: "Flash",
            description: function (e) {
              return 0 === e
                ? "Flash did not fire"
                : 1 === e
                ? "Flash fired"
                : 5 === e
                ? "Strobe return light not detected"
                : 7 === e
                ? "Strobe return light detected"
                : 9 === e
                ? "Flash fired, compulsory flash mode"
                : 13 === e
                ? "Flash fired, compulsory flash mode, return light not detected"
                : 15 === e
                ? "Flash fired, compulsory flash mode, return light detected"
                : 16 === e
                ? "Flash did not fire, compulsory flash mode"
                : 24 === e
                ? "Flash did not fire, auto mode"
                : 25 === e
                ? "Flash fired, auto mode"
                : 29 === e
                ? "Flash fired, auto mode, return light not detected"
                : 31 === e
                ? "Flash fired, auto mode, return light detected"
                : 32 === e
                ? "No flash function"
                : 65 === e
                ? "Flash fired, red-eye reduction mode"
                : 69 === e
                ? "Flash fired, red-eye reduction mode, return light not detected"
                : 71 === e
                ? "Flash fired, red-eye reduction mode, return light detected"
                : 73 === e
                ? "Flash fired, compulsory flash mode, red-eye reduction mode"
                : 77 === e
                ? "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected"
                : 79 === e
                ? "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected"
                : 89 === e
                ? "Flash fired, auto mode, red-eye reduction mode"
                : 93 === e
                ? "Flash fired, auto mode, return light not detected, red-eye reduction mode"
                : 95 === e
                ? "Flash fired, auto mode, return light detected, red-eye reduction mode"
                : "Unknown";
            },
          },
          37386: {
            name: "FocalLength",
            description: function (e) {
              return e[0] / e[1] + " mm";
            },
          },
          37393: "ImageNumber",
          37394: {
            name: "SecurityClassification",
            description: function (e) {
              return (
                {
                  C: "Confidential",
                  R: "Restricted",
                  S: "Secret",
                  T: "Top Secret",
                  U: "Unclassified",
                }[e] || "Unknown"
              );
            },
          },
          37395: "ImageHistory",
          37396: {
            name: "SubjectArea",
            description: function (e) {
              return 2 === e.length
                ? "Location; X: ".concat(e[0], ", Y: ").concat(e[1])
                : 3 === e.length
                ? "Circle; X: "
                    .concat(e[0], ", Y: ")
                    .concat(e[1], ", diameter: ")
                    .concat(e[2])
                : 4 === e.length
                ? "Rectangle; X: "
                    .concat(e[0], ", Y: ")
                    .concat(e[1], ", width: ")
                    .concat(e[2], ", height: ")
                    .concat(e[3])
                : "Unknown";
            },
          },
          37500: {
            name: "MakerNote",
            description: function () {
              return "[Raw maker note data]";
            },
          },
          37510: { name: "UserComment", description: d },
          37520: "SubSecTime",
          37521: "SubSecTimeOriginal",
          37522: "SubSecTimeDigitized",
          37888: {
            name: "AmbientTemperature",
            description: function (e) {
              return e[0] / e[1] + " °C";
            },
          },
          37889: {
            name: "Humidity",
            description: function (e) {
              return e[0] / e[1] + " %";
            },
          },
          37890: {
            name: "Pressure",
            description: function (e) {
              return e[0] / e[1] + " hPa";
            },
          },
          37891: {
            name: "WaterDepth",
            description: function (e) {
              return e[0] / e[1] + " m";
            },
          },
          37892: {
            name: "Acceleration",
            description: function (e) {
              return e[0] / e[1] + " mGal";
            },
          },
          37893: {
            name: "CameraElevationAngle",
            description: function (e) {
              return e[0] / e[1] + " °";
            },
          },
          40960: {
            name: "FlashpixVersion",
            description: function (e) {
              return e
                .map(function (e) {
                  return String.fromCharCode(e);
                })
                .join("");
            },
          },
          40961: {
            name: "ColorSpace",
            description: function (e) {
              return 1 === e
                ? "sRGB"
                : 65535 === e
                ? "Uncalibrated"
                : "Unknown";
            },
          },
          40962: "PixelXDimension",
          40963: "PixelYDimension",
          40964: "RelatedSoundFile",
          40965: "Interoperability IFD Pointer",
          41483: "FlashEnergy",
          41484: {
            name: "SpatialFrequencyResponse",
            description: function () {
              return "[Raw SFR table data]";
            },
          },
          41486: "FocalPlaneXResolution",
          41487: "FocalPlaneYResolution",
          41488: {
            name: "FocalPlaneResolutionUnit",
            description: function (e) {
              return 2 === e ? "inches" : 3 === e ? "centimeters" : "Unknown";
            },
          },
          41492: {
            name: "SubjectLocation",
            description: function (e) {
              var t,
                n =
                  (2,
                  (function (e) {
                    if (Array.isArray(e)) return e;
                  })((t = e)) ||
                    (function (e, t) {
                      var n =
                        null == e
                          ? null
                          : ("undefined" != typeof Symbol &&
                              e[Symbol.iterator]) ||
                            e["@@iterator"];
                      if (null != n) {
                        var r,
                          i,
                          o = [],
                          a = 1,
                          u = 0;
                        try {
                          for (
                            n = n.call(e);
                            !(a = (r = n.next()).done) &&
                            (o.push(r.value), 2 !== o.length);
                            a = 1
                          );
                        } catch (e) {
                          (u = 1), (i = e);
                        } finally {
                          try {
                            a || null == n.return || n.return();
                          } finally {
                            if (u) throw i;
                          }
                        }
                        return o;
                      }
                    })(t) ||
                    (function (e, t) {
                      if (e) {
                        if ("string" == typeof e) return H(e, 2);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return (
                          "Object" === n &&
                            e.constructor &&
                            (n = e.constructor.name),
                          "Map" === n || "Set" === n
                            ? Array.from(e)
                            : "Arguments" === n ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                            ? H(e, 2)
                            : void 0
                        );
                      }
                    })(t) ||
                    (function () {
                      throw new TypeError(
                        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                      );
                    })()),
                r = n[0],
                i = n[1];
              return "X: ".concat(r, ", Y: ").concat(i);
            },
          },
          41493: "ExposureIndex",
          41495: {
            name: "SensingMethod",
            description: function (e) {
              return 1 === e
                ? "Undefined"
                : 2 === e
                ? "One-chip color area sensor"
                : 3 === e
                ? "Two-chip color area sensor"
                : 4 === e
                ? "Three-chip color area sensor"
                : 5 === e
                ? "Color sequential area sensor"
                : 7 === e
                ? "Trilinear sensor"
                : 8 === e
                ? "Color sequential linear sensor"
                : "Unknown";
            },
          },
          41728: {
            name: "FileSource",
            description: function (e) {
              return 3 === e ? "DSC" : "Unknown";
            },
          },
          41729: {
            name: "SceneType",
            description: function (e) {
              return 1 === e ? "A directly photographed image" : "Unknown";
            },
          },
          41730: {
            name: "CFAPattern",
            description: function () {
              return "[Raw CFA pattern table data]";
            },
          },
          41985: {
            name: "CustomRendered",
            description: function (e) {
              return 0 === e
                ? "Normal process"
                : 1 === e
                ? "Custom process"
                : "Unknown";
            },
          },
          41986: {
            name: "ExposureMode",
            description: function (e) {
              return 0 === e
                ? "Auto exposure"
                : 1 === e
                ? "Manual exposure"
                : 2 === e
                ? "Auto bracket"
                : "Unknown";
            },
          },
          41987: {
            name: "WhiteBalance",
            description: function (e) {
              return 0 === e
                ? "Auto white balance"
                : 1 === e
                ? "Manual white balance"
                : "Unknown";
            },
          },
          41988: {
            name: "DigitalZoomRatio",
            description: function (e) {
              return 0 === e[0]
                ? "Digital zoom was not used"
                : "" + e[0] / e[1];
            },
          },
          41989: {
            name: "FocalLengthIn35mmFilm",
            description: function (e) {
              return 0 === e ? "Unknown" : e;
            },
          },
          41990: {
            name: "SceneCaptureType",
            description: function (e) {
              return 0 === e
                ? "Standard"
                : 1 === e
                ? "Landscape"
                : 2 === e
                ? "Portrait"
                : 3 === e
                ? "Night scene"
                : "Unknown";
            },
          },
          41991: {
            name: "GainControl",
            description: function (e) {
              return 0 === e
                ? "None"
                : 1 === e
                ? "Low gain up"
                : 2 === e
                ? "High gain up"
                : 3 === e
                ? "Low gain down"
                : 4 === e
                ? "High gain down"
                : "Unknown";
            },
          },
          41992: {
            name: "Contrast",
            description: function (e) {
              return 0 === e
                ? "Normal"
                : 1 === e
                ? "Soft"
                : 2 === e
                ? "Hard"
                : "Unknown";
            },
          },
          41993: {
            name: "Saturation",
            description: function (e) {
              return 0 === e
                ? "Normal"
                : 1 === e
                ? "Low saturation"
                : 2 === e
                ? "High saturation"
                : "Unknown";
            },
          },
          41994: {
            name: "Sharpness",
            description: function (e) {
              return 0 === e
                ? "Normal"
                : 1 === e
                ? "Soft"
                : 2 === e
                ? "Hard"
                : "Unknown";
            },
          },
          41995: {
            name: "DeviceSettingDescription",
            description: function () {
              return "[Raw device settings table data]";
            },
          },
          41996: {
            name: "SubjectDistanceRange",
            description: function (e) {
              return 1 === e
                ? "Macro"
                : 2 === e
                ? "Close view"
                : 3 === e
                ? "Distant view"
                : "Unknown";
            },
          },
          42016: "ImageUniqueID",
          42032: "CameraOwnerName",
          42033: "BodySerialNumber",
          42034: {
            name: "LensSpecification",
            description: function (e) {
              var t = ""
                .concat(e[0][0] / e[0][1], "-")
                .concat(e[1][0] / e[1][1], " mm");
              return 0 === e[3][1]
                ? "".concat(t, " f/?")
                : ""
                    .concat(t, " f/")
                    .concat(1 / (e[2][1] / e[2][1] / (e[3][0] / e[3][1])));
            },
          },
          42035: "LensMake",
          42036: "LensModel",
          42037: "LensSerialNumber",
          42080: {
            name: "CompositeImage",
            description: function (e) {
              return (
                {
                  1: "Not a Composite Image",
                  2: "General Composite Image",
                  3: "Composite Image Captured While Shooting",
                }[e] || "Unknown"
              );
            },
          },
          42081: "SourceImageNumberOfCompositeImage",
          42082: "SourceExposureTimesOfCompositeImage",
          42240: "Gamma",
          59932: "Padding",
          59933: "OffsetSchema",
          65e3: "OwnerName",
          65001: "SerialNumber",
          65002: "Lens",
          65100: "RawFile",
          65101: "Converter",
          65102: "WhiteBalance",
          65105: "Exposure",
          65106: "Shadows",
          65107: "Brightness",
          65108: "Contrast",
          65109: "Saturation",
          65110: "Sharpness",
          65111: "Smoothness",
          65112: "MoireFilter",
        }
      ),
      K = { "0th": J, exif: J, gps: X, interoperability: q, mpf: Y },
      _ = {
        1: G.getByteAt,
        2: G.getAsciiAt,
        3: G.getShortAt,
        4: G.getLongAt,
        5: G.getRationalAt,
        7: G.getUndefinedAt,
        9: G.getSlongAt,
        10: G.getSrationalAt,
        13: G.getIfdPointerAt,
      },
      $ = function (e, t, n) {
        var r = v(e, t),
          i = (function (e, t, n, r) {
            return oe(e, "0th", t, Z(e, t, n), n, r);
          })(e, t, r, n);
        return (function (e, t, n, r, i) {
          return void 0 !== e["Interoperability IFD Pointer"]
            ? a(
                e,
                oe(
                  t,
                  "interoperability",
                  n,
                  n + e["Interoperability IFD Pointer"].value,
                  r,
                  i
                )
              )
            : e;
        })(
          (i = (function (e, t, n, r, i) {
            return void 0 !== e["GPS Info IFD Pointer"]
              ? a(e, oe(t, "gps", n, n + e["GPS Info IFD Pointer"].value, r, i))
              : e;
          })(
            (i = (function (e, t, n, r, i) {
              return void 0 !== e["Exif IFD Pointer"]
                ? a(e, oe(t, "exif", n, n + e["Exif IFD Pointer"].value, r, i))
                : e;
            })(i, e, t, r, n)),
            e,
            t,
            r,
            n
          )),
          e,
          t,
          r,
          n
        );
      },
      Q = function (e, t, n) {
        var r = v(e, t);
        return (function (e, t, n, r) {
          var i = 16;
          if (!n.MPEntry) return n;
          for (
            var o = [], a = 0;
            a < Math.ceil(n.MPEntry.value.length / i);
            a++
          ) {
            o[a] = {};
            var f = ee(n.MPEntry.value, a * i, G.getTypeSize("LONG"), r);
            (o[a].ImageFlags = te(f)),
              (o[a].ImageFormat = ne(f)),
              (o[a].ImageType = re(f));
            var s = ee(n.MPEntry.value, a * i + 4, G.getTypeSize("LONG"), r);
            o[a].ImageSize = { value: s, description: "" + s };
            var l = ie(a)
              ? 0
              : ee(n.MPEntry.value, a * i + 8, G.getTypeSize("LONG"), r) + t;
            o[a].ImageOffset = { value: l, description: "" + l };
            var d = ee(n.MPEntry.value, a * i + 12, G.getTypeSize("SHORT"), r);
            o[a].DependentImage1EntryNumber = { value: d, description: "" + d };
            var p = ee(n.MPEntry.value, a * i + 14, G.getTypeSize("SHORT"), r);
            (o[a].DependentImage2EntryNumber = {
              value: p,
              description: "" + p,
            }),
              (o[a].image = e.buffer.slice(l, l + s)),
              u(o[a], "base64", function () {
                return c(this.image);
              });
          }
          return (n.Images = o), n;
        })(e, t, oe(e, "mpf", t, Z(e, t, r), r, n), r);
      };
    function Z(e, t, n) {
      return t + G.getLongAt(e, t + 4, n);
    }
    function ee(e, t, n, r) {
      if (r === g) {
        for (var i = 0, o = 0; o < n; o++) i += e[t + o] << (8 * o);
        return i;
      }
      for (var a = 0, u = 0; u < n; u++) a += e[t + u] << (8 * (n - 1 - u));
      return a;
    }
    function te(e) {
      var t = [(e >> 31) & 1, (e >> 30) & 1, (e >> 29) & 1],
        n = [];
      return (
        t[0] && n.push("Dependent Parent Image"),
        t[1] && n.push("Dependent Child Image"),
        t[2] && n.push("Representative Image"),
        { value: t, description: n.join(", ") || "None" }
      );
    }
    function ne(e) {
      var t = (e >> 24) & 7;
      return { value: t, description: 0 === t ? "JPEG" : "Unknown" };
    }
    function re(e) {
      var t = 16777215 & e;
      return {
        value: t,
        description:
          {
            196608: "Baseline MP Primary Image",
            65537: "Large Thumbnail (VGA equivalent)",
            65538: "Large Thumbnail (Full HD equivalent)",
            131073: "Multi-Frame Image (Panorama)",
            131074: "Multi-Frame Image (Disparity)",
            131075: "Multi-Frame Image (Multi-Angle)",
            0: "Undefined",
          }[t] || "Unknown",
      };
    }
    function ie(e) {
      return 0 === e;
    }
    function oe(e, t, n, r, i, o) {
      var a = G.getTypeSize("SHORT"),
        u = {},
        c = (function (e, t, n) {
          return t + G.getTypeSize("SHORT") <= e.byteLength
            ? G.getShortAt(e, t, n)
            : 0;
        })(e, r, i);
      r += a;
      for (var f = 0; f < c && !(r + 12 > e.byteLength); f++) {
        var s = ae(e, t, n, r, i, o);
        void 0 !== s &&
          (u[s.name] = {
            id: s.id,
            value: s.value,
            description: s.description,
          }),
          (r += 12);
      }
      if (r < e.byteLength - G.getTypeSize("LONG")) {
        var l = G.getLongAt(e, r, i);
        0 !== l && (u.Thumbnail = oe(e, t, n, n + l, i, 1));
      }
      return u;
    }
    function ae(e, t, n, r, i, o) {
      var a,
        u = G.getTypeSize("SHORT"),
        c = u + G.getTypeSize("SHORT"),
        f = c + G.getTypeSize("LONG"),
        s = G.getShortAt(e, r, i),
        l = G.getShortAt(e, r + u, i),
        d = G.getLongAt(e, r + c, i);
      if (void 0 !== G.typeSizes[l] && (o || void 0 !== K[t][s])) {
        if (
          (function (e, t) {
            return G.typeSizes[e] * t <= G.getTypeSize("LONG");
          })(l, d)
        )
          a = ue(e, r + f, l, d, i);
        else {
          var p = G.getLongAt(e, r + f, i);
          a = (function (e, t, n, r, i) {
            return t + n + G.typeSizes[r] * i <= e.byteLength;
          })(e, n, p, l, d)
            ? ue(e, n + p, l, d, i, 33723 === s)
            : "<faulty value>";
        }
        l === G.tagTypes.ASCII &&
          (a = (function (e) {
            try {
              return e.map(function (e) {
                return decodeURIComponent(escape(e));
              });
            } catch (t) {
              return e;
            }
          })(
            (a = (function (e) {
              for (var t = [], n = 0, r = 0; r < e.length; r++)
                "\0" !== e[r]
                  ? (void 0 === t[n] && (t[n] = ""), (t[n] += e[r]))
                  : n++;
              return t;
            })(a))
          ));
        var m = "undefined-".concat(s),
          g = a;
        if (void 0 !== K[t][s])
          if (void 0 !== K[t][s].name && void 0 !== K[t][s].description) {
            m = K[t][s].name;
            try {
              g = K[t][s].description(a);
            } catch (e) {
              g = ce(a);
            }
          } else
            l === G.tagTypes.RATIONAL || l === G.tagTypes.SRATIONAL
              ? ((m = K[t][s]), (g = "" + a[0] / a[1]))
              : ((m = K[t][s]), (g = ce(a)));
        return { id: s, name: m, value: a, description: g };
      }
    }
    function ue(e, t, n, r, i) {
      var o =
          arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
        a = [];
      o && ((r *= G.typeSizes[n]), (n = G.tagTypes.BYTE));
      for (var u = 0; u < r; u++) a.push(_[n](e, t, i)), (t += G.typeSizes[n]);
      return (
        n === G.tagTypes.ASCII
          ? (a = G.getAsciiValue(a))
          : 1 === a.length && (a = a[0]),
        a
      );
    }
    function ce(e) {
      return e instanceof Array ? e.join(", ") : e;
    }
    var fe = function (e, t) {
      var n = (function (e, t) {
          return G.getShortAt(e, t);
        })(e, t),
        r = (function (e, t, n) {
          if (!(8 > n)) {
            var r = G.getByteAt(e, t + 7);
            return { value: r, description: "" + r };
          }
        })(e, t, n);
      return {
        "Bits Per Sample": se(e, t, n),
        "Image Height": le(e, t, n),
        "Image Width": de(e, t, n),
        "Color Components": r,
        Subsampling: r && pe(e, t, r.value, n),
      };
    };
    function se(e, t, n) {
      if (!(3 > n)) {
        var r = G.getByteAt(e, t + 2);
        return { value: r, description: "" + r };
      }
    }
    function le(e, t, n) {
      if (!(5 > n)) {
        var r = G.getShortAt(e, t + 3);
        return { value: r, description: "".concat(r, "px") };
      }
    }
    function de(e, t, n) {
      if (!(7 > n)) {
        var r = G.getShortAt(e, t + 5);
        return { value: r, description: "".concat(r, "px") };
      }
    }
    function pe(e, t, n, r) {
      if (!(8 + 3 * n > r)) {
        for (var i = [], o = 0; o < n; o++) {
          var a = t + 8 + 3 * o;
          i.push([
            G.getByteAt(e, a),
            G.getByteAt(e, a + 1),
            G.getByteAt(e, a + 2),
          ]);
        }
        return { value: i, description: i.length > 1 ? me(i) + ge(i) : "" };
      }
    }
    function me(e) {
      var t = { 1: "Y", 2: "Cb", 3: "Cr", 4: "I", 5: "Q" };
      return e
        .map(function (e) {
          return t[e[0]];
        })
        .join("");
    }
    function ge(e) {
      var t = {
        17: "4:4:4 (1 1)",
        18: "4:4:0 (1 2)",
        20: "4:4:1 (1 4)",
        33: "4:2:2 (2 1)",
        34: "4:2:0 (2 2)",
        36: "4:2:1 (2 4)",
        65: "4:1:1 (4 1)",
        66: "4:1:0 (4 2)",
      };
      return 0 === e.length || void 0 === e[0][1] || void 0 === t[e[0][1]]
        ? ""
        : t[e[0][1]];
    }
    var ve = function (e, t) {
      var n = (function (e, t) {
          return G.getShortAt(e, t);
        })(e, t),
        r = (function (e, t, n) {
          if (!(15 > n)) {
            var r = G.getByteAt(e, t + 14);
            return { value: r, description: "".concat(r, "px") };
          }
        })(e, t, n),
        i = (function (e, t, n) {
          if (!(16 > n)) {
            var r = G.getByteAt(e, t + 15);
            return { value: r, description: "".concat(r, "px") };
          }
        })(e, t, n),
        o = {
          "JFIF Version": he(e, t, n),
          "Resolution Unit": ye(e, t, n),
          XResolution: be(e, t, n),
          YResolution: Ce(e, t, n),
          "JFIF Thumbnail Width": r,
          "JFIF Thumbnail Height": i,
        };
      if (void 0 !== r && void 0 !== i) {
        var a = (function (e, t, n, r) {
          if (!(0 === n || 16 + n > r))
            return {
              value: e.buffer.slice(t + 16, t + 16 + n),
              description: "<24-bit RGB pixel data>",
            };
        })(e, t, 3 * r.value * i.value, n);
        a && (o["JFIF Thumbnail"] = a);
      }
      for (var u in o) void 0 === o[u] && delete o[u];
      return o;
    };
    function he(e, t, n) {
      if (!(9 > n)) {
        var r = G.getByteAt(e, t + 7),
          i = G.getByteAt(e, t + 7 + 1);
        return { value: 256 * r + i, description: r + "." + i };
      }
    }
    function ye(e, t, n) {
      if (!(10 > n)) {
        var r = G.getByteAt(e, t + 9);
        return { value: r, description: Se(r) };
      }
    }
    function Se(e) {
      return 0 === e ? "None" : 1 === e ? "inches" : 2 === e ? "cm" : "Unknown";
    }
    function be(e, t, n) {
      if (!(12 > n)) {
        var r = G.getShortAt(e, t + 10);
        return { value: r, description: "" + r };
      }
    }
    function Ce(e, t, n) {
      if (!(14 > n)) {
        var r = G.getShortAt(e, t + 12);
        return { value: r, description: "" + r };
      }
    }
    var Ie = {
      iptc: {
        256: {
          name: "Model Version",
          description: function (e) {
            return "" + ((e[0] << 8) + e[1]);
          },
        },
        261: { name: "Destination", repeatable: 1 },
        276: {
          name: "File Format",
          description: function (e) {
            return "" + ((e[0] << 8) + e[1]);
          },
        },
        278: {
          name: "File Format Version",
          description: function (e) {
            return "" + ((e[0] << 8) + e[1]);
          },
        },
        286: "Service Identifier",
        296: "Envelope Number",
        306: "Product ID",
        316: "Envelope Priority",
        326: { name: "Date Sent", description: Ae },
        336: { name: "Time Sent", description: Pe },
        346: {
          name: "Coded Character Set",
          description: Ue,
          encoding_name: Ue,
        },
        356: "UNO",
        376: {
          name: "ARM Identifier",
          description: function (e) {
            return "" + ((e[0] << 8) + e[1]);
          },
        },
        378: {
          name: "ARM Version",
          description: function (e) {
            return "" + ((e[0] << 8) + e[1]);
          },
        },
        512: {
          name: "Record Version",
          description: function (e) {
            return "" + ((e[0] << 8) + e[1]);
          },
        },
        515: "Object Type Reference",
        516: "Object Attribute Reference",
        517: "Object Name",
        519: "Edit Status",
        520: {
          name: "Editorial Update",
          description: function (e) {
            return "01" === l(e) ? "Additional Language" : "Unknown";
          },
        },
        522: "Urgency",
        524: {
          name: "Subject Reference",
          repeatable: 1,
          description: function (e) {
            var t = l(e).split(":");
            return t[2] + (t[3] ? "/" + t[3] : "") + (t[4] ? "/" + t[4] : "");
          },
        },
        527: "Category",
        532: { name: "Supplemental Category", repeatable: 1 },
        534: "Fixture Identifier",
        537: { name: "Keywords", repeatable: 1 },
        538: { name: "Content Location Code", repeatable: 1 },
        539: { name: "Content Location Name", repeatable: 1 },
        542: "Release Date",
        547: "Release Time",
        549: "Expiration Date",
        550: "Expiration Time",
        552: "Special Instructions",
        554: {
          name: "Action Advised",
          description: function (e) {
            var t = l(e);
            return "01" === t
              ? "Object Kill"
              : "02" === t
              ? "Object Replace"
              : "03" === t
              ? "Object Append"
              : "04" === t
              ? "Object Reference"
              : "Unknown";
          },
        },
        557: { name: "Reference Service", repeatable: 1 },
        559: { name: "Reference Date", repeatable: 1 },
        562: { name: "Reference Number", repeatable: 1 },
        567: { name: "Date Created", description: Ae },
        572: { name: "Time Created", description: Pe },
        574: { name: "Digital Creation Date", description: Ae },
        575: { name: "Digital Creation Time", description: Pe },
        577: "Originating Program",
        582: "Program Version",
        587: {
          name: "Object Cycle",
          description: function (e) {
            var t = l(e);
            return "a" === t
              ? "morning"
              : "p" === t
              ? "evening"
              : "b" === t
              ? "both"
              : "Unknown";
          },
        },
        592: { name: "By-line", repeatable: 1 },
        597: { name: "By-line Title", repeatable: 1 },
        602: "City",
        604: "Sub-location",
        607: "Province/State",
        612: "Country/Primary Location Code",
        613: "Country/Primary Location Name",
        615: "Original Transmission Reference",
        617: "Headline",
        622: "Credit",
        627: "Source",
        628: "Copyright Notice",
        630: { name: "Contact", repeatable: 1 },
        632: "Caption/Abstract",
        634: { name: "Writer/Editor", repeatable: 1 },
        637: {
          name: "Rasterized Caption",
          description: function (e) {
            return e;
          },
        },
        642: "Image Type",
        643: {
          name: "Image Orientation",
          description: function (e) {
            var t = l(e);
            return "P" === t
              ? "Portrait"
              : "L" === t
              ? "Landscape"
              : "S" === t
              ? "Square"
              : "Unknown";
          },
        },
        647: "Language Identifier",
        662: {
          name: "Audio Type",
          description: function (e) {
            var t = l(e),
              n = t.charAt(0),
              r = t.charAt(1),
              i = "";
            return (
              "1" === n ? (i += "Mono") : "2" === n && (i += "Stereo"),
              "A" === r
                ? (i += ", actuality")
                : "C" === r
                ? (i += ", question and answer session")
                : "M" === r
                ? (i += ", music, transmitted by itself")
                : "Q" === r
                ? (i += ", response to a question")
                : "R" === r
                ? (i += ", raw sound")
                : "S" === r
                ? (i += ", scener")
                : "V" === r
                ? (i += ", voicer")
                : "W" === r && (i += ", wrap"),
              "" !== i ? i : t
            );
          },
        },
        663: {
          name: "Audio Sampling Rate",
          description: function (e) {
            return parseInt(l(e), 10) + " Hz";
          },
        },
        664: {
          name: "Audio Sampling Resolution",
          description: function (e) {
            var t = parseInt(l(e), 10);
            return t + (1 === t ? " bit" : " bits");
          },
        },
        665: {
          name: "Audio Duration",
          description: function (e) {
            var t = l(e);
            return t.length >= 6
              ? t.substr(0, 2) + ":" + t.substr(2, 2) + ":" + t.substr(4, 2)
              : t;
          },
        },
        666: "Audio Outcue",
        698: "Short Document ID",
        699: "Unique Document ID",
        700: "Owner ID",
        712: {
          name: function (e) {
            return 2 === e.length
              ? "ObjectData Preview File Format"
              : "Record 2 destination";
          },
          description: function (e) {
            if (2 === e.length) {
              var t = (e[0] << 8) + e[1];
              return 0 === t
                ? "No ObjectData"
                : 1 === t
                ? "IPTC-NAA Digital Newsphoto Parameter Record"
                : 2 === t
                ? "IPTC7901 Recommended Message Format"
                : 3 === t
                ? "Tagged Image File Format (Adobe/Aldus Image data)"
                : 4 === t
                ? "Illustrator (Adobe Graphics data)"
                : 5 === t
                ? "AppleSingle (Apple Computer Inc)"
                : 6 === t
                ? "NAA 89-3 (ANPA 1312)"
                : 7 === t
                ? "MacBinary II"
                : 8 === t
                ? "IPTC Unstructured Character Oriented File Format (UCOFF)"
                : 9 === t
                ? "United Press International ANPA 1312 variant"
                : 10 === t
                ? "United Press International Down-Load Message"
                : 11 === t
                ? "JPEG File Interchange (JFIF)"
                : 12 === t
                ? "Photo-CD Image-Pac (Eastman Kodak)"
                : 13 === t
                ? "Microsoft Bit Mapped Graphics File [*.BMP]"
                : 14 === t
                ? "Digital Audio File [*.WAV] (Microsoft & Creative Labs)"
                : 15 === t
                ? "Audio plus Moving Video [*.AVI] (Microsoft)"
                : 16 === t
                ? "PC DOS/Windows Executable Files [*.COM][*.EXE]"
                : 17 === t
                ? "Compressed Binary File [*.ZIP] (PKWare Inc)"
                : 18 === t
                ? "Audio Interchange File Format AIFF (Apple Computer Inc)"
                : 19 === t
                ? "RIFF Wave (Microsoft Corporation)"
                : 20 === t
                ? "Freehand (Macromedia/Aldus)"
                : 21 === t
                ? 'Hypertext Markup Language "HTML" (The Internet Society)'
                : 22 === t
                ? "MPEG 2 Audio Layer 2 (Musicom), ISO/IEC"
                : 23 === t
                ? "MPEG 2 Audio Layer 3, ISO/IEC"
                : 24 === t
                ? "Portable Document File (*.PDF) Adobe"
                : 25 === t
                ? "News Industry Text Format (NITF)"
                : 26 === t
                ? "Tape Archive (*.TAR)"
                : 27 === t
                ? "Tidningarnas Telegrambyrå NITF version (TTNITF DTD)"
                : 28 === t
                ? "Ritzaus Bureau NITF version (RBNITF DTD)"
                : 29 === t
                ? "Corel Draw [*.CDR]"
                : "Unknown format ".concat(t);
            }
            return l(e);
          },
        },
        713: {
          name: "ObjectData Preview File Format Version",
          description: function (e, t) {
            var n = {
                "00": { "00": "1" },
                "01": { "01": "1", "02": "2", "03": "3", "04": "4" },
                "02": { "04": "4" },
                "03": { "01": "5.0", "02": "6.0" },
                "04": { "01": "1.40" },
                "05": { "01": "2" },
                "06": { "01": "1" },
                11: { "01": "1.02" },
                20: { "01": "3.1", "02": "4.0", "03": "5.0", "04": "5.5" },
                21: { "02": "2.0" },
              },
              r = l(e);
            if (t["ObjectData Preview File Format"]) {
              var i = l(t["ObjectData Preview File Format"].value);
              if (n[i] && n[i][r]) return n[i][r];
            }
            return r;
          },
        },
        714: "ObjectData Preview Data",
        1802: {
          name: "Size Mode",
          description: function (e) {
            return e[0].toString();
          },
        },
        1812: {
          name: "Max Subfile Size",
          description: function (e) {
            for (var t = 0, n = 0; n < e.length; n++) t = (t << 8) + e[n];
            return t.toString();
          },
        },
        1882: {
          name: "ObjectData Size Announced",
          description: function (e) {
            for (var t = 0, n = 0; n < e.length; n++) t = (t << 8) + e[n];
            return t.toString();
          },
        },
        1887: {
          name: "Maximum ObjectData Size",
          description: function (e) {
            for (var t = 0, n = 0; n < e.length; n++) t = (t << 8) + e[n];
            return t.toString();
          },
        },
      },
    };
    function Ae(e) {
      var t = l(e);
      return t.length >= 8
        ? t.substr(0, 4) + "-" + t.substr(4, 2) + "-" + t.substr(6, 2)
        : t;
    }
    function Pe(e) {
      var t = l(e),
        n = t;
      return (
        t.length >= 6 &&
          ((n = t.substr(0, 2) + ":" + t.substr(2, 2) + ":" + t.substr(4, 2)),
          11 === t.length &&
            (n += t.substr(6, 1) + t.substr(7, 2) + ":" + t.substr(9, 2))),
        n
      );
    }
    function Ue(e) {
      var t = l(e);
      return "%G" === t
        ? "UTF-8"
        : "%5" === t
        ? "Windows-1252"
        : "%/G" === t
        ? "UTF-8 Level 1"
        : "%/H" === t
        ? "UTF-8 Level 2"
        : "%/I" === t
        ? "UTF-8 Level 3"
        : "/A" === t
        ? "ISO-8859-1"
        : "/B" === t
        ? "ISO-8859-2"
        : "/C" === t
        ? "ISO-8859-3"
        : "/D" === t
        ? "ISO-8859-4"
        : "/@" === t
        ? "ISO-8859-5"
        : "/G" === t
        ? "ISO-8859-6"
        : "/F" === t
        ? "ISO-8859-7"
        : "/H" === t
        ? "ISO-8859-8"
        : "Unknown";
    }
    var we = function (e, t) {
        var n = (function () {
          if ("undefined" != typeof TextDecoder) return TextDecoder;
        })();
        if ("undefined" != typeof n && void 0 !== e)
          try {
            return new n(e).decode(Uint8Array.from(t));
          } catch (e) {}
        return (function (e) {
          try {
            return decodeURIComponent(escape(e));
          } catch (t) {
            return e;
          }
        })(
          t
            .map(function (e) {
              return String.fromCharCode(e);
            })
            .join("")
        );
      },
      De = function (e, t, n) {
        try {
          if (Array.isArray(e))
            return Me(
              new DataView(Uint8Array.from(e).buffer),
              { size: e.length },
              0,
              n
            );
          var r = (function (e, t) {
            for (; t + 12 <= e.byteLength; ) {
              var n = Te(e, t);
              if (Oe(n)) return { naaBlock: n, dataOffset: t + 12 };
              t += 12 + n.size + Fe(n);
            }
            throw Error("No IPTC NAA resource block.");
          })(e, t);
          return Me(e, r.naaBlock, r.dataOffset, n);
        } catch (e) {
          return {};
        }
      };
    function Te(e, t) {
      if (943868237 !== e.getUint32(t, 0))
        throw Error("Not an IPTC resource block.");
      return { type: e.getUint16(t + 4), size: e.getUint16(t + 10) };
    }
    function Oe(e) {
      return 1028 === e.type;
    }
    function Fe(e) {
      return e.size % 2 != 0 ? 1 : 0;
    }
    function Me(e, t, n, r) {
      for (
        var i = {}, o = void 0, a = n + t.size;
        n < a && n < e.byteLength;

      ) {
        var u = Re(e, n, i, o, r),
          c = u.tag,
          f = u.tagSize;
        if (null === c) break;
        c &&
          ("encoding" in c && (o = c.encoding),
          void 0 === i[c.name] || void 0 === c.repeatable
            ? (i[c.name] = {
                id: c.id,
                value: c.value,
                description: c.description,
              })
            : (i[c.name] instanceof Array ||
                (i[c.name] = [
                  {
                    id: i[c.name].id,
                    value: i[c.name].value,
                    description: i[c.name].description,
                  },
                ]),
              i[c.name].push({
                id: c.id,
                value: c.value,
                description: c.description,
              }))),
          (n += 5 + f);
      }
      return i;
    }
    function Re(e, t, n, r, i) {
      if (
        (function (e, t) {
          return 28 !== e.getUint8(t);
        })(e, t)
      )
        return { tag: null, tagSize: 0 };
      var o = e.getUint16(t + 1),
        a = e.getUint16(t + 3);
      if (!i && !Ie.iptc[o]) return { tag: void 0, tagSize: a };
      var u = (function (e, t, n) {
          for (var r = [], i = 0; i < n; i++) r.push(e.getUint8(t + i));
          return r;
        })(e, t + 5, a),
        c = {
          id: o,
          name: Le(Ie.iptc[o], o, u),
          value: u,
          description: ke(Ie.iptc[o], u, n, r),
        };
      return (
        (function (e) {
          return Ie.iptc[e] && Ie.iptc[e].repeatable;
        })(o) && (c.repeatable = 1),
        (function (e) {
          return Ie.iptc[e] && void 0 !== Ie.iptc[e].encoding_name;
        })(o) && (c.encoding = Ie.iptc[o].encoding_name(u)),
        { tag: c, tagSize: a }
      );
    }
    function Le(e, t, n) {
      return e
        ? (function (e) {
            return "string" == typeof e;
          })(e)
          ? e
          : (function (e) {
              return "function" == typeof e.name;
            })(e)
          ? e.name(n)
          : e.name
        : "undefined-".concat(t);
    }
    function ke(e, t, n, r) {
      if (
        (function (e) {
          return e && void 0 !== e.description;
        })(e)
      )
        try {
          return e.description(t, n);
        } catch (e) {}
      return (function (e, t) {
        return e && t instanceof Array;
      })(e, t)
        ? we(r, t)
        : t;
    }
    function xe(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var Ne = {
      "tiff:Orientation": function (e) {
        return "1" === e
          ? "Horizontal (normal)"
          : "2" === e
          ? "Mirror horizontal"
          : "3" === e
          ? "Rotate 180"
          : "4" === e
          ? "Mirror vertical"
          : "5" === e
          ? "Mirror horizontal and rotate 270 CW"
          : "6" === e
          ? "Rotate 90 CW"
          : "7" === e
          ? "Mirror horizontal and rotate 90 CW"
          : "8" === e
          ? "Rotate 270 CW"
          : e;
      },
      "exif:GPSLatitude": Ee,
      "exif:GPSLongitude": Ee,
    };
    function Ee(e) {
      var t,
        n =
          (2,
          (function (e) {
            if (Array.isArray(e)) return e;
          })((t = e.split(","))) ||
            (function (e, t) {
              var n =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null != n) {
                var r,
                  i,
                  o = [],
                  a = 1,
                  u = 0;
                try {
                  for (
                    n = n.call(e);
                    !(a = (r = n.next()).done) &&
                    (o.push(r.value), 2 !== o.length);
                    a = 1
                  );
                } catch (e) {
                  (u = 1), (i = e);
                } finally {
                  try {
                    a || null == n.return || n.return();
                  } finally {
                    if (u) throw i;
                  }
                }
                return o;
              }
            })(t) ||
            (function (e, t) {
              if (e) {
                if ("string" == typeof e) return xe(e, 2);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return (
                  "Object" === n && e.constructor && (n = e.constructor.name),
                  "Map" === n || "Set" === n
                    ? Array.from(e)
                    : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? xe(e, 2)
                    : void 0
                );
              }
            })(t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()),
        r = n[0],
        i = n[1];
      if (void 0 !== r && void 0 !== i) {
        var o = parseFloat(r),
          a = parseFloat(i),
          u = i.charAt(i.length - 1);
        if (!Number.isNaN(o) && !Number.isNaN(a)) return "" + (o + a / 60) + u;
      }
      return e;
    }
    function Ge(e) {
      return (
        (Ge =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        Ge(e)
      );
    }
    var Be = function (e, t) {
      return "string" == typeof e
        ? ze({}, e)
        : (function (e, t) {
            if (0 === t.length) return [];
            var n = [je(e, t.slice(0, 1))];
            return t.length > 1 && n.push(je(e, t.slice(1))), n;
          })(e, t).reduce(ze, {});
    };
    function je(e, t) {
      for (
        var n = t.reduce(function (e, t) {
            return e + t.length;
          }, 0),
          r = new Uint8Array(n),
          i = 0,
          o = 0;
        o < t.length;
        o++
      ) {
        var a = t[o],
          u = e.buffer.slice(a.dataOffset, a.dataOffset + a.length);
        r.set(new Uint8Array(u), i), (i += a.length);
      }
      return new DataView(r.buffer);
    }
    function ze(e, t) {
      try {
        var n = (function (e) {
          var t = (function () {
            if ("undefined" != typeof DOMParser) return DOMParser;
            try {
              return require("@xmldom/xmldom").DOMParser;
            } catch (e) {
              return;
            }
          })();
          if (!t)
            throw (
              (console.warn(
                "Warning: DOMParser is not available. It is needed to be able to parse XMP tags."
              ),
              Error())
            );
          var n = new t(),
            i = "string" == typeof e ? e : r(e, 0, e.byteLength),
            o = n.parseFromString(
              i
                .replace(/^.+(<\?xpacket begin)/, "$1")
                .replace(/(<\?xpacket end=".*"\?>).+$/, "$1"),
              "application/xml"
            );
          if ("parsererror" === o.documentElement.nodeName)
            throw Error(o.documentElement.textContent);
          return o;
        })(t);
        return a(e, Ke(He(We(n), 1)));
      } catch (t) {
        return e;
      }
    }
    function We(e) {
      for (var t = 0; t < e.childNodes.length; t++) {
        if ("x:xmpmeta" === e.childNodes[t].tagName) return We(e.childNodes[t]);
        if ("rdf:RDF" === e.childNodes[t].tagName) return e.childNodes[t];
      }
      throw Error();
    }
    function He(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        n = Ve(e);
      return Xe(n) ? (t ? {} : qe(n[0])) : Ye(n);
    }
    function Ve(e) {
      for (var t = [], n = 0; n < e.childNodes.length; n++)
        t.push(e.childNodes[n]);
      return t;
    }
    function Xe(e) {
      return 1 === e.length && "#text" === e[0].nodeName;
    }
    function qe(e) {
      return e.nodeValue;
    }
    function Ye(e) {
      var t = {};
      return (
        e.forEach(function (e) {
          if (
            (function (e) {
              return e.nodeName && "#text" !== e.nodeName;
            })(e)
          ) {
            var n = (function (e) {
              return { attributes: Je(e), value: He(e) };
            })(e);
            void 0 !== t[e.nodeName]
              ? (Array.isArray(t[e.nodeName]) ||
                  (t[e.nodeName] = [t[e.nodeName]]),
                t[e.nodeName].push(n))
              : (t[e.nodeName] = n);
          }
        }),
        t
      );
    }
    function Je(e) {
      for (var t = {}, n = 0; n < e.attributes.length; n++)
        t[e.attributes[n].nodeName] = decodeURIComponent(
          escape(e.attributes[n].value)
        );
      return t;
    }
    function Ke(e) {
      var t = {};
      if ("string" == typeof e) return e;
      for (var n in e) {
        var r = e[n];
        Array.isArray(r) || (r = [r]),
          r.forEach(function (e) {
            a(t, _e(e.attributes)),
              "object" === Ge(e.value) && a(t, it(e.value));
          });
      }
      return t;
    }
    function _e(e) {
      var t = {};
      for (var n in e)
        $e(n) &&
          (t[Ze(n)] = {
            value: e[n],
            attributes: {},
            description: et(e[n], n),
          });
      return t;
    }
    function $e(e) {
      return "rdf:parseType" !== e && !Qe(e);
    }
    function Qe(e) {
      return "xmlns" === e.split(":")[0];
    }
    function Ze(e) {
      return /^MicrosoftPhoto(_\d+_)?:Rating$/i.test(e)
        ? "RatingPercent"
        : e.split(":")[1];
    }
    function et(e) {
      var t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
      if (Array.isArray(e)) return tt(e);
      if ("object" === Ge(e)) return nt(e);
      try {
        return t && "function" == typeof Ne[t]
          ? Ne[t](e)
          : decodeURIComponent(escape(e));
      } catch (t) {
        return e;
      }
    }
    function tt(e) {
      return e
        .map(function (e) {
          return void 0 !== e.value ? et(e.value) : et(e);
        })
        .join(", ");
    }
    function nt(e) {
      var t = [];
      for (var n in e) t.push("".concat(rt(n), ": ").concat(et(e[n].value)));
      return t.join("; ");
    }
    function rt(e) {
      return "CiAdrCity" === e
        ? "CreatorCity"
        : "CiAdrCtry" === e
        ? "CreatorCountry"
        : "CiAdrExtadr" === e
        ? "CreatorAddress"
        : "CiAdrPcode" === e
        ? "CreatorPostalCode"
        : "CiAdrRegion" === e
        ? "CreatorRegion"
        : "CiEmailWork" === e
        ? "CreatorWorkEmail"
        : "CiTelWork" === e
        ? "CreatorWorkPhone"
        : "CiUrlWork" === e
        ? "CreatorWorkUrl"
        : e;
    }
    function it(e) {
      var t = {};
      for (var n in e) Qe(n) || (t[Ze(n)] = ot(e[n], n));
      return t;
    }
    function ot(e, t) {
      return at(e)
        ? ut(e, t)
        : ft(e)
        ? st(e, t)
        : lt(e)
        ? dt(e, t)
        : (function (e) {
            return void 0 !== pt(e.value);
          })(e)
        ? (function (e, t) {
            var n = pt(e.value).value["rdf:li"],
              r = ct(e),
              i = [];
            return (
              void 0 === n ? (n = []) : Array.isArray(n) || (n = [n]),
              n.forEach(function (e) {
                i.push(
                  (function (e) {
                    return at(e)
                      ? ut(e)
                      : ft(e)
                      ? st(e).value
                      : lt(e)
                      ? dt(e).value
                      : mt(e);
                  })(e)
                );
              }),
              { value: i, attributes: r, description: et(i, t) }
            );
          })(e, t)
        : mt(e, t);
    }
    function at(e) {
      return (
        ("Resource" === e.attributes["rdf:parseType"] &&
          void 0 !== e.value["rdf:value"]) ||
        (void 0 !== e.value["rdf:Description"] &&
          void 0 !== e.value["rdf:Description"].value["rdf:value"])
      );
    }
    function ut(e, t) {
      var n = ct(e);
      void 0 !== e.value["rdf:Description"] && (e = e.value["rdf:Description"]),
        a(
          n,
          ct(e),
          (function (e) {
            var t = {};
            for (var n in e.value)
              "rdf:value" === n || Qe(n) || (t[Ze(n)] = e.value[n].value);
            return t;
          })(e)
        );
      var r = (function (e) {
        return gt(e.value["rdf:value"]) || e.value["rdf:value"].value;
      })(e);
      return { value: r, attributes: n, description: et(r, t) };
    }
    function ct(e) {
      var t = {};
      for (var n in e.attributes)
        "rdf:parseType" === n ||
          "rdf:resource" === n ||
          Qe(n) ||
          (t[Ze(n)] = e.attributes[n]);
      return t;
    }
    function ft(e) {
      return (
        "Resource" === e.attributes["rdf:parseType"] ||
        (void 0 !== e.value["rdf:Description"] &&
          void 0 === e.value["rdf:Description"].value["rdf:value"])
      );
    }
    function st(e, t) {
      var n = { value: {}, attributes: {} };
      return (
        void 0 !== e.value["rdf:Description"] &&
          (a(n.value, _e(e.value["rdf:Description"].attributes)),
          a(n.attributes, ct(e)),
          (e = e.value["rdf:Description"])),
        a(n.value, it(e.value)),
        (n.description = et(n.value, t)),
        n
      );
    }
    function lt(e) {
      return (
        0 === Object.keys(e.value).length &&
        void 0 === e.attributes["xml:lang"] &&
        void 0 === e.attributes["rdf:resource"]
      );
    }
    function dt(e, t) {
      var n = _e(e.attributes);
      return { value: n, attributes: {}, description: et(n, t) };
    }
    function pt(e) {
      return e["rdf:Bag"] || e["rdf:Seq"] || e["rdf:Alt"];
    }
    function mt(e, t) {
      var n = gt(e) || Ke(e.value);
      return { value: n, attributes: ct(e), description: et(n, t) };
    }
    function gt(e) {
      return e.attributes && e.attributes["rdf:resource"];
    }
    var vt = {
        desc: { name: "ICC Description" },
        cprt: { name: "ICC Copyright" },
        dmdd: { name: "ICC Device Model Description" },
        vued: { name: "ICC Viewing Conditions Description" },
        dmnd: { name: "ICC Device Manufacturer for Display" },
        tech: { name: "Technology" },
      },
      ht = {
        4: {
          name: "Preferred CMM type",
          value: function (e, t) {
            return r(e, t, 4);
          },
          description: function (e) {
            return null !== e ? yt(e) : "";
          },
        },
        8: {
          name: "Profile Version",
          value: function (e, t) {
            return (
              e.getUint8(t).toString(10) +
              "." +
              (e.getUint8(t + 1) >> 4).toString(10) +
              "." +
              (e.getUint8(t + 1) % 16).toString(10)
            );
          },
        },
        12: {
          name: "Profile/Device class",
          value: function (e, t) {
            return r(e, t, 4);
          },
          description: function (e) {
            switch (e.toLowerCase()) {
              case "scnr":
                return "Input Device profile";
              case "mntr":
                return "Display Device profile";
              case "prtr":
                return "Output Device profile";
              case "link":
                return "DeviceLink profile";
              case "abst":
                return "Abstract profile";
              case "spac":
                return "ColorSpace profile";
              case "nmcl":
                return "NamedColor profile";
              case "cenc":
                return "ColorEncodingSpace profile";
              case "mid ":
                return "MultiplexIdentification profile";
              case "mlnk":
                return "MultiplexLink profile";
              case "mvis":
                return "MultiplexVisualization profile";
              default:
                return e;
            }
          },
        },
        16: {
          name: "Color Space",
          value: function (e, t) {
            return r(e, t, 4);
          },
        },
        20: {
          name: "Connection Space",
          value: function (e, t) {
            return r(e, t, 4);
          },
        },
        24: {
          name: "ICC Profile Date",
          value: function (e, t) {
            return (function (e, t) {
              var n = e.getUint16(t),
                r = e.getUint16(t + 2) - 1,
                i = e.getUint16(t + 4),
                o = e.getUint16(t + 6),
                a = e.getUint16(t + 8),
                u = e.getUint16(t + 10);
              return new Date(Date.UTC(n, r, i, o, a, u));
            })(e, t).toISOString();
          },
        },
        36: {
          name: "ICC Signature",
          value: function (e, t) {
            return (
              (n = e.buffer.slice(t, t + 4)),
              String.fromCharCode.apply(null, new Uint8Array(n))
            );
            var n;
          },
        },
        40: {
          name: "Primary Platform",
          value: function (e, t) {
            return r(e, t, 4);
          },
          description: function (e) {
            return yt(e);
          },
        },
        48: {
          name: "Device Manufacturer",
          value: function (e, t) {
            return r(e, t, 4);
          },
          description: function (e) {
            return yt(e);
          },
        },
        52: {
          name: "Device Model Number",
          value: function (e, t) {
            return r(e, t, 4);
          },
        },
        64: {
          name: "Rendering Intent",
          value: function (e, t) {
            return e.getUint32(t);
          },
          description: function (e) {
            switch (e) {
              case 0:
                return "Perceptual";
              case 1:
                return "Relative Colorimetric";
              case 2:
                return "Saturation";
              case 3:
                return "Absolute Colorimetric";
              default:
                return e;
            }
          },
        },
        80: {
          name: "Profile Creator",
          value: function (e, t) {
            return r(e, t, 4);
          },
        },
      };
    function yt(e) {
      switch (e.toLowerCase()) {
        case "appl":
          return "Apple";
        case "adbe":
          return "Adobe";
        case "msft":
          return "Microsoft";
        case "sunw":
          return "Sun Microsystems";
        case "sgi":
          return "Silicon Graphics";
        case "tgnt":
          return "Taligent";
        default:
          return e;
      }
    }
    var St = function (e, t) {
        try {
          for (
            var n = t.reduce(function (e, t) {
                return e + t.length;
              }, 0),
              o = new Uint8Array(n),
              a = 0,
              u = (function (e) {
                return Array.isArray(e)
                  ? new DataView(Uint8Array.from(e).buffer).buffer
                  : e.buffer;
              })(e),
              c = function (e) {
                var n = t.find(function (t) {
                  return t.chunkNumber === e;
                });
                if (!n) throw Error("ICC chunk ".concat(e, " not found"));
                var r = u.slice(n.offset, n.offset + n.length),
                  i = new Uint8Array(r);
                o.set(i, a), (a += i.length);
              },
              f = 1;
            f <= t.length;
            f++
          )
            c(f);
          return (function (e) {
            var t = e.buffer,
              n = e.getUint32();
            if (e.byteLength !== n)
              throw Error("ICC profile length not matching");
            if (e.length < 84) throw Error("ICC profile too short");
            for (var o = {}, a = Object.keys(ht), u = 0; u < a.length; u++) {
              var c = a[u],
                f = ht[c],
                s = f.value(e, parseInt(c, 10)),
                l = s;
              f.description && (l = f.description(s)),
                (o[f.name] = { value: s, description: l });
            }
            if (wt(t.slice(36, 40)) !== bt)
              throw Error("ICC profile: missing signature");
            if (
              (function (e) {
                return e.length < 132;
              })(t)
            )
              return o;
            for (var d = e.getUint32(128), p = 132, m = 0; m < d; m++) {
              if (Ut(t, p)) return o;
              var g = r(e, p, 4),
                v = e.getUint32(p + 4),
                h = e.getUint32(p + 8);
              if (v > t.length) return o;
              var y = r(e, v, 4);
              if (y === Ct) {
                var S = e.getUint32(v + 8);
                if (S > h) return o;
                Dt(o, g, wt(t.slice(v + 12, v + S + 11)));
              } else if (y === It) {
                for (
                  var b = e.getUint32(v + 8),
                    C = e.getUint32(v + 12),
                    I = v + 16,
                    A = [],
                    P = 0;
                  P < b;
                  P++
                ) {
                  var U = r(e, I + 0, 2),
                    w = r(e, I + 2, 2),
                    D = e.getUint32(I + 4),
                    T = e.getUint32(I + 8),
                    O = i(e, v + T, D);
                  A.push({ languageCode: U, countryCode: w, text: O }),
                    (I += C);
                }
                if (1 === b) Dt(o, g, A[0].text);
                else {
                  for (var F = {}, M = 0; M < A.length; M++)
                    F[
                      "".concat(A[M].languageCode, "-").concat(A[M].countryCode)
                    ] = A[M].text;
                  Dt(o, g, F);
                }
              } else
                y === At
                  ? Dt(o, g, wt(t.slice(v + 8, v + h - 7)))
                  : y === Pt && Dt(o, g, wt(t.slice(v + 8, v + 12)));
              p += 12;
            }
            return o;
          })(new DataView(o.buffer));
        } catch (e) {
          return {};
        }
      },
      bt = "acsp",
      Ct = "desc",
      It = "mluc",
      At = "text",
      Pt = "sig ";
    function Ut(e, t) {
      return e.length < t + 12;
    }
    function wt(e) {
      return String.fromCharCode.apply(null, new Uint8Array(e));
    }
    function Dt(e, t, n) {
      vt[t]
        ? (e[vt[t].name] = { value: n, description: n })
        : (e[t] = { value: n, description: n });
    }
    var Tt = function (e, t) {
      return {
        "Image Width": Ot(e, t),
        "Image Height": Ft(e, t),
        "Bit Depth": Mt(e, t),
        "Color Type": Rt(e, t),
        Compression: Lt(e, t),
        Filter: kt(e, t),
        Interlace: xt(e, t),
      };
    };
    function Ot(e, t) {
      if (!(t + 0 + 4 > e.byteLength)) {
        var n = G.getLongAt(e, t);
        return { value: n, description: "".concat(n, "px") };
      }
    }
    function Ft(e, t) {
      if (!(t + 4 + 4 > e.byteLength)) {
        var n = G.getLongAt(e, t + 4);
        return { value: n, description: "".concat(n, "px") };
      }
    }
    function Mt(e, t) {
      if (!(t + 8 + 1 > e.byteLength)) {
        var n = G.getByteAt(e, t + 8);
        return { value: n, description: "".concat(n) };
      }
    }
    function Rt(e, t) {
      if (!(t + 9 + 1 > e.byteLength)) {
        var n = G.getByteAt(e, t + 9);
        return {
          value: n,
          description:
            {
              0: "Grayscale",
              2: "RGB",
              3: "Palette",
              4: "Grayscale with Alpha",
              6: "RGB with Alpha",
            }[n] || "Unknown",
        };
      }
    }
    function Lt(e, t) {
      if (!(t + 10 + 1 > e.byteLength)) {
        var n = G.getByteAt(e, t + 10);
        return {
          value: n,
          description: 0 === n ? "Deflate/Inflate" : "Unknown",
        };
      }
    }
    function kt(e, t) {
      if (!(t + 11 + 1 > e.byteLength)) {
        var n = G.getByteAt(e, t + 11);
        return { value: n, description: 0 === n ? "Adaptive" : "Unknown" };
      }
    }
    function xt(e, t) {
      if (!(t + 12 + 1 > e.byteLength)) {
        var n = G.getByteAt(e, t + 12);
        return {
          value: n,
          description:
            { 0: "Noninterlaced", 1: "Adam7 Interlace" }[n] || "Unknown",
        };
      }
    }
    var Nt = [6, 7, 99],
      Et = function (e, t, n) {
        if (
          (i = t) &&
          (void 0 === i.Compression || Nt.includes(i.Compression.value)) &&
          i.JPEGInterchangeFormat &&
          i.JPEGInterchangeFormat.value &&
          i.JPEGInterchangeFormatLength &&
          i.JPEGInterchangeFormatLength.value
        ) {
          t.type = "image/jpeg";
          var r = n + t.JPEGInterchangeFormat.value;
          (t.image = e.buffer.slice(
            r,
            r + t.JPEGInterchangeFormatLength.value
          )),
            u(t, "base64", function () {
              return c(this.image);
            });
        }
        var i;
        return t;
      };
    function Gt(e) {
      (this.name = "MetadataMissingError"),
        (this.message = e || "No Exif data"),
        (this.stack = Error().stack);
    }
    Gt.prototype = Error();
    var Bt = { MetadataMissingError: Gt },
      jt = { load: Wt, loadView: Vt, errors: Bt },
      zt = Bt;
    function Wt(e, t) {
      return (function (e) {
        return "string" == typeof e;
      })(e)
        ? ((n = e),
          "undefined" != typeof fetch
            ? fetch(n).then(function (e) {
                return e.arrayBuffer();
              })
            : /^https?:\/\//.test(n)
            ? ((r = n),
              new Promise(function (e, t) {
                var n = (function (e) {
                  return /^https:\/\//.test(e)
                    ? require("https").get
                    : require("http").get;
                })(r);
                n(r, function (n) {
                  if (n.statusCode >= 200 && n.statusCode <= 299) {
                    var r = [];
                    n.on("data", function (e) {
                      return r.push(Buffer.from(e));
                    }),
                      n.on("error", function (e) {
                        return t(e);
                      }),
                      n.on("end", function () {
                        return e(Buffer.concat(r));
                      });
                  } else
                    t(
                      "Could not fetch file: "
                        .concat(n.statusCode, " ")
                        .concat(n.statusMessage)
                    ),
                      n.resume();
                }).on("error", function (e) {
                  return t(e);
                });
              }))
            : (function (e) {
                return new Promise(function (t, n) {
                  var r = (function () {
                    try {
                      return require("fs");
                    } catch (e) {
                      return;
                    }
                  })();
                  r.open(e, function (i, o) {
                    i
                      ? n(i)
                      : r.stat(e, function (i, a) {
                          if (i) n(i);
                          else {
                            var u = Buffer.alloc(a.size);
                            r.read(o, { buffer: u }, function (i) {
                              i
                                ? n(i)
                                : r.close(o, function (n) {
                                    n &&
                                      console.warn(
                                        "Could not close file ".concat(e, ":"),
                                        n
                                      ),
                                      t(u);
                                  });
                            });
                          }
                        });
                  });
                });
              })(n)).then(function (e) {
            return Ht(e, t);
          })
        : (function (e) {
            return (
              "undefined" != typeof window &&
              "undefined" != typeof File &&
              e instanceof File
            );
          })(e)
        ? ((i = e),
          new Promise(function (e, t) {
            var n = new FileReader();
            (n.onload = function (t) {
              return e(t.target.result);
            }),
              (n.onerror = function () {
                return t(n.error);
              }),
              n.readAsArrayBuffer(i);
          })).then(function (e) {
            return Ht(e, t);
          })
        : Ht(e, t);
      var n, r, i;
    }
    function Ht(e, t) {
      return (
        (function (e) {
          try {
            return Buffer.isBuffer(e);
          } catch (e) {
            return 0;
          }
        })(e) && (e = new Uint8Array(e).buffer),
        Vt(
          (function (e) {
            try {
              return new DataView(e);
            } catch (t) {
              return new s(e);
            }
          })(e),
          t
        )
      );
    }
    function Vt(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : { expanded: 0, includeUnknown: 0 },
        n = t.expanded,
        r = void 0 === n ? 0 : n,
        i = t.includeUnknown,
        u = void 0 === i ? 0 : i,
        c = 0,
        f = {},
        s = x(e),
        l = s.fileDataOffset,
        d = s.jfifDataOffset,
        p = s.tiffHeaderOffset,
        m = s.iptcDataOffset,
        g = s.xmpChunks,
        v = s.iccChunks,
        h = s.mpfDataOffset,
        y = s.pngHeaderOffset;
      if (Xt(l)) {
        c = 1;
        var S = fe(e, l);
        r ? (f.file = S) : (f = a({}, f, S));
      }
      if (qt(d)) {
        c = 1;
        var b = ve(e, d);
        r ? (f.jfif = b) : (f = a({}, f, b));
      }
      if (Yt(p)) {
        c = 1;
        var C = $(e, p, u);
        if (
          (C.Thumbnail && ((f.Thumbnail = C.Thumbnail), delete C.Thumbnail),
          r ? ((f.exif = C), Jt(f)) : (f = a({}, f, C)),
          C["IPTC-NAA"] && !Kt(m))
        ) {
          var I = De(C["IPTC-NAA"].value, 0, u);
          r ? (f.iptc = I) : (f = a({}, f, I));
        }
        if (C.ApplicationNotes && !_t(g)) {
          var A = Be(o(C.ApplicationNotes.value));
          r ? (f.xmp = A) : (f = a({}, f, A));
        }
        if (C.ICC_Profile && !$t(v)) {
          var P = St(C.ICC_Profile.value, [
            {
              offset: 0,
              length: C.ICC_Profile.value.length,
              chunkNumber: 1,
              chunksTotal: 1,
            },
          ]);
          r ? (f.icc = P) : (f = a({}, f, P));
        }
      }
      if (Kt(m)) {
        c = 1;
        var U = De(e, m, u);
        r ? (f.iptc = U) : (f = a({}, f, U));
      }
      if (_t(g)) {
        c = 1;
        var w = Be(e, g);
        r ? (f.xmp = w) : (f = a({}, f, w));
      }
      if ($t(v)) {
        c = 1;
        var D = St(e, v);
        r ? (f.icc = D) : (f = a({}, f, D));
      }
      if (Qt(h)) {
        c = 1;
        var T = Q(e, h, u);
        r ? (f.mpf = T) : (f = a({}, f, T));
      }
      if (Zt(y)) {
        c = 1;
        var O = Tt(e, y);
        r ? (f.pngFile = O) : (f = a({}, f, O));
      }
      var F = Et(e, f.Thumbnail, p);
      if ((F ? ((c = 1), (f.Thumbnail = F)) : delete f.Thumbnail, !c))
        throw new Bt.MetadataMissingError();
      return f;
    }
    function Xt(e) {
      return void 0 !== e;
    }
    function qt(e) {
      return void 0 !== e;
    }
    function Yt(e) {
      return void 0 !== e;
    }
    function Jt(e) {
      if (e.exif) {
        if (e.exif.GPSLatitude && e.exif.GPSLatitudeRef)
          try {
            (e.gps = e.gps || {}),
              (e.gps.Latitude = p(e.exif.GPSLatitude.value)),
              "S" === e.exif.GPSLatitudeRef.value.join("") &&
                (e.gps.Latitude = -e.gps.Latitude);
          } catch (e) {}
        if (e.exif.GPSLongitude && e.exif.GPSLongitudeRef)
          try {
            (e.gps = e.gps || {}),
              (e.gps.Longitude = p(e.exif.GPSLongitude.value)),
              "W" === e.exif.GPSLongitudeRef.value.join("") &&
                (e.gps.Longitude = -e.gps.Longitude);
          } catch (e) {}
        if (e.exif.GPSAltitude && e.exif.GPSAltitudeRef)
          try {
            (e.gps = e.gps || {}),
              (e.gps.Altitude =
                e.exif.GPSAltitude.value[0] / e.exif.GPSAltitude.value[1]),
              1 === e.exif.GPSAltitudeRef.value &&
                (e.gps.Altitude = -e.gps.Altitude);
          } catch (e) {}
      }
    }
    function Kt(e) {
      return void 0 !== e;
    }
    function _t(e) {
      return Array.isArray(e) && e.length > 0;
    }
    function $t(e) {
      return Array.isArray(e) && e.length > 0;
    }
    function Qt(e) {
      return void 0 !== e;
    }
    function Zt(e) {
      return void 0 !== e;
    }
    return t;
  })();
});
//# sourceMappingURL=exif-reader.js.map
