<template>
	<div class="flex bg-gray-500 text-white justify-between">
		<ul class="flex gap-5 p-5">
			<li><router-link :to="{ name: 'Home' }">Home</router-link></li>
			<li><router-link :to="{ name: 'Me' }">Me</router-link></li>
		</ul>
		<ul class="flex gap-5 bg-gray-700 p-5">
			<li><router-link :to="{ name: 'Logout' }">Logout</router-link></li>
		</ul>
	</div>
</template>
