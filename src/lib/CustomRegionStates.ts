import { RegionState } from 'ts-stromgedacht';
import { ExtendedRegionState } from '$lib/ExtendedRegionState';

export const CustomRegionStates = { ...RegionState, ...ExtendedRegionState };
