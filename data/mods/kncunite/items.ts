export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Unite Items
	accelbracer: {
		name: "Accel Bracer",
		spritenum: 357,
		ignoreKlutz: true,
		fling: {
			basePower: 70,
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({ atk: length }, source);
			}
		},
		desc: "When the holder KOs a Pokemon, its Attack is raised by 1 stage.",
	},
	drivelens: {
		name: "Drive Lens",
		spritenum: 359,
		ignoreKlutz: true,
		fling: {
			basePower: 70,
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({ spa: length }, source);
			}
		},
		desc: "When the holder KOs a Pokemon, its Sp. Atk is raised by 1 stage.",
	},
	// Legacy Items
	lucarionite: {
		inherit: true,
		isNonstandard: null,
	},
	mewtwonitex: {
		inherit: true,
		isNonstandard: null,
	},
	mewtwonitey: {
		inherit: true,
		isNonstandard: null,
	}
};