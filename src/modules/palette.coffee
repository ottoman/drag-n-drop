
_ = require "lodash"
tinycolor = require "tinycolor2"
Randomizer = require "./randomizer.coffee"
randomizer = new Randomizer()

# create an array with colors values that we can pick randomly from
primaryColors = for i in [0, 0, 20, 40, 130, 200, 200, 230]
  tinycolor("hsl(" + (i) + ", 60%, 50%)")
allColors = for i in [0..18]
  tinycolor("hsl(" + (i * 20) + ", 60%, 50%)")
logoColors = [
  tinycolor("#444")
  tinycolor("#fff")
  tinycolor("hsl(360, 60%, 50%)")
  tinycolor("hsl(40, 60%, 50%)")
]

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
      shirt: "#aaa"
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

  createUniform: () ->
    c = tinycolor

    # 7/10 will have a primary color
    if (randomizer.intBetween(1, 10) < 8)
      primary = randomizer.itemInArray(primaryColors)
      # 4/10 will have secondary of white
      if (randomizer.intBetween(1, 10) < 5)
        secondary = tinycolor("#fff")
      # 2/10 will have a secondary of black
      else if (randomizer.intBetween(1, 3) is 3)
        secondary = tinycolor("#222")
      # 2/10 will have a darker secondary
      else if (randomizer.intBetween(1, 10) < 6)
        secondary = c(primary.toHexString()).darken(25)
      else
        # and 2/10 will have another primary
        secondary = randomizer.itemInArray(primaryColors)

    # 3/10 will have any random color
    else 
      primary = randomizer.itemInArray(allColors)
      # and always black or white with this...
      if (randomizer.intBetween(1, 10) < 7)
        secondary = tinycolor("#fff")
      else 
        secondary = tinycolor("#222")

    # # 4/10 will have a darker primary
    if (randomizer.intBetween(1, 10) < 4)
      primary = c(primary.toHexString()).darken(15)

    shirtColors = _.shuffle([primary, secondary]).map (c) -> c.toHexString()
    shortsColors = _.shuffle([primary, secondary]).map (c) -> c.toHexString()

    # 4/10 will use the secondary color as logoColor
    if (randomizer.intBetween(1, 10) < 5)
      logoColor = shirtColors[1]
      brandColor = shirtColors[1]
    else 
      logoColor = randomizer.itemInArray(logoColors)
      brandColor = randomizer.itemInArray([logoColor, tinycolor("#444"), tinycolor("#fff")])


    logoBg = randomizer.itemInArray("", "", "#fff");


    # All uniforms are made up of 2 colors with an additional
    # black or white color. Keepin it simple
    # and less chance of an ugly color scheme.
    return {
      logo: logoColor
      logoBg: logoBg
      brand: brandColor
      shirt: shirtColors
      shorts:  shortsColors
    }
}
