
_ =             require "lodash"
uuid =          require "./uuid.js"
Randomizer =    require "./randomizer.coffee"
Palette =       require "./palette.coffee"
UniformPaths =   require "../jsx/svg-uniform/pathData.coffee"

randomizer = new Randomizer()

randomPart = (part) ->
  arr = for key of UniformPaths[part].patterns
    key
  index = randomizer.intBetween(0, arr.length - 1)
  return arr[index]

module.exports = {

  createRandom: () ->
    # create random color scheme
    palette = Palette.createUniform()

    # 4/10 will have a simple shirt pattern
    if (randomizer.intBetween(1, 10) < 5)
      shirtPattern = "Outline Thin"
    else 
      shirtPattern = randomPart("shirt")

    # 7/10 will have a simple shorts pattern
    if (randomizer.intBetween(1, 10) < 8)
      shortsPattern = "Shorts Outline Thick"
    else 
      shortsPattern = randomPart("shorts")

    # create a logo from a number of patterns
    logoPatterns = for key of UniformPaths.logo.patterns
      key
    logoPatterns = _.take(_.shuffle(logoPatterns), randomizer.intBetween(2, logoPatterns.length))
    logoAtCenter = randomizer.itemInArray([0, 1])

    if logoAtCenter
      brandPattern = randomizer.itemInArray(["brand_left_long", "brand_left_square", "brand_right_thin"])
    else
      brandPattern = randomizer.itemInArray(["brand_left_long", "brand_left_square", "brand_center_triangle", "brand_center_square", ])

    uniform = {
      shirt: {
        color: palette.shirt[0]
        patterns: {
          primary: {
            name: shirtPattern,
            color: palette.shirt[1]
          }
        }
      },
      brand: {
        color: palette.brand
        pattern: brandPattern
      }
      logo: {
        bg:
          name: randomizer.itemInArray(["circle_outer", "circle_inner"])
          color: palette.logoBg
        opacity: randomizer.itemInArray([0.2])
        scale: randomizer.intBetween(100, 150) # %
        atCenter: logoAtCenter
        color: palette.logo
        patterns: logoPatterns.map((pattern) ->
          return {
            name: pattern,
            verticalShift: randomizer.intBetween(-4, 4)
          }
        )
      }
      shorts: {
        color: palette.shorts[0],
        patterns: {
          primary: {
            name: shortsPattern,
            color: palette.shorts[1]
          }
        }
      }
    }
    # 5/10 will have a secondary shirt pattern
    if (randomizer.intBetween(1, 10) < 6)
      uniform.shirt.patterns.secondary = {
        name: "Collar and Sleeves",
        color: palette.shirt[1]
      }
    return uniform
}
