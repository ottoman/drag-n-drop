
uuid =          require "./uuid.js"
Randomizer =    require "./randomizer.coffee"
Palette =       require "./palette.coffee"
SkinTones =     require "./skinTones.coffee"
PlayerPaths =   require "../jsx/svg-player-icon/paths.coffee"

randomizer = new Randomizer()

randomPart = (facePart) ->
  max = PlayerPaths[facePart].length - 1
  index = randomizer.intBetween(0, max)
  return index

toPercent = (value) ->
  result = (value * 100).toFixed(0) + "%"
  return result


module.exports = {

  getNumberOfAlternatives: (facePart) ->
    if not PlayerPaths[facePart]?
      throw Error "Invalid facePart:" + facePart
    return PlayerPaths[facePart].length

  getMaxForPart: (facePart) ->
    if not PlayerPaths[facePart]?
      throw Error "Invalid facePart:" + facePart
    return PlayerPaths[facePart].length - 1

  createRandom: (number, skinToneName) ->
    if not skinToneName
      skinTone = randomizer.itemInArray(SkinTones.array)
    else
      skinTone = SkinTones[skinToneName]

    palette = Palette.create(skinTone)
    return {
      id: uuid(),
      number: number,
      bg:{
        x: toPercent(randomizer.fractionBetween(0, 1))
        y: toPercent(randomizer.fractionBetween(0, 1))
      }
      palette: palette
      throat: randomPart("throat")
      adamsApple: randomPart("adamsApple")
      ears: randomPart("ears")
      face: randomPart("face")
      eyesockets: randomPart("eyeSockets")
      foreheadDecoration: randomPart("foreheadDecoration")
      chin: randomPart("chin")
      cheekShadows: randomPart("cheekShadows")
      nose: randomPart("nose")
      mouth: randomPart("mouth")
      eyes: randomPart("eyes")
      eyebrows: randomPart("eyebrows")
      hair: randomPart("hair")
      shirt: randomPart("shirt")
    }
}
