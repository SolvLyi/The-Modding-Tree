addLayer("r", {
    name: "rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#13dcbbff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "rebirths", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('r', 14)) mult = mult.times(upgradeEffect('r', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for rebirths", onPress(){if (canReset("r")) doReset("r")}},
    ],
    layerShown(){return true},
     upgrades: {
        11: {    title: "Make this whatever you want!",
    description: "Double your point gain.",
    cost: new Decimal(1),
         },
        12: {    title: "Make this whatever you want! Again!",
    description: "Double your point gain.",
    cost: new Decimal(2),
    unlocked() { return hasUpgrade("r", 11); },
        },
        13: {    title: "...yeah, another basic upgrade.",
    description: "Boost your points based on rebirths.",
    cost: new Decimal(3),
    unlocked() { return hasUpgrade("r", 11); },
    effect() {
        return player["r"].points.add(1).pow(0.25)
    },
    effectDisplay() { return format(upgradeEffect("r", 13))+"x" }, // Add formatting to the effect
        14: {    title: "Okay, this is getting basic really fast.",
    description: "Boost your points based on rebirths.",
    cost: new Decimal(3),
    unlocked() { return hasUpgrade("r", 11); },
    effect() {
        return player["r"].points.add(1).pow(0.1)
    },
    effectDisplay() { return format(upgradeEffect("r", 14))+"x" }, // Add formatting to the effect
    },
        
        },
    

    },
})
