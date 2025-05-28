import { Label } from './label';

export class TimelineEvent {
	constructor(
		public name: string,
		public color: string,
		public labels: Label[],
		public startDate: string,
		public endDate?: string,
	) { }
}
