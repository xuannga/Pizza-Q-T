 

let timme = new Date() ;

 function datetomins (timme){
   minutetime=timme
    return minutetime
}

 function datatodays (timme){
   daytime=timme
    return daytime
}

setInterval(function(){ 
	console.log(new Date().getTime());
}, 20000);//run this thang every 20 seconds

// console.log( )