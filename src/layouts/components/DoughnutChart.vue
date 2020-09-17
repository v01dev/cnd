<script>
import { Doughnut } from 'vue-chartjs'
export default {
    extends: Doughnut,
    props: ['chartdata', 'options'],
    mounted () {
        this.renderChart(this.chartdata, this.options)
    },
    watch: {
        chartdata() {
            this.$data._chart.update()
        }
    }
}
</script>

<style>

</style>
