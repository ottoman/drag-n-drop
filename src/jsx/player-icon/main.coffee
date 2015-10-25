
require "./player-image.css"
react =               require "./react-facade.coffee"
SVGComp =             require "./SvgComp.coffee"
PlayerPaths =         require "./playerPaths.coffee"

PlayerImage = react.createClass

  # renderPart()
  # part: "nose"
  # type: numeric id of which nose to use
  # palette: palette object with all colors to use
  renderPart: (part, type, palette) ->
    o = react.em
    paths = PlayerPaths[part]
    # Validate that data exists for the supplied part
    # and type
    if not paths
      throw Error("part does not exist:"+ part)
    if not paths[type]
      throw Error("No paths exists for this type:" + type)
    # Create an SVG path for each defined path using
    # the palette object to set each fill and stroke colors.
    for path, index in paths[type]
      o "path",
        key: index
        d: path.d
        fill: palette[path.fill] || "none"
        stroke: palette[path.stroke] || "none"

  render: () ->
    o = react.em
    # The palette object determines which colors (skin, hair etc) to
    # use as fills and strokes on the SVG elements created.
    palette = @props.playerImage.palette
    # The player Image object determines which part of the
    # background to show behind the player by specifying X and Y
    # coordinates. These are used in the css background-positiobn below.
    bg = {
      x: @props.playerImage.bg.x
      y: @props.playerImage.bg.y
    }

    return o "div",
      className: "player-image"
      style:
        width: "100%"
        height: "100%"
    ,
      o SVGComp,
        
        # The SVG viewbox attributes determines the view area of the SVG source to be
        # a rectangle of 160 points. Any elements outside of this viewbox will be hidden.
        viewBoxWidth: "160"
        viewBoxHeight: "160"
        # Background consists of bg.png but is cropped in position depending on
        # the x and y bg position of each player image.
        background: "#818285 url('/src/player-image/img/bg.png') #{bg.x} #{bg.y} / 300% 120% no-repeat"
      ,
        o "g", {

        },
          # Render SVG paths for each part of the players face...
          @renderPart("throat",             @props.playerImage.throat, palette)
          @renderPart("adamsApple",         @props.playerImage.adamsApple, palette)
          @renderPart("ears",               @props.playerImage.ears, palette)
          @renderPart("face",               @props.playerImage.face, palette)
          @renderPart("eyeSockets",         @props.playerImage.eyesockets, palette)
          @renderPart("foreheadDecoration", @props.playerImage.foreheadDecoration, palette)
          @renderPart("chin",               @props.playerImage.chin, palette)
          @renderPart("cheekShadows",       @props.playerImage.cheekShadows, palette)
          @renderPart("nose",               @props.playerImage.nose, palette)
          @renderPart("mouth",              @props.playerImage.mouth, palette)
          @renderPart("eyes",               @props.playerImage.eyes, palette)
          @renderPart("eyebrows",           @props.playerImage.eyebrows, palette)
          @renderPart("hair",               @props.playerImage.hair, palette)
          @renderPart("shirt",              @props.playerImage.shirt, palette)


module.exports = PlayerImage