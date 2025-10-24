export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	midnightslash: {
		num: -5000,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Midnight Slash",
		pp: 1,
		priority: 0,
		flags: { contact: 1, mirror: 1, slicing: 1 },
		multihit: [5, 5],
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dark"
	}
};