<template>
	<div>
		<hero-bar>Dashboard</hero-bar>
		<main-section>
			<div class="mb-6">
				<Subscribers />
			</div>

			<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
				<card-widget
					trend="12%"
					trendType="up"
					color="text-green-500"
					:icon="mdiAccountMultiple"
					:number="512"
					label="Clients"
				/>
				<card-widget
					trend="12%"
					trendType="down"
					color="text-blue-500"
					:icon="mdiCartOutline"
					:number="7770"
					prefix="$"
					label="Sales"
				/>
				<card-widget
					trend="Overflow"
					trendType="alert"
					color="text-red-500"
					:icon="mdiChartTimelineVariant"
					:number="256"
					suffix="%"
					label="Performance"
				/>
			</div>

			<title-sub-bar
				:icon="mdiChartPie"
				title="Trends overview"
			/>

			<card-component
				title="Performance"
				:icon="mdiFinance"
				:headerIcon="mdiReload"
				class="mb-6"
				@header-icon-click="fillChartData"
			>
				<div v-if="chartData">
					<line-chart
						:data="chartData"
						class="h-96"
					/>
				</div>
			</card-component>
		</main-section>
	</div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiReload,
  mdiChartPie
} from '@mdi/js';

import * as chartConfig from '@/components/Charts/chart.config.js';
import LineChart from '@/components/Charts/LineChart.vue';
import MainSection from '@/components/MainSection.vue';
import HeroBar from '@/components/HeroBar.vue';
import CardWidget from '@/components/CardWidget.vue';
import CardComponent from '@/components/CardComponent.vue';
import TitleSubBar from '@/components/TitleSubBar.vue';
import Subscribers from '@/components/partial/Subscribers.vue';

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fillChartData();
});

const store = useStore();

// eslint-disable-next-line no-unused-vars
const darkMode = computed(() => store.state.darkMode);
</script>
