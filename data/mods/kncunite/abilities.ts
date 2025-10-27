export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
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
}