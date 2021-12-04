<template>
	<div class="max-w-md mx-4 mb-4 dark:bg-gray-700 dark:bg-opacity-[25%] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
		<div class="md:flex md:justify-between">
			<div class="md:flex-shrink-0">
				<ImageAssistant
					:image="product?.image"
					bucket="product-bucket"
					:imageClass="'object-cover w-full h-44'"
				/>
				<div class="p-2 xl:p-2">
					<div class="uppercase text-name text-sm font-bold">
						{{ product?.name }}
					</div>
					<p
						rel="noopener"
						class="block mt-1 leading-tight  hover:underline text-sm"
					>
						{{ product?.category }}
					</p>
					<p class="mt-2  text-description text-[#858685]">
						{{ product?.description }}
					</p>
				</div>
			</div>

			<div class="flex justify-end">
				<router-link
					:to="`/products/${product.id}`"
					class="create-button"
				>
					Edit
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import ImageAssistant from '../ImageAssistant.vue';

export default defineComponent({
  name: 'ProductList',
  components: { ImageAssistant },
  props: ['product'],
  setup() {
    return {};
  }
});
</script>
