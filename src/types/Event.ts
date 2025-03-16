const UBCOBuildings = {
	ADM: 'Administration Building',
	ART: 'Arts Building',
	ASC: 'Arts and Sciences Centre',
	COM: 'Commons Building',
	EME: 'Engineering, Management and Education Building',
	FIP: 'Fipke Centre for Innovative Research',
	GYM: 'Gymnasium',
	LIB: 'Library',
	SCI: 'Science Building',
	RHS: 'Reichwald Health Sciences Centre',
	UNC: 'University Centre',
	SSC: 'Student Services Centre',
	CCS: 'Creative and Critical Studies Building',
	ARTS: 'Arts and Sciences Building',
	MH4: 'Mountain Home 4 (Arts House)',
	NIC: 'Nicola Residence',
	KLO: 'Kalamalka Residence',
	MON: 'Monashee Residence',
	PUC: 'Purcell Residence',
	SIM: 'Similkameen Residence',
	SKA: 'Skeena Residence',
	VAN: 'Valhalla Residence',
	CAS: 'Cassiar Residence',
	CSC: 'Cascades Residence',
	NCH: 'Nechako Residence',
} as const;

type BuildingCode = keyof typeof UBCOBuildings;

type OnCampusLocation = {
	onCampus: true;
	isTBD: boolean;
	street: string;
	postalCode: string;
	buildingCode: BuildingCode;
	room: string;
};

type OffCampusLocation = {
	onCampus: false;
	isTBD: boolean;
	street: string;
	postalCode: string;
	map: string;
};

export default interface Event {
	category:
	| 'Keynote'
	| 'Admin'
	| 'Plenary'
	| 'Exploration'
	| 'Leisure'
	| 'Break'
	| 'Presentations'
	| 'Workshop';
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	speaker?: {
		name: string;
		website: string;
	};
	location: OnCampusLocation | OffCampusLocation;
	calendarDescription: string;
	websiteDescription: string;
	isColored: boolean;
}
