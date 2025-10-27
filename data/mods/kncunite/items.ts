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
	assualtvest: {
		name: "Assault Vest",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && effect.category === 'Special') {
				this.add('-enditem', target, 'Assault Vest');
				target.useItem();
				return 0;
			}
		},
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
	energyamplifier: {
		name: "Energy Amplifier",
		spritenum: 307,
		onSourceTryPrimaryHit(target, source, move) {
			if (move.flags['unite']) {
				source.useItem()
			}
		},
		boosts: {
			spe: 1
		},
		desc: "When the holder uses a unite move, its Speed is raised by 1 stage. Consumed after use."
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