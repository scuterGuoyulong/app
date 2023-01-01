<template>
	<view class="content">
		<view><text>账号</text></view>
		<view>
			<navigator url="/pages/login/login">
				登陆
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
