<script lang="ts">
	import * as echarts from 'echarts/core';
	import { LineChart } from 'echarts/charts';
	import type { Forecast } from 'ts-stromgedacht';
	import { onMount } from 'svelte';
	import { CanvasRenderer } from 'echarts/renderers';
	import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

	export let forecast: Forecast | null;
	let width: number;
	let chart: echarts.ECharts;

	$: {
		if (forecast && chart) {
			chart.setOption({
				backgroundColor: 'transparent',
				xAxis: {
					data: forecast.load.map((fv) => fv.dateTime.toLocaleString()),
					axisLabel: {
						formatter: function (value: string) {
							return value.split(',')[0];
						}
					}
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: 'Load',
						data: forecast.load.map((fv) => fv.value),
						type: 'line',
						smooth: true,
						stack: 'x'
					},
					{
						name: 'Renewable Energy',
						data: forecast.renewableEnergy.map((fv) => fv.value),
						type: 'line',
						smooth: true,
						stack: 'x'
					},
					{
						name: 'Residual Load',
						data: forecast.residualLoad.map((fv) => fv.value),
						type: 'line',
						smooth: true,
						stack: 'x'
					},
					{
						name: 'SuperGreen Threshold',
						data: forecast.superGreenThreshold.map((fv) => fv.value),
						type: 'line',
						smooth: true,
						stack: 'x'
					}
				],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['Load', 'Renewable Energy', 'Residual Load', 'SuperGreen Threshold']
				}
			});
		}
	}

	onMount(async () => {
		echarts.use([LineChart, CanvasRenderer, GridComponent, TooltipComponent, LegendComponent]);

		chart = echarts.init(document.getElementById('chart'), 'dark');

		window.addEventListener('resize', function () {
			chart.resize();
		});
	});
</script>

<div bind:clientWidth={width} class="grid">
	<div style="width: {width}px;" class="aspect-video p-2" id="chart"></div>
</div>
