export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	blaze: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Blaze boost');
				return this.chainModify(1.1);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Blaze boost');
				return this.chainModify(1.1);
			}
		},
		onModifyMove(move, pokemon) {
			if(move.type === 'Fire' && move.category !== 'Status' && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.overrideOffensiveStat = 'atk';
			} else {
				move.overrideOffensiveStat = 'spa';
			}
		},
		flags: {},
		name: "Blaze",
		rating: 2,
		num: 66,
	},
	longreach: {
		onModifyMove(move) {
			delete move.flags['contact'];
			if (move.target === 'normal' || move.target === 'adjacentFoe') {
				move.target = 'any';
			}
		},
		flags: {},
		name: "Long Reach",
		rating: 1,
		num: 203,
	},
	runaway: {
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Run Away",
		rating: 0,
		num: 50,
	},
	stancechange: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegislash' || attacker.transformed) return;

			// Moves that trigger Shield Forme
			const shieldMoves = ['kingsshield', 'wideguard', 'irondefense'];

			// Check for status moves
			if (move.category === 'Status') {
				// If it's one of the shield-triggering moves
				if (shieldMoves.includes(move.id)) {
					if (attacker.species.name !== 'Aegislash') {
						attacker.formeChange('Aegislash');
					}
				}
				// Otherwise, don't switch form
				return;
			}

			// Offensive moves trigger Blade Forme
			if (attacker.species.name !== 'Aegislash-Blade') {
				attacker.formeChange('Aegislash-Blade');
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Stance Change",
		rating: 4,
		num: 176,
	},
	torrent: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Torrent boost');
				return this.chainModify(1.1);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Torent boost');
				return this.chainModify(1.1);
			}
		},
		onModifyMove(move, pokemon) {
			if(move.type === 'Water' && move.category !== 'Status' && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.overrideOffensiveStat = 'atk';
			} else {
				move.overrideOffensiveStat = 'spa';
			}
		},
		flags: {},
		name: "Torrent",
		rating: 2,
		num: 67,
	},
}