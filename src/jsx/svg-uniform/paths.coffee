
react =     require "../svg-player-icon/react-facade.coffee"
pathData =  require "./pathData.coffee"
o = react.em

toSvgPath = (data, index) -> o "path",
    key: index
    d: data

toFilledSvgPath = (fill) -> 
  (data, index) -> o "path",
    key: index
    d: data
    fill: fill || "none"

module.exports = {

  brand:
    base: (fill, fillOpacity, patternName) ->
      o "path",
        key: patternName
        fill: fill
        fillOpacity: fillOpacity
        d: pathData.brand.patterns[patternName]

  logo:
    patterns: (stroke, strokeWidth, strokeOpacity, logoPatterns, scale, logoAtCenter, logoBg) ->
      scale = scale / 100
      if logoAtCenter
        horizontalShift = (-36 * (1/(scale)))
      else
        horizontalShift = 0
      cx = 145.6 # origin x for scaling
      cy = 52.0  # origin y for scaling
      x = cx - (scale * cx)
      y = cy - (scale * cy)

      paths = logoPatterns.map (pattern) ->
        o "path",
          key: pattern.name
          transform: "translate(0, " + pattern.verticalShift + ")"
          d: pathData.logo.patterns[pattern.name]

      if logoBg.name
        bg = o "path",
          key: "bg"
          d: pathData.logo.patterns[logoBg.name]
          stroke: "none"
          fill: logoBg.color
          fillOpacity: strokeOpacity

      o "g",
        fill: "none"
        transform: "matrix(#{scale}, 0, 0, #{scale}, #{x}, #{y}), translate(#{horizontalShift}, 0)"
        stroke: stroke
        strokeOpacity: strokeOpacity
        strokeWidth: strokeWidth
      , [bg].concat paths

  uniform:

    outline: (stroke, strokeWidth, fill) ->
      o "path",
        key: "uniform.outline"
        d: pathData.uniform.outline
        stroke: stroke  
        strokeWidth: strokeWidth
        fill: fill || "none"

  shorts:

    base: (fill, stroke) ->
      o "path",
        key: "shorts.base"
        d: pathData.shorts.base
        fill: fill || "none"
        stroke: stroke || "none"

    shadows: (fill, opacity) ->
      o "g",
        key: "shorts.shadows"
        style:
          fill: fill
          fillOpacity: opacity
      , pathData.shorts.shadows.map(toSvgPath)

    strokes: (fill, opacity) ->
      o "g",
        key: "shorts.strokes"
        style:
          fill: "none"
          stroke: fill
          opacity: opacity
      , pathData.shorts.strokes.map(toSvgPath)

    pattern: (patternName, fill) ->
      pathData.shorts.patterns[patternName]
        .map(toFilledSvgPath fill)

  shirt:

    base:  (fill, stroke) ->
      o "path",
        key: "shirt.base"
        d: pathData.shirt.base
        fill: fill || "none"
        stroke: stroke || "none"

    shadows: (fill, opacity) ->
      o "g",
        key: "shirt.shadows"
        style:
          fill: fill
          fillOpacity: opacity
      , pathData.shirt.shadows.map(toSvgPath)

    strokes: (fill, opacity) ->
      o "g",
        key: "shirt.strokes"
        style:
          fill: "none"
          stroke: fill
          opacity: opacity
      , pathData.shirt.strokes.map(toSvgPath)

    pattern: (patternName, fill) ->
      pathData.shirt.patterns[patternName]
        .map(toFilledSvgPath fill)

}

