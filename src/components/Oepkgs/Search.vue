<template>
	<section class="jumbotron">
		<h3 class="jumbotron-heading">Search Software Name</h3>
		<div>
			<input type="text" placeholder="enter the software name you search" v-model="keyWord"/>&nbsp;
			<button @click="searchUsers">Search</button>
		</div>
	</section>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'Search',
		data() {
			return {
				keyWord:''
			}
		},
		methods: {
			searchUsers(){
				//请求前更新List的数据
				this.$bus.$emit('updateListData',{isLoading:true,errMsg:'',users:[],keyWord:'',isFirst:false})
				axios.get(`https://api.compass-ci.openeuler.org:20003/srpm_info?page_size=10&page_num=0?softwareName=${this.keyWord}`).then(
					response => {
						console.log('请求成功了')
						//请求成功后更新List的数据
						this.$bus.$emit('updateListData',{isLoading:false,errMsg:'',keyWord:this.keyWord,users:response.data})
						console.log(response.data)
					},
					error => {
						//请求后更新List的数据
						this.$bus.$emit('updateListData',{isLoading:false,errMsg:error.message,users:[],keyWord:this.keyWord})
					}
				)
			}
		},
	}
</script>
