export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Unite Items
	accelbracer: {
		num: -1000,
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
	buddybarrier: {
			num: -1001,
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
		num: -1002,
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
		num: -1003,
		name: "Drain Crown",
		spritenum: 236,
		desc: "Heals 25% of damage dealt with Physical moves.",
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
		num: -1004,
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
		num: -1005,
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
    	num: -1006,
    	name: "Rapid-Fire Scarf",
    	desc: "The holder’s Speed is multiplied by 1.5 on the first turn of combat.",
    	spritenum: 360,
    	fling: { basePower: 30 },

    	// Apply Speed boost
    	onModifySpe(spe, pokemon) {
        	if (pokemon.activeTurns === 1) { // first turn the Pokémon is active
            	return this.chainModify(1.5);
        	}
    	},
	},
    rescuehood: {
        num: -1007,
        name: "Rescue Hood",
        spritenum: 750,
        fling: { basePower: 10 },
        desc: "Boosts the amount of HP the holder restores to other Pokémon by 50%.",

        // Triggered whenever a Pokémon is about to be healed
        onTryHeal(damage, target, source, effect) {
            if (!source || source === target) return; // only boost healing to others
            const holder = source;
            if (holder.item === 'rescuehood') {
                const boosted = this.modify(damage, 1.5); // +50% healing
                this.add('-message', `${holder.name}'s Rescue Hood strengthened the healing!`);
                return boosted;
            }
        },
    },
	resonantguard: {
		name: "Resonant Guard",
		spritenum: 307,
		fling: { basePower: 90 },
		num: -1008,
		desc: "25% less damage from attacks for 2 turns after using a Physical move. Consumed after use.",

		// Triggered when holder uses a Physical move
		onAfterMove(pokemon, target, move) {
			if (move.category === 'Physical') {
				if (pokemon.useItem()) {
					pokemon.addVolatile('resonantguardboost');
				}
			}
		},
		condition: {
			duration: 2,
			noCopy: true,
			onStart(pokemon) {
				this.add('-message', `${pokemon.name}'s Resonant Guard activated!`);
			},
			onSourceModifyDamage(damage, source, target, move) {
				const effectData = (this as any).effectData;
				if (target === effectData.target) {
					return this.chainModify(0.75);
				}
			},
			onEnd(pokemon) {
				this.add('-message', `${pokemon.name}'s Resonant Guard wore off.`);
			},
		},
	},
	// Modified Standard Items
	bigrootunite: {
		num: -1009,
		name: "Big Root (Unite)",
		spritenum: 29,
		desc: "Holder's HP recovery effects are increased by 20%.",
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
		gen: 9,
	},
	floatstoneunite: {
		num: -1010,
		name: "Float Stone (Unite)",
		spritenum: 147,
		desc: "Holder's Speed is raised by 10%, but its weight is halved.",
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
		gen: 9,
	},
	focusbandunite: {
		num: -1011,
		name: "Focus Band (Unite)",
		spritenum: 150,
		desc: "When the holder's HP is at or below 1/3 its max HP, it consumes this item and restores 1/6 of its max HP at the end of each turn for 3 turns.",
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
		gen: 9,
	},
	razorclawunite: {
		num: -1012,
		name: "Razor Claw (Unite)",
		spritenum: 382,
		desc: "Holder's critical hit ratio is raised by 1. After the holder uses a damaging move, the target's Speed is lowered by 1 stage if the move resulted in a critical hit.",
		fling: {
			basePower: 80,
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
  		// Runs after this Pokémon uses a damaging move
  		onAfterHit(target, source, move) {
    		if (!target || target.fainted) return;
    		if (move.category === 'Status') return;
    		// This checks the crit flag from moveHitData (the battle already sets it)
			const m = move as any;
			if (m.crit) {
    			this.add('-message', `${source.name}'s Razor Claw slowed ${target.name}!`);
    			this.boost({ spe: -1 }, target, source, this.effect);
			}
  		},
		gen: 9,
	},
	scopelensunite: {
		num: -1013,
		name: "Scope Lens (Unite)",
		spritenum: 429,
		desc: "Holder's critical hit ratio is raised by 1. Critical hits deal 50% more damage.",
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
		gen: 9,
	},
  	shellbellunite: {
    	name: "Shell Bell (Unite)",
		num: -1014,
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