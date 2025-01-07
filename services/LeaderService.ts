export async function getTransactionByLeader(leaderId: any) {
	interface Response {
		Type: string,
		CompanyId: number,
		StockCode: string,
		PerformPosition: string,
		NumStockBefore: number,
		SignUpTransaction: number,
		SignUpStartDate: Date,
		SignUpEndDate: Date,
		MakeTransaction: number,
		TransactionStartDate: Date,
		TransactionEndDate: Date,
		PercentAfter: number,
		NumStockAfter: number,
	}
	let response = [] as Response[]
	if (!leaderId) return response
	const axios = useNuxtApp().$axios;
	await axios.get(`${_urlApi('Economic')}/api/lanh-dao/giao-dich?leaderId=${leaderId}`).then((res) => {
		response = res.data.data || [] as Response[]
	});
	return response
}
export async function getLeaderDetail(leaderId: any) {
	const axios = useNuxtApp().$axios;
	interface Positions {
		AppointedTime: string,
		PositionName: string,
		StockCode: string,
		CompanyName: string,
		AreWorking: true
	}
	interface StockHold {
		NumStock: number,
		UpToDate: Date,
		StockCode: string,
		CompanyName: string,
	}
	interface Response {
		Positions: Positions[],
		StockHold: StockHold[],
		LeaderDetailsId: number,
		LeaderDetailsName: string,
		PhotoCard: string,
		Sex: true,
		BirthDay: string,
		WorkExperience: string,
		PlaceOfBirth: string,
		PlaceOfResidence: string,
		Qualification: string,
		WorkingProcess: string,
		LearningProcess: string,
		PositionOrderBy: number,
		PositionCategoryId: number,
		LastModified: Date,
		IsRemoved: boolean
		}
	let response = null as Response | null
	await axios.get(`${_urlApi('Economic')}/api/lanh-dao/thong-tin?leaderId=${leaderId}`).then(res => {
		response = res.data.data || null
	});
	return response;
}
