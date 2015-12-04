
react =       require "../svg-player-icon/react-facade.coffee"
SVGComp =     require "../svg-player-icon/SvgComp.coffee"
paths =       require "./paths.coffee"

Uniform = react.createClass

  shouldComponentUpdate: (newProps) ->
    return @props.uniform isnt newProps.uniform

  render: () ->
    o = react.em
    o SVGComp,
      viewBoxWidth: "220"
      viewBoxHeight: "350"
    ,
      # Shorts
      paths.shorts.base(@props.uniform.shorts.color)
      # primary pattern
      if @props.uniform.shorts.patterns?.primary?
        paths.shorts.pattern(
           @props.uniform.shorts.patterns.primary.name
           @props.uniform.shorts.patterns.primary.color
        )
      # secondary pattern
      if @props.uniform.shorts.patterns?.secondary?
        paths.shorts.pattern(
           @props.uniform.shorts.patterns.secondary.name
           @props.uniform.shorts.patterns.secondary.color
        )
      paths.shorts.shadows("#000", "0.2")
      paths.shorts.strokes("#000", "0.4")
      # shirt
      paths.shirt.base(@props.uniform.shirt.color)
      # primary pattern
      if @props.uniform.shirt.patterns?.primary?
        paths.shirt.pattern(
          @props.uniform.shirt.patterns.primary.name
          @props.uniform.shirt.patterns.primary.color
        )
      # secondary pattern
      if @props.uniform.shirt.patterns?.secondary?
        paths.shirt.pattern(
          @props.uniform.shirt.patterns.secondary.name
          @props.uniform.shirt.patterns.secondary.color
        )
      # logo
      if @props.uniform.logo.patterns?.length
        paths.logo.patterns(@props.uniform.logo.color, "2", "0.8", @props.uniform.logo.patterns, @props.uniform.logo.scale, @props.uniform.logo.atCenter, @props.uniform.logo.bg)
      # brand
      if @props.uniform.brand.pattern?
        paths.brand.base(@props.uniform.brand.color, "0.7", @props.uniform.brand.pattern)

      paths.shirt.shadows("#000", "0.2")
      paths.shirt.strokes("#000", "0.4")
      # Uniform Outline
      paths.uniform.outline("#222", "1", "none")

module.exports = Uniform