/* jQuery Tree Multiselect v2.5.2 | (c) Patrick Tsai | MIT Licensed */
!(function n (a, o, c) {
  function l (t, e) {
    if (!o[t]) {
      if (!a[t]) {
        var i = typeof require === 'function' && require
        if (!e && i) return i(t, !0)
        if (d) return d(t, !0)
        var r = new Error("Cannot find module '" + t + "'")
        throw ((r.code = 'MODULE_NOT_FOUND'), r)
      }
      var s = (o[t] = { exports: {} })
      a[t][0].call(
        s.exports,
        function (e) {
          return l(a[t][1][e] || e)
        },
        s,
        s.exports,
        n,
        a,
        o,
        c
      )
    }
    return o[t].exports
  }
  for (
    var d = typeof require === 'function' && require, e = 0;
    e < c.length;
    e++
  ) { l(c[e]) }
  return l
})(
  {
    1: [
      function (e, t, i) {
        'use strict'
        jQuery.fn.treeMultiselect = e('./tree-multiselect/main')
      },
      { './tree-multiselect/main': 6 }
    ],
    2: [
      function (e, t, i) {
        'use strict'
        var r = 'searchhit'

        var s = 'false'
        ;(i.addSearchHitMarker = function (e, t) {
          e && ((t = t ? 'true' : s), e.setAttribute(r, t))
        }),
        (i.removeSearchHitMarker = function (e, t) {
          e && e.removeAttribute(r)
        }),
        (i.isNotSearchHit = function (e) {
          return e && e.getAttribute(r) === s
        })
      },
      {}
    ],
    3: [
      function (e, t, i) {
        'use strict'
        var r = e('./item')

        var s = e('./section')
        ;(i.createLookup = function (e) {
          return { arr: e, children: {} }
        }),
        (i.createSection = function (e) {
          return new s(e)
        }),
        (i.createItem = function (e) {
          return new r(e)
        })
      },
      { './item': 4, './section': 5 }
    ],
    4: [
      function (e, t, i) {
        'use strict'
        var r = e('./common')

        var s = e('../utility')
        function n (e) {
          ;(e = e || {}),
          (this.treeId = e.treeId),
          (this.id = e.id),
          (this.value = e.value),
          (this.text = e.text),
          (this.description = e.description),
          (this.initialIndex = e.initialIndex
            ? parseInt(e.initialIndex)
            : null),
          (this.section = e.section),
          (this.disabled = e.disabled),
          (this.selected = e.selected),
          (this.node = null)
        }
        ;(n.prototype.isSection = function () {
          return !1
        }),
        (n.prototype.isItem = function () {
          return !0
        }),
        (n.prototype.addSearchHitMarker = function (e) {
          r.addSearchHitMarker(this.node, e)
        }),
        (n.prototype.removeSearchHitMarker = function (e) {
          r.removeSearchHitMarker(this.node, e)
        }),
        (n.prototype.isNotSearchHit = function () {
          return r.isNotSearchHit(this.node)
        }),
        (n.prototype.render = function (e, t) {
          return (
            this.node || (this.node = s.dom.createSelection(this, e, t)),
            this.node
          )
        }),
        (t.exports = n)
      },
      { '../utility': 12, './common': 2 }
    ],
    5: [
      function (e, t, i) {
        'use strict'
        var r = e('./common')

        var s = e('../utility')
        function n (e) {
          ;(e = e || {}),
          (this.treeId = e.treeId),
          (this.id = e.id),
          (this.name = e.name),
          (this.items = []),
          (this.node = null)
        }
        ;(n.prototype.isSection = function () {
          return !0
        }),
        (n.prototype.isItem = function () {
          return !1
        }),
        (n.prototype.addSearchHitMarker = function (e) {
          r.addSearchHitMarker(this.node, e)
        }),
        (n.prototype.removeSearchHitMarker = function (e) {
          r.removeSearchHitMarker(this.node, e)
        }),
        (n.prototype.isNotSearchHit = function () {
          return r.isNotSearchHit(this.node)
        }),
        (n.prototype.render = function (e, t) {
          return (
            this.node || (this.node = s.dom.createSection(this, e, t)),
            this.node
          )
        }),
        (t.exports = n)
      },
      { '../utility': 12, './common': 2 }
    ],
    6: [
      function (e, t, i) {
        'use strict'
        var s = e('./tree')

        var n = 0
        t.exports = function (e) {
          var t

          var i = this

          var r = ((t = e),
          jQuery.extend(
            {},
            {
              allowBatchSelection: !0,
              collapsible: !0,
              enableSelectAll: !1,
              selectAllText: 'Select All',
              unselectAllText: 'Unselect All',
              freeze: !1,
              hideSidePanel: !1,
              maxSelections: 0,
              onChange: null,
              onlyBatchSelection: !1,
              searchable: !1,
              searchParams: ['value', 'text', 'description', 'section'],
              sectionDelimiter: '/',
              showSectionOnSelected: !0,
              sortable: !1,
              startCollapsed: !1
            },
            t
          ))
          return this.map(function () {
            var e = i
            e.attr('multiple', '').css('display', 'none')
            var t = new s(n, e, r)
            return (
              t.initialize(),
              ++n,
              {
                reload: function () {
                  t.reload()
                },
                remove: function () {
                  t.remove()
                }
              }
            )
          })
        }
      },
      { './tree': 8 }
    ],
    7: [
      function (e, t, i) {
        'use strict'
        var a = e('./utility')

        var o = 3
        function r (e, t, i, r) {
          ;(this.searchHitAttr = e),
          (this.index = {}),
          (this.astItems = t),
          (this.astItemKeys = Object.keys(t)),
          (this.astSections = i),
          (this.astSectionKeys = Object.keys(i)),
          this.setSearchParams(r),
          this.buildIndex()
        }
        ;(r.prototype.setSearchParams = function (e) {
          a.assert(Array.isArray(e))
          var t = { value: !0, text: !0, description: !0, section: !0 }
          this.searchParams = []
          for (var i = 0; i < e.length; ++i) { t[e[i]] && this.searchParams.push(e[i]) }
        }),
        (r.prototype.buildIndex = function () {
          var r = this

          var e = function (e) {
            var t = r.astItems[e]

            var i = []
            r.searchParams.forEach(function (e) {
              i.push(t[e])
            }),
            a.array.removeFalseyExceptZero(i),
            i
              .map(function (e) {
                return e.toLowerCase()
              })
              .forEach(function (e) {
                e.split(' ').forEach(function (e) {
                  r._addToIndex(e, t.id)
                })
              })
          }
          for (var t in this.astItems) e(t)
        }),
        (r.prototype._addToIndex = function (e, t) {
          for (var i = 1; i <= o; ++i) {
            for (var r = 0; r < e.length - i + 1; ++r) {
              var s = e.substring(r, r + i)
              this.index[s] || (this.index[s] = [])
              var n = this.index[s].length
                ;(n !== 0 && this.index[s][n - 1] === t) ||
                  this.index[s].push(t)
            }
          }
        }),
        (r.prototype.search = function (e) {
          var t = this
          if (!e) {
            return (
              this.astItemKeys.forEach(function (e) {
                t.astItems[e].removeSearchHitMarker()
              }),
              void this.astSectionKeys.forEach(function (e) {
                t.astSections[e].removeSearchHitMarker()
              })
            )
          }
          var i = (e = e.toLowerCase()).split(' ')

          var r = []
          i.forEach(function (e) {
            ;(function (e) {
              if ((a.assert(e), e.length < o)) return [e]
              for (var t = [], i = 0; i < e.length - o + 1; ++i) { t.push(e.substring(i, i + o)) }
              return t
            })(e).forEach(function (e) {
              r.push(t.index[e] || [])
            })
          })
          var s = a.array.intersectMany(r)
          this._handleNodeVisbilities(s)
        }),
        (r.prototype._handleNodeVisbilities = function (e) {
          var r = this

          var s = {}

          var n = {}
          e.forEach(function (e) {
            s[e] = !0
            var t = r.astItems[e].node
            for (t = t.parentNode; !t.className.match(/tree-multiselect/);) {
              if (t.className.match(/section/)) {
                var i = a.getKey(t)
                if ((a.assert(i || i === 0), n[i])) break
                n[i] = !0
              }
              t = t.parentNode
            }
          }),
          this.astItemKeys.forEach(function (e) {
            var t = !!s[e]
            r.astItems[e].addSearchHitMarker(t)
          }),
          this.astSectionKeys.forEach(function (e) {
            var t = !!n[e]
            r.astSections[e].addSearchHitMarker(t)
          })
        }),
        (t.exports = r)
      },
      { './utility': 12 }
    ],
    8: [
      function (e, t, i) {
        'use strict'
        function b (e) {
          if (Array.isArray(e)) {
            for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t]
            return i
          }
          return Array.from(e)
        }
        var v = e('./ast')

        var r = e('./search')

        var s = e('./ui-builder')

        var C = e('./utility')

        var n = 'searchhit'
        function a (e, t, i) {
          ;(this.id = e),
          (this.$originalSelect = t),
          (this.params = i),
          this.resetState()
        }
        ;(a.prototype.initialize = function () {
          if (
            (this.generateSelections(this.$selectionContainer[0]),
            this.popupDescriptionHover(),
            this.params.allowBatchSelection &&
              this.handleSectionCheckboxMarkings(),
            this.params.collapsible && this.addCollapsibility(),
            this.params.searchable || this.params.enableSelectAll)
          ) {
            var e = C.dom.createNode('div', { class: 'auxiliary' })
            this.$selectionContainer.prepend(
              e,
              this.$selectionContainer.firstChild
            ),
            this.params.searchable && this.createSearchBar(e),
            this.params.enableSelectAll && this.createSelectAllButtons(e)
          }
          this.armRemoveSelectedOnClick(),
          this.updateSelectedAndOnChange(),
          this.render(!0),
          this.uiBuilder.attach()
        }),
        (a.prototype.remove = function () {
          this.uiBuilder.remove(), this.resetState()
        }),
        (a.prototype.reload = function () {
          this.remove(), this.initialize()
        }),
        (a.prototype.resetState = function () {
          ;(this.uiBuilder = new s(
            this.$originalSelect,
            this.params.hideSidePanel
          )),
          (this.$treeContainer = this.uiBuilder.$treeContainer),
          (this.$selectionContainer = this.uiBuilder.$selectionContainer),
          (this.$selectedContainer = this.uiBuilder.$selectedContainer),
          (this.astItems = {}),
          (this.astSections = {}),
          (this.selectedNodes = {}),
          (this.selectedKeys = []),
          (this.keysToAdd = []),
          (this.keysToRemove = [])
        }),
        (a.prototype.generateSelections = function (e) {
          var t = this.$originalSelect.children('option')

          var i = this.createAst(t)
          this.generateHtml(i, e)
        }),
        (a.prototype.createAst = function (e) {
          var t

          var i = []

          var l = v.createLookup(i)

          var d = this

          var h = 0

          var u = 0

          var p = []

          var f = []
          return (
            e.each(function () {
              var e = this
              e.setAttribute('data-key', h)
              var t = v.createItem({
                treeId: d.id,
                id: h,
                value: e.value,
                text: e.text,
                description: e.getAttribute('data-description'),
                initialIndex: e.getAttribute('data-index'),
                section: e.getAttribute('data-section'),
                disabled: e.hasAttribute('readonly'),
                selected: e.hasAttribute('selected')
              })
              t.initialIndex && t.selected
                ? ((p[t.initialIndex] = p[t.initialIndex] || []),
                p[t.initialIndex].push(h))
                : t.selected && f.push(h),
              (d.astItems[h] = t),
              ++h
              for (
                var i = l,
                  r = t.section,
                  s =
                      r && r.length > 0
                        ? r.split(d.params.sectionDelimiter)
                        : [],
                  n = 0;
                n < s.length;
                ++n
              ) {
                var a = s[n]
                if (i.children[a]) i = i.children[a]
                else {
                  var o = v.createSection({ treeId: d.id, id: u, name: a })
                  ++u, i.arr.push(o)
                  var c = v.createLookup(o.items)
                    ;(i.children[a] = c), (i = c)
                }
              }
              i.arr.push(t)
            }),
            (this.keysToAdd = C.array.flatten(p)),
            C.array.removeFalseyExceptZero(this.keysToAdd),
            (t = this.keysToAdd).push.apply(t, f),
            C.array.uniq(this.keysToAdd),
            i
          )
        }),
        (a.prototype.generateHtml = function (e, t) {
          for (var i = 0; i < e.length; ++i) {
            var r = e[i]
            if (r.isSection()) {
              this.astSections[r.id] = r
              var s = this.params.allowBatchSelection

              var n = this.params.freeze

              var a = r.render(s, n)
              t.appendChild(a), this.generateHtml(r.items, a)
            } else if (r.isItem()) {
              this.astItems[r.id] = r
              var o = !this.params.onlyBatchSelection

              var c = this.params.freeze

              var l = r.render(o, c)
              t.appendChild(l)
            }
          }
        }),
        (a.prototype.popupDescriptionHover = function () {
          this.$selectionContainer.on(
            'mouseenter',
            'div.item > span.description',
            function () {
              var e = jQuery(this).parent()

              var t = e.attr('data-description')

              var i = document.createElement('div')
                ;(i.className = 'temp-description-popup'),
              (i.innerHTML = t),
              (i.style.position = 'absolute'),
              e.append(i)
            }
          ),
          this.$selectionContainer.on(
            'mouseleave',
            'div.item > span.description',
            function () {
              jQuery(this)
                .parent()
                .find('div.temp-description-popup')
                .remove()
            }
          )
        }),
        (a.prototype.handleSectionCheckboxMarkings = function () {
          var s = this
          this.$selectionContainer.on(
            'click',
            'input.section[type=checkbox]',
            function () {
              var e

              var t

              var i = jQuery(this)
                .closest('div.section')
                .find('div.item')
                .map(function (e, t) {
                  var i = C.getKey(t)

                  var r = s.astItems[i]
                  if (!r.disabled && !r.isNotSearchHit()) return i
                })
                .get()
              this.checked
                ? ((e = s.keysToAdd).push.apply(e, b(i)),
                C.array.uniq(s.keysToAdd))
                : ((t = s.keysToRemove).push.apply(t, b(i)),
                C.array.uniq(s.keysToRemove))
              s.render()
            }
          )
        }),
        (a.prototype.redrawSectionCheckboxes = function (e) {
          e = e || this.$selectionContainer
          var t = 3

          var i = this
          if (
            (e.find('> div.section').each(function () {
              var e = i.redrawSectionCheckboxes(jQuery(this))
              t &= e
            }),
            t)
          ) {
            for (
              var r = e.find('> div.item > input[type=checkbox]'), s = 0;
              s < r.length &&
                (r[s].disabled || (r[s].checked ? (t &= -3) : (t &= -2)),
                t !== 0);
              ++s
            );
          }
          var n = e.find('> div.title > input[type=checkbox]')
          return (
            n.length &&
                ((n = n[0]),
                1 & t
                  ? ((n.checked = !0), (n.indeterminate = !1))
                  : 2 & t
                    ? ((n.checked = !1), (n.indeterminate = !1))
                    : ((n.checked = !1), (n.indeterminate = !0))),
            t
          )
        }),
        (a.prototype.addCollapsibility = function () {
          var e = 'div.title'

          var t = this.$selectionContainer.find(e)

          var i = C.dom.createNode('span', { class: 'collapse-section' })
          t.prepend(i)
          var r = this.$selectionContainer.find('div.section')
          this.params.startCollapsed && r.addClass('collapsed'),
          this.$selectionContainer.on('click', e, function (e) {
            e.target.nodeName !== 'INPUT' &&
                  (jQuery(this)
                    .parent()
                    .toggleClass('collapsed'),
                  e.stopPropagation())
          })
        }),
        (a.prototype.createSearchBar = function (e) {
          var t = new r(
            n,
            this.astItems,
            this.astSections,
            this.params.searchParams
          )

          var i = C.dom.createNode('input', {
            class: 'search',
            placeholder: 'Search...'
          })
          e.appendChild(i),
          this.$selectionContainer.on('input', 'input.search', function () {
            var e = this.value
            t.search(e)
          })
        }),
        (a.prototype.createSelectAllButtons = function (e) {
          var t = C.dom.createNode('span', {
            class: 'select-all',
            text: this.params.selectAllText
          })

          var i = C.dom.createNode('span', {
            class: 'unselect-all',
            text: this.params.unselectAllText
          })

          var r = C.dom.createNode('div', { class: 'select-all-container' })
          r.appendChild(t), r.appendChild(i), e.appendChild(r)
          var s = this
          this.$selectionContainer.on('click', 'span.select-all', function () {
            var e
              ;(e = s.keysToAdd).push.apply(e, b(s.unfilteredNodeIds())),
            s.render()
          }),
          this.$selectionContainer.on(
            'click',
            'span.unselect-all',
            function () {
              var e
                  ;(e = s.keysToRemove).push.apply(e, b(s.unfilteredNodeIds())),
              s.render()
            }
          )
        }),
        (a.prototype.unfilteredNodeIds = function () {
          var t = this
          return Object.keys(t.astItems).filter(function (e) {
            return (
              !t.astItems[e].node.hasAttribute(n) ||
                t.astItems[e].node.getAttribute(n) === 'true'
            )
          })
        }),
        (a.prototype.armRemoveSelectedOnClick = function () {
          var i = this
          this.$selectedContainer.on(
            'click',
            'span.remove-selected',
            function () {
              var e = this.parentNode

              var t = C.getKey(e)
              i.keysToRemove.push(t), i.render()
            }
          )
        }),
        (a.prototype.updateSelectedAndOnChange = function () {
          var i = this
          if (
            (this.$selectionContainer.on(
              'click',
              'input.option[type=checkbox]',
              function () {
                var e = this.parentNode

                var t = C.getKey(e)
                C.assert(t || t === 0),
                this.checked ? i.keysToAdd.push(t) : i.keysToRemove.push(t),
                i.render()
              }
            ),
            this.params.sortable && !this.params.freeze)
          ) {
            var r = null

            var s = null
            this.$selectedContainer.sortable({
              start: function (e, t) {
                r = t.item.index()
              },
              stop: function (e, t) {
                ;(s = t.item.index()),
                r !== s &&
                      (C.array.moveEl(i.selectedKeys, r, s), i.render())
              }
            })
          }
        }),
        (a.prototype.render = function (e) {
          var t

          var i = this
          if (
            (C.array.uniq(this.keysToAdd),
            C.array.uniq(this.keysToRemove),
            C.array.subtract(this.keysToAdd, this.selectedKeys),
            C.array.intersect(this.keysToRemove, this.selectedKeys),
            C.isInteger(this.params.maxSelections) &&
                this.params.maxSelections > 0)
          ) {
            var r =
                this.keysToAdd.length -
                this.keysToRemove.length +
                this.selectedKeys.length
            if (r > this.params.maxSelections) {
              var s

              var n = r - this.params.maxSelections

              var a = []
              n > this.selectedKeys.length
                ? (a.push.apply(a, b(this.selectedKeys)),
                (n -= this.selectedKeys.length),
                a.push.apply(a, b(this.keysToAdd.splice(0, n))))
                : a.push.apply(a, b(this.selectedKeys.slice(0, n))),
              (s = this.keysToRemove).push.apply(s, a)
            }
          }
          for (var o = 0; o < this.keysToRemove.length; ++o) {
            var c = this.selectedNodes[this.keysToRemove[o]]
            c &&
                (c.parentNode.removeChild(c),
                (this.selectedNodes[this.keysToRemove[o]] = null)),
            (this.astItems[this.keysToRemove[o]].node.getElementsByTagName(
              'INPUT'
            )[0].checked = !1)
          }
          C.array.subtract(this.selectedKeys, this.keysToRemove)
          for (var l = 0; l < this.keysToAdd.length; ++l) {
            var d = this.keysToAdd[l]

            var h = this.astItems[d]
            this.selectedKeys.push(d)
            var u = C.dom.createSelected(
              h,
              this.params.freeze,
              this.params.showSectionOnSelected
            )
              ;(this.selectedNodes[h.id] = u), this.$selectedContainer.append(u)
            var p = h.node.getElementsByTagName('INPUT')[0]
            p && (p.checked = !0)
          }
          ;(t = this.selectedKeys).push.apply(t, b(this.keysToAdd)),
          C.array.uniq(this.selectedKeys),
          this.redrawSectionCheckboxes()
          for (var f = {}, v = {}, m = 0; m < this.selectedKeys.length; ++m) {
            var y = this.astItems[this.selectedKeys[m]].value
              ;(f[this.selectedKeys[m]] = !0), (v[y] = m)
          }
          var k = this.$originalSelect.find('option').toArray()
          if (
            (k.sort(function (e, t) {
              return (v[e.value] || 0) - (v[t.value] || 0)
            }),
            this.$originalSelect.html(k),
            this.$originalSelect.find('option').each(function (e, t) {
              this.selected = !!f[C.getKey(t)]
            }),
            this.$originalSelect.change(),
            !e && this.params.onChange)
          ) {
            var S = this.selectedKeys.map(function (e) {
              return i.astItems[e]
            })

            var x = this.keysToAdd.map(function (e) {
              return i.astItems[e]
            })

            var g = this.keysToRemove.map(function (e) {
              return i.astItems[e]
            })
            this.params.onChange(S, x, g)
          }
          ;(this.keysToRemove = []), (this.keysToAdd = [])
        }),
        (t.exports = a)
      },
      { './ast': 3, './search': 7, './ui-builder': 9, './utility': 12 }
    ],
    9: [
      function (e, t, i) {
        'use strict'
        function r (e, t) {
          var i = jQuery('<div class="tree-multiselect"></div>')

          var r = jQuery('<div class="selections"></div>')
          t && r.addClass('no-border'), i.append(r)
          var s = jQuery('<div class="selected"></div>')
          t || i.append(s),
          (this.$el = e),
          (this.$treeContainer = i),
          (this.$selectionContainer = r),
          (this.$selectedContainer = s)
        }
        ;(r.prototype.attach = function () {
          this.$el.after(this.$treeContainer)
        }),
        (r.prototype.remove = function () {
          this.$treeContainer.remove()
        }),
        (t.exports = r)
      },
      {}
    ],
    10: [
      function (e, t, r) {
        'use strict'
        function s (e, t) {
          for (var i = 0, r = 0; r < e.length; ++r) { t(e[r]) && ((e[i] = e[r]), ++i) }
          e.length = i
        }
        ;(r.flatten = function (e, t) {
          if (!Array.isArray(e)) return e
          t = t || []
          for (var i = 0; i < e.length; ++i) { Array.isArray(e[i]) ? t.concat(r.flatten(e[i], t)) : t.push(e[i]) }
          return t
        }),
        (r.uniq = function (e) {
          var i = {}
          s(e, function (e) {
            var t = !i[e]
            return (i[e] = !0), t
          })
        }),
        (r.removeFalseyExceptZero = function (e) {
          s(e, function (e) {
            return e || e === 0
          })
        }),
        (r.moveEl = function (e, t, i) {
          var r = e[t]
          e.splice(t, 1), e.splice(i, 0, r)
        }),
        (r.subtract = function (e, t) {
          for (var i = {}, r = 0; r < t.length; ++r) i[t[r]] = !0
          s(e, function (e) {
            return !i[e]
          })
        }),
        (r.intersect = function (e, t) {
          for (var i = {}, r = 0; r < t.length; ++r) i[t[r]] = !0
          s(e, function (e) {
            return i[e]
          })
        }),
        (r.intersectMany = function (e) {
          var t = []

          var i = []
          e.forEach(function (e) {
            t.push(0), i.push(e.length - 1)
          })
          for (var r = []; t.length > 0 && t[0] <= i[0]; ++t[0]) {
            for (var s = !1, n = 1; n < e.length; ++n) {
              for (; e[n][t[n]] < e[0][t[0]] && t[n] <= i[n];) ++t[n]
              if (t[n] > i[n]) {
                s = !0
                break
              }
            }
            if (s) break
            for (var a = !0, o = 1; o < e.length; ++o) {
              if (e[0][t[0]] !== e[o][t[o]]) {
                a = !1
                break
              }
            }
            a && r.push(e[0][t[0]])
          }
          return r
        })
      },
      {}
    ],
    11: [
      function (e, t, u) {
        'use strict'
        ;(u.createNode = function (e, t) {
          var i = document.createElement(e)
          if (t) {
            for (var r in t) { t.hasOwnProperty(r) && r !== 'text' && i.setAttribute(r, t[r]) }
            t.text && (i.textContent = t.text)
          }
          return i
        }),
        (u.createSelection = function (e, t, i) {
          var r = { class: 'item', 'data-key': e.id, 'data-value': e.value }

          var s = !!e.description
          s && (r['data-description'] = e.description),
          e.initialIndex && (r['data-index'] = e.initialIndex)
          var n = u.createNode('div', r)
          if (s) {
            var a = u.createNode('span', { class: 'description', text: '?' })
            n.appendChild(a)
          }
          if (t) {
            var o = 'treemultiselect-' + e.treeId + '-' + e.id

            var c = { class: 'option', type: 'checkbox', id: o }
              ;(i || e.disabled) && (c.disabled = !0)
            var l = u.createNode('input', c)
            n.insertBefore(l, n.firstChild)
            var d = {
              class: e.disabled ? 'disabled' : '',
              for: o,
              text: e.text || e.value
            }

            var h = u.createNode('label', d)
            n.appendChild(h)
          } else n.innerText = e.text || e.value
          return n
        }),
        (u.createSelected = function (e, t, i) {
          var r = u.createNode('div', {
            class: 'item',
            'data-key': e.id,
            'data-value': e.value,
            text: e.text
          })
          if (!t && !e.disabled) {
            var s = u.createNode('span', {
              class: 'remove-selected',
              text: '×'
            })
            r.insertBefore(s, r.firstChild)
          }
          if (i) {
            var n = u.createNode('span', {
              class: 'section-name',
              text: e.section
            })
            r.appendChild(n)
          }
          return r
        }),
        (u.createSection = function (e, t, i) {
          var r = u.createNode('div', { class: 'section', 'data-key': e.id })

          var s = u.createNode('div', { class: 'title', text: e.name })
          if (t) {
            var n = { class: 'section', type: 'checkbox' }
            i && (n.disabled = !0)
            var a = u.createNode('input', n)
            s.insertBefore(a, s.firstChild)
          }
          return r.appendChild(s), r
        })
      },
      {}
    ],
    12: [
      function (e, t, i) {
        'use strict'
        ;(i.array = e('./array')),
        (i.assert = function (e, t) {
          if (!e) throw new Error(t || 'Assertion failed')
        }),
        (i.dom = e('./dom')),
        (i.getKey = function (e) {
          return i.assert(e), parseInt(e.getAttribute('data-key'))
        }),
        (i.isInteger = function (e) {
          var t
          return !isNaN(e) && (0 | (t = parseFloat(e))) === t
        })
      },
      { './array': 10, './dom': 11 }
    ]
  },
  {},
  [1]
)
