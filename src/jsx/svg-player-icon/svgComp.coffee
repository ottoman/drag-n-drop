  
react = require "./react-facade.coffee"

SvgComp = react.createClass

  # SVG
  #   @props.width
  #   @props.height
  #   @props.viewBoxX
  #   @props.viewBoxY
  #   @props.viewBoxWidth
  #   @props.viewBoxHeight

  render: () ->
    o = react.em
    width = @props.width || "100%"
    height = @props.height || "100%"
    viewBoxX = @props.viewBoxX || "0"
    viewBoxY = @props.viewBoxY || "0"
    viewBoxWidth = @props.viewBoxWidth || "100"
    viewBoxHeight = @props.viewBoxHeight || "100"
    o "svg", 
      style:
        width: width
        height: height
        background: @props.background || "none"
      viewBox: "#{viewBoxX} #{viewBoxY} #{viewBoxWidth} #{viewBoxHeight}"
      xmlns: "http://www.w3.org/2000/svg"
      # preserveAspectRatio: "XMidYMid meet"
    ,
      @props.children


module.exports = SvgComp