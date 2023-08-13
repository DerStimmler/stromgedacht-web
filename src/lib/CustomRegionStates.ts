import { RegionState } from 'ts-stromgedacht';

enum ExtendedRegionState {
	Unknown = -1
}

export type CustomRegionState = RegionState | ExtendedRegionState;

export const CustomRegionStates = { ...RegionState, ...ExtendedRegionState };
