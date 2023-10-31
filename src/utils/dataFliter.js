
export const dataFliter=(res)=>{

		// let columns = Object.keys(res);

		let transforTime=new Array;
		res['meminfo.time'].forEach((item)=>{
		let date = new Date(parseInt(item) * 1000);
    let Year = date.getFullYear();
    let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    let Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    let Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    let Sechond = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    let  GMT =  Year + '-' + Moth + '-' + Day + '   '+ Hour +':'+ Minute  + ':' + Sechond;

		transforTime.push(GMT);
		})
		res['meminfo.time']=transforTime;

		// let rows =[];
		// for(let i=0;i<res['meminfo.time'].length;i++){
		// 	let obj = {};
		// 	columns.map((item)=>{
		// 		obj[item]=res[item][i];
		// 	})
		// 	rows.push(obj)
		// }

		// let chartData ={};
		// chartData["columns"] = columns;
		// chartData['rows'] = rows;

		// return chartData;
		return res;
		
}