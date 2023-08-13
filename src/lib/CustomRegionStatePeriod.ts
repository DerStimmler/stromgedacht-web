import type { CustomRegionState } from '$lib/CustomRegionStates';

export interface CustomRegionStatePeriod {
	from: Date;
	to: Date;
	state: CustomRegionState;
}
