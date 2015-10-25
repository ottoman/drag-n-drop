
module.exports = Randomizer = (seed) ->

  getRandom = () ->
    if seed?
      seed
    else
      Math.random()

  return {

    fractionBetween: (min, max) ->
      rand = getRandom()
      return rand * (max - min)
  
    intBetween: (min, max) ->
      rand = getRandom()
      return Math.floor(rand * (max - min + 1)) + min

    itemInArray: (arr) ->
      rand = getRandom()
      max = arr.length - 1
      index = @intBetween(0, max)
      return arr[index]

  }

