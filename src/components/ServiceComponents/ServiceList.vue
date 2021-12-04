<template>
	<div class="max-w-md mx-4 mb-4 dark:bg-gray-700 dark:bg-opacity-[25%] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
		<div class="md:flex md:justify-between">
			<div class="md:flex-shrink-0">
				<ImageAssistant
					:image="service?.image"
					bucket="product-bucket"
					:imageClass="'object-cover w-full h-44'"
				/>
			</div>
			<div class="p-4 xl:p-8">
				<div class="uppercase tracking-wide text-name font-bold">
					{{ service?.name }}
				</div>
				<p class="mt-2  text-description xl:text-lg text-[#858685]">
					{{ service?.description }}
				</p>
			</div>

			<div class="flex justify-end">
				<router-link
					:to="`/services/${service.id}`"
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
  name: 'ServiceList',
  components: { ImageAssistant },
  props: ['service'],
  setup() {
    return {};
  }
});
</script>
