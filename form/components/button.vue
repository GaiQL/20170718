<template>
   <div>
      <h5>截止时间：</h5>
      <input type="text" @click = "setDate" v-bind:value="date" placeholder="请选择截止时间..."/>
   </div>
</template>

<style>
.heihei{
  color:red
}
</style>

<script>

 export default{
  	data () {
    	return {
        	date:''
    	}
  	},
    methods:{
   	    setDate(){
          console.log(this.date)
	       this.$picker.show({
	         type:'datePicker',
	         onOk: (date) =>{
	           this.date = date
	         }
	       });
        }
    }
 }

</script>
