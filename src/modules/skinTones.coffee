
# Define a set of skin and hair colors
# that are used when creating a random
# color palette for a player of a specific
# skin tone.

skinTones = {}

# 0: okocha
skinTones.okocha = {
  name: "okocha"
  outline: "#281d14"
  skin: [
    "#613d21"
    "#7a4924"
    "#8d5729"
    "#9d6d3c"
  ]
  hair: [
    "#151515"
    "#1e1e1e"
    "#201209"
    "#2f1b0d"
    "#382010"
  ]
}

# 1: drogba
skinTones.drogba = {
  name: "drogba"
  outline: "#2a221a"
  skin: [
    "#7d5b36"
    "#926a3f"
    "#a97b49"
    "#ae8557"
  ]
  hair: [
    "#201209"
    "#2f1b0d"
    "#382010"
    "#3e2412"
    "#4d2d17"
  ]
}

# 2: neymar
skinTones.neymar = {
  name: "neymar"
  outline: "#463829"
  skin: [
    "#b58450"
    "#bf8e59"
    "#c79c6d"
  ]
  hair: [
    "#2a1c12"
    "#2f1b0d"
    "#382010"
    "#3e2412"
    "#4d2d17"
    "#5c361c"
    "#5c3f1c"
    "#5c2b1c"
  ]
}

# 3: totti
skinTones.totti = {
  name: "totti"
  outline: "#4f4533"
  skin: [
    "#c4a572"
    "#ceab72"
    "#d3b481"
  ]
  hair: [
    "#3f2a1b"
    "#373737"
    "#2d2d2d"
    "#414141"
    "#463014"
    "#563b18"
    "#5d351b"
  ]
}

# 4: ribery
skinTones.ribery = {
  name: "ribery"
  outline: "#514731"
  skin: [
    "#e3cd9b"
    "#e7d3a5"
    "#ead8b0" 
  ]
  hair: [
    "#2d2d2d"
    "#373737"
    "#414141"
    "#462814"
    "#5d351b"
    "#463014"
    "#563b18"
    "#6e4b1e"
    "#936428"
    "#ae9523" 
    "#ccaf29"
    "#ac7122"
  ]
}
skinTones.array = [
  skinTones.okocha
  skinTones.drogba
  skinTones.neymar
  skinTones.totti
  skinTones.ribery
]

module.exports = skinTones