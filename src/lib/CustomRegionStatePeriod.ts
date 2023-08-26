import type { CustomRegionState } from '$lib/CustomRegionState';

export interface CustomRegionStatePeriod {
	from: Date;
	to: Date;
	state: CustomRegionState;
}
