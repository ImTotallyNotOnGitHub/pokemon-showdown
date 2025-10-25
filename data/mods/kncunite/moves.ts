export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	midnightslash: {
		num: -5000,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Midnight Slash",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: { contact: 1, mirror: 1, protect: 1, slicing: 1, unite: 1 },
		multihit: 6,
		smartTarget: true,
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dark"
	},
	bonechill: {
		num: -5001,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Bone Chill",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
		status: 'fsb',
		secondary: null,
		target: "normal",
		type: "Ghost"
	},
};