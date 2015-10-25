

tinycolor = require "tinycolor2"
Randomizer = require "./randomizer.coffee"

randomizer = new Randomizer()

module.exports = {

  # Creates a palette object which is just a hash with color names
  # and their rgb values. The palette is used by the renderer to
  # assign fill and stroke values to svg elements based on the named
  # colors in the palette.

  create: (skinTone) ->
    skinColor = randomizer.itemInArray(skinTone.skin)
    hairColor = randomizer.itemInArray(skinTone.hair)
    outline = skinTone.outline
    c = tinycolor

    return {
      white: "#fff"
      # shirt
      shirt: "#fff"
      shirtOutline: "#343434"
      # hair
      hair: hairColor
      hairLight: c(hairColor).lighten(5).desaturate(10).toHexString()
      hairDark: c(hairColor).darken(5).desaturate(10).toHexString()
      hairOutline: c(hairColor).darken(20).toHexString()
      eyebrow: hairColor
      eye: "#201209"
      # skin & outline
      outline: outline
      fill: skinColor
      darker: c(skinColor).darken(7).desaturate(20).toHexString()
      dark: c(skinColor).darken(13).desaturate(30).toHexString()
      light: c(skinColor).lighten(7).toHexString()
    }
}
