<script>
    import { Line } from 'vue-chartjs'
    export default {
        extends: Line,
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
