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
		desc: "When KO'ing a foe => Holder's Atk +1.",
	},
	bigroot: {
		name: "Big Root",
		spritenum: 29,
		fling: {
			basePower: 10,
		},
		onTryHealPriority: -1,
    	onTryHeal(damage, target, source, effect) {
      	// This hook modifies all healing effects
      		const boosted = Math.floor(damage * 6 / 5); // +20%
      		if (boosted !== damage) {
        		this.add('-message', `${target.name}'s Big Root increased its recovery!`);
      		}
      		return boosted;
    	},
		num: 296,
		gen: 9,
	},
	buddybarrier: {
		name: "Buddy Barrier",
		spritenum: 307,
		fling: {
			basePower: 90,
		},
		onSourceTryPrimaryHit(target, source, move) {
			if (move.flags['unite']) {
				source.useItem()
			}
		},
		boosts: {
			def: 1,
			spd: 1
		},
		desc: "Unite Move => Holder's Def and SpD +1. Consumed after use."
	},
	chargingcharm: {
		name: "Charging Charm",
		spritenum: 358,
		fling: {
			basePower: 60,
		},
		desc: "Holder's moves that require a charge turn happen instantly, but at 75% power.",
    	// Skip charge turns
    	onChargeMove(pokemon, target, move) {
      		// Some moves have charging mechanics we want to bypass.
      		// This prevents the 'must charge' effect.
      		this.add('-message', `${pokemon.name}'s ${move.name} activated instantly due to its Charging Charm!`);
      		return false; // removes the charging turn
    	},
    	// Apply the 25% power reduction
    	onBasePower(basePower, user, target, move) {
      		if (move.category !== 'Status') {
        	return this.chainModify(0.75);
      		}
    	},
	},
	draincrown: {
		name: "Drain Crown",
		spritenum: 236,
		fling: {
			basePower: 80,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Physical') return;
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(move.totalDamage / 4, pokemon);
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
		desc: "When KO'ing a foe => Holder's SpA +1.",
	},
	energyamplifier: {
		name: "Energy Amplifier",
		spritenum: 307,
		fling: {
			basePower: 90,
		},
		onSourceTryPrimaryHit(target, source, move) {
			if (move.flags['unite']) {
				source.useItem()
			}
		},
		boosts: {
			spe: 1
		},
		desc: "Unite Move => Holder's Spe +1. Consumed after use."
	},
	rapidfirescarf: {
		name: "Rapid-Fire Scarf",
		spritenum: 360,
		fling: {
			basePower: 30,
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.activeMoveActions > 1) {
				return this.chainModify(1.5);
			}
		}
	},
	// Modified Standard Items
	floatstone: {
		name: "Float Stone",
		spritenum: 147,
		fling: {
			basePower: 30,
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.chainModify(1.1);
		},
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2);
		},
		num: 539,
		gen: 9,
	},
	focusband: {
		name: "Focus Band",
		spritenum: 150,
		fling: {
			basePower: 10,
		},
		onUpdate(pokemon) {
			if (pokemon.hp && pokemon.hp <= pokemon.maxhp / 3) {
				if (pokemon.useItem()) {
				pokemon.addVolatile('focusing');
				}
			}
		},
		condition: {
			duration: 3,
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				const healAmount = Math.floor(pokemon.baseMaxhp / 6);
				this.heal(healAmount, pokemon, pokemon);
				this.add('-message', `${pokemon.name} is regaining health from focusing!`);
			},
			onEnd(pokemon) {
				this.add('-message', `${pokemon.name}'s focusing effect ended!`);
			},
		},
		num: 230,
		gen: 9,
	},
	razorclaw: {
		name: "Razor Claw",
		spritenum: 382,
		fling: {
			basePower: 80,
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
  		// after damage is dealt
  		onAfterMoveSecondary(target, source, move) {
    		if (!target || !target.hp) return;
    		if (!move || move.category === "Status") return;
    		// Check if the hit was a crit
    		const hitData = target.getMoveHitData(move);
    		if (hitData && hitData.crit) {
      			this.add('-message', `${source.name}'s Razor Claw slows ${target.name}!`);
      			this.boost({ spe: -1 }, target, source, this.effect);
    		}
  		},
		num: 326,
		gen: 9,
	},
	rescuehood: {
    	name: "Rescue Hood",
		spritenum: 750,
		fling: {
			basePower: 10,
		},
		onTryHealPriority: -1,
    	desc: "Boosts the amount of HP the holder restores to other Pokémon by 50%.",
    	onTryHeal(damage, target, source, effect) {
      	// Ensure there’s a healing source and it’s the holder
      		if (source && source !== target && source.hasItem('rescuehood')) {
        	const boosted = Math.floor(damage * 1.5); // +50% healing
        	this.add('-message', `${source.name}'s Rescue Hood strengthened the healing!`);
        	return boosted;
      		}
    	},
  	},
	resonantguard: {
		name: "Resonant Guard",
		spritenum: 307,
		fling: {
			basePower: 90,
		},
		onSourceTryPrimaryHit(target, source, move) {
			if (move.category === 'Physical') {
				source.useItem()
				source.addVolatile('resonantguardboost');
			}
		},
		condition: {
			duration: 2,
			noCopy: true,
			onStart(pokemon) {
      			this.add('-message', `${pokemon.name}'s Resonant Guard activated!`);
			},
			onAccuracy() {
				return true;
			},
			onSourceModifyDamage() {
				return this.chainModify(0.75);
			},
			onEnd(pokemon) {
				this.debug('removing Resonant Guard effect');
				pokemon.removeVolatile('resonantguardboost');
			},
		},
		desc: "25% less damage from attacks for 2 turns after using a Physical move. Consumed after use.",
	},
	scopelens: {
		name: "Scope Lens",
		spritenum: 429,
		fling: {
			basePower: 30,
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
		},
		num: 232,
		gen: 9,
	},
  	shellbell: {
    	name: "Shell Bell",
		num: 253,
		spritenum: 438,
		gen: 9,
    	desc: "When the holder uses a special attack, it heals HP equal to 1/4 of its Special Attack stat.",
    	// Trigger after using a move
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelfPriority: -1,
    	onAfterMoveSecondarySelf(pokemon, target, move) {
      		if (move.category !== 'Special' || move.selfdestruct) return;

      		// Calculate healing based on SpA
     		 const spa = pokemon.storedStats.spa;
      		const healAmount = Math.floor(spa / 8); // 12.5% of SpA
      		this.heal(healAmount, pokemon, pokemon, this.effect);
      		this.add('-message', `${pokemon.name} restored health from the Special Heal Charm!`);
    	}
  	},
	// Legacy Items
	charizarditex: {
		inherit: true,
		isNonstandard: null,
	},
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