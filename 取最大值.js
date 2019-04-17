	sortArrfuc: function(a,b){
	    return b.value - a.value
	},
	click: function(){
		var a = 'aaasdasdasdqwesdfsf';
	    var arr = [];
	    for(let i=0; i<a.length; i++){
	      let isA = arr.every((item)=>{
	        return item.name != a[i];
	      })
	      if (isA){
	        arr.push({ name: a[i], value: 1 });
	      } else {
	        arr.map((item2) => {
	          if (item2.name == a[i]) {
	            item2.value++;
	          }
	        })
	      }
	    }
	    arr.sort(this.sortArrfuc);
	    let brr = arr.filter((item)=>{
	      return item.value == arr[0].value;
	    })
	    console.log(JSON.stringify(brr));\
	}